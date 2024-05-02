package main

import (
    "go-app/pkg/db"
    "go-app/internal/repository"

    "fmt"
)

func main() {
    conn, _ := db.Connect()

    // result, err := repository.FindWorInfoBriefs(1, conn)
    // result, err := repository.FindWorInfoBriefs(nil, conn)

    result, err := repository.FindWordInfo("", "か", 3, 1, conn)
    // result, err := repository.FindWordInfo(title:"", pronunciation:"", tagId:0, month:0, conn)

    // fmt.Println(result)
    fmt.Println(result)
    fmt.Println(len(result))
    fmt.Println(err)

    defer db.Disconnect(conn)
}
