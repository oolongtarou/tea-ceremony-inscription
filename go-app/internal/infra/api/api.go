package api

import (
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	// "go-app/cmd"
	// "go-app/internal"
	"fmt"
	"reflect"

	"go-app/pkg/db"
    "go-app/internal/repository"
	// "go-app/internal/entity"
	"gorm.io/gorm"

	"go-app/internal/converter"
	"go-app/internal/constant"
	// "os"
)

// ユーザーからのリクエストを待機してリクエストに応じてレスポンスする
func ListenAndServe(port string) {
	r := gin.Default()

	// Corsの設定をする
	r.Use(cors.New(GetCorsConf()))

	r.GET("/", Test())

	// conn, err := db.Connect()
	// if err != nil {
	// 	// TODO:ログを出す。
	// 	fmt.Println(err.Error())
	// 	return // DBに繋がらなかったらサーバーを立ち上げても意味がないためリターンする
	// }
	// defer db.Disconnect(conn)

	// r.GET("/words-info", GetWordInfoBriefs(conn))
	// r.GET("/word-detail", GetWordDetail(conn))
	// r.GET("/word-tags", GetAllWordTags(conn))
    // r.GET("/month-word-count", GetAllMonthWordCount(conn))

	r.Run(port)
}

// Cors設定情報を取得する
func GetCorsConf() cors.Config {
	return cors.Config{
		// アクセスを許可したいアクセス元
		AllowOrigins: []string{
			"*",
			// "http://localhost:5173",
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
		fmt.Println(c.Query("title"), reflect.TypeOf(c.Query("title")))
		fmt.Println(c.Query("pronunciation"), reflect.TypeOf(c.Query("pronunciation")))
		fmt.Println(c.Query("tag-id"), reflect.TypeOf(c.Query("tag-id")))
		fmt.Println(c.Query("month"), reflect.TypeOf(c.Query("month")))
		fmt.Println(c.Query("offset"), reflect.TypeOf(c.Query("offset")))
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

func Test()  func(c *gin.Context) {
    return func(c *gin.Context) {

		_, err := db.Connect()
		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"status":  "OK",
				"data": "テストです。",
				"result": "エラーです。",
				// "connection_string": path,
				"msg": err.Error(),
			})     
		} else {
			c.JSON(http.StatusOK, gin.H{
				"status":  "OK",
				"data": "テストです。",
				"result": "成功です。",
				// "connection_string": path,
			})     

		}
	// 	user := os.Getenv("MYSQL_USER")
	// pw := os.Getenv("MYSQL_PASSWORD")
	// db_name := os.Getenv("MYSQL_DATABASE")
	// conn_name := os.Getenv("MYSQL_CONN_NAME")
	// var path string = fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8&parseTime=true", user, pw, conn_name, db_name)
			// c.JSON(http.StatusOK, gin.H{
			// 	"status":  "OK",
			// 	"data": "テストです。",
			// 	"result": path,
			// })    
	
    }
}


