export interface Post {
  id: number;
  slug: string;
  status: string;
  link: string;
  date: string;
  modified: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
      media_details?: {
        sizes?: {
          medium?: { source_url: string };
          thumbnail?: { source_url: string };
        };
      };
    }>;
  };
}
