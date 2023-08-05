import app from './app';

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on ${process.env.APP_HOST}:${3001}`);
});
