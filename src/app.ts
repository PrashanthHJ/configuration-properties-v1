import 'dotenv/config';
import express from "express";

import configRoutes from './routes/configRoutes';

export const app = express();

app.use(express.json());
app.use('/api', configRoutes);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
