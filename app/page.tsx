import { fetchLatestVideo } from "./lib/youtube";
import Header from "./components/organisms/Header";
import VideoSection from "./components/sections/VideoSection";
import AboutSection from "./components/sections/AboutSection";
import SocialSection from "./components/sections/SocialSection";
import ContactSection from "./components/sections/ContactSection";
import Footer from "./components/organisms/Footer";

const fallbackVideo = {
  title: "Neuestes Video",
  firstParagraph:
    "Ein Fehler ist beim Laden aufgetreten.",
  embedUrl: "",
  watchUrl: "https://www.youtube.com/@lifelinus",
};

export default async function Home() {
  console.log('🏠 Home page rendering');
  console.log('🔑 YouTube Channel ID from env:', process.env.YOUTUBE_CHANNEL_ID);

  const latestVideo =
    (await fetchLatestVideo(process.env.YOUTUBE_CHANNEL_ID)) ?? fallbackVideo;

  console.log('📺 Latest video result:', latestVideo);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-16">
        <VideoSection video={latestVideo} />
        <AboutSection />
        <SocialSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
