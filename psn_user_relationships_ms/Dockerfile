FROM golang:alpine

RUN mkdir /PSN_Project

WORKDIR /PSN_Project

ADD go.mod .
ADD go.sum .

RUN go mod download
ADD . .

RUN go install -mod=mod github.com/githubnemo/CompileDaemon

EXPOSE 4200
ENTRYPOINT CompileDaemon --build="go build main.go" --command=./main