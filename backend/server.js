const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


// MODE ATMIN CIK
// ======================
app.use(cors({
  origin: '*',  // Allow semua origin untuk development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// SIMPLE ROUTES - TESTING
// ======================
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/vote/candidates', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: 'Kandidat A', class: 'XII IPA 1', vision: 'Visi A' },
      { id: 2, name: 'Kandidat B', class: 'XII IPS 2', vision: 'Visi B' },
      { id: 3, name: 'Kandidat C', class: 'XI IPA 3', vision: 'Visi C' }
    ]
  });
});

app.get('/api/vote/check/:nis', (req, res) => {
  const { nis } = req.params;
  console.log(`Checking NIS: ${nis}`);

  // Simulasi: selalu return belum voting
  res.json({
    success: true,
    data: {
      hasVoted: false,
      voteDetails: null
    }
  });
});

app.post('/api/vote/submit', (req, res) => {
  const { nis, candidateId } = req.body;
  console.log(`Vote received: NIS=${nis}, Candidate=${candidateId}`);

  // Simulasi sukses
  res.status(201).json({
    success: true,
    message: 'Vote berhasil disimpan!',
    data: {
      voteId: Date.now(),
      nis: nis,
      candidateId: candidateId,
      votedAt: new Date().toISOString()
    }
  });
});

app.get('/api/vote/results', (req, res) => {
  res.json({
    success: true,
    data: {
      results: [
        { id: 1, name: 'Kandidat A', class: 'XII IPA 1', total_votes: 5, percentage: 50 },
        { id: 2, name: 'Kandidat B', class: 'XII IPS 2', total_votes: 3, percentage: 30 },
        { id: 3, name: 'Kandidat C', class: 'XI IPA 3', total_votes: 2, percentage: 20 }
      ],
      statistics: {
        total_votes: 10,
        unique_voters: 10,
        first_vote: new Date().toISOString(),
        last_vote: new Date().toISOString()
      }
    }
  });
});


// START SERVER
// ======================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health: http://localhost:${PORT}/health`);
  console.log(`API: http://localhost:${PORT}/api/vote/candidates`);
  console.log(`cORS: Enabled for all origins (*)`);
});

module.exports = app;