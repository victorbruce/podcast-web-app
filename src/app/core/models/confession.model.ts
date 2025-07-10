export interface Confession {
  id: number;
  message: string;
  category: string;
  emotion: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface ConfessionResponse {
  status: string;
  data: Confession[];
  meta: {
    total: number;
    page: number;
    last_page: number;
  };
}
