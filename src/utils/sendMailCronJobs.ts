// src/utils/cronJobs.ts

import { CronJob } from "cron";
import moment from "moment-timezone";
import Meeting from "../models/MeetingModel";
import UserModel from "../models/UserModel";
import MeetingDetails from "../models/MeetingDetailsModel";
import { sendEmail } from "./emailService";
import path from "path";
// Import the 'dotenv' module
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const timeZone = process.env.timeZone || 'America/New_York';
const frontendURL = process.env.FrontendURL;

const emailTemplatePath = path.join(
  __dirname,
  "..",
  "public",
  "templates",
  "emailTemplate.html"
);

function capitalizeFirstLetter(string:string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const checkForUpcomingMeetings = async () => {
  try {
    const now = moment.tz(timeZone); // Adjust timezone as needed
    const twentyMinutesLater = now.clone().add(20, "minutes");

    const upcomingMeetings = await Meeting.find({
      time: {
        $gte: now.format("HH:mm"), // 24-hour format
        $lt: twentyMinutesLater.format("HH:mm"), // 24-hour format
      },
      $or: [
        { reminderSentAt: { $exists: false } },
        {
          reminderSentAt: {
            $lte: now.clone().subtract(20, "minutes").toDate(),
          },
        },
      ],
    });

    if (upcomingMeetings.length === 0) {
      console.log("No upcoming meetings are there!!");
      return;
    } else {
      console.log(upcomingMeetings[0]);
    }

    for (const meeting of upcomingMeetings) {
      const users = await UserModel.find({
        meeting_ids: { $in: [meeting.meeting_id] },
      });

      console.log(users);

      const meetingDetails = await MeetingDetails.find({
        meeting_id: meeting.meeting_id,
        date: now.format("YYYY-MM-DD"),
      });

      if (meetingDetails.length === 0) {
        console.log("No meeting details found for meeting_id:", meeting.meeting_id);
        return;
      }

      console.log(meetingDetails[0]._id);

      for (const user of users) {
        const joinLink = `${frontendURL}/waiting-room/${meetingDetails[0]._id}/${user._id}/join`;
        const title = meeting.name;
        const username = capitalizeFirstLetter(user.username);
        await sendEmail(
          user.email,
          `Reminder: Your ${meeting.name} session starts in 15 minutes`,
          emailTemplatePath,
          joinLink,
          title,
          username
        );
      }

      // Update the reminderSentAt field
      meeting.reminderSentAt = now.toDate();
      await meeting.save();
    }
  } catch (error) {
    console.error("Error checking for upcoming meetings:", error);
  }
};

export const startCronJobs = () => {
  new CronJob(
    "*/5 * * * *",
    checkForUpcomingMeetings,
    null,
    true,
    timeZone
  ); // Runs every 5 minutes
};
