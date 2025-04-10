
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";

interface JournalEntryProps {
  onSave: (content: string) => Promise<void>;
  initialContent?: string;
  isEdit?: boolean;
}

const JournalEntry = ({ onSave, initialContent = "", isEdit = false }: JournalEntryProps) => {
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!content.trim()) return;
    
    setIsSaving(true);
    try {
      await onSave(content);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="w-full mb-6 animate-fade-in">
      <CardHeader>
        <CardTitle>
          {isEdit ? "Edit Journal Entry" : "New Journal Entry"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Write your thoughts here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[240px] journal-paper p-4 text-journal-ink focus-visible:ring-mindful"
          autoFocus
        />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={!content.trim() || isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Entry
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JournalEntry;
