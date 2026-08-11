DROP TABLE IF EXISTS stock_movements CASCADE;
DROP TABLE IF EXISTS challan_items CASCADE;
DROP TABLE IF EXISTS challans CASCADE;
DROP TABLE IF EXISTS followups CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(180) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(30) NOT NULL CHECK (role IN ('ADMIN','SALES','WAREHOUSE','ACCOUNTS')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  mobile VARCHAR(30) NOT NULL,
  email VARCHAR(180),
  business_name VARCHAR(180),
  gst_number VARCHAR(40),
  customer_type VARCHAR(30) NOT NULL CHECK (customer_type IN ('RETAIL','WHOLESALE','DISTRIBUTOR')),
  address TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'LEAD' CHECK (status IN ('LEAD','ACTIVE','INACTIVE')),
  follow_up_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE followups (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  follow_up_date DATE NOT NULL,
  type VARCHAR(30) NOT NULL DEFAULT 'CALL',
  note TEXT NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(180) NOT NULL,
  sku VARCHAR(80) UNIQUE NOT NULL,
  category VARCHAR(100),
  unit_price NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (unit_price >= 0),
  current_stock INTEGER NOT NULL DEFAULT 0 CHECK (current_stock >= 0),
  min_stock INTEGER NOT NULL DEFAULT 0 CHECK (min_stock >= 0),
  location VARCHAR(150),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE stock_movements (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  movement_type VARCHAR(5) NOT NULL CHECK (movement_type IN ('IN','OUT')),
  reason VARCHAR(255),
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE challans (
  id SERIAL PRIMARY KEY,
  challan_number VARCHAR(50) UNIQUE NOT NULL,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  status VARCHAR(20) NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT','CONFIRMED','CANCELLED')),
  total_quantity INTEGER NOT NULL DEFAULT 0,
  created_by INTEGER NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ
);

CREATE TABLE challan_items (
  id SERIAL PRIMARY KEY,
  challan_id INTEGER NOT NULL REFERENCES challans(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id),
  product_name VARCHAR(180) NOT NULL,
  sku VARCHAR(80) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0),
  line_total NUMERIC(14,2) NOT NULL
);

CREATE INDEX idx_customers_name ON customers(name);
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_challans_created_at ON challans(created_at);
CREATE INDEX idx_movements_product ON stock_movements(product_id);
