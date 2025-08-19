# 📚 Personal Digital Library Platform

AllTogether is a modern **personal digital library** where anyone can sign up, upload PDFs/books, and read them later with a **beautiful, book-like experience** (page-turn animations planned). It’s built with production-quality, modular React + TypeScript and a polished UI.

---

## 🔗 Live Demo
> _Coming soon link here_

---

## 🖼️ Screenshots

- **Landing Page** – <img width="1865" height="967" alt="image" src="https://github.com/user-attachments/assets/bc06e93c-500a-4d71-a7f6-84fe7d4f1230" />

<img width="1403" height="965" alt="image" src="https://github.com/user-attachments/assets/d953f8e8-3195-4be3-8e43-dd21abf45a9d" />


- **Library Dashboard** – 

<img width="2024" height="795" alt="image" src="https://github.com/user-attachments/assets/24ad031b-aefe-4810-86af-d3e8f53c5b23" />

- **Analytics** – `./screenshots/analytics.png`  

<img width="1870" height="962" alt="image" src="https://github.com/user-attachments/assets/2ff90436-5f07-4af4-ad96-1fb1c724c383" />


---

## ✨ Features

### Core
- 🔐 **Auth**: Login/Signup with lightweight, JWT-style session management  
- 📤 **Drag & Drop Uploads**: PDFs & text files  
- 📚 **Personal Library**: Cards/grid with status (Reading, Completed, Favorites)  
- 📈 **Dashboard Analytics**: Stats for total books, pages read, hours, completed  
- 📖 **Reading Progress**: Visual progress bars, last-read tracking, bookmarks  
- 🔎 **Search & Filters**: Smart search + category filters (All, Favorites, Reading, Completed)  
- 📱 **Responsive UI**: Mobile-first, smooth transitions, glassmorphism/gradients  

### Reader (Current & Planned)
- ✅ Single-page inline PDF view (current)
- 🟨 **Planned**: **Realistic book UI** with spine/shadows/page edges  
- 🟨 **Planned**: **Page-turn animation**, dual-page layout, zoom, highlights, keyboard nav  
- 🟨 **Planned**: Offline mode (service worker)

---

## 🧱 Tech Stack

**Frontend**
- React 18 + **TypeScript**
- **Tailwind CSS** (utility-first, responsive)
- **React Router DOM** (routing)
- **Lucide React** (icons)
- **Context API** (Auth & Library contexts)
- **LocalStorage** (client-side persistence)

**Future Backend (PERN)**
- Node.js + Express (REST APIs)
- PostgreSQL + Prisma ORM
- JWT (auth tokens)
- Multer + AWS S3 / Cloudinary (uploads)
- PDF parsing (pdf-parse, pdf2pic)
- Socket.io (real-time sync)

---

## 🗂️ Project Structure (excerpt)
```bash
alltogether/
├─ public/
├─ src/
│ ├─ components/
│ │ ├─ Auth/
│ │ ├─ Library/
│ │ ├─ Reader/
│ │ ├─ Dashboard/
│ │ └─ UI/
│ ├─ contexts/
│ │ ├─ AuthContext.tsx
│ │ └─ LibraryContext.tsx
│ ├─ pages/
│ │ ├─ Landing.tsx
│ │ ├─ Library.tsx
│ │ ├─ Reader.tsx
│ │ ├─ Favorites.tsx
│ │ ├─ Analytics.tsx
│ │ └─ Settings.tsx
│ ├─ hooks/
│ ├─ utils/
│ ├─ App.tsx
│ └─ main.tsx
├─ package.json
├─ tailwind.config.ts
└─ README.md
```
---

## ⚙️ Getting Started

```bash
# 1) Clone
git clone https://github.com/Hussyn72/alltogether.git
cd alltogether
```
```bash
# 2) Install
npm install
```
```bash
# 3) Run dev server
npm run dev
```

* **Create a .env (or .env.local) if you use env-based flags (e.g., VITE_* for feature toggles, analytics, etc.).**

## 🧠 How It Works
Auth: Users sign up and log in; a lightweight session is stored for seamless UX.

Upload: Drag & drop PDFs; metadata is captured and stored (client-side for now).

Library: Books appear with status; quick actions for mark-as-reading/completed/favorite.

Reader: Open a book → progress tracked; resume from last-read page.

Analytics: See totals, reading hours, streak potential, and completion metrics.

## 🧪 Scripts
```bash
npm run dev         # Start Vite dev server
npm run build       # Production build
npm run preview     # Preview production build
npm run lint        # Lint (if configured)
```

## 🧭 Roadmap
 Auth (login/signup)
 Drag & drop uploads (PDF, text)
 Library dashboard + stats
 Search & filters
 Favorites page (final polish)
 Analytics page (final visuals & charts)
 Settings page (profile, notifications, theme)
 Book-like reader (page-turn animation, dual pages, zoom, highlights, keyboard nav)
 Backend (PERN) with real DB, JWT, S3 uploads
 AI recommendations, social sharing, export/import
 Offline mode (service worker), Flutter mobile app

## 🐞 Known Issues / In-Progress
Favorites / Analytics / Settings pages: WIP (navigation in place; polishing remaining)

* **Some single-page PDFs may not render on certain browsers; book-like reader is in development to improve compatibility and UX.**

## 🧩 Design & UX
Apple-style attention to detail: glassmorphism, gradients, micro-interactions
Smooth transitions with planned Framer Motion integration
Accessible components, keyboard navigable patterns (planned for reader)

## 🤝 Contributing
PRs are welcome! For major changes, please open an issue to discuss what you’d like to add or modify.

## 📄 License
MIT License — see LICENSE for details.

## 🙌 Acknowledgments
Built with ❤️ by Husain.
Inspired by the need for a clean, scalable, and delightful personal reading experience.






