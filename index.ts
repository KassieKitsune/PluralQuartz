/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2023 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { definePluginSettings } from "@api/Settings";
import { hexToHSL } from "@plugins/clientTheme/utils/colorUtils";

import definePlugin, { OptionType } from "@utils/types";
import { PluginNative } from "@utils/types";
import { Member, Member as pkMember, Switch, System } from "pkapi.js";


import { Activity, ActivityAssets, ActivityButton } from "@vencord/discord-types";
import { ActivityFlags, ActivityStatusDisplayType, ActivityType } from "@vencord/discord-types/enums";
import { ApplicationAssetUtils, AuthenticationStore, FluxDispatcher, PresenceStore, UserStore } from "@webpack/common";
import { pkSystemRequest } from "./native";
import { update } from "lodash";

const Native = VencordNative.pluginHelpers.PluralQuartz as PluginNative<typeof import("./native")>;
var apiDelay = 0;
const apiDelayStep = 200;

export const PLURALKIT_BOT_ID = "466378653216014359";

const cachedPKColors = new Map();

const queuedNames = new Array<String>;

const Devs = Object.freeze({
    KassieKitsune:{
        name: "Philosopher's Stone System",
        id:173066847887949825n
    }
})

const settings = definePluginSettings({
    minLightness: {
        description: "Minimium lightness, in %. Change if colors are too light or too dark",
        type: OptionType.SLIDER,
        markers: [0,10,20,25,30,40,50,60,75,80,85,90,100],
        default: 0,
        stickToMarkers: false
    },
    maxLightness: {
        description: "Maxium Lightness, in %. Change if colors are too light or too dark",
        type: OptionType.SLIDER,
        markers: [0,10,20,25,30,40,50,60,75,80,85,90,100],
        default: 100,
        stickToMarkers: false
    },
    defaultColor: {
        description: "#Hex color to display for Pluralkit Members without a color set (leave blank for Discord/Theme defaults)",
        type: OptionType.STRING,
        default: "#FF00FF"
    },
    generateRandomColors: {
        displayName:"ID Colors",
        description: "If true, generates colors based on a member's ID if no color is set",
        restartNeeded:true,
        type: OptionType.BOOLEAN,
        default: false
    },
    idSaturation: {
        description: "Saturation to use for ID colors (-1 for no adjustment)",
        type: OptionType.NUMBER,
        restartNeeded:true,
        default: 25,
    },
    frontingPresence:{
        displayName:"Rich Presence",
        description:"Show the first fronter as an Activity on your profile",
        type:OptionType.BOOLEAN,
        restartNeeded:true,
        default:true
    },
    showPronounsInRichPresence:{
        description:"",
        type:OptionType.BOOLEAN,
        default:false
    },
    pkToken:{
        description:"This is required for fronter presence (Get your token by dm-ing the PluralKit bot 'pkToken; token' DO NOT SHARE THIS WITH ANYONE)",
        type:OptionType.STRING,
        default:""
    }
});

export default definePlugin({
    name: "PluralQuartz",
    description: "Applies colors to PluralKit webhook nametags  ",
    tags: ["Appearance", "Customisation", "Accessibility"],
    authors: [Devs.KassieKitsune],
    settings,

    patches: [
        {
            find: '="SYSTEM_TAG"',
            replacement: {
                // Override colorString with our custom color and disable gradients if applying the custom color.
                match: /(?<=colorString:\i,colorStrings:\i,colorRoleName:\i.*?}=)(\i),/,
                replace: "$self.wrapMessageColorProps($1, arguments[0]),"
            }
        }
    ],

    
    start() {
        if (settings.store.frontingPresence){
            updateFrontActivity();
            setInterval(() => { updateFrontActivity() }, 16000);
        }
    },

    stop(){

    },

    onBeforeMessageSend(){
        updateFrontActivity();
    },


    wrapMessageColorProps(colorProps: { colorString: string, colorStrings?: Record<"primaryColor" | "secondaryColor" | "tertiaryColor", string>; }, context: any) {
        try {
            const colorString = this.calculateNameColorForMessageContext(context);
            if (colorString === colorProps.colorString) {
                return colorProps;
            }

            return {
                ...colorProps,
                colorString,
                colorStrings: colorProps.colorStrings && {
                    primaryColor: colorString,
                    secondaryColor: undefined,
                    tertiaryColor: undefined
                }
            };
        } catch (e) {
            console.error("Failed to calculate message color strings:", e);
            return colorProps;
        }
    },

    calculateNameColorForMessageContext(context: any) {
        const colorString = context?.author?.colorString;
        const username = context?.message?.author?.username;
        const avatar = context?.message?.author?.avatar;

        if (context?.message?.applicationId === PLURALKIT_BOT_ID){
            const cachedColor = cachedPKColors.get(username);
            if (cachedColor === null){return settings.store.defaultColor}
            if (cachedColor === undefined){
                if (queuedNames.indexOf(username) === -1)
                    queuedNames.push(username);
                    pkRecordMessageMemberColorRateLimited(context?.message?.id,username);
                return settings.store.defaultColor;
            }
            return "#"+adjustColor(cachedPKColors.get(username));
        }

        return colorString;
    }
});

