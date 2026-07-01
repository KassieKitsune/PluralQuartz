import { IpcMainInvokeEvent } from "electron";
import PKAPI, { Member, Message, System, SystemFetchOptions } from "pkapi.js";

const api = new PKAPI();

export async function pkMessageRequest(_: IpcMainInvokeEvent,messageID:string){
    const message = await api.getMessage({message:messageID});
    return message;
}

export async function pkSystemRequest(_: IpcMainInvokeEvent,systemID:string,token?:string,fetch?:SystemFetchOptions[]){
    const system = await api.getSystem({system:systemID,token:token,fetch:fetch})
    return system
}
export async function pkFrontersRequest(_: IpcMainInvokeEvent,systemID:string,token?:string){
    const fronters = await api.getFronters({system:systemID,token:token})
    return fronters
}

export async function pkMemberRequest(_: IpcMainInvokeEvent,memberID:string){
    const member = await api.getMember({member:memberID})
    return member
}
