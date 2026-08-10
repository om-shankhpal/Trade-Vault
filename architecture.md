# TradeVault — Architecture Documentation

This document provides a detailed technical breakdown of TradeVault's architecture, covering the system design, data flow, backend module internals, frontend state management, and cross-cutting concerns.

---

## Table of Contents

- [System Architecture](#system-architecture)
- [Backend Architecture](#backend-architecture)
  - [Entry Point & Application Setup](#entry-point--application-setup)
  - [Module Structure](#module-structure)
  - [Middleware Pipeline](#middleware-pipeline)
  - [Database Layer](#database-layer)
  - [File Upload Pipeline](#file-upload-pipeline)
  - [Error Handling](#error-handling)
  - [Utility Layer](#utility-layer)
- [Frontend Architecture](#frontend-architecture)
  - [Application Bootstrap](#application-bootstrap)
  - [Routing Architecture](#routing-architecture)
  - [State Management](#state-management)
  - [API Communication Layer](#api-communication-layer)
  - [Service Layer](#service-layer)
  - [Custom Hooks](#custom-hooks)
  - [Component Architecture](#component-architecture)
  - [Page Structure](#page-structure)
- [Data Flow](#data-flow)
  - [Authentication Data Flow](#authentication-data-flow)
  - [Trade Creation Data Flow](#trade-creation-data-flow)
  - [Dashboard Data Flow](#dashboard-data-flow)
  - [Screenshot Upload Data Flow](#screenshot-upload-data-flow)
- [Business Logic](#business-logic)
  - [Trade Metric Calculations](#trade-metric-calculations)
  - [Trade Business Rules](#trade-business-rules)
  - [Dashboard Aggregations](#dashboard-aggregations)
- [Database Design](#database-design)
  - [User Schema](#user-schema)
  - [Trade Schema](#trade-schema)
  - [Indexes](#indexes)
- [Security Architecture](#security-architecture)
- [Deployment Architecture](#deployment-architecture)

---

## System Architecture

TradeVault follows a **client-server architecture** with a clear separation between the React single-page application (frontend) and the Express REST API (backend). The two communicate exclusively over HTTP using JSON payloads, with JWT tokens for authentication.

```
┌─────────────────────────────────────────────────────────┐
│                        Client                           │
│                                                         │
│  React 19 + Vite 8 + Tailwind CSS 4 + React Router 7   │
│                                                         │
│  ┌──────────┐  ┌────────────┐  ┌──────────────────────┐ │
│  │  Pages   │  │ Components │  │  Context Providers    │ │
│  └────┬─────┘  └─────┬──────┘  │  (Auth, Dashboard)   │ │
│       │              │         └──────────┬───────────┘ │
│       └──────┬───────┘                    │             │
│              │                            │             │
│         ┌────▼────────────────────────────▼──┐          │
│         │     Custom Hooks + Service Layer    │          │
│         └────────────────┬───────────────────┘          │
│                          │                              │
│                ┌─────────▼─────────┐                    │
│                │   Axios Instance  │                    │
│                │  (JWT Interceptor)│                    │
│                └─────────┬─────────┘                    │
└──────────────────────────┼──────────────────────────────┘
                           │ HTTPS
                           │ Authorization: Bearer <JWT>
┌──────────────────────────┼──────────────────────────────┐
│                          │          Server               │
│                                                          │
│  Node.js + Express 5 + Mongoose 9                        │
│                                                          │
│  ┌───────────────────────────────────────────────────┐   │
│  │                  Middleware Chain                  │   │
│  │  CORS → JSON Parser → Auth → Validate → ObjectId │   │
│  └───────────────────────┬───────────────────────────┘   │
│                          │                               │
│  ┌───────────────────────▼───────────────────────────┐   │
│  │                    Modules                         │   │
│  │  ┌──────┐  ┌─────────┐  ┌──────┐  ┌───────────┐  │   │
│  │  │ Auth │  │ Profile │  │Trades│  │ Dashboard │  │   │
│  │  └──┬───┘  └────┬────┘  └──┬───┘  └─────┬─────┘  │   │
│  │     │           │          │             │        │   │
│  │  Controller → Service → Business Rules/Calculator │   │
│  └───────────────────────┬───────────────────────────┘   │
│                          │                               │
│  ┌───────────────────────▼───────────────────────────┐   │
│  │              Data Layer                            │   │
│  │  ┌──────────────┐        ┌──────────────────┐     │   │
│  │  │   MongoDB    │        │   Cloudinary      │     │   │
│  │  │  (Mongoose)  │        │  (Image Storage)  │     │   │
│  │  └──────────────┘        └──────────────────┘     │   │
│  └───────────────────────────────────────────────────┘   │
│                                                          │
│  ┌───────────────────────────────────────────────────┐   │
│  │           Global Error Handler                    │   │
│  │  ApiError → structured JSON error response        │   │
│  └───────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

---

## Backend Architecture

### Entry Point & Application Setup

The backend uses ES Modules (`"type": "module"` in `package.json`).

**`server.js`** — Entry point:
1. Loads environment variables via `dotenv.config()`
2. Connects to MongoDB via `connectDB()`
3. Starts the Express server on `PORT` (default: 5000)
4. Exits the process on connection failure

**`app.js`** — Express application:
1. Configures CORS with `CLIENT_URL` origin and credentials support
2. Registers `express.json()` body parser
3. Defines the `/api/v1/health` health check endpoint
4. Mounts module routers under `/api/v1/*`
5. Registers the global error handler as the last middleware

**Route mounting order:**
```
/api/v1/auth       → authRoutes
/api/v1/profile    → profileRoutes
/api/v1/trades     → tradeRoutes
/api/v1/dashboard  → dashboardRoutes
```

---

### Module Structure

Each module follows a consistent internal architecture:

```
modules/<module>/
├── <module>.routes.js         # Express Router — endpoint definitions
├── <module>.controller.js     # Request handlers — thin, delegates to service
├── <module>.service.js        # Business logic — data operations, rules
├── <module>.validation.js     # express-validator chains
├── <module>.model.js          # Mongoose schema and model (where applicable)
└── <module-specific>.js       # Domain helpers (business rules, calculator, mapper, constants)
```

**Module responsibilities:**

| Layer | Responsibility | Error Handling |
|---|---|---|
| **Routes** | Define HTTP method + path, compose middleware chain | N/A (declarative) |
| **Controller** | Extract request data, call service, format ApiResponse | Wrapped in `asyncHandler` |
| **Service** | Execute business logic, interact with models, call external services | Throws `ApiError` |
| **Validation** | Define field-level validation rules using express-validator | Returns validation errors via `validate` middleware |
| **Model** | Define Mongoose schema, indexes, and constraints | Mongoose validation errors |

---

### Middleware Pipeline

Requests flow through middleware in the order they are registered on each route:

```
Request
  │
  ├── CORS (global)
  ├── express.json() (global)
  │
  ├── [Route-specific middleware]:
  │     ├── authenticate       # JWT verification — extracts Bearer token, verifies, loads User → req.user
  │     ├── validateObjectId   # Validates MongoDB ObjectId format for :id params
  │     ├── validators         # express-validator chain (field-level rules)
  │     ├── validate           # Checks validationResult, returns 400 with first error message
  │     └── upload             # Multer — parses multipart/form-data, buffers in memory
  │
  ├── Controller
  │
  └── Error Handler (global)
```

**Middleware details:**

| Middleware | File | Behavior |
|---|---|---|
| `authenticate` | `auth.middleware.js` | Extracts `Authorization: Bearer <token>`, verifies JWT, loads full User document into `req.user`. Throws 401 if token missing, invalid, or user deleted. |
| `validate` | `validate.middleware.js` | Calls `validationResult(req)`. If errors exist, passes `ApiError(400, firstErrorMessage)` to `next()`. |
| `validateObjectId` | `validateObjectId.middleware.js` | Factory function accepting `paramName` and `resourceLabel`. Validates `req.params[paramName]` is a valid MongoDB ObjectId. |
| `upload` | `upload.middleware.js` | Multer with memory storage. File filter allows JPEG, PNG, WebP. Max file size: 5 MB. |
| `errorHandler` | `error.middleware.js` | Catches all errors. If not an `ApiError`, wraps as 500 Internal Server Error. Returns `{ success, message, data: null }`. |

---

### Database Layer

**Connection:** `config/db.js` connects to MongoDB using `mongoose.connect(MONGODB_URI)`. On failure, the process exits with code 1.

**Models:**

| Model | Collection | Key Fields |
|---|---|---|
| `User` | `users` | fullName, email (unique), password (select: false), profilePicture { url, publicId } |
| `Trade` | `trades` | user (ObjectId ref), tradeDate, symbol, segment, direction, entry/exit prices and times, quantity, plannedStopLoss, plannedTarget, strategy, psychology fields, screenshots [], grossPnL, charges, netPnL, rMultiple, status |

Both models use `timestamps: true` for automatic `createdAt` and `updatedAt` fields.

---

### File Upload Pipeline

TradeVault has two Cloudinary integration paths:

**1. Trade Screenshots** (`services/cloudinary.service.js`)
- Uses `streamifier.createReadStream(buffer).pipe(uploadStream)`
- Default folder: `"tradevault"`
- Returns `{ publicId, url }` (mapped from Cloudinary's `public_id` and `secure_url`)

**2. Profile Pictures** (`utils/cloudinary.helper.js`)
- Uses `stream.end(buffer)` directly
- Folder: `"tradevault/profile-pictures"` (passed explicitly)
- Returns full Cloudinary result object
- Includes `deleteImage(publicId)` for replacing existing profile pictures

Both paths use `cloudinary.uploader.upload_stream()` and buffer-based uploads (no disk I/O).

**Upload constraints:**
- File types: JPEG, PNG, WebP
- Max file size: 5 MB per file
- Max screenshots per trade: 3
- Max files per screenshot upload request: 5 (Multer limit)

---

### Error Handling

```
ApiError (extends Error)
├── statusCode: number
├── message: string
└── success: false

↓ caught by asyncHandler or thrown in middleware ↓

errorHandler middleware
├── If (err instanceof ApiError): use err.statusCode + err.message
├── Else: wrap as ApiError(500, "Internal Server Error")
└── Response: { success: false, message, data: null }
```

The `asyncHandler` utility wraps async route handlers to automatically forward rejected promises to Express error handling via `next()`:

```javascript
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
```

---

### Utility Layer

| Utility | File | Purpose |
|---|---|---|
| `ApiError` | `utils/ApiError.js` | Custom Error subclass with `statusCode` and stack trace |
| `ApiResponse` | `utils/ApiResponse.js` | Response envelope: `{ success, statusCode, message, data }` |
| `asyncHandler` | `utils/asyncHandler.js` | Wraps async handlers to catch rejected promises |
| `generateToken` | `utils/jwt.js` | Signs JWT with `{ userId }` payload, `JWT_SECRET`, and `JWT_EXPIRES_IN` |
| `uploadImage` / `deleteImage` | `utils/cloudinary.helper.js` | Cloudinary upload via buffer stream, delete by publicId |

---

## Frontend Architecture

### Application Bootstrap

```
index.html
  └── /src/main.jsx
        ├── StrictMode
        ├── BrowserRouter (React Router)
        └── AuthProvider (Context)
              └── App
                    └── AppRoutes
```

The application initializes with:
1. React 19 strict mode
2. `BrowserRouter` for client-side routing
3. `AuthProvider` wrapping the entire app for global auth state
4. `App` renders `AppRoutes` which defines all route configurations

---

### Routing Architecture

```
Routes
├── /                    → LandingPage (or redirect to /dashboard if authenticated)
├── /login               → Login
├── /register            → Register
│
└── [ProtectedRoute]     → Requires token in localStorage
    └── [DashboardLayout] → Sidebar + Navbar + DashboardProvider
        ├── /dashboard    → Dashboard
        ├── /analytics    → Analytics
        ├── /trades       → Trades (list)
        ├── /trades/new   → CreateTrade
        ├── /trades/:id   → TradeDetails
        ├── /trades/:id/edit → EditTrade
        ├── /profile      → Profile
        └── /settings     → Settings (password change)
```

**`ProtectedRoute`** checks `isAuthenticated()` (token exists in localStorage). If not authenticated, redirects to `/login`.

**`DashboardLayout`** wraps all authenticated pages with:
- Sidebar navigation
- Top navbar
- `DashboardProvider` context for shared dashboard data

---

### State Management

TradeVault uses **React Context API** for global state and **local component state** for page-specific data.

#### AuthContext

| State | Purpose |
|---|---|
| `user` | Current authenticated user object (`{ id, fullName, email, profilePicture }`) |
| `loading` | Boolean — true while restoring session from stored token |

| Method | Behavior |
|---|---|
| `login({ user, token })` | Stores token in localStorage, sets user state |
| `logout()` | Removes token from localStorage, clears user, navigates to `/` |

**Session restoration flow:** On mount, if a token exists in localStorage, the context calls `GET /profile` to restore the user. On failure (expired/invalid token), the token is removed and user is cleared.

#### DashboardContext

| State | Purpose |
|---|---|
| `dashboard` | Full dashboard response object (summary, monthlyPnL, strategyPerformance, recentTrades) |
| `loading` | Boolean — true while fetching |

Fetches dashboard data once on mount. Provided to all pages within `DashboardLayout`.

---

### API Communication Layer

**`api/axios.js`** creates a configured Axios instance:

```
Axios Instance
├── baseURL: VITE_API_URL (environment variable)
└── Request Interceptor:
      └── Reads token from localStorage
      └── Attaches Authorization: Bearer <token> header
```

All service functions use this shared instance, ensuring consistent base URL and automatic token injection.

---

### Service Layer

Services encapsulate API calls and response extraction:

| Service | Functions | API Endpoints Used |
|---|---|---|
| `auth.service.js` | `login`, `register`, `logout` | POST `/auth/login`, POST `/auth/register` |
| `trade.service.js` | `getTrades`, `getTradeById`, `createTrade`, `updateTrade`, `deleteTrade`, `uploadTradeScreenshots` | GET/POST/PATCH/DELETE `/trades`, POST `/trades/:id/screenshots` |
| `dashboard.service.js` | `getDashboard` | GET `/dashboard` |
| `equityCurve.service.js` | `getEquityCurve` | GET `/dashboard/equity-curve` |
| `heatmap.service.js` | `getHeatmap` | GET `/dashboard/heatmap` |
| `profile.service.js` | `getProfile`, `updateProfile`, `updateProfilePicture` | GET/PATCH `/profile`, PATCH `/profile/picture` |
| `settings.service.js` | `changePassword` | PATCH `/auth/change-password` |

All services extract and return `response.data.data` (the `data` field from the ApiResponse envelope).

---

### Custom Hooks

Hooks encapsulate data fetching, loading state, and reactive refetching:

| Hook | Purpose | Data Source |
|---|---|---|
| `useDashboard` | Consumes DashboardContext | `DashboardContext` |
| `useMonthlyPnL` | Extracts `monthlyPnL` from dashboard | `useDashboard` |
| `useTrades(params)` | Fetches trade list, re-fetches on filter/sort/page changes | `trade.service.getTrades` |
| `useTrade(id)` | Fetches a single trade by ID | `trade.service.getTradeById` |
| `useProfile` | Fetches current user profile | `profile.service.getProfile` |
| `useEquityCurve` | Fetches equity curve data | `equityCurve.service.getEquityCurve` |
| `useHeatmap` | Fetches trading heatmap data | `heatmap.service.getHeatmap` |
| `useDebounce(value, delay)` | Debounces a value (default 400ms) | Local state |

Each data-fetching hook returns `{ data, loading }` and handles errors internally via `console.error`. The `useTrades` hook additionally exposes a `refetch` function and `pagination` metadata.

---

### Component Architecture

Components are organized by domain and responsibility:

```
components/
├── layout/                    # App shell
│   ├── DashboardLayout.jsx    # Main authenticated layout (Sidebar + Navbar + Provider)
│   ├── Sidebar.jsx            # Navigation sidebar
│   └── Navbar.jsx             # Top navigation bar
│
├── common/                    # Shared across domains
│   └── DeleteModal.jsx        # Confirmation dialog for destructive actions
│
├── dashboard/                 # Dashboard page components
│   ├── StatsGrid.jsx          # Grid of summary stat cards
│   ├── StatsCard.jsx          # Individual metric display card
│   ├── RecentTrades.jsx       # Latest 5 trades summary list
│   └── QuickActions.jsx       # Navigation shortcuts
│
├── trades/                    # Trade management components
│   ├── TradeForm.jsx          # Full trade create/edit form
│   ├── BasicTradeFields.jsx   # Core fields: date, symbol, segment, direction, prices, quantity
│   ├── TradePlanFields.jsx    # Stop loss, target, strategy, charges
│   ├── TradePsychologyFields.jsx  # Emotions, rules followed, mistakes
│   ├── TradeNotesFields.jsx   # Free-form notes
│   ├── TradeTable.jsx         # Trade list table container
│   ├── TradeRow.jsx           # Individual trade table row
│   ├── TradesToolbar.jsx      # Search, filter, sort controls
│   ├── TradeActions.jsx       # Edit/delete buttons
│   └── Pagination.jsx         # Page navigation controls
│
├── trade-details/             # Trade detail view components
│   ├── DetailSection.jsx      # Grouped section wrapper
│   ├── DetailItem.jsx         # Single key-value display
│   ├── PerformanceCards.jsx   # P&L and R-Multiple metric cards
│   └── ScreenshotGallery.jsx # Screenshot display + upload interface
│
├── analytics/                 # Analytics page components
│   ├── EquityCurveChart.jsx   # Recharts line chart for cumulative equity
│   ├── MonthlyPnLChart.jsx    # Recharts bar chart for monthly P&L
│   ├── TradingCalendar.jsx    # Calendar-based heatmap
│   ├── CalendarDay.jsx        # Individual day cell with P&L coloring
│   ├── StrategyPerformance.jsx        # Strategy breakdown wrapper
│   ├── StrategyPerformanceTable.jsx   # Strategy stats table
│   ├── AnalyticsCard.jsx      # Section card wrapper
│   └── EmptyAnalytics.jsx     # Empty state display
│
├── profile/
│   └── ProfileCard.jsx        # User profile display
│
└── ui/                        # Generic UI primitives (currently empty)
```

---

### Page Structure

| Page | Key Components Used | Data Source |
|---|---|---|
| `LandingPage` | Self-contained | None |
| `Login` | Form inputs | `auth.service.login` → `AuthContext.login` |
| `Register` | Form inputs | `auth.service.register` → `AuthContext.login` |
| `Dashboard` | StatsGrid, RecentTrades, QuickActions | `useDashboard` (DashboardContext) |
| `Analytics` | EquityCurveChart, MonthlyPnLChart, TradingCalendar, StrategyPerformance | `useEquityCurve`, `useMonthlyPnL`, `useHeatmap`, `useDashboard` |
| `Trades` | TradesToolbar, TradeTable, Pagination | `useTrades` with filter/sort/page state |
| `CreateTrade` | TradeForm | `trade.service.createTrade` |
| `EditTrade` | TradeForm | `useTrade` → `trade.service.updateTrade` |
| `TradeDetails` | DetailSection, PerformanceCards, ScreenshotGallery | `useTrade` |
| `Profile` | ProfileCard | `useProfile` |
| `Settings` | Form inputs | `settings.service.changePassword` |

---

## Data Flow

### Authentication Data Flow

```
┌─────────────┐     POST /auth/login      ┌──────────────┐
│  Login Page │  ──────────────────────►  │  Auth Module  │
│             │  { email, password }       │              │
│             │                            │  Validates   │
│             │                            │  Compares    │
│             │                            │  Signs JWT   │
│             │  ◄──────────────────────  │              │
│             │  { token, user }           └──────────────┘
│             │                            
│  Calls      │                            
│  AuthContext│                            
│  .login()   │                            
└──────┬──────┘                            
       │                                   
       ▼                                   
┌──────────────────┐                       
│   localStorage   │ ← token              
│   AuthContext     │ ← user state         
│   Axios headers  │ ← Bearer token       
└──────────────────┘                       
```

### Trade Creation Data Flow

```
┌────────────────┐                          ┌───────────────────┐
│  CreateTrade   │  POST /trades            │   Trades Module   │
│  Page          │  ───────────────────►    │                   │
│                │  { tradeData }            │  1. Validate      │
│  TradeForm     │                          │     (express-     │
│  ├ Basic       │                          │      validator)   │
│  ├ Plan        │                          │                   │
│  ├ Psychology  │                          │  2. Business      │
│  └ Notes       │                          │     Rules         │
│                │                          │     (exit > entry,│
│                │                          │      SL position) │
│                │                          │                   │
│                │                          │  3. Calculate     │
│                │                          │     Metrics       │
│                │                          │     (P&L, R, Win) │
│                │                          │                   │
│                │                          │  4. Trade.create  │
│                │                          │     → MongoDB     │
│                │                          │                   │
│                │  ◄───────────────────   │  5. Map response  │
│                │  { trade }               └───────────────────┘
│  Navigate to   │
│  /trades       │
└────────────────┘
```

### Dashboard Data Flow

```
┌──────────────┐  Mount        ┌──────────────────┐     GET /dashboard      ┌────────────────────┐
│ Dashboard    │ ────────►    │ DashboardContext  │  ────────────────────► │ Dashboard Module   │
│ Layout       │               │                  │                        │                    │
│              │               │ Fetches data     │                        │ 5 parallel queries:│
│              │               │ once on mount    │                        │ ├ countDocuments   │
│              │               │                  │                        │ ├ $group aggregate │
│              │               │                  │                        │ │  (summary stats)  │
│              │               │                  │  ◄──────────────────── │ ├ $group aggregate │
│              │               │  dashboard state │  { summary,            │ │  (monthly P&L)   │
│              │               │  shared via      │    monthlyPnL,         │ ├ $group aggregate │
│              │               │  context         │    strategyPerformance,│ │  (strategy perf) │
│              │               │                  │    recentTrades }      │ └ find.limit(5)    │
│              │               └──────┬───────────┘                        │   (recent trades)  │
│              │                      │                                    └────────────────────┘
│              │                      │ Consumed by:
│              │                      ├── Dashboard page (StatsGrid, RecentTrades)
│              │                      ├── Analytics page (MonthlyPnLChart, StrategyPerformance)
│              │                      └── useMonthlyPnL hook
└──────────────┘
```

### Screenshot Upload Data Flow

```
┌───────────────────┐    POST /trades/:id/screenshots     ┌──────────────────┐
│ ScreenshotGallery │  ──────────────────────────────►   │  Trades Module   │
│                   │  FormData { screenshots: File[] }   │                  │
│ User selects      │                                     │  1. Multer       │
│ files             │                                     │     (memory buf) │
│                   │                                     │                  │
│                   │                                     │  2. Ownership    │
│                   │                                     │     check        │
│                   │                                     │                  │
│                   │                                     │  3. Count check  │
│                   │                                     │     (≤3 total)   │
│                   │                                     │                  │
│                   │                                     │  4. Promise.all  │
│                   │                                     │     upload →     │
│                   │                                     │     Cloudinary   │
│                   │                                     │                  │
│                   │                                     │  5. Push to      │
│                   │                                     │     screenshots[]│
│                   │                                     │                  │
│                   │  ◄──────────────────────────────   │  6. trade.save() │
│ Displays updated  │  { trade with screenshots }         └──────────────────┘
│ gallery           │
└───────────────────┘
```

---

## Business Logic

### Trade Metric Calculations

All calculations are performed **server-side** in `trade-calculator.js` during trade creation and update. Values are rounded to 2 decimal places.

#### Gross P&L
```
LONG:   grossPnL = (exitPrice - entryPrice) × quantity
SHORT:  grossPnL = (entryPrice - exitPrice) × quantity
```

#### Net P&L
```
netPnL = grossPnL - charges
```

#### Trade Status
```
if grossPnL > 0 → WIN
if grossPnL < 0 → LOSS
if grossPnL = 0 → BREAKEVEN
```

Note: Status is determined by `grossPnL`, not `netPnL`. A trade with positive gross P&L but negative net P&L (due to charges) is still classified as WIN.

#### R-Multiple
```
LONG:   risk = entryPrice - plannedStopLoss
        reward = exitPrice - entryPrice
SHORT:  risk = plannedStopLoss - entryPrice
        reward = entryPrice - exitPrice

rMultiple = reward / risk
```

---

### Trade Business Rules

Validated in `trade-business-rules.js` before metric calculation:

| Rule | Condition | Error |
|---|---|---|
| Exit time must be after entry time | `exitTime <= entryTime` | 400: "Exit time must be after entry time" |
| LONG stop loss below entry | `direction === LONG && plannedStopLoss >= entryPrice` | 400: "For a LONG trade, planned stop loss must be below the entry price" |
| SHORT stop loss above entry | `direction === SHORT && plannedStopLoss <= entryPrice` | 400: "For a SHORT trade, planned stop loss must be above the entry price" |

---

### Dashboard Aggregations

All aggregations run in `dashboard.service.js` using MongoDB's aggregation framework. Five queries execute in parallel via `Promise.all`:

**1. Total trade count** — `Trade.countDocuments({ user })`

**2. Summary aggregation** — Single `$group` producing:
- `netPnL`, `totalR` (sums)
- `wins`, `losses`, `breakevens` (conditional counts)
- `grossProfit`, `grossLoss` (conditional sums of netPnL)
- `totalWinningPnL`, `totalLosingPnL` (for average calculations)
- `largestWin` ($max), `largestLoss` ($min)

**3. Monthly P&L** — Groups by `{ $year, $month }` of `tradeDate`, sums `netPnL`, counts trades

**4. Strategy performance** — Groups by `strategy` (non-empty only), calculates per-strategy wins, losses, netPnL, totalR

**5. Recent trades** — `find().sort({ tradeDate: -1, createdAt: -1 }).limit(5)`

**Derived metrics** (calculated in JavaScript from aggregation results):
- `winRate = (wins / totalTrades) × 100`
- `averageR = totalR / totalTrades`
- `profitFactor = grossProfit / grossLoss` (or grossProfit if no losses)
- `averageWinningTrade = totalWinningPnL / wins`
- `averageLosingTrade = totalLosingPnL / losses`
- `expectancy = netPnL / totalTrades`
- Per-strategy `winRate` and `averageR`

---

## Database Design

### User Schema

```
User {
  fullName:         String, required, trimmed
  email:            String, required, unique, lowercase, trimmed
  password:         String, required, minlength: 8, select: false
  profilePicture: {
    url:            String, default: ""
    publicId:       String, default: ""
  }
  createdAt:        Date (auto)
  updatedAt:        Date (auto)
}
```

The `password` field uses `select: false`, requiring explicit `.select("+password")` when password comparison is needed.

### Trade Schema

```
Trade {
  user:             ObjectId → User, required, indexed
  tradeDate:        Date, required
  symbol:           String, required, trimmed, uppercase
  segment:          String, enum [FUTURES, OPTIONS, EQUITIES, CURRENCY, COMMODITY], required
  direction:        String, enum [LONG, SHORT], required
  entryTime:        Date, required
  exitTime:         Date, required
  entryPrice:       Number, required, min: 0
  exitPrice:        Number, required, min: 0
  quantity:         Number, required, min: 1
  plannedStopLoss:  Number, required, min: 0
  plannedTarget:    Number, required, min: 0
  strategy:         String, trimmed, maxlength: 100
  marketCondition:  String, trimmed
  emotionEntry:     String, trimmed
  emotionDuring:    String, trimmed
  emotionExit:      String, trimmed
  rulesFollowed:    Boolean, default: true
  mistakes:         String, trimmed
  notes:            String, trimmed, maxlength: 1000
  screenshots:      [{ url: String, publicId: String }]  (max 3, no _id)
  grossPnL:         Number, required (calculated)
  charges:          Number, required, default: 0
  netPnL:           Number, required (calculated)
  rMultiple:        Number, required (calculated)
  status:           String, enum [WIN, LOSS, BREAKEVEN], required (calculated)
  createdAt:        Date (auto)
  updatedAt:        Date (auto)
}
```

### Indexes

| Index | Fields | Purpose |
|---|---|---|
| Schema-level | `user` (single field) | User field declaration with `index: true` |
| Compound | `{ user: 1, tradeDate: -1 }` | Optimize user trade listing sorted by date |
| Compound | `{ user: 1, symbol: 1 }` | Optimize user trade lookups by symbol |

---

## Security Architecture

| Concern | Implementation |
|---|---|
| **Authentication** | JWT Bearer tokens — signed with `JWT_SECRET`, expiry set by `JWT_EXPIRES_IN` |
| **Password Storage** | bcrypt hashing with configurable salt rounds (`BCRYPT_SALT_ROUNDS`) |
| **Password Security** | Minimum 8 characters; change-password prevents reuse of current password |
| **Token Storage** | localStorage on the frontend (managed via `utils/token.js`) |
| **Authorization** | All trade/dashboard/profile endpoints require valid JWT; trade operations enforce `user` ownership at the query level |
| **CORS** | Restricted to `CLIENT_URL` origin with credentials support |
| **Input Validation** | Server-side validation via express-validator on all mutation endpoints |
| **ObjectId Validation** | Dedicated middleware prevents invalid MongoDB ObjectId format in URL params |
| **File Upload Restrictions** | Multer enforces file type (JPEG, PNG, WebP), file size (5 MB), and file count limits |
| **Password Field Protection** | User model uses `select: false` on the password field — never returned in normal queries |
| **Data Isolation** | All data queries include `user` filter, preventing cross-user access |

---

## Deployment Architecture

```
┌──────────────────────────────────┐
│           Vercel                 │
│                                  │
│  Frontend (Static SPA)           │
│  React + Vite Build              │
│  URL: trade-vault-orcin.vercel   │
│         .app                     │
└────────────┬─────────────────────┘
             │ HTTPS API calls
             │ /api/v1/*
             ▼
┌──────────────────────────────────┐
│           Render                 │
│                                  │
│  Backend (Node.js)               │
│  Express Server                  │
│  URL: tradevault-backend-qlgk    │
│       .onrender.com              │
│                                  │
│  CORS: CLIENT_URL →             │
│  trade-vault-orcin.vercel.app    │
└────────────┬─────────────────────┘
             │
     ┌───────┴───────┐
     │               │
     ▼               ▼
┌──────────┐   ┌───────────┐
│ MongoDB  │   │Cloudinary │
│ Atlas    │   │           │
│          │   │ Images    │
│ Database │   │ Storage   │
└──────────┘   └───────────┘
```

The frontend is deployed as a static single-page application on Vercel. The backend runs as a Node.js service on Render, connecting to MongoDB Atlas for data persistence and Cloudinary for image storage. The `CLIENT_URL` environment variable on the backend must match the Vercel deployment URL for CORS to function correctly.