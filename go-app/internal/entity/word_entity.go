package entity

import(
	"gorm.io/datatypes"
)

// 任意の単語の詳細情報を表す構造体
type WordInfoDetail struct {
	WordId int `json:"word_id"`
	Title string `json:"title"`
	Pronunciation string `json:"pronunciation"`
	Descriptions []WordDescription `json:"descriptions"`
	Months []int `json:"months"`
	Tags []string `json:"tags"`
}

type WordDescription struct {
	description string
	source string
}

// 任意の単語の概要情報を表す構造体
type WordInfoBrief struct {
	WordId int `json:"word_id"`
	Title string `json:"title"`
	Pronunciation string `json:"pronunciation"`
	Description string `json:"description"`
	Months []int `json:"months"`
	Tags []string `json:"tags"`
}

// 任意の単語の概要情報を表す構造体を取得する過程で必要な構造体
type WordInfoBriefTemp struct {
	WordId int
	Title string
	Pronunciation string
	Descriptions datatypes.JSON `json:"months"`
	Months datatypes.JSON `json:"months"`
	Tags datatypes.JSON `json:"tgs"`
}	