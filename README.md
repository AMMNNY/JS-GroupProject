# EduTrack

EduTrack is a lightweight learning management system (LMS) for instructors. It helps instructors manage courses and student records, track progress, grades, and attendance, and review student feedback and analytics.

## Features

- Create an instructor account and sign in.
- Add, search, edit, archive, and delete student records.
- Manage courses and view student profiles.
- Track grades, attendance, and instructor feedback.
- View student performance and course analytics.
- Switch between light and dark mode.

## Main app pages

- `index.html` — project landing page.
- `pages/login.html` and `pages/register.html` — instructor sign-in and account creation.
- `pages/index.html` — app dashboard with navigation to dashboard analytics, students, and courses.
- `pages/student.html` and `pages/Courses.html` — student and course management.
- `pages/InstructorProfile.html` and `pages/StudentProfile.html` — instructor and student details.

## Project structure

```text
.
├── Assest/   Images and other project assets
├── module/   API modules for courses, instructors, and students
├── pages/    HTML pages for the app, including login, registration,
│             student and course management, and analytics
├── script/   JavaScript for page behavior, authentication, and API usage
├── style/    CSS stylesheets
├── db.json   Local JSON Server data
└── index.html
```

## Run locally

From the project directory, start the JSON Server that provides the app's local data:

```bash
npx.cmd json-server --watch db.json
```

Keep the server running. In a second terminal, serve the project files with a local web server (for example, VS Code Live Server), then open `index.html` in your browser. Serving the files over HTTP allows the app's JavaScript modules and data requests to work correctly.

## Project links

- [Live site](https://ammnny.github.io/JS-GroupProject/)
- [Figma design](https://www.figma.com/design/AU4SdINPNBbBD3kD11l8UC/Untitled?node-id=0-1&p=f&t=yfukwDiCUVIwteKo-0)
- [Figma wireframe](https://www.figma.com/make/KeZL1Tged23ZrRmsa5LgMv/Low-Fidelity-Wireframe-Creation?t=BSS0UGwAHUrSTBhk-1)
- [Trello board](https://trello.com/b/aX3Hx0ey/edutrack-project)
