package entity

import(
	"gorm.io/datatypes"
)

// 任意の単語の詳細情報を表す構造体(任意の単語を1つ画面上にフルの語釈付きで表示するために使う)
type WordInfoDetail struct {
	WordId int `json:"word_id"`
	Title string `json:"title"`
	Pronunciation string `json:"pronunciation"`
	Descriptions []WordDescription `json:"descriptions"`
	Months []int `json:"months"`
	Tags []string `json:"tags"`
}

// 単語の語釈を表す構造体
type WordDescription struct {
	WordId int `json:"word_id"`
	DescriptionId int `json:"description_id"`
	Description string `json:"description"`
	SourceId int `json:"source_id"`
	SourceName string `json:"source_name"`
}

// 任意の単語の概要情報を表す構造体(画面で単語を選択する際に概要の情報を一覧として表示するために使う)
type WordInfoBrief struct {
	WordId int `json:"word_id"`
	Title string `json:"title"`
	Pronunciation string `json:"pronunciation"`
	Description string `json:"description"`
	Months []int `json:"months"`
	Tags []string `json:"tags"`
}

// 任意の単語の概要情報を表す構造体を取得する過程で必要な構造体
// HACK:DBからデータを取得する際に「WordInfoBrief」の形でデータが取得できればこの構造体は必要ないが、今のところ良い実装方法が見つからないためこれを定義している。
type WordInfoBriefTemp struct {
	WordId int
	Title string
	Pronunciation string
	Descriptions datatypes.JSON `json:"months"`
	Months datatypes.JSON `json:"months"`
	Tags datatypes.JSON `json:"tgs"`
}	