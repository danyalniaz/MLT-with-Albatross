// =============================================
//   MLThub – dashboard.js  |  by Albatross
// =============================================

// ---- Shared subjects data (abbreviated for dashboard) ----
const dbSubjects = [
  { id:1, name:"Anatomy", icon:"fa-solid fa-bone", color:"#ef4444", bg:"#fef2f2", category:"basic",
    subparts:[{title:"Upper Limb Anatomy"},{title:"Lower Limb Anatomy"},{title:"Thorax & Mediastinum"},{title:"Abdomen & Pelvis"},{title:"Head & Neck Anatomy"},{title:"Neuroanatomy Basics"},{title:"Histology Overview"},{title:"Embryology Essentials"}]},
  { id:2, name:"Physiology", icon:"fa-solid fa-heart-pulse", color:"#2563eb", bg:"#eff6ff", category:"basic",
    subparts:[{title:"Cardiovascular Physiology"},{title:"Respiratory Physiology"},{title:"Renal Physiology"},{title:"Neurophysiology"},{title:"Endocrine Physiology"},{title:"GI Physiology"}]},
  { id:3, name:"Pathology", icon:"fa-solid fa-microscope", color:"#7c3aed", bg:"#fdf4ff", category:"para",
    subparts:[{title:"General Pathology"},{title:"Cell Injury & Death"},{title:"Inflammation & Repair"},{title:"Neoplasia"},{title:"Cardiovascular Pathology"}]},
  { id:4, name:"Pharmacology", icon:"fa-solid fa-pills", color:"#f59e0b", bg:"#fffbeb", category:"para",
    subparts:[{title:"General Pharmacology"},{title:"Autonomic Pharmacology"},{title:"Cardiovascular Drugs"},{title:"Antibiotics"},{title:"CNS Pharmacology"}]},
  { id:5, name:"Biochemistry", icon:"fa-solid fa-flask", color:"#10b981", bg:"#f0fdf4", category:"basic",
    subparts:[{title:"Carbohydrate Metabolism"},{title:"Lipid Metabolism"},{title:"Enzyme Kinetics"},{title:"Molecular Biology"}]},
  { id:6, name:"Microbiology", icon:"fa-solid fa-virus", color:"#06b6d4", bg:"#ecfeff", category:"para",
    subparts:[{title:"General Bacteriology"},{title:"Virology"},{title:"Parasitology"},{title:"Immunology Basics"}]},
  { id:7, name:"Cardiology", icon:"fa-solid fa-heart", color:"#ef4444", bg:"#fef2f2", category:"clinical",
    subparts:[{title:"Ischaemic Heart Disease"},{title:"Heart Failure"},{title:"Arrhythmias & ECG"},{title:"Valvular Heart Disease"},{title:"Hypertension"}]},
  { id:8, name:"Neurology", icon:"fa-solid fa-brain", color:"#7c3aed", bg:"#fdf4ff", category:"clinical",
    subparts:[{title:"Stroke & TIA"},{title:"Epilepsy"},{title:"Dementia & Parkinson's"},{title:"Multiple Sclerosis"}]},
  { id:9, name:"Surgery", icon:"fa-solid fa-scalpel", color:"#64748b", bg:"#f8fafc", category:"surgery",
    subparts:[{title:"Principles of Surgery"},{title:"GI Surgery"},{title:"Orthopaedic Surgery"},{title:"Trauma Surgery"}]},
  { id:10, name:"Paediatrics", icon:"fa-solid fa-baby", color:"#f97316", bg:"#fff7ed", category:"clinical",
    subparts:[{title:"Growth & Development"},{title:"Neonatology"},{title:"Immunisation Schedule"}]},
  { id:11, name:"Gynaecology", icon:"fa-solid fa-venus", color:"#ec4899", bg:"#fdf2f8", category:"clinical",
    subparts:[{title:"Normal Labour"},{title:"High-Risk Pregnancy"},{title:"Gynaecological Cancers"}]},
  { id:12, name:"Dermatology", icon:"fa-solid fa-hand-dots", color:"#d946ef", bg:"#fdf4ff", category:"clinical",
    subparts:[{title:"Eczema & Psoriasis"},{title:"Skin Tumours"},{title:"Skin Infections"}]},
  { id:13, name:"Radiology", icon:"fa-solid fa-x-ray", color:"#0891b2", bg:"#ecfeff", category:"para",
    subparts:[{title:"X-Ray Interpretation"},{title:"CT Scan Basics"},{title:"MRI Principles"}]},
  { id:14, name:"Psychiatry", icon:"fa-solid fa-head-side-brain", color:"#8b5cf6", bg:"#f5f3ff", category:"clinical",
    subparts:[{title:"Mood Disorders"},{title:"Schizophrenia"},{title:"Anxiety Disorders"}]},
  { id:15, name:"Endocrinology", icon:"fa-solid fa-syringe", color:"#059669", bg:"#f0fdf4", category:"clinical",
    subparts:[{title:"Diabetes Mellitus"},{title:"Thyroid Disorders"},{title:"Adrenal Disorders"}]},
  { id:16, name:"Ophthalmology", icon:"fa-solid fa-eye", color:"#0ea5e9", bg:"#f0f9ff", category:"clinical",
    subparts:[{title:"Glaucoma"},{title:"Cataract"},{title:"Retinal Disorders"}]},
  { id:17, name:"ENT", icon:"fa-solid fa-ear-deaf", color:"#dc2626", bg:"#fef2f2", category:"surgery",
    subparts:[{title:"Ear Disorders"},{title:"Nasal Disorders"},{title:"Head & Neck Tumours"}]}
];

