package main

import (
    // "go-app/pkg/db"
    // "go-app/internal/repository"
    // "go-app/internal/entity"
    // "fmt"
    "go-app/internal/infra/api"
)

func main() {
    api.ListenAndServe(":8000")

    // conn, _ := db.Connect()
    // // result, err := repository.FindWorInfoBriefs(1, conn)
    // // result, err := repository.FindWorInfoBriefs(nil, conn)

    // // result, err := repository.FindWordInfo(title:"", pronunciation:"", tagId:0, month:0, conn)

    // // fmt.Println(result)
    // // fmt.Println(result)
    // // fmt.Println(len(result))
    // defer db.Disconnect(conn)
}
