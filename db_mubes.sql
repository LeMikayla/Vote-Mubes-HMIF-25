-- === Bersih bersih cik ===
DROP TABLE IF EXISTS votes CASCADE;
DROP TABLE IF EXISTS voters CASCADE;
DROP TABLE IF EXISTS candidates CASCADE;

-- === Create Table ===

-- Tabel Kandidat
CREATE TABLE candidates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    vision TEXT,
    mission TEXT,
    image_url VARCHAR(255)
);

-- Tabel Pemilih (Voters)
CREATE TABLE voters (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
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

-- === DATA DUMMY, HAPUS JIKA SUDAH DEPLOY ===

-- A. Masukkan Kandidat
INSERT INTO candidates (name, vision, mission, image_url) VALUES
('Satria Baja Hitam', 'Membasmi Bug', 'Patroli Server Tiap Malam', 'img_satria.jpg'),
('Naruto Uzumaki', 'Mensejahterakan Wibu', 'Ramen Gratis', 'img_naruto.jpg'),
('Spongebob', 'Siap Sedia', 'Pelatihan Krabby Patty', 'img_spongebob.jpg');

-- B. Masukkan Pemilih (Password: 12345)
INSERT INTO voters (username, password, role, has_voted, voted_at) VALUES
('mhs_test_01', '12345', FALSE, 'user', NULL),  -- Akun untuk tes SUKSES
('mhs_test_02', '12345', FALSE, 'user', NULL),
('mhs_test_03', '12345', TRUE, 'user', NOW());    -- Akun untuk tes GAGAL (sudah milih)

-- C. Masukkan Suara Awal (Biar grafik gak kosong)
-- Karena user 03 sudah milih, kita kasih 1 suara ke Naruto (ID 2)
INSERT INTO votes (candidate_id) VALUES (2);

-- Role default = user
ALTER TABLE voters ADD COLUMN role VARCHAR(20) DEFAULT 'user';

-- Akun Atmin cik
INSERT INTO voters (username, password, role, has_voted) 
VALUES ('admin_pusat', 'barbermasrusdi', 'admin', FALSE);