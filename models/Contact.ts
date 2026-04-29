import mongoose, { Schema, models, model } from "mongoose";

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: false,
    },
    service: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Contact = models.Contact || model("Contact", ContactSchema);

export default Contact;