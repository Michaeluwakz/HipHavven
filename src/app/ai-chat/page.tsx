
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea'; // Changed from Input to Textarea for better UX
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SendHorizonal, Bot, UserCircle, Wand2, Loader2 } from 'lucide-react';
import { getPropertySuggestions } from './actions';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string | string[]; // AI can send multiple suggestions
  timestamp: Date;
}

export default function AiChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  
  // Initial greeting from AI
  useEffect(() => {
    setMessages([
      {
        id: 'initial-ai-greeting', // Static ID to prevent key mismatch during hydration
        sender: 'ai',
        text: "Hello! I'm your HipHaven AI Assistant. How can I help you find the perfect shortlet today? For example, you can say 'I'm looking for a 2-bedroom apartment with a pool in Miami'.",
        timestamp: new Date(), // Timestamp will be client-side
      }
    ]);
  }, []);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: userInput,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput('');
    setIsLoading(true);

    const response = await getPropertySuggestions({ userPreferences: userInput });

    setIsLoading(false);

    if ('error' in response) {
      const aiErrorMessage: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: `Sorry, I encountered an error: ${response.error}`,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, aiErrorMessage]);
    } else {
      const aiResponseMessage: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: response.suggestions.length > 0 ? response.suggestions : "I couldn't find any specific suggestions based on that. Could you try being more specific or rephrasing your request?",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, aiResponseMessage]);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto flex flex-col h-[calc(100vh-12rem)] shadow-xl">
      <CardHeader className="border-b">
        <div className="flex items-center space-x-3">
          <Wand2 className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="font-headline text-2xl">AI Property Assistant</CardTitle>
            <CardDescription>Get personalized property suggestions.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-0 overflow-hidden">
        <ScrollArea className="h-full p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start space-x-3 max-w-lg",
                message.sender === 'user' ? 'ml-auto flex-row-reverse space-x-reverse' : ''
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={message.sender === 'ai' ? '/ai-avatar.png' : undefined} /> {/* Placeholder for AI avatar */}
                <AvatarFallback>
                  {message.sender === 'ai' ? <Bot size={20}/> : <UserCircle size={20}/>}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "p-3 rounded-lg shadow-sm",
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-card text-card-foreground rounded-bl-none'
                )}
              >
                {Array.isArray(message.text) ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {message.text.map((item, index) => <li key={index} className="text-sm">{item}</li>)}
                  </ul>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                )}
                <p className={cn("text-xs mt-1", message.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground')}>
                  {isClient ? message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start space-x-3">
               <Avatar className="h-8 w-8">
                <AvatarFallback><Bot size={20}/></AvatarFallback>
              </Avatar>
              <div className="p-3 rounded-lg shadow-sm bg-card text-card-foreground rounded-bl-none">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="w-full flex items-center space-x-2">
          <Textarea
            placeholder="Describe your ideal property..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-grow resize-none"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e as unknown as React.FormEvent);
              }
            }}
            aria-label="AI chat input"
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendHorizonal className="h-5 w-5" />}
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
