
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, LightbulbIcon, CheckCircle, AlertCircle } from "lucide-react";
import { InterviewFeedback } from "@/types";

interface FeedbackGridProps {
  feedback: InterviewFeedback;
}

const FeedbackGrid: React.FC<FeedbackGridProps> = ({ feedback }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <ThumbsUp className="mr-2 h-5 w-5 text-emerald-500" />
            Strengths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {feedback.strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 text-emerald-500 mt-0.5 shrink-0" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <ThumbsDown className="mr-2 h-5 w-5 text-amber-500" />
            Areas for Improvement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {feedback.areasForImprovement.map((area, index) => (
              <li key={index} className="flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 text-amber-500 mt-0.5 shrink-0" />
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <LightbulbIcon className="mr-2 h-5 w-5 text-blue-500" />
            Tips for Next Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {feedback.tips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <LightbulbIcon className="h-5 w-5 mr-2 text-blue-500 mt-0.5 shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackGrid;
