import { Skeleton } from "@app/components/ui/skeleton";
import { Card, CardHeader } from "@app/components/ui/card";

export const ConfigSocialMediaSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {[1, 2, 3, 4].map((i) => (
      <Card key={i} className="bg-[#070b14] border border-[#1e2a4a] relative overflow-hidden">
        <CardHeader className="pb-2 text-center mt-8">
          <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
        </CardHeader>
      </Card>
    ))}
  </div>
);