// ---- My purchased PPTs (sample data + live purchases) ----
let myPurchasedPpts = [
  { id:1, subjectId:1, title:"Upper Limb Anatomy", progress:80, date:"2026-09-10", price:1.00 },
  { id:2, subjectId:2, title:"Cardiovascular Physiology", progress:100, date:"2026-09-08", price:1.00 },
  { id:3, subjectId:7, title:"Arrhythmias & ECG", progress:45, date:"2026-09-15", price:1.00 },
  { id:4, subjectId:3, title:"General Pathology", progress:70, date:"2026-09-12", price:1.00 },
  { id:5, subjectId:4, title:"Antibiotics & Antimicrobials", progress:60, date:"2026-09-20", price:1.00 },
  { id:6, subjectId:8, title:"Stroke & TIA", progress:30, date:"2026-09-25", price:1.00 },
  { id:7, subjectId:5, title:"Enzyme Kinetics", progress:90, date:"2026-09-05", price:1.00 },
  { id:8, subjectId:6, title:"Immunology Basics", progress:55, date:"2026-09-18", price:1.00 },
  { id:9, subjectId:2, title:"Respiratory Physiology", progress:100, date:"2026-09-02", price:1.00 },
  { id:10, subjectId:1, title:"Head & Neck Anatomy", progress:20, date:"2026-10-01", price:1.00 },
  { id:11, subjectId:7, title:"Heart Failure", progress:75, date:"2026-09-28", price:1.00 },
  { id:12, subjectId:9, title:"GI Surgery", progress:40, date:"2026-09-30", price:1.00 }
];

// ---- Wishlist ----
const wishlistPpts = [
  { id:1, subjectId:3, title:"Neoplasia", price:"$1.00" },
  { id:2, subjectId:14, title:"Mood Disorders", price:"$1.00" },
  { id:3, subjectId:10, title:"Neonatology", price:"$1.00" },
  { id:4, subjectId:13, title:"X-Ray Interpretation", price:"$1.00" },
  { id:5, subjectId:15, title:"Diabetes Mellitus", price:"$1.00" }
];

