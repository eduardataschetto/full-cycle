FROM golang:1.21 AS builder

WORKDIR /app

COPY main.go /app

RUN CGO_ENABLED=0 GOOS=linux go build -o app main.go


FROM scratch

WORKDIR /app

COPY --from=builder app/app .

ENTRYPOINT [ "./app" ]

