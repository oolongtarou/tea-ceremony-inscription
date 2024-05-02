package main

import (
    "go-app/pkg/db"
    "go-app/internal/repository"
    "go-app/internal/entity"
    "fmt"
)

func main() {
    conn, _ := db.Connect()

    // result, err := repository.FindWorInfoBriefs(1, conn)
    // result, err := repository.FindWorInfoBriefs(nil, conn)

    user := entity.User {
        UserId:10,
        UserName:"佐藤",
        MailAddress:"gmail@gmail.com",
        Password:"パスワード"}

    err := repository.CreateUser(user, conn)
    // result, err := repository.FindWordInfo(title:"", pronunciation:"", tagId:0, month:0, conn)

    // fmt.Println(result)
    // fmt.Println(result)
    // fmt.Println(len(result))
    fmt.Println(err)

    defer db.Disconnect(conn)
}
