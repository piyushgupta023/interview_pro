
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListCheck, ListOrdered, FileText } from "lucide-react";

const RecommendedQuestionSets: React.FC = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Recommended Question Sets</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ListCheck className="mr-2 h-5 w-5 text-blue-500" />
              FAANG Interview Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              A set of technical and behavioral questions commonly asked at Facebook, Amazon, Apple, Netflix, and Google.
            </p>
            <Button variant="outline" size="sm" className="w-full">Start Practice</Button>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ListOrdered className="mr-2 h-5 w-5 text-green-500" />
              STAR Method Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Questions formatted using the Situation, Task, Action, Result framework for behavioral interviews.
            </p>
            <Button variant="outline" size="sm" className="w-full">Start Practice</Button>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-purple-500" />
              Role-Specific Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Personalized questions based on your selected role and domain.
            </p>
            <Button variant="outline" size="sm" className="w-full">Start Practice</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecommendedQuestionSets;
