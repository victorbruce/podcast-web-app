import { Episode } from './episode.model';

export interface Playlist {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  episodes: Episode[];
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface PlaylistListResponse {
  status: string;
  data: PaginatedResponse<Playlist>;
}

export interface PlaylistResponse {
  status: string;
  data: Playlist;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
}
