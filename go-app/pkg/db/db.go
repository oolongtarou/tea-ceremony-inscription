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
	protocol := os.Getenv("MYSQL_PROTOCOL")
	db_name := os.Getenv("MYSQL_DATABASE")
	conn_name := os.Getenv("MYSQL_CONN_NAME")
	var path string = fmt.Sprintf("%s:%s@%s(%s)/%s", user, pw, protocol, conn_name, db_name)

	db, err := gorm.Open(mysql.Open(path), &gorm.Config{})
	if err != nil {
		log.Fatal("Db open error:", err.Error())
		return db, err
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