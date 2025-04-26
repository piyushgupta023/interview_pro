
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ScoreCardProps {
  score: number;
  getScoreBand: (score: number) => string;
  getScoreColor: (score: number) => string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score, getScoreBand, getScoreColor }) => {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>Overall Score</CardTitle>
        <CardDescription>
          How well you performed in this interview
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative h-48 w-48 flex items-center justify-center mb-6">
            <div className={`absolute inset-0 rounded-full ${getScoreColor(score)} opacity-10`}></div>
            <div className={`absolute inset-[10px] rounded-full ${getScoreColor(score)} opacity-20`}></div>
            <div className="text-center">
              <p className="text-6xl font-bold">{score}%</p>
              <p className="text-xl">{getScoreBand(score)}</p>
            </div>
          </div>
          <Progress value={score} className="h-2 w-full max-w-md" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;
