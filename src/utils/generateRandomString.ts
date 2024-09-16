
import { v4 as uuidv4 } from 'uuid';

export function generateRandomString(): string {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let randomString = "";
  
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      randomString += chars.charAt(randomIndex);
    }
  
    // Add a UUID to ensure uniqueness
    const uniqueId = uuidv4();
    return randomString + uniqueId;
  }
  