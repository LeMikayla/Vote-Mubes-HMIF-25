-- === Bersih bersih cik ===
DROP TABLE IF EXISTS votes CASCADE;
DROP TABLE IF EXISTS voters CASCADE;
DROP TABLE IF EXISTS candidates CASCADE;

-- === Create Table ===

-- Tabel Kandidat
CREATE TABLE candidates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    npm VARCHAR(20) UNIQUE NOT NULL,
    vision TEXT,
    mission TEXT,
    image_url VARCHAR(255)
);

-- Tabel Pemilih (Voters)
CREATE TABLE voters (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE,
	role varchar(5) DEFAULT 'user',
    has_voted BOOLEAN DEFAULT FALSE,
    voted_at TIMESTAMP
);

-- Tabel Suara (Votes)
CREATE TABLE votes (
    id SERIAL PRIMARY KEY,
    candidate_id INT REFERENCES candidates(id) ON DELETE CASCADE,
    vote_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE election_settings (
    id SERIAL PRIMARY KEY,
    event_name VARCHAR(255) DEFAULT 'Pemilihan Ketua HMIF',
    end_date TIMESTAMP,
    status VARCHAR(50) DEFAULT 'active', -- 'active' atau 'closed'
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- === DATA DUMMY, HAPUS JIKA SUDAH DEPLOY ===

INSERT INTO election_settings (id, event_name, end_date, status)
VALUES (1, 'Pemilihan Ketua HMIF 2025', NOW() + INTERVAL '1 day', 'active');

-- A. Masukkan Kandidat
INSERT INTO candidates (name, npm, number, vision, mission, image_url) VALUES
('Satria Baja Hitam', '1234567890', 1, 'Patroli Server Tiap Malam', 'orang yang jujur', 'img_satria.jpg'),
('Naruto Uzumaki', '0987654321', 2, 'Ramen Gratis', 'Kekuatan Kepribadian', 'img_naruto.jpg'),
('Spongebob', '1122334455', 3, 'Pelatihan Krabby Patty', 'Kepribadian yang Kekinian', 'img_spongebob.jpg');

-- B. Masukkan Pemilih (Password: 12345)
INSERT INTO voters (username, password, email, role, has_voted, voted_at) VALUES
('mhs_test_01', '12345', 'mhs_test_01@hmif.com', 'user', FALSE, NULL),  -- Akun untuk tes SUKSES
('mhs_test_02', '12345', 'mhs_test_02@hmif.com', 'user', FALSE, NULL),
('mhs_test_03', '12345', 'mhs_test_03@hmif.com', 'user', TRUE, NOW());    -- Akun untuk tes GAGAL (sudah milih)

-- C. Masukkan Suara Awal (Biar grafik gak kosong)
-- Karena user 03 sudah milih, kita kasih 1 suara ke Naruto (ID 2)
INSERT INTO votes (candidate_id) VALUES (2);

ALTER TABLE candidates ADD COLUMN number INT UNIQUE;

-- Akun Atmin cik
INSERT INTO voters (username, password, role, has_voted) 
VALUES ('admin_pusat', 'barbermasrusdi', 'admin', FALSE);