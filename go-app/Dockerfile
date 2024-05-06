FROM golang:1.22.2-bullseye as build

WORKDIR /go/src/app

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY . .

# RUN go build -o main ./cmd/teains/main.go
# CMD ["./main"]