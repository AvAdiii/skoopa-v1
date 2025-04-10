
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

type Message = {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: Date;
};

// Simulated AI responses for common customer queries
const AI_RESPONSES: Record<string, string> = {
  hello: "Hello! Welcome to Skoopa Help & Support. How can I assist you today?",
  hi: "Hi there! How can I help you with Skoopa services today?",
  booking: "To make a booking, simply navigate to the home page and select the service you're interested in. Follow the steps to choose your preferred date, time, and any additional options.",
  cancel: "You can cancel a booking up to 2 hours before the scheduled time without any cancellation fee. Go to the Bookings section, select the booking you want to cancel, and tap on the Cancel button.",
  refund: "Refunds are processed within 5-7 business days to the original payment method. If you don't receive your refund after this period, please contact our customer support team.",
  maid: "All our maids are thoroughly vetted, background-checked, and trained to provide professional services. If you have any issues with your assigned maid, you can provide feedback or request a change for your next booking.",
  payment: "We accept multiple payment methods including credit/debit cards, UPI, and digital wallets. All transactions are secure and encrypted.",
  services: "Skoopa offers a range of home cleaning services including Regular Cleaning, Deep Cleaning, Kitchen Cleaning, Bathroom Cleaning, and special Festival Cleaning services like Diwali Special.",
  contact: "You can reach our customer support team at support@skoopa.com or call our helpline at +91-9876543210 from 9 AM to 8 PM, seven days a week.",
  replacement: "If your regular maid is unavailable, our Maid Replacement Guarantee ensures you get a substitute within the timeframe specified by your protection plan.",
  complaint: "We take all complaints seriously. Please provide details about your issue, and we'll have our customer relations team address it within 24 hours.",
};

// Function to generate a response based on user input
const generateResponse = (input: string): string => {
  const lowercaseInput = input.toLowerCase();
  
  for (const [keyword, response] of Object.entries(AI_RESPONSES)) {
    if (lowercaseInput.includes(keyword)) {
      return response;
    }
  }
  
  return "I understand you're asking about " + input + ". Our customer support team will have more detailed information on this. Would you like me to connect you with a human agent?";
};

const HelpSupport = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi there! I'm Skoopa's AI assistant. How can I help you today?",
      sender: "agent",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Generate and add AI response after a delay
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(input),
        sender: "agent",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/profile" className="text-sapphire">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-lg font-bold text-sapphire">Help & Support</h1>
          </div>
        </div>
      </div>
      
      {/* Chat area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className={`max-w-[80%] rounded-xl p-3 ${
                  message.sender === "user" 
                    ? "bg-coral text-white rounded-tr-none" 
                    : "bg-smoke text-charcoal rounded-tl-none"
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.sender === "agent" && (
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder.svg" alt="AI Assistant" />
                      <AvatarFallback className="bg-azure text-sapphire">AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-coral/80 text-white">
                        <User size={16} />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-[80%] rounded-xl p-4 bg-smoke text-charcoal rounded-tl-none">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-charcoal/60 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-charcoal/60 animate-bounce" style={{ animationDelay: "200ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-charcoal/60 animate-bounce" style={{ animationDelay: "400ms" }}></div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Input area */}
      <div className="p-4 border-t border-smoke bg-white">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1"
          />
          <Button 
            onClick={handleSend} 
            size="icon"
            className="bg-coral hover:bg-coral/90"
          >
            <Send size={18} />
          </Button>
        </div>
        <p className="text-xs text-steel mt-2 text-center">
          Our AI assistant can help with common questions. For complex issues, tap "Connect with Agent"
        </p>
        <Button 
          variant="outline" 
          className="w-full mt-3 border-coral text-coral hover:bg-coral/5"
        >
          Connect with Human Agent
        </Button>
      </div>
    </div>
  );
};

export default HelpSupport;
