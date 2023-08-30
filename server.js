import dotenv from 'dotenv';
import app from './src/app.js';
import { connectDB } from './src/configs/db.config.js';

dotenv.config();

const port = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
})();

app.listen(port, () => {
  console.log(`----listening on port ${port}! :)-----`);
});
