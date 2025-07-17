import { Skeleton } from "@app/components/ui/skeleton";

export const ConfigHomeSkeleton = () => (
    <div className="flex flex-col space-y-6 p-4">
        <div className="flex justify-center">
            <Skeleton className="h-64 w-64 rounded-full" />
        </div>
        <Skeleton className="h-64 w-full" />
        <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-32" />
        </div>
    </div>
)