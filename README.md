# Task Manager App

A simple task management application built with **React**, **Tailwind CSS**, and **Supabase** for authentication and database functionality. This app allows users to sign up, log in, and manage their personal tasks (create, edit, delete).

## Setup Instructions

To run the app locally:

**Clone the Repository**

```bash
git clone https://github.com/yourusername/task-manager-app.git
cd task-manager-app
```

After you navigate into the project directory with the command above, you install dependency by running either of the command bellow

```bash
npm install
```

or

```bash
yarn
```

## Set up Environment Variables

Create a .env file in the root directory and configure your Supabase credentials:

```
VITE_SUPABASE_URL=https://yprutkgukhmjlkudggzd.supabase.co

VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwcnV0a2d1a2htamxrdWRnZ3pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2ODkzOTYsImV4cCI6MjA2ODI2NTM5Nn0.Y4oBrYxhN8TekKtRJLI5Xvr4G7U4BuhsbhEqEyndd9k
```

## Start the Development Server

start your local server by running the command bellow

```bash
npm run dev
```

## Supabase Schema Description

This application uses two main tables in Supabase:

- **users table**: This table is automatically managed by Supabase Auth. It contains information like user `id`, `email`, and a custom `display_name` field which I use to personalize user experience after sign up.

- **tasks table**: This table stores each user's tasks. Each task has:
  - `id`: Unique identifier
  - `title`: The name of the task
  - `description`: A short detail about the task
  - `status`: The current state of the task ("pending", "done", or "in-progress")
  - `extras`: A JSON data which holds the following fields: (tags, due date, and priority)
  - `user_id`: A reference to the user who created the task (linked to `users.id`)
  - `created_at`: Timestamp of when the task was created

> Note: I enabled Row-Level Security (RLS) on the `tasks` table to ensure users can only access their own tasks. Each query is scoped to the authenticated user’s `user_id`.

## Folder Structure
All the working file of this app can be found in the `src` folder.

- The `assets(folder)` which consist of image(file).

- The `component(folder)` which consist of all reusable component used around the app.

- The `lib(folder)` which consist of supabase setup and api functions.

- The `pages(folder)` which consist of all the pages of the app.

- The `route(folder)` which consist of the routing setup.

- The `utils(folder)` which contains all reusable functions and static datas used on the app.

` ** All file within any folder was exported through it's respective index file **`

## Dev Note

if i had enough time, I would optimise and broaden the application by adding some interesting features like

**Optimised the UI more better by adding analytics or stats to show how task are been managed per week/months**

**Adding categories organize the tasks better**

**Make the UI fully responsive for all mobile screens**

**Add pagination to the task board**

**Add notifications or reminders to notify users on their due task which are not completed**

In summary, I will make the app more interactive, visual pleasing to the eyes and have more fantastic features.

## Deployment

This application is deployed on vercel and can be acces via [task-manager-app](https://)
