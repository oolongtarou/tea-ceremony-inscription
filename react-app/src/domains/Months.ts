export class Month {
    month: number;
    wordCount: number;
    constructor(month: number, wordCount: number) {
        this.month = month;
        this.wordCount = wordCount;
    }

    title():string {
        switch(this.month){
            case -1:
                return "すべて";
            case 0:
                return "無季";
            case 1:
                return "1月";
            case 2:
                return "2月";
            case 3:
                return "3月";
            case 4:
                return "4月";
            case 5:
                return "5月";
            case 6:
                return "6月";
            case 7:
                return "7月";
            case 8:
                return "8月";
            case 9:
                return "9月";
            case 10:
                return "10月";
            case 11:
                return "11月";
            case 12:
                return "12月";
            default:
                throw new Error("monthの値が不正です。");
        }
    }

    season():string {
        switch(this.month){
            case -1:
                return "all";
            case 0:
                return "no";
            case 1:
                return "winter";
            case 2:
                return "winter";
            case 3:
                return "spring";
            case 4:
                return "spring";
            case 5:
                return "spring";
            case 6:
                return "summer";
            case 7:
                return "summer";
            case 8:
                return "summer";
            case 9:
                return "autumn";
            case 10:
                return "autumn";
            case 11:
                return "autumn";
            case 12:
                return "winter";
            default:
                throw new Error("monthの値が不正です。");
        }
    }
}

export const addAllWordCounts = (months: Month[]): number => months.reduce((total, month) => total + month.wordCount, 0);

export const months:Month[] = [
    new Month(1, 0),
    new Month(2, 0),
    new Month(3, 0),
    new Month(4, 0),
    new Month(5, 0),
    new Month(6, 0),
    new Month(7, 0),
    new Month(8, 0),
    new Month(9, 0),
    new Month(10, 0),
    new Month(11, 0),
    new Month(12, 0),
    new Month(0, 0),
]
