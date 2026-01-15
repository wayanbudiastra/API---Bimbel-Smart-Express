
const express = require('express');
const router = express.Router();
const { prisma } = require('../config/db');
const authenticateToken = require('../middleware/auth.middleware');
const authorizeRoles = require('../middleware/role.middleware');

// Siswa Submit Quiz
router.post('/:quizId/submit', authenticateToken, authorizeRoles('SISWA'), async (req, res) => {
  const { answer } = req.body;
  const { quizId } = req.params;

  try {
    const quiz = await prisma.quiz.findUnique({ where: { id: parseInt(quizId) } });
    const isCorrect = quiz.correctAnswer === answer;
    
    // Update progress logic here...
    res.json({ correct: isCorrect, message: isCorrect ? 'Jawaban Benar!' : 'Jawaban Salah.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
