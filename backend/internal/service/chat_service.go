package service

import (
	"emocollab/internal/models"
	"time"
)

type ChatService struct{}

func (s *ChatService) GetChatHistory(userId int) []models.ChatMessage {
	// Dummy data, replace with DB query
	return []models.ChatMessage{
		{ID: 1, SenderID: 1, ReceiverID: 2, Message: "Halo, ada yang bisa dibantu?", CreatedAt: time.Now().Add(-2 * time.Hour)},
		{ID: 2, SenderID: 2, ReceiverID: 1, Message: "Saya ingin konsultasi.", CreatedAt: time.Now().Add(-1 * time.Hour)},
	}
}
