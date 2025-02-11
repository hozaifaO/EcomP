import express, {json, urlencoded} from 'express';
import productsRoutes from './routes/products/index';
import authRouts from './routes/auth/index';
const app = express();
const port = 3000;

//Products Routes
app.use(urlencoded({ extended: false }));
app.use(json());
app.use('/products', productsRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!');
});


//Authentication Routes
app.use('/auth', authRouts);

app.listen(port, () => {
  console.log(` server listening at http://localhost:${port}`);
});