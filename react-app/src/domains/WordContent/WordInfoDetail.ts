export interface WordInfoDetail {
    wordId: number;
    title: string;
    pronunciation: string;
    descriptions: WordDescriptionEntity[];
    months: number[];
    tags: string[];
}

export interface WordDescriptionEntity{
    wordId: number;
    descriptionId: number;
    description: string;
    sourceId: number;
    sourceName: string;
}
