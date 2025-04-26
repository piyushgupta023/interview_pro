
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Award, FileText, Star } from "lucide-react";
import { Interview, User } from "@/types";
import { useNavigate } from "react-router-dom";

interface InterviewHistoryProps {
  user: User;
  formatDate: (date: Date | string | undefined) => string;
}

const InterviewHistory: React.FC<InterviewHistoryProps> = ({ user, formatDate }) => {
  const navigate = useNavigate();

  if (!user?.interviews || user.interviews.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">
          No interview history available. Complete an interview to see your results here.
        </p>
        <Button onClick={() => navigate('/dashboard')} className="mt-4">
          Start an Interview
        </Button>
      </div>
    );
  }

  return (
    <>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5 text-amber-500" />
            Your Progress
          </CardTitle>
          <CardDescription>
            Track your interview performance over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-500" />
                <span className="font-medium">Personal Best Score:</span>
              </div>
              <span className="font-bold">
                {Math.max(...user.interviews.map(i => i.score || 0))}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Total Interviews:</span>
              </div>
              <span className="font-bold">{user.interviews.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {user.interviews.slice().reverse().map((interview: Interview) => (
              <TableRow key={interview.id}>
                <TableCell>{formatDate(interview.completedAt)}</TableCell>
                <TableCell>
                  <span className="capitalize">{interview.mode}</span>
                </TableCell>
                <TableCell>
                  {interview.score ? (
                    <span className="font-medium">{interview.score}%</span>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                    ${interview.status === "completed" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"}`
                  }>
                    {interview.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => navigate(`/results/${interview.id}`)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default InterviewHistory;
