import 'dotenv/config';
import express from "express";


import configRoutes from './routes/configRoutes';

const app = express();

app.use(express.json());
app.use('/api', configRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
