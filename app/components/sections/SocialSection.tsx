import { siYoutube, siInstagram, siTiktok, siTwitch } from "simple-icons";

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
                    Hier geht es weiter: Auf Social Media teile ich kurze Updates, Einblicke hinter die Kulissen sowie in mein Leben und beantworte Fragen aus der Community. Schau vorbei!
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                {[
                    {
                        "title": "@einblickmitlinus",
                        "text": "Authentische Geschichten & Interviews",
                        "link": "https://www.youtube.com/@einblickmitlinus",
                        "icon": siYoutube
                    },
                    {
                        "title": "@einblickmitlinus",
                        "text": "Stories aus meinem Leben",
                        "link": "https://www.instagram.com/einblickmitlinus/",
                        "icon": siInstagram
                    },
                    {
                        "title": "@lifelinus",
                        "text": "Längere Videos auf dem YouTube-Kanal",
                        "link": "https://www.youtube.com/@lifelinus",
                        "icon": siYoutube
                    },
                    {
                        "title": "@lifelinus",
                        "text": "Stories aus meinem Leben",
                        "link": "https://www.instagram.com/lifelinus/",
                        "icon": siInstagram
                    },
                    {
                        "title": "@lifelinus",
                        "text": "Kurze Clips und schnelle Einblick.",
                        "link": "https://www.tiktok.com/@lifelinus",
                        "icon": siTiktok
                    },
                    {
                        "title": "@lifelinus",
                        "text": "Livestreams und Gaming-Sessions",
                        "link": "https://www.twitch.tv/lifelinus",
                        "icon": siTwitch
                    },
                ].map((item) => (
                    <a
                        href={item.link}
                        key={item.link}

                    >
                        <div
                            className="flex flex-col justify-between gap-4 rounded-2xl border border-border/20 bg-card/50 backdrop-blur-sm shadow-lg shadow-black/5 dark:shadow-black/20 p-6 transition-all duration-200 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30 hover:bg-card/60"
                        >
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <svg
                                        className="h-6 w-6"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d={item.icon.path} />
                                    </svg>
                                    <p className="text-lg font-semibold text-card-foreground">
                                        {item.title}
                                    </p>
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
                            </div>
                            <p
                                className="text-left text-sm font-medium text-card-foreground hover:text-card-foreground/70"
                            >
                                Folgen →
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}