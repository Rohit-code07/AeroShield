# AeroShield

AeroShield is an interactive web report and engineering proposal for a retrofit road-dust trapping system aimed at reducing PM pollution along high-traffic corridors. It combines pollution data dashboards, AQI/PM trend charts, hotspot mapping, an engineering design walkthrough, a working-principle animation, cost/ROI analysis, environmental impact projections, and a deployment roadmap — all in a single scrollable, exportable technical proposal.

## Features

- **Problem Dashboard** – key pollution statistics for the target corridor
- **Interactive Charts** – AQI trends and particulate matter (PM) data visualizations
- **Pollution Map** – corridor hotspot mapping
- **Problem Analysis** – breakdown of root causes and impact
- **Engineering Solution** – retrofit device component diagram and design rationale
- **Working Animation** – simulation of the dust-trapping mechanism
- **Benefits & Environmental Impact** – corridor-level and ecological benefits
- **Cost Analysis** – costing and return-on-investment breakdown
- **Future Scope** – phased deployment roadmap
- **Implementation Report** – searchable technical proposal, exportable to PDF
- **Light/Dark mode** with smooth theming
- Responsive sidebar/navbar navigation with scroll-spy active-section tracking

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for tooling and dev server
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Recharts](https://recharts.org/) for data visualization
- [Lucide React](https://lucide.dev/) for icons
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) for PDF export

## Live link
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://aero-shield-three.vercel.app/)
## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm

### Installation

```bash
git clone https://github.com/Rohit-code07/AeroShield
cd AeroShield
npm install
```

### Development

```bash
npm run dev
```

This starts the Vite dev server with hot module reloading. Open the printed local URL in your browser.

### Build

```bash
npm run build
```

Type-checks the project and produces a production build in `dist/`.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
AeroShield/
├── public/                 # Static assets (favicon, icon sprite)
├── src/
│   ├── assets/              # Images
│   ├── components/          # Page sections (Hero, Dashboard, Charts, Map, etc.)
│   ├── context/              # Theme context (light/dark mode)
│   ├── data/                 # Static dashboard/report data
│   ├── App.tsx               # Main app layout and section composition
│   └── main.tsx               # App entry point
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## Exporting the Report

Use the export button in the navbar to trigger a print/PDF export (via the browser's print dialog) of the full technical proposal.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
