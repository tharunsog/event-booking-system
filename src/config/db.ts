import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/eventBooking', {
      // Additional options can be added here if needed
    });
    console.log('MongoDB connected');
  } catch (err) {
    // Check if 'err' has the shape of an error object with a message property
    if (err instanceof Error) {
      console.error('Error connecting to MongoDB:', err.message);
    } else {
      console.error('Unexpected error connecting to MongoDB');
    }
    process.exit(1);
  }
};

export default connectDB;
