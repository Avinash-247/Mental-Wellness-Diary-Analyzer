
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ThemeCloudProps {
  themes: Array<{
    name: string;
    count: number;
  }>;
}

const ThemeCloud = ({ themes }: ThemeCloudProps) => {
  if (!themes || themes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Common Themes</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-32">
          <p className="text-muted-foreground">No themes identified yet</p>
        </CardContent>
      </Card>
    );
  }

  // Sort themes by count (descending)
  const sortedThemes = [...themes].sort((a, b) => b.count - a.count);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Common Themes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {sortedThemes.map((theme) => {
            // Determine the size based on count
            const sizeClass = theme.count > 3
              ? "text-lg"
              : theme.count > 1
                ? "text-base"
                : "text-sm";
                
            return (
              <Badge 
                key={theme.name} 
                variant="outline" 
                className={`${sizeClass} py-1 px-2`}
              >
                {theme.name} ({theme.count})
              </Badge>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeCloud;
