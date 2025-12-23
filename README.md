# Linus Webapp

Eine moderne, DSGVO-konforme Next.js-Webapp für Content Creator Linus mit YouTube-Integration und vollständiger Containerisierung.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC)
![pnpm](https://img.shields.io/badge/pnpm-10.x-F69220)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- Moderne UI/UX mit Atomic Design Pattern
- Dark/Light Mode mit localStorage
- DSGVO-konform mit Privacy-Modal und Datenschutz
- YouTube Integration mit Zustimmungsmanagement
- Contact Form mit SMTP
- Vollständig containerisiert
- CI/CD Pipeline mit GitHub Actions
- Responsive Design

## Tech Stack

- **Framework:** Next.js 16.1.1 (App Router)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 3.x
- **Package Manager:** pnpm
- **Container:** Docker & Docker Compose
- **CI/CD:** GitHub Actions

## Projektstruktur

```
linus-webapp/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   ├── components/               # React Components
│   │   ├── atoms/               # Kleine wiederverwendbare Komponenten
│   │   ├── molecules/           # Kombination aus Atoms
│   │   ├── organisms/           # Komplexe UI-Sektionen
│   │   ├── sections/            # Seitenabschnitte
│   │   └── ui/                  # Basis UI-Komponenten
│   ├── globals.css              # Globale Styles
│   ├── layout.tsx               # Root Layout
│   └── page.tsx                 # Homepage
├── public/                       # Statische Assets
├── .github/workflows/            # CI/CD Pipelines
├── docker-compose.yml            # Produktions-Setup
├── docker-compose.local.yml      # Lokale Entwicklung
├── Dockerfile                    # Container-Konfiguration
└── package.json                  # Dependencies & Scripts
```

## Quick Start

### Lokale Entwicklung

```bash
git clone https://github.com/knoepsim/linus-webapp.git
cd linus-webapp
pnpm install
pnpm dev
```

### Docker Setup

```bash
# Lokale Entwicklung
docker compose -f docker-compose.local.yml up -d --build

# Produktion
docker compose up -d
```

## Konfiguration

Erstelle `.env.local` für lokale Entwicklung:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
NEXT_TELEMETRY_DISABLED=1
```

## Testing

```bash
# TypeScript
pnpm tsc --noEmit

# ESLint
pnpm eslint . --ext .ts,.tsx,.js,.jsx

# Build
pnpm build

# Docker Validierung
docker compose config --quiet
```

## Deployment

### Automatisch (GitHub Actions)

Bei Push zu `main`:
1. Tests laufen
2. Docker Image wird gebaut
3. Zu GHCR gepusht
4. Optional: Deployment über Webhook

### Manuell

```bash
docker run -d \
  --name linus-webapp \
  -p 3000:3000 \
  -e SMTP_HOST=your-smtp \
  -e SMTP_USER=your-user \
  -e SMTP_PASS=your-pass \
  ghcr.io/knoepsim/linus-webapp:latest
```

## DSGVO & Privacy

- Privacy Modal für externe Inhalte
- localStorage für Präferenzen
- Privacy-freundliche YouTube-Einbettung
- Vollständige Datenschutzerklärung
- Sichere Contact Form

## Contributing

1. Fork das Repository
2. Branch erstellen: `git checkout -b feature/amazing-feature`
3. Commits machen: `git commit -m 'Add amazing feature'`
4. Push zum Branch: `git push origin feature/amazing-feature`
5. Pull Request öffnen

## License

MIT License - siehe [LICENSE](LICENSE) Datei.

