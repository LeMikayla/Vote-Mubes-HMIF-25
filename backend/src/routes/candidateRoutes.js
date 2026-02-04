const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const CandidateController = require("../controllers/candidateController");
const verifyToken = require("../middleware/authMiddleware"); // Cek login
const { verifyAdmin } = require("../middleware/roleMiddleware"); // Cek admin

// Ambil Semua Kandidat
router.get("/", CandidateController.getAllCandidates);

// Tambah Kandidat
router.post(
  "/",
  verifyToken,
  verifyAdmin,
  upload.single("foto"),
  CandidateController.addCandidate,
);

// Edit Kandidat (Butuh ID)
router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  upload.single("foto"),
  CandidateController.updateCandidate,
);

// Hapus Kandidat (Butuh ID)
router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  CandidateController.deleteCandidate,
);

module.exports = router;
