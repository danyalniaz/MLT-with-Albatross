// =============================================
//   MLThub Studio – editor.js  |  by Albatross
// =============================================

let studioContentDraft = null;
let isDraftDirty = false;

document.addEventListener("DOMContentLoaded", () => {
  studioContentDraft = window.MLTStudio.getDraft();
  bindDraftToFormFields();
  renderHowItWorksAccordion();
  renderFaqEditor();
  renderSubjectsManager();
  renderCustomSectionsList();
  renderAdminUsersManager();
  setupIframeSync();
});

// --- Tab & Mode Switching ---
function switchMode(modeName, btn) {
  document.querySelectorAll(".mode-tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".editor-mode-panel").forEach(p => p.classList.remove("active"));

  if (btn) btn.classList.add("active");
  const panel = document.getElementById("panel-" + modeName);
  if (panel) panel.classList.add("active");
}

// --- Device Frame Switcher (Desktop / Tablet / Mobile) ---
function setDevice(device, btn) {
  document.querySelectorAll(".device-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  const frame = document.getElementById("deviceFrame");
  frame.className = "device-frame " + (device === "desktop" ? "" : device);
}

// --- Accordions ---
function toggleAcc(btn) {
  const isOpen = btn.classList.contains("open");
  const body = btn.nextElementSibling;

  if (isOpen) {
    btn.classList.remove("open");
    body.classList.remove("open");
  } else {
    btn.classList.add("open");
    body.classList.add("open");
  }
}

// --- Bind Draft Object to Form Inputs ---
function bindDraftToFormFields() {
  document.querySelectorAll("[data-path]").forEach(input => {
    const path = input.getAttribute("data-path");
    const val = getNestedValue(studioContentDraft, path);
    if (val !== undefined && val !== null) {
      input.value = val;
    }
  });
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined) ? acc[part] : undefined, obj);
}

function setNestedValue(obj, path, value) {
  const parts = path.split('.');
  let curr = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!curr[parts[i]]) curr[parts[i]] = {};
    curr = curr[parts[i]];
  }
  curr[parts[parts.length - 1]] = value;
}

// --- Live Real-Time Form Input Handler ---
function handleLiveInput(input) {
  const path = input.getAttribute("data-path");
  const val = input.value;
  setNestedValue(studioContentDraft, path, val);
  markDirty();
  syncLivePreview();
}

function markDirty() {
  isDraftDirty = true;
  window.MLTStudio.saveDraft(studioContentDraft);
  const status = document.getElementById("saveStatus");
  status.innerHTML = `<i class="fa-solid fa-pen-dot"></i> Unsaved changes`;
  status.className = "save-status unsaved";
}

function markClean() {
  isDraftDirty = false;
  const status = document.getElementById("saveStatus");
  status.innerHTML = `<i class="fa-solid fa-circle-check"></i> All changes saved`;
  status.className = "save-status";
}

// --- Live Synchronization with Preview Iframe ---
function syncLivePreview() {
  const iframe = document.getElementById("previewIframe");
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage({
      type: "MLT_STUDIO_UPDATE",
      content: studioContentDraft
    }, "*");
  }
}

function setupIframeSync() {
  const iframe = document.getElementById("previewIframe");
  iframe.onload = () => {
    syncLivePreview();
  };
}

function reloadPreviewIframe() {
  const iframe = document.getElementById("previewIframe");
  iframe.src = "../index.html?t=" + Date.now();
}

// --- Save & Discard Actions ---
function saveAndPublish() {
  window.MLTStudio.saveContent(studioContentDraft);
  markClean();
  showStudioToast("✓ Site published successfully! All changes are live.", "success");
  syncLivePreview();
}

function discardChanges() {
  if (confirm("Are you sure you want to discard all unsaved edits?")) {
    studioContentDraft = window.MLTStudio.discardDraft();
    bindDraftToFormFields();
    renderFaqEditor();
    renderHowItWorksAccordion();
    renderSubjectsManager();
    markClean();
    syncLivePreview();
    showStudioToast("Unsaved changes discarded", "error");
  }
}

