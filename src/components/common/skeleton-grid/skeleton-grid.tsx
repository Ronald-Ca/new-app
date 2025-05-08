import { Card, CardHeader, CardContent, CardFooter } from '@app/components/ui/card';
import { Skeleton } from '@app/components/ui/skeleton';

interface SkeletonGridProps {
  count: number;
  className?: string;
}

export default function SkeletonGrid({ count, className = '' }: SkeletonGridProps) {
  return (
    <div className={`${className}`.trim()}>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="bg-[#070b14] border border-[#1e2a4a]">
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-3/4 mx-auto" />
          </CardHeader>
          <CardContent className="pb-2">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-2 w-full" />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Skeleton className="h-8 w-8 rounded-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
