package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"

	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHealthCheck(t *testing.T) {
	gin.SetMode(gin.TestMode)
	systemHandler := NewSystemHandler()

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest(http.MethodGet, "/health", nil)

	systemHandler.HealthCheck(c)

	assert.Equal(t, 200, w.Code)

	var body map[string]string
	if err := json.Unmarshal(w.Body.Bytes(), &body); err != nil {
		t.Fatalf("failed to decode response body: %v", err)
	}

	if body["status"] != "ok" {
		t.Errorf(`expected status "ok" got %q`, body["status"])
	}
}
