// =========================================================
//   MLThub – admin-db.js  |  Secure Database & Auth Core
//   by Albatross
// =========================================================

const MLT_DB_KEYS = {
  USERS: 'mlthub_db_users',
  SUBJECTS: 'mlthub_db_subjects',
  ORDERS: 'mlthub_db_orders',
  SETTINGS: 'mlthub_db_settings',
  LOGS: 'mlthub_db_logs',
  SESSION: 'mlthub_admin_session',
  INIT_FLAG: 'mlthub_admin_initialized'
};

// Default initial subjects matching app.js
const DEFAULT_SUBJECTS = [
  { id:1, name:"Anatomy", icon:"fa-solid fa-bone", color:"#ef4444", bg:"#fef2f2", category:"basic", badge:"hot", desc:"Comprehensive human anatomy.", subparts:[{title:"Upper Limb Anatomy",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Lower Limb Anatomy",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Thorax & Mediastinum",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Abdomen & Pelvis",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Head & Neck Anatomy",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Neuroanatomy Basics",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Histology Overview",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"Embryology Essentials",slides:10,price:"$1.00",old:"$9.99",rating:4.8}] },
  { id:2, name:"Physiology", icon:"fa-solid fa-heart-pulse", color:"#2563eb", bg:"#eff6ff", category:"basic", badge:"hot", desc:"Human body functions.", subparts:[{title:"Cardiovascular Physiology",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Respiratory Physiology",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Renal Physiology",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Neurophysiology",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Endocrine Physiology",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"GI Physiology",slides:10,price:"$1.00",old:"$9.99",rating:4.7}] },
  { id:3, name:"Pathology", icon:"fa-solid fa-microscope", color:"#7c3aed", bg:"#fdf4ff", category:"para", badge:"hot", desc:"Disease mechanisms and morphology.", subparts:[{title:"General Pathology",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Cell Injury & Death",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Inflammation & Repair",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Neoplasia",slides:10,price:"$1.00",old:"$9.99",rating:4.7}] },
  { id:4, name:"Pharmacology", icon:"fa-solid fa-pills", color:"#f59e0b", bg:"#fffbeb", category:"para", badge:"", desc:"Drug mechanisms and applications.", subparts:[{title:"General Pharmacology",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Autonomic Pharmacology",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Cardiovascular Drugs",slides:10,price:"$1.00",old:"$9.99",rating:4.9}] },
  { id:5, name:"Biochemistry", icon:"fa-solid fa-flask", color:"#10b981", bg:"#f0fdf4", category:"basic", badge:"new", desc:"Metabolic pathways and enzymes.", subparts:[{title:"Carbohydrate Metabolism",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Lipid Metabolism",slides:10,price:"$1.00",old:"$9.99",rating:4.7}] },
  { id:6, name:"Microbiology", icon:"fa-solid fa-virus", color:"#06b6d4", bg:"#ecfeff", category:"para", badge:"", desc:"Bacteria, viruses, fungi, and parasites.", subparts:[{title:"General Bacteriology",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Virology",slides:10,price:"$1.00",old:"$9.99",rating:4.7}] },
  { id:7, name:"Cardiology", icon:"fa-solid fa-heart", color:"#ef4444", bg:"#fef2f2", category:"clinical", badge:"hot", desc:"Heart diseases and ECG interpretation.", subparts:[{title:"Ischaemic Heart Disease",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Heart Failure",slides:10,price:"$1.00",old:"$9.99",rating:4.8}] },
  { id:8, name:"Neurology", icon:"fa-solid fa-brain", color:"#7c3aed", bg:"#fdf4ff", category:"clinical", badge:"new", desc:"Neurological disorders and management.", subparts:[{title:"Stroke & TIA",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Epilepsy",slides:10,price:"$1.00",old:"$9.99",rating:4.8}] }
];

const DEFAULT_ORDERS = [
  { id:"#MLT-2026-0012", title:"GI Surgery", customer:"Dr. Ahmed Khan", email:"ahmed.khan@medical.edu", subject:"Surgery", date:"2026-10-01", amount:"$1.00", status:"completed" },
  { id:"#MLT-2026-0011", title:"Heart Failure", customer:"Sarah Jenkins", email:"sarah.j@med.org", subject:"Cardiology", date:"2026-09-28", amount:"$1.00", status:"completed" },
  { id:"#MLT-2026-0010", title:"Head & Neck Anatomy", customer:"Dr. Ahmed Khan", email:"ahmed.khan@medical.edu", subject:"Anatomy", date:"2026-10-01", amount:"$1.00", status:"completed" },
  { id:"#MLT-2026-0009", title:"Respiratory Physiology", customer:"Michael Chang", email:"m.chang@health.edu", subject:"Physiology", date:"2026-09-02", amount:"$1.00", status:"completed" },
  { id:"#MLT-2026-0008", title:"Immunology Basics", customer:"Dr. Ahmed Khan", email:"ahmed.khan@medical.edu", subject:"Microbiology", date:"2026-09-18", amount:"$1.00", status:"completed" }
];

const DEFAULT_SETTINGS = {
  siteTitle: "MLThub",
  siteTagline: "by Albatross",
  supportEmail: "support@mlthub.com",
  supportPhone: "+1 (800) MLT-HUBS",
  currency: "$",
  defaultPrice: "1.00",
  maintenanceMode: false,
  allowRegistrations: true
};

// --- Web Crypto SHA-256 Hashing ---
async function hashPassword(password, salt) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateSalt() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

// --- Database Operations ---
class MLTAdminDatabase {
  constructor() {
    this.initStorage();
  }

  initStorage() {
    if (!localStorage.getItem(MLT_DB_KEYS.SUBJECTS)) {
      localStorage.setItem(MLT_DB_KEYS.SUBJECTS, JSON.stringify(DEFAULT_SUBJECTS));
    }
    if (!localStorage.getItem(MLT_DB_KEYS.USERS)) {
      localStorage.setItem(MLT_DB_KEYS.USERS, JSON.stringify([]));
    }
    if (!localStorage.getItem(MLT_DB_KEYS.ORDERS)) {
      localStorage.setItem(MLT_DB_KEYS.ORDERS, JSON.stringify(DEFAULT_ORDERS));
    }
    if (!localStorage.getItem(MLT_DB_KEYS.SETTINGS)) {
      localStorage.setItem(MLT_DB_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    }
    if (!localStorage.getItem(MLT_DB_KEYS.LOGS)) {
      localStorage.setItem(MLT_DB_KEYS.LOGS, JSON.stringify([]));
    }
  }

  // --- Users & Admins ---
  getUsers() {
    return JSON.parse(localStorage.getItem(MLT_DB_KEYS.USERS) || '[]');
  }

  saveUsers(users) {
    localStorage.setItem(MLT_DB_KEYS.USERS, JSON.stringify(users));
  }

  async createAdminAccount({ name, email, password, role = 'Admin' }) {
    const users = this.getUsers();
    const cleanEmail = email.trim().toLowerCase();

    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      throw new Error('An account with this email address already exists.');
    }

    const salt = generateSalt();
    const passwordHash = await hashPassword(password, salt);

    const newAdmin = {
      id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      name: name.trim(),
      email: cleanEmail,
      salt: salt,
      passwordHash: passwordHash,
      role: role, // 'SuperAdmin' or 'Admin'
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: null
    };

    users.push(newAdmin);
    this.saveUsers(users);

    // Set initialization flag if it's the first admin
    if (users.filter(u => u.role === 'SuperAdmin' || u.role === 'Admin').length === 1) {
      localStorage.setItem(MLT_DB_KEYS.INIT_FLAG, 'true');
    }

    this.logAction('CREATE_ADMIN', `Created new admin account for ${cleanEmail} (${role})`);
    return newAdmin;
  }

  async authenticateAdmin(email, password) {
    let users = this.getUsers();
    const cleanEmail = email.trim().toLowerCase();

    // Auto-seed default SuperAdmin if no admin exists yet
    if (!this.hasAdminAccounts()) {
      const defaultSalt = generateSalt();
      const defaultHash = await hashPassword(password || 'admin123', defaultSalt);
      const defaultAdmin = {
        id: 'usr_default_admin',
        name: 'Master Administrator',
        email: cleanEmail || 'admin@mlthub.com',
        salt: defaultSalt,
        passwordHash: defaultHash,
        role: 'SuperAdmin',
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        lastLogin: null
      };
      users.push(defaultAdmin);
      this.saveUsers(users);
      this.logAction('AUTO_SEED_ADMIN', `Auto-created default admin account for ${defaultAdmin.email}`);
    }

    users = this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      this.logAction('LOGIN_FAILED', `Failed login attempt for email: ${cleanEmail}`);
      throw new Error('Invalid email address or password.');
    }

    if (user.status !== 'active') {
      throw new Error('This admin account has been suspended.');
    }

    if (user.role !== 'Admin' && user.role !== 'SuperAdmin') {
      throw new Error('Access denied. This account does not have administrator privileges.');
    }

    const testHash = await hashPassword(password, user.salt);
    if (testHash !== user.passwordHash) {
      this.logAction('LOGIN_FAILED', `Invalid password for admin: ${cleanEmail}`);
      throw new Error('Invalid email address or password.');
    }

    // Update last login
    user.lastLogin = new Date().toISOString().replace('T', ' ').substring(0, 19);
    this.saveUsers(users);

    // Create Session Token
    const sessionToken = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: 'mlt_token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
      expiresAt: Date.now() + (8 * 60 * 60 * 1000) // 8 hours validity
    };

    sessionStorage.setItem(MLT_DB_KEYS.SESSION, JSON.stringify(sessionToken));
    this.logAction('LOGIN_SUCCESS', `Admin logged in: ${cleanEmail}`);
    return sessionToken;
  }

  getCurrentSession() {
    try {
      const raw = sessionStorage.getItem(MLT_DB_KEYS.SESSION);
      if (!raw) return null;
      const session = JSON.parse(raw);
      if (Date.now() > session.expiresAt) {
        sessionStorage.removeItem(MLT_DB_KEYS.SESSION);
        return null;
      }
      return session;
    } catch (e) {
      return null;
    }
  }

  logout() {
    const session = this.getCurrentSession();
    if (session) {
      this.logAction('LOGOUT', `Admin logged out: ${session.email}`);
    }
    sessionStorage.removeItem(MLT_DB_KEYS.SESSION);
  }

  hasAdminAccounts() {
    const users = this.getUsers();
    return users.some(u => u.role === 'Admin' || u.role === 'SuperAdmin');
  }

  // --- Subjects CRUD ---
  getSubjects() {
    return JSON.parse(localStorage.getItem(MLT_DB_KEYS.SUBJECTS) || '[]');
  }

  saveSubjects(subjects) {
    localStorage.setItem(MLT_DB_KEYS.SUBJECTS, JSON.stringify(subjects));
  }

  addSubject(subjectData) {
    const subjects = this.getSubjects();
    const newId = subjects.length ? Math.max(...subjects.map(s => s.id)) + 1 : 1;
    const newSubject = {
      id: newId,
      name: subjectData.name,
      icon: subjectData.icon || 'fa-solid fa-book-medical',
      color: subjectData.color || '#2563eb',
      bg: subjectData.bg || '#eff6ff',
      category: subjectData.category || 'basic',
      badge: subjectData.badge || '',
      desc: subjectData.desc || 'Medical subject presentation module.',
      subparts: subjectData.subparts || [{ title: `${subjectData.name} Overview`, slides: 10, price: "$1.00", old: "$9.99", rating: 4.8 }]
    };
    subjects.push(newSubject);
    this.saveSubjects(subjects);
    this.logAction('ADD_SUBJECT', `Added new subject: ${newSubject.name}`);
    return newSubject;
  }

  updateSubject(id, updatedData) {
    let subjects = this.getSubjects();
    const idx = subjects.findIndex(s => s.id === parseInt(id));
    if (idx === -1) throw new Error('Subject not found');
    subjects[idx] = { ...subjects[idx], ...updatedData };
    this.saveSubjects(subjects);
    this.logAction('UPDATE_SUBJECT', `Updated subject: ${subjects[idx].name}`);
    return subjects[idx];
  }

  deleteSubject(id) {
    let subjects = this.getSubjects();
    const target = subjects.find(s => s.id === parseInt(id));
    if (!target) throw new Error('Subject not found');
    subjects = subjects.filter(s => s.id !== parseInt(id));
    this.saveSubjects(subjects);
    this.logAction('DELETE_SUBJECT', `Deleted subject: ${target.name}`);
  }

  // --- Orders CRUD ---
  getOrders() {
    return JSON.parse(localStorage.getItem(MLT_DB_KEYS.ORDERS) || '[]');
  }

  updateOrderStatus(orderId, newStatus) {
    let orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      localStorage.setItem(MLT_DB_KEYS.ORDERS, JSON.stringify(orders));
      this.logAction('UPDATE_ORDER', `Updated order ${orderId} status to ${newStatus}`);
    }
  }

  // --- Settings ---
  getSettings() {
    return JSON.parse(localStorage.getItem(MLT_DB_KEYS.SETTINGS) || JSON.stringify(DEFAULT_SETTINGS));
  }

  saveSettings(newSettings) {
    const updated = { ...this.getSettings(), ...newSettings };
    localStorage.setItem(MLT_DB_KEYS.SETTINGS, JSON.stringify(updated));
    this.logAction('UPDATE_SETTINGS', 'Updated site system settings');
    return updated;
  }

  // --- Audit Logs ---
  getLogs() {
    return JSON.parse(localStorage.getItem(MLT_DB_KEYS.LOGS) || '[]');
  }

  logAction(action, details) {
    const logs = this.getLogs();
    const session = this.getCurrentSession();
    logs.unshift({
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: session ? session.email : 'System/Setup',
      action: action,
      details: details
    });
    // Keep last 100 logs
    if (logs.length > 100) logs.pop();
    localStorage.setItem(MLT_DB_KEYS.LOGS, JSON.stringify(logs));
  }
}

// Global Instance
window.MLTDB = new MLTAdminDatabase();
