export type Language = 'bn' | 'en';

export interface MediaFormat {
  id: string;
  quality: string;
  resolution: string;
  extension: string;
  fileSize: string;
  type: 'video' | 'audio' | 'image' | 'subtitle';
  bitrate?: string;
  fps?: string;
  badge?: string;
  directUrl?: string;
}

export interface VideoInfo {
  url: string;
  platform: 'youtube' | 'facebook' | 'instagram' | 'tiktok' | 'twitter' | 'vimeo' | 'dailymotion' | 'reddit' | 'pinterest' | 'linkedin' | 'soundcloud' | 'general';
  platformName: string;
  title: string;
  author: string;
  authorAvatar?: string;
  duration: string;
  thumbnail: string;
  views?: string;
  likes?: string;
  publishedDate?: string;
  formats: MediaFormat[];
}

export interface AIAnalysis {
  summary_bn: string;
  summary_en: string;
  takeaways_bn: string[];
  takeaways_en: string[];
  viral_tags: string[];
  transcript_preview_bn: string;
  transcript_preview_en: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  video: VideoInfo;
  selectedFormat?: string;
}
