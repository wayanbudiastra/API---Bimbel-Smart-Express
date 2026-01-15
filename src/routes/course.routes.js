
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const authenticateToken = require('../middleware/auth.middleware');
const authorizeRoles = require('../middleware/role.middleware');
const upload = require('../middleware/upload.middleware');

router.get('/', authenticateToken, courseController.getAllCourses);

router.post('/', 
  authenticateToken, 
  authorizeRoles('GURU', 'ADMIN'), 
  upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'video', maxCount: 1 }]), 
  courseController.createCourse
);

module.exports = router;
