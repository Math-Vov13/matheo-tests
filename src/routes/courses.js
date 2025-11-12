const express = require('express');

const {
  listCourses,
  getCourse,
  createCourse,
  deleteCourse,
  updateCourse,
} = require('../controllers/coursesController');

const router = express.Router();

router.get('/', listCourses);
router.get('/:id', getCourse);
router.post('/', createCourse);
router.delete('/:id', deleteCourse);

/**
 * @swagger
 * /courses/{courseId}/students/{studentId}:
 *   post:
 *     tags:
 *       - Inscription
 *     summary: Inscrire un étudiant à un cours
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Étudiant inscrit
 *       400:
 *         description: Erreur lors de l'inscription
 */
router.post('/:courseId/students/:studentId', (req, res) => {
  const result = require('../services/storage').enroll(req.params.studentId, req.params.courseId);
  if (result.error) return res.status(400).json({ error: result.error });
  return res.status(201).json({ success: true });
});

/**
 * @swagger
 * /courses/{courseId}/students/{studentId}:
 *   delete:
 *     tags:
 *       - Inscription
 *     summary: Désinscrire un étudiant d'un cours
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Étudiant désinscrit
 *       404:
 *         description: Étudiant ou cours introuvable
 */
router.delete('/:courseId/students/:studentId', (req, res) => {
  const result = require('../services/storage').unenroll(req.params.studentId, req.params.courseId);
  if (result.error) return res.status(404).json({ error: result.error });
  return res.status(204).send();
});

router.put('/:id', updateCourse);

module.exports = router;
