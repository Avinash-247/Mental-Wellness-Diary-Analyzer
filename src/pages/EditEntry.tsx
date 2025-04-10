
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import JournalEntry from "@/components/JournalEntry";
import JournalAnalysis from "@/components/JournalAnalysis";
import { getEntry, updateEntry } from "@/services/storageService";
import { analyzeJournalEntry } from "@/services/aiService";
import { useToast } from "@/components/ui/use-toast";

const EditEntry = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [entryContent, setEntryContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState({
    tone: "",
    themes: []
  });
  const [motivationalTips, setMotivationalTips] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const entryData = getEntry(id);
      if (entryData) {
        setEntryContent(entryData.content);
        setAnalysisData({
          tone: entryData.analysis.tone,
          themes: entryData.analysis.themes,
        });
        setMotivationalTips(entryData.analysis.motivationalTips);
      }
      setLoading(false);
    }
  }, [id]);

  const handleSave = async (content: string) => {
    if (!id) return;
    
    setIsAnalyzing(true);
    
    try {
      const analysis = await analyzeJournalEntry(content);
      setAnalysisData({
        tone: analysis.tone,
        themes: analysis.themes,
      });
      setMotivationalTips(analysis.motivationalTips);
      
      // Update the entry with the new content and analysis
      const updated = await updateEntry(id, content, analysis);
      
      if (updated) {
        toast({
          title: "Entry updated!",
          description: "Your journal entry has been updated and re-analyzed."
        });
        
        // Navigate to the view page
        navigate(`/entry/${id}`);
      } else {
        toast({
          title: "Error",
          description: "Entry not found. It may have been deleted.",
          variant: "destructive"
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating entry:", error);
      toast({
        title: "Error",
        description: "There was a problem updating your entry. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Edit Journal Entry</h1>
        <p className="text-muted-foreground">
          Update your thoughts and get refreshed insights
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <JournalEntry 
            onSave={handleSave} 
            initialContent={entryContent}
            isEdit={true}
          />
        </div>
        
        <div>
          <JournalAnalysis 
            emotionData={analysisData}
            motivationalTips={motivationalTips}
            isLoading={isAnalyzing}
          />
        </div>
      </div>
    </Layout>
  );
};

export default EditEntry;
