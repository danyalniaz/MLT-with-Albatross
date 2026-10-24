// =========================================================
//   MLThub – admin.js  |  Admin Panel Logic
//   by Albatross
// =========================================================

let currentAdminSession = null;

document.addEventListener("DOMContentLoaded", () => {
  currentAdminSession = window.MLTDB.getCurrentSession();
  if (!currentAdminSession) {
    window.location.href = "admin-login.html";
    return;
  }

  bindAdminSessionInfo();
  renderAdminOverview();
  renderAdminSubjects();
  renderAdminUsers();
  renderAdminOrders();
  loadAdminSettings();
  loadPaymentGatewaySettings();
  renderAdminLogs();
});

// Bind Admin session user details
function bindAdminSessionInfo() {
  if (!currentAdminSession) return;
  document.getElementById("adminUserName").textContent = currentAdminSession.name;
  document.getElementById("topbarAdminName").textContent = currentAdminSession.name;
  document.getElementById("adminUserRole").textContent = currentAdminSession.role;
  document.getElementById("rolePill").textContent = currentAdminSession.role.toUpperCase();
}

// Section Switcher
function showAdminSection(name, btn) {
  document.querySelectorAll(".dash-section").forEach(s => s.classList.remove("active"));
  const el = document.getElementById("admin-section-" + name);
  if (el) el.classList.add("active");

  if (btn) {
    document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
    btn.classList.add("active");
  }

  // Close mobile sidebar if open
  if (window.innerWidth <= 768) {
    document.getElementById("sidebar").classList.remove("mobile-open");
  }
}

// Sidebar toggle
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (window.innerWidth <= 768) {
    sidebar.classList.toggle("mobile-open");
  } else {
    sidebar.classList.toggle("collapsed");
  }
}

// --- OVERVIEW DASHBOARD ---
function renderAdminOverview() {
  const subjects = window.MLTDB.getSubjects();
  const users = window.MLTDB.getUsers();
  const orders = window.MLTDB.getOrders();
  const settings = window.MLTDB.getSettings();

  // Stats
  const totalRevenue = orders
    .filter(o => o.status === "completed")
    .reduce((sum, o) => sum + parseFloat(o.amount.replace("$", "") || 0), 0);

  document.getElementById("statRevenue").textContent = `$${totalRevenue.toFixed(2)}`;
  document.getElementById("statSubjects").textContent = subjects.length;
  document.getElementById("statAdmins").textContent = users.filter(u => u.role === "Admin" || u.role === "SuperAdmin").length;
  document.getElementById("statOrders").textContent = orders.length;

  document.getElementById("subjCountBadge").textContent = subjects.length;
  document.getElementById("userCountBadge").textContent = users.length;

  document.getElementById("maintStatusBadge").textContent = settings.maintenanceMode ? "ON" : "OFF";
  document.getElementById("maintStatusBadge").className = settings.maintenanceMode ? "badge-inactive" : "badge-active";

  // Recent subjects list
  const recentSubjs = subjects.slice(0, 5);
  document.getElementById("adminRecentSubjList").innerHTML = recentSubjs.map(s => `
    <div class="admin-subj-item">
      <div class="admin-subj-icon" style="background:${s.bg};color:${s.color};">
        <i class="${s.icon}"></i>
      </div>
      <div class="admin-subj-info">
        <div class="admin-subj-title">${s.name}</div>
        <div class="admin-subj-sub">${s.subparts.length} presentation modules · Category: ${s.category.toUpperCase()}</div>
      </div>
      <button class="action-btn-icon" onclick="openEditSubjectModal(${s.id})" title="Edit Subject"><i class="fa-solid fa-pen"></i></button>
    </div>
  `).join("");
}

