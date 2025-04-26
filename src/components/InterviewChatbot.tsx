
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Mic, Headphones } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const InterviewChatbot: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting
  useEffect(() => {
    const initialGreeting: Message = {
      id: "initial",
      text: `Hello ${user?.fullName || "there"}! 👋 I'm your interview coach. I can help you prepare for your ${user?.role || "job"} interviews. How can I assist you today?`,
      sender: "bot",
      timestamp: new Date()
    };
    
    setMessages([initialGreeting]);
  }, [user]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const generateBotResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let response = "";
    
    // Generate response based on user's input
    const lowerUserMessage = userMessage.toLowerCase();
    
    if (lowerUserMessage.includes("roadmap") || lowerUserMessage.includes("path")) {
      response = `Based on your ${user?.role || "job"} role${user?.domain ? ` in ${user.domain}` : ''}, here's a recommended learning roadmap:\n\n1. Master core ${user?.domain || "technical"} skills\n2. Build portfolio projects\n3. Practice technical interviews daily\n4. Learn system design principles\n5. Network with industry professionals\n\nWould you like me to elaborate on any of these steps?`;
    } 
    else if (lowerUserMessage.includes("prepare") || lowerUserMessage.includes("practice")) {
      response = "To prepare effectively:\n\n1. Practice common interview questions daily\n2. Use the STAR method for behavioral questions\n3. Contribute to open-source projects\n4. Create a portfolio showcasing your skills\n5. Record yourself answering questions and review\n\nWould you like some practice questions?";
    }
    else if (lowerUserMessage.includes("question") || lowerUserMessage.includes("ask")) {
      response = "Here are some common interview questions for your role:\n\n1. Describe a challenging project you worked on\n2. How do you handle disagreements with team members?\n3. What's your approach to learning new technologies?\n4. How do you prioritize tasks when dealing with multiple deadlines?\n5. Where do you see yourself in 5 years?";
    }
    else if (lowerUserMessage.includes("thank")) {
      response = "You're welcome! I'm here to help you succeed in your interviews. Is there anything else you'd like to know?";
    }
    else {
      response = "I'm here to help with your interview preparation. You can ask me about:\n\n- Career roadmaps\n- Interview preparation tips\n- Practice questions\n- Resume advice\n- Technical concepts\n\nHow can I assist you today?";
    }
    
    setIsTyping(false);
    
    return {
      id: generateUniqueId(),
      text: response,
      sender: "bot",
      timestamp: new Date()
    } as Message;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: generateUniqueId(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    
    const botResponse = await generateBotResponse(inputMessage);
    setMessages(prev => [...prev, botResponse]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Mock voice input
  const handleVoiceInput = () => {
    alert("Voice input activated! (This would normally start speech recognition)");
  };

  // Mock voice output
  const handleVoiceOutput = () => {
    if (messages.length > 0) {
      const lastBotMessage = messages.filter(m => m.sender === "bot").pop();
      if (lastBotMessage) {
        alert(`Reading: "${lastBotMessage.text}"\n(This would normally use text-to-speech)`);
      }
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="h-[700px] max-h-[80vh] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageCircle className="mr-2 h-5 w-5 text-primary" />
          Interview Coach
        </CardTitle>
        <CardDescription>
          Get personalized guidance for your interview preparation
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}>
                    {formatTimestamp(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "200ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "400ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <div className="flex items-end w-full gap-2">
          <Button
            variant="outline" 
            size="icon"
            onClick={handleVoiceInput}
            className="shrink-0"
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Button
            variant="outline" 
            size="icon"
            onClick={handleVoiceOutput}
            className="shrink-0"
          >
            <Headphones className="h-4 w-4" />
          </Button>
          <Textarea
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="min-h-10 flex-1 resize-none"
            rows={1}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default InterviewChatbot;
