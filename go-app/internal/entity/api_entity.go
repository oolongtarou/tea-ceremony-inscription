package entity

import(
)

// 任意の単語の詳細情報を表す構造体(任意の単語を1つ画面上にフルの語釈付きで表示するために使う)
type LoginResult struct {
	Success bool `json:"success"`
	MailAddressErrorText string `json:"mailAddressErrorText"`
	PasswordErrorText string `json:"passwordErrorText"`
	LoginId int `json:"loginId"`
}