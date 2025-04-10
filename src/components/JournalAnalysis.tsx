
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smile, Frown, Meh, Lightbulb } from "lucide-react";

interface EmotionData {
  tone: string;
  themes: string[];
}

interface JournalAnalysisProps {
  emotionData: EmotionData;
  motivationalTips: string[];
  isLoading?: boolean;
}

const EmotionIcon = ({ tone }: { tone: string }) => {
  const lowerTone = tone.toLowerCase();
  
  if (lowerTone.includes("positive") || lowerTone.includes("happy") || lowerTone.includes("joy")) {
    return <Smile className="h-6 w-6 text-green-500" />;
  } else if (lowerTone.includes("negative") || lowerTone.includes("sad") || lowerTone.includes("anxious")) {
    return <Frown className="h-6 w-6 text-red-500" />;
  } else {
    return <Meh className="h-6 w-6 text-amber-500" />;
  }
};

const JournalAnalysis = ({ emotionData, motivationalTips, isLoading = false }: JournalAnalysisProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Emotional Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-6">
              <div className="animate-pulse space-y-2 w-full">
                <div className="bg-muted h-4 w-3/4 rounded"></div>
                <div className="bg-muted h-4 w-1/2 rounded"></div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <EmotionIcon tone={emotionData.tone} />
                <div>
                  <p className="font-medium">Emotional Tone:</p>
                  <p>{emotionData.tone}</p>
                </div>
              </div>
              <div>
                <p className="font-medium mb-2">Identified Themes:</p>
                <div className="flex flex-wrap gap-2">
                  {emotionData.themes.map((theme, index) => (
                    <Badge key={index} variant="secondary">{theme}</Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-400" />
            Motivational Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="animate-pulse space-y-2">
              <div className="bg-muted h-4 w-full rounded"></div>
              <div className="bg-muted h-4 w-5/6 rounded"></div>
              <div className="bg-muted h-4 w-4/5 rounded"></div>
            </div>
          ) : (
            <ul className="space-y-2 list-disc pl-5">
              {motivationalTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JournalAnalysis;
