package main

import (
    "go-app/pkg/db"
    "go-app/internal/repository"

    "fmt"
)

func main() {
    conn, _ := db.Connect()

    result, err := repository.FindUsers(conn)

    fmt.Println(result)
    fmt.Println(err)

    defer db.Disconnect(conn)
}
