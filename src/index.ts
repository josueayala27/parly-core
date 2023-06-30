import express from 'express';

const app = express();

app.listen(3000, () => {
  console.log('Hola');
});

app.get('/', (req, res) => {
  res.send('¡Hola, Express con TypeScript!');
});
