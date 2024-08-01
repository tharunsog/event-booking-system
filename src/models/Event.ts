import mongoose, { Document, Schema } from 'mongoose';

// Interface for the Event document
export interface IEvent extends Document {
  name: string;
  date: Date;
  totalTickets: number;
  bookedTickets: number;
}

// Mongoose schema definition for the Event collection
const eventSchema = new Schema<IEvent>({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  totalTickets: { type: Number, required: true },
  bookedTickets: { type: Number, default: 0 },
});

// Mongoose model for the Event collection
export default mongoose.model<IEvent>('Event', eventSchema);
