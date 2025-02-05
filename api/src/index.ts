import express, {json, urlencoded} from 'express';
import productsRoutes from './routes/products/index';

const app = express();
const port = 3000;
app.use(urlencoded({ extended: false }));
app.use(json());
app.use('/products', productsRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});