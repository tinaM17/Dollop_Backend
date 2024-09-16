import mongoose, { Schema, Document, Model } from 'mongoose';
import moment from 'moment'

interface IMeetingDetails extends Document {
  meeting_id: string;
  date: Date | string; // Allow both Date and string for date
  time: string;
  callId: string;
}

const meetingDetailsSchema: Schema = new Schema({
  meeting_id: { type: String, ref: 'Meeting', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  callId: { type: String, required: true }
}, {
  timestamps: true
});

// Pre-save hook to parse date string
meetingDetailsSchema.pre<IMeetingDetails>('save', function(next) {
  if (typeof this.date === 'string') {
    const dateString = this.date as string; // Explicit type assertion
    const [day, month, year] = dateString.split('-');
    const parsedDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
    this.date = parsedDate;
  }
  next();
});

const MeetingDetails: Model<IMeetingDetails> = mongoose.model<IMeetingDetails>('MeetingDetails', meetingDetailsSchema);

export default MeetingDetails;
