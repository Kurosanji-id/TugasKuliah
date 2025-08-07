package main

import (
	"github.com/gin-gonic/gin"
	"emocollab/internal/api"
	"emocollab/internal/service"
)

func main() {
	r := gin.Default()
	chatService := &service.ChatService{}
	faceService := &service.FaceService{}

	api.RegisterChatRoutes(r, chatService)
	api.RegisterFaceRoutes(r, faceService)

	r.Run(":8080")
}
