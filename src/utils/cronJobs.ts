import { CronJob } from 'cron';
import moment from 'moment-timezone';
import Meeting from '../models/MeetingModel';
import MeetingDetails from '../models/MeetingDetailsModel';
import { generateRandomString } from './generateRandomString';
// Import the 'dotenv' module
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
const timeZone= process.env.timeZone || 'Asia/Kolkata'

// const timezoneArray = ['Asia/Kolkata'];

export const initializeCronJobs = () => {
    new CronJob(
      '00 01 00 * * *',
      async () => {
        try {
          const meetings = await Meeting.find();
          const currentDate = moment().tz(timeZone).startOf('day');
          console.log(currentDate.format());

          for (const meeting of meetings) {
            const callId = generateRandomString();
            const meetingDetails = new MeetingDetails({
              meeting_id: meeting.meeting_id,
              date: currentDate.format('YYYY-MM-DD'),
              time: meeting.time,
              callId,
            });
            await meetingDetails.save();
          }

          console.log(`Daily meeting details generated and saved for timezone: ${timeZone}`);
        } catch (error) {
          console.error(`Error generating meeting details for timezone ${timeZone}:`, error);
        }
      },
      null, // onComplete
      true, // start
      timeZone // timeZone
    );

    console.log(`Cron job successfully added for timezone - ${timeZone}`);
};
