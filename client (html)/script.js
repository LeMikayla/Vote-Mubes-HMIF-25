
// Konfigurasi
// ============================================
const API_BASE_URL = 'http://localhost:3000/api/vote';
let currentNIS = '';
let selectedCandidate = null;


// ELEMENT 
// ============================================
const nisInput = document.getElementById('nis-input');
const verifyBtn = document.getElementById('verify-btn');
const loginError = document.getElementById('login-error');
const loginSection = document.getElementById('login-section');
const votingSection = document.getElementById('voting-section');
const candidatesContainer = document.getElementById('candidates-container');
const confirmVoteBtn = document.getElementById('confirm-vote-btn');


// FUNGSI UTAMA
// ============================================

// Test koneksi ke server
async function testConnection() {
    try {
        const response = await fetch('http://localhost:3000/health');
        if (response.ok) {
            console.log('Terhubung ke server!');
            return true;
        }
    } catch (error) {
        console.error('Server tidak terhubung: ', error);
        showError('Server tidak terhubung. Pastikan backend sedang berjalan.');
        return false;
    }
}

// Tampilkan error
function showError(message) {
    if (loginError) {
        loginError.textContent = message;
        loginError.style.display = 'block';
    }
}

// Sembunyikan error
function hideError() {
    if (loginError) {
        loginError.style.display = 'none';
    }
}

// Verifikasi NIM
async function verifyNIS() {
    const nis = nisInput.value.trim();

    if (!nis) {
        showError('NIM harus diisi');
        return;
    }

    // Test koneksi dulu
    const isConnected = await testConnection();
    if (!isConnected) return;

    hideError();

    try {
        console.log('Verifikasi NIM:', nis);

        // Gunakan timeout untuk prevent infinite waiting
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(`${API_BASE_URL}/check/${nis}`, {
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log('Data response:', data);

        if (data.success) {
            if (data.data.hasVoted) {
                showError('NIM ini sudah melakukan voting');
            } else {
                // Berhasil
                currentNIS = nis;
                loginSection.classList.add('hidden');
                votingSection.classList.remove('hidden');
                loadCandidates();
            }
        } else {
            showError('Gagal verifikasi: ' + data.error);
        }

    } catch (error) {
        console.error('Verify error:', error);

        if (error.name === 'AbortError') {
            showError('Timeout: Server tidak merespon. Coba refresh halaman.');
        } else if (error.message.includes('Failed to fetch')) {
            showError('Tidak dapat terhubung ke server. Pastikan: 1. Server backend jalan (node server.js) 2. Port 3000 tidak dipakai lain');
        } else {
            showError('Error: ' + error.message);
        }
    }
}

// Load kandidat
async function loadCandidates() {
    try {
        const response = await fetch(`${API_BASE_URL}/candidates`);
        const data = await response.json();

        if (data.success && data.data) {
            renderCandidates(data.data);
        }
    } catch (error) {
        console.error('Load candidates error:', error);
    }
}

// Render kandidat ke HTML <-- Nanti kelen ganti lahya
function renderCandidates(candidates) {
    if (!candidatesContainer) return;

    candidatesContainer.innerHTML = '';

    candidates.forEach(candidate => {
        const card = document.createElement('div');
        card.className = 'candidate-card';
        card.innerHTML = `
            <h3>${candidate.name}</h3>
            <p><strong>Kelas:</strong> ${candidate.class}</p>
            <p><strong>Visi:</strong> ${candidate.vision || '-'}</p>
            <button class="select-btn" data-id="${candidate.id}">
                Pilih Kandidat Ini
            </button>
        `;

        candidatesContainer.appendChild(card);

        // Event listener untuk tombol pilih
        const selectBtn = card.querySelector('.select-btn');
        selectBtn.addEventListener('click', () => {
            selectedCandidate = candidate;
            alert(`Anda memilih: ${candidate.name}`);

            // Simpan ke localStorage untuk sementara
            localStorage.setItem('selectedCandidate', JSON.stringify(candidate));
            localStorage.setItem('currentNIS', currentNIS);
        });
    });
}

// Submit vote
async function submitVote() {
    if (!selectedCandidate || !currentNIS) {
        alert('Silakan pilih kandidat terlebih dahulu');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nis: currentNIS,
                candidateId: selectedCandidate.id
            })
        });

        const data = await response.json();

        if (data.success) {
            alert('✅ Vote berhasil! Terima kasih.');

            // Reset
            votingSection.classList.add('hidden');
            loginSection.classList.remove('hidden');
            nisInput.value = '';
            selectedCandidate = null;
            currentNIS = '';

            // Clear localStorage
            localStorage.removeItem('selectedCandidate');
            localStorage.removeItem('currentNIS');
        } else {
            alert('❌ Error: ' + data.error);
        }
    } catch (error) {
        console.error('Submit vote error:', error);
        alert('Gagal mengirim vote. Coba lagi.');
    }
}


// EVENT LISTENERS (hapus jika pakai framework lain)
// ============================================
if (verifyBtn) {
    verifyBtn.addEventListener('click', verifyNIS);
}

if (nisInput) {
    nisInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') verifyNIS();
    });
}

if (confirmVoteBtn) {
    confirmVoteBtn.addEventListener('click', submitVote);
}

// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Web Berhasil terinisialisasi');
    console.log('API URL:', API_BASE_URL);

    // Cek jika ada data tersimpan
    const savedCandidate = localStorage.getItem('selectedCandidate');
    const savedNIS = localStorage.getItem('currentNIS');

    if (savedCandidate && savedNIS) {
        currentNIS = savedNIS;
        selectedCandidate = JSON.parse(savedCandidate);
        loginSection.classList.add('hidden');
        votingSection.classList.remove('hidden');
        loadCandidates();
    }

    // Test connection on load
    testConnection();
});