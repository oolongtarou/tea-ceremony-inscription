import { Month } from "../../domains/Months";

export class WordCardEntity {
    wordId: number;
    title: string;
    pronunciation: string;
    description: string;
    months: Month[];
    tags: string[];

    constructor(wordId: number, title:string, pronunciation:string, description:string, months:Month[], tags:string[]) {
        this.wordId = wordId;
        this.title = title;
        this.pronunciation = pronunciation;
        this.description = description;
        this.months =  months;
        this.tags = tags;
    }
}