import { Instagram, Youtube, Video, Twitch } from "lucide-react";

export default function SocialSection() {
    return (
        <section className="space-y-8" id="social">
            <div className="flex flex-col gap-3">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Social Media
                </p>
                <h3 className="text-3xl font-semibold text-card-foreground">
                    Tägliche Einblicke &amp; Community.
                </h3>
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                    Die Gespräche gehen weiter: Auf Social Media teile ich kurze Updates, Einblicke hinter die Kulissen sowie in mein Leben und beantworte Fragen aus der Community. Schau vorbei!
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                {[
                    {
                        "title": "Instagram",
                        "text": "Portraits, Zitate und Highlights aus den Gesprächen.",
                        "link": "https://www.instagram.com/lifelinus/",
                        "icon": Instagram
                    },
                    {
                        "title": "TikTok",
                        "text": "Kurze Clips und schnelle Einblicke aus dem Format.",
                        "link": "https://www.tiktok.com/@lifelinus",
                        "icon": Video
                    },
                    {
                        "title": "YouTube",
                        "text": "Längere Videos, Highlights und Content auf dem YouTube-Kanal.",
                        "link": "https://www.youtube.com/@lifelinus",
                        "icon": Youtube
                    },
                    {
                        "title": "Twitch",
                        "text": "Livestreams und Gaming-Sessions.",
                        "link": "https://www.twitch.tv/lifelinus",
                        "icon": Twitch
                    },
                ].map((item) => (
                    <div
                        key={item.title}
                        className="flex flex-col justify-between gap-4 rounded-2xl border border-border/20 bg-card/50 backdrop-blur-sm shadow-lg shadow-black/5 dark:shadow-black/20 p-6 transition-all duration-200 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30 hover:bg-card/60"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <item.icon className="h-6 w-6" />
                                <p className="text-lg font-semibold text-card-foreground">
                                    {item.title}
                                </p>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
                        </div>
                        <a
                            href={item.link}
                            className="text-left text-sm font-medium text-card-foreground hover:text-card-foreground/70"
                        >
                            Folgen →
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}