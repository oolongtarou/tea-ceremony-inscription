import { Month } from "../../Months";
import { WordTag } from "../../WordTags";
import { WordCardEntity } from "../WordCard/WordCardEntity";


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

export function ToMonths(months: number[]): Month[] {
    const result: Month[] = [];

    for (let month of months){
        result.push(new Month(month, 0));
    }
    return result;
}

export function ToWordCards(obj: any): WordCardEntity[] {
    const result: WordCardEntity[] = [];

    for (let item of obj){
        result.push(new WordCardEntity(item.word_id, item.title, item.pronunciation, item.description, ToMonths(item.months), item.tags));
    }
    return result;
}