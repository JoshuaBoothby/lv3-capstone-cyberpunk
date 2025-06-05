# Cyberpunk Goon Management System

A React-based web application for managing NPC goons in Cyberpunk RED tabletop sessions.

## Features

- Create and manage different types of goons (Easy, Average, Elite)
- Track goon status (Active/KIA)
- Add field notes for each goon
- Persistent storage using AWS DynamoDB
- Cyberpunk-themed UI with Bootstrap styling

## Technologies Used

- React 19
- React Bootstrap
- AWS DynamoDB
- Vite
- Vitest for testing

## Getting Started

1. Clone the repository
2. Install dependencies:

- npm install

3. Set up your AWS credentials in `.env`:

   VITE_AWS_REGION=your-region
   VITE_AWS_ACCESS_KEY_ID=your-key
   VITE_AWS_SECRET_KEY=your-secret

4. Run the development server:

- npm run dev

## Testing

- npm test

## Use Case

This project serves as a personal game aid for Cyberpunk Red sessions. Data will be cleared between sessions and recorded in campaign notes.

## Project Structure

- `src/components/` - React components
- `src/dynamo.js` - AWS DynamoDB integration

## Credits

- Favicon PNG from pixabay (credit: andsproject)
- Cyberpunk goon stat information (credit: JonJon-the-wise)
- Night Corp footer reference based on Cyberpunk RED lore
- Styling inspired by Cyberpunk 2077 and Cyberpunk RED
