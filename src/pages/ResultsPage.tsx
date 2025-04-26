
import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InterviewFeedback } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { FileText, Mic, Home } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InterviewChatbot from "@/components/InterviewChatbot";
import ScoreCard from "@/components/results/ScoreCard";
import FeedbackGrid from "@/components/results/FeedbackGrid";
import InterviewHistory from "@/components/results/InterviewHistory";
import RecommendedQuestionSets from "@/components/results/RecommendedQuestionSets";

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const feedback = location.state?.feedback as InterviewFeedback;
  const pdfRef = useRef<HTMLDivElement>(null);

  if (!feedback && !user?.interviews?.length) {
    navigate("/dashboard");
    return null;
  }

  const activeFeedback = feedback || {
    overallScore: user?.interviews?.slice(-1)[0]?.score || 0,
    strengths: [],
    areasForImprovement: [],
    tips: []
  };

  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return "N/A";
    if (typeof date === 'string') return new Date(date).toLocaleDateString();
    if (date instanceof Date) return date.toLocaleDateString();
    return "Invalid date";
  };

  const getScoreBand = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Average";
    return "Needs Improvement";
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-emerald-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const exportAsPDF = () => {
    alert("Exporting as PDF... (This would normally save the feedback as a PDF)");
  };

  const handleVoiceInput = () => {
    alert("Voice input feature activated! (This would normally start recording your voice)");
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="Interview Results" />
      
      <main className="container py-6">
        <Tabs defaultValue="results" className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="results">Current Results</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="chatbot">Interview Coach</TabsTrigger>
          </TabsList>
          
          <TabsContent value="results">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-2">Your Interview Performance</h2>
              <p className="text-muted-foreground">
                Review your results and use our feedback to improve
              </p>
            </div>

            <div ref={pdfRef}>
              <div className="mb-12">
                <ScoreCard 
                  score={activeFeedback.overallScore}
                  getScoreBand={getScoreBand}
                  getScoreColor={getScoreColor}
                />
              </div>

              <FeedbackGrid feedback={activeFeedback} />

              <Alert className="mb-8 bg-primary/5 border-primary">
                <AlertTitle className="mb-2">
                  Next steps to improve your interview skills:
                </AlertTitle>
                <AlertDescription className="space-y-2">
                  <p>1. <strong>Practice more interviews</strong> - Repetition builds confidence and skill.</p>
                  <p>2. <strong>Review your areas for improvement</strong> - Focus on turning weaknesses into strengths.</p>
                  <p>3. <strong>Expand your knowledge</strong> - Research topics where you had difficulty answering.</p>
                </AlertDescription>
              </Alert>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button onClick={exportAsPDF} className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Export as PDF
              </Button>
              <Button onClick={handleVoiceInput} variant="outline" className="flex items-center">
                <Mic className="mr-2 h-5 w-5" />
                Voice Review
              </Button>
              <Button onClick={() => navigate("/dashboard")} variant="outline" className="flex items-center">
                <Home className="mr-2 h-5 w-5" />
                Back to Dashboard
              </Button>
            </div>

            <RecommendedQuestionSets />
          </TabsContent>
          
          <TabsContent value="history">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-6 text-center">Interview History</h2>
              <InterviewHistory user={user} formatDate={formatDate} />
            </div>
          </TabsContent>
          
          <TabsContent value="chatbot">
            <InterviewChatbot />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ResultsPage;