// ---- Orders ----
let orders = [
  { id:"#MLT-2026-0012", title:"GI Surgery", subject:"Surgery", date:"2026-10-01", amount:"$1.00", status:"completed" },
  { id:"#MLT-2026-0011", title:"Heart Failure", subject:"Cardiology", date:"2026-09-28", amount:"$1.00", status:"completed" },
  { id:"#MLT-2026-0010", title:"Head & Neck Anatomy", subject:"Anatomy", date:"2026-10-01", amount:"$1.00", status:"completed" },
  { id:"#MLT-2026-0009", title:"Respiratory Physiology", subject:"Physiology", date:"2026-09-02", amount:"$1.00", status:"completed" },
  { id:"#MLT-2026-0008", title:"Immunology Basics", subject:"Microbiology", date:"2026-09-18", amount:"$1.00", status:"completed" },
  { id:"#MLT-2026-0007", title:"Enzyme Kinetics", subject:"Biochemistry", date:"2026-09-05", amount:"$1.00", status:"completed" },
  { id:"#MLT-2026-0006", title:"Stroke & TIA", subject:"Neurology", date:"2026-09-25", amount:"$1.00", status:"completed" },
  { id:"#MLT-2026-0005", title:"Antibiotics", subject:"Pharmacology", date:"2026-09-20", amount:"$1.00", status:"completed" },
  { id:"#MLT-2026-0004", title:"General Pathology", subject:"Pathology", date:"2026-09-12", amount:"$1.00", status:"completed" },
  { id:"#MLT-2026-0003", title:"Arrhythmias & ECG", subject:"Cardiology", date:"2026-09-15", amount:"$1.00", status:"completed" },
  { id:"#MLT-2026-0002", title:"Cardiovascular Physiology", subject:"Physiology", date:"2026-09-08", amount:"$1.00", status:"completed" },
  { id:"#MLT-2026-0001", title:"Upper Limb Anatomy", subject:"Anatomy", date:"2026-09-10", amount:"$1.00", status:"completed" }
];

function loadLivePurchases() {
  try {
    const raw = localStorage.getItem("mlthub_purchased_ppts");
    if (raw) {
      const items = JSON.parse(raw);
      if (Array.isArray(items)) {
        items.forEach(it => {
          if (it.price === "$4.99" || it.price === 4.99) it.price = "$1.00";
          if (!myPurchasedPpts.some(p => p.title.toLowerCase() === it.title.toLowerCase())) {
            let sId = it.subjectId;
            if (!sId) {
              const matchedSubj = dbSubjects.find(s => s.name.toLowerCase() === (it.subject || "").toLowerCase());
              sId = matchedSubj ? matchedSubj.id : 1;
            }
            myPurchasedPpts.unshift({
              id: "bought_" + Date.now() + Math.random(),
              subjectId: sId,
              title: it.title,
              progress: 0,
              date: it.date || new Date().toISOString().split("T")[0],
              price: 1.00,
              fileId: it.fileId || null,
              fileName: it.fileName || null
            });
          }
        });
      }
    }

    const rawOrders = localStorage.getItem("mlthub_user_orders");
    if (rawOrders) {
      const ords = JSON.parse(rawOrders);
      if (Array.isArray(ords)) {
        ords.forEach(o => {
          if (o.amount === "$4.99") o.amount = "$1.00";
          if (!orders.some(existing => existing.id === o.id || (existing.title === o.title && existing.date === o.date))) {
            orders.unshift(o);
          }
        });
      }
    }
  } catch(e) {}

  // Update badge count in sidebar
  const badgeEl = document.querySelector(".nav-item[onclick*='myPpts'] .nav-badge");
  if (badgeEl) badgeEl.textContent = myPurchasedPpts.length;
}

