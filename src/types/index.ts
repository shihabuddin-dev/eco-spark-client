export type Role = "ADMIN" | "MEMBER";
export type Status = "ACTIVE" | "DEACTIVATED";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  role: Role;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export type IdeaStatus = "DRAFT" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";

export interface Idea {
  id: string;
  title: string;
  description: string;
  problemStatement: string;
  proposedSolution: string;
  images: string[];
  isPaid: boolean;
  price?: number;
  status: IdeaStatus;
  authorId: string;
  author: User;
  categoryId: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
  _count?: {
    votes: number;
    comments: number;
  };
  votesCount?: number;
  userVote?: "UPVOTE" | "DOWNVOTE";
  hasPurchased?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  _count?: {
    ideas: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  ideaId: string;
  userId: string;
  user: User;
  parentId?: string;
  replies?: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
