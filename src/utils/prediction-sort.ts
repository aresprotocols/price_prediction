import {Prediction} from "App";

export const predictionSort = (sortBy: string, predictions: Prediction[]): Prediction[] => {
    const newPre = new Array<Prediction>();
    if (sortBy === "startTime") {
        console.log("startTime")
        predictions?.sort(
            (pre, next) =>
                Number.parseInt(pre.start.replaceAll(",", "")) -
                Number.parseInt(next.start.replaceAll(",", ""))
        ).forEach(item => {
            newPre.push(item);
        })
    } else if (sortBy === "endTime") {
        console.log("endTime")
        predictions?.sort(
            (pre, next) =>
                Number.parseInt(next.end.replaceAll(",", "")) -
                Number.parseInt(pre.end.replaceAll(",", ""))
        ).forEach(item => {
            newPre.push(item);
        })
    }
    return newPre;
}
