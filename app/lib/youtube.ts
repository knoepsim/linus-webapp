const FEED_BASE_URL = "https://www.youtube.com/feeds/videos.xml";

export type LatestVideo = {
  id: string;
  title: string;
  description: string;
  firstParagraph: string;
  embedUrl: string;
  watchUrl: string;
};

const decodeXmlEntities = (value: string) =>
  value
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const extractFirstParagraph = (description: string) => {
  const paragraphs = description
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return paragraphs[0] ?? "";
};

const extractTag = (source: string, tag: string) => {
  const match = source.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  if (!match) {
    return "";
  }
  return decodeXmlEntities(match[1].trim());
};

const isShortsVideo = (title: string, description: string, link: string) => {
  const lowerTitle = title.toLowerCase();
  const lowerDescription = description.toLowerCase();

  // Check if "shorts" appears in the title, description, or link
  return (
    lowerTitle.includes("shorts") ||
    lowerDescription.includes("shorts") ||
    link.includes("/shorts/")
  );
};

const extractLink = (source: string) => {
  const linkMatch = source.match(/<link[^>]*href="([^"]*)"/);
  if (!linkMatch) {
    return "";
  }
  return linkMatch[1];
};
export const fetchLatestVideo = async (
  channelId?: string,
): Promise<LatestVideo | null> => {
  console.log('🎥 fetchLatestVideo called with channelId:', channelId);

  if (!channelId) {
    console.log('❌ No channelId provided');
    return null;
  }

  const feedUrl = `${FEED_BASE_URL}?channel_id=${channelId}`;
  console.log('🔗 Fetching YouTube feed from:', feedUrl);

  const response = await fetch(feedUrl, { next: { revalidate: 3600 } });
  console.log('📡 YouTube API response status:', response.status);

  if (!response.ok) {
    console.log('❌ YouTube API request failed:', response.status, response.statusText);
    return null;
  }

  const xml = await response.text();
  console.log('📄 XML response length:', xml.length);

  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g);
  console.log('📋 Found entries:', entries?.length || 0);

  if (!entries || entries.length === 0) {
    console.log('⚠️ No video entries found in XML');
    return null;
  }

  for (const entry of entries) {
    const id = extractTag(entry, "yt:videoId");
    const title = extractTag(entry, "title");
    const description = extractTag(entry, "media:description");
    const link = extractLink(entry);
    const firstParagraph = extractFirstParagraph(description);

    // Exclude Shorts
    if (id && !isShortsVideo(title, description, link)) {
      const result = {
        id,
        title,
        description,
        firstParagraph,
        embedUrl: `https://www.youtube.com/embed/${id}`,
        watchUrl: `https://www.youtube.com/watch?v=${id}`,
      };
      console.log('✅ Found valid video:', { id, title, embedUrl: result.embedUrl });
      return result;
    }
  }

  console.log('❌ No valid video found after filtering Shorts');
  return null;
};

export const fetchLatestVideos = async (
  channelId?: string,
): Promise<void> => {
  if (!channelId) {
    return;
  }

  const feedUrl = `${FEED_BASE_URL}?channel_id=${channelId}`;
  const response = await fetch(feedUrl, { next: { revalidate: 3600 } });

  if (!response.ok) {
    return;
  }

  const xml = await response.text();
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g);

  if (!entries || entries.length === 0) {
    return;
  }

  entries.forEach(() => {
    // Diese Daten werden nicht mehr benötigt, da wir nur das neueste Video zurückgeben
  });
};
