# Pulseon Solutions Website

A professional Next.js business website for Techzy Solutions with a database-connected contact form.

## What was improved

- Modern and more professional landing page design
- Stronger service, about, process, and contact sections
- Database-connected contact form using MongoDB + Mongoose
- Cleaner branding and metadata for production use
- Better foundation for future expansion

## Setup

1. Install dependencies
   ```bash
   npm install
   ```
2. Create an environment file
   ```bash
   cp .env.example .env.local
   ```
3. Add your MongoDB Atlas connection string in `.env.local`
4. Run the project
   ```bash
   npm run dev
   ```

## Database connection

This project stores contact form submissions in MongoDB.

Submitted fields:
- name
- email
- company
- service
- message
- createdAt / updatedAt

## Main files added

- `app/api/contact/route.ts`
- `lib/mongodb.ts`
- `models/Contact.ts`
- `.env.example`

## Notes

- For production, create a MongoDB Atlas cluster and whitelist your deployment IP or hosting platform.
- You can later add an admin dashboard to view all inquiries.
