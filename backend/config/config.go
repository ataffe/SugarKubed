package config

import (
	env "go-slim.dev/env"
)

type Config struct {
	Port             string `env:"PORT"`
	FDC_BASE_URL     string `env:"FDC_BASE_URL"`
	UPSTREAM_TIMEOUT int    `env:"UPSTREAM_TIMEOUT"`
}

func LoadConfig() (*Config, error) {
	err := env.Init()
	if err != nil {
		return nil, err
	}
	cfg := &Config{}
	if err = env.Fill(cfg); err != nil {
		return nil, err
	}
	return cfg, nil
}
