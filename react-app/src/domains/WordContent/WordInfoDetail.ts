import { Month } from "../../Months";

export class WordInfoDetail {
    wordId: number;
    title: string;
    pronunciation: string;
    descriptions: WordDescriptionEntity[];
    months: Month[];
    tags: string[];

    constructor(wordId: number, title: string, pronunciation: string, descriptions: WordDescriptionEntity[], months: Month[], tags: string[]) {
        this.wordId = wordId;
        this.title = title;
        this.pronunciation = pronunciation;
        this.descriptions = descriptions;
        this.months = months;
        this.tags = tags;
    }
}

export class WordDescriptionEntity{
    wordId: number;
    descriptionId: number;
    description: string;
    sourceId: number;
    sourceName: string;

    constructor(wordId: number, descriptionId: number, description: string, sourceId:number, sourceName: string) {
        this.wordId = wordId;
        this.descriptionId = descriptionId;
        this.description = description;
        this.sourceId = sourceId;
        this.sourceName = sourceName;
    }
}
