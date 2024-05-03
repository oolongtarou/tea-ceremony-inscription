export interface Month {
    month: number;
    title: string;
    season: string;
    wordCount: number;
}

export const months = [
    {month:-1, title: "すべて", season:"all", wordCount: 1111},
    {month:0, title: "無季", season:"no", wordCount: 321},
    {month:1, title: "1月", season:"winter", wordCount: 23},
    {month:2, title: "2月", season:"winter", wordCount: 346},
    {month:3, title: "3月", season:"spring", wordCount: 56},
    {month:4, title: "4月", season:"spring", wordCount: 123},
    {month:5, title: "5月", season:"spring", wordCount: 546},
    {month:6, title: "6月", season:"summer", wordCount: 32},
    {month:7, title: "7月", season:"summer", wordCount: 8},
    {month:8, title: "8月", season:"summer", wordCount: 234},
    {month:9, title: "9月", season:"autumn", wordCount: 32},
    {month:10, title: "10月", season:"autumn", wordCount: 31},
    {month:11, title: "11月", season:"autumn", wordCount: 221},
    {month:12, title: "12月", season:"winter", wordCount: 98},
]