
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (data: Partial<User>) => void;
}

// Mock users for demo purposes
const MOCK_USERS: User[] = [];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem("interviewProUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      const foundUser = MOCK_USERS.find(u => u.email === email);
      
      if (!foundUser) {
        throw new Error("Invalid email or password");
      }
      
      // In a real app, we would verify password hash here
      
      setUser(foundUser);
      localStorage.setItem("interviewProUser", JSON.stringify(foundUser));
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.fullName}!`,
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signup = async (fullName: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Check if email already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error("Email already in use");
      }
      
      // Create new user
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        fullName,
        email,
        interviews: [],
      };
      
      MOCK_USERS.push(newUser);
      
      setUser(newUser);
      localStorage.setItem("interviewProUser", JSON.stringify(newUser));
      
      toast({
        title: "Account created",
        description: "Your account has been successfully created!",
      });
      
      navigate("/onboarding");
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("interviewProUser");
    navigate("/");
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    
    // Update in mock storage
    const userIndex = MOCK_USERS.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      MOCK_USERS[userIndex] = updatedUser;
    }
    
    localStorage.setItem("interviewProUser", JSON.stringify(updatedUser));
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
