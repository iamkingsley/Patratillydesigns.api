import mongoose from 'mongoose';

export const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  description: String,
})