// ---- Generic slides for PPT viewer ----
const genericSlides = (subjectName, icon) => [
  { icon, title:`Introduction to ${subjectName}`, body:`Overview of ${subjectName}:\n• Historical background and development\n• Importance in medical practice\n• Key concepts and terminology\n• Evidence-based medicine approach` },
  { icon, title:"Epidemiology & Risk Factors", body:"Disease burden:\n• Global and regional statistics\n• Age, gender, and ethnic differences\n• Modifiable risk factors\n• Non-modifiable risk factors\n• Prevention strategies" },
  { icon, title:"Pathophysiology", body:"Disease mechanisms:\n• Normal physiology overview\n• Mechanisms of disease\n• Cellular and molecular changes\n• Organ-level effects\n• Systemic manifestations" },
  { icon, title:"Clinical Presentation", body:"Signs and symptoms:\n• History of presenting complaint\n• Symptom duration and progression\n• Associated symptoms\n• Relevant past medical history\n• Drug history and family history" },
  { icon, title:"Investigations", body:"Diagnostic workup:\n• First-line blood tests and imaging\n• Specific diagnostic tests\n• Interpretation of results\n• Sensitivity vs Specificity\n• Gold standard investigations" },
  { icon, title:"Differential Diagnosis", body:"Key differentials:\n• Common conditions mimicking presentation\n• Red flag features\n• Distinguishing features\n• Clinical reasoning approach\n• Mnemonics for exam revision" },
  { icon, title:"Management: Conservative", body:"Non-pharmacological:\n• Lifestyle modifications\n• Dietary recommendations\n• Exercise and rehabilitation\n• Patient education\n• Monitoring and follow-up" },
  { icon, title:"Management: Medical", body:"Pharmacological treatment:\n• First-line medications\n• Mechanism of action\n• Dosage and administration\n• Side effects and monitoring\n• Drug interactions" },
  { icon, title:"Management: Surgical", body:"Operative management:\n• Indications for surgery\n• Pre-operative assessment\n• Surgical technique overview\n• Post-operative care\n• Complications and management" },
  { icon, title:"Prognosis & Complications", body:"Outcomes:\n• Short-term prognosis\n• Long-term outcomes\n• Prognostic factors\n• Common complications\n• Multidisciplinary team approach" }
];

// ---- State ----
let dbCurrentSlide = 0;
let dbCurrentSlides = [];
let dbCurrentTitle = "";
let wishlistItems = [...wishlistPpts];

// ---- Init ----
document.addEventListener("DOMContentLoaded", () => {
  if (window.MLTDB && window.MLTDB.getSubjects().length) {
    dbSubjects.length = 0;
    dbSubjects.push(...window.MLTDB.getSubjects());
  }
  loadLivePurchases();
  renderOverview();
  renderMyPpts(myPurchasedPpts);
  renderBrowse();
  renderWishlist();
  renderOrders();
  renderAnalytics();
});

// ---- Section Navigation ----
function showSection(name, btn) {
  document.querySelectorAll(".dash-section").forEach(s => s.classList.remove("active"));
  const el = document.getElementById("section-" + name);
  if (el) el.classList.add("active");
  if (btn) {
    document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
    btn.classList.add("active");
  }
  // Close mobile sidebar
  if (window.innerWidth <= 768) {
    document.getElementById("sidebar").classList.remove("mobile-open");
  }
}

// ---- Sidebar Toggle ----
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (window.innerWidth <= 768) {
    sidebar.classList.toggle("mobile-open");
  } else {
    sidebar.classList.toggle("collapsed");
  }
}

// ---- OVERVIEW ----
function renderOverview() {
  renderRecentList();
  renderProgressList();
  renderContinueGrid();
  renderRecommended();
}

function renderRecentList() {
  const recent = [...myPurchasedPpts].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  document.getElementById("recentList").innerHTML = recent.map(p => {
    const subj = dbSubjects.find(s => s.id === p.subjectId);
    return `
      <div class="recent-item" onclick="openDbPpt(${p.subjectId},'${p.title}')">
        <div class="recent-icon" style="background:${subj.bg};color:${subj.color};">
          <i class="${subj.icon}"></i>
        </div>
        <div class="recent-info">
          <div class="recent-title">${p.title}</div>
          <div class="recent-sub">${subj.name} · ${p.progress}% complete</div>
        </div>
        <div class="recent-meta">${p.date}</div>
      </div>`;
  }).join("");
}

