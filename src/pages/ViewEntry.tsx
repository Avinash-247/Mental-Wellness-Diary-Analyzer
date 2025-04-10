
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import JournalAnalysis from "@/components/JournalAnalysis";
import { getEntry, deleteEntry } from "@/services/storageService";
import { Entry } from "@/types";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ViewEntry = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [entry, setEntry] = useState<Entry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const entryData = getEntry(id);
      setEntry(entryData);
      setLoading(false);
    }
  }, [id]);

  const handleDelete = () => {
    if (!id || !entry) return;
    
    if (confirm("Are you sure you want to delete this entry?")) {
      const deleted = deleteEntry(id);
      if (deleted) {
        toast({
          title: "Entry deleted",
          description: "Your journal entry has been removed."
        });
        navigate("/");
      }
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

  if (!entry) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Entry not found</h2>
          <p className="text-muted-foreground mb-6">The journal entry you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">Return to Journal</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link to="/" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to journal
            </Link>
          </Button>
          
          <h1 className="text-3xl font-bold mb-1">{format(new Date(entry.date), "MMMM d, yyyy")}</h1>
          <p className="text-muted-foreground">{format(new Date(entry.date), "h:mm a")}</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to={`/edit-entry/${entry.id}`} className="flex items-center gap-1">
              <Edit className="h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button variant="destructive" onClick={handleDelete} className="flex items-center gap-1">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Card>
            <CardContent className="pt-6">
              <div className="whitespace-pre-wrap journal-paper p-4 min-h-[240px] rounded-md">
                {entry.content}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <JournalAnalysis 
            emotionData={{
              tone: entry.analysis.tone,
              themes: entry.analysis.themes
            }}
            motivationalTips={entry.analysis.motivationalTips}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ViewEntry;
