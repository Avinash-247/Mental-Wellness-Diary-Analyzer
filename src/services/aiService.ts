
import { Analysis } from "@/types";

const simulateAIResponse = async (journalEntry: string): Promise<Analysis> => {
  // This is a placeholder for a real AI service
  // In a real app, you would call an API to analyze the text
  
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simple sentiment analysis based on keywords
  const lowercaseEntry = journalEntry.toLowerCase();
  
  let tone = "Neutral";
  if (lowercaseEntry.includes("happy") || 
      lowercaseEntry.includes("joy") || 
      lowercaseEntry.includes("excited") || 
      lowercaseEntry.includes("wonderful")) {
    tone = "Positive";
  } else if (lowercaseEntry.includes("sad") || 
             lowercaseEntry.includes("angry") || 
             lowercaseEntry.includes("frustrated") || 
             lowercaseEntry.includes("anxious")) {
    tone = "Negative";
  } else if (lowercaseEntry.includes("calm") || 
             lowercaseEntry.includes("peaceful") || 
             lowercaseEntry.includes("content")) {
    tone = "Calm";
  } else if (lowercaseEntry.includes("confused") || 
             lowercaseEntry.includes("uncertain") || 
             lowercaseEntry.includes("unsure")) {
    tone = "Confused";
  }
  
  // Extract potential themes
  const themesKeywords = [
    "work", "family", "health", "relationships", "personal growth",
    "stress", "achievement", "creativity", "learning", "travel",
    "social", "financial", "spiritual", "goals", "reflection"
  ];
  
  const themes = themesKeywords.filter(theme => 
    lowercaseEntry.includes(theme)
  );
  
  // If no themes were detected, add some based on the tone
  if (themes.length === 0) {
    if (tone === "Positive") {
      themes.push("achievement", "personal growth");
    } else if (tone === "Negative") {
      themes.push("stress", "challenges");
    } else if (tone === "Calm") {
      themes.push("reflection", "mindfulness");
    } else {
      themes.push("daily life", "reflection");
    }
  }
  
  // Generate motivational tips based on the tone
  let motivationalTips: string[] = [];
  
  if (tone === "Positive") {
    motivationalTips = [
      "Your positive energy is contagious! Share it with others today.",
      "Remember this feeling and revisit it when times get tough.",
      "Build on this positivity by setting a new goal for yourself."
    ];
  } else if (tone === "Negative") {
    motivationalTips = [
      "Remember that all emotions are temporary. This too shall pass.",
      "Try a short mindfulness exercise to center yourself.",
      "Consider reaching out to a friend or loved one for support."
    ];
  } else if (tone === "Calm") {
    motivationalTips = [
      "You're in a good headspace. This is a great time for reflection.",
      "Use this calm energy to plan something you've been putting off.",
      "Practice gratitude to enhance your peaceful state of mind."
    ];
  } else if (tone === "Confused") {
    motivationalTips = [
      "Break down your concerns into smaller, manageable parts.",
      "It's okay to not have all the answers right now.",
      "Try journaling more specifically about what's causing uncertainty."
    ];
  } else {
    motivationalTips = [
      "Regular journaling helps build self-awareness over time.",
      "Try to identify specific emotions in your next entry.",
      "Consider setting an intention for tomorrow."
    ];
  }
  
  return {
    tone,
    themes,
    motivationalTips
  };
};

export const analyzeJournalEntry = async (journalEntry: string): Promise<Analysis> => {
  // In a production app, you would call a real AI service here
  return simulateAIResponse(journalEntry);
};
