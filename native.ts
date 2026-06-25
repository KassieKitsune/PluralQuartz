import { IpcMainInvokeEvent } from "electron";
import PKAPI, { Message } from "pkapi.js";

const api = new PKAPI();

export async function pkMessageRequest(_: IpcMainInvokeEvent,messageID:string){
    const message = await api.getMessage({message:messageID});
    return message;
}