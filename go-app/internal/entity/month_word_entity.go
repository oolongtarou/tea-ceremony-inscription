package entity

// 各月に対して合計で何単語が登録されているのかを表す構造体
type MonthWordEntity struct {
	Month int
	WordCount int
}