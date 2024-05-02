package db

import (
	"fmt"
	"log"
	"os"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func Connect() (*gorm.DB, error) {
	user := os.Getenv("MYSQL_USER")
	pw := os.Getenv("MYSQL_PASSWORD")
	db_name := os.Getenv("MYSQL_DATABASE")
	var path string = fmt.Sprintf("%s:%s@tcp(tea_db:3306)/%s?charset=utf8&parseTime=true", user, pw, db_name)

	db, err := gorm.Open(mysql.Open(path), &gorm.Config{})
	if err != nil {
		log.Fatal("Db open error:", err.Error())
	}

	fmt.Println("Db connected!")

	return db, err
}

func Disconnect(conn *gorm.DB) {
	db, err := conn.DB()
	if err != nil {
		log.Fatal("Db error:", err.Error())
	}
	db.Close()
	fmt.Println("Db disconnected!")
}