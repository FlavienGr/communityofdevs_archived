const app = require('./app');
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server listen on port ${PORT}`);
});
