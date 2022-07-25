import {encodeAddress} from "@polkadot/util-crypto";
import {Prediction} from "../App";
import BigNumber from "bignumber.js";
import {u8aConcat } from '@polkadot/util';


export const getSubAccount = (symbol: string): string => {
    // why padding space
    // @ts-ignore
    // let prefix = new Uint8Array([...Buffer.from('modl'), ...Buffer.from('py/arest'), ...Buffer.from(' '), ...Buffer.from(symbol)])
    //
    // // padding 0 byte
    // // @ts-ignore
    // let result = new Uint8Array([...prefix, ...Buffer.alloc(32 - prefix.length, 0)]);

    const EMPTY_U8A_32 = new Uint8Array(32);
    // @ts-ignore
    const result = u8aConcat(
        'modl',
        'py/arest',
        symbol,
        EMPTY_U8A_32
    ).subarray(0, 32)
    return encodeAddress(result, 34)
}


export const getReward = async (pres: Prediction[], api: any) => {
    if (api && pres) {
        const result = await Promise.all(pres.map(async item => {
            const address = getSubAccount(item.symbol);
            console.log("get reward for ", address, item.symbol);
            const result = await api.query.system.account(address);
            // @ts-ignore
            let freeBalance = result.data.free.toString();
            if (result) {
                item.totalReward = new BigNumber(freeBalance).shiftedBy(-12).toFixed(2);
            } else {
                item.totalReward = "0";
            }
            return item;
        })).then(res => {
            return res;
        });
        return result;
    }
}