module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'StudentCourseAPI',
    version: '1.0.0',
    description: 'API pédagogique pour gérer étudiants et cours (no DB)',
  },
  tags: [
    {
      name: 'Students',
      description: 'Gestion des étudiants',
    },
    {
      name: 'Cours',
      description: 'Gestion des cours',
    },
    {
      name: 'Inscription',
      description: 'Gestion des inscriptions aux cours',
    },
  ],
};
