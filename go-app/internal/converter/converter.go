package converter

import(
	"fmt"

	"strings"
	"strconv"
	"go-app/internal/entity"
)

// 複数の単語情報(簡易版)の一時データをちゃんとして単語情報(簡易版)に変換する
func ToWordInfoBriefArray(source []entity.WordInfoBriefTemp) []entity.WordInfoBrief {
	results := make([]entity.WordInfoBrief, len(source))

	for i, each := range source {
		results[i] = ToWordInfoBrief(each)
	}

	return results
}

// 任意の単語情報(簡易版)の一時データをちゃんとして単語情報(簡易版)に変換する
func ToWordInfoBrief(source entity.WordInfoBriefTemp) entity.WordInfoBrief {
	converted := entity.WordInfoBrief {
		WordId:source.WordId,
		Title:source.Title,
		Pronunciation:source.Pronunciation,
		Description:string(source.Descriptions),
		Months:ToIntArray(strings.Split(string(source.Months), ",")),
		Tags:strings.Split(string(source.Tags), ",")}

	return converted
}

func ToIntArray(strArray []string) []int{
	intSlice := make([]int, len(strArray))

	for i, str := range strArray {
		// Atoi関数で文字列を整数に変換
		num, err := strconv.Atoi(str)
		if err != nil {
			fmt.Printf("エラー: %v\n", err)
			return []int{}
		}
		intSlice[i] = num
	}
	return intSlice
}

// 文字列をintに変換して返す。変換できなければintの初期値(0)を返す
func ToIntOrDefault(val string) int {
	converted, err := strconv.Atoi(val)
	if err != nil {
		return 0
	}
	return converted
}

// 文字列をintに変換して返す。変換できなければ指定した値を返す
func ToIntOr(val string, retVal int) int {
	converted, err := strconv.Atoi(val)
	if err != nil {
		return retVal
	}
	return converted
}