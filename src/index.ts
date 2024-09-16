// Import the 'express' module
import express from 'express';
import connectDB from './config/dbConfig';
import dotenv from 'dotenv';
import bodyParser = require('body-parser');
import cors from "cors"
import { generateToken } from './utils/generateToken';
import meetingRoutes from './routes/meetingRoutes';
import userRoutes from './routes/userRoutes';
import meetingDetailsRoutes from './routes/meetingDetailsRoutes'
import emailRoutes from './routes/emailRoutes';
import { initializeCronJobs } from './utils/cronJobs';
import { startCronJobs } from './utils/sendMailCronJobs';

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'))


// Set the port number for the server
const port = process.env.PORT;

 // Define a route for the root path ('/')
// app.get('/', async (req, res) => {
//   // Send a response to the client
//   res.send('Hello, TypeScript + Node.js + Express!!!');
// });

app.get('/api/generate-token', (req, res) => {
  const {  user_id } = req.query;

  if ( !user_id) {
      return res.status(400).json({ error: 'Missing parameter' });
  }

  try {
      // Generate token
      const token = generateToken( user_id as string);

      // Return token
      res.json({ token });
  } catch (error:any) {
      res.status(400).json({ error: error.message });
  }
});

app.use('/api', meetingRoutes);
app.use('/api',userRoutes);
app.use('/api',meetingDetailsRoutes);
app.use('/api', emailRoutes);



initializeCronJobs();
startCronJobs();

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port} port`);
});
