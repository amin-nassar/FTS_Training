import express from 'express';
import categoryRouter from './routers/catrgory';
import productRouter from './routers/product';
import checkOutRouter from './routers/checkout';
const app = express();
const portNumber = 3000;

app.use(express.json());

app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.post("/api/checkout", checkOutRouter);

app.listen(portNumber);

export {};