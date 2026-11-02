package main

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"

	"log/slog"

	"github.com/ataffe/SugarKubed/backend/config"
	v1 "github.com/ataffe/SugarKubed/backend/internal/api/v1"
)

func main() {
	cfg, err := config.LoadConfig()
	if err != nil {
		slog.Error("Unable to load config: ", "error", err.Error())
		os.Exit(1)
	}

	port := ":" + cfg.Port
	slog.Info("Starting http server on port", "port", port)

	router := gin.Default()
	v1.RegisterRoutes(router)
	http.ListenAndServe(port, router)
}
