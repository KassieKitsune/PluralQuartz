

interface TypingQuirk {
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

export async function applyQuirk(str:string,quirk:TypingQuirk){
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

