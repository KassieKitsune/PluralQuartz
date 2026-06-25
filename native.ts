import PKAPI, { Message } from "pkapi.js";

const api = new PKAPI

export async function pkMessageRequest(messageID:string){
    return api.getMember({member:messageID})
}