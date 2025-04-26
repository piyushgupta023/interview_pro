
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JobRole } from "@/types";

const OnboardingPage: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const [selectedRole, setSelectedRole] = useState<"" | JobRole>("");
  const [domain, setDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    navigate("/");
    return null;
  }

  const handleRoleChange = (value: string) => {
    setSelectedRole(value as JobRole);
  };

  const handleContinue = () => {
    setIsLoading(true);
    
    // Update user profile with role and domain
    updateUserProfile({
      role: selectedRole as JobRole,
      domain: domain.trim() || undefined
    });
    
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <CardDescription>
            Help us personalize your interview preparation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Your Name</p>
            <Input value={user.fullName} disabled />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Your Email</p>
            <Input value={user.email} disabled />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Job Role</p>
            <Select value={selectedRole} onValueChange={handleRoleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select job role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Software Engineer">Software Engineer</SelectItem>
                <SelectItem value="Product Manager">Product Manager</SelectItem>
                <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                <SelectItem value="PHP Developer">PHP Developer</SelectItem>
                <SelectItem value="Cyber Security Analyst">Cyber Security Analyst</SelectItem>
                <SelectItem value="UX/UI Designer">UX/UI Designer</SelectItem>
                <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
                <SelectItem value="QA Engineer">QA Engineer</SelectItem>
                <SelectItem value="Project Manager">Project Manager</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Specialized Domain (Optional)</p>
            <Input 
              placeholder="e.g., Frontend, Mobile, Machine Learning" 
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleContinue}
            disabled={!selectedRole || isLoading}
          >
            {isLoading ? "Saving..." : "Continue"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingPage;