function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function pkRecordMessageMemberColorRateLimited(messageID:string,username:string){
    cachedPKColors.set(username,settings.store.defaultColor)

    apiDelay+=apiDelayStep;
    await sleep(apiDelay);
    apiDelay -= apiDelayStep;
    console.log(apiDelay);
            
    const message = await Native.pkMessageRequest(messageID);
        
    if (message !== undefined){
        const member: pkMember = message.member;
        var color = member.color;
        
        if (settings.store.generateRandomColors && color === null){
            color = generateColorsFromID(member)
            }
        
        cachedPKColors.set(username,color);
            
        console.log(username+" : "+color);
    }
    else{console.error("Could not Find PK Message");}
    
    queuedNames.splice(queuedNames.indexOf[username],1);
    console.log(queuedNames);
}

function adjustColor(color:string,saturation:number=-1,minL:number=settings.store.minLightness,maxL:number=settings.store.maxLightness){
    var hslColor = hexToHSL(color)
    
    if (hslColor.lightness < minL){
        hslColor.lightness = minL
    }
    else if (hslColor.lightness > maxL){
        hslColor.lightness = maxL
    }
    if (saturation > 0){hslColor.saturation = saturation}
    color = hslToHex(hslColor.hue,hslColor.saturation,hslColor.lightness)

    return color
}

function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `${f(0)}${f(8)}${f(4)}`;
}

// what a coincidence that pk member IDs are 6 letters long
function generateColorsFromID(member : pkMember){
    const id = member.id;
    var color = "";
    for (let i = 0; i < id.length; i++){
        var c = id.charAt(i)
        const alphabet = "abcdefghijklmnopqrstuvwxyz"
        const hexxabet = "0123456789abcdeffedcba9876"
        c = hexxabet.charAt(alphabet.indexOf(c))
        
        color.padEnd(6,"f")//just in case
        color += c
    }
    return adjustColor(color,settings.store.idSaturation)
}

async function getApplicationAsset(key: string): Promise<string> {
    return (await ApplicationAssetUtils.fetchAssetIds(PLURALKIT_BOT_ID, [key]))[0];
}

const fronterAssets:ActivityAssets={
    large_image: "",
    large_text: "View on Dashboard",
    large_url: "",
}

const frontActivity :Activity = {
    type: ActivityType.PLAYING,
    flags: ActivityFlags.INSTANCE,

    application_id: PLURALKIT_BOT_ID,
    name: "",
    assets: fronterAssets,
    details:"via PluralQuartz",
    state_url:"https://github.com/KassieKitsune/PluralQuartz",
    state:"system",
    timestamps:{},
}

async function setActivity(activity: Activity | null) {
    FluxDispatcher.dispatch({
        type: "LOCAL_ACTIVITY_UPDATE",
        activity,
        socketId: "PQ",
    });
}

async function updateFrontActivity(systemID:string=UserStore.getCurrentUser().id,token:string = settings.store.pkToken){
    
    
    const sys :System=  await Native.pkSystemRequest(systemID)
    const sw :Switch | undefined = await Native.pkFrontersRequest(systemID,token);
    const m :pkMember | undefined | string = sw?.members?.values().next().value
    
    frontActivity.name = m?.display_name
    frontActivity.details = sys?.name

    frontActivity.state = "Via PluralQuartz";
    if (settings.store.showPronounsInRichPresence){frontActivity.name = frontActivity.name+"("+m?.pronouns +")"}
    frontActivity.details_url = "https://dash.pluralkit.me/profile/s/"+sys?.id
    frontActivity.timestamps = {start:sw?.timestamp}
    fronterAssets.large_image = await getApplicationAsset(m.avatar_url);
    fronterAssets.large_url = "https://dash.pluralkit.me/profile/m/"+m?.id;

    setActivity(structuredClone(frontActivity));
}