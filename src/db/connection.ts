import mongoose from 'mongoose';
const mode = process.env.NODE_ENV;

const db = async () => {
  let DB_URI = '';

  if (mode === 'develop') DB_URI = process.env.LOCAL_URI!;

  if (mode === 'production') DB_URI = process.env.ATLAS_URI!;

  try {
    await mongoose.connect(DB_URI, {
      dbName: 'Express-demo',
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
};

export default db;
