
import { Entry, Analysis } from "@/types";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "mindful_journal_entries";

export const saveEntry = async (content: string, analysis: Analysis): Promise<Entry> => {
  const entries = getEntries();
  
  const newEntry: Entry = {
    id: uuidv4(),
    date: new Date().toISOString(),
    content,
    analysis
  };
  
  entries.push(newEntry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  
  return newEntry;
};

export const updateEntry = async (id: string, content: string, analysis: Analysis): Promise<Entry | null> => {
  const entries = getEntries();
  const entryIndex = entries.findIndex(entry => entry.id === id);
  
  if (entryIndex === -1) return null;
  
  const updatedEntry: Entry = {
    ...entries[entryIndex],
    content,
    analysis,
    date: new Date().toISOString() // Update the date to the current time
  };
  
  entries[entryIndex] = updatedEntry;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  
  return updatedEntry;
};

export const getEntry = (id: string): Entry | null => {
  const entries = getEntries();
  const entry = entries.find(entry => entry.id === id);
  return entry || null;
};

export const getEntries = (): Entry[] => {
  const entriesJson = localStorage.getItem(STORAGE_KEY);
  return entriesJson ? JSON.parse(entriesJson) : [];
};

export const deleteEntry = (id: string): boolean => {
  const entries = getEntries();
  const filteredEntries = entries.filter(entry => entry.id !== id);
  
  if (filteredEntries.length === entries.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredEntries));
  return true;
};