// --- SUBJECTS MANAGEMENT ---
function renderAdminSubjects(data) {
  const subjects = data || window.MLTDB.getSubjects();
  const tbody = document.getElementById("adminSubjectsTableBody");

  tbody.innerHTML = subjects.map(s => `
    <tr>
      <td>
        <div style="width:38px;height:38px;border-radius:8px;background:${s.bg};color:${s.color};display:flex;align-items:center;justify-content:center;font-size:1.1rem;">
          <i class="${s.icon}"></i>
        </div>
      </td>
      <td><strong>${s.name}</strong><br/><span style="font-size:.75rem;color:var(--db-muted);">${s.desc || 'No description'}</span></td>
      <td><span class="badge-role-user">${s.category.toUpperCase()}</span></td>
      <td>${s.badge ? `<span class="badge-active">${s.badge.toUpperCase()}</span>` : '<span style="color:var(--db-muted);">-</span>'}</td>
      <td><strong>${s.subparts.length}</strong> modules</td>
      <td>
        <div style="display:flex;gap:.35rem;">
          <button class="action-btn-icon" onclick="openEditSubjectModal(${s.id})" title="Edit Subject"><i class="fa-solid fa-pen"></i></button>
          <button class="action-btn-icon action-btn-danger" onclick="confirmDeleteSubject(${s.id})" title="Delete Subject"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join("");
}

function filterSubjectsTable() {
  const q = document.getElementById("subjectFilterInput").value.toLowerCase().trim();
  const all = window.MLTDB.getSubjects();
  const filtered = all.filter(s => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));
  renderAdminSubjects(filtered);
}

function openAddSubjectModal() {
  document.getElementById("subjEditId").value = "";
  document.getElementById("subjName").value = "";
  document.getElementById("subjIcon").value = "fa-solid fa-book-medical";
  document.getElementById("subjCategory").value = "basic";
  document.getElementById("subjColor").value = "#2563eb";
  document.getElementById("subjBadge").value = "";
  document.getElementById("subjDesc").value = "";
  document.getElementById("modalSubjectHeading").textContent = "Add New Medical Subject";

  document.getElementById("subjectModalAdmin").classList.add("open");
}

function openEditSubjectModal(id) {
  const subjects = window.MLTDB.getSubjects();
  const s = subjects.find(x => x.id === id);
  if (!s) return;

  document.getElementById("subjEditId").value = s.id;
  document.getElementById("subjName").value = s.name;
  document.getElementById("subjIcon").value = s.icon;
  document.getElementById("subjCategory").value = s.category;
  document.getElementById("subjColor").value = s.color;
  document.getElementById("subjBadge").value = s.badge || "";
  document.getElementById("subjDesc").value = s.desc || "";
  document.getElementById("modalSubjectHeading").textContent = `Edit Subject: ${s.name}`;

  document.getElementById("subjectModalAdmin").classList.add("open");
}

function closeSubjectModalAdmin() {
  document.getElementById("subjectModalAdmin").classList.remove("open");
}

function handleSubjectSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById("subjEditId").value;
  const name = document.getElementById("subjName").value.trim();
  const icon = document.getElementById("subjIcon").value.trim();
  const category = document.getElementById("subjCategory").value;
  const color = document.getElementById("subjColor").value;
  const badge = document.getElementById("subjBadge").value;
  const desc = document.getElementById("subjDesc").value.trim();

  try {
    if (editId) {
      window.MLTDB.updateSubject(parseInt(editId), { name, icon, category, color, badge, desc });
      showAdminToast("✓ Subject updated successfully", "success");
    } else {
      window.MLTDB.addSubject({ name, icon, category, color, badge, desc });
      showAdminToast("✓ New subject created successfully", "success");
    }
    closeSubjectModalAdmin();
    renderAdminOverview();
    renderAdminSubjects();
  } catch (err) {
    showAdminToast(err.message || "Failed to save subject", "error");
  }
}

function confirmDeleteSubject(id) {
  if (confirm("Are you sure you want to delete this subject? This cannot be undone.")) {
    try {
      window.MLTDB.deleteSubject(id);
      showAdminToast("Subject deleted successfully", "info");
      renderAdminOverview();
      renderAdminSubjects();
    } catch (err) {
      showAdminToast(err.message || "Failed to delete subject", "error");
    }
  }
}

// --- USER & ADMIN MANAGEMENT ---
function renderAdminUsers() {
  const users = window.MLTDB.getUsers();
  const tbody = document.getElementById("adminUsersTableBody");

  if (!users.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--db-muted);padding:2rem;">No user accounts found. Click "Add Administrator" to create one.</td></tr>`;
    return;
  }

  tbody.innerHTML = users.map(u => `
    <tr>
      <td><strong>${u.name}</strong></td>
      <td>${u.email}</td>
      <td>
        <span class="${u.role === 'SuperAdmin' ? 'badge-role-super' : (u.role === 'Admin' ? 'badge-role-admin' : 'badge-role-user')}">
          ${u.role}
        </span>
      </td>
      <td>
        <span class="${u.status === 'active' ? 'badge-active' : 'badge-inactive'}">
          ${u.status.toUpperCase()}
        </span>
      </td>
      <td>${u.createdAt || '-'}</td>
      <td>${u.lastLogin || 'Never'}</td>
      <td>
        <div style="display:flex;gap:.35rem;">
          <button class="action-btn-icon" onclick="toggleUserStatus('${u.id}')" title="Toggle Active/Suspended Status"><i class="fa-solid fa-user-slash"></i></button>
          <button class="action-btn-icon" onclick="toggleUserRole('${u.id}')" title="Change Role"><i class="fa-solid fa-user-shield"></i></button>
          <button class="action-btn-icon action-btn-danger" onclick="deleteUserAccount('${u.id}')" title="Delete Account"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join("");
}

function openAddAdminModal() {
  document.getElementById("newAdminName").value = "";
  document.getElementById("newAdminEmail").value = "";
  document.getElementById("newAdminPass").value = "";
  document.getElementById("addAdminModal").classList.add("open");
}

function closeAddAdminModal() {
  document.getElementById("addAdminModal").classList.remove("open");
}

async function handleCreateAdminSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("newAdminName").value;
  const email = document.getElementById("newAdminEmail").value;
  const pass = document.getElementById("newAdminPass").value;
  const role = document.getElementById("newAdminRole").value;

  try {
    await window.MLTDB.createAdminAccount({ name, email, password: pass, role });
    showAdminToast("✓ New Admin account created successfully!", "success");
    closeAddAdminModal();
    renderAdminOverview();
    renderAdminUsers();
  } catch (err) {
    showAdminToast(err.message || "Failed to create admin account", "error");
  }
}

function toggleUserStatus(userId) {
  const users = window.MLTDB.getUsers();
  const u = users.find(x => x.id === userId);
  if (!u) return;

  u.status = u.status === "active" ? "suspended" : "active";
  window.MLTDB.saveUsers(users);
  window.MLTDB.logAction("TOGGLE_STATUS", `Toggled status for ${u.email} to ${u.status}`);
  showAdminToast(`Account status updated to ${u.status}`, "info");
  renderAdminUsers();
}

function toggleUserRole(userId) {
  const users = window.MLTDB.getUsers();
  const u = users.find(x => x.id === userId);
  if (!u) return;

  if (u.role === "SuperAdmin") u.role = "Admin";
  else if (u.role === "Admin") u.role = "User";
  else u.role = "Admin";

  window.MLTDB.saveUsers(users);
  window.MLTDB.logAction("CHANGE_ROLE", `Changed role for ${u.email} to ${u.role}`);
  showAdminToast(`User role updated to ${u.role}`, "info");
  renderAdminUsers();
}

function deleteUserAccount(userId) {
  let users = window.MLTDB.getUsers();
  const target = users.find(u => u.id === userId);
  if (!target) return;

  if (confirm(`Are you sure you want to delete user account "${target.email}"?`)) {
    users = users.filter(u => u.id !== userId);
    window.MLTDB.saveUsers(users);
    window.MLTDB.logAction("DELETE_USER", `Deleted user account: ${target.email}`);
    showAdminToast("User account deleted", "info");
    renderAdminOverview();
    renderAdminUsers();
  }
}

// --- ORDERS MANAGEMENT ---
function renderAdminOrders() {
  const orders = window.MLTDB.getOrders();
  const tbody = document.getElementById("adminOrdersTableBody");

  tbody.innerHTML = orders.map(o => `
    <tr>
      <td class="order-id">${o.id}</td>
      <td><strong>${o.customer}</strong><br/><span style="font-size:.75rem;color:var(--db-muted);">${o.email}</span></td>
      <td>${o.title}</td>
      <td>${o.subject}</td>
      <td>${o.date}</td>
      <td><strong>${o.amount}</strong></td>
      <td><span class="order-status status-${o.status}">${o.status.toUpperCase()}</span></td>
      <td>
        <select style="padding:.3rem .5rem;border-radius:6px;border:1px solid var(--db-border);font-size:.75rem;" onchange="handleOrderStatusChange('${o.id}', this.value)">
          <option value="completed" ${o.status==='completed'?'selected':''}>Completed</option>
          <option value="pending" ${o.status==='pending'?'selected':''}>Pending</option>
          <option value="refunded" ${o.status==='refunded'?'selected':''}>Refunded</option>
        </select>
      </td>
    </tr>
  `).join("");
}

function handleOrderStatusChange(orderId, newStatus) {
  window.MLTDB.updateOrderStatus(orderId, newStatus);
  showAdminToast(`Order ${orderId} updated to ${newStatus}`, "success");
  renderAdminOverview();
  renderAdminOrders();
}

// --- SETTINGS ---
function loadAdminSettings() {
  const settings = window.MLTDB.getSettings();
  document.getElementById("cfgSiteTitle").value = settings.siteTitle || "";
  document.getElementById("cfgSiteTagline").value = settings.siteTagline || "";
  document.getElementById("cfgSupportEmail").value = settings.supportEmail || "";
  document.getElementById("cfgSupportPhone").value = settings.supportPhone || "";
  document.getElementById("cfgCurrency").value = settings.currency || "$";
  document.getElementById("cfgDefaultPrice").value = settings.defaultPrice || "1.00";
  document.getElementById("cfgMaintenance").checked = !!settings.maintenanceMode;
  document.getElementById("cfgRegistrations").checked = settings.allowRegistrations !== false;
}

function saveSiteSettings(e) {
  e.preventDefault();
  const updated = {
    siteTitle: document.getElementById("cfgSiteTitle").value,
    siteTagline: document.getElementById("cfgSiteTagline").value,
    supportEmail: document.getElementById("cfgSupportEmail").value,
    supportPhone: document.getElementById("cfgSupportPhone").value,
    currency: document.getElementById("cfgCurrency").value,
    defaultPrice: document.getElementById("cfgDefaultPrice").value,
    allowRegistrations: document.getElementById("cfgRegistrations").checked
  };

  window.MLTDB.saveSettings(updated);
  showAdminToast("✓ Site settings saved successfully", "success");
}

function toggleMaintenanceMode(isMaint) {
  window.MLTDB.saveSettings({ maintenanceMode: isMaint });
  showAdminToast(`Maintenance mode is now ${isMaint ? 'ENABLED' : 'DISABLED'}`, isMaint ? "info" : "success");
  renderAdminOverview();
}

// --- PAYMENT GATEWAYS CONFIGURATION ---
function loadPaymentGatewaySettings() {
  try {
    const raw = localStorage.getItem("mlthub_payment_config");
    const cfg = raw ? JSON.parse(raw) : {
      epNumber: "03017654321",
      jcNumber: "03009876543",
      paypalEmail: "payments@albatross.com",
      bankName: "Meezan Bank Ltd.",
      bankTitle: "MLThub by Albatross",
      bankIban: "PK64MEZN0001234567890101",
      bankRaast: "03001234567"
    };

    if (document.getElementById("cfgEpNumber")) document.getElementById("cfgEpNumber").value = cfg.epNumber || "";
    if (document.getElementById("cfgJcNumber")) document.getElementById("cfgJcNumber").value = cfg.jcNumber || "";
    if (document.getElementById("cfgPaypalEmail")) document.getElementById("cfgPaypalEmail").value = cfg.paypalEmail || "";
    if (document.getElementById("cfgBankName")) document.getElementById("cfgBankName").value = cfg.bankName || "";
    if (document.getElementById("cfgBankTitle")) document.getElementById("cfgBankTitle").value = cfg.bankTitle || "";
    if (document.getElementById("cfgBankIban")) document.getElementById("cfgBankIban").value = cfg.bankIban || "";
    if (document.getElementById("cfgBankRaast")) document.getElementById("cfgBankRaast").value = cfg.bankRaast || "";
  } catch(e) {}
}

function savePaymentGatewaySettings(e) {
  e.preventDefault();
  const cfg = {
    epNumber: document.getElementById("cfgEpNumber").value.trim(),
    jcNumber: document.getElementById("cfgJcNumber").value.trim(),
    paypalEmail: document.getElementById("cfgPaypalEmail").value.trim(),
    bankName: document.getElementById("cfgBankName").value.trim(),
    bankTitle: document.getElementById("cfgBankTitle").value.trim(),
    bankIban: document.getElementById("cfgBankIban").value.trim(),
    bankRaast: document.getElementById("cfgBankRaast").value.trim()
  };
  localStorage.setItem("mlthub_payment_config", JSON.stringify(cfg));
  if (window.MLTDB && window.MLTDB.logAction) {
    window.MLTDB.logAction("CONFIG_PAYMENT", "Updated payment gateway accounts & numbers");
  }
  showAdminToast("✓ Payment Gateway settings saved successfully!", "success");
}

// --- SECURITY LOGS ---
function renderAdminLogs() {
  const logs = window.MLTDB.getLogs();
  const tbody = document.getElementById("adminLogsTableBody");

  if (!logs.length) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:var(--db-muted);padding:2rem;">No security logs recorded yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = logs.map(l => `
    <tr>
      <td style="font-family:monospace;font-size:.8rem;">${l.timestamp}</td>
      <td><strong>${l.user}</strong></td>
      <td><span class="badge-role-admin">${l.action}</span></td>
      <td>${l.details}</td>
    </tr>
  `).join("");
}

// Global Search inside Admin Command Center
function handleAdminGlobalSearch() {
  const q = document.getElementById("adminGlobalSearch").value.toLowerCase().trim();
  if (!q) return;

  const subjects = window.MLTDB.getSubjects();
  const matched = subjects.filter(s => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));
  renderAdminSubjects(matched);
  showAdminSection("subjects", null);
}

// Logout
function handleAdminLogout() {
  if (confirm("Are you sure you want to log out of the Admin Panel?")) {
    window.MLTDB.logout();
    window.location.href = "admin-login.html";
  }
}

// Toast
function showAdminToast(msg, type = "") {
  const t = document.getElementById("adminToast");
  t.textContent = msg;
  t.className = "db-toast " + type + " show";
  setTimeout(() => { t.className = "db-toast"; }, 3500);
}
