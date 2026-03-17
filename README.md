# Ritesh Rajpurohit | Premium Scrollytelling Portfolio

![Portfolio Preview](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge&logo=react)
![Tech Stack](https://img.shields.io/badge/Stack-React_|_Vite_|_Tailwind_|_Framer_Motion-blue?style=for-the-badge)

A high-fidelity, interactive personal portfolio for **Ritesh Rajpurohit** (Full-Stack & AI Engineer). Designed with a premium dark-mode aesthetic, "Scrollytelling" video capabilities, and ultra-smooth GSAP-style layout animations.

## 🌟 Key Features

*   **🎬 Custom Scrollytelling Hero**: A 60fps frame-synced background video (`/public/Ritesh_video_hq.mp4`) that scrubs perfectly in sync with the user's scroll position. (The video uses an All-Intra H.264 encoding for zero-lag mobile seeking).
*   **✨ Premium Glassmorphism UI**: High-end frosted glass aesthetic (`bg-[var(--surface)]`) integrated deeply into the `.premium-card` unified design system.
*   **📱 Flawless Responsiveness**: Engineered with strict mobile-first Flexbox and CSS Grid logic. From 4K monitors down to small iPhones, every component scales gracefully.
*   **🎨 Dynamic Micro-Interactions**: Hover states trigger deep red/orange glowing borders (`shadow-[0_0_30px_rgba(255,68,68,0.15)]`), scaling cover images, and staggered fade-ins powered by `framer-motion`.
*   **📧 Serverless Contact Form**: Direct-to-email integration utilizing **Web3Forms**—no backend infrastructure required.
*   **📖 Live Dev.to Feed**: Horizontally scrollable (and swipable) blog cards pulling real-time articles.

## 🛠️ Architecture & Tech Stack

*   **Core Framework**: React 18
*   **Build Tool**: Vite (Lightning fast HMR and optimized production bundles)
*   **Styling**: Tailwind CSS (with custom CSS variables for effortless theming)
*   **Animations**: Framer Motion (`useScroll`, `useSpring`, `motion.div`)
*   **TypeScript**: providing strict prop typing and interface validations.

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+ recommended) and `npm` installed.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/riteshrajpurohit/Ritesh_Rajpurohit.git
cd Ritesh_Rajpurohit
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available locally at `http://localhost:5173`.

## 📦 Building for Production

To generate a highly optimized, minified production build:

```bash
npm run build
```

The output will be generated in the `/dist` directory. You can test the production build locally using:
```bash
npm run preview
```

## 📐 Design System (CSS Variables)

The entire color scheme is controlled via a centralized variable system in `src/index.css`. To alter the theme, simply adjust these root values:

```css
:root {
  --bg-primary: #0a0a0a;       /* Deep space black */
  --bg-secondary: #111111;     /* Slightly lighter black */
  --surface: rgba(20, 20, 20, 0.7); /* Glassmorphic card bases */
  --surface-hover: rgba(30, 30, 30, 0.8);
  --accent: #ff4444;           /* Ritesh Signature Red/Orange */
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
  --text-muted: #666666;
  --border: rgba(255, 255, 255, 0.08); /* Subtle card strokes */
}
```

## 📬 Contact Form Configuration

The Contact section (`src/components/Contact.tsx`) uses Web3Forms. To change the recipient email address, simply update the `access_key` in the form input (or generate a new one at web3forms.com tied to your desired email).

## 📄 License

&copy; {current_year} Ritesh Rajpurohit. All Rights Reserved.
