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
  const match = source.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
  return match ? decodeXmlEntities(match[1].trim()) : "";
};

export const fetchLatestVideo = async (
  channelId?: string,
): Promise<LatestVideo | null> => {
  if (!channelId) {
    return null;
  }

  const feedUrl = `${FEED_BASE_URL}?channel_id=${channelId}`;
  const response = await fetch(feedUrl, { next: { revalidate: 3600 } });

  if (!response.ok) {
    return null;
  }

  const xml = await response.text();
  const entryMatch = xml.match(/<entry>[\s\S]*?<\/entry>/);

  if (!entryMatch) {
    return null;
  }

  const entry = entryMatch[0];
  const id = extractTag(entry, "yt:videoId");
  const title = extractTag(entry, "title");
  const description = extractTag(entry, "media:description");
  const firstParagraph = extractFirstParagraph(description);

  if (!id) {
    return null;
  }

  return {
    id,
    title,
    description,
    firstParagraph,
    embedUrl: `https://www.youtube.com/embed/${id}`,
    watchUrl: `https://www.youtube.com/watch?v=${id}`,
  };
};
