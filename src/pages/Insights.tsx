
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { getEntries } from "@/services/storageService";
import { Entry, Analysis } from "@/types";
import EmotionChart from "@/components/EmotionChart";
import ThemeCloud from "@/components/ThemeCloud";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmotionCount {
  [key: string]: number;
}

interface ThemeCount {
  name: string;
  count: number;
}

const Insights = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [emotionData, setEmotionData] = useState<Array<{ name: string; value: number; color: string }>>([]);
  const [themeData, setThemeData] = useState<ThemeCount[]>([]);
  const [mostCommonMood, setMostCommonMood] = useState<string | null>(null);

  useEffect(() => {
    const loadEntries = () => {
      const storedEntries = getEntries();
      setEntries(storedEntries);
      
      // Process the emotions data
      if (storedEntries.length > 0) {
        processEmotionData(storedEntries);
        processThemeData(storedEntries);
      }
    };

    loadEntries();
  }, []);

  const processEmotionData = (entries: Entry[]) => {
    // Count emotions
    const emotionCounts: EmotionCount = {};
    
    entries.forEach(entry => {
      const tone = entry.analysis.tone;
      emotionCounts[tone] = (emotionCounts[tone] || 0) + 1;
    });
    
    // Map emotions to colors
    const colorMap: { [key: string]: string } = {
      "Positive": "#4caf50",
      "Negative": "#f44336",
      "Calm": "#2196f3",
      "Confused": "#ff9800",
      "Neutral": "#9e9e9e"
    };
    
    // Convert to format needed for chart
    const chartData = Object.keys(emotionCounts).map(emotion => ({
      name: emotion,
      value: emotionCounts[emotion],
      color: colorMap[emotion] || "#9e9e9e" // Default to grey if no color defined
    }));
    
    // Find most common mood
    let maxCount = 0;
    let maxMood = "";
    Object.keys(emotionCounts).forEach(mood => {
      if (emotionCounts[mood] > maxCount) {
        maxCount = emotionCounts[mood];
        maxMood = mood;
      }
    });
    
    setMostCommonMood(maxMood);
    setEmotionData(chartData);
  };

  const processThemeData = (entries: Entry[]) => {
    // Count themes
    const themeCounts: { [key: string]: number } = {};
    
    entries.forEach(entry => {
      entry.analysis.themes.forEach(theme => {
        themeCounts[theme] = (themeCounts[theme] || 0) + 1;
      });
    });
    
    // Convert to format needed for theme cloud
    const themeCloudData = Object.keys(themeCounts).map(theme => ({
      name: theme,
      count: themeCounts[theme]
    }));
    
    setThemeData(themeCloudData);
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Your Insights</h1>
        <p className="text-muted-foreground">
          Explore patterns and trends from your journal entries
        </p>
      </div>
      
      {entries.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold mb-2">No journal entries yet</h2>
          <p className="text-muted-foreground mb-2">
            Start journaling to see insights about your emotional patterns
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <EmotionChart data={emotionData} />
          
          <Card>
            <CardHeader>
              <CardTitle>Emotional Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Journal Entries</span>
                  <span className="font-medium text-lg">{entries.length}</span>
                </div>
                
                {mostCommonMood && (
                  <div className="flex justify-between items-center">
                    <span>Most Common Mood</span>
                    <span className="font-medium text-lg">{mostCommonMood}</span>
                  </div>
                )}
                
                <div className="pt-4">
                  <h3 className="font-medium mb-2">Observations</h3>
                  <p className="text-muted-foreground">
                    {entries.length < 3 ? (
                      "Keep journaling to see more detailed insights about your emotional patterns."
                    ) : mostCommonMood === "Positive" ? (
                      "Your entries tend to be positive. This reflects a generally optimistic outlook."
                    ) : mostCommonMood === "Negative" ? (
                      "You've recorded more negative emotions lately. Remember to practice self-care."
                    ) : mostCommonMood === "Calm" ? (
                      "Your entries reflect a calm mindset. You seem to maintain good emotional balance."
                    ) : (
                      "Your journal reflects a mixture of emotions, showing a balanced emotional range."
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {entries.length > 0 && (
        <div className="mb-6">
          <ThemeCloud themes={themeData} />
        </div>
      )}
    </Layout>
  );
};

export default Insights;
