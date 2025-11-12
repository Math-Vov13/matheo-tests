const s = require('../services/storage');
/**
 * @swagger
 * /students:
 *   get:
 *     tags:
 *       - Students
 *     summary: Lister les étudiants
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtrer par nom
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filtrer par email
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Index de page (par défaut 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Taille de page (par défaut 10)
 *     responses:
 *       200:
 *         description: Liste paginée des étudiants
 */
exports.listStudents = (req, res) => {
  let students = s.list('students');
  const { name, email, page = 1, limit = 10 } = req.query;
  if (name) students = students.filter((st) => st.name.includes(name));
  if (email) students = students.filter((st) => st.email.includes(email));
  const start = (page - 1) * limit;
  const paginated = students.slice(start, start + Number(limit));
  res.json({ students: paginated, total: students.length });
};
/**
 * @swagger
 * /students/{id}:
 *   get:
 *     tags:
 *       - Students
 *     summary: Récupérer un étudiant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Étudiant trouvé
 *       404:
 *         description: Étudiant introuvable
 */
exports.getStudent = (a, b) => {
  const c = s.get('students', a.params.id);
  if (!c) return b.status(404).json({ error: 'Student not found' });
  const courses = s.getStudentCourses(a.params.id);
  return b.json({ student: c, courses });
};
/**
 * @swagger
 * /students:
 *   post:
 *     tags:
 *       - Students
 *     summary: Créer un étudiant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *     responses:
 *       201:
 *         description: Étudiant créé
 *       400:
 *         description: Paramètres invalides
 */
exports.createStudent = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'name and email required' });
  const result = s.create('students', { name, email });
  if (result.error) return res.status(400).json({ error: result.error });
  return res.status(201).json(result);
};
/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     tags:
 *       - Students
 *     summary: Supprimer un étudiant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Étudiant supprimé
 *       404:
 *         description: Étudiant introuvable
 */
exports.deleteStudent = (req, res) => {
  const result = s.remove('students', req.params.id);
  if (result === false) return res.status(404).json({ error: 'Student not found' });
  if (result.error) return res.status(400).json({ error: result.error });
  return res.status(204).send();
};
/**
 * @swagger
 * /students/{id}:
 *   put:
 *     tags:
 *       - Students
 *     summary: Mettre à jour un étudiant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Étudiant mis à jour
 *       400:
 *         description: Paramètres invalides
 *       404:
 *         description: Étudiant introuvable
 */
exports.updateStudent = (req, res) => {
  const student = s.get('students', req.params.id);
  if (!student) return res.status(404).json({ error: 'Student not found' });
  const { name, email } = req.body;
  if (email && s.list('students').find((st) => st.email === email && st.id !== student.id)) {
    return res.status(400).json({ error: 'Email must be unique' });
  }
  if (name) student.name = name;
  if (email) student.email = email;
  return res.json(student);
};
