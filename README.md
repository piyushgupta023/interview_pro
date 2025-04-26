# Interview Pro

A modern application designed to help users practice and improve their interview skills through an interactive chatbot interface.

## Features

- Interactive interview chatbot (coming soon)
- User authentication system
- Dashboard for tracking progress
- Results analysis and feedback
- Mobile-responsive design
- Modern UI with Shadcn components

<img src="![Screenshot 2025-04-26 223024](https://github.com/user-attachments/assets/52c1d45b-192c-4ca2-9fd2-1dbbee2fb320)
" alt="Screenshot" width="100"/>


## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **UI Components**: Shadcn UI (built on Radix UI)

### Usage
- Select a Domain: Choose a domain (e.g., SQL, Python) for your interview questions.
- Start an Interview: Pick an interview mode (Technical or Behavioral) to begin.
- Answer Questions: Respond to AI-generated questions, with options to retry or skip.
- Review Feedback: Get immediate feedback and scores after each answer.
- View Summary: After completing the interview, see a detailed report with strengths, areas to improve, and resources.
  
## Prerequisites

- Node.js (LTS version)
- npm or bun package manager

## Getting Started

1. Clone the repository

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
bun run dev
```

4. Open your browser and visit `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features

### Authentication
- User registration and login
- Protected routes
- Authentication context

### Interview Practice
- Interactive chatbot interface
- Real-time feedback
- Progress tracking

### Dashboard
- Performance metrics
- Practice history
- Skill assessment

### Future Improvements
- Add a backend (e.g., Node.js or PHP) with a database for persistent storage.
- Implement a timer for each question to simulate real interview pressure.
- Support more job roles and domains.
- Add dark/light mode toggle for better accessibility.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