function renderProgressList() {
  const subjectProgress = {};
  myPurchasedPpts.forEach(p => {
    if (!subjectProgress[p.subjectId]) subjectProgress[p.subjectId] = [];
    subjectProgress[p.subjectId].push(p.progress);
  });
  const colors = ["#2563eb","#7c3aed","#10b981","#f59e0b","#ef4444","#06b6d4","#ec4899","#8b5cf6"];
  let html = "";
  let colorIdx = 0;
  Object.entries(subjectProgress).slice(0, 6).forEach(([subjId, progresses]) => {
    const subj = dbSubjects.find(s => s.id === parseInt(subjId));
    const avg = Math.round(progresses.reduce((a,b)=>a+b,0)/progresses.length);
    const color = colors[colorIdx++ % colors.length];
    html += `
      <div class="progress-item">
        <div class="progress-header">
          <span class="progress-subject">${subj.name}</span>
          <span class="progress-pct">${avg}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${avg}%;background:${color};"></div>
        </div>
      </div>`;
  });
  document.getElementById("progressList").innerHTML = html;
}

function renderContinueGrid() {
  const inProgress = myPurchasedPpts.filter(p => p.progress > 0 && p.progress < 100).slice(0, 4);
  document.getElementById("continueGrid").innerHTML = inProgress.map(p => {
    const subj = dbSubjects.find(s => s.id === p.subjectId);
    return `
      <div class="ppt-mini-card" onclick="openDbPpt(${p.subjectId},'${p.title}')">
        <div class="ppt-mini-icon" style="background:${subj.bg};color:${subj.color};">
          <i class="${subj.icon}"></i>
        </div>
        <div class="ppt-mini-subject" style="color:${subj.color};">${subj.name}</div>
        <div class="ppt-mini-title">${p.title}</div>
        <div class="ppt-mini-progress">
          <div style="display:flex;justify-content:space-between;font-size:.7rem;color:var(--db-muted);margin-bottom:.3rem;">
            <span>Progress</span><span>${p.progress}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${p.progress}%;background:${subj.color};"></div>
          </div>
        </div>
        <div class="ppt-mini-meta"><span>${10 - Math.floor(p.progress/10)} slides left</span><span>▶ Continue</span></div>
      </div>`;
  }).join("");
}

function renderRecommended() {
  const notOwned = dbSubjects.filter(s => !myPurchasedPpts.some(p => p.subjectId === s.id)).slice(0, 4);
  document.getElementById("recommendedGrid").innerHTML = notOwned.map(s => `
    <div class="ppt-mini-card" onclick="openDbPpt(${s.id},'${s.subparts[0].title}')">
      <div class="ppt-mini-icon" style="background:${s.bg};color:${s.color};">
        <i class="${s.icon}"></i>
      </div>
      <div class="ppt-mini-subject" style="color:${s.color};">${s.name}</div>
      <div class="ppt-mini-title">${s.subparts[0].title}</div>
      <div class="ppt-mini-meta"><span>⭐ 4.8 · 10 slides</span><span style="color:var(--db-primary);font-weight:700;">$1.00</span></div>
    </div>`).join("");
}

// ---- MY PPTs ----
function renderMyPpts(list) {
  document.getElementById("myPptsGrid").innerHTML = list.map(p => {
    const subj = dbSubjects.find(s => s.id === p.subjectId);
    return `
      <div class="myppt-card">
        <div class="myppt-thumb" style="background:linear-gradient(135deg,${subj.color}22,${subj.color}44);">
          <i class="${subj.icon}" style="color:${subj.color};"></i>
        </div>
        <div class="myppt-body">
          <div class="myppt-subject" style="color:${subj.color};">${subj.name}</div>
          <div class="myppt-title">${p.title}</div>
          <div class="myppt-progress">
            <div class="myppt-progress-label">
              <span>Progress</span><span>${p.progress}% · ${Math.ceil(p.progress/10)} of 10 slides</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width:${p.progress}%;background:${subj.color};"></div>
            </div>
          </div>
          <div class="myppt-footer">
            <button class="btn btn-primary btn-sm" style="flex:1;" onclick="openDbPpt(${subj.id},'${p.title}')">
              <i class="fa-solid fa-play"></i> ${p.progress === 100 ? 'Review' : 'Continue'}
            </button>
            <button class="btn btn-outline btn-sm" onclick="downloadDashboardPpt('${p.title}', '${p.fileId || ''}', '${p.fileName || ''}')" title="Download Presentation">
              <i class="fa-solid fa-download"></i>
            </button>
          </div>
        </div>
      </div>`;
  }).join("");
}

