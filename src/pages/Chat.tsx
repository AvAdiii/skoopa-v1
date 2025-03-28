
import { useState } from "react";
import { ArrowLeft, MoreVertical, Paperclip, Send } from "lucide-react";
import { Link } from "react-router-dom";
import CustomerBottomNav from "@/components/CustomerBottomNav";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  text: string;
  sender: "user" | "maid";
  time: string;
  status?: "sent" | "delivered" | "read";
};

type ChatThread = {
  id: string;
  maidName: string;
  maidImage: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: ChatMessage[];
};

const CHATS: ChatThread[] = [
  {
    id: "c1",
    maidName: "Geeta Singh",
    maidImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
    lastMessage: "I'll be there at 9am tomorrow",
    time: "10:30 AM",
    unread: 2,
    messages: [
      {
        id: "m1",
        text: "Hello, I'm scheduled to clean your home tomorrow at 9am. Is that still okay?",
        sender: "maid",
        time: "10:15 AM",
      },
      {
        id: "m2",
        text: "Yes, that works for me. Do you need me to prepare anything?",
        sender: "user",
        time: "10:20 AM",
        status: "read",
      },
      {
        id: "m3",
        text: "No need, I'll bring all my supplies. Just make sure I can access all the rooms.",
        sender: "maid",
        time: "10:25 AM",
      },
      {
        id: "m4",
        text: "I'll be there at 9am tomorrow",
        sender: "maid",
        time: "10:30 AM",
      },
    ],
  },
  {
    id: "c2",
    maidName: "Lakshmi R",
    maidImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3",
    lastMessage: "Thank you for your feedback!",
    time: "Yesterday",
    unread: 0,
    messages: [
      {
        id: "m1",
        text: "Thank you for cleaning my kitchen yesterday. Everything looks spotless!",
        sender: "user",
        time: "Yesterday",
        status: "read",
      },
      {
        id: "m2",
        text: "Thank you for your feedback!",
        sender: "maid",
        time: "Yesterday",
      },
    ],
  },
];

const ChatMessage = ({ message }: { message: ChatMessage }) => {
  return (
    <div
      className={cn(
        "mb-3 max-w-[80%]",
        message.sender === "user" ? "ml-auto" : "mr-auto"
      )}
    >
      <div
        className={cn(
          "p-3 rounded-lg",
          message.sender === "user"
            ? "bg-coral text-white rounded-br-none"
            : "bg-azure text-sapphire rounded-bl-none"
        )}
      >
        <p>{message.text}</p>
      </div>
      <div
        className={cn(
          "flex items-center text-xs mt-1",
          message.sender === "user" ? "justify-end" : "justify-start"
        )}
      >
        <span className="text-steel">{message.time}</span>
        {message.sender === "user" && message.status && (
          <span
            className={cn(
              "ml-1",
              message.status === "read" ? "text-coral" : "text-steel"
            )}
          >
            {message.status === "sent" && "✓"}
            {message.status === "delivered" && "✓✓"}
            {message.status === "read" && "✓✓"}
          </span>
        )}
      </div>
    </div>
  );
};

const ChatThread = ({ thread }: { thread: ChatThread }) => {
  return (
    <button
      className="flex items-center w-full p-3 border-b border-smoke last:border-b-0 hover:bg-smoke/20 transition-colors"
    >
      <div className="relative">
        <img
          src={thread.maidImage}
          alt={thread.maidName}
          className="w-12 h-12 rounded-full object-cover"
        />
        {thread.unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-coral text-white text-xs rounded-full">
            {thread.unread}
          </span>
        )}
      </div>
      <div className="ml-3 flex-1 text-left">
        <div className="flex justify-between">
          <h3 className="font-bold text-charcoal">{thread.maidName}</h3>
          <span className="text-xs text-steel">{thread.time}</span>
        </div>
        <p className="text-sm text-steel truncate">{thread.lastMessage}</p>
      </div>
    </button>
  );
};

const Chat = () => {
  const [activeChat, setActiveChat] = useState<ChatThread | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() === "") return;
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
        <div className="flex items-center gap-3">
          {activeChat ? (
            <>
              <button 
                className="text-sapphire"
                onClick={() => setActiveChat(null)}
              >
                <ArrowLeft size={24} />
              </button>
              <div className="flex items-center">
                <img 
                  src={activeChat.maidImage} 
                  alt={activeChat.maidName}
                  className="w-9 h-9 rounded-full object-cover mr-2"
                />
                <div>
                  <h1 className="font-bold text-charcoal">{activeChat.maidName}</h1>
                  <span className="text-xs text-green-600">Online</span>
                </div>
              </div>
              <button className="ml-auto text-sapphire">
                <MoreVertical size={20} />
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="text-sapphire">
                <ArrowLeft size={24} />
              </Link>
              <h1 className="text-lg font-bold text-sapphire">Messages</h1>
            </>
          )}
        </div>
      </div>

      {activeChat ? (
        // Chat conversation
        <div className="flex flex-col h-[calc(100vh-170px)]">
          <div className="flex-1 overflow-y-auto p-4">
            {activeChat.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
          
          <div className="p-3 bg-white border-t border-smoke">
            <div className="flex items-center">
              <button className="p-2 text-steel">
                <Paperclip size={20} />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border-none focus:ring-0 focus:outline-none"
              />
              <button 
                className={cn(
                  "p-2 rounded-full",
                  newMessage.trim() ? "text-coral" : "text-steel"
                )}
                onClick={handleSend}
                disabled={!newMessage.trim()}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Chat threads list
        <div className="divide-y divide-smoke">
          {CHATS.map((chat) => (
            <div key={chat.id} onClick={() => setActiveChat(chat)}>
              <ChatThread thread={chat} />
            </div>
          ))}
        </div>
      )}

      {/* Bottom Navigation */}
      <CustomerBottomNav />
    </div>
  );
};

export default Chat;
