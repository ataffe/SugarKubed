package config

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func setupEnv(t *testing.T, dotEnv string) {
	t.Helper()

	for _, key := range []string{"PORT", "FDC_BASE_URL", "UPSTREAM_TIMEOUT", "APP_ENV"} {
		t.Setenv(key, "")
	}

	dir := t.TempDir()
	if dotEnv != "" {
		if err := os.WriteFile(filepath.Join(dir, ".env"), []byte(dotEnv), 0o600); err != nil {
			t.Fatalf("failed to write .env file: %v", err)
		}
	}
	t.Chdir(dir)
}

func TestLoadConfigFromDotEnvFile(t *testing.T) {
	setupEnv(t, "PORT=8080\nFDC_BASE_URL=https://api.nal.usda.gov/fdc/v1\nUPSTREAM_TIMEOUT=30\n")

	cfg, err := LoadConfig()
	require.NoError(t, err)

	assert.Equal(t, "8080", cfg.Port)
	assert.Equal(t, "https://api.nal.usda.gov/fdc/v1", cfg.FDC_BASE_URL)
	assert.Equal(t, 30, cfg.UPSTREAM_TIMEOUT)
}

func TestLoadConfigFromEnvironmentVariables(t *testing.T) {
	setupEnv(t, "")
	t.Setenv("PORT", "9090")
	t.Setenv("FDC_BASE_URL", "http://localhost:4000")
	t.Setenv("UPSTREAM_TIMEOUT", "5")

	cfg, err := LoadConfig()
	require.NoError(t, err)

	assert.Equal(t, "9090", cfg.Port)
	assert.Equal(t, "http://localhost:4000", cfg.FDC_BASE_URL)
	assert.Equal(t, 5, cfg.UPSTREAM_TIMEOUT)
}

func TestLoadConfigMissingValuesAreZero(t *testing.T) {
	setupEnv(t, "")

	cfg, err := LoadConfig()
	require.NoError(t, err)

	assert.Equal(t, &Config{}, cfg)
}

func TestLoadConfigInvalidTimeout(t *testing.T) {
	setupEnv(t, "PORT=8080\nUPSTREAM_TIMEOUT=not-a-number\n")

	cfg, err := LoadConfig()

	assert.Error(t, err)
	assert.Nil(t, cfg)
}
