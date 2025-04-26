
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardHeader from "@/components/DashboardHeader";
import { CodeSquare, MessageSquare, Video } from "lucide-react";
import { InterviewMode } from "@/types";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return null;
  }

  const handleStartInterview = (mode: InterviewMode) => {
    navigate(`/interview/${mode}`);
  };

  const handleStartVideoInterview = () => {
    navigate("/interview/video");
  };

  // Calculate stats
  const completedInterviews = user.interviews?.filter(i => i.status === "completed") || [];
  const technicalCount = completedInterviews.filter(i => i.mode === "technical").length;
  const behavioralCount = completedInterviews.filter(i => i.mode === "behavioral").length;
  const averageScore = completedInterviews.length > 0
    ? Math.round(completedInterviews.reduce((sum, interview) => sum + (interview.score || 0), 0) / completedInterviews.length)
    : 0;

  // Helper function to safely format dates
  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return "N/A";
    
    if (typeof date === 'string') {
      // If it's a string, try to convert it to a Date object first
      return new Date(date).toLocaleDateString();
    } else if (date instanceof Date) {
      // If it's already a Date object, use toLocaleDateString directly
      return date.toLocaleDateString();
    }
    
    return "Invalid date";
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="Dashboard" />
      
      <main className="container py-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome, {user.fullName}!</h2>
          <p className="text-muted-foreground">
            {user.role ? 
              `Prepare for your ${user.role}${user.domain ? ` (${user.domain})` : ""} interviews.` : 
              "Let's prepare for your upcoming interviews."}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{completedInterviews.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{averageScore}%</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Interview Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                <span className="font-medium">{technicalCount}</span> Technical, 
                <span className="font-medium ml-1">{behavioralCount}</span> Behavioral
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Interview Options */}
        <h2 className="text-2xl font-bold mb-4">Start a New Interview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CodeSquare className="mr-2 h-5 w-5 text-primary" />
                Technical Interview
              </CardTitle>
              <CardDescription>
                Test your technical knowledge with coding questions, system design, and problem-solving.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Perfect for software engineers and technical roles to practice algorithm questions, coding challenges, and technical concepts.
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleStartInterview("technical")} className="w-full">
                Start Technical Interview
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                Behavioral Interview
              </CardTitle>
              <CardDescription>
                Practice STAR-format questions, conflict resolution, and leadership scenarios.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Improve your soft skills by practicing how to effectively communicate your past experiences and professional achievements.
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleStartInterview("behavioral")} variant="outline" className="w-full">
                Start Behavioral Interview
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Video className="mr-2 h-5 w-5 text-primary" />
                AI Video Interview
              </CardTitle>
              <CardDescription>
                Face-to-face interview with our AI interviewer for a realistic experience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Coming soon - Our most immersive interview simulation with video and voice interaction with an AI interviewer.
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={handleStartVideoInterview} variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Recent Interview History */}
        {completedInterviews.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Recent Interviews</h2>
            <div className="space-y-4">
              {completedInterviews.slice(0, 3).map((interview) => (
                <Card key={interview.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      {interview.mode.charAt(0).toUpperCase() + interview.mode.slice(1)} Interview
                    </CardTitle>
                    <CardDescription>
                      Completed on {formatDate(interview.completedAt)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between items-center">
                      <p>Score: <span className="font-bold">{interview.score}%</span></p>
                      <Button variant="link" size="sm" onClick={() => navigate(`/results/${interview.id}`)}>
                        View Results
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
