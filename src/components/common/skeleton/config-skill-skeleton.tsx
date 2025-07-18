import { Skeleton } from "@app/components/ui/skeleton";
import { Card, CardHeader, CardContent, CardFooter } from "@app/components/ui/card";

export const ConfigSkillSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {[...Array(8)].map((_, i) => (
      <Card key={i} className="bg-[#070b14] border border-[#1e2a4a] relative overflow-hidden">
        <CardHeader className="pb-2 text-center">
          <Skeleton className="h-5 w-2/3 mx-auto mb-2" />
        </CardHeader>
        <CardContent className="pb-2 px-3">
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="h-3 w-1/6" />
              </div>
              <Skeleton className="h-3 w-full my-1" />
            </div>
            <div className="flex justify-between items-center text-xs">
              <Skeleton className="h-3 w-1/4" />
              <Skeleton className="h-4 w-12 rounded" />
            </div>
            <div className="flex justify-between items-center text-xs">
              <Skeleton className="h-3 w-1/4" />
              <Skeleton className="h-4 w-16 rounded" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pt-0 pb-3">
          <Skeleton className="rounded-full w-10 h-10" />
        </CardFooter>
      </Card>
    ))}
  </div>
);