// --- FAQ Editor ---
function renderFaqEditor() {
  const container = document.getElementById("faqListEditor");
  const items = studioContentDraft.faqSection?.items || [];
  container.innerHTML = items.map((item, idx) => `
    <div style="background:rgba(255,255,255,.03);padding:.75rem;border-radius:8px;border:1px solid var(--border);margin-bottom:.5rem;">
      <div style="display:flex;justify-size:space-between;align-items:center;margin-bottom:.4rem;">
        <span style="font-size:.75rem;font-weight:700;color:#93c5fd;">Question #${idx+1}</span>
        <button class="icon-btn icon-btn-danger" onclick="deleteFaqItem(${idx})" title="Delete FAQ"><i class="fa-solid fa-trash"></i></button>
      </div>
      <div class="field-group" style="margin-bottom:.4rem;"><label>Question</label><input type="text" value="${item.q}" oninput="updateFaqItem(${idx},'q',this.value)"/></div>
      <div class="field-group"><label>Answer</label><textarea rows="2" oninput="updateFaqItem(${idx},'a',this.value)">${item.a}</textarea></div>
    </div>
  `).join("");
}

function updateFaqItem(idx, field, val) {
  if (!studioContentDraft.faqSection.items[idx]) return;
  studioContentDraft.faqSection.items[idx][field] = val;
  markDirty();
  syncLivePreview();
}

function addNewFaqItem() {
  if (!studioContentDraft.faqSection) studioContentDraft.faqSection = { items: [] };
  studioContentDraft.faqSection.items.push({ q: "New Question Title", a: "Answer text goes here..." });
  markDirty();
  renderFaqEditor();
  syncLivePreview();
}

function deleteFaqItem(idx) {
  studioContentDraft.faqSection.items.splice(idx, 1);
  markDirty();
  renderFaqEditor();
  syncLivePreview();
}

// --- How It Works Editor ---
function renderHowItWorksAccordion() {
  const container = document.getElementById("accHowItWorks");
  const steps = studioContentDraft.howSection?.steps || [];
  container.innerHTML = steps.map((s, idx) => `
    <div style="margin-bottom:.75rem;padding:.75rem;background:rgba(255,255,255,.03);border-radius:8px;border:1px solid var(--border);">
      <div style="font-size:.75rem;font-weight:700;color:#a7f3d0;margin-bottom:.4rem;">Step ${s.num}</div>
      <div class="field-group" style="margin-bottom:.4rem;"><label>Title</label><input type="text" value="${s.title}" oninput="updateHowStep(${idx},'title',this.value)"/></div>
      <div class="field-group"><label>Description</label><textarea rows="2" oninput="updateHowStep(${idx},'desc',this.value)">${s.desc}</textarea></div>
    </div>
  `).join("");
}

function updateHowStep(idx, field, val) {
  studioContentDraft.howSection.steps[idx][field] = val;
  markDirty();
  syncLivePreview();
}

// --- Subjects Manager ---
function renderSubjectsManager() {
  const subjects = (window.MLTDB && window.MLTDB.getSubjects().length) ? window.MLTDB.getSubjects() : [];
  const container = document.getElementById("studioSubjectsList");

  container.innerHTML = subjects.map(s => `
    <div class="subj-manager-item">
      <div class="subj-manager-left">
        <div class="subj-manager-icon" style="background:${s.bg};color:${s.color};"><i class="${s.icon}"></i></div>
        <div>
          <div class="subj-manager-name">${s.name}</div>
          <div class="subj-manager-sub">${s.subparts ? s.subparts.length : 0} modules · ${s.category}</div>
        </div>
      </div>
      <div style="display:flex;gap:.3rem;">
        <button class="icon-btn icon-btn-danger" onclick="deleteStudioSubject(${s.id})"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
  `).join("");
}

function openStudioAddSubjectModal() {
  const name = prompt("Enter new Subject Name (e.g. Immunology):");
  if (!name) return;
  if (window.MLTDB) {
    window.MLTDB.addSubject({ name: name, icon: "fa-solid fa-book-medical", category: "basic", color: "#2563eb", bg: "#eff6ff" });
    renderSubjectsManager();
    showStudioToast("✓ Subject added successfully!", "success");
    syncLivePreview();
  }
}

function deleteStudioSubject(id) {
  if (confirm("Delete this subject?")) {
    if (window.MLTDB) {
      window.MLTDB.deleteSubject(id);
      renderSubjectsManager();
      showStudioToast("Subject deleted", "error");
      syncLivePreview();
    }
  }
}

