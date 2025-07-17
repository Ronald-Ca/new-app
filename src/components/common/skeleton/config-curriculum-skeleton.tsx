import { Skeleton } from "@app/components/ui/skeleton";

export const ConfigCurriculumSkeleton = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
        <Skeleton className="h-12 w-64 mb-6" />
        <Skeleton className="h-40 w-96 mb-4" />
        <Skeleton className="h-96 w-[32rem] rounded-xl" />
    </div>
)