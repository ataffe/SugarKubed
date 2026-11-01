package v1

import (
	"github.com/gin-gonic/gin"

	"github.com/sugarkubed/backend/internal/handlers"
)

func registerSystemRoutes(router *gin.Engine) {

	system_handler := handlers.NewSystemHandler()
	v1 := router.Group("/api/v1")
	{
		v1.GET("/healthz", system_handler.HealthCheck)
	}
}