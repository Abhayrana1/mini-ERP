import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  LayoutDashboard,
  Users,
  Package,
  Warehouse,
  ShoppingCart,
  FileText,
  BarChart3,
  Shield,
  Settings,
  Search,
  Bell,
  HelpCircle,
  Menu,
  Plus,
  RefreshCw,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  LogOut,
  ChevronDown,
  Sparkles,
  Lock,
  Mail,
  Zap,
  DollarSign,
  TrendingUp,
  Box,
  Truck,
  FileCheck,
  CreditCard
} from 'lucide-react';
import './styles.css';

const API = import.meta.env.VITE_API_URL || '/api';

export type Role = 'ADMIN' | 'SALES' | 'WAREHOUSE' | 'ACCOUNTS';

type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
};

async function api(path: string, opts: RequestInit = {}) {
  const token = localStorage.getItem('erp_token');
  const r = await fetch(API + path, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.message || 'Request failed');
  return data;
}

const money = (n: number) => '₹' + Number(n || 0).toLocaleString('en-IN');
const date = (s: string) => s ? new Date(s).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-';

// Predefined Demo Role Credentials
const DEMO_ACCOUNTS: { role: Role; title: string; email: string; pass: string; desc: string }[] = [
  { role: 'ADMIN', title: 'Admin Portal', email: 'admin@gmail.com', pass: '1234', desc: 'Full System & Operations Access' },
  { role: 'SALES', title: 'Sales & CRM', email: 'sales@gmail.com', pass: '1234', desc: 'Leads, CRM & Challan Dispatch' },
  { role: 'WAREHOUSE', title: 'Warehouse', email: 'warehouse@gmail.com', pass: '1234', desc: 'Stock Control & Logistics' },
  { role: 'ACCOUNTS', title: 'Accounts', email: 'accounts@gmail.com', pass: '1234', desc: 'Billing, Invoices & Finance' }
];

/* ==========================================================================
   PROFESSIONAL SPLIT-HERO LOGIN
   ========================================================================== */
