package main

import (
	"PSN_Projct/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	router := SetupRouter()
	router.Run(":4200")
}

func SetupRouter() *gin.Engine {
	router := gin.Default()
	routes.Route(router)
	return router
}
