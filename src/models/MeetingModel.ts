import mongoose, { Schema, Document, Model } from 'mongoose';

interface IMeeting extends Document {
  name: string;
  meeting_id: string;
  time: string;
  reminderSentAt?: Date; 
}

const meetingSchema: Schema = new Schema({
  name: { type: String, required: true },
  meeting_id: {type: String, required: true, unique:true},
  time: {type:String, required:true},
  reminderSentAt: { type: Date }, 
}, {
  timestamps: true
});

const Meeting: Model<IMeeting> = mongoose.model<IMeeting>('Meeting', meetingSchema);

export default Meeting;
