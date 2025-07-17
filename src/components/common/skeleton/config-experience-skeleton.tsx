import { Skeleton } from "@app/components/ui/skeleton";
import { Card, CardHeader, CardContent, CardFooter } from "@app/components/ui/card";

export const ConfigExperienceSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3].map((i) => (
      <Card key={i} className="bg-[#070b14] border border-[#1e2a4a]">
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-5 w-16 rounded" />
              <Skeleton className="h-5 w-16 rounded" />
              <Skeleton className="h-5 w-10 rounded" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-8 w-20 ml-auto" />
        </CardFooter>
      </Card>
    ))}
  </div>
);
