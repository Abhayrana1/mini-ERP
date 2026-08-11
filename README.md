# Mini ERP + CRM Operations Portal

A full-stack assignment project inspired by the supplied UI reference.

## Stack
- Frontend: React + TypeScript + Vite + CSS
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL
- Auth: JWT + bcrypt
- API: REST

## Features
- JWT login and role-based access
- Dashboard
- Customer CRM: CRUD, search, detail, follow-ups
- Products and inventory
- Stock movement log
- Sales challans: Draft / Confirmed / Cancelled
- Automatic challan number
- Transactional stock deduction on confirmation
- Negative-stock prevention
- Product snapshot in challan items
- Responsive admin UI
- Postman collection
- PostgreSQL schema + seed data

## Demo accounts
- admin@test.com / Admin@123
- sales@test.com / Sales@123
- warehouse@test.com / Warehouse@123
- accounts@test.com / Accounts@123

## Local setup

### 1. Database
Install PostgreSQL and create a database named `mini_erp`.

Run:
```bash
psql -U postgres -d mini_erp -f database/schema.sql
psql -U postgres -d mini_erp -f database/seed.sql
```

### 2. Backend
```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

Edit `.env`:
```env
PORT=5000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/mini_erp
JWT_SECRET=change-this-secret
CORS_ORIGIN=http://localhost:5173
```

### 3. Frontend
Open a second terminal:
```bash
cd frontend
copy .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173`.

## API
- POST `/api/auth/login`
- GET `/api/auth/me`
- GET/POST `/api/customers`
- GET/PATCH/DELETE `/api/customers/:id`
- POST `/api/customers/:id/followups`
- GET/POST `/api/products`
- PATCH/DELETE `/api/products/:id`
- GET `/api/products/:id/movements`
- GET/POST `/api/challans`
- GET `/api/challans/:id`
- POST `/api/challans/:id/confirm`
- POST `/api/challans/:id/cancel`
- GET `/api/dashboard/summary`

## Architecture
React SPA -> Express REST API -> PostgreSQL.

Business-critical challan confirmation runs inside a PostgreSQL transaction:
1. Lock stock rows.
2. Check available quantity.
3. Insert product snapshots.
4. Reduce stock.
5. Insert OUT movements.
6. Mark challan confirmed.

## Deployment
Frontend can be deployed to Vercel/Netlify. Backend can be deployed to Render/Railway. PostgreSQL can be hosted on Neon/Supabase/Render. Set environment variables in the hosting dashboard.

## Known limitations
- Purchases, invoices, reports and settings are UI placeholders because the assignment's mandatory backend scope focuses on CRM, inventory and sales challans.
- PDF export is not implemented in this starter.
