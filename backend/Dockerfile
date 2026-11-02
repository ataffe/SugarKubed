# syntax=docker/dockerfile:1

FROM golang:1.27 AS build-stage

# Set destination for COPY
WORKDIR /app

# Download Go modules
COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o /sugarkubed-api-server ./cmd/api

FROM build-stage AS run-test-stage
RUN go test -v ./...

FROM gcr.io/distroless/base-debian12 AS build-release-stage

WORKDIR /

COPY --from=build-stage /sugarkubed-api-server /sugarkubed-api-server

EXPOSE 8070

USER nonroot:nonroot

ENTRYPOINT ["/sugarkubed-api-server"]

