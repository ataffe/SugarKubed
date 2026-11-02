package main

import (
	"github.com/gin-gonic/gin"

	v1 "github.com/ataffe/SugarKubed/backend/internal/api/v1"
)


func main() {
	router := gin.Default()
	v1.RegisterRoutes(router)
	router.Run()
}