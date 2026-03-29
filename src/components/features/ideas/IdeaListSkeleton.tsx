import { IdeaCardSkeleton } from "@/components/shared/IdeaCardSkeleton";

export const IdeaListSkeleton = ({ count = 8 }) => {
    return <IdeaCardSkeleton count={count} />;
  };
