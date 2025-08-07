-- Users
INSERT INTO users (id, name, role) VALUES
(1, 'Budi Santoso', 'employee'),
(2, 'Sarah Johnson', 'hr');

-- Chat Messages
INSERT INTO chat_messages (id, sender_id, receiver_id, message, created_at) VALUES
(1, 1, 2, 'Halo, ada yang bisa dibantu?', NOW() - INTERVAL '2 hours'),
(2, 2, 1, 'Saya ingin konsultasi.', NOW() - INTERVAL '1 hours');
