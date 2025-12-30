const express = require('express');
const router = express.Router();
const VoteController = require('../controllers/voteController');
const { voteLimiter, resultsLimiter, apiLimiter } = require('../middleware/rateLimiter');

// Public routes
router.get('/candidates', apiLimiter, VoteController.getCandidates);
router.get('/results', resultsLimiter, VoteController.getResults);
router.get('/statistics', apiLimiter, VoteController.getStatistics);
router.get('/check/:nis', apiLimiter, VoteController.checkVoteStatus);

// Voting endpoint dengan rate limiting ketat
router.post('/submit', voteLimiter, VoteController.submitVote);

module.exports = router;