package v1

import (
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"

	"net/http"
	"net/http/httptest"
	"testing"
)

func TestRegisterSystemRoutes(t *testing.T) {
	gin.SetMode(gin.TestMode)

	router := gin.New()
	registerSystemRoutes(router)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/v1/healthz", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
}
