export interface SocialMediaLink {
  id: number;
  platform: string;
  url: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  profile_image: string;
  social_media_links: SocialMediaLink[];
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface TeamMemberResponse {
  status: string;
  data: TeamMember[];
  meta: {
    total: number;
    page: number;
    last_page: number;
  };
}
