'use client';

import { useState, useEffect } from 'react';
import { Trash2, Eye, EyeOff } from 'lucide-react';

export default function PrivacySettings() {
  const [settings, setSettings] = useState({
    'privacy-consent': false,
    'theme': false,
    'youtube-consent': false,
  });
  const [showValues, setShowValues] = useState(false);

  const updateSettings = () => {
    // Aktuelle localStorage-Werte laden
    const privacyConsent = localStorage.getItem('privacy-consent');
    const theme = localStorage.getItem('theme');
    const youtubeConsent = localStorage.getItem('youtube-consent');

    setSettings({
      'privacy-consent': !!privacyConsent,
      'theme': !!theme,
      'youtube-consent': !!youtubeConsent,
    });
  };

  useEffect(() => {
    updateSettings();
  }, []);

  const deleteItem = (key: string) => {
    localStorage.removeItem(key);
    updateSettings();
  };

  const deleteAll = () => {
    localStorage.clear();
    updateSettings();
  };

  const getValue = (key: string) => {
    return localStorage.getItem(key) || 'Nicht gesetzt';
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-card/50 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-card-foreground">Gespeicherte Daten</h3>
          <button
            onClick={() => setShowValues(!showValues)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {showValues ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showValues ? 'Ausblenden' : 'Einblenden'}
          </button>
        </div>

        <div className="space-y-3">
          {Object.entries(settings).map(([key, hasValue]) => (
            <div key={key} className="flex items-center justify-between py-2 border-b border-border/50 last:border-b-0">
              <div className="flex-1">
                <span className="font-medium text-sm">{key}:</span>
                {showValues && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    {getValue(key)}
                  </span>
                )}
              </div>
              {hasValue && (
                <button
                  onClick={() => deleteItem(key)}
                  className="flex items-center gap-1 rounded px-2 py-1 text-xs text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                  Löschen
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <button
            onClick={deleteAll}
            className="flex items-center gap-2 rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Alle Daten löschen
          </button>
          <p className="text-xs text-muted-foreground mt-2">
            Diese Aktion löscht alle lokal gespeicherten Daten und kann nicht rückgängig gemacht werden.
          </p>
        </div>
      </div>
    </div>
  );
}