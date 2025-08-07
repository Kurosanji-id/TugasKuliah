package api

import (
	"net/http"
	"strconv"
	"github.com/gin-gonic/gin"
	"emocollab/internal/service"
)

func RegisterChatRoutes(r *gin.Engine, chatService *service.ChatService) {
	r.GET("/api/chats/:userId", func(c *gin.Context) {
		userId, _ := strconv.Atoi(c.Param("userId"))
		chats := chatService.GetChatHistory(userId)
		c.JSON(http.StatusOK, chats)
	})
}