function filterMyPpts(type, btn) {
  if (btn) {
    document.querySelectorAll(".page-header .btn-outline").forEach(b => b.classList.remove("btn-primary"));
  }
  let list = myPurchasedPpts;
  if (type === "recent") list = [...myPurchasedPpts].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,6);
  else if (type === "basic") list = myPurchasedPpts.filter(p => {
    const s = dbSubjects.find(x=>x.id===p.subjectId);
    return s && s.category === "basic";
  });
  else if (type === "clinical") list = myPurchasedPpts.filter(p => {
    const s = dbSubjects.find(x=>x.id===p.subjectId);
    return s && s.category === "clinical";
  });
  renderMyPpts(list);
}

// ---- BROWSE ----
function renderBrowse() {
  document.getElementById("browseGrid").innerHTML = dbSubjects.map(s => `
    <div class="browse-subj-card" onclick="openDbPpt(${s.id},'${s.subparts[0].title}')">
      <div class="browse-subj-icon" style="background:${s.bg};color:${s.color};">
        <i class="${s.icon}"></i>
      </div>
      <div class="browse-subj-name">${s.name}</div>
      <div class="browse-subj-count">${s.subparts.length} topics · ${s.subparts.length * 10} slides</div>
    </div>`).join("");
}

// ---- WISHLIST ----
function renderWishlist() {
  document.getElementById("wishlistGrid").innerHTML = wishlistItems.map((p, idx) => {
    const subj = dbSubjects.find(s => s.id === p.subjectId);
    return `
      <div class="myppt-card" id="wish-${idx}">
        <div class="myppt-thumb" style="background:linear-gradient(135deg,${subj.color}22,${subj.color}44);">
          <i class="${subj.icon}" style="color:${subj.color};font-size:2.5rem;"></i>
        </div>
        <div class="myppt-body">
          <div class="myppt-subject" style="color:${subj.color};">${subj.name}</div>
          <div class="myppt-title">${p.title}</div>
          <div style="font-size:.9rem;font-weight:800;color:var(--db-primary);margin:.5rem 0;">${p.price}</div>
          <div class="myppt-footer">
            <button class="btn btn-primary btn-sm" style="flex:1;" onclick="openDbPpt(${subj.id},'${p.title}')">
              <i class="fa-solid fa-eye"></i> Preview
            </button>
            <button class="btn btn-danger btn-sm" onclick="removeFromWishlist(${idx})">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>`;
  }).join("");
  if (!wishlistItems.length) {
    document.getElementById("wishlistGrid").innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--db-muted);"><i class="fa-solid fa-heart-crack" style="font-size:3rem;margin-bottom:1rem;display:block;"></i><p>Your wishlist is empty. Browse the library to add PPTs!</p></div>`;
  }
}

function removeFromWishlist(idx) {
  wishlistItems.splice(idx, 1);
  renderWishlist();
  showToastDB("Removed from wishlist", "info");
}

function addToWishlist() {
  showToastDB("✓ Added to wishlist!", "success");
}

// ---- ORDERS ----
function renderOrders() {
  document.getElementById("ordersTableBody").innerHTML = orders.map(o => `
    <tr>
      <td class="order-id">${o.id}</td>
      <td>
        <strong>${o.title}</strong>
        ${o.paymentMethod ? `<div style="font-size:.72rem;color:var(--db-muted);display:flex;align-items:center;gap:4px;margin-top:2px;"><i class="fa-solid fa-credit-card"></i> ${o.paymentMethod}</div>` : ''}
      </td>
      <td>${o.subject}</td>
      <td>${o.date}</td>
      <td><strong>${o.amount}</strong></td>
      <td><span class="order-status status-${o.status}">${o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span></td>
      <td><button class="btn btn-outline btn-sm" onclick="showToastDB('Downloading receipt for ${o.title}…','info')"><i class="fa-solid fa-download"></i> Receipt</button></td>
    </tr>`).join("");
}

