const express = require('express');
const router = express.Router();
const VoteController = require('../controllers/voteController');
const verifyToken = require('../middleware/authMiddleware');

const { voteLimiter, resultsLimiter, apiLimiter } = require('../middleware/rateLimiter');

// Public routes
router.get('/candidates', apiLimiter, VoteController.getCandidates);
router.get('/results', resultsLimiter, VoteController.getResults);
router.get('/statistics', apiLimiter, VoteController.getStatistics);
router.get('/check/:nis', apiLimiter, VoteController.checkVoteStatus);


router.post('/submit', verifyToken, VoteController.submitVote);

// Cek status juga perlu diproteksi
router.get('/check', verifyToken, VoteController.checkVoteStatus);



module.exports = router;