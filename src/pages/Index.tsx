
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import JournalEntryList from "@/components/JournalEntryList";
import { getEntries, deleteEntry } from "@/services/storageService";
import { Entry } from "@/types";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadEntries = () => {
      const storedEntries = getEntries();
      // Sort entries by date (newest first)
      storedEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setEntries(storedEntries);
    };

    loadEntries();

    // Listen for storage changes (if the user has multiple tabs open)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "mindful_journal_entries") {
        loadEntries();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this entry?")) {
      const deleted = deleteEntry(id);
      if (deleted) {
        setEntries(entries.filter(entry => entry.id !== id));
        toast({
          title: "Entry deleted",
          description: "Your journal entry has been removed."
        });
      }
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Your Journal</h1>
        <p className="text-muted-foreground">
          Review your past entries and reflections
        </p>
      </div>
      <JournalEntryList entries={entries} onDelete={handleDelete} />
    </Layout>
  );
};

export default Index;