// ---- ANALYTICS ----
function renderAnalytics() {
  // Weekly Bar Chart
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const hours = [1.5, 2.5, 3.0, 2.0, 4.0, 5.5, 3.5];
  const maxH = Math.max(...hours);
  const colors = ["#2563eb","#3b82f6","#7c3aed","#6d28d9","#10b981","#059669","#f59e0b"];
  document.getElementById("weeklyChart").innerHTML = hours.map((h, i) => `
    <div class="bar-group">
      <div class="bar-val">${h}h</div>
      <div class="bar" style="height:${Math.round((h/maxH)*160)}px;background:${colors[i]};" title="${days[i]}: ${h} hours"></div>
      <div class="bar-label">${days[i]}</div>
    </div>`).join("");

  // Donut Chart (SVG)
  const donutData = [
    { label:"Basic Sciences", pct:35, color:"#2563eb" },
    { label:"Clinical", pct:40, color:"#7c3aed" },
    { label:"Para-Clinical", pct:18, color:"#10b981" },
    { label:"Surgery", pct:7, color:"#f59e0b" }
  ];
  const r = 60, cx = 80, cy = 80, circumference = 2 * Math.PI * r;
  let offset = 0;
  const segments = donutData.map(d => {
    const dashArray = (d.pct / 100) * circumference;
    const dashOffset = circumference - offset;
    offset += dashArray;
    return { ...d, dashArray, dashOffset: circumference - (offset - dashArray) };
  });

  document.getElementById("donutChart").innerHTML = `
    <svg class="donut-svg" viewBox="0 0 160 160">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#f1f5f9" stroke-width="20"/>
      ${segments.map(s => `
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${s.color}" stroke-width="20"
          stroke-dasharray="${s.dashArray} ${circumference - s.dashArray}"
          stroke-dashoffset="${s.dashOffset}"
          transform="rotate(-90 ${cx} ${cy})"/>
      `).join("")}
      <text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="middle" font-size="12" font-weight="800" fill="#0f172a">47h</text>
      <text x="${cx}" y="${cy+14}" text-anchor="middle" font-size="8" fill="#64748b">Total</text>
    </svg>
    <div class="donut-legend">
      ${donutData.map(d => `
        <div class="donut-legend-item">
          <div class="donut-dot" style="background:${d.color};"></div>
          <span class="donut-lbl">${d.label}</span>
          <span class="donut-pct">${d.pct}%</span>
        </div>`).join("")}
    </div>`;
}

