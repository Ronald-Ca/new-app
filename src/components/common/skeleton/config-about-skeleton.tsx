import { Skeleton } from "@app/components/ui/skeleton";

export const ConfigAboutSkeleton = () => (
    <div className="flex flex-col space-y-6 p-4">
        <div className="flex justify-center">
            <Skeleton className="h-64 w-64 rounded-full" />
        </div>
        <div className="space-y-4">
            <div className="flex gap-3">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-20" />
            </div>
            <div className="flex gap-3">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-20" />
            </div>
            <Skeleton className="h-10 w-32 mx-auto" />
        </div>
    </div>
)