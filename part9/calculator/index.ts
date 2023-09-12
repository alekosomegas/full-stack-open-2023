import express = require('express');
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
        res.json({
            weight: Number(req.query.height),
            height: Number(req.query.weight),
            bmi: calculateBmi(Number(req.query.height), Number(req.query.weight))
        })
    } catch {
        res.status(500).json({error: "malformatted parameters"})
    }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});