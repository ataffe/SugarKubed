package handlers

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

type SystemHandler struct {}

func NewSystemHandler() *SystemHandler {
	return &SystemHandler{}
}

func (h *SystemHandler) HealthCheck(c *gin.Context) {
	// TODO Check FDA FoodData Central API is up
	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
	})
}