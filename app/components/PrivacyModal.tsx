'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function PrivacyModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Prüfen, ob bereits zugestimmt wurde
    const consent = localStorage.getItem('privacy-consent');
    if (!consent) {
      // Modal nach kurzer Verzögerung anzeigen
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setHasConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('privacy-consent', 'true');
    setHasConsent(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    // Bei Ablehnung nur localStorage für Privacy-Consent setzen
    localStorage.setItem('privacy-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible || hasConsent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
        <button
          onClick={handleDecline}
          className="absolute right-4 top-4 rounded-full p-1 hover:bg-muted transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-card-foreground">
            Datenschutzeinstellungen
          </h3>

          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Diese Website verwendet localStorage, um Ihre Theme-Einstellungen und YouTube-Consent zu speichern.
              Diese Daten bleiben lokal in Ihrem Browser und werden nicht an Server übertragen.
            </p>

            <div className="space-y-2">
              <p className="font-medium text-card-foreground">Gespeicherte Daten:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Theme-Präferenz (hell/dunkel)</li>
                <li>Zustimmung für YouTube-Inhalte</li>
              </ul>
            </div>

            <p>
              Weitere Informationen finden Sie in unserer{' '}
              <a href="/datenschutz" className="text-primary hover:underline" target="_blank">
                Datenschutzerklärung
              </a>.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleDecline}
              className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
            >
              Ablehnen
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}