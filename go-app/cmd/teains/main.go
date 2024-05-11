package main

import (
    // "go-app/pkg/db"
    // "go-app/internal/repository"
    // "go-app/internal/entity"
    // "fmt"
    // "go-app/pkg/uuid"
    "go-app/internal/infra/api"
)   

func main() {
    api.ListenAndServe(":8080")
}
