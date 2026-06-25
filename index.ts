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
import { Member as pkMember } from "pkapi.js";

const Native = VencordNative.pluginHelpers.PluralQuartz as PluginNative<typeof import("./native")>;
var apiDelay = 0;
const apiDelayStep = 200;

const PLURALKIT_BOT_ID = "466378653216014359";

const cachedPKColors = new Map();

const Devs = /* #__PURE__*/ Object.freeze({
    KassieKitsune:{
        name: "Philosopher's Stone System",
        id:173066847887949825n
    }
})

const settings = definePluginSettings({
    minLightness: {
        description: "Minimium lightness, in %. Change if the colors are too light or too dark",
        type: OptionType.SLIDER,
        markers: [0,10,20,25,30,40,50,60,75,80,85,90,100],
        default: 0,
        stickToMarkers: false
    },
    maxLightness: {
        description: "Maxium Lightness, in %. Change if the colors are too light or too dark",
        type: OptionType.SLIDER,
        markers: [0,10,20,25,30,40,50,60,75,80,85,90,100],
        default: 100,
        stickToMarkers: false
    },
    defaultColor: {
        description: "#Hex color to display for PluralkitMembers Users without a color set\n (leave blank for Discord/Theme defaults)",
        type: OptionType.STRING,
        default: "#FF00FF"
    }
});

export default definePlugin({
    name: "PluralQuartz",
    description: "Applies colors to PluralKit webhook nametags  ",
    tags: ["Appearance", "Customisation"],
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
                
                pkRecordMessageMemberColorRateLimited(context?.message?.id,username);
                return settings.store.defaultColor
            }
            return adjustColor(cachedPKColors.get(username));
            
        }

        return colorString;
    }
});

function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function pkRecordMessageMemberColorRateLimited(messageID:string,username:string){
    //cachedPKColors.set(username,settings.store.defaultColor)
        
    apiDelay+=apiDelayStep;
    await sleep(apiDelay);
    apiDelay -= apiDelayStep;
    console.log(apiDelay);
            
    const message = await Native.pkMessageRequest(messageID);
        
    if (message !== undefined){
        const member: pkMember = message.member;
        var color = member.color;

        cachedPKColors.set(username,color);
            
        console.log(username+" : "+color);
    }
    else{console.error("Could not Find PK Message");}
    
}

function adjustColor(color:string){
    var hslColor = hexToHSL(color)
    
    if (hslColor.lightness < settings.store.minLightness){
        hslColor.lightness = settings.store.minLightness
    }
    else if (hslColor.lightness > settings.store.maxLightness){
        hslColor.lightness = settings.store.maxLightness
    }
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
  return `#${f(0)}${f(8)}${f(4)}`;
}

