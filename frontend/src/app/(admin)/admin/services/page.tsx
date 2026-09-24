import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getServices } from "@/lib/content";

export const metadata = { title: "Services" };

export default function AdminServices() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {getServices().map((s, i) => (
        <Card key={s.slug}>
          <CardHeader>
            <CardDescription>{String(i + 1).padStart(2, "0")}</CardDescription>
            <CardTitle className="text-primary">{s.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">{s.summary}</p>
            <div className="flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
