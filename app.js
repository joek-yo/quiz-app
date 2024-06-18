const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const questions = require('./questions.json');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/quiz', (req, res) => {
  res.render('quiz', { questions });
});

app.post('/submit', (req, res) => {
  const score = calculateScore(req.body);
  res.render('result', { score });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

function calculateScore(answers) {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    const correctAnswer = questions[i].answer;
    const userAnswer = answers[`answer${i}`];
    if (correctAnswer === userAnswer) {
      score++;
    }
  }
  return score;
}
