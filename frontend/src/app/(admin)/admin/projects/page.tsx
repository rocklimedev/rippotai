import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getProjects } from "@/lib/content";

export const metadata = { title: "Projects" };

const SHAPE: Record<string, string> = { F: "Full bleed", W: "Wide 65%", H: "Half", V: "Vertical 35%" };

export default function AdminProjects() {
  const projects = getProjects();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Projects</CardTitle>
        <CardDescription>{projects.length} entries · order matches the /projects grid</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Cover</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Grid tile</TableHead>
              <TableHead>Slug</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((p) => (
              <TableRow key={p.slug}>
                <TableCell>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.cover} alt="" className="h-10 w-14 rounded object-cover" loading="lazy" />
                </TableCell>
                <TableCell className="font-medium text-primary">{p.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{p.type}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{SHAPE[p.shape ?? ""] ?? "—"}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{p.slug}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
