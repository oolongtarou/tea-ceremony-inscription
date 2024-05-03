import { Month } from "../../Months";
import { WordTag } from "../../WordTags";


export function ToWordTags(obj: any): WordTag[] {
    const result: WordTag[] = [];

    for (let item of obj){
        result.push(new WordTag(item.TagId, item.TagName));
    }
    return result;
}


export function ToMonthWordCounts(obj: any): Month[] {
    const result: Month[] = [];

    for (let item of obj){
        result.push(new Month(item.Month, item.WordCount));
    }
    return result;
}