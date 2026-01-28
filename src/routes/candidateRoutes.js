const express = require('express');
const router = express.Router();
const CandidateController = require('../controllers/candidateController');
const verifyToken = require('../middleware/authMiddleware'); // Cek login
const { verifyAdmin } = require('../middleware/roleMiddleware'); // Cek admin


// Tambah Kandidat
router.post('/', verifyToken, verifyAdmin, CandidateController.addCandidate);

// Edit Kandidat (Butuh ID)
router.put('/:id', verifyToken, verifyAdmin, CandidateController.updateCandidate);

// Hapus Kandidat (Butuh ID)
router.delete('/:id', verifyToken, verifyAdmin, CandidateController.deleteCandidate);

module.exports = router;