// --- Custom Section Builder ---
function addCustomSection() {
  const layout = document.getElementById("customSecLayout").value;
  const title = document.getElementById("customSecTitle").value.trim();
  const subtitle = document.getElementById("customSecSubtitle").value.trim();
  const bg = document.getElementById("customSecBg").value;
  const icon = document.getElementById("customSecIcon").value;

  if (!title) {
    alert("Please enter a section title.");
    return;
  }

  const newSec = {
    id: "sec_" + Date.now(),
    layout, title, subtitle, bg, icon
  };

  if (!studioContentDraft.customSections) studioContentDraft.customSections = [];
  studioContentDraft.customSections.push(newSec);
  markDirty();
  renderCustomSectionsList();
  syncLivePreview();

  document.getElementById("customSecTitle").value = "";
  document.getElementById("customSecSubtitle").value = "";
  showStudioToast("✓ Custom section added to page!", "success");
}

function renderCustomSectionsList() {
  const container = document.getElementById("customSectionsList");
  const list = studioContentDraft.customSections || [];
  if (!list.length) {
    container.innerHTML = `<p style="font-size:.75rem;color:var(--muted);text-align:center;">No custom sections added yet.</p>`;
    return;
  }

  container.innerHTML = `<h4 style="font-size:.85rem;color:white;margin-bottom:.5rem;">Your Custom Sections</h4>` + list.map((sec, idx) => `
    <div style="background:rgba(255,255,255,.04);padding:.65rem;border-radius:8px;border:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;margin-bottom:.4rem;">
      <div><strong style="font-size:.8rem;color:white;">${sec.title}</strong><br/><span style="font-size:.7rem;color:var(--muted);">${sec.layout}</span></div>
      <button class="icon-btn icon-btn-danger" onclick="deleteCustomSection(${idx})"><i class="fa-solid fa-trash"></i></button>
    </div>
  `).join("");
}

function deleteCustomSection(idx) {
  studioContentDraft.customSections.splice(idx, 1);
  markDirty();
  renderCustomSectionsList();
  syncLivePreview();
}

// --- Studio Admins Manager ---
function renderAdminUsersManager() {
  const container = document.getElementById("studioAdminUsersList");
  const users = window.MLTStudio.getUsers();

  container.innerHTML = users.map(u => `
    <div style="background:rgba(255,255,255,.04);padding:.65rem;border-radius:8px;border:1px solid var(--border);margin-bottom:.4rem;">
      <div style="font-weight:700;font-size:.85rem;color:white;">${u.name}</div>
      <div style="font-size:.75rem;color:var(--muted);">${u.email} · ${u.role}</div>
    </div>
  `).join("");
}

function createNewAdminInStudio() {
  const name = document.getElementById("newAdminName").value.trim();
  const email = document.getElementById("newAdminEmail").value.trim();
  const pass = document.getElementById("newAdminPass").value.trim();

  if (!name || !email || !pass) {
    alert("Please complete all fields.");
    return;
  }

  try {
    window.MLTStudio.createAdminUser({ name, email, password: pass, role: "Admin" });
    renderAdminUsersManager();
    document.getElementById("newAdminName").value = "";
    document.getElementById("newAdminEmail").value = "";
    document.getElementById("newAdminPass").value = "";
    showStudioToast("✓ New Admin account created!", "success");
  } catch (err) {
    alert(err.message);
  }
}

function resetStudioToDefaults() {
  if (confirm("Reset ALL site text, headers, and colors back to original factory defaults?")) {
    studioContentDraft = window.MLTStudio.resetToDefaults();
    bindDraftToFormFields();
    renderFaqEditor();
    renderHowItWorksAccordion();
    markClean();
    syncLivePreview();
    showStudioToast("Reset to factory defaults", "info");
  }
}

function handleStudioLogout() {
  if (confirm("Logout from Studio Editor?")) {
    window.MLTStudio.logout();
    window.location.href = "login.html";
  }
}

function showStudioToast(msg, type = "") {
  const t = document.getElementById("studioToast");
  t.textContent = msg;
  t.className = "studio-toast " + type + " show";
  setTimeout(() => { t.className = "studio-toast"; }, 3500);
}
