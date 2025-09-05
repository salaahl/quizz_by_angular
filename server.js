const express = require("express");
const path = require("path");

const app = express();

// Servir les fichiers statiques depuis le bon dossier
app.use(express.static(path.join(__dirname, "dist/quizz")));

// Pour toutes les routes, servir index.html depuis le bon dossier
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist/quizz/index.html"));
});

const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
