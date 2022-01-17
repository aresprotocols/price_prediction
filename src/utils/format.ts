import {ApiPromise} from "@polkadot/api";

export interface timeDiffRes {
    day: number,
    hour: number,
    minute: number
}

export function formatFloat(src: number, pos: number): number{
    return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
}

function timeDif(start: Date, end: Date): timeDiffRes {
    const diffMs = end.getTime() - start.getTime();
    const diffDay = Math.floor(diffMs / (24 * 3600 * 1000));
    const l1 = diffMs % (24*3600*1000);
    const diffHours = Math.floor(l1 /(3600*1000));
    //计算相差分钟数
    const leave2 = l1 % (3600 * 1000);
    const diffMinutes = Math.floor(leave2 / (60 * 1000));
    return {
        day: diffDay,
        hour: diffHours,
        minute: diffMinutes
    }
}



export const clacStartTime = async (api: ApiPromise, endBlock: number): Promise<[timeDiffRes, string]> => {
    const lastHeader = await api.rpc.chain.getHeader();
    const lastBlockNumber = Number.parseInt((lastHeader?.number.toHuman()+"").replace(",", ""));
    console.log(lastHeader?.number.toHuman());
    console.log("lastHeader:", lastBlockNumber, endBlock);
    const diff = (endBlock - lastBlockNumber) * 6 * 1000;
    const endTime = Date.parse(new Date() + "") + diff;
    console.log("cur:", new Date(endTime).toLocaleString());
    const diffTime = timeDif(new Date(), new Date(endTime));
    return [diffTime, new Date(endTime).toLocaleString()]
}
