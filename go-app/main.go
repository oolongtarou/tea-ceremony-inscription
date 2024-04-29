package main

import (
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
    "time"
    "net/http"
)

func main() {
    r := gin.Default()

  // ここからCorsの設定
    r.Use(cors.New(cors.Config{
    // アクセスを許可したいアクセス元
        AllowOrigins: []string{
            "http://localhost:5173",
        },

        // アクセスを許可したいHTTPメソッド(以下の例だとPUTやDELETEはアクセスできません)
        AllowMethods: []string{
            "POST",
            "GET",
            "OPTIONS",
        },

        // 許可したいHTTPリクエストヘッダ
        AllowHeaders: []string{
            "Access-Control-Allow-Credentials",
            "Access-Control-Allow-Headers",
            "Content-Type",
            "Content-Length",
            "Accept-Encoding",
            "Authorization",
        },

        // cookieなどの情報を必要とするかどうか
        AllowCredentials: true,
        // preflightリクエストの結果をキャッシュする時間
        MaxAge: 24 * time.Hour,
    }))

    r.GET("/", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "message": "hello world",
        })
    })

    r.Run(":8000")
}