
export interface User {
  id: string;
  fullName: string;
  email: string;
  role?: JobRole;
  domain?: string;
  interviews?: Interview[];
}

export type JobRole = 
  | "Software Engineer" 
  | "Product Manager" 
  | "Data Analyst" 
  | "PHP Developer" 
  | "Cyber Security Analyst" 
  | "UX/UI Designer"
  | "DevOps Engineer" 
  | "QA Engineer" 
  | "Project Manager"
  | "Other";

export type InterviewMode = "technical" | "behavioral";

export type InterviewStatus = "pending" | "in-progress" | "completed";

export interface Interview {
  id: string;
  userId: string;
  mode: InterviewMode;
  status: InterviewStatus;
  score?: number;
  feedback?: string;
  questions: Question[];
  createdAt: Date | string;
  completedAt?: Date | string;
}

export interface Question {
  id: string;
  content: string;
  expectedAnswer?: string;
  userAnswer?: string;
  feedback?: string;
  score?: number;
  category?: QuestionCategory;
}

export type QuestionCategory = 
  | "faang" 
  | "star" 
  | "technical" 
  | "behavioral" 
  | "custom";

export interface InterviewFeedback {
  overallScore: number;
  strengths: string[];
  areasForImprovement: string[];
  tips: string[];
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  score: number;
  interviewCount: number;
  rank: number;
}
