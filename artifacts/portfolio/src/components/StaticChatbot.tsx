import { useMemo, useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, X, Send, RotateCcw, FileText } from "lucide-react";
import { fallbackPortfolioData, usePortfolioData, type ChatbotQuestion } from "@/lib/portfolioData";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  section?: string;
}

export default function StaticChatbot() {
  const { data = fallbackPortfolioData } = usePortfolioData();
  const questions = useMemo(() => data?.chatbot?.questions ?? [], [data]);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0 && data?.chatbot?.welcome) {
      setMessages([
        {
          id: "welcome",
          sender: "assistant",
          text: data.chatbot.welcome,
        },
      ]);
    }
  }, [data, messages.length]);

  // Scroll to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) {
      // Small timeout to allow transition to finish
      setTimeout(scrollToBottom, 50);
    }
  }, [open, messages, isTyping]);

  const handleQuestionClick = (question: ChatbotQuestion) => {
    if (isTyping) return;

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: question.question,
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate thinking/API response delay
    setTimeout(() => {
      setIsTyping(false);
      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        sender: "assistant",
        text: question.answer,
        section: question.section,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 850);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue;
    setInputValue("");

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Try keyword matching
    const normalized = userText.toLowerCase().trim();
    
    setTimeout(() => {
      setIsTyping(false);
      
      let matchedQ: ChatbotQuestion | undefined = undefined;

      if (normalized.includes("who") || normalized.includes("about") || normalized.includes("profile") || normalized.includes("name") || normalized.includes("zakaria")) {
        matchedQ = questions.find(q => q.id === "profile");
      } else if (normalized.includes("skill") || normalized.includes("tech") || normalized.includes("stack") || normalized.includes("language") || normalized.includes("code")) {
        matchedQ = questions.find(q => q.id === "top-skills");
      } else if (normalized.includes("project") || normalized.includes("portfolio") || normalized.includes("build") || normalized.includes("mcp") || normalized.includes("app")) {
        matchedQ = questions.find(q => q.id === "projects");
      } else if (normalized.includes("experience") || normalized.includes("work") || normalized.includes("job") || normalized.includes("current") || normalized.includes("tython")) {
        matchedQ = questions.find(q => q.id === "experience");
      } else if (normalized.includes("available") || normalized.includes("hire") || normalized.includes("contact") || normalized.includes("email") || normalized.includes("phone")) {
        matchedQ = questions.find(q => q.id === "availability");
      } else if (normalized.includes("cv") || normalized.includes("resume") || normalized.includes("download")) {
        matchedQ = questions.find(q => q.id === "cv");
      }

      const assistantMsg: Message = matchedQ 
        ? {
            id: `assistant-${Date.now()}`,
            sender: "assistant",
            text: matchedQ.answer,
            section: matchedQ.section,
          }
        : {
            id: `assistant-${Date.now()}`,
            sender: "assistant",
            text: "I'm a static assistant, so my answers are pre-defined. Feel free to click one of the suggested questions above, or ask about Zakaria's skills, projects, experience, or contact info!",
          };

      setMessages((prev) => [...prev, assistantMsg]);
    }, 850);
  };

  const handleReset = () => {
    if (data?.chatbot?.welcome) {
      setMessages([
        {
          id: "welcome",
          sender: "assistant",
          text: data.chatbot.welcome,
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="mb-3 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border border-border/60 bg-card/95 shadow-2xl backdrop-blur flex flex-col h-[480px]"
            data-testid="static-chatbot-panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-muted/40 px-4 py-3 flex-shrink-0">
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">Portfolio Assistant</p>
                  <p className="truncate text-xs text-muted-foreground">Interactive FAQ Chatbot</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 1 && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                    aria-label="Reset conversation"
                    title="Reset conversation"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                  aria-label="Close portfolio assistant"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 scrollbar-thin">
              {messages.map((message) => {
                const isUser = message.sender === "user";
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm shadow-sm ${
                        isUser
                          ? "rounded-tr-none bg-primary text-primary-foreground"
                          : "rounded-tl-none bg-muted/80 border border-border/40 text-foreground"
                      }`}
                      data-testid={!isUser && message.id !== "welcome" ? "chatbot-answer" : undefined}
                    >
                      {!isUser && message.section && (
                        <span className="mb-1 inline-block text-[9px] font-mono uppercase tracking-wider text-primary/80 bg-primary/10 dark:bg-primary/20 px-1.5 py-0.5 rounded">
                          {message.section}
                        </span>
                      )}
                      <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>
                      {!isUser && message.section === "cv" && data.hero?.cv && (
                        <a
                          href={data.hero.cv}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-95 shadow-sm"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          View CV (PDF)
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-start"
                >
                  <div className="max-w-[85%] rounded-2xl rounded-tl-none bg-muted/80 border border-border/40 px-3.5 py-2.5 shadow-sm">
                    <div className="flex gap-1 items-center py-1">
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Panel */}
            {questions.length > 0 && (
              <div className="px-4 py-2.5 bg-muted/10 border-t border-border/30 flex-shrink-0">
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Suggested Questions</p>
                <div className="flex flex-wrap gap-1.5 max-h-[88px] overflow-y-auto pr-1 scrollbar-thin">
                  {questions.map((question) => (
                    <button
                      key={question.id}
                      type="button"
                      disabled={isTyping}
                      onClick={() => handleQuestionClick(question)}
                      className="rounded-full border border-border/80 bg-background/80 px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-foreground active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                      data-testid={`chatbot-question-${question.id}`}
                    >
                      {question.question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Form Input */}
            <form
              onSubmit={handleFormSubmit}
              className="flex items-center gap-2 border-t border-border/60 bg-muted/20 px-3 py-2 flex-shrink-0"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isTyping}
                placeholder="Type a message or click a question..."
                className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isTyping || !inputValue.trim()}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all hover:opacity-90 active:scale-95 disabled:bg-muted disabled:text-muted-foreground disabled:pointer-events-none flex-shrink-0"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/60 bg-card/85 text-primary shadow-lg backdrop-blur transition-all hover:border-primary/40 hover:bg-primary/10"
        aria-label={open ? "Close portfolio assistant" : "Open portfolio assistant"}
        data-testid="static-chatbot-toggle"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </div>
  );
}
