import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useInterview } from "@/context/InterviewContext";
import { InterviewMode } from "@/types";
import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress"; 
import { ArrowLeft, ArrowRight, Check, Clock, RefreshCcw, SkipForward, Loader2 } from "lucide-react";

const InterviewPage: React.FC = () => {
  const { mode } = useParams<{ mode: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
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
    loading
  } = useInterview();

  const [userAnswer, setUserAnswer] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes per question
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    if (!mode || (mode !== "technical" && mode !== "behavioral")) {
      navigate("/dashboard");
      return;
    }

    if (!currentInterview) {
      startInterview(mode as InterviewMode);
    }
  }, [user, mode, currentInterview, navigate, startInterview]);

  useEffect(() => {
    if (currentInterview) {
      setTimeRemaining(300);
      const currentQuestion = currentInterview.questions[currentQuestionIndex];
      setUserAnswer(currentQuestion.userAnswer || "");
    }
  }, [currentInterview, currentQuestionIndex]);

  useEffect(() => {
    if (timeRemaining > 0 && currentInterview && !isComplete) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, currentInterview, isComplete]);

  const handleNext = () => {
    if (currentInterview) {
      answerQuestion(userAnswer);
      if (isLastQuestion) {
        handleComplete();
      } else {
        nextQuestion();
      }
    }
  };

  const handlePrev = () => {
    if (currentInterview) {
      answerQuestion(userAnswer);
      prevQuestion();
    }
  };

  const handleComplete = () => {
    if (currentInterview) {
      answerQuestion(userAnswer);
      setIsComplete(true);
      const feedback = completeInterview();
      navigate("/results", { state: { feedback } });
    }
  };

  if (!currentInterview || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const currentQuestion = currentInterview.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentInterview.questions.length) * 100;
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title={`${mode?.charAt(0).toUpperCase()}${mode?.slice(1)} Interview`} />
      
      <main className="container py-6">
        <div className="mb-6 flex justify-between items-center">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {currentInterview.questions.length}
            </p>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className={`text-sm ${timeRemaining < 60 ? 'text-destructive' : 'text-muted-foreground'}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-lg font-medium mb-1">Question:</p>
            <p className="text-xl mb-6">{currentQuestion.content}</p>
            
            <div className="space-y-2">
              <p className="text-lg font-medium">Your Answer:</p>
              <Textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="min-h-[200px]"
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div className="flex gap-2">
            <Button 
              onClick={handlePrev} 
              variant="outline" 
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            
            <Button
              onClick={() => retryQuestion()}
              variant="outline"
            >
              <RefreshCcw className="mr-2 h-4 w-4" /> Retry
            </Button>
            
            <Button
              onClick={() => skipQuestion()}
              variant="outline"
            >
              <SkipForward className="mr-2 h-4 w-4" /> Skip
            </Button>
          </div>
          
          <div>
            {isLastQuestion ? (
              <Button onClick={handleComplete} className="min-w-[120px]">
                <Check className="mr-2 h-4 w-4" /> Complete
              </Button>
            ) : (
              <Button onClick={handleNext} className="min-w-[120px]">
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewPage;
