import {web3FromAddress} from "@polkadot/extension-dapp";
import {stringToHex, u8aToHex} from "@polkadot/util";
import {decodeAddress} from "@polkadot/util-crypto";


export async function sign(address: string, message: string) {
    const injector = await web3FromAddress(address);
    const signRaw = injector?.signer?.signRaw;
    if (!!signRaw) {
        const { signature } = await signRaw({
            address: address,
            data: stringToHex(message),
            type: 'bytes'
        });
        return [u8aToHex(decodeAddress(address)), signature, message]
    }
    return null
}