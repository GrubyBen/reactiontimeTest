const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');

// Włączenie obsługi statycznych plików HTML, CSS, JS
app.use(express.static(path.join(__dirname, 'public')));

// Parsowanie JSON
app.use(express.json());

// Zmienna do przechowywania wyników (można zastąpić bazą danych)
let results = [];

// Endpoint do zapisywania wyników
app.post('/save-result', (req, res) => {
  const { reactionTime } = req.body;
  
  // Zapisywanie wyników do zmiennej (możesz zapisać do pliku lub bazy danych)
  const result = { reactionTime, timestamp: new Date() };
  results.push(result);
  
  // Możesz zapisać dane do pliku, jeśli chcesz:
  // fs.appendFileSync('results.txt', `${result.timestamp} - ${result.reactionTime} s\n`);
  
  console.log(`Wynik zapisany: ${reactionTime} sekundy`);
  res.status(200).send('Wynik zapisany!');
});

// Strona główna
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start serwera
app.listen(port, () => {
  console.log(`Serwer uruchomiony na http://localhost:${port}`);
});
