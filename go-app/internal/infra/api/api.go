package api

import (
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	// "go-app/cmd"
	// "go-app/internal"
	// "fmt"

	"go-app/pkg/db"
    "go-app/internal/repository"
	// "go-app/internal/entity"
	"gorm.io/gorm"
    "fmt"
	"go-app/internal/converter"
	"go-app/internal/constant"
)

// ユーザーからのリクエストを待機してリクエストに応じてレスポンスする
func ListenAndServe(port string) {
	r := gin.Default()

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

	r.Run(port)
}

// Cors設定情報を取得する
func GetCorsConf() cors.Config {
	return cors.Config{
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
	}
}

func GetWordInfoBriefs(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		title := c.Query("title")
		pronunciation := c.Query("pronunciation")
		tagId := converter.ToIntOrDefault(c.Query("tag-id"))
		month := converter.ToIntOrDefault(c.Query("month"))
		offset := converter.ToIntOr(c.Query("offset"), 0)
		limit := offset + constant.WORD_LIMIT_PER_REQUEST

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
