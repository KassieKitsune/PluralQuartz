import { createStore } from "@api/DataStore";

import { Member, Message, Switch, System, SystemFetchOptions } from "pkapi.js";
import { settings, Native } from ".";
import { UserStore } from "@webpack/common";

export var storedSystem : System
export const storedProxies : string[] = []

export async function getSystemData(){
    storedSystem = await Native.pkSystemRequest(UserStore.getCurrentUser().id,settings.store.pkToken,["fronters","members"]);
    console.log(storedSystem)
}
