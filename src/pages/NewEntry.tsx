
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import JournalEntry from "@/components/JournalEntry";
import JournalAnalysis from "@/components/JournalAnalysis";
import { analyzeJournalEntry } from "@/services/aiService";
import { saveEntry } from "@/services/storageService";
import { useToast } from "@/components/ui/use-toast";

const NewEntry = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisData, setAnalysisData] = useState({
    tone: "",
    themes: []
  });
  const [motivationalTips, setMotivationalTips] = useState<string[]>([]);

  const handleSave = async (content: string) => {
    setIsAnalyzing(true);
    setShowAnalysis(true);
    
    try {
      const analysis = await analyzeJournalEntry(content);
      setAnalysisData({
        tone: analysis.tone,
        themes: analysis.themes,
      });
      setMotivationalTips(analysis.motivationalTips);
      
      // Save the entry with the analysis
      await saveEntry(content, analysis);
      
      toast({
        title: "Entry saved!",
        description: "Your journal entry has been saved and analyzed."
      });
      
      // Navigate to the home page after a brief delay to show the analysis
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error analyzing entry:", error);
      toast({
        title: "Error",
        description: "There was a problem analyzing your entry. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">New Journal Entry</h1>
        <p className="text-muted-foreground">
          Write down your thoughts and receive personalized insights
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <JournalEntry onSave={handleSave} />
        </div>
        
        {showAnalysis && (
          <div>
            <JournalAnalysis 
              emotionData={analysisData}
              motivationalTips={motivationalTips}
              isLoading={isAnalyzing}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default NewEntry;
