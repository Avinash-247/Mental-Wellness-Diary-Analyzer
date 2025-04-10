
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Entry } from "@/types";

interface JournalEntryListProps {
  entries: Entry[];
  onDelete: (id: string) => void;
}

const JournalEntryList = ({ entries, onDelete }: JournalEntryListProps) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No journal entries yet</h3>
        <p className="text-muted-foreground mb-4">Start writing to see your entries here</p>
        <Button asChild>
          <Link to="/new-entry">Create your first entry</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <Card key={entry.id} className="transition-all hover:shadow-md">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{format(new Date(entry.date), "MMMM d, yyyy")}</CardTitle>
                <CardDescription>{format(new Date(entry.date), "h:mm a")}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link to={`/edit-entry/${entry.id}`}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onDelete(entry.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-3 text-muted-foreground">{entry.content}</p>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Emotional tone: <span className="font-medium text-foreground">{entry.analysis.tone}</span>
              </div>
              <Button variant="link" asChild className="p-0">
                <Link to={`/entry/${entry.id}`}>View full entry</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JournalEntryList;
