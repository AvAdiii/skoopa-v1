<div align="center">

# 🧹 SKOOPA
### *India's Next-Gen Maid Service Platform*

[![Live Demo](https://img.shields.io/badge/🌐_Live-skoopa.netlify.app-FF6B6B?style=for-the-badge)](https://skoopa.netlify.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

*Revolutionizing household services with technology, transparency, and trust* ✨

[🚀 View Live](https://skoopa.netlify.app) • [📱 Features](#-features) • [🛠️ Tech Stack](#-tech-stack) • [💻 Installation](#-installation)

---

</div>

## 🌟 What is Skoopa?

**Skoopa** is a dual-sided marketplace platform that connects households with professional domestic workers (maids) through a seamless, mobile-first experience. Think Uber for household cleaning services, but with an Indian twist! 🇮🇳

### 🎯 The Problem We're Solving

- **For Customers:** Finding reliable, vetted maids is difficult and time-consuming
- **For Maids:** Lack of professional platform to find consistent work and fair wages
- **For Everyone:** No transparency in pricing, scheduling, or service quality

### 💡 Our Solution

A beautiful, intuitive platform with:
- 📅 **Real-time booking** with flexible scheduling
- 💰 **Transparent pricing** with subscription models
- ⭐ **Rating & review system** for quality assurance
- 🔄 **Maid replacement guarantee** for reliability
- 🌐 **Multi-language support** (English, Hindi, Telugu)
- 🎁 **Rewards system** ("Skoops") for loyal customers

---

## ✨ Features

### 👥 For Customers

| Feature | Description |
|---------|-------------|
| 🏠 **Service Variety** | Regular Cleaning, Deep Cleaning, Kitchen Cleaning, Diwali Special, Premium Maids |
| 📆 **Flexible Scheduling** | Book one-time, weekly, or monthly services |
| 💳 **Smart Pricing** | Subscription-based pricing (₹249-₹9,999) with customizable add-ons |
| 🔔 **Live Tracking** | Track your maid's location and arrival time |
| 💬 **In-App Chat** | Direct communication with your service provider |
| 🎁 **Skoops Rewards** | Earn points on every booking, redeem for discounts |
| 🛡️ **Insurance Plans** | Maid replacement guarantee for peace of mind |

### 👩‍💼 For Maids

| Feature | Description |
|---------|-------------|
| 📱 **Dedicated Dashboard** | Manage jobs, earnings, and availability in one place |
| 🗺️ **GPS Navigation** | Built-in directions to customer locations |
| 💰 **Earnings Tracker** | Real-time earnings and job completion stats |
| ⭐ **Performance Metrics** | Level-based system with ratings and reviews |
| 🔔 **Job Notifications** | Instant alerts for new booking requests |
| 🌐 **Multi-language** | Interface in Telugu, Hindi, and English |

---

## 🎨 Design Philosophy

Skoopa features a **vibrant, modern design system** with:

- 🎨 **Custom Color Palette:**
  - `Coral` (#FF6B6B) - Primary action color
  - `Sapphire` (#4A90E2) - Trust & reliability
  - `Azure` (#E3F2FD) - Soft backgrounds
  - `Mint` (#4ECDC4) - Success states
  - `Charcoal` (#2C3E50) - Typography

- 🌊 **Smooth Animations:** Powered by Framer Motion
- 📱 **Mobile-First:** Optimized for touch interactions
- ♿ **Accessible:** Built with Radix UI primitives

---

## 🛠️ Tech Stack

### Frontend Core
```
React 18.3.1          → UI Framework
TypeScript            → Type Safety
Vite                  → Lightning-fast builds
React Router v6       → Navigation
```

### UI/UX Layer
```
Tailwind CSS          → Utility-first styling
shadcn/ui             → Accessible component library
Radix UI              → Unstyled, accessible primitives
Framer Motion         → Smooth animations
Lucide React          → Beautiful icons
```

### State & Data
```
TanStack Query        → Server state management
React Hook Form       → Form handling
Zod                   → Schema validation
Supabase              → Backend (Auth & Database ready)
```

### Build & Deploy
```
Bun/npm/pnpm         → Package management
ESLint               → Code quality
Netlify              → Hosting & CI/CD
```

---

## 💻 Installation

### Prerequisites
- Node.js 18+ or Bun
- npm/pnpm/bun

### Quick Start

```bash
# Clone the repository
git clone https://github.com/AvAdiii/skoopa-v1.git
cd skoopa-v1

# Install dependencies (choose one)
npm install
# or
pnpm install
# or
bun install

# Start development server
npm run dev
# or
pnpm dev
# or
bun dev
```

🎉 Open [http://localhost:5173](http://localhost:5173) in your browser!

---

## 🏗️ Project Structure

```
skoopa-v1/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── maid/           # Maid-specific components
│   │   └── ...             # Feature components
│   ├── pages/              # Route pages
│   │   ├── services/       # Service booking pages
│   │   ├── maid/          # Maid dashboard pages
│   │   └── ...            # Customer pages
│   ├── contexts/          # React Context providers
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   └── App.tsx            # Main app component
├── public/                # Static assets
└── index.html            # Entry HTML
```

---

## 🎯 Key Pages & Routes

### Customer App
- `/` - Home dashboard with services & active bookings
- `/service/*` - Service-specific booking flows
- `/bookings` - Booking history & management
- `/chat` - Customer support & maid communication
- `/payments` - Payment methods & history
- `/profile` - User profile & settings

### Maid App
- `/maid-login` - Maid authentication
- `/maid/dashboard` - Job management & earnings
- `/maid/notifications` - Job alerts
- `/maid/profile` - Profile & availability settings
- `/maid/directions` - GPS navigation to jobs

---

## 🚀 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run build:dev` | Development build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🎨 UI Components

Built with **shadcn/ui** for maximum customization:

- ✅ Accordion, Alert Dialog, Avatar
- ✅ Button, Calendar, Card, Checkbox
- ✅ Dialog, Dropdown Menu, Form
- ✅ Input, Label, Popover, Radio Group
- ✅ Select, Slider, Switch, Tabs
- ✅ Toast notifications, Tooltips
- ✅ And 30+ more!

---

## 🌐 Multi-Language Support

Skoopa supports **3 languages** out of the box:

- 🇬🇧 **English** - Default
- 🇮🇳 **हिंदी (Hindi)** - India's most spoken language
- 🇮🇳 **తెలుగు (Telugu)** - Southern India

Language context manages translations across the entire app!

---

## 💎 Special Services

### 1. 🧹 Deep Cleaning
**₹899** | Complete home deep cleaning with 6+ options
- Thorough dusting, floor scrubbing, bathroom sanitization
- Kitchen deep clean, window cleaning, balcony cleaning

### 2. 🪔 Diwali Special
**₹999** | Festival-ready home preparation
- Deep cleaning + Rangoli design + Diwali decorations
- Special lighting setup available

### 3. 🍳 Kitchen Cleaning
**₹349** | Specialized kitchen maintenance
- Countertops, sink, stove, appliances
- Optional chimney and refrigerator deep clean

### 4. 🛡️ Maid Insurance
**₹9,999/year** | Never worry about maid absence
- Guaranteed replacement within timeframe
- Peace of mind for consistent service

---

## 📱 Screenshots & Demo

👉 **Live Demo:** [https://skoopa.netlify.app](https://skoopa.netlify.app)

Experience the full functionality including:
- Service booking flow
- Maid dashboard simulation
- Real-time notifications
- Interactive chat support

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🎉 Open a Pull Request

---

## 📝 License

This project is currently **unlicensed**. All rights reserved.

---

## 👨‍💻 Author

**AvAdiii**
- GitHub: [@AvAdiii](https://github.com/AvAdiii)
- Project: [skoopa-v1](https://github.com/AvAdiii/skoopa-v1)

---

## 🙏 Acknowledgments

- **shadcn/ui** - For the incredible component library
- **Radix UI** - For accessible primitives
- **Tailwind CSS** - For the utility-first CSS framework
- **Netlify** - For seamless deployment

---

## 🔮 Future Roadmap

- [ ] 🔐 Complete Supabase authentication integration
- [ ] 💳 Payment gateway integration (Razorpay/Stripe)
- [ ] 📍 Live GPS tracking for maids
- [ ] 🤖 AI-powered maid recommendations
- [ ] 📊 Advanced analytics dashboard
- [ ] 🎥 Video KYC verification
- [ ] 🌍 Multi-city expansion
- [ ] 📱 Native mobile apps (React Native)

---

<div align="center">

### ⭐ If you find Skoopa useful, please consider giving it a star!

**Made with ❤️ in India**

</div>