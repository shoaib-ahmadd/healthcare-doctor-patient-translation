import { useState, useRef, useEffect } from "react";
import { useMessages, useGenerateSummary, useClearMessages } from "@/hooks/use-messages";
import { Header } from "@/components/layout/Header";
import { SettingsPanel } from "@/components/chat/SettingsPanel";
import { ChatInput } from "@/components/chat/ChatInput";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { SummaryModal } from "@/components/summary/SummaryModal";
import { MessageSquare, Stethoscope, Search } from "lucide-react";

export default function Home() {
  // --- Local State ---
  const [currentRole, setCurrentRole] = useState<"doctor" | "patient">("doctor");
  const [doctorLanguage, setDoctorLanguage] = useState("English");
  const [patientLanguage, setPatientLanguage] = useState("Spanish");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  
  // Mobile state
  const [showMobileSettings, setShowMobileSettings] = useState(false);

  // --- API Hooks ---
  const { data: messages = [], isLoading } = useMessages();
  const { mutate: generateSummary, isPending: isGenerating } = useGenerateSummary();
  const { mutate: clearMessages, isPending: isClearing } = useClearMessages();

  // --- Derived State ---
  const originalLanguage = currentRole === "doctor" ? doctorLanguage : patientLanguage;
  const targetLanguage = currentRole === "doctor" ? patientLanguage : doctorLanguage;

  const filteredMessages = messages.filter(m => 
    m.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (m.translatedContent && m.translatedContent.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // --- Scroll to bottom ---
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length, currentRole]); // Scroll when messages arrive or role changes (likely viewing new context)

  // --- Handlers ---
  const handleGenerateSummary = () => {
    generateSummary(undefined, {
      onSuccess: (data) => {
        setSummaryText(data.summary);
        setShowSummary(true);
      }
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <Header 
        onGenerateSummary={handleGenerateSummary} 
        isGenerating={isGenerating} 
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar / Mobile Drawer toggle */}
        <aside className="hidden md:block h-full z-10 shadow-xl shadow-black/5">
          <SettingsPanel 
            currentRole={currentRole}
            onRoleChange={setCurrentRole}
            doctorLanguage={doctorLanguage}
            onDoctorLanguageChange={setDoctorLanguage}
            patientLanguage={patientLanguage}
            onPatientLanguageChange={setPatientLanguage}
            onClearChat={clearMessages}
            isClearing={isClearing}
          />
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col relative min-w-0">
          
          {/* Mobile Role Switcher (visible only on small screens) */}
          <div className="md:hidden p-2 bg-muted/50 border-b flex justify-between items-center px-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase text-muted-foreground">Speaking as:</span>
              <button 
                onClick={() => setCurrentRole(r => r === "doctor" ? "patient" : "doctor")}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm transition-all
                  ${currentRole === "doctor" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"}
                `}
              >
                {currentRole === "doctor" ? <Stethoscope size={12} /> : null}
                {currentRole === "doctor" ? "Doctor" : "Patient"}
              </button>
            </div>
            
            {/* Simple Mobile Summary Button */}
            <button 
              onClick={handleGenerateSummary}
              disabled={isGenerating}
              className="text-xs font-medium text-primary hover:underline disabled:opacity-50"
            >
              {isGenerating ? "..." : "Summary"}
            </button>
          </div>

          {/* Search Bar */}
          <div className="absolute top-4 right-6 left-6 z-10 pointer-events-none flex justify-center">
            <div className="pointer-events-auto w-full max-w-md bg-background/80 backdrop-blur-sm shadow-sm border rounded-full flex items-center px-4 py-2 transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <input
                type="text"
                placeholder="Search conversation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-0 outline-none text-sm w-full placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Messages List */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 md:p-8 pt-16 scrollbar-thin scroll-smooth"
          >
            <div className="max-w-4xl mx-auto">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground gap-4">
                  <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  <p>Loading secure history...</p>
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[50vh] text-center px-4">
                  <div className="bg-muted/50 p-6 rounded-full mb-6">
                    <MessageSquare className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">No messages yet</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Start the consultation by selecting a role and typing a message. The AI will translate it instantly.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col">
                  {/* Date separator example (optional, assuming all today for MVP) */}
                  <div className="flex justify-center mb-8">
                    <span className="bg-muted/50 px-3 py-1 rounded-full text-xs font-medium text-muted-foreground">
                      Today's Session
                    </span>
                  </div>
                  
                  {filteredMessages.map((msg) => (
                    <MessageBubble 
                      key={msg.id} 
                      message={msg} 
                      isCurrentUser={msg.role === currentRole}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <ChatInput 
            currentRole={currentRole}
            originalLanguage={originalLanguage}
            targetLanguage={targetLanguage}
          />
        </main>
      </div>

      <SummaryModal 
        isOpen={showSummary} 
        onClose={() => setShowSummary(false)} 
        summary={summaryText} 
      />
    </div>
  );
}
