package service

import "math/rand"

type FaceService struct{}

func (s *FaceService) AnalyzeFaceDummy() map[string]interface{} {
	return map[string]interface{}{
		"stressLevel": rand.Intn(100),
		"emotions": map[string]int{
			"happy":     rand.Intn(100),
			"sad":       rand.Intn(100),
			"angry":     rand.Intn(100),
			"neutral":   rand.Intn(100),
			"surprised": rand.Intn(100),
		},
		"recommendations": []string{"Istirahat sejenak", "Minum air putih"},
	}
}
