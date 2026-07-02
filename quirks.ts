import { lutimes } from "node:fs"
import { settings } from "."
import { membersByProxy, proxiesByMember, storedSystem } from "./SystemStore"
import { Switch, System, Member as pkMember } from "pkapi.js"

export var currentQuirk : string
export var quirkMap = new Map()

export interface TypingQuirk {
    keyIn:string,
    keyOut:string,
    keySepIn?:string,
    keySepOut?:string,
    func:CallableFunction
}

export const Quirks = {
    hexQuirk:{
        keyIn:"",
        keyOut:"",
        keySepOut:",",
        func: (input:string) => {
            var result: string = ""
            for (var i = 0; i < input.length; i++){
                result += input.charCodeAt(i).toString(16) + " "
            }
            return result
        }
    },
    capsQuirk:{
        keyIn:"abcdefghijklmnopqrstuvwxyz",
        keyOut:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        func:substitutionQuirk
    },
    lowerQuirk:{
        keyOut:"abcdefghijklmnopqrstuvwxyz",
        keyIn:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        func:substitutionQuirk
    },
    nepQuirk:{
        keyIn:"ee|EE",
        keySepIn:"|",
        keyOut:"33|33",
        keySepOut:"|",
        func: (input:string,keyIn:string,keyOut:string,keySepIn:string,keySepOut:string) => {
            return ":33 < " + substitutionQuirk(input,keyIn,keyOut,keySepIn,keySepOut)
        }
    },
    radioQuirk:{
        keyIn:"",
        keySepIn:"",
        keyOut:"",
        keySepOut:"",
        func: (input:string) => {
            const options = ["bzzt~ ","krrk~ ","~//!~ "]
            return options[Math.floor(Math.random()*options.length)] + input
        }
    },
    altQuirk:{
        keyIn:"",
        keyOut:"",
        keySepOut:",",
        func: (input:string) => {
            var result: string = ""
            for (var i = 0; i < input.length; i++){
                var c:string = input.charAt(i).toLowerCase()
                if (i%2==0){
                    c = c.toUpperCase()
                }
                result += c
            }
            return result
        }
    }
}

//const quirkStr = "💻text;;hexQuirk\nb_text_b;;nepQuirk"
//const quirkStrSplit = quirkStr.split("\n")
//const str :string = "💻One Hell of a Project to be born during"

export async function populateQuirks(){
    var quirkStrSplit = settings.store.typingQuirkJson.split("\n")
    quirkStrSplit.forEach((quirk) => {
        var keySplit = quirk.split("=>")
        quirkMap.set(keySplit[0],keySplit[1])
    })
}

var autoQuirk = ""

export async function quirkifyText(str:string){
    var quirky = str
    quirkMap.forEach((f,p) => {
        var proxySplit = p.split("text")
        if (str.startsWith(proxySplit[0]) && str.endsWith(proxySplit[1])) {
            if (settings.store.typingQuirks === "TQlatch") {autoQuirk = f}

            quirky = proxySplit[0] + applyQuirk(str.replace(RegExp("^"+proxySplit[0]),"").replace(RegExp(proxySplit[1]+"$"),""),Quirks[f]) + proxySplit[1]
            console.log(quirky)
        }
    })
    if (settings.store.typingQuirks === "TQoff") {return str}
    if (settings.store.typingQuirks === "TQfront") {
        console.log("aad")
    }
    if (quirky === str){
        quirky = applyQuirk(str,Quirks[autoQuirk])
    }
    return quirky
}

export function applyQuirk(str:string,quirk:TypingQuirk){
    return quirk.func(str,quirk.keyIn,quirk.keyOut,quirk.keySepIn,quirk.keySepOut) + " \n> " + str
}

function substitutionQuirk(input:string,a:string, b:string,sep:string="",sep2:string=""){
    var a_split : Array<string> = a.split(sep)
    var b_split : Array<string> = b.split(sep2)

    for (var i = 0; i < a_split.length ; i++){
        while (input.includes(a_split[i])){
            input = input.replace(a_split[i],b_split[i])
        }
    }
    return input
}

function serialSubstitutionQuirk(input:string,a:string, b:string,sep:string="",sep2:string=""){
    var result : string = ""
    var i_split : Array<string> = input.split("")
    var a_split : Array<string> = a.split(sep)
    var b_split : Array<string> = b.split(sep2)

    for (var e = 0; e < i_split.length ; e++){
        const idx = a_split.indexOf(i_split[e])
        var c = i_split[e]
        var aC = a_split[idx]
        if (idx !== -1){
            c = b_split[idx]
        }
        result += c
    }
    return result
}

