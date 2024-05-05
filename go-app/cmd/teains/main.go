package main

import (
    // "go-app/pkg/db"
    // "go-app/internal/repository"
    // "go-app/internal/entity"
    // "fmt"
    "go-app/internal/infra/api"
)

// import "github.com/gin-gonic/gin"

// import "net/http"

func main() {
	// conn, err := db.Connect()
	// if err != nil {
	// 	// TODO:ログを出す。
	// 	fmt.Println(err.Error())
	// 	return // DBに繋がらなかったらサーバーを立ち上げても意味がないためリターンする
	// } else {
    //     fmt.Println("db connected")
    // }
	// defer db.Disconnect(conn)
    api.ListenAndServe(":8080")
    // engine:= gin.Default()
    // engine.GET("/", func(c *gin.Context) {
    //     c.JSON(http.StatusOK, gin.H{
    //         "message": "hello world",
    //     })
    // })
    // engine.Run(":8080")
}