// ---- PPT VIEWER ----
function openDbPpt(subjectId, title) {
  const subj = dbSubjects.find(s => s.id === subjectId);
  if (!subj) return;
  dbCurrentSlides = genericSlides(title, subj.icon.includes("dna") ? "🧬" : getIconEmoji(subj.icon));
  dbCurrentTitle = title;
  dbCurrentSlide = 0;

  document.getElementById("dbPptHeader").innerHTML = `<h3>${title}</h3><p>${subj.name} · 10 Professional Slides</p>`;
  dbRenderSlide();
  renderDots();
  document.getElementById("dbPptModal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function getIconEmoji(iconClass) {
  const map = { "fa-bone":"🦴","fa-heart-pulse":"❤️","fa-microscope":"🔬","fa-pills":"💊","fa-flask":"🧪",
    "fa-virus":"🦠","fa-heart":"❤️","fa-brain":"🧠","fa-scalpel":"🔪","fa-baby":"👶","fa-venus":"👩‍⚕️",
    "fa-hand-dots":"🧴","fa-x-ray":"🩻","fa-head-side-brain":"🧠","fa-syringe":"💉","fa-eye":"👁️","fa-ear-deaf":"👂" };
  for (const [key, val] of Object.entries(map)) { if (iconClass.includes(key)) return val; }
  return "📋";
}

function dbRenderSlide() {
  const slide = dbCurrentSlides[dbCurrentSlide];
  const bodyHtml = slide.body.includes("\n")
    ? "<ul>" + slide.body.split("\n").filter(l=>l.trim()).map(l=>`<li>${l.replace(/^[•\-]\s*/,"")}</li>`).join("") + "</ul>"
    : `<p>${slide.body}</p>`;
  document.getElementById("dbPptViewer").innerHTML = `
    <div class="db-slide-content">
      <div class="db-slide-num">SLIDE ${dbCurrentSlide+1} OF ${dbCurrentSlides.length}</div>
      <div class="db-slide-icon">${slide.icon}</div>
      <div class="db-slide-title">${slide.title}</div>
      <div class="db-slide-body">${bodyHtml}</div>
    </div>`;
  document.getElementById("dbSlideCounter").textContent = `${dbCurrentSlide+1} / ${dbCurrentSlides.length}`;
  document.getElementById("dbPrevBtn").disabled = dbCurrentSlide === 0;
  document.getElementById("dbNextBtn").disabled = dbCurrentSlide === dbCurrentSlides.length - 1;
  updateDots();
}

function renderDots() {
  document.getElementById("dbSlideDots").innerHTML = dbCurrentSlides.map((_, i) =>
    `<div class="db-dot${i===0?' active':''}" onclick="goToSlide(${i})"></div>`).join("");
}

function updateDots() {
  document.querySelectorAll(".db-dot").forEach((d, i) => d.classList.toggle("active", i === dbCurrentSlide));
}

function goToSlide(idx) { dbCurrentSlide = idx; dbRenderSlide(); }
function dbPrevSlide() { if (dbCurrentSlide > 0) { dbCurrentSlide--; dbRenderSlide(); } }
function dbNextSlide() { if (dbCurrentSlide < dbCurrentSlides.length - 1) { dbCurrentSlide++; dbRenderSlide(); } }
function closeDbPpt(e) { if (e.target === document.getElementById("dbPptModal")) closeDbPptModal(); }
function closeDbPptModal() { document.getElementById("dbPptModal").classList.remove("open"); document.body.style.overflow = ""; }

// ---- Dashboard Search ----
function dashboardSearch() {
  const q = document.getElementById("dashSearch").value.toLowerCase().trim();
  if (!q) {
    renderMyPpts(myPurchasedPpts);
    return;
  }
  const filtered = myPurchasedPpts.filter(p =>
    p.title.toLowerCase().includes(q) ||
    dbSubjects.find(s=>s.id===p.subjectId)?.name.toLowerCase().includes(q)
  );
  renderMyPpts(filtered);
  showSection("myPpts", null);
}

// ---- Logout Confirm ----
function confirmLogout() {
  document.getElementById("confirmModal").style.display = "flex";
}

// ---- Toast ----
function showToastDB(msg, type = "") {
  const t = document.getElementById("dbToast");
  t.textContent = msg;
  t.className = "db-toast " + type + " show";
  setTimeout(() => { t.className = "db-toast"; }, 3500);
}

// ---- Keyboard ----
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeDbPptModal();
    document.getElementById("confirmModal").style.display = "none";
    document.body.style.overflow = "";
  }
  if (document.getElementById("dbPptModal").classList.contains("open")) {
    if (e.key === "ArrowRight") dbNextSlide();
    if (e.key === "ArrowLeft") dbPrevSlide();
  }
});

// ---- Download purchased PPT from dashboard ----
async function downloadDashboardPpt(title, fileId, fileName) {
  if (fileId && window.MLTFilesDB && window.MLTFilesDB.downloadFile) {
    showToastDB(`⏳ Downloading "${fileName || title + '.pptx'}"...`, "info");
    await window.MLTFilesDB.downloadFile(fileId, fileName || (title + ".pptx"));
    showToastDB(`✓ Download started for "${fileName || title}"!`, "success");
  } else {
    showToastDB(`✓ Downloading "${title}" presentation...`, "success");
    const blob = new Blob([`<!DOCTYPE html><html><head><meta charset="utf-8"/><title>${title} - MLThub</title><style>body{font-family:sans-serif;padding:2rem;background:#0f172a;color:#fff;}h1{color:#38bdf8;}</style></head><body><h1>${title}</h1><p>Purchased & Licensed from MLThub</p></body></html>`], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/[^a-zA-Z0-9_\-]/g, "_")}_Presentation.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

