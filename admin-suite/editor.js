// =============================================
//   MLThub Admin Suite – editor.js  |  by Albatross
// =============================================

let suiteContentDraft = null;
let isDraftDirty = false;

// PPT Editor State
let currentEditingPpt = null;
let activeSlideIndex = 0;

function formatFileSize(bytes) {
  if (window.MLTFilesDB && window.MLTFilesDB.formatFileSize) return window.MLTFilesDB.formatFileSize(bytes);
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

document.addEventListener("DOMContentLoaded", () => {
  suiteContentDraft = window.MLTStudio.getDraft();
  bindDraftToFormFields();
  renderHowItWorksAccordion();
  renderFaqEditor();
  renderSubjectsManager();
  renderCustomSectionsList();
  renderAdminUsersManager();
  initPptEditor();
  initSuitePaymentSettings();
  setupIframeSync();
});

// --- Tab & Mode Switching ---
function switchMode(modeName, btn) {
  document.querySelectorAll(".mode-tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".editor-mode-panel").forEach(p => p.classList.remove("active"));

  if (btn) btn.classList.add("active");
  const panel = document.getElementById("panel-" + modeName);
  if (panel) panel.classList.add("active");

  if (modeName === "pptEditor") {
    populatePptSubjectDropdowns();
    renderPptEditorList();
  }
}

// --- Device Frame Switcher ---
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
    const val = getNestedValue(suiteContentDraft, path);
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
  setNestedValue(suiteContentDraft, path, val);
  markDirty();
  syncLivePreview();
}

function markDirty() {
  isDraftDirty = true;
  window.MLTStudio.saveDraft(suiteContentDraft);
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
      content: suiteContentDraft,
      subjects: getAllSubjects()
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
  window.MLTStudio.saveContent(suiteContentDraft);
  markClean();
  showSuiteToast("✓ Site published successfully! All changes are live.", "success");
  syncLivePreview();
}

function discardChanges() {
  if (confirm("Are you sure you want to discard all unsaved edits?")) {
    suiteContentDraft = window.MLTStudio.discardDraft();
    bindDraftToFormFields();
    renderFaqEditor();
    renderHowItWorksAccordion();
    renderSubjectsManager();
    markClean();
    syncLivePreview();
    showSuiteToast("Unsaved changes discarded", "error");
  }
}

// --- Subjects Database Helper ---
function getAllSubjects() {
  let list = null;
  try {
    const raw = localStorage.getItem("mlthub_db_subjects");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) list = parsed;
    }
  } catch (e) {}

  if (!list) {
    const defaultList = [
    { id:1, name:"Anatomy", icon:"fa-solid fa-bone", color:"#ef4444", bg:"#fef2f2", category:"basic", badge:"hot", desc:"Comprehensive human anatomy.", subparts:[{title:"Upper Limb Anatomy",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Lower Limb Anatomy",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Thorax & Mediastinum",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Abdomen & Pelvis",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Head & Neck Anatomy",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Neuroanatomy Basics",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Histology Overview",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"Embryology Essentials",slides:10,price:"$1.00",old:"$9.99",rating:4.8}] },
    { id:2, name:"Physiology", icon:"fa-solid fa-heart-pulse", color:"#2563eb", bg:"#eff6ff", category:"basic", badge:"hot", desc:"Human body functions.", subparts:[{title:"Cardiovascular Physiology",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Respiratory Physiology",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Renal Physiology",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Neurophysiology",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Endocrine Physiology",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"GI Physiology",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Blood & Hematopoiesis",slides:10,price:"$1.00",old:"$9.99",rating:4.8}] },
    { id:3, name:"Pathology", icon:"fa-solid fa-microscope", color:"#7c3aed", bg:"#fdf4ff", category:"para", badge:"hot", desc:"Disease mechanisms and morphology.", subparts:[{title:"General Pathology",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Cell Injury & Death",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Inflammation & Repair",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Neoplasia",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Cardiovascular Pathology",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Haematopathology",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"Renal Pathology",slides:10,price:"$1.00",old:"$9.99",rating:4.7}] },
    { id:4, name:"Pharmacology", icon:"fa-solid fa-pills", color:"#f59e0b", bg:"#fffbeb", category:"para", badge:"", desc:"Drug mechanisms and applications.", subparts:[{title:"General Pharmacology",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Autonomic Pharmacology",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Cardiovascular Drugs",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Antibiotics",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"CNS Pharmacology",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Endocrine Pharmacology",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"NSAIDs & Analgesics",slides:10,price:"$1.00",old:"$9.99",rating:4.8}] },
    { id:5, name:"Biochemistry", icon:"fa-solid fa-flask", color:"#10b981", bg:"#f0fdf4", category:"basic", badge:"new", desc:"Metabolic pathways and enzymes.", subparts:[{title:"Carbohydrate Metabolism",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Lipid Metabolism",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Protein & Amino Acids",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"Enzyme Kinetics",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Molecular Biology",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Vitamins & Minerals",slides:10,price:"$1.00",old:"$9.99",rating:4.7}] },
    { id:6, name:"Microbiology", icon:"fa-solid fa-virus", color:"#06b6d4", bg:"#ecfeff", category:"para", badge:"", desc:"Bacteria, viruses, fungi, and parasites.", subparts:[{title:"General Bacteriology",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Virology",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Mycology",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"Parasitology",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Immunology Basics",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Clinical Microbiology",slides:10,price:"$1.00",old:"$9.99",rating:4.7}] },
    { id:7, name:"Cardiology", icon:"fa-solid fa-heart", color:"#ef4444", bg:"#fef2f2", category:"clinical", badge:"hot", desc:"Heart diseases and ECG interpretation.", subparts:[{title:"Ischaemic Heart Disease",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Heart Failure",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Arrhythmias & ECG",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Valvular Heart Disease",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Hypertension",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Congenital Heart Disease",slides:10,price:"$1.00",old:"$9.99",rating:4.6}] },
    { id:8, name:"Neurology", icon:"fa-solid fa-brain", color:"#7c3aed", bg:"#fdf4ff", category:"clinical", badge:"new", desc:"Neurological disorders and management.", subparts:[{title:"Stroke & TIA",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Epilepsy",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Dementia & Parkinson's",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Multiple Sclerosis",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Headache Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"CNS Infections",slides:10,price:"$1.00",old:"$9.99",rating:4.8}] },
    { id:9, name:"Surgery", icon:"fa-solid fa-scalpel", color:"#64748b", bg:"#f8fafc", category:"surgery", badge:"", desc:"Surgical principles and operative techniques.", subparts:[{title:"Principles of Surgery",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Wound Management",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"GI Surgery",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Breast Surgery",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"Orthopaedic Surgery",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Trauma & Emergency Surgery",slides:10,price:"$1.00",old:"$9.99",rating:4.8}] },
    { id:10, name:"Paediatrics", icon:"fa-solid fa-baby", color:"#f97316", bg:"#fff7ed", category:"clinical", badge:"", desc:"Child health and childhood diseases.", subparts:[{title:"Growth & Development",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Neonatology",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Paediatric Infections",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Nutrition & Malnutrition",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"Paediatric Cardiology",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Immunisation Schedule",slides:10,price:"$1.00",old:"$9.99",rating:4.9}] },
    { id:11, name:"Gynaecology & Obs.", icon:"fa-solid fa-venus", color:"#ec4899", bg:"#fdf2f8", category:"clinical", badge:"", desc:"Obstetrics and reproductive health.", subparts:[{title:"Normal Labour & Delivery",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"High-Risk Pregnancy",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Menstrual Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Gynaecological Cancers",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Contraception",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"Infertility",slides:10,price:"$1.00",old:"$9.99",rating:4.7}] },
    { id:12, name:"Dermatology", icon:"fa-solid fa-hand-dots", color:"#d946ef", bg:"#fdf4ff", category:"clinical", badge:"new", desc:"Skin diseases and treatments.", subparts:[{title:"Skin Structure & Function",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Eczema & Psoriasis",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Skin Infections",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Skin Tumours",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Autoimmune Skin Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.6}] },
    { id:13, name:"Radiology", icon:"fa-solid fa-x-ray", color:"#0891b2", bg:"#ecfeff", category:"para", badge:"", desc:"Imaging modalities and radiological diagnosis.", subparts:[{title:"X-Ray Interpretation",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"CT Scan Basics",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"MRI Principles",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Ultrasound Imaging",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Nuclear Medicine",slides:10,price:"$1.00",old:"$9.99",rating:4.6}] },
    { id:14, name:"Psychiatry", icon:"fa-solid fa-head-side-brain", color:"#8b5cf6", bg:"#f5f3ff", category:"clinical", badge:"", desc:"Mental health disorders and psychopharmacology.", subparts:[{title:"Schizophrenia Spectrum",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Mood Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Anxiety Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Substance Use Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Personality Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"Child Psychiatry",slides:10,price:"$1.00",old:"$9.99",rating:4.7}] },
    { id:15, name:"Endocrinology", icon:"fa-solid fa-syringe", color:"#059669", bg:"#f0fdf4", category:"clinical", badge:"", desc:"Hormonal disorders and diabetes.", subparts:[{title:"Diabetes Mellitus",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Thyroid Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Adrenal Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Pituitary Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Calcium & Bone Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"Reproductive Endocrinology",slides:10,price:"$1.00",old:"$9.99",rating:4.7}] },
    { id:16, name:"Ophthalmology", icon:"fa-solid fa-eye", color:"#0ea5e9", bg:"#f0f9ff", category:"clinical", badge:"new", desc:"Eye diseases and vision disorders.", subparts:[{title:"Ocular Anatomy",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Glaucoma",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Cataract & Refractive Errors",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Retinal Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Ocular Infections",slides:10,price:"$1.00",old:"$9.99",rating:4.6}] },
    { id:17, name:"ENT", icon:"fa-solid fa-ear-deaf", color:"#dc2626", bg:"#fef2f2", category:"surgery", badge:"", desc:"Ear, nose, throat and head & neck surgery.", subparts:[{title:"Ear Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Nasal & Sinus Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Throat & Laryngeal Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Head & Neck Tumours",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Vertigo & Balance Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.6}] }
  ];
    list = defaultList;
    saveAllSubjects(defaultList);
  }

  // Normalize prices to $1.00 worldwide affordable rate
  let modified = false;
  list.forEach(s => {
    if (s.subparts && Array.isArray(s.subparts)) {
      s.subparts.forEach(sp => {
        if (!sp.price || sp.price === "$4.99" || sp.price === "4.99") {
          sp.price = "$1.00";
          modified = true;
        }
        if (sp.old === "$9.99") {
          sp.old = "$4.99";
          modified = true;
        }
      });
    }
  });
  if (modified) {
    saveAllSubjects(list);
  }
  return list;
}

function saveAllSubjects(subjects) {
  localStorage.setItem("mlthub_db_subjects", JSON.stringify(subjects));
}

// =============================================
//   PPT PRESENTATION & 10 SLIDES EDITOR ENGINE
// =============================================

function generateDefault10Slides(pptTitle, emoji) {
  return [
    { title: `Introduction to ${pptTitle}`, icon: emoji || "📋", body: "Overview and scope:\n• Historical background & clinical relevance\n• Key medical definitions & anatomy\n• Core objectives for clinical revision" },
    { title: "Epidemiology & Etiology", icon: "📊", body: "Demographics & risk factors:\n• Global disease burden & prevalence\n• Genetic and environmental factors\n• High-risk patient populations" },
    { title: "Pathophysiology & Disease Mechanism", icon: "🔬", body: "Pathological progression:\n• Cellular and tissue changes\n• Molecular signaling pathways\n• Organ-level manifestations" },
    { title: "Clinical Presentation & Symptoms", icon: "🩺", body: "Patient symptoms & signs:\n• Hallmark classical symptoms\n• Early vs late disease manifestations\n• Physical examination findings" },
    { title: "Diagnostic Workup & Lab Investigations", icon: "🧪", body: "Key investigations:\n• Baseline hematology and biochemical markers\n• Gold standard diagnostic tests\n• Diagnostic accuracy & interpretation" },
    { title: "Imaging Modalities & Findings", icon: "🩻", body: "Radiological features:\n• Plain radiograph / Ultrasound findings\n• CT / MRI diagnostic criteria\n• Characteristic imaging signs" },
    { title: "Differential Diagnosis & Red Flags", icon: "⚠️", body: "Key differentials:\n• Mimicking clinical presentations\n• High-stakes red flag symptoms\n• Exclusion strategies and algorithms" },
    { title: "Medical Management & Pharmacotherapy", icon: "💊", body: "First-line treatments:\n• Drug classes, mechanisms & dosage\n• Side-effect profiles & monitoring\n• Second-line treatment alternatives" },
    { title: "Surgical / Procedural Interventions", icon: "🔪", body: "Procedural indications:\n• Timing and criteria for intervention\n• Surgical approaches overview\n• Pre- and post-operative management" },
    { title: "Prognosis, Follow-Up & Clinical Pearls", icon: "⭐", body: "Patient outcomes:\n• Long-term survival & recovery rates\n• Monitoring for recurrence or complications\n• High-yield exam pearls & mnemonics" }
  ];
}

function initPptEditor() {
  populatePptSubjectDropdowns();
  renderPptEditorList();
}

function populatePptSubjectDropdowns() {
  const subjects = getAllSubjects();
  const filterSelect = document.getElementById("pptEditorSubjectFilter");
  const modalSelect = document.getElementById("modalPptSubjectSelect");

  if (!filterSelect || !modalSelect) return;

  const currentVal = filterSelect.value || (subjects[0] ? subjects[0].id : 1);
  const optionsHtml = subjects.map(s => `<option value="${s.id}">${s.name} (${s.subparts ? s.subparts.length : 0} PPTs)</option>`).join("");

  filterSelect.innerHTML = optionsHtml;
  modalSelect.innerHTML = subjects.map(s => `<option value="${s.id}">${s.name}</option>`).join("");

  filterSelect.value = currentVal;
}

function renderPptEditorList() {
  const filterSelect = document.getElementById("pptEditorSubjectFilter");
  if (!filterSelect) return;

  const subjectId = parseInt(filterSelect.value) || 1;
  const subjects = getAllSubjects();
  const subj = subjects.find(s => s.id === subjectId) || subjects[0];
  const container = document.getElementById("pptPresentationList");
  const countLabel = document.getElementById("pptCountLabel");

  if (!subj || !subj.subparts) {
    if (container) container.innerHTML = `<p style="font-size:.75rem;color:var(--muted);text-align:center;">No presentations found.</p>`;
    return;
  }

  if (countLabel) countLabel.textContent = `${subj.name} Presentations (${subj.subparts.length})`;

  container.innerHTML = subj.subparts.map((p, idx) => `
    <div class="subj-manager-item" style="border-left: 3px solid ${subj.color || '#2563eb'};">
      <div class="subj-manager-left">
        <div class="subj-manager-icon" style="background:${subj.bg || '#eff6ff'};color:${subj.color || '#2563eb'};">
          <i class="fa-solid fa-file-powerpoint"></i>
        </div>
        <div>
          <div class="subj-manager-name">
            ${p.title}
            ${p.fileName ? `<span class="badge-file-attached" title="${p.fileName}"><i class="fa-solid fa-paperclip"></i> ${p.fileSize || 'PPTX Attached'}</span>` : ''}
          </div>
          <div class="subj-manager-sub">${p.slides || 10} slides · ${p.price || '$1.00'} · ⭐ ${p.rating || '4.9'}</div>
        </div>
      </div>
      <div style="display:flex;gap:.35rem;">
        ${p.fileId ? `<button class="icon-btn" onclick="testDownloadPptFileDirect('${p.fileId}', '${p.fileName}')" title="Download Attached File (${p.fileName})" style="background:rgba(245,158,11,.2);color:#fbbf24;"><i class="fa-solid fa-download"></i></button>` : ''}
        <button class="icon-btn" onclick="openEditPptModal(${subj.id}, ${idx})" title="Edit Slides & Details" style="background:rgba(37,99,235,.2);color:#60a5fa;"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="icon-btn icon-btn-danger" onclick="deletePptItem(${subj.id}, ${idx})" title="Delete PPT"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
  `).join("");
}

// --- Trigger Upload from Phone / Laptop Media ---
function triggerPptUploadFromMedia() {
  switchMode('pptEditor', document.querySelector('.mode-tab[onclick*="pptEditor"]'));
  const input = document.getElementById("pptDeviceMediaInput");
  if (input) {
    input.value = "";
    input.click();
  }
}

// Handle Drag and Drop for Upload Card
function handleDragOverPpt(e) {
  e.preventDefault();
  const card = document.querySelector(".ppt-media-upload-card");
  if (card) card.classList.add("drag-over");
}
function handleDragLeavePpt(e) {
  e.preventDefault();
  const card = document.querySelector(".ppt-media-upload-card");
  if (card) card.classList.remove("drag-over");
}
function handleDropPpt(e) {
  e.preventDefault();
  const card = document.querySelector(".ppt-media-upload-card");
  if (card) card.classList.remove("drag-over");
  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
    handlePptDeviceFileSelected(e.dataTransfer.files);
  }
}

// Handle File Selected from Phone or Laptop
async function handlePptDeviceFileSelected(files) {
  if (!files || !files.length) return;
  const file = files[0];

  showSuiteToast(`⏳ Reading & saving "${file.name}"...`, "info");

  try {
    let fileRecord = {
      fileId: 'ppt_file_' + Date.now(),
      fileName: file.name,
      fileSize: formatFileSize(file.size),
      sizeBytes: file.size,
      fileType: file.type || 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    };

    if (window.MLTFilesDB && window.MLTFilesDB.saveFile) {
      fileRecord = await window.MLTFilesDB.saveFile(file);
    }

    const filterSelect = document.getElementById("pptEditorSubjectFilter");
    const subjectId = parseInt(filterSelect ? filterSelect.value : 1) || 1;
    const cleanTitle = (window.MLTFilesDB && window.MLTFilesDB.cleanTitleFromFileName)
      ? window.MLTFilesDB.cleanTitleFromFileName(file.name)
      : file.name.replace(/\.[^/.]+$/, "").replace(/[_\-]+/g, " ");

    const slides = (window.MLTFilesDB && window.MLTFilesDB.generateSlidesForTitle)
      ? window.MLTFilesDB.generateSlidesForTitle(cleanTitle, '📋')
      : generateDefault10Slides(cleanTitle, '📋');

    currentEditingPpt = {
      isNew: true,
      subjectId: subjectId,
      subpartIndex: -1,
      title: cleanTitle,
      price: "$1.00",
      old: "$9.99",
      rating: 4.9,
      fileId: fileRecord.fileId,
      fileName: fileRecord.fileName,
      fileSize: fileRecord.fileSize,
      fileType: fileRecord.fileType,
      slides: slides
    };
    activeSlideIndex = 0;

    document.getElementById("pptModalTitle").textContent = `➕ Add PPT: ${cleanTitle}`;
    document.getElementById("modalPptSubjectSelect").value = subjectId;
    document.getElementById("modalPptTitle").value = cleanTitle;
    document.getElementById("modalPptPrice").value = "$1.00";
    document.getElementById("modalPptOldPrice").value = "$9.99";
    document.getElementById("modalPptRating").value = "4.9";

    updateModalAttachmentView();
    renderModalSlideTabs();
    loadActiveSlideToEditor();
    document.getElementById("pptSlideModal").style.display = "flex";

    showSuiteToast(`✓ "${file.name}" attached successfully! Review & save.`, "success");
  } catch (err) {
    console.error("Error reading presentation file:", err);
    showSuiteToast("Could not read file from device storage.", "error");
  }
}

// In-Modal Media Upload Triggers
function triggerModalMediaUpload() {
  const input = document.getElementById("modalMediaFileInput");
  if (input) {
    input.value = "";
    input.click();
  }
}

async function handleModalMediaFileSelected(files) {
  if (!files || !files.length || !currentEditingPpt) return;
  const file = files[0];

  showSuiteToast(`⏳ Attaching "${file.name}"...`, "info");
  try {
    let fileRecord = {
      fileId: 'ppt_file_' + Date.now(),
      fileName: file.name,
      fileSize: formatFileSize(file.size),
      sizeBytes: file.size,
      fileType: file.type || 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    };

    if (window.MLTFilesDB && window.MLTFilesDB.saveFile) {
      fileRecord = await window.MLTFilesDB.saveFile(file);
    }

    currentEditingPpt.fileId = fileRecord.fileId;
    currentEditingPpt.fileName = fileRecord.fileName;
    currentEditingPpt.fileSize = fileRecord.fileSize;
    currentEditingPpt.fileType = fileRecord.fileType;

    // Auto-fill title if empty
    const titleInput = document.getElementById("modalPptTitle");
    if (!titleInput.value.trim()) {
      const cleanTitle = (window.MLTFilesDB && window.MLTFilesDB.cleanTitleFromFileName)
        ? window.MLTFilesDB.cleanTitleFromFileName(file.name)
        : file.name.replace(/\.[^/.]+$/, "");
      titleInput.value = cleanTitle;
      currentEditingPpt.title = cleanTitle;
    }

    updateModalAttachmentView();
    showSuiteToast(`✓ Attached "${file.name}" (${fileRecord.fileSize})`, "success");
  } catch (err) {
    console.error("Attachment error:", err);
    showSuiteToast("Failed to attach presentation file.", "error");
  }
}

function updateModalAttachmentView() {
  const emptyView = document.getElementById("attachmentEmptyView");
  const filledView = document.getElementById("attachmentFilledView");
  const nameEl = document.getElementById("modalAttachedFileName");
  const metaEl = document.getElementById("modalAttachedFileMeta");

  if (!emptyView || !filledView) return;

  if (currentEditingPpt && currentEditingPpt.fileId) {
    emptyView.style.display = "none";
    filledView.style.display = "flex";
    if (nameEl) nameEl.textContent = currentEditingPpt.fileName || "Presentation.pptx";
    if (metaEl) metaEl.textContent = `${currentEditingPpt.fileSize || "Ready"} · Ready for student downloads`;
  } else {
    emptyView.style.display = "flex";
    filledView.style.display = "none";
  }
}

async function testDownloadModalFile() {
  if (currentEditingPpt && currentEditingPpt.fileId) {
    if (window.MLTFilesDB && window.MLTFilesDB.downloadFile) {
      await window.MLTFilesDB.downloadFile(currentEditingPpt.fileId, currentEditingPpt.fileName);
    } else {
      alert("Downloading " + currentEditingPpt.fileName);
    }
  }
}

async function testDownloadPptFileDirect(fileId, fileName) {
  if (window.MLTFilesDB && window.MLTFilesDB.downloadFile) {
    await window.MLTFilesDB.downloadFile(fileId, fileName);
  } else {
    alert("Downloading " + fileName);
  }
}

function removeModalAttachedFile() {
  if (currentEditingPpt) {
    currentEditingPpt.fileId = null;
    currentEditingPpt.fileName = null;
    currentEditingPpt.fileSize = null;
    currentEditingPpt.fileType = null;
    updateModalAttachmentView();
    showSuiteToast("Attached presentation file removed.", "info");
  }
}

function openCreateNewPptModal() {
  const filterSelect = document.getElementById("pptEditorSubjectFilter");
  const subjectId = parseInt(filterSelect ? filterSelect.value : 1) || 1;
  const subjects = getAllSubjects();
  const subj = subjects.find(s => s.id === subjectId) || subjects[0];

  currentEditingPpt = {
    isNew: true,
    subjectId: subjectId,
    subpartIndex: -1,
    title: "",
    price: "$1.00",
    old: "$9.99",
    rating: 4.9,
    fileId: null,
    fileName: null,
    fileSize: null,
    fileType: null,
    slides: generateDefault10Slides("New Medical Topic", "📋")
  };
  activeSlideIndex = 0;

  document.getElementById("pptModalTitle").textContent = "➕ Create New PPT Presentation";
  document.getElementById("modalPptSubjectSelect").value = subjectId;
  document.getElementById("modalPptTitle").value = "";
  document.getElementById("modalPptPrice").value = "$1.00";
  document.getElementById("modalPptOldPrice").value = "$9.99";
  document.getElementById("modalPptRating").value = "4.9";

  updateModalAttachmentView();
  renderModalSlideTabs();
  loadActiveSlideToEditor();
  document.getElementById("pptSlideModal").style.display = "flex";
}

function openEditPptModal(subjectId, subpartIndex) {
  const subjects = getAllSubjects();
  const subj = subjects.find(s => s.id === subjectId);
  if (!subj || !subj.subparts[subpartIndex]) return;

  const ppt = subj.subparts[subpartIndex];
  const slides = (ppt.slidesData && ppt.slidesData.length)
    ? JSON.parse(JSON.stringify(ppt.slidesData))
    : generateDefault10Slides(ppt.title, "📋");

  currentEditingPpt = {
    isNew: false,
    subjectId: subjectId,
    subpartIndex: subpartIndex,
    title: ppt.title,
    price: ppt.price || "$1.00",
    old: ppt.old || "$9.99",
    rating: ppt.rating || 4.9,
    fileId: ppt.fileId || null,
    fileName: ppt.fileName || null,
    fileSize: ppt.fileSize || null,
    fileType: ppt.fileType || null,
    slides: slides
  };
  activeSlideIndex = 0;

  document.getElementById("pptModalTitle").textContent = `✏️ Edit: ${ppt.title}`;
  document.getElementById("modalPptSubjectSelect").value = subjectId;
  document.getElementById("modalPptTitle").value = ppt.title;
  document.getElementById("modalPptPrice").value = ppt.price || "$1.00";
  document.getElementById("modalPptOldPrice").value = ppt.old || "$9.99";
  document.getElementById("modalPptRating").value = ppt.rating || "4.9";

  updateModalAttachmentView();
  renderModalSlideTabs();
  loadActiveSlideToEditor();
  document.getElementById("pptSlideModal").style.display = "flex";
}

function renderModalSlideTabs() {
  if (!currentEditingPpt || !currentEditingPpt.slides) return;
  const container = document.getElementById("modalSlideTabs");

  container.innerHTML = currentEditingPpt.slides.map((s, idx) => `
    <button class="slide-tab-chip ${idx === activeSlideIndex ? 'active' : ''}" onclick="selectActiveSlide(${idx})">
      <span>${s.icon || '📋'} Slide ${idx + 1}</span>
      <span style="font-size:.65rem;opacity:.7;">${(s.title || '').substring(0, 10)}...</span>
    </button>
  `).join("");
}

function selectActiveSlide(idx) {
  activeSlideIndex = idx;
  renderModalSlideTabs();
  loadActiveSlideToEditor();
}

function loadActiveSlideToEditor() {
  if (!currentEditingPpt || !currentEditingPpt.slides[activeSlideIndex]) return;
  const slide = currentEditingPpt.slides[activeSlideIndex];

  document.getElementById("activeSlideLabel").textContent = `Slide ${activeSlideIndex + 1} of ${currentEditingPpt.slides.length}`;
  document.getElementById("activeSlideTitle").value = slide.title || "";
  document.getElementById("activeSlideIcon").value = slide.icon || "📋";
  document.getElementById("activeSlideBody").value = slide.body || "";

  updateSlidePreviewCard();
}

function updateActiveSlideContent() {
  if (!currentEditingPpt || !currentEditingPpt.slides[activeSlideIndex]) return;

  const title = document.getElementById("activeSlideTitle").value;
  const icon = document.getElementById("activeSlideIcon").value;
  const body = document.getElementById("activeSlideBody").value;

  currentEditingPpt.slides[activeSlideIndex].title = title;
  currentEditingPpt.slides[activeSlideIndex].icon = icon;
  currentEditingPpt.slides[activeSlideIndex].body = body;

  renderModalSlideTabs();
  updateSlidePreviewCard();
}

function updateSlidePreviewCard() {
  if (!currentEditingPpt || !currentEditingPpt.slides[activeSlideIndex]) return;
  const slide = currentEditingPpt.slides[activeSlideIndex];

  document.getElementById("prevCardNum").textContent = `SLIDE ${activeSlideIndex + 1} OF ${currentEditingPpt.slides.length}`;
  document.getElementById("prevCardIcon").textContent = slide.icon || "📋";
  document.getElementById("prevCardTitle").textContent = slide.title || "Untitled Slide";

  const bodyHtml = (slide.body || "").includes("\n")
    ? "<ul>" + slide.body.split("\n").filter(l => l.trim()).map(l => `<li>${l.replace(/^[•\-]\s*/, "")}</li>`).join("") + "</ul>"
    : `<p>${slide.body || "No slide content added yet."}</p>`;

  document.getElementById("prevCardBody").innerHTML = bodyHtml;
}

function addNewSlideToCurrentPpt() {
  if (!currentEditingPpt) return;
  const num = currentEditingPpt.slides.length + 1;
  currentEditingPpt.slides.push({
    title: `Slide ${num}: Key Concept`,
    icon: "📌",
    body: "• Important clinical bullet point\n• Diagnosis and management note"
  });
  activeSlideIndex = currentEditingPpt.slides.length - 1;
  renderModalSlideTabs();
  loadActiveSlideToEditor();
}

function deleteCurrentSlide() {
  if (!currentEditingPpt || currentEditingPpt.slides.length <= 1) {
    alert("A presentation must have at least one slide.");
    return;
  }
  if (confirm(`Delete Slide ${activeSlideIndex + 1}?`)) {
    currentEditingPpt.slides.splice(activeSlideIndex, 1);
    if (activeSlideIndex >= currentEditingPpt.slides.length) {
      activeSlideIndex = currentEditingPpt.slides.length - 1;
    }
    renderModalSlideTabs();
    loadActiveSlideToEditor();
  }
}

function saveCurrentPptModal() {
  if (!currentEditingPpt) return;

  const targetSubjectId = parseInt(document.getElementById("modalPptSubjectSelect").value);
  const title = document.getElementById("modalPptTitle").value.trim();
  const price = document.getElementById("modalPptPrice").value.trim() || "$1.00";
  const oldPrice = document.getElementById("modalPptOldPrice").value.trim() || "$9.99";
  const rating = parseFloat(document.getElementById("modalPptRating").value) || 4.9;

  if (!title) {
    alert("Please enter a presentation title.");
    return;
  }

  const subjects = getAllSubjects();
  const subj = subjects.find(s => s.id === targetSubjectId);
  if (!subj) {
    alert("Selected subject not found.");
    return;
  }

  if (!subj.subparts) subj.subparts = [];

  const newPptData = {
    title: title,
    slides: currentEditingPpt.slides.length,
    price: price,
    old: oldPrice,
    rating: rating,
    fileId: currentEditingPpt.fileId || null,
    fileName: currentEditingPpt.fileName || null,
    fileSize: currentEditingPpt.fileSize || null,
    fileType: currentEditingPpt.fileType || null,
    isOriginalFile: !!currentEditingPpt.fileId,
    isLocked: !!currentEditingPpt.fileId,
    uploadedAt: new Date().toISOString(),
    slidesData: currentEditingPpt.slides
  };

  if (currentEditingPpt.isNew) {
    subj.subparts.push(newPptData);
  } else {
    // If subject was changed
    if (currentEditingPpt.subjectId !== targetSubjectId) {
      const origSubj = subjects.find(s => s.id === currentEditingPpt.subjectId);
      if (origSubj && origSubj.subparts) {
        origSubj.subparts.splice(currentEditingPpt.subpartIndex, 1);
      }
      subj.subparts.push(newPptData);
    } else {
      subj.subparts[currentEditingPpt.subpartIndex] = newPptData;
    }
  }

  saveAllSubjects(subjects);
  closePptModalEditor();
  populatePptSubjectDropdowns();
  renderPptEditorList();
  showSuiteToast(`✓ Presentation "${title}" saved with ${newPptData.slides} slides!`, "success");
  syncLivePreview();
}

function closePptModalEditor() {
  document.getElementById("pptSlideModal").style.display = "none";
  currentEditingPpt = null;
}

function deletePptItem(subjectId, subpartIndex) {
  const subjects = getAllSubjects();
  const subj = subjects.find(s => s.id === subjectId);
  if (!subj || !subj.subparts[subpartIndex]) return;

  const pptTitle = subj.subparts[subpartIndex].title;
  if (confirm(`Are you sure you want to delete presentation "${pptTitle}"?`)) {
    subj.subparts.splice(subpartIndex, 1);
    saveAllSubjects(subjects);
    renderPptEditorList();
    showSuiteToast(`Deleted presentation "${pptTitle}"`, "error");
    syncLivePreview();
  }
}

// --- FAQ Editor ---
function renderFaqEditor() {
  const container = document.getElementById("faqListEditor");
  const items = suiteContentDraft.faqSection?.items || [];
  container.innerHTML = items.map((item, idx) => `
    <div style="background:rgba(255,255,255,.03);padding:.75rem;border-radius:8px;border:1px solid var(--border);margin-bottom:.5rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.4rem;">
        <span style="font-size:.75rem;font-weight:700;color:#93c5fd;">Question #${idx+1}</span>
        <button class="icon-btn icon-btn-danger" onclick="deleteFaqItem(${idx})" title="Delete FAQ"><i class="fa-solid fa-trash"></i></button>
      </div>
      <div class="field-group" style="margin-bottom:.4rem;"><label>Question</label><input type="text" value="${item.q}" oninput="updateFaqItem(${idx},'q',this.value)"/></div>
      <div class="field-group"><label>Answer</label><textarea rows="2" oninput="updateFaqItem(${idx},'a',this.value)">${item.a}</textarea></div>
    </div>
  `).join("");
}

function updateFaqItem(idx, field, val) {
  if (!suiteContentDraft.faqSection.items[idx]) return;
  suiteContentDraft.faqSection.items[idx][field] = val;
  markDirty();
  syncLivePreview();
}

function addNewFaqItem() {
  if (!suiteContentDraft.faqSection) suiteContentDraft.faqSection = { items: [] };
  suiteContentDraft.faqSection.items.push({ q: "New Question Title", a: "Answer text goes here..." });
  markDirty();
  renderFaqEditor();
  syncLivePreview();
}

function deleteFaqItem(idx) {
  suiteContentDraft.faqSection.items.splice(idx, 1);
  markDirty();
  renderFaqEditor();
  syncLivePreview();
}

// --- How It Works Editor ---
function renderHowItWorksAccordion() {
  const container = document.getElementById("accHowItWorks");
  const steps = suiteContentDraft.howSection?.steps || [];
  container.innerHTML = steps.map((s, idx) => `
    <div style="margin-bottom:.75rem;padding:.75rem;background:rgba(255,255,255,.03);border-radius:8px;border:1px solid var(--border);">
      <div style="font-size:.75rem;font-weight:700;color:#a7f3d0;margin-bottom:.4rem;">Step ${s.num}</div>
      <div class="field-group" style="margin-bottom:.4rem;"><label>Title</label><input type="text" value="${s.title}" oninput="updateHowStep(${idx},'title',this.value)"/></div>
      <div class="field-group"><label>Description</label><textarea rows="2" oninput="updateHowStep(${idx},'desc',this.value)">${s.desc}</textarea></div>
    </div>
  `).join("");
}

function updateHowStep(idx, field, val) {
  suiteContentDraft.howSection.steps[idx][field] = val;
  markDirty();
  syncLivePreview();
}

// --- Subjects Manager ---
function renderSubjectsManager() {
  const subjects = getAllSubjects();
  const container = document.getElementById("suiteSubjectsList");

  if (!container) return;

  container.innerHTML = subjects.map(s => `
    <div class="subj-manager-item">
      <div class="subj-manager-left">
        <div class="subj-manager-icon" style="background:${s.bg || '#eff6ff'};color:${s.color || '#2563eb'};"><i class="${s.icon}"></i></div>
        <div>
          <div class="subj-manager-name">${s.name}</div>
          <div class="subj-manager-sub">${s.subparts ? s.subparts.length : 0} PPTs · ${s.category}</div>
        </div>
      </div>
      <div style="display:flex;gap:.3rem;">
        <button class="icon-btn icon-btn-danger" onclick="deleteSuiteSubject(${s.id})"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
  `).join("");
}

function openSuiteAddSubjectModal() {
  const name = prompt("Enter new Subject Name (e.g. Immunology):");
  if (!name) return;
  const subjects = getAllSubjects();
  const newId = subjects.length ? Math.max(...subjects.map(s => s.id)) + 1 : 1;
  const newSubj = {
    id: newId,
    name: name,
    icon: "fa-solid fa-book-medical",
    category: "basic",
    color: "#2563eb",
    bg: "#eff6ff",
    badge: "new",
    desc: `Comprehensive presentation library for ${name}.`,
    subparts: [
      {
        title: `${name} Fundamentals`,
        slides: 10,
        price: "$1.00",
        old: "$9.99",
        rating: 4.8,
        slidesData: generateDefault10Slides(`${name} Fundamentals`, "🔬")
      }
    ]
  };
  subjects.push(newSubj);
  saveAllSubjects(subjects);
  renderSubjectsManager();
  populatePptSubjectDropdowns();
  showSuiteToast("✓ New subject added successfully!", "success");
  syncLivePreview();
}

function deleteSuiteSubject(id) {
  if (confirm("Delete this subject and all its presentations?")) {
    let subjects = getAllSubjects();
    subjects = subjects.filter(s => s.id !== id);
    saveAllSubjects(subjects);
    renderSubjectsManager();
    populatePptSubjectDropdowns();
    showSuiteToast("Subject deleted", "error");
    syncLivePreview();
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

  if (!suiteContentDraft.customSections) suiteContentDraft.customSections = [];
  suiteContentDraft.customSections.push(newSec);
  markDirty();
  renderCustomSectionsList();
  syncLivePreview();

  document.getElementById("customSecTitle").value = "";
  document.getElementById("customSecSubtitle").value = "";
  showSuiteToast("✓ Custom section added to page!", "success");
}

function renderCustomSectionsList() {
  const container = document.getElementById("customSectionsList");
  if (!container) return;
  const list = suiteContentDraft.customSections || [];
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
  suiteContentDraft.customSections.splice(idx, 1);
  markDirty();
  renderCustomSectionsList();
  syncLivePreview();
}

// --- Admins Manager ---
function renderAdminUsersManager() {
  const container = document.getElementById("suiteAdminUsersList");
  if (!container) return;
  const users = window.MLTStudio.getUsers();

  container.innerHTML = users.map(u => `
    <div style="background:rgba(255,255,255,.04);padding:.65rem;border-radius:8px;border:1px solid var(--border);margin-bottom:.4rem;">
      <div style="font-weight:700;font-size:.85rem;color:white;">${u.name}</div>
      <div style="font-size:.75rem;color:var(--muted);">${u.email} · ${u.role}</div>
    </div>
  `).join("");
}

function createNewAdminInSuite() {
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
    showSuiteToast("✓ New Admin account created!", "success");
  } catch (err) {
    alert(err.message);
  }
}

function resetSuiteToDefaults() {
  if (confirm("Reset ALL site text, headers, and colors back to original factory defaults?")) {
    suiteContentDraft = window.MLTStudio.resetToDefaults();
    bindDraftToFormFields();
    renderFaqEditor();
    renderHowItWorksAccordion();
    markClean();
    syncLivePreview();
    showSuiteToast("Reset to factory defaults", "info");
  }
}

function handleSuiteLogout() {
  if (confirm("Logout from Admin Suite?")) {
    window.MLTStudio.logout();
    window.location.href = "login.html";
  }
}

function showSuiteToast(msg, type = "") {
  const t = document.getElementById("suiteToast");
  t.textContent = msg;
  t.className = "studio-toast " + type + " show";
  setTimeout(() => { t.className = "studio-toast"; }, 3500);
}

// Listen to in-subject updates from live preview
window.addEventListener("message", e => {
  if (e.data && e.data.type === "MLT_SUBJECT_UPDATED") {
    if (e.data.subjects) {
      saveAllSubjects(e.data.subjects);
      populatePptSubjectDropdowns();
      renderPptEditorList();
    }
  }
});

// --- Suite Payment Gateways Configuration ---
function initSuitePaymentSettings() {
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

    if (document.getElementById("suiteEpNumber")) document.getElementById("suiteEpNumber").value = cfg.epNumber || "";
    if (document.getElementById("suiteJcNumber")) document.getElementById("suiteJcNumber").value = cfg.jcNumber || "";
    if (document.getElementById("suitePaypalEmail")) document.getElementById("suitePaypalEmail").value = cfg.paypalEmail || "";
    if (document.getElementById("suiteBankName")) document.getElementById("suiteBankName").value = cfg.bankName || "";
    if (document.getElementById("suiteBankTitle")) document.getElementById("suiteBankTitle").value = cfg.bankTitle || "";
    if (document.getElementById("suiteBankIban")) document.getElementById("suiteBankIban").value = cfg.bankIban || "";
    if (document.getElementById("suiteBankRaast")) document.getElementById("suiteBankRaast").value = cfg.bankRaast || "";
  } catch(e) {}
}

function saveSuitePaymentConfig() {
  const cfg = {
    epNumber: document.getElementById("suiteEpNumber")?.value.trim() || "",
    jcNumber: document.getElementById("suiteJcNumber")?.value.trim() || "",
    paypalEmail: document.getElementById("suitePaypalEmail")?.value.trim() || "",
    bankName: document.getElementById("suiteBankName")?.value.trim() || "",
    bankTitle: document.getElementById("suiteBankTitle")?.value.trim() || "",
    bankIban: document.getElementById("suiteBankIban")?.value.trim() || "",
    bankRaast: document.getElementById("suiteBankRaast")?.value.trim() || ""
  };
  localStorage.setItem("mlthub_payment_config", JSON.stringify(cfg));
  showSuiteToast("✓ Payment Gateway settings saved!", "success");
}

