import formData from 'form-data';
import Mailgun from 'mailgun.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere' });

export const sendEmail = async (to: string, subject: string, htmlFilePath: string,joinLink: string, title:string, username:string) => {
  try {
    let html = fs.readFileSync(path.resolve(htmlFilePath), 'utf8');
    html = html.replace('{{join_link}}', joinLink);
    html = html.replace('{{title}}',title);
    html = html.replace('{{name}}',username);
    const response = await mg.messages.create('mail.dollop.ai', {
      from: "Dollop <dollop@dollop.ai>",
      to: [to],
      subject: subject,
      html: html
    });
    return response;
  } catch (error:any) {
    throw new Error(error);
  }
};
