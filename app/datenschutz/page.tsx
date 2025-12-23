import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";
import PrivacySettings from "../components/PrivacySettings";

export const metadata = {
  title: "Datenschutzerklärung | Linus - Content Creator & YouTuber",
  description: "Datenschutzerklärung für die Website von Linus. Erfahren Sie, wie wir mit Ihren Daten umgehen und Ihre Privatsphäre schützen.",
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-6 py-16">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-card-foreground">
            Datenschutzerklärung
          </h1>
          <p className="text-lg text-muted-foreground">
            Stand: {new Date().toLocaleDateString('de-DE')}
          </p>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-card-foreground">
              1. Verantwortlicher
            </h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <div className="bg-card/50 p-4 rounded-lg border border-border/20">
              <p className="font-medium">Linus</p>
              <p>E-Mail: kontakt@lifelinus.de</p>
              <p>Website: lifelinus.de</p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-card-foreground">
              2. Datenschutz auf einen Blick
            </h2>

            <h3 className="text-xl font-medium">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert,
              wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert
              werden können.
            </p>

            <h3 className="text-xl font-medium">Datenerfassung auf dieser Website</h3>
            <p>
              <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber.
            </p>

            <p>
              <strong>Wie erfassen wir Ihre Daten?</strong><br />
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten
              handeln, die Sie in ein Kontaktformular eingeben.
            </p>

            <p>
              Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-card-foreground">
              3. Hosting
            </h2>
            <p>
              Diese Website wird bei einem externen Dienstleister gehostet (Vercel Inc.). Die personenbezogenen Daten,
              die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert.
            </p>
            <p>
              Weitere Informationen entnehmen Sie der Datenschutzerklärung von Vercel:
              <a href="https://vercel.com/legal/privacy-policy" className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                https://vercel.com/legal/privacy-policy
              </a>
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-card-foreground">
              4. Kontaktformular
            </h2>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular
              inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von
              Anschlussfragen bei uns gespeichert.
            </p>
            <p>
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)
            </p>
            <p>
              <strong>Speicherdauer:</strong> Nach vollständiger Bearbeitung Ihrer Anfrage werden die Daten gelöscht,
              sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-card-foreground">
              5. Lokale Datenspeicherung (localStorage)
            </h2>
            <p>
              Diese Website verwendet localStorage, um bestimmte Einstellungen zu speichern:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Theme-Einstellung:</strong> Speicherung Ihrer Präferenz für helles oder dunkles Design
              </li>
              <li>
                <strong>YouTube-Consent:</strong> Speicherung Ihrer Zustimmung zum Laden von YouTube-Inhalten
              </li>
            </ul>
            <p>
              Diese Daten werden ausschließlich lokal in Ihrem Browser gespeichert und nicht an Server übertragen.
            </p>
            <p>
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)
            </p>
            <p>
              <strong>Widerruf:</strong> Sie können Ihre Zustimmung jederzeit widerrufen, indem Sie die gespeicherten
              Daten in Ihrem Browser löschen oder die entsprechenden Einstellungen ändern.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-card-foreground">
              6. Externe Inhalte (YouTube)
            </h2>
            <p>
              Diese Website bettet YouTube-Videos ein. Beim Laden dieser Videos werden Daten an YouTube (Google)
              übertragen. YouTube verwendet Cookies und ähnliche Technologien.
            </p>
            <p>
              <strong>Datenschutz bei YouTube:</strong>
              <a href="https://policies.google.com/privacy" className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                Google Datenschutzerklärung
              </a>
            </p>
            <p>
              <strong>Zustimmung:</strong> YouTube-Inhalte werden nur nach Ihrer ausdrücklichen Zustimmung geladen.
            </p>
            <p>
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-card-foreground">
              7. Ihre Rechte
            </h2>
            <p>Sie haben folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Auskunftsrecht:</strong> Sie können Auskunft über Ihre gespeicherten Daten verlangen.</li>
              <li><strong>Berichtigungsrecht:</strong> Sie können unrichtige Daten berichtigen lassen.</li>
              <li><strong>Löschungsrecht:</strong> Sie können die Löschung Ihrer Daten verlangen.</li>
              <li><strong>Einschränkungsrecht:</strong> Sie können die Verarbeitung einschränken lassen.</li>
              <li><strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung widersprechen.</li>
              <li><strong>Datenübertragbarkeit:</strong> Sie können Ihre Daten in einem übertragbaren Format erhalten.</li>
            </ul>
            <p>
              Zur Ausübung Ihrer Rechte kontaktieren Sie uns bitte per E-Mail: kontakt@lifelinus.de
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-card-foreground">
              8. Datensicherheit
            </h2>
            <p>
              Diese Website verwendet HTTPS-Verschlüsselung, um die Sicherheit Ihrer Daten während der Übertragung zu gewährleisten.
              Kontaktformulardaten werden verschlüsselt übertragen und sicher gespeichert.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-card-foreground">
              10. Dateneinstellungen verwalten
            </h2>
            <p>
              Hier können Sie Ihre gespeicherten Daten einsehen und verwalten:
            </p>
            <PrivacySettings />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}