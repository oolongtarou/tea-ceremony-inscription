import { Month } from "../../Months";
import { WordTag } from "../../WordTags";
import { WordCardEntity } from "../WordCard/WordCardEntity";
import { WordDescriptionEntity, WordInfoDetail } from "../WordContent/WordInfoDetail";


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

export function toWordDetail(obj: any): WordInfoDetail {
    return new WordInfoDetail(
        obj.word_id,
        obj.title,
        obj.pronunciation,
        toDescriptions(obj.descriptions),
        ToMonths(obj.months),
        obj.tags
    )
}

function toDescriptions(obj: any): WordDescriptionEntity[] {
    const result: WordDescriptionEntity[] = [];

    for (let item of obj) {
        result.push(new WordDescriptionEntity(item.word_id, item.description_id, item.description, item.source_id, item.source_name))
    }
    return result;
}