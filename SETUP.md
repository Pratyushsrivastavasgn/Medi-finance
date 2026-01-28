# 🚀 Setup Instructions - MediFinance Platform

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** - VS Code recommended

## Step-by-Step Setup

### 1. Navigate to Project Directory

```bash
cd "c:\Users\praty\OneDrive\Desktop\Projects\ClanWars"
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React, React Router, React DOM
- TypeScript
- Tailwind CSS
- Express
- Recharts for visualizations
- Lucide React for icons

**Expected time:** 2-3 minutes

### 3. Environment Configuration (Optional)

For development, default settings work fine. For production:

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your configuration
notepad .env
```

### 4. Start Development Server

```bash
npm run dev
```

This command starts both:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

**Expected output:**
```
> medifinance-platform@1.0.0 dev
> concurrently "npm run dev:client" "npm run dev:server"

[0] VITE v5.0.8  ready in 823 ms
[0] ➜  Local:   http://localhost:3000/
[1] 🏥 MediFinance API server running on http://localhost:5000
```

### 5. Open in Browser

Navigate to: **http://localhost:3000**

You should see the MediFinance landing page!

---

## 🧪 Testing the Platform

### Test Flow 1: Hospital Cost Comparison
1. Click **"Compare Costs"** in navigation
2. Select procedure: "Knee Replacement Surgery"
3. Enter location: "Bangalore"
4. View comparison charts and hospital cards
5. Sort by price, rating, or distance

### Test Flow 2: Insurance Analysis
1. Navigate to **"Insurance Check"**
2. Click **"Choose File"** (simulation - no real file needed)
3. Wait 2 seconds for AI analysis
4. View policy summary, eligibility checks, and cost breakdown

### Test Flow 3: Financing Options
1. Go to **"Financing"** page
2. Adjust loan amount slider (₹10K - ₹5L)
3. Adjust tenure slider (3-48 months)
4. View EMI calculations and financing providers
5. Click **"Check Eligibility"** to see qualification

### Test Flow 4: Cost Simulator
1. Navigate to **"Cost Simulator"**
2. **Step 1:** Select procedure and room type
3. **Step 2:** Choose hospital
4. **Step 3:** Add insurance details
5. **Step 4:** View complete cost estimate
6. Click **"Generate Full Report"**

---

## 🏗️ Build for Production

### Build Command

```bash
npm run build
```

This creates optimized production files in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Opens production build at http://localhost:4173

### Build Output

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── ...
```

---

## 🐛 Troubleshooting

### Issue: Port Already in Use

**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Kill process on port 3000 (Windows)
npx kill-port 3000

# Or change port in vite.config.ts
server: {
  port: 3001
}
```

### Issue: Module Not Found

**Error:** `Cannot find module 'react'`

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: TypeScript Errors

**Error:** `Type 'X' is not assignable to type 'Y'`

**Solution:**
```bash
# Restart TypeScript server in VS Code
Ctrl+Shift+P → "TypeScript: Restart TS Server"

# Or rebuild TypeScript
npm run build
```

### Issue: Styles Not Loading

**Error:** Tailwind classes not working

**Solution:**
```bash
# Rebuild Tailwind CSS
npm run dev

# Check tailwind.config.js content paths
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
```

---

## 📦 Package Management

### Add New Package

```bash
npm install package-name
# or
npm install -D package-name  # for dev dependencies
```

### Update Packages

```bash
# Check for outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm update package-name
```

### Remove Package

```bash
npm uninstall package-name
```

---

## 🔧 VS Code Extensions (Recommended)

Install these extensions for better development experience:

1. **ES7+ React/Redux/React-Native snippets**
2. **Tailwind CSS IntelliSense**
3. **TypeScript Vue Plugin (Volar)**
4. **Prettier - Code formatter**
5. **ESLint**
6. **GitLens**
7. **Path Intellisense**

### Install Extensions via Command Palette

Press `Ctrl+Shift+P` and type: `Extensions: Install Extensions`

---

## 🚢 Deployment Options

### Option 1: Vercel (Recommended for Frontend)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Option 3: Docker

```bash
# Build Docker image
docker build -t medifinance-platform .

# Run container
docker run -p 3000:3000 -p 5000:5000 medifinance-platform
```

### Option 4: Traditional Hosting

```bash
# Build project
npm run build

# Upload dist/ folder to web server
# Configure server to serve index.html for all routes
```

---

## 🗄️ Database Setup (Future)

When ready to connect to a real database:

### PostgreSQL Installation

```bash
# Windows: Download from https://www.postgresql.org/download/

# macOS
brew install postgresql

# Start PostgreSQL
brew services start postgresql

# Create database
createdb medifinance
```

### Run Migrations

```bash
# Install migration tool
npm install -g db-migrate

# Run migrations
db-migrate up
```

### Seed Data

```bash
# Run seed script
npm run db:seed
```

---

## 🔐 Environment Variables

### Required Variables

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api/v1

# Server Configuration
PORT=5000
NODE_ENV=development

# Database (when ready)
DATABASE_URL=postgresql://user:password@localhost:5432/medifinance

# JWT Secret
JWT_SECRET=your-secret-key-here
```

### Accessing in Code

**Frontend (Vite):**
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

**Backend (Node):**
```typescript
const port = process.env.PORT || 5000;
```

---

## 📚 Additional Resources

### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

### Project Documentation
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Complete overview
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - System architecture
- [docs/API_CONTRACTS.md](docs/API_CONTRACTS.md) - API documentation
- [docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) - Database design

---

## 🤝 Getting Help

### Issues?

1. Check [Troubleshooting](#-troubleshooting) section
2. Search existing [GitHub Issues](https://github.com/yourusername/medifinance-platform/issues)
3. Create new issue with:
   - Error message
   - Steps to reproduce
   - Your environment (OS, Node version)

### Questions?

- Email: support@medifinance.health
- Discord: [Join our community](#)
- Twitter: [@MediFinanceTech](#)

---

## ✅ Setup Checklist

Before presenting/demoing:

- [ ] All dependencies installed (`npm install`)
- [ ] Development server starts successfully (`npm run dev`)
- [ ] Frontend loads at http://localhost:3000
- [ ] Backend API responds at http://localhost:5000/api/health
- [ ] All pages are accessible (Landing, Compare, Insurance, Financing, Simulator)
- [ ] Charts render correctly
- [ ] Forms are interactive
- [ ] Mobile responsive (test in DevTools)
- [ ] No console errors

---

## 🎉 You're Ready!

Your MediFinance platform is now set up and running. 

**Next Steps:**
1. Explore the platform features
2. Read the pitch script in [docs/PITCH_SCRIPT.md](docs/PITCH_SCRIPT.md)
3. Review the business model in [docs/REVENUE_MODEL.md](docs/REVENUE_MODEL.md)
4. Customize branding and content
5. Present your hackathon-winning project!

---

**Happy Coding! 🚀**

Built with ❤️ for healthcare financial equity
