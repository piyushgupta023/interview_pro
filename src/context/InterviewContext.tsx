import React, { createContext, useContext, useState } from "react";
import { Interview, InterviewFeedback, InterviewMode, Question, User } from "@/types";
import { useAuth } from "./AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface InterviewContextType {
  currentInterview: Interview | null;
  currentQuestionIndex: number;
  startInterview: (mode: InterviewMode) => void;
  answerQuestion: (answer: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  skipQuestion: () => void;
  retryQuestion: () => void;
  completeInterview: () => InterviewFeedback;
  isLastQuestion: boolean;
  loading: boolean;
}

const TECHNICAL_QUESTIONS: Question[] = [
  {
    id: "t1",
    content: "Explain the concept of closures in JavaScript and provide an example.",
  },
  {
    id: "t2",
    content: "What is the difference between == and === operators?",
  },
  {
    id: "t3",
    content: "Explain the concept of hoisting in JavaScript.",
  },
  {
    id: "t4",
    content: "What is the event loop in JavaScript?",
  },
  {
    id: "t5",
    content: "How does prototypal inheritance work in JavaScript?",
  }
];

const BEHAVIORAL_QUESTIONS: Question[] = [
  {
    id: "b1",
    content: "Tell me about a time when you faced a challenging situation in a project and how you resolved it.",
  },
  {
    id: "b2",
    content: "Describe a situation where you had to work with a difficult team member. How did you handle it?",
  },
  {
    id: "b3",
    content: "Give an example of a goal you achieved and your process for reaching that goal.",
  },
  {
    id: "b4",
    content: "Describe a time when you had to adapt to a significant change at work.",
  },
  {
    id: "b5",
    content: "Tell me about a time when you failed to meet a deadline. How did you handle the situation?",
  }
];

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentInterview, setCurrentInterview] = useState<Interview | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user, updateUserProfile } = useAuth();
  const { toast } = useToast();

  const startInterview = (mode: InterviewMode) => {
    if (!user) return;

    setLoading(true);
    
    const questions = mode === "technical" ? TECHNICAL_QUESTIONS : BEHAVIORAL_QUESTIONS;
    
    const newInterview: Interview = {
      id: Math.random().toString(36).substring(2, 9),
      userId: user.id,
      mode,
      status: "in-progress",
      questions: [...questions],
      createdAt: new Date(),
    };
    
    setCurrentInterview(newInterview);
    setCurrentQuestionIndex(0);
    setLoading(false);
    
    toast({
      title: `${mode.charAt(0).toUpperCase() + mode.slice(1)} Interview Started`,
      description: "Good luck! Answer each question thoughtfully.",
    });
  };

  const answerQuestion = (answer: string) => {
    if (!currentInterview) return;
    
    const updatedQuestions = [...currentInterview.questions];
    updatedQuestions[currentQuestionIndex].userAnswer = answer;
    
    setCurrentInterview({
      ...currentInterview,
      questions: updatedQuestions,
    });

    toast({
      title: "Answer Saved",
      description: "You can retry or continue to the next question.",
    });
  };

  const skipQuestion = () => {
    if (!currentInterview) return;
    
    const updatedQuestions = [...currentInterview.questions];
    updatedQuestions[currentQuestionIndex].userAnswer = "Skipped";
    
    setCurrentInterview({
      ...currentInterview,
      questions: updatedQuestions,
    });

    nextQuestion();
    
    toast({
      title: "Question Skipped",
      description: "Moving to the next question.",
    });
  };

  const retryQuestion = () => {
    if (!currentInterview) return;
    
    const updatedQuestions = [...currentInterview.questions];
    updatedQuestions[currentQuestionIndex].userAnswer = "";
    
    setCurrentInterview({
      ...currentInterview,
      questions: updatedQuestions,
    });
    
    toast({
      title: "Retry Question",
      description: "Take your time to provide a better answer.",
    });
  };

  const nextQuestion = () => {
    if (!currentInterview) return;
    
    if (currentQuestionIndex < currentInterview.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const completeInterview = (): InterviewFeedback => {
    if (!currentInterview || !user) {
      throw new Error("No active interview");
    }
    
    const answeredQuestions = currentInterview.questions.filter(q => q.userAnswer && q.userAnswer !== "Skipped");
    const skippedQuestions = currentInterview.questions.filter(q => q.userAnswer === "Skipped");
    const score = Math.floor((answeredQuestions.length / currentInterview.questions.length) * 100);
    
    const feedback: InterviewFeedback = {
      overallScore: score,
      strengths: [
        answeredQuestions.length > 0 ? "Demonstrated ability to articulate responses clearly" : "",
        skippedQuestions.length === 0 ? "Attempted all questions" : "",
        "Showed commitment to completing the interview process"
      ].filter(Boolean),
      areasForImprovement: [
        skippedQuestions.length > 0 ? `Consider practicing ${currentInterview.mode} questions more` : "",
        "Work on providing more detailed examples in responses",
        "Practice structuring answers using the STAR method"
      ].filter(Boolean),
      tips: [
        "Review common interview questions for your role",
        "Practice with a timer to improve response timing",
        "Record yourself answering questions to improve delivery"
      ]
    };
    
    const currentTime = new Date();
    const completedInterview: Interview = {
      ...currentInterview,
      status: "completed",
      score,
      completedAt: currentTime,
    };
    
    const userInterviews = [...(user.interviews || []), completedInterview];
    updateUserProfile({ interviews: userInterviews });
    
    setCurrentInterview(null);
    setCurrentQuestionIndex(0);
    
    toast({
      title: "Interview Completed!",
      description: `Your score: ${score}%. View your detailed feedback for improvement.`,
    });
    
    return feedback;
  };

  const isLastQuestion = currentInterview 
    ? currentQuestionIndex === currentInterview.questions.length - 1
    : false;

  return (
    <InterviewContext.Provider
      value={{
        currentInterview,
        currentQuestionIndex,
        startInterview,
        answerQuestion,
        nextQuestion,
        prevQuestion,
        skipQuestion,
        retryQuestion,
        completeInterview,
        isLastQuestion,
        loading,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (context === undefined) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }
  return context;
};
