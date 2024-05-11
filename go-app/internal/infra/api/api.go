package api

import (
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	// "go-app/cmd"
	// "go-app/internal"
	"fmt"
	// "reflect"

	"go-app/pkg/db"
    "go-app/internal/repository"
	// "go-app/internal/entity"
	"gorm.io/gorm"

	"go-app/internal/converter"
	"go-app/internal/constant"
	// "os"

	"github.com/gin-contrib/sessions"
    "github.com/gin-contrib/sessions/cookie"
)

// ユーザーからのリクエストを待機してリクエストに応じてレスポンスする
func ListenAndServe(port string) {
	r := gin.Default()

	store := cookie.NewStore([]byte("secret"))
    r.Use(sessions.Sessions("mysession", store))
	// Corsの設定をする
	r.Use(cors.New(GetCorsConf()))

	conn, err := db.Connect()
	if err != nil {
		// TODO:ログを出す。
		fmt.Println(err.Error())
		return // DBに繋がらなかったらサーバーを立ち上げても意味がないためリターンする
	}
	defer db.Disconnect(conn)

	r.GET("/words-info", GetWordInfoBriefs(conn))
	r.GET("/word-detail", GetWordDetail(conn))
	r.GET("/word-tags", GetAllWordTags(conn))
    r.GET("/month-word-count", GetAllMonthWordCount(conn))
	r.POST("/login", func(c *gin.Context){
		session := sessions.Default(c)
		session.Set("mailAddress", c.PostForm("mailAddress"))
		session.Set("password", c.PostForm("password"))

        session.Save()

		c.JSON(http.StatusOK, gin.H{
			"status": "OK",
			"loginId": 0,
		})
	})

	r.GET("/logout", func(c *gin.Context){
     // セッションの破棄
		session := sessions.Default(c)
		// fmt.Println("mailAddress:", session.Get("mailAddress"))
		// fmt.Println("password:", session.Get("password"))

		session.Clear()
		session.Options(sessions.Options{Path: "/", MaxAge: -1})
		session.Save()

		c.JSON(http.StatusOK, gin.H{
			"status": "OK",
			"loginId": 0,
			"err": "ログアウト完了",
		})
	})
	// r.POST("/login", Login(conn))

	r.Run(port)
}

// Cors設定情報を取得する
func GetCorsConf() cors.Config {
	return cors.Config{
		// アクセスを許可したいアクセス元
		AllowOrigins: []string{
			"http://localhost:5173",
			"https://tea-ins-a7ffe.web.app",
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
	}
}

func GetWordInfoBriefs(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		title := c.Query("title")
		pronunciation := c.Query("pronunciation")
		tagId := converter.ToIntOrDefault(c.Query("tag-id"))
		month := converter.ToIntOrDefault(c.Query("month"))
		offset := converter.ToIntOr(c.Query("offset"), 0)
		limit := constant.WORD_LIMIT_PER_REQUEST
		fmt.Println(offset)
		data, err := repository.FindWorInfoBriefArray(title, pronunciation, tagId, month, offset, limit , db)
		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"status":  "NG",
				"data": err.Error(),
			})
		} else {
			c.JSON(http.StatusOK, gin.H{
				"status":  "OK",
				"data": data,
			})
		}
	}
}

func GetWordDetail(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		wordId := converter.ToIntOrDefault(c.Query("word-id"))

		data, err := repository.FindWordInfoDetail(wordId, db)
		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"status":  "NG",
				"data": err.Error(),
			})
		} else {
			c.JSON(http.StatusOK, gin.H{
				"status":  "OK",
				"data": data,
			})
		}
	}
}

func GetAllWordTags(db *gorm.DB)  func(c *gin.Context) {
	return func(c *gin.Context) {
		data, err := repository.FindAllTags(db)
		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"status":  "NG",
				"data": err.Error(),
			})
		} else {
			c.JSON(http.StatusOK, gin.H{
				"status":  "OK",
				"data": data,
			})
		}
	}
}

func GetAllMonthWordCount(db *gorm.DB)  func(c *gin.Context) {
    return func(c *gin.Context) {
        data, err := repository.FindAllMonthWordCount(db)
        if err != nil {
            c.JSON(http.StatusOK, gin.H{
                "status":  "NG",
                "data": err.Error(),
            })
        } else {
            c.JSON(http.StatusOK, gin.H{
                "status":  "OK",
                "data": data,
            })
        }
    }
}