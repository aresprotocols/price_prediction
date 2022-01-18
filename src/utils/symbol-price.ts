import {formatFloat} from "./format";

export const getSymbolPrice = async (symbol: string): Promise<number> => {
    return fetch( "https://api.aresprotocol.io/api/getPartyPrice/"
        + symbol.replace("-", ""),
        {
            method: "GET",
            mode: "cors",
            headers: {
                source: "datafeed",
            },
        }
    ).then(async (res) => {
        if (res.ok) {
            const result = await res.json();
            return formatFloat(result.data.price, 5);
        }
        return 0;
    }).catch(error => {
        return 0;
    });
}
