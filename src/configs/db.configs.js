import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true, // This will help to avoid DeprecationWarning: current Server Discovery and Monitoring engine is deprecated
      useUnifiedTopology: true, // This will help to avoid DeprecationWarning: current Server Discovery and Monitoring engine is deprecated
    });
    console.log('Successfuly connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const listDatabases = async () => {
  try {
    await client.connect();
    const adminDb = client.db('admin');
    const databaseList = await adminDb.admin().listDatabases();
    console.log('Available databases:');
    databaseList.databases.forEach(db => {
      console.log(`- ${db.name}`);
    });
  } catch (error) {
    console.error('Error listing databases:', error);
  }
};

export { connectDB, listDatabases };
