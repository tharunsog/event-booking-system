import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  userId: string;
  eventId: mongoose.Types.ObjectId;
  quantity: number;
}

const bookingSchema = new Schema<IBooking>({
  userId: { type: String, required: true },
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  quantity: { type: Number, required: true },
});

export default mongoose.model<IBooking>('Booking', bookingSchema);
