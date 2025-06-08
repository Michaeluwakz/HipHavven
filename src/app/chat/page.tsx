
'use client';

import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Paperclip, SendHorizonal, UserCircle, Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'host' | 'support';
  timestamp: Date;
  avatar?: string;
  senderName: string;
}

const initialConversations = [
  { id: 'conv1', name: 'Host: John Doe (Villa Malibu)', lastMessage: 'Sure, check-in is anytime after 3 PM.', unread: 0, avatar: 'https://placehold.co/40x40.png?text=JD' },
  { id: 'conv2', name: 'Support Team', lastMessage: 'We are looking into your request.', unread: 1, avatar: 'https://placehold.co/40x40.png?text=ST' },
  { id: 'conv3', name: 'Host: Sarah (Urban Apt)', lastMessage: 'Yes, pets are allowed for a small fee.', unread: 0, avatar: 'https://placehold.co/40x40.png?text=SA' },
];

const sampleMessages: { [key: string]: Message[] } = {
  conv1: [
    { id: 'm1', text: 'Hi, I have a question about my booking for Villa Malibu.', sender: 'user', timestamp: new Date(Date.now() - 1000 * 60 * 5), senderName: 'You' },
    { id: 'm2', text: 'Hello! I\'m John, the host. How can I help you?', sender: 'host', timestamp: new Date(Date.now() - 1000 * 60 * 4), avatar: 'https://placehold.co/40x40.png?text=JD', senderName: 'John D.' },
    { id: 'm3', text: 'What time is the earliest I can check in?', sender: 'user', timestamp: new Date(Date.now() - 1000 * 60 * 3), senderName: 'You' },
    { id: 'm4', text: 'Sure, check-in is anytime after 3 PM.', sender: 'host', timestamp: new Date(Date.now() - 1000 * 60 * 2), avatar: 'https://placehold.co/40x40.png?text=JD', senderName: 'John D.' },
  ],
  conv2: [
     { id: 'm5', text: 'I need help with a payment issue.', sender: 'user', timestamp: new Date(Date.now() - 1000 * 60 * 10), senderName: 'You' },
     { id: 'm6', text: 'We are looking into your request and will get back to you shortly.', sender: 'support', timestamp: new Date(Date.now() - 1000 * 60 * 8), avatar: 'https://placehold.co/40x40.png?text=ST', senderName: 'Support' },
  ],
  conv3: [],
};


export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(initialConversations[0]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  
  useEffect(() => {
    // Initialize messages for the selected conversation
    // This ensures Date objects are created client-side if not already memoized or static
    const currentSampleMessages = sampleMessages[selectedConversation.id] || [];
    setMessages(currentSampleMessages.map(msg => ({...msg, timestamp: new Date(msg.timestamp)})));
  }, [selectedConversation]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    const msg: Message = {
      id: String(Date.now()),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      senderName: 'You',
    };
    setMessages([...messages, msg]);
    setNewMessage('');

    // Simulate a reply
    setTimeout(() => {
      const reply: Message = {
        id: String(Date.now() + 1),
        text: 'Thanks for your message! We will get back to you soon.',
        sender: selectedConversation.name.includes('Host') ? 'host' : 'support',
        timestamp: new Date(),
        avatar: selectedConversation.avatar,
        senderName: selectedConversation.name.split(':')[0]
      };
      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-10rem)] gap-6">
      <Card className="w-full md:w-1/3 lg:w-1/4 flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Conversations</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex-grow overflow-y-auto">
          <ScrollArea className="h-full">
            {initialConversations.map(conv => (
              <div 
                key={conv.id} 
                className={cn(
                  "flex items-center p-3 hover:bg-muted cursor-pointer border-b",
                  selectedConversation.id === conv.id && "bg-muted"
                )}
                onClick={() => setSelectedConversation(conv)}
              >
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={conv.avatar} alt={conv.name} />
                  <AvatarFallback>{conv.name.substring(0,2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <p className="font-semibold text-sm">{conv.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && <Badge className="ml-auto">{conv.unread}</Badge>}
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
              <AvatarFallback>{selectedConversation.name.substring(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="font-headline text-xl">{selectedConversation.name}</CardTitle>
              <p className="text-sm text-green-500">Online</p> {/* Placeholder status */}
            </div>
          </div>
        </CardHeader>
        <ScrollArea className="flex-grow p-4 space-y-4 bg-background">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-end space-x-2 max-w-xs md:max-w-md lg:max-w-lg",
                message.sender === 'user' ? 'ml-auto flex-row-reverse space-x-reverse' : ''
              )}
            >
              {message.sender !== 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.avatar} />
                  <AvatarFallback>
                    {message.sender === 'host' || message.sender === 'support' ? message.senderName.substring(0,1) : <UserCircle size={20} />}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "p-3 rounded-lg shadow",
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-card text-card-foreground rounded-bl-none'
                )}
              >
                <p className="text-sm">{message.text}</p>
                <p className={cn("text-xs mt-1", message.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground')}>
                  {isClient ? message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="p-4 border-t bg-card flex items-center space-x-2">
          <Button variant="ghost" size="icon" type="button">
            <Paperclip className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow"
            aria-label="Chat message input"
          />
          <Button type="submit" size="icon">
            <SendHorizonal className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </Card>
    </div>
  );
}
