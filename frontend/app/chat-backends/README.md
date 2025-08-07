# Go Facial Emotion Recognition Backend

This project is a scalable Go backend API for real-time facial emotion recognition with camera scanning, JWT authentication, PostgreSQL storage, and Python microservice integration for emotion analysis.

## Features
- User registration & authentication (JWT)
- Upload/scan face images for emotion analysis
- Real-time analysis endpoint (WebSocket-ready)
- Store analysis results and feedback
- Admin endpoint for model retraining
- Scalable, Docker-ready architecture

## Endpoints (Planned)
- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login, get JWT
- `POST /api/scan` — Upload image, get emotion analysis
- `GET /api/analysis/:id` — Get analysis result
- `GET /api/analysis/user/:userId` — Get all user results
- `POST /api/model/feedback` — Submit feedback
- `POST /api/model/train` — Admin: retrain model

## Getting Started
1. Install Go, Docker, and PostgreSQL
2. Clone this repo
3. Run `go mod init chat-backends` and `go mod tidy`
4. Build and run: `go run ./cmd/server/main.go`

## Python Microservice
- The Go backend will call a Python service (gRPC/REST) for emotion inference.

## Contributing
PRs welcome!
