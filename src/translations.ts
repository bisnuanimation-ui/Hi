import { Language } from './types';

export const translations: Record<Language, Record<string, string>> = {
  bn: {
    appName: 'OmniStream Downloader',
    appTagline: 'সব প্ল্যাটফর্মের ভিডিও এবং অডিও ডাউনলোড করুন এক ক্লিকে',
    subtitle: 'ফেসবুক, ইউটিউব, টিকটক, ইনস্টাগ্রামসহ ৫০০+ ওয়েবসাইটের যেকোনো ভিডিও লিংক দিন এবং দ্রুত ৪K, ১০৮০p বা MP3 তে ডাউনলোড করুন।',
    pastePlaceholder: 'এখানে ভিডিও বা রিলসের লিংক পেস্ট করুন (যেমন: https://facebook.com/watch/... বা https://youtu.be/...)',
    analyzeBtn: 'ভিডিও খুঁজুন',
    analyzing: 'বিশ্লেষণ করা হচ্ছে...',
    pasteBtn: 'পেস্ট করুন',
    clearBtn: 'মুছে ফেলুন',
    batchMode: 'মাল্টিপল/ব্যাচ ডাউনলোড',
    singleMode: 'একক লিংক ডাউনলোড',
    sampleLinksTitle: 'দ্রুত ট্রাই করে দেখুন:',
    fbSample: 'Facebook রিলস',
    ytSample: 'YouTube ৪K ভিডিও',
    igSample: 'Instagram রিলস',
    ttSample: 'TikTok (ওয়াটারমার্ক ছাড়া)',
    twSample: 'Twitter/X ক্লিপ',
    
    // Formats
    tabVideo: '🎥 ভিডিও (MP4/WEBM)',
    tabAudio: '🔊 অডিও (MP3/AAC)',
    tabImage: '🖼️ থাম্বনেইল / কভার',
    tabSubtitles: '📝 সাবটাইটেল / ক্যাপশন',
    
    downloadNow: 'ডাউনলোড করুন',
    downloading: 'ডাউনলোড হচ্ছে...',
    downloadComplete: 'ডাউনলোড সফল হয়েছে!',
    
    videoTrimTitle: 'ভিডিও ট্রিম / কাট করুন (ঐচ্ছিক):',
    startTime: 'শুরুর সময়',
    endTime: 'শেষের সময়',
    trimNote: 'ডাউনলোড করার আগে নির্দিষ্ট সময় সিলেক্ট করতে পারেন',
    
    // AI
    aiBtn: '✨ AI ভিডিও সামারি ও তথ্য',
    aiTitle: 'স্মার্ট AI ভিডিও বিশ্লেষণ (Gemini AI)',
    aiSummaryTitle: 'ভিডিওর সারসংক্ষেপ:',
    aiTakeawaysTitle: 'মূল হাইলাইটস:',
    aiTagsTitle: 'ভাইরাল হ্যাশট্যাগ (১-ক্লিকে কপি):',
    aiTranscriptTitle: 'ট্রান্সক্রিপ্ট প্রিভিউ:',
    copyTags: 'সব হ্যাশট্যাগ কপি করুন',
    copied: 'কপি করা হয়েছে!',
    
    // History & Batch
    historyTitle: 'ডাউনলোড হিস্টোরি',
    clearHistory: 'হিস্টোরি মুছুন',
    noHistory: 'এখনো কোনো ডাউনলোড হিস্টোরি নেই।',
    batchPlaceholder: 'প্রতি লাইনে একটি করে লিংক লিখুন (সর্বোচ্চ ১০টি):\nhttps://facebook.com/watch/?v=123456\nhttps://youtu.be/example\nhttps://www.tiktok.com/@user/video/123',
    processBatch: 'সবগুলো ভিডিও বিশ্লেষণ করুন',
    
    // Features & Platforms
    supportedPlatforms: 'সমর্থিত প্ল্যাটফর্মসমূহ',
    unlimitedSpeed: 'আনলিমিটেড স্পিড',
    noWatermark: 'ওয়াটারমার্ক ছাড়া টিকটক',
    hd4kSupport: '৪K এবং ১০৮০p সাপোর্ট',
    mp3Converter: 'হাই-কোয়ালিটি MP3 কনভার্টার',
    safeSecure: '১০০% নিরাপদ ও সুরক্ষিত',
    
    // Guide & FAQ
    howToTitle: 'কীভাবে ভিডিও ডাউনলোড করবেন?',
    step1: '১. ফেসবুক, ইউটিউব বা টিকটক থেকে ভিডিও লিংক কপি করুন।',
    step2: '২. ওপরের বক্সে লিংকটি পেস্ট করে "ভিডিও খুঁজুন" বাটনে ক্লিক করুন।',
    step3: '৩. আপনার পছন্দমতো ফরম্যাট (১০৮০p, ৭২০p, MP3) বেছে নিয়ে ডাউনলোড বাটনে চাপুন।',
    bookmarkletTitle: 'বুকমার্কলেট (১-ক্লিক ডাউনলোডার)',
    bookmarkletDesc: 'এই বাটনটি আপনার ব্রাউজারের বুকমার্ক বারে ড্র্যাগ করে রাখুন। যেকোনো সাইটে ভিডিও দেখার সময় এতে ক্লিক করলেই এখানে ওপেন হয়ে যাবে!',
    dragMe: '⚡ OmniStream এ ডাউনলোড',
    
    footerRights: 'সর্বস্বত্ব সংরক্ষিত © ২০২৬ OmniStream Inc. - দ্রততম সর্বজনীন ভিডিও ডাউনলোড ইঞ্জিন'
  },
  en: {
    appName: 'OmniStream Downloader',
    appTagline: 'Universal Video & Audio Downloader for All Platforms',
    subtitle: 'Paste any video link from Facebook, YouTube, TikTok, Instagram & 500+ sites to download in 4K, 1080p HD, or high quality MP3 instantly.',
    pastePlaceholder: 'Paste video, reel or audio link here (e.g. https://facebook.com/watch/... or https://youtu.be/...)',
    analyzeBtn: 'Analyze Link',
    analyzing: 'Analyzing Video...',
    pasteBtn: 'Paste',
    clearBtn: 'Clear',
    batchMode: 'Batch Download',
    singleMode: 'Single Link',
    sampleLinksTitle: 'Try quick sample links:',
    fbSample: 'Facebook Reel',
    ytSample: 'YouTube 4K',
    igSample: 'Instagram Reel',
    ttSample: 'TikTok (No Watermark)',
    twSample: 'Twitter/X HD',
    
    // Formats
    tabVideo: '🎥 Video (MP4/WEBM)',
    tabAudio: '🔊 Audio (MP3/AAC)',
    tabImage: '🖼️ Thumbnail / Cover',
    tabSubtitles: '📝 Subtitles / Captions',
    
    downloadNow: 'Download Now',
    downloading: 'Downloading...',
    downloadComplete: 'Download Complete!',
    
    videoTrimTitle: 'Trim Video Duration (Optional):',
    startTime: 'Start Time',
    endTime: 'End Time',
    trimNote: 'Cut specific video portion before downloading',
    
    // AI
    aiBtn: '✨ AI Video Summary & Insights',
    aiTitle: 'Smart AI Video Analysis (Gemini AI)',
    aiSummaryTitle: 'Video Overview:',
    aiTakeawaysTitle: 'Key Takeaways:',
    aiTagsTitle: 'Viral SEO Tags (1-Click Copy):',
    aiTranscriptTitle: 'Transcript Snippet:',
    copyTags: 'Copy All Tags',
    copied: 'Copied!',
    
    // History & Batch
    historyTitle: 'Download History',
    clearHistory: 'Clear History',
    noHistory: 'No download history yet.',
    batchPlaceholder: 'Paste multiple links (one per line, up to 10):\nhttps://facebook.com/watch/?v=123456\nhttps://youtu.be/example\nhttps://www.tiktok.com/@user/video/123',
    processBatch: 'Process All Links',
    
    // Features & Platforms
    supportedPlatforms: 'Supported Platforms',
    unlimitedSpeed: 'Unlimited Fast Speed',
    noWatermark: 'TikTok No Watermark',
    hd4kSupport: '4K & 1080p Ultra HD',
    mp3Converter: 'High Bitrate MP3 Converter',
    safeSecure: '100% Safe & Free',
    
    // Guide & FAQ
    howToTitle: 'How to Download Videos?',
    step1: '1. Copy the video link from Facebook, YouTube, Instagram or TikTok.',
    step2: '2. Paste the link into the box above and click "Analyze Link".',
    step3: '3. Select your preferred resolution or MP3 audio and click "Download Now".',
    bookmarkletTitle: '1-Click Bookmarklet Tool',
    bookmarkletDesc: 'Drag this button to your browser bookmarks bar. Click it on any webpage to download the playing video instantly!',
    dragMe: '⚡ Download with OmniStream',
    
    footerRights: 'All rights reserved © 2026 OmniStream Inc. - Universal Video Downloader Engine'
  }
};