function Login({ onLogin }: { onLogin: (u: User) => void }) {
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('1234');
  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>('ADMIN');

  const selectRoleChip = (demo: typeof DEMO_ACCOUNTS[0]) => {
    setSelectedRole(demo.role);
    setEmail(demo.email);
    setPassword(demo.pass);
    setErr('');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr('');

    try {
      const d = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      localStorage.setItem('erp_token', d.token);
      localStorage.setItem('erp_user', JSON.stringify(d.user));
      onLogin(d.user);
    } catch (e: any) {
      // Fallback demo login if DB or API network is offline
      const matched = DEMO_ACCOUNTS.find(x => x.email.toLowerCase() === email.toLowerCase());
      if (matched && password === '1234') {
        const fallbackUser: User = {
          id: matched.role === 'ADMIN' ? 1 : matched.role === 'SALES' ? 2 : matched.role === 'WAREHOUSE' ? 3 : 4,
          name: matched.role === 'ADMIN' ? 'Abhay Rana (Admin)' : matched.title + ' User',
          email: matched.email,
          role: matched.role
        };
        localStorage.setItem('erp_token', 'demo_fallback_token');
        localStorage.setItem('erp_user', JSON.stringify(fallbackUser));
        onLogin(fallbackUser);
      } else {
        setErr(e.message || 'Invalid login credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* Left Visual Hero Showcase */}
      <div className="login-hero">
        <div className="hero-brand">
          <div className="hero-brand-icon">
            <Sparkles size={24} />
          </div>
          <div className="hero-brand-text">Mini ERP + CRM</div>
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={14} /> Enterprise Operations Suite v2.4
          </div>
          <h1 className="hero-title">Streamline Your Business Operations in One Unified Portal</h1>
          <p className="hero-subtitle">
            Empower your team with real-time inventory tracking, customer relationship management, sales challan workflows, and financial oversight.
          </p>

          <div className="hero-features">
            <div className="feature-pill">
              <div className="feature-pill-icon"><Users size={16} /></div>
              <div>
                <h4>Customer CRM</h4>
                <p>Lead tracking & follow-ups</p>
              </div>
            </div>

            <div className="feature-pill">
              <div className="feature-pill-icon"><Box size={16} /></div>
              <div>
                <h4>Live Inventory</h4>
                <p>Real-time stock movement</p>
              </div>
            </div>

            <div className="feature-pill">
              <div className="feature-pill-icon"><FileCheck size={16} /></div>
              <div>
                <h4>Sales Challans</h4>
                <p>Stock deduction pipeline</p>
              </div>
            </div>

            <div className="feature-pill">
              <div className="feature-pill-icon"><TrendingUp size={16} /></div>
              <div>
                <h4>Financial Hub</h4>
                <p>Receivables & billing audit</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-footer">
          © 2026 Mini ERP + CRM Operations Portal. All rights reserved.
        </div>
      </div>

      {/* Right Login Form Panel */}
      <div className="login-panel">
        <div className="login-card-container">
          <div className="login-header">
            <h2>Welcome back 👋</h2>
            <p>Select your role or enter credentials to access your portal</p>
          </div>

          {/* Quick Role Selector Chips */}
          <div className="role-quick-selector">
            <div className="role-selector-title">
              <span>Quick 1-Click Role Login</span>
              <span>Pass: <b>1234</b></span>
            </div>
            <div className="role-chips-grid">
              {DEMO_ACCOUNTS.map(demo => (
                <button
                  type="button"
                  key={demo.role}
                  className={`role-chip ${selectedRole === demo.role ? 'selected' : ''}`}
                  onClick={() => selectRoleChip(demo)}
                >
                  <div className={`role-chip-dot ${demo.role}`} />
                  <div className="role-chip-info">
                    <strong>{demo.title}</strong>
                    <small>{demo.email}</small>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form className="login-form" onSubmit={submit}>
            {err && <div className="error-badge">{err}</div>}

            <div className="input-group">
              <label>Email Address</label>
              <div className="input-field-wrapper">
                <Mail className="input-field-icon" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-field-wrapper">
                <Lock className="input-field-icon" size={16} />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Authenticating...' : `Sign In to ${selectedRole} Portal`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* Navigation items master list */
const ALL_NAV = [
  { id: 'admin_portal', label: 'Admin Command', icon: LayoutDashboard, roles: ['ADMIN'] },
  { id: 'sales_portal', label: 'Sales & CRM Portal', icon: Users, roles: ['ADMIN', 'SALES'] },
  { id: 'warehouse_portal', label: 'Warehouse Portal', icon: Warehouse, roles: ['ADMIN', 'WAREHOUSE'] },
  { id: 'accounts_portal', label: 'Accounts Portal', icon: CreditCard, roles: ['ADMIN', 'ACCOUNTS'] },
  { id: 'customers', label: 'Customers (CRM)', icon: Users, roles: ['ADMIN', 'SALES'] },
  { id: 'products', label: 'Products Catalogue', icon: Package, roles: ['ADMIN', 'SALES', 'WAREHOUSE'] },
  { id: 'inventory', label: 'Inventory / Stock', icon: Warehouse, roles: ['ADMIN', 'WAREHOUSE'] },
  { id: 'challans', label: 'Sales Challans', icon: FileText, roles: ['ADMIN', 'SALES', 'WAREHOUSE', 'ACCOUNTS'] },
  { id: 'reports', label: 'Reports & Analytics', icon: BarChart3, roles: ['ADMIN', 'ACCOUNTS'] },
  { id: 'users', label: 'Users & Security', icon: Shield, roles: ['ADMIN'] }
];

/* Default starting page per role */
const ROLE_DEFAULT_PAGES: Record<Role, string> = {
  ADMIN: 'admin_portal',
  SALES: 'sales_portal',
  WAREHOUSE: 'warehouse_portal',
  ACCOUNTS: 'accounts_portal'
};

/* ==========================================================================
   MAIN APP CONTAINER
   ========================================================================== */
function App() {
  const [user, setUser] = useState<User | null>(() => {
    try { return JSON.parse(localStorage.getItem('erp_user') || 'null'); } catch { return null; }
  });

  const [page, setPage] = useState<string>(() => {
    const u = JSON.parse(localStorage.getItem('erp_user') || 'null');
    return u?.role ? ROLE_DEFAULT_PAGES[u.role as Role] || 'admin_portal' : 'admin_portal';
  });

  const [collapsed, setCollapsed] = useState(false);

  // Sync default page when user changes
  useEffect(() => {
    if (user?.role) {
      setPage(ROLE_DEFAULT_PAGES[user.role]);
    }
  }, [user]);

  if (!user) return <Login onLogin={setUser} />;

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const navItems = ALL_NAV.filter(item => item.roles.includes(user.role));

  // Quick switch role function to test different portals
  const switchRole = (newRole: Role) => {
    const updatedUser: User = {
      ...user,
      role: newRole,
      name: newRole === 'ADMIN' ? 'Abhay Rana (Admin)' : newRole === 'SALES' ? 'Sales Manager' : newRole === 'WAREHOUSE' ? 'Warehouse Lead' : 'Accounts Head',
      email: `${newRole.toLowerCase()}@gmail.com`
    };
    localStorage.setItem('erp_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setPage(ROLE_DEFAULT_PAGES[newRole]);
  };

  return (
    <div className="app">
      {/* Sidebar Navigation */}
      <aside className={collapsed ? 'sidebar collapsed' : 'sidebar'}>
        <div className="logo">
          <div className="logo-icon">▦</div>
          <div className="logo-text">
            <b>Mini ERP + CRM</b>
            <small>Operations Portal</small>
          </div>
        </div>

        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          <Menu size={14} />
        </button>

        {/* Role Badge in Sidebar */}
        <div className="role-banner-sidebar">
          <div>
            <small>Active Portal</small>
            <b>{user.role} WORKSPACE</b>
          </div>
        </div>

        <nav>
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={page === item.id ? 'active' : ''}
                onClick={() => setPage(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="side-bottom">
          <button onClick={logout}>
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="main">
        <header>
          <button className="mobile-menu" onClick={() => setCollapsed(!collapsed)}>
            <Menu size={20} />
          </button>

          <div className="global-search">
            <Search size={16} />
            <input placeholder="Search customers, stock, challans..." />
          </div>

          <div className="header-right">
            {/* Quick Role Switcher */}
            <select
              className="role-switcher-select"
              value={user.role}
              onChange={e => switchRole(e.target.value as Role)}
              title="Switch Active Portal View"
            >
              <option value="ADMIN">👑 Switch: Admin Portal</option>
              <option value="SALES">💼 Switch: Sales & CRM</option>
              <option value="WAREHOUSE">📦 Switch: Warehouse</option>
              <option value="ACCOUNTS">💳 Switch: Accounts</option>
            </select>

            <span className={`header-role-badge ${user.role}`}>{user.role}</span>

            <Bell size={18} style={{ color: '#64748b', cursor: 'pointer' }} />
            <HelpCircle size={18} style={{ color: '#64748b', cursor: 'pointer' }} />

            <div className="avatar">{user.name.charAt(0)}</div>
            <div className="user-info">
              <b>{user.name}</b>
              <small>{user.email}</small>
            </div>
          </div>
        </header>

        <section className="content">
          {page === 'admin_portal' ? <AdminPortal user={user} setPage={setPage} /> :
           page === 'sales_portal' ? <SalesPortal user={user} setPage={setPage} /> :
           page === 'warehouse_portal' ? <WarehousePortal user={user} setPage={setPage} /> :
           page === 'accounts_portal' ? <AccountsPortal user={user} setPage={setPage} /> :
           page === 'customers' ? <Customers /> :
           page === 'products' ? <Products /> :
           page === 'inventory' ? <Inventory /> :
           page === 'challans' ? <Challans /> :
           <Placeholder title={ALL_NAV.find(x => x.id === page)?.label || 'Module'} />}
        </section>
      </main>
    </div>
  );
}

/* ==========================================================================
   ROLE DEDICATED PORTAL PAGES
   ========================================================================== */

/* 1. ADMIN EXECUTIVE PORTAL */
function AdminPortal({ user, setPage }: { user: User; setPage: (p: string) => void }) {
  const [s, setS] = useState<any>({ customers: 6, products: 7, lowStock: 1, challans: 5, sales: 577000 });

  useEffect(() => {
    api('/dashboard/summary').then(setS).catch(console.error);
  }, []);

  return (
    <>
      <div className="role-header-banner ADMIN">
        <div>
          <h1>👑 Admin Executive Command Center</h1>
          <p>Welcome back, {user.name}. Overview of organization-wide operations and metrics.</p>
        </div>
        <div className="banner-stats-pill">
          <div className="stat-item">
            <span>System Status</span>
            <strong>100% Operational</strong>
          </div>
          <div className="stat-item">
            <span>Active Modules</span>
            <strong>4 Portals</strong>
          </div>
        </div>
      </div>

      <div className="cards">
        <Metric title="Total Customers" value={s.customers} icon="👥" cls="blue" trend="+14% this month" />
        <Metric title="Product Catalogue" value={s.products} icon="📦" cls="green" trend="7 active categories" />
        <Metric title="Monthly Revenue" value={money(s.sales)} icon="💰" cls="purple" trend="Confirmed Sales" />
        <Metric title="Sales Challans" value={s.challans} icon="📋" cls="orange" trend="Active Orders" />
      </div>

      <div className="grid2">
        <div className="panel">
          <div className="panel-head">
            <h3>Executive Revenue & Sales Performance</h3>
            <select><option>Current Month</option></select>
          </div>
          <div className="chart">
            <div className="line"></div>
            <div className="chart-labels">
              <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h3>Quick Departmental Portal Access</h3>
          </div>
          <div className="role-quick-actions">
            <button className="quick-action-btn" onClick={() => setPage('sales_portal')}>
              <Users size={20} color="#059669" />
              <span>Sales & CRM Hub</span>
            </button>
            <button className="quick-action-btn" onClick={() => setPage('warehouse_portal')}>
              <Warehouse size={20} color="#d97706" />
              <span>Warehouse Hub</span>
            </button>
            <button className="quick-action-btn" onClick={() => setPage('accounts_portal')}>
              <CreditCard size={20} color="#0891b2" />
              <span>Accounts Hub</span>
            </button>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h3>Top Key Accounts</h3>
          <button className="primary-btn" onClick={() => setPage('customers')}>Manage Customers</button>
        </div>
        <table>
          <thead>
            <tr><th>Customer Business</th><th>Account Type</th><th>Monthly Billing</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr><td><b>ABC Enterprises</b></td><td>Retail</td><td>{money(249000)}</td><td><Status status="ACTIVE" /></td></tr>
            <tr><td><b>Sharma Traders</b></td><td>Wholesale</td><td>{money(185000)}</td><td><Status status="ACTIVE" /></td></tr>
            <tr><td><b>Global Supplies</b></td><td>Distributor</td><td>{money(125000)}</td><td><Status status="ACTIVE" /></td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

/* 2. SALES & CRM DEDICATED PORTAL */
function SalesPortal({ user, setPage }: { user: User; setPage: (p: string) => void }) {
  return (
    <>
      <div className="role-header-banner SALES">
        <div>
          <h1>💼 Dedicated Sales & CRM Workspace</h1>
          <p>Logged in as {user.name} ({user.email}). Track your customer pipeline, follow-ups, and sales challans.</p>
        </div>
        <div className="banner-stats-pill">
          <div className="stat-item">
            <span>Target Achieved</span>
            <strong>82% (₹8,20,000)</strong>
          </div>
        </div>
      </div>

      <div className="cards">
        <Metric title="Active Customers" value="6" icon="🤝" cls="green" trend="2 new leads" />
        <Metric title="Pending Follow-ups" value="3" icon="📞" cls="orange" trend="Requires attention" />
        <Metric title="Draft Sales Challans" value="4" icon="📝" cls="blue" trend="Ready for dispatch" />
        <Metric title="Total Sales Volume" value={money(434000)} icon="📈" cls="purple" trend="Confirmed Orders" />
      </div>

      <div className="grid2">
        <div className="panel">
          <div className="panel-head">
            <h3>Sales Pipeline & Quick Actions</h3>
            <button className="primary-btn" onClick={() => setPage('challans')}><Plus size={14} /> New Sales Challan</button>
          </div>
          <div style={{ padding: '10px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 11, fontWeight: 600 }}>
              <span>Monthly Sales Target Progress</span>
              <span>₹8,20,000 / ₹10,00,000</span>
            </div>
            <div className="portal-target-bar">
              <div className="portal-target-fill" style={{ width: '82%' }}></div>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h3>Scheduled Follow-ups</h3>
            <button className="primary-btn" onClick={() => setPage('customers')}>View CRM</button>
          </div>
          <table>
            <thead><tr><th>Customer</th><th>Action</th><th>Date</th></tr></thead>
            <tbody>
              <tr><td>ABC Enterprises</td><td>Call - New Range</td><td>15 Aug 2026</td></tr>
              <tr><td>Sharma Traders</td><td>Meeting - Reorder</td><td>12 Aug 2026</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* 3. WAREHOUSE & LOGISTICS DEDICATED PORTAL */
function WarehousePortal({ user, setPage }: { user: User; setPage: (p: string) => void }) {
  return (
    <>
      <div className="role-header-banner WAREHOUSE">
        <div>
          <h1>📦 Dedicated Warehouse Operations Portal</h1>
          <p>Logged in as {user.name} ({user.email}). Inventory management, stock movement & dispatch verification.</p>
        </div>
        <div className="banner-stats-pill">
          <div className="stat-item">
            <span>Warehouse Zone</span>
            <strong>Main Depot A1</strong>
          </div>
        </div>
      </div>

      <div className="cards">
        <Metric title="Total Products" value="7" icon="📦" cls="blue" trend="Main Warehouse" />
        <Metric title="Low Stock Warning" value="1" icon="⚠️" cls="red" trend="Reorder required" />
        <Metric title="Pending Dispatches" value="2" icon="🚚" cls="orange" trend="Challans to process" />
        <Metric title="Stock Movement Logs" value="7 IN" icon="🔄" cls="green" trend="Opening stock verified" />
      </div>

      <div className="panel">
        <div className="panel-head">
          <h3>Stock Alerts & Emergency Reorders</h3>
          <button className="primary-btn" onClick={() => setPage('inventory')}>Stock Management</button>
        </div>
        <table>
          <thead>
            <tr><th>Item Name</th><th>Category</th><th>Current Stock</th><th>Min Required</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr><td><b>Refrigerator 256L</b></td><td>Home Appliances</td><td>8 units</td><td>3 units</td><td><Status status="IN-STOCK" /></td></tr>
            <tr><td><b>USB Keyboard</b></td><td>Computer Accessories</td><td>10 units</td><td>3 units</td><td><Status status="IN-STOCK" /></td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

/* 4. ACCOUNTS & FINANCIAL DEDICATED PORTAL */
function AccountsPortal({ user, setPage }: { user: User; setPage: (p: string) => void }) {
  return (
    <>
      <div className="role-header-banner ACCOUNTS">
        <div>
          <h1>💳 Dedicated Accounts & Financial Operations Portal</h1>
          <p>Logged in as {user.name} ({user.email}). Manage invoice audits, payment receivables & financial compliance.</p>
        </div>
        <div className="banner-stats-pill">
          <div className="stat-item">
            <span>Receivables Ledger</span>
            <strong>₹1,05,000 Overdue</strong>
          </div>
        </div>
      </div>

      <div className="cards">
        <Metric title="Confirmed Revenue" value={money(577000)} icon="💵" cls="green" trend="Total Collections" />
        <Metric title="Outstanding Invoices" value={money(105000)} icon="⏳" cls="orange" trend="Pending collection" />
        <Metric title="Billed Sales Challans" value="5" icon="📑" cls="purple" trend="Audit completed" />
        <Metric title="Tax Compliance" value="GST Clean" icon="🛡️" cls="blue" trend="24ABCDE1234F1Z5" />
      </div>

      <div className="panel">
        <div className="panel-head">
          <h3>Pending Receivables & Billing Summary</h3>
          <button className="primary-btn" onClick={() => setPage('challans')}>Review Challans</button>
        </div>
        <table>
          <thead>
            <tr><th>Customer Name</th><th>Challan No</th><th>Amount</th><th>Payment Status</th></tr>
          </thead>
          <tbody>
            <tr><td><b>ABC Enterprises</b></td><td>CH-2026-001</td><td>{money(249000)}</td><td><Status status="COMPLETED" /></td></tr>
            <tr><td><b>Sharma Traders</b></td><td>CH-2026-002</td><td>{money(185000)}</td><td><Status status="PENDING" /></td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

/* Shared UI Components */
function Metric({ title, value, icon, cls, trend }: { title: string; value: any; icon: string; cls: string; trend?: string }) {
  return (
    <div className={`metric ${cls}`}>
      <div className="metric-icon">{icon}</div>
      <div>
        <span>{title}</span>
        <strong>{value}</strong>
        {trend && <small>{trend}</small>}
      </div>
    </div>
  );
}

function Status({ status }: { status: string }) {
  const s = status.toUpperCase().replace(/ /g, '-');
  return (
    <span className={`status ${s}`}>
      <i />
      {status.replace(/_/g, ' ')}
    </span>
  );
}

function Toolbar({ search, setSearch, onAdd, addLabel = 'Add' }: { search: string; setSearch: (v: string) => void; onAdd?: () => void; addLabel?: string }) {
  return (
    <div className="toolbar">
      <div className="input-search">
        <Search size={16} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search records..." />
      </div>
      <select><option>All Statuses</option><option>Active</option><option>Lead</option></select>
      {onAdd && (
        <button className="primary" onClick={onAdd}>
          <Plus size={16} />{addLabel}
        </button>
      )}
    </div>
  );
}

/* CRUD MODULES */
function Customers() {
  const [rows, setRows] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [form, setForm] = useState<any>({ name: '', mobile: '', email: '', business_name: '', customer_type: 'RETAIL', status: 'ACTIVE', address: '', gst_number: '', follow_up_date: '', notes: '' });

  const load = () => api('/customers?search=' + encodeURIComponent(search)).then(setRows).catch(console.error);
  useEffect(() => { load(); }, [search]);

  const save = async () => {
    await api('/customers', { method: 'POST', body: JSON.stringify(form) });
    setOpen(false);
    setForm({ name: '', mobile: '', email: '', business_name: '', customer_type: 'RETAIL', status: 'ACTIVE', address: '', gst_number: '', follow_up_date: '', notes: '' });
    load();
  };

  return (
    <>
      <div className="panel">
        <div className="panel-head">
          <h3>Customers (CRM)</h3>
          <button className="primary" onClick={() => setOpen(true)}><Plus size={16} /> Add Customer</button>
        </div>
        <Toolbar search={search} setSearch={setSearch} />
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Customer Name</th><th>Group</th><th>Phone</th><th>Email</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id}>
                  <td><b>{r.name}</b><small>{r.business_name}</small></td>
                  <td>{r.customer_type}</td>
                  <td>{r.mobile}</td>
                  <td>{r.email || '-'}</td>
                  <td><Status status={r.status} /></td>
                  <td className="row-actions">
                    <button onClick={() => api('/customers/' + r.id).then(setSelected)}><Eye size={15} /></button>
                    <button><Pencil size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selected && <CustomerModal customer={selected} onClose={() => setSelected(null)} />}
      {open && <Modal title="Add Customer" onClose={() => setOpen(false)}><CustomerForm form={form} setForm={setForm} onSave={save} /></Modal>}
    </>
  );
}

function CustomerForm({ form, setForm, onSave }: { form: any; setForm: (f: any) => void; onSave: () => void }) {
  const upd = (k: string, v: any) => setForm({ ...form, [k]: v });
  return (
    <div className="form-grid">
      {[
        ['name', 'Customer Name'],
        ['mobile', 'Mobile'],
        ['email', 'Email'],
        ['business_name', 'Business Name'],
        ['gst_number', 'GST Number'],
        ['address', 'Address'],
        ['follow_up_date', 'Follow-up Date']
      ].map(([k, l]) => (
        <label key={k}>{l}<input type={k === 'follow_up_date' ? 'date' : 'text'} value={form[k]} onChange={e => upd(k, e.target.value)} /></label>
      ))}
      <label>Customer Type
        <select value={form.customer_type} onChange={e => upd('customer_type', e.target.value)}>
          <option>RETAIL</option><option>WHOLESALE</option><option>DISTRIBUTOR</option>
        </select>
      </label>
      <label>Status
        <select value={form.status} onChange={e => upd('status', e.target.value)}>
          <option>LEAD</option><option>ACTIVE</option><option>INACTIVE</option>
        </select>
      </label>
      <label className="full-field">Notes<textarea value={form.notes} onChange={e => upd('notes', e.target.value)} /></label>
      <button className="primary full-field" onClick={onSave}>Save Customer</button>
    </div>
  );
}

function CustomerModal({ customer, onClose }: { customer: any; onClose: () => void }) {
  const [note, setNote] = useState('');
  const add = async () => {
    await api(`/customers/${customer.id}/followups`, { method: 'POST', body: JSON.stringify({ follow_up_date: new Date().toISOString().slice(0, 10), type: 'CALL', note, status: 'PENDING' }) });
    setNote('');
  };
  return (
    <Modal title="Customer Details" onClose={onClose}>
      <div className="detail-card">
        <h2>{customer.name}</h2>
        <p>{customer.business_name}</p>
        <div className="detail-grid">
          <span>Phone<b>{customer.mobile}</b></span>
          <span>Email<b>{customer.email || '-'}</b></span>
          <span>Type<b>{customer.customer_type}</b></span>
          <span>GST<b>{customer.gst_number || '-'}</b></span>
          <span>Status<b><Status status={customer.status} /></b></span>
          <span>Address<b>{customer.address || '-'}</b></span>
        </div>
      </div>
      <h3>Follow-ups</h3>
      {customer.followups?.map((f: any) => (
        <div className="follow" key={f.id}>
          <b>{date(f.follow_up_date)}</b>
          <span>{f.type}</span>
          <p>{f.note}</p>
          <Status status={f.status} />
        </div>
      ))}
      <div className="follow-add">
        <textarea placeholder="Add follow-up note..." value={note} onChange={e => setNote(e.target.value)} />
        <button className="primary" disabled={!note} onClick={add}>Add Follow-up</button>
      </div>
    </Modal>
  );
}

function Products() {
  const [rows, setRows] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [f, setF] = useState<any>({ name: '', sku: '', category: 'Electronics', unit_price: 0, current_stock: 0, min_stock: 3, location: 'Main Warehouse' });

  const load = () => api('/products?search=' + encodeURIComponent(search)).then(setRows);
  useEffect(() => { load(); }, [search]);

  const save = async () => {
    await api('/products', { method: 'POST', body: JSON.stringify(f) });
    setOpen(false);
    load();
  };

  return (
    <>
      <div className="panel">
        <div className="panel-head">
          <h3>Product Catalogue</h3>
          <button className="primary" onClick={() => setOpen(true)}><Plus size={16} /> Add Product</button>
        </div>
        <Toolbar search={search} setSearch={setSearch} />
        <table>
          <thead>
            <tr><th>Product Name</th><th>Category</th><th>Unit Price</th><th>Stock</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td><b>{r.name}</b><small>{r.sku}</small></td>
                <td>{r.category}</td>
                <td>{money(r.unit_price)}</td>
                <td>{r.current_stock}</td>
                <td>{r.current_stock <= r.min_stock ? <Status status="LOW STOCK" /> : <Status status="ACTIVE" />}</td>
                <td><button className="row-actions"><Pencil size={15} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open && (
        <Modal title="Add Product" onClose={() => setOpen(false)}>
          <div className="form-grid">
            {[
              ['name', 'Product Name'],
              ['sku', 'SKU'],
              ['category', 'Category'],
              ['unit_price', 'Unit Price'],
              ['current_stock', 'Current Stock'],
              ['min_stock', 'Minimum Stock'],
              ['location', 'Warehouse Location']
            ].map(([k, l]) => (
              <label key={k}>{l}
                <input type={['unit_price', 'current_stock', 'min_stock'].includes(k) ? 'number' : 'text'} value={f[k]} onChange={e => setF({ ...f, [k]: e.target.value })} />
              </label>
            ))}
            <button className="primary full-field" onClick={save}>Save Product</button>
          </div>
        </Modal>
      )}
    </>
  );
}

function Inventory() {
  const [products, setProducts] = useState<any[]>([]);
  const [moves, setMoves] = useState<any[]>([]);
  useEffect(() => {
    api('/products').then(setProducts);
    api('/inventory/movements').then(setMoves);
  }, []);

  return (
    <>
      <div className="cards">
        <Metric title="Total Items" value={products.length} icon="📦" cls="blue" />
        <Metric title="In Stock" value={products.filter(x => x.current_stock > x.min_stock).length} icon="✓" cls="green" />
        <Metric title="Low Stock Warning" value={products.filter(x => x.current_stock <= x.min_stock && x.current_stock > 0).length} icon="!" cls="orange" />
        <Metric title="Out of Stock" value={products.filter(x => x.current_stock === 0).length} icon="×" cls="red" />
      </div>

      <div className="panel">
        <div className="panel-head"><h3>Live Stock Summary</h3></div>
        <table>
          <thead>
            <tr><th>Product</th><th>Category</th><th>In Stock</th><th>Minimum Required</th><th>Location</th><th>Status</th></tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td><b>{p.name}</b><small>{p.sku}</small></td>
                <td>{p.category}</td>
                <td>{p.current_stock}</td>
                <td>{p.min_stock}</td>
                <td>{p.location}</td>
                <td>{p.current_stock === 0 ? <Status status="OUT OF STOCK" /> : p.current_stock <= p.min_stock ? <Status status="LOW STOCK" /> : <Status status="IN STOCK" />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Challans() {
  const [rows, setRows] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [create, setCreate] = useState(false);
  const [detail, setDetail] = useState<any>(null);
  const [form, setForm] = useState<any>({ customer_id: '', items: [] });

  const load = () => api('/challans').then(setRows);
  useEffect(() => {
    load();
    api('/customers').then(setCustomers);
    api('/products').then(setProducts);
  }, []);

  const addItem = () => setForm({ ...form, items: [...form.items, { product_id: products[0]?.id || '', quantity: 1 }] });

  const save = async () => {
    try {
      await api('/challans', { method: 'POST', body: JSON.stringify(form) });
      setCreate(false);
      setForm({ customer_id: '', items: [] });
      load();
    } catch (e: any) { alert(e.message); }
  };

  const confirm = async (id: number) => {
    try {
      await api(`/challans/${id}/confirm`, { method: 'POST' });
      load();
      if (detail) api('/challans/' + id).then(setDetail);
    } catch (e: any) { alert(e.message); }
  };

  return (
    <>
      <div className="panel">
        <div className="panel-head">
          <h3>Sales Delivery Challans</h3>
          <button className="primary" onClick={() => setCreate(true)}><Plus size={16} /> Create Challan</button>
        </div>
        <table>
          <thead>
            <tr><th>Challan No.</th><th>Date</th><th>Customer</th><th>Total Qty</th><th>Amount</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td><b>{r.challan_number}</b></td>
                <td>{date(r.created_at)}</td>
                <td>{r.customer_name}</td>
                <td>{r.total_quantity}</td>
                <td>{money(r.total_amount)}</td>
                <td><Status status={r.status} /></td>
                <td className="row-actions">
                  <button onClick={() => api('/challans/' + r.id).then(setDetail)}><Eye size={15} /></button>
                  {r.status === 'DRAFT' && <button onClick={() => confirm(r.id)} title="Confirm Challan"><CheckCircle2 size={15} /></button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {create && (
        <Modal title="Create Delivery Challan" onClose={() => setCreate(false)} wide>
          <div className="form-grid">
            <label>Customer
              <select value={form.customer_id} onChange={e => setForm({ ...form, customer_id: e.target.value })}>
                <option value="">Select customer</option>
                {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </label>
            <div />
            <div className="item-editor full-field">
              <div className="panel-head">
                <h3>Challan Items</h3>
                <button className="primary-btn" onClick={addItem}><Plus size={14} /> Add Item</button>
              </div>
              {form.items.map((it: any, i: number) => (
                <div className="item-row" key={i}>
                  <select value={it.product_id} onChange={e => {
                    const items = [...form.items];
                    items[i] = { ...items[i], product_id: e.target.value };
                    setForm({ ...form, items });
                  }}>
                    {products.map(p => <option key={p.id} value={p.id}>{p.name} (Stock: {p.current_stock})</option>)}
                  </select>
                  <input type="number" min="1" value={it.quantity} onChange={e => {
                    const items = [...form.items];
                    items[i] = { ...items[i], quantity: Number(e.target.value) };
                    setForm({ ...form, items });
                  }} />
                  <button onClick={() => setForm({ ...form, items: form.items.filter((_: any, j: number) => j !== i) })}><Trash2 size={15} /></button>
                </div>
              ))}
            </div>
            <button className="primary full-field" disabled={!form.customer_id || !form.items.length} onClick={save}>Save Draft Challan</button>
          </div>
        </Modal>
      )}

      {detail && (
        <Modal title={`Challan ${detail.challan_number}`} onClose={() => setDetail(null)}>
          <div className="detail-card">
            <div className="detail-grid">
              <span>Customer<b>{detail.customer_name}</b></span>
              <span>Status<b><Status status={detail.status} /></b></span>
              <span>Created By<b>{detail.created_by_name}</b></span>
              <span>Date<b>{date(detail.created_at)}</b></span>
            </div>
            <table style={{ marginTop: 14 }}>
              <thead><tr><th>Product</th><th>SKU</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead>
              <tbody>
                {detail.items?.map((i: any) => (
                  <tr key={i.id}>
                    <td>{i.product_name}</td>
                    <td>{i.sku}</td>
                    <td>{i.quantity}</td>
                    <td>{money(i.unit_price)}</td>
                    <td>{money(i.line_total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {detail.status === 'DRAFT' && <button className="primary" onClick={() => confirm(detail.id)}>Confirm Delivery Challan</button>}
        </Modal>
      )}
    </>
  );
}

function Modal({ title, onClose, children, wide = false }: { title: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="overlay">
      <div className={wide ? 'modal wide' : 'modal'}>
        <div className="modal-head">
          <h2>{title}</h2>
          <button onClick={onClose}>×</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="empty">
      <div className="empty-icon">▦</div>
      <h2>{title} Workspace</h2>
      <p>This module is prepared in the operational portal UI.</p>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
