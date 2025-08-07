package api

import (
	"emocollab/internal/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

func RegisterFaceRoutes(r *gin.Engine, faceService *service.FaceService) {
	r.POST("/api/face/analyze", func(c *gin.Context) {
		// Dummy: return random analysis
		result := faceService.AnalyzeFaceDummy()
		c.JSON(http.StatusOK, result)
	})
}
