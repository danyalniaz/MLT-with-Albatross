// =============================================
//   MLThub – app.js  |  by Albatross
// =============================================

function generateGenericSlides(subjectName, icon, count) {
  const topics = [
    { title: `Introduction to ${subjectName}`, body: `Overview and scope of ${subjectName}:\n• Historical background and development\n• Importance in medical practice\n• Key concepts and terminology\n• Approach to clinical cases\n• Evidence-based medicine principles` },
    { title: "Epidemiology & Risk Factors", body: "Disease burden and prevalence:\n• Global and regional statistics\n• Age, gender, and ethnic differences\n• Modifiable risk factors\n• Non-modifiable risk factors\n• Screening recommendations\n• Prevention strategies" },
    { title: "Pathophysiology", body: "Disease mechanisms:\n• Normal physiology overview\n• Mechanisms of disease\n• Cellular and molecular changes\n• Organ-level effects\n• Systemic manifestations\n• Complications and sequelae" },
    { title: "Clinical Presentation", body: "Signs and symptoms:\n• History of presenting complaint\n• Symptom duration and progression\n• Associated symptoms\n• Relevant past medical history\n• Drug history and allergies\n• Family and social history" },
    { title: "Investigations", body: "Diagnostic workup:\n• First-line investigations (bloods, imaging)\n• Specific diagnostic tests\n• Interpretation of results\n• Sensitivity vs Specificity\n• Gold standard investigations\n• Cost-effective approach" },
    { title: "Differential Diagnosis", body: "Key differentials to consider:\n• Common conditions mimicking presentation\n• Red flag features\n• Distinguishing features\n• Clinical reasoning approach\n• Systematic exclusion method\n• Mnemonics for exam revision" },
    { title: "Management: Conservative", body: "Non-pharmacological management:\n• Lifestyle modifications\n• Dietary recommendations\n• Exercise and rehabilitation\n• Patient education\n• Psychological support\n• Monitoring and follow-up" },
    { title: "Management: Medical", body: "Pharmacological treatment:\n• First-line medications\n• Mechanism of action\n• Dosage and route of administration\n• Side effects and monitoring\n• Drug interactions\n• Second-line and salvage therapy" },
    { title: "Management: Surgical", body: "Operative management:\n• Indications for surgery\n• Pre-operative assessment\n• Surgical technique overview\n• Intra-operative considerations\n• Post-operative care\n• Complications and management" },
    { title: "Prognosis & Complications", body: "Outcomes and follow-up:\n• Short-term prognosis\n• Long-term outcomes\n• Prognostic factors\n• Common complications\n• Screening for complications\n• Multidisciplinary team approach" }
  ];
  return topics.map(t => ({ icon, ...t }));
}

const subjects = [
  { id:1,name:"Anatomy",icon:"fa-solid fa-bone",color:"#ef4444",bg:"#fef2f2",category:"basic",badge:"hot",desc:"Comprehensive human anatomy.",subparts:[{title:"Upper Limb Anatomy",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Lower Limb Anatomy",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Thorax & Mediastinum",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Abdomen & Pelvis",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Head & Neck Anatomy",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Neuroanatomy Basics",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Histology Overview",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"Embryology Essentials",slides:10,price:"$1.00",old:"$9.99",rating:4.8}],slides:generateGenericSlides("Anatomy","🦴",10)},
  { id:2,name:"Physiology",icon:"fa-solid fa-heart-pulse",color:"#2563eb",bg:"#eff6ff",category:"basic",badge:"hot",desc:"Human body functions.",subparts:[{title:"Cardiovascular Physiology",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Respiratory Physiology",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Renal Physiology",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Neurophysiology",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Endocrine Physiology",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"GI Physiology",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Blood & Hematopoiesis",slides:10,price:"$1.00",old:"$9.99",rating:4.8}],slides:generateGenericSlides("Physiology","❤️",10)},
  { id:3,name:"Pathology",icon:"fa-solid fa-microscope",color:"#7c3aed",bg:"#fdf4ff",category:"para",badge:"hot",desc:"Disease mechanisms and morphology.",subparts:[{title:"General Pathology",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Cell Injury & Death",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Inflammation & Repair",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Neoplasia",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Cardiovascular Pathology",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Haematopathology",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"Renal Pathology",slides:10,price:"$1.00",old:"$9.99",rating:4.7}],slides:generateGenericSlides("Pathology","🦠",10)},
  { id:4,name:"Pharmacology",icon:"fa-solid fa-pills",color:"#f59e0b",bg:"#fffbeb",category:"para",badge:"",desc:"Drug mechanisms and applications.",subparts:[{title:"General Pharmacology",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Autonomic Pharmacology",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Cardiovascular Drugs",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Antibiotics",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"CNS Pharmacology",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Endocrine Pharmacology",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"NSAIDs & Analgesics",slides:10,price:"$1.00",old:"$9.99",rating:4.8}],slides:generateGenericSlides("Pharmacology","💊",10)},
  { id:5,name:"Biochemistry",icon:"fa-solid fa-flask",color:"#10b981",bg:"#f0fdf4",category:"basic",badge:"new",desc:"Metabolic pathways and enzymes.",subparts:[{title:"Carbohydrate Metabolism",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Lipid Metabolism",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Protein & Amino Acids",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"Enzyme Kinetics",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Molecular Biology",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Vitamins & Minerals",slides:10,price:"$1.00",old:"$9.99",rating:4.7}],slides:generateGenericSlides("Biochemistry","🧬",10)},
  { id:6,name:"Microbiology",icon:"fa-solid fa-virus",color:"#06b6d4",bg:"#ecfeff",category:"para",badge:"",desc:"Bacteria, viruses, fungi, and parasites.",subparts:[{title:"General Bacteriology",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Virology",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Mycology",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"Parasitology",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Immunology Basics",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Clinical Microbiology",slides:10,price:"$1.00",old:"$9.99",rating:4.7}],slides:generateGenericSlides("Microbiology","🦠",10)},
  { id:7,name:"Cardiology",icon:"fa-solid fa-heart",color:"#ef4444",bg:"#fef2f2",category:"clinical",badge:"hot",desc:"Heart diseases and ECG interpretation.",subparts:[{title:"Ischaemic Heart Disease",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Heart Failure",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Arrhythmias & ECG",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Valvular Heart Disease",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Hypertension",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Congenital Heart Disease",slides:10,price:"$1.00",old:"$9.99",rating:4.6}],slides:generateGenericSlides("Cardiology","❤️",10)},
  { id:8,name:"Neurology",icon:"fa-solid fa-brain",color:"#7c3aed",bg:"#fdf4ff",category:"clinical",badge:"new",desc:"Neurological disorders and management.",subparts:[{title:"Stroke & TIA",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Epilepsy",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Dementia & Parkinson's",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Multiple Sclerosis",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Headache Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"CNS Infections",slides:10,price:"$1.00",old:"$9.99",rating:4.8}],slides:generateGenericSlides("Neurology","🧠",10)},
  { id:9,name:"Surgery",icon:"fa-solid fa-scalpel",color:"#64748b",bg:"#f8fafc",category:"surgery",badge:"",desc:"Surgical principles and operative techniques.",subparts:[{title:"Principles of Surgery",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Wound Management",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"GI Surgery",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Breast Surgery",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"Orthopaedic Surgery",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Trauma & Emergency Surgery",slides:10,price:"$1.00",old:"$9.99",rating:4.8}],slides:generateGenericSlides("Surgery","🔪",10)},
  { id:10,name:"Paediatrics",icon:"fa-solid fa-baby",color:"#f97316",bg:"#fff7ed",category:"clinical",badge:"",desc:"Child health and childhood diseases.",subparts:[{title:"Growth & Development",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Neonatology",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Paediatric Infections",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Nutrition & Malnutrition",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"Paediatric Cardiology",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Immunisation Schedule",slides:10,price:"$1.00",old:"$9.99",rating:4.9}],slides:generateGenericSlides("Paediatrics","👶",10)},
  { id:11,name:"Gynaecology & Obs.",icon:"fa-solid fa-venus",color:"#ec4899",bg:"#fdf2f8",category:"clinical",badge:"",desc:"Obstetrics and reproductive health.",subparts:[{title:"Normal Labour & Delivery",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"High-Risk Pregnancy",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Menstrual Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Gynaecological Cancers",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Contraception",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"Infertility",slides:10,price:"$1.00",old:"$9.99",rating:4.7}],slides:generateGenericSlides("Obs & Gynae","👩‍⚕️",10)},
  { id:12,name:"Dermatology",icon:"fa-solid fa-hand-dots",color:"#d946ef",bg:"#fdf4ff",category:"clinical",badge:"new",desc:"Skin diseases and treatments.",subparts:[{title:"Skin Structure & Function",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Eczema & Psoriasis",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Skin Infections",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Skin Tumours",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Autoimmune Skin Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.6}],slides:generateGenericSlides("Dermatology","🧴",10)},
  { id:13,name:"Radiology",icon:"fa-solid fa-x-ray",color:"#0891b2",bg:"#ecfeff",category:"para",badge:"",desc:"Imaging modalities and radiological diagnosis.",subparts:[{title:"X-Ray Interpretation",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"CT Scan Basics",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"MRI Principles",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Ultrasound Imaging",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Nuclear Medicine",slides:10,price:"$1.00",old:"$9.99",rating:4.6}],slides:generateGenericSlides("Radiology","🩻",10)},
  { id:14,name:"Psychiatry",icon:"fa-solid fa-head-side-brain",color:"#8b5cf6",bg:"#f5f3ff",category:"clinical",badge:"",desc:"Mental health disorders and psychopharmacology.",subparts:[{title:"Schizophrenia Spectrum",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Mood Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Anxiety Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Substance Use Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Personality Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"Child Psychiatry",slides:10,price:"$1.00",old:"$9.99",rating:4.7}],slides:generateGenericSlides("Psychiatry","🧠",10)},
  { id:15,name:"Endocrinology",icon:"fa-solid fa-syringe",color:"#059669",bg:"#f0fdf4",category:"clinical",badge:"",desc:"Hormonal disorders and diabetes.",subparts:[{title:"Diabetes Mellitus",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Thyroid Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Adrenal Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Pituitary Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Calcium & Bone Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.6},{title:"Reproductive Endocrinology",slides:10,price:"$1.00",old:"$9.99",rating:4.7}],slides:generateGenericSlides("Endocrinology","💉",10)},
  { id:16,name:"Ophthalmology",icon:"fa-solid fa-eye",color:"#0ea5e9",bg:"#f0f9ff",category:"clinical",badge:"new",desc:"Eye diseases and vision disorders.",subparts:[{title:"Ocular Anatomy",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Glaucoma",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Cataract & Refractive Errors",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Retinal Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Ocular Infections",slides:10,price:"$1.00",old:"$9.99",rating:4.6}],slides:generateGenericSlides("Ophthalmology","👁️",10)},
  { id:17,name:"ENT",icon:"fa-solid fa-ear-deaf",color:"#dc2626",bg:"#fef2f2",category:"surgery",badge:"",desc:"Ear, nose, throat and head & neck surgery.",subparts:[{title:"Ear Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Nasal & Sinus Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.7},{title:"Throat & Laryngeal Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.8},{title:"Head & Neck Tumours",slides:10,price:"$1.00",old:"$9.99",rating:4.9},{title:"Vertigo & Balance Disorders",slides:10,price:"$1.00",old:"$9.99",rating:4.6}],slides:generateGenericSlides("ENT","👂",10)}
];

let currentSubject=null,currentSlideIndex=0,currentSubpartTitle="",currentPptSlides=[],cart=[];
let currentSubpartFileId=null,currentSubpartFileName=null,currentSubpartIndex=null,currentSubpartPrice="$1.00";

function getLiveSubjectsList() {
  let list = null;
  try {
    const raw = localStorage.getItem("mlthub_db_subjects");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) list = parsed;
    }
  } catch(e) {}
  if (!list && window.MLTDB && window.MLTDB.getSubjects && window.MLTDB.getSubjects().length) {
    list = window.MLTDB.getSubjects();
  }
  if (!list) list = subjects;

  // Ensure all presentations follow the universal $1.00 worldwide affordable rate
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
    try { localStorage.setItem("mlthub_db_subjects", JSON.stringify(list)); } catch(e) {}
  }
  return list;
}

document.addEventListener("DOMContentLoaded",()=>{
  const liveSubjects = getLiveSubjectsList();
  renderSubjects(liveSubjects);
  renderFeatured();
  setupScrollEffects();
  loadStudioContent();
  setupAdminFloatingUploadButton();
});

function setupAdminFloatingUploadButton() {
  try {
    if (!isAdminLoggedIn()) return;
    if (document.getElementById("adminFloatingPlusBtn")) return;
    const btn = document.createElement("a");
    btn.id = "adminFloatingPlusBtn";
    btn.href = "admin-suite/index.html";
    btn.title = "Admin Studio: Manage PPTs & Visual Builder";
    btn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i><span>Admin Studio</span>`;
    btn.className = "admin-floating-plus";
    document.body.appendChild(btn);
  } catch(e) {}
}

function renderSubjects(data){
  const grid=document.getElementById("subjectsGrid");
  if(!grid)return;
  const list = data || getLiveSubjectsList();
  grid.innerHTML=list.map(s=>`
    <div class="subject-card" onclick="openSubject(${s.id})" data-category="${s.category}" style="--card-color:${s.color};">
      ${s.badge?`<div class="subject-badge ${s.badge}">${s.badge.toUpperCase()}</div>`:""}
      <div class="subject-icon" style="background:${s.bg};color:${s.color};"><i class="${s.icon}"></i></div>
      <div class="subject-name">${s.name}</div>
      <div class="subject-count">${(s.subparts || []).length} topics · ${(s.subparts || []).reduce((a,b)=>a+(b.slides||10),0)} slides</div>
    </div>`).join("");
}

function filterSubjects(cat,btn){
  document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  const list = getLiveSubjectsList();
  renderSubjects(cat==="all"?list:list.filter(s=>s.category===cat));
}

function renderFeatured(){
  const grid=document.getElementById("featuredGrid");
  if(!grid)return;
  const list = getLiveSubjectsList();
  const featured=list.slice(0,6).map((s,i)=>({
    subject:s,
    ppt:(s.subparts && s.subparts[0]) ? s.subparts[0] : {title:"Introduction & Fundamentals",rating:4.9,slides:10,price:"$1.00",old:"$9.99"},
    downloads:[4521,3890,5102,2997,3456,4123][i] || 3200
  }));
  grid.innerHTML=featured.map(f=>`
    <div class="featured-card" onclick="openPptViewer(${f.subject.id},0)">
      <div class="featured-thumb" style="background:linear-gradient(135deg,${f.subject.color}22,${f.subject.color}44);">
        <i class="${f.subject.icon}" style="color:${f.subject.color};"></i>
      </div>
      <div class="featured-info">
        <div class="featured-subject">${f.subject.name}</div>
        <div class="featured-title">${f.ppt.title}</div>
        <div class="featured-meta">
          <div class="featured-rating">★★★★★ ${f.ppt.rating}<span style="color:var(--muted);font-weight:400;margin-left:.25rem;">(${f.downloads.toLocaleString()})</span></div>
          <div class="featured-slides"><i class="fa-regular fa-file-powerpoint"></i> ${f.ppt.slides || 10} slides</div>
        </div>
        <div class="featured-footer">
          <div class="featured-price">${f.ppt.price || '$1.00'}<span class="old-price">${f.ppt.old || '$9.99'}</span></div>
          <button class="btn btn-primary btn-sm">Preview</button>
        </div>
      </div>
    </div>`).join("");
}

// Admin Status Checker
function isAdminLoggedIn() {
  try {
    const raw = sessionStorage.getItem("mlthub_studio_session") || localStorage.getItem("mlthub_studio_session");
    if (raw) {
      const sess = JSON.parse(raw);
      if (sess && (sess.token || sess.role || sess.id)) return true;
    }
    if (localStorage.getItem("mlthub_admin_token") || sessionStorage.getItem("mlthub_admin_token")) return true;
    if (localStorage.getItem("mlthub_is_admin") === "true" || sessionStorage.getItem("mlthub_is_admin") === "true") return true;
  } catch(e) {}
  return false;
}

// Direct In-Subject PPT Editor State
let directPptState = {
  isNew: true,
  subjectId: null,
  subpartIndex: -1,
  fileId: null,
  fileName: null,
  fileSize: null,
  fileType: null,
  slides: null
};

function openSubject(id){
  const list = getLiveSubjectsList();
  const s = list.find(x=>x.id===id) || subjects.find(x=>x.id===id);
  if(!s)return;
  currentSubject=s;
  const subparts = s.subparts || [];
  const isAdmin = isAdminLoggedIn();

  document.getElementById("modalHeader").innerHTML=`
    <div style="display:flex;align-items:center;gap:1rem;margin-bottom:.75rem;">
      <div style="width:60px;height:60px;border-radius:12px;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:1.8rem;"><i class="${s.icon}"></i></div>
      <div><h2 style="font-size:1.5rem;font-weight:800;margin-bottom:.25rem;">${s.name}</h2><p style="opacity:.85;font-size:.875rem;">${s.desc}</p></div>
    </div>`;

  const headerRightHtml = isAdmin
    ? `<div style="display:flex;align-items:center;gap:.5rem;">
         <span style="font-size:.72rem;background:#dbeafe;color:#1e40af;padding:2px 8px;border-radius:9999px;font-weight:700;">Admin Mode</span>
         <button class="btn-modal-add-ppt" onclick="openDirectAddPptModal(${s.id})">
           <i class="fa-solid fa-plus"></i> Add PPT from Documents
         </button>
         <button class="btn-admin-logout-mini" onclick="handleAdminModalLogout(${s.id})" title="Exit Admin Mode">
           <i class="fa-solid fa-right-from-bracket"></i>
         </button>
       </div>`
    : `<button class="btn-admin-unlock" onclick="promptAdminUnlock(${s.id})" title="Admin Access">
         <i class="fa-solid fa-lock"></i>
       </button>`;

  const addCardHtml = isAdmin
    ? `<div class="subpart-card add-ppt-card" onclick="openDirectAddPptModal(${s.id})">
         <div class="add-ppt-icon"><i class="fa-solid fa-plus"></i></div>
         <div class="add-ppt-title">+ Add New PPT</div>
         <div class="add-ppt-sub">From Phone / Laptop Documents</div>
       </div>`
    : ``;

  document.getElementById("modalBody").innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem;flex-wrap:wrap;gap:.5rem;">
      <div>
        <h3 style="font-size:1.05rem;font-weight:700;color:var(--dark);margin-bottom:.2rem;">Select a Topic to Preview or Purchase</h3>
        <p style="font-size:.8rem;color:var(--muted);">Professionally designed slides with clinical illustrations.</p>
      </div>
      ${headerRightHtml}
    </div>
    <div class="subparts-grid">
      ${subparts.map((sp,i)=>{
        const isBought = isPresentationPurchased(sp.title, sp.fileId);
        return `
        <div class="subpart-card" onclick="openPptViewer(${s.id},${i})">
          <div class="subpart-card-header">
            <div class="subpart-title">${sp.title}</div>
            ${isAdmin ? `
            <div class="subpart-actions" onclick="event.stopPropagation()">
              <button class="card-action-btn edit-btn" onclick="openDirectEditPptModal(${s.id}, ${i})" title="Edit Topic / PPT"><i class="fa-solid fa-pen-to-square"></i></button>
              <button class="card-action-btn delete-btn" onclick="deleteDirectPpt(${s.id}, ${i})" title="Delete Topic"><i class="fa-solid fa-trash"></i></button>
            </div>` : ''}
          </div>
          <div class="subpart-meta">
            ⭐ ${sp.rating || 4.9} · ${sp.slides || 10} slides
            ${sp.fileName ? `<span class="badge-locked" title="Original Document Protected (Tamper-Proof)"><i class="fa-solid fa-lock"></i> Original</span>` : ''}
          </div>
          <div class="subpart-price" style="display:flex;align-items:center;justify-content:space-between;">
            <span>${sp.price || '$1.00'}</span>
            ${isBought 
              ? `<span class="badge-unlocked-pill" style="font-size:.68rem;padding:2px 8px;"><i class="fa-solid fa-circle-check"></i> Unlocked</span>` 
              : `<span class="badge-locked-dw" title="Preview available · Download on purchase"><i class="fa-solid fa-lock"></i> Buy to Download</span>`}
          </div>
        </div>`;
      }).join("")}
      ${addCardHtml}
    </div>`;
  document.getElementById("subjectModal").classList.add("open");
  document.body.style.overflow="hidden";
}

function promptAdminUnlock(subjectId) {
  const pass = prompt("Admin Verification Required\nEnter Admin Password to manage presentations:");
  if (!pass) return;
  if (pass === "albatross123") {
    const adminSess = {
      id: "usr_admin",
      name: "Administrator",
      email: "admin@albatross.com",
      role: "SuperAdmin",
      token: "sess_" + Date.now()
    };
    localStorage.setItem("mlthub_studio_session", JSON.stringify(adminSess));
    sessionStorage.setItem("mlthub_studio_session", JSON.stringify(adminSess));
    showToast("✓ Admin Mode Activated!", "success");
    openSubject(subjectId);
    setupAdminFloatingUploadButton();
  } else {
    showToast("Incorrect password. Access denied.", "error");
  }
}

function handleAdminModalLogout(subjectId) {
  localStorage.removeItem("mlthub_studio_session");
  sessionStorage.removeItem("mlthub_studio_session");
  localStorage.removeItem("mlthub_admin_token");
  sessionStorage.removeItem("mlthub_admin_token");
  showToast("Exited Admin Mode.", "info");
  const floatBtn = document.getElementById("adminFloatingPlusBtn");
  if (floatBtn) floatBtn.remove();
  openSubject(subjectId);
}

function closeSubjectModal(e){if(e.target===document.getElementById("subjectModal"))closeModal();}
function closeModal(){
  document.getElementById("subjectModal").classList.remove("open");
  document.body.style.overflow="";
}

// =========================================================
//   In-Place Direct PPT Editor & Document Uploader Engine
// =========================================================

function openDirectAddPptModal(subjectId) {
  if (!isAdminLoggedIn()) {
    promptAdminUnlock(subjectId);
    return;
  }

  const list = getLiveSubjectsList();
  const s = list.find(x => x.id === subjectId) || subjects[0];
  if (!s) return;

  directPptState = {
    isNew: true,
    subjectId: subjectId,
    subpartIndex: -1,
    fileId: null,
    fileName: null,
    fileSize: null,
    fileType: null,
    slides: null
  };

  document.getElementById("directModalTitle").textContent = `➕ Add PPT to ${s.name}`;
  document.getElementById("directModalSub").textContent = `Upload .pptx or .pdf from your documents to ${s.name}`;
  document.getElementById("directPptTitle").value = "";
  document.getElementById("directPptPrice").value = "$1.00";
  document.getElementById("directPptRating").value = "4.9";
  document.getElementById("directFileAttachedCard").style.display = "none";

  document.getElementById("directPptModal").classList.add("open");
}

function openDirectEditPptModal(subjectId, subpartIndex) {
  if (!isAdminLoggedIn()) {
    promptAdminUnlock(subjectId);
    return;
  }
  const list = getLiveSubjectsList();
  const s = list.find(x => x.id === subjectId);
  if (!s || !s.subparts || !s.subparts[subpartIndex]) return;

  const sp = s.subparts[subpartIndex];
  directPptState = {
    isNew: false,
    subjectId: subjectId,
    subpartIndex: subpartIndex,
    fileId: sp.fileId || null,
    fileName: sp.fileName || null,
    fileSize: sp.fileSize || null,
    fileType: sp.fileType || null,
    slides: sp.slidesData || null
  };

  document.getElementById("directModalTitle").textContent = `✏️ Edit: ${sp.title}`;
  if (sp.fileName) {
    document.getElementById("directModalSub").innerHTML = `<span style="color:#10b981;font-weight:700;"><i class="fa-solid fa-lock"></i> Protected Original Document</span> · Preserved as uploaded (Tamper-Proof)`;
  } else {
    document.getElementById("directModalSub").textContent = `Edit details or attach document for ${s.name}`;
  }
  document.getElementById("directPptTitle").value = sp.title || "";
  document.getElementById("directPptPrice").value = sp.price || "$1.00";
  document.getElementById("directPptRating").value = sp.rating || "4.9";

  const fileCard = document.getElementById("directFileAttachedCard");
  if (sp.fileName) {
    fileCard.style.display = "flex";
    document.getElementById("directAttachedFileName").textContent = sp.fileName;
    document.getElementById("directAttachedFileMeta").textContent = `${sp.fileSize || "Attached"} · 🔒 Locked & Preserved As-Is`;
  } else {
    fileCard.style.display = "none";
  }

  document.getElementById("directPptModal").classList.add("open");
}

function triggerDirectFileUpload() {
  const input = document.getElementById("directPptFileInput");
  if (input) {
    input.value = "";
    input.click();
  }
}

async function handleDirectFilePicked(files) {
  if (!files || !files.length) return;
  const file = files[0];

  showToast(`⏳ Attaching "${file.name}"...`, "info");

  try {
    let fileRecord = {
      fileId: 'ppt_file_' + Date.now(),
      fileName: file.name,
      fileSize: (window.MLTFilesDB && window.MLTFilesDB.formatFileSize) ? window.MLTFilesDB.formatFileSize(file.size) : 'File',
      fileType: file.type || 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    };

    if (window.MLTFilesDB && window.MLTFilesDB.saveFile) {
      fileRecord = await window.MLTFilesDB.saveFile(file);
    }

    directPptState.fileId = fileRecord.fileId;
    directPptState.fileName = fileRecord.fileName;
    directPptState.fileSize = fileRecord.fileSize;
    directPptState.fileType = fileRecord.fileType;

    // Auto-fill Title from file name if input is empty
    const titleInput = document.getElementById("directPptTitle");
    const cleanTitle = (window.MLTFilesDB && window.MLTFilesDB.cleanTitleFromFileName)
      ? window.MLTFilesDB.cleanTitleFromFileName(file.name)
      : file.name.replace(/\.[^/.]+$/, "").replace(/[_\-]+/g, " ");

    if (!titleInput.value.trim() || directPptState.isNew) {
      titleInput.value = cleanTitle;
    }

    // Prepare matching slides
    directPptState.slides = (window.MLTFilesDB && window.MLTFilesDB.generateSlidesForTitle)
      ? window.MLTFilesDB.generateSlidesForTitle(cleanTitle, '📋')
      : null;

    // Show attached file card
    const fileCard = document.getElementById("directFileAttachedCard");
    fileCard.style.display = "flex";
    document.getElementById("directAttachedFileName").textContent = file.name;
    document.getElementById("directAttachedFileMeta").textContent = `${fileRecord.fileSize} · Ready for student downloads`;

    showToast(`✓ Document "${file.name}" attached successfully!`, "success");
  } catch (err) {
    console.error("Direct file pick error:", err);
    showToast("Error reading file from device.", "error");
  }
}

function removeDirectAttachedFile() {
  directPptState.fileId = null;
  directPptState.fileName = null;
  directPptState.fileSize = null;
  directPptState.fileType = null;
  document.getElementById("directFileAttachedCard").style.display = "none";
  showToast("Attached document removed.", "info");
}

function closeDirectPptModal(e) {
  if (e && e.target && e.target !== document.getElementById("directPptModal")) return;
  document.getElementById("directPptModal").classList.remove("open");
}

async function saveDirectPptForm() {
  if (!isAdminLoggedIn()) {
    showToast("Unauthorized. Admin access required.", "error");
    return;
  }
  const title = document.getElementById("directPptTitle").value.trim();
  if (!title) {
    showToast("Please enter a presentation title.", "error");
    return;
  }

  const list = getLiveSubjectsList();
  const subj = list.find(x => x.id === directPptState.subjectId);
  if (!subj) {
    showToast("Subject not found.", "error");
    return;
  }

  if (!subj.subparts) subj.subparts = [];

  const price = document.getElementById("directPptPrice").value.trim() || "$1.00";
  const rating = parseFloat(document.getElementById("directPptRating").value) || 4.9;

  const slides = directPptState.slides || (
    (window.MLTFilesDB && window.MLTFilesDB.generateSlidesForTitle)
      ? window.MLTFilesDB.generateSlidesForTitle(title, '📋')
      : generateGenericSlides(subj.name, '📋', 10)
  );

  const pptRecord = {
    title: title,
    slides: slides.length,
    price: price,
    old: "$9.99",
    rating: rating,
    fileId: directPptState.fileId || null,
    fileName: directPptState.fileName || null,
    fileSize: directPptState.fileSize || null,
    fileType: directPptState.fileType || null,
    isOriginalFile: !!directPptState.fileId,
    isLocked: !!directPptState.fileId,
    uploadedAt: new Date().toISOString(),
    slidesData: slides
  };

  if (directPptState.isNew) {
    subj.subparts.push(pptRecord);
    showToast(`✓ "${title}" added to ${subj.name}!`, "success");
  } else {
    subj.subparts[directPptState.subpartIndex] = pptRecord;
    showToast(`✓ "${title}" updated successfully!`, "success");
  }

  // Persist to LocalStorage
  localStorage.setItem("mlthub_db_subjects", JSON.stringify(list));

  // Sync to parent studio if inside iframe
  try {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: "MLT_SUBJECT_UPDATED", subjects: list }, "*");
    }
  } catch (e) {}

  document.getElementById("directPptModal").classList.remove("open");
  openSubject(subj.id);
  renderSubjects(list);
  renderFeatured();
}

function deleteDirectPpt(subjectId, subpartIndex) {
  if (!isAdminLoggedIn()) {
    showToast("Unauthorized. Admin access required.", "error");
    return;
  }
  const list = getLiveSubjectsList();
  const s = list.find(x => x.id === subjectId);
  if (!s || !s.subparts || !s.subparts[subpartIndex]) return;

  const title = s.subparts[subpartIndex].title;
  if (confirm(`Delete "${title}" from ${s.name}?`)) {
    s.subparts.splice(subpartIndex, 1);
    localStorage.setItem("mlthub_db_subjects", JSON.stringify(list));
    showToast(`✓ "${title}" deleted from ${s.name}`, "info");
    openSubject(subjectId);
    renderSubjects(list);
    renderFeatured();
  }
}

// =========================================================
//   Purchased Presentations & Customer Paywall Engine
// =========================================================
function getPurchasedPpts() {
  try {
    const raw = localStorage.getItem("mlthub_purchased_ppts");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function isPresentationPurchased(title, fileId) {
  // Admin always has unrestricted, free access to all presentations
  if (isAdminLoggedIn()) return true;
  const list = getPurchasedPpts();
  return list.some(item => {
    if (fileId && item.fileId && item.fileId === fileId) return true;
    if (title && item.title && item.title.trim().toLowerCase() === title.trim().toLowerCase()) return true;
    return false;
  });
}

let checkoutState = {
  title: "",
  subject: "",
  subjectId: null,
  subpartIndex: null,
  fileId: null,
  fileName: null,
  fileSize: null,
  price: "$1.00",
  method: "card"
};

function openCheckoutModal(item) {
  checkoutState = {
    title: item.title || "Medical Presentation",
    subject: item.subject || (currentSubject ? currentSubject.name : "Medical Topic"),
    subjectId: item.subjectId !== undefined ? item.subjectId : (currentSubject ? currentSubject.id : null),
    subpartIndex: (item.subpartIndex !== undefined) ? item.subpartIndex : currentSubpartIndex,
    fileId: item.fileId !== undefined ? item.fileId : currentSubpartFileId,
    fileName: item.fileName !== undefined ? item.fileName : currentSubpartFileName,
    fileSize: item.fileSize || null,
    price: item.price || "$1.00",
    method: "card"
  };

  const titleEl = document.getElementById("checkoutItemTitle");
  const metaEl = document.getElementById("checkoutItemMeta");
  const priceEl = document.getElementById("checkoutItemPrice");
  const btnSubmit = document.getElementById("btnPaySubmit");

  if (titleEl) titleEl.textContent = checkoutState.title;
  if (metaEl) metaEl.textContent = `${checkoutState.subject} · ${checkoutState.fileName ? checkoutState.fileName : 'Interactive Presentation'}`;
  if (priceEl) priceEl.textContent = checkoutState.price;
  if (btnSubmit) btnSubmit.innerHTML = `<i class="fa-solid fa-lock"></i> Pay ${checkoutState.price} & Download Instantly`;

  // Apply live payment gateway configuration
  try {
    const rawCfg = localStorage.getItem("mlthub_payment_config");
    if (rawCfg) {
      const cfg = JSON.parse(rawCfg);
      if (cfg.epNumber && document.getElementById("payEpNumber")) document.getElementById("payEpNumber").value = cfg.epNumber;
      if (cfg.jcNumber && document.getElementById("payJcNumber")) document.getElementById("payJcNumber").value = cfg.jcNumber;
      if (cfg.paypalEmail && document.getElementById("payPaypalEmail")) document.getElementById("payPaypalEmail").value = cfg.paypalEmail;
      if (cfg.bankIban && document.getElementById("ibanText")) document.getElementById("ibanText").textContent = cfg.bankIban;
      if (cfg.bankRaast && document.getElementById("raastText")) document.getElementById("raastText").textContent = cfg.bankRaast;
    }
  } catch(e) {}

  selectPaymentMethod('card');
  document.getElementById("checkoutModal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCheckoutModal(e) {
  if (e && e.target && e.target !== document.getElementById("checkoutModal")) return;
  document.getElementById("checkoutModal").classList.remove("open");
  if (!document.getElementById("pptModal").classList.contains("open") && !document.getElementById("subjectModal").classList.contains("open")) {
    document.body.style.overflow = "";
  }
}

function selectPaymentMethod(method, btn) {
  checkoutState.method = method;
  // Update tile active state
  document.querySelectorAll(".payment-method-tile").forEach(b => b.classList.remove("active"));
  const tileId = "tilePay" + method.charAt(0).toUpperCase() + method.slice(1);
  const activeTile = btn || document.getElementById(tileId);
  if (activeTile) activeTile.classList.add("active");

  // Hide all panels, show selected panel
  document.querySelectorAll(".payment-panel").forEach(p => p.classList.remove("active"));
  const panel = document.getElementById("payPanel-" + method);
  if (panel) panel.classList.add("active");
}

function copyPaymentText(text, btn) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text);
  }
  const oldText = btn.innerHTML;
  btn.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
  btn.style.background = "#10b981";
  btn.style.color = "#fff";
  setTimeout(() => {
    btn.innerHTML = oldText;
    btn.style.background = "";
    btn.style.color = "";
  }, 1800);
  showToast(`✓ Copied: ${text}`, "success");
}

function simulateDigitalWalletPay(walletName) {
  showToast(`⏳ Connecting to ${walletName} Secure Enclave...`, "info");
  setTimeout(() => {
    completeSuccessfulPayment(walletName);
  }, 1000);
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector(".payment-panel.active button[type='submit']") || document.getElementById("btnPaySubmit");
  const originalHtml = submitBtn ? submitBtn.innerHTML : "Pay";
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing Secure Payment...`;
  }

  let methodDisplayName = "Credit Card";
  if (checkoutState.method === "easypaisa") {
    const num = document.getElementById("payEpNumber")?.value || "EasyPaisa";
    methodDisplayName = `EasyPaisa (${num})`;
  } else if (checkoutState.method === "jazzcash") {
    const num = document.getElementById("payJcNumber")?.value || "JazzCash";
    methodDisplayName = `JazzCash (${num})`;
  } else if (checkoutState.method === "paypal") {
    const email = document.getElementById("payPaypalEmail")?.value || "PayPal";
    methodDisplayName = `PayPal (${email})`;
  } else if (checkoutState.method === "bank") {
    const tid = document.getElementById("payBankRef")?.value || "Bank Transfer";
    methodDisplayName = `Meezan Bank / Raast (TID: ${tid})`;
  } else if (checkoutState.method === "wallet") {
    methodDisplayName = "Apple / Google Pay";
  } else {
    const cardNum = document.getElementById("payCardNumber")?.value || "4242";
    const last4 = cardNum.replace(/\s+/g, "").slice(-4) || "4242";
    methodDisplayName = `Card (•••• ${last4})`;
  }

  setTimeout(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHtml;
    }
    completeSuccessfulPayment(methodDisplayName);
  }, 1000);
}

function completeSuccessfulPayment(overrideMethod) {
  const methodUsed = overrideMethod || checkoutState.method || "Online Payment";
  const purchased = getPurchasedPpts();
  const newPurchase = {
    id: "ord_" + Date.now(),
    title: checkoutState.title,
    subject: checkoutState.subject,
    subjectId: checkoutState.subjectId,
    fileId: checkoutState.fileId,
    fileName: checkoutState.fileName,
    fileSize: checkoutState.fileSize,
    price: checkoutState.price,
    date: new Date().toISOString().split("T")[0],
    method: methodUsed,
    status: "completed"
  };

  purchased.push(newPurchase);
  localStorage.setItem("mlthub_purchased_ppts", JSON.stringify(purchased));

  // Also record in student orders for dashboard
  try {
    const rawOrders = localStorage.getItem("mlthub_user_orders");
    const userOrders = rawOrders ? JSON.parse(rawOrders) : [];
    userOrders.unshift({
      id: "#MLT-" + Math.floor(1000 + Math.random() * 9000),
      title: checkoutState.title,
      subject: checkoutState.subject,
      date: new Date().toISOString().split("T")[0],
      amount: checkoutState.price,
      paymentMethod: methodUsed,
      status: "completed"
    });
    localStorage.setItem("mlthub_user_orders", JSON.stringify(userOrders));
  } catch(e) {}

  closeCheckoutModal();
  showToast(`🎉 Payment Confirmed via ${methodUsed}! "${checkoutState.title}" unlocked!`, "success");

  // If in pptModal, re-render ppt viewer so download button is active!
  if (document.getElementById("pptModal").classList.contains("open")) {
    if (checkoutState.subjectId !== null && checkoutState.subpartIndex !== null) {
      openPptViewer(checkoutState.subjectId, checkoutState.subpartIndex);
    }
  }

  // Automatically start file download
  setTimeout(() => {
    downloadCurrentPptFile();
  }, 500);

  // If subject modal is open, refresh it to show unlocked badges
  if (document.getElementById("subjectModal").classList.contains("open") && checkoutState.subjectId) {
    openSubject(checkoutState.subjectId);
  }
}

function triggerCheckoutForCurrent() {
  openCheckoutModal({
    title: currentSubpartTitle,
    subject: currentSubject ? currentSubject.name : "Medical Subject",
    subjectId: currentSubject ? currentSubject.id : null,
    subpartIndex: currentSubpartIndex,
    fileId: currentSubpartFileId,
    fileName: currentSubpartFileName,
    price: currentSubpartPrice || "$1.00"
  });
}

async function openPptViewer(subjectId,subpartIndex){
  const list = getLiveSubjectsList();
  const s = list.find(x=>x.id===subjectId) || subjects.find(x=>x.id===subjectId);
  if(!s || !s.subparts || !s.subparts[subpartIndex]) return;
  const subpart = s.subparts[subpartIndex];
  currentSubject = s;
  currentSubpartTitle = subpart.title;
  currentSubpartFileId = subpart.fileId || null;
  currentSubpartFileName = subpart.fileName || null;
  currentSubpartIndex = subpartIndex;
  currentSubpartPrice = subpart.price || "$1.00";

  document.getElementById("subjectModal").classList.remove("open");

  const pptControls = document.querySelector("#pptModal .ppt-controls");
  const pptViewer = document.getElementById("pptViewer");
  const pptHeader = document.getElementById("pptHeader");
  const footerActions = document.querySelector("#pptModal .ppt-footer-actions");

  const isPurchased = isPresentationPurchased(subpart.title, subpart.fileId);

  // Check if this is an authentic uploaded document file
  if (subpart.fileId || subpart.isOriginalFile) {
    pptHeader.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem;">
        <div>
          <h3>${currentSubpartTitle}</h3>
          <p>${s.name} · ${subpart.fileName || 'Original Presentation'} · Preserved As-Is</p>
        </div>
        <div class="doc-security-badge" style="margin:0;${isPurchased ? 'background:rgba(16,185,129,.15);color:#10b981;border-color:rgba(16,185,129,.35);' : 'background:rgba(245,158,11,.15);color:#d97706;border-color:rgba(245,158,11,.35);'}">
          <i class="fa-solid ${isPurchased ? 'fa-circle-check' : 'fa-lock'}"></i> ${isPurchased ? 'Unlocked & Verified' : 'Preview Mode · Download on Purchase'}
        </div>
      </div>
    `;

    // Hide slide stepper for original whole document files
    if (pptControls) pptControls.style.display = "none";

    const isPdf = subpart.fileName && subpart.fileName.toLowerCase().endsWith(".pdf");
    let blobUrl = null;
    if (window.MLTFilesDB && window.MLTFilesDB.getFile) {
      try {
        const record = await window.MLTFilesDB.getFile(subpart.fileId);
        if (record && record.blob) {
          blobUrl = URL.createObjectURL(record.blob);
        }
      } catch (e) {}
    }

    if (isPdf && blobUrl) {
      pptViewer.innerHTML = `
        <div class="original-doc-viewer" style="padding:1rem;">
          <iframe src="${blobUrl}" style="width:100%;height:460px;border:none;border-radius:12px;background:#1e293b;"></iframe>
          <div style="margin-top:.85rem;display:flex;align-items:center;justify-content:center;gap:.75rem;">
            ${isPurchased ? `
              <button class="btn btn-download-attached" onclick="downloadCurrentPptFile()">
                <i class="fa-solid fa-cloud-arrow-down"></i> Download Original PDF (${subpart.fileSize || 'File'})
              </button>
            ` : `
              <button class="btn btn-pay-unlock" onclick="triggerCheckoutForCurrent()">
                <i class="fa-solid fa-lock"></i> Download Locked · Pay ${subpart.price || '$1.00'} to Download
              </button>
            `}
          </div>
        </div>
      `;
    } else {
      pptViewer.innerHTML = `
        <div class="original-doc-viewer">
          <div class="doc-security-badge" style="${isPurchased ? 'background:rgba(16,185,129,.15);color:#10b981;border-color:rgba(16,185,129,.35);' : 'background:rgba(245,158,11,.15);color:#d97706;border-color:rgba(245,158,11,.35);'}">
            <i class="fa-solid ${isPurchased ? 'fa-circle-check' : 'fa-shield-halved'}"></i> ${isPurchased ? 'Unlocked Document · Ready for Download' : '🔒 Original Document Protected · Customer Preview Only'}
          </div>
          <div class="original-ppt-card">
            <div class="original-ppt-icon">
              <i class="fa-solid fa-file-powerpoint"></i>
            </div>
            <h2 class="original-ppt-title">${subpart.title}</h2>
            <div class="original-ppt-meta">
              <span><i class="fa-solid fa-paperclip"></i> ${subpart.fileName || 'Presentation.pptx'}</span>
              <span><i class="fa-solid fa-hard-drive"></i> ${subpart.fileSize || 'Original File'}</span>
              <span><i class="fa-solid fa-circle-check" style="color:#10b981;"></i> Exact Original Preserved</span>
            </div>
            <p class="original-ppt-desc">
              ${isPurchased 
                ? 'Your payment is confirmed! You have full lifetime access to download and edit this original PowerPoint presentation on all your devices.' 
                : 'This presentation was uploaded directly from the author\'s device in its authentic, original state. Customers can preview details here; download access is granted immediately upon checkout.'}
            </p>
          </div>
          <div class="original-ppt-actions">
            ${isPurchased ? `
              <button class="btn btn-download-attached btn-lg" onclick="downloadCurrentPptFile()">
                <i class="fa-solid fa-cloud-arrow-down"></i> Download & Open in PowerPoint (.pptx)
              </button>
            ` : `
              <button class="btn btn-pay-unlock btn-lg" onclick="triggerCheckoutForCurrent()">
                <i class="fa-solid fa-lock"></i> Download Locked · Pay ${subpart.price || '$1.00'} to Download
              </button>
            `}
          </div>
        </div>
      `;
    }

    if (footerActions) {
      if (isPurchased) {
        footerActions.innerHTML = `
          <button class="btn btn-download-attached" onclick="downloadCurrentPptFile()">
            <i class="fa-solid fa-cloud-arrow-down"></i> Download Original Presentation (${subpart.fileSize || 'File'})
          </button>
          <span class="badge-unlocked-pill"><i class="fa-solid fa-circle-check"></i> Unlocked</span>
          <button class="btn btn-outline" onclick="closePpt()">Close Preview</button>
        `;
      } else {
        footerActions.innerHTML = `
          <button class="btn btn-pay-unlock" onclick="triggerCheckoutForCurrent()">
            <i class="fa-solid fa-lock"></i> Unlock Download – ${subpart.price || '$1.00'}
          </button>
          <button class="btn btn-primary" onclick="addToCart()"><i class="fa-solid fa-cart-shopping"></i> Add to Cart – ${subpart.price || '$1.00'}</button>
          <button class="btn btn-outline" onclick="closePpt()">Close Preview</button>
        `;
      }
    }

    document.getElementById("pptModal").classList.add("open");
    document.body.style.overflow = "hidden";
    return;
  }

  // Standard slide viewer for default built-in slides
  if (pptControls) pptControls.style.display = "flex";

  if (subpart.slidesData && Array.isArray(subpart.slidesData) && subpart.slidesData.length > 0) {
    currentPptSlides = subpart.slidesData;
  } else if (s.slides && Array.isArray(s.slides) && s.slides.length > 0) {
    currentPptSlides = s.slides;
  } else {
    currentPptSlides = generateGenericSlides(s.name, "📋", subpart.slides || 10);
  }

  currentSlideIndex=0;
  pptHeader.innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem;">
      <div>
        <h3>${currentSubpartTitle}</h3>
        <p>${s.name} · ${currentPptSlides.length} Professional Slides · Preview Mode</p>
      </div>
      <div class="doc-security-badge" style="margin:0;${isPurchased ? 'background:rgba(16,185,129,.15);color:#10b981;border-color:rgba(16,185,129,.35);' : 'background:rgba(245,158,11,.15);color:#d97706;border-color:rgba(245,158,11,.35);'}">
        <i class="fa-solid ${isPurchased ? 'fa-circle-check' : 'fa-lock'}"></i> ${isPurchased ? 'Unlocked & Ready' : 'Preview Only · Pay to Download'}
      </div>
    </div>
  `;

  if (footerActions) {
    if (isPurchased) {
      footerActions.innerHTML = `
        <button class="btn btn-download-attached" onclick="downloadCurrentPptFile()">
          <i class="fa-solid fa-cloud-arrow-down"></i> Download Slides Presentation
        </button>
        <span class="badge-unlocked-pill"><i class="fa-solid fa-circle-check"></i> Unlocked</span>
        <button class="btn btn-outline" onclick="closePpt()">Close Preview</button>
      `;
    } else {
      footerActions.innerHTML = `
        <button class="btn btn-pay-unlock" onclick="triggerCheckoutForCurrent()">
          <i class="fa-solid fa-lock"></i> Unlock Download – ${subpart.price || '$1.00'}
        </button>
        <button class="btn btn-primary" onclick="addToCart()"><i class="fa-solid fa-cart-shopping"></i> Add to Cart – ${subpart.price || '$1.00'}</button>
        <button class="btn btn-outline" onclick="closePpt()">Close Preview</button>
      `;
    }
  }

  renderSlide();
  document.getElementById("pptModal").classList.add("open");
  document.body.style.overflow="hidden";
}

async function downloadCurrentPptFile() {
  const isPurchased = isPresentationPurchased(currentSubpartTitle, currentSubpartFileId);
  if (!isPurchased) {
    showToast("🔒 Presentation download is locked. Complete checkout to download.", "info");
    triggerCheckoutForCurrent();
    return;
  }

  if (currentSubpartFileId) {
    if (window.MLTFilesDB && window.MLTFilesDB.downloadFile) {
      showToast(`⏳ Downloading "${currentSubpartFileName || 'presentation.pptx'}"...`, "info");
      await window.MLTFilesDB.downloadFile(currentSubpartFileId, currentSubpartFileName || "presentation.pptx");
      showToast(`✓ Download started for "${currentSubpartFileName}"!`, "success");
    } else {
      showToast("File storage system is initializing...", "info");
    }
  } else {
    // Generate and download standard presentation
    exportCurrentSlidesAsFile();
  }
}

function exportCurrentSlidesAsFile() {
  showToast(`⏳ Preparing presentation file for "${currentSubpartTitle}"...`, "info");
  const slides = currentPptSlides || [];
  const content = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<title>${currentSubpartTitle} - MLThub</title>
<style>
  body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;color:#f8fafc;padding:2rem;margin:0;}
  .slide{background:#1e293b;border-radius:12px;padding:2rem;margin-bottom:2rem;box-shadow:0 4px 12px rgba(0,0,0,.3);}
  .title{font-size:1.5rem;font-weight:bold;color:#38bdf8;margin-bottom:1rem;}
  .body{line-height:1.7;color:#cbd5e1;font-size:1.1rem;}
  ul{padding-left:1.5rem;}
</style>
</head>
<body>
  <h1>${currentSubpartTitle}</h1>
  <p>MLThub Medical Presentation · Licensed to Purchaser</p>
  <hr style="border:1px solid #334155;margin:1.5rem 0;"/>
  ${slides.map((s,i)=>`
    <div class="slide">
      <div style="font-size:.8rem;color:#94a3b8;">SLIDE ${i+1} OF ${slides.length}</div>
      <div class="title">${s.title}</div>
      <div class="body">${(s.body||"").replace(/\\n/g,"<br/>")}</div>
    </div>
  `).join("")}
</body>
</html>`;

  const blob = new Blob([content], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${currentSubpartTitle.replace(/[^a-zA-Z0-9_\-]/g, "_")}_Presentation.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`✓ Download started for "${currentSubpartTitle}"!`, "success");
}


function renderSlide(){
  if (!currentPptSlides || !currentPptSlides[currentSlideIndex]) return;
  const slide=currentPptSlides[currentSlideIndex];
  const bodyText = slide.body || "";
  const bodyHtml=bodyText.includes("\n")
    ?"<ul>"+bodyText.split("\n").filter(l=>l.trim()).map(l=>`<li>${l.replace(/^[•\-]\s*/,"")}</li>`).join("")+"</ul>"
    :`<p>${bodyText}</p>`;
  document.getElementById("pptViewer").innerHTML=`
    <div class="slide-content">
      <div class="slide-num">SLIDE ${currentSlideIndex+1} OF ${currentPptSlides.length}</div>
      <div class="slide-icon">${slide.icon || "📋"}</div>
      <div class="slide-title">${slide.title || "Slide Title"}</div>
      <div class="slide-body">${bodyHtml}</div>
    </div>`;
  document.getElementById("slideCounter").textContent=`${currentSlideIndex+1} / ${currentPptSlides.length}`;
  document.getElementById("prevBtn").disabled=currentSlideIndex===0;
  document.getElementById("nextBtn").disabled=currentSlideIndex===currentPptSlides.length-1;
}

function prevSlide(){if(currentSlideIndex>0){currentSlideIndex--;renderSlide();}}
function nextSlide(){if(currentSlideIndex<currentPptSlides.length-1){currentSlideIndex++;renderSlide();}}
function closePptModal(e){if(e.target===document.getElementById("pptModal"))closePpt();}
function closePpt(){
  document.getElementById("pptModal").classList.remove("open");
  document.body.style.overflow="";
  const pptControls = document.querySelector("#pptModal .ppt-controls");
  if (pptControls) pptControls.style.display = "flex";
}

function addToCart(){
  cart.push({title:currentSubpartTitle,subject:currentSubject?.name,price:1.00});
  showToast(`✓ "${currentSubpartTitle}" added to cart!`,"success");
}

function getAllTopics(){
  const list = getLiveSubjectsList();
  return list.flatMap(s=>(s.subparts||[]).map((sp,i)=>({name:sp.title,subject:s.name,subjectId:s.id,icon:s.icon,subpartIndex:i})));
}

function handleSearch(){
  const q=document.getElementById("searchInput").value.toLowerCase().trim();
  const sugBox=document.getElementById("searchSuggestions");
  if(!q){sugBox.style.display="none";return;}
  const list = getLiveSubjectsList();
  const topics = getAllTopics();
  const matches=[
    ...list.filter(s=>s.name.toLowerCase().includes(q)).map(s=>({type:"subject",label:s.name,icon:s.icon,id:s.id})),
    ...topics.filter(t=>t.name.toLowerCase().includes(q)).slice(0,5).map(t=>({type:"topic",label:t.name,icon:t.icon,id:t.subjectId,spIdx:t.subpartIndex}))
  ].slice(0,8);
  if(!matches.length){sugBox.style.display="none";return;}
  sugBox.style.display="block";
  sugBox.innerHTML=matches.map(m=>`
    <div class="suggestion-item" onclick="${m.type==="subject"?`openSubject(${m.id})`:`openPptViewer(${m.id},${m.spIdx})`}; closeSuggestions();">
      <i class="${m.icon}"></i><span>${m.label}</span>
      <span style="margin-left:auto;font-size:.75rem;color:var(--muted);">${m.type==="subject"?"Subject":"Topic"}</span>
    </div>`).join("");
}

function triggerSearch(){
  const q=document.getElementById("searchInput").value.toLowerCase().trim();
  if(!q)return;closeSuggestions();
  const list = getLiveSubjectsList();
  const matchedSubjects=list.filter(s=>s.name.toLowerCase().includes(q)||(s.subparts||[]).some(sp=>sp.title.toLowerCase().includes(q)));
  document.getElementById("subjects").style.display="none";
  document.getElementById("searchResults").style.display="block";
  document.getElementById("searchResultsGrid").innerHTML=matchedSubjects.map(s=>`
    <div class="subject-card" onclick="openSubject(${s.id})" style="--card-color:${s.color};">
      <div class="subject-icon" style="background:${s.bg};color:${s.color};"><i class="${s.icon}"></i></div>
      <div class="subject-name">${s.name}</div>
      <div class="subject-count">${(s.subparts||[]).length} topics</div>
    </div>`).join("");
  document.getElementById("searchResults").scrollIntoView({behavior:"smooth"});
}

function closeSearch(){
  document.getElementById("searchResults").style.display="none";
  document.getElementById("subjects").style.display="block";
  document.getElementById("searchInput").value="";
}
function closeSuggestions(){document.getElementById("searchSuggestions").style.display="none";}
document.addEventListener("click",e=>{if(!e.target.closest(".search-wrapper"))closeSuggestions();});

function toggleFaq(btn){
  const item=btn.parentElement,answer=item.querySelector(".faq-answer"),isOpen=btn.classList.contains("open");
  document.querySelectorAll(".faq-question.open").forEach(q=>{q.classList.remove("open");q.parentElement.querySelector(".faq-answer").classList.remove("open");});
  if(!isOpen){btn.classList.add("open");answer.classList.add("open");}
}

function showLoginModal(){document.getElementById("loginModal").classList.add("open");document.body.style.overflow="hidden";}
function closeLoginModal(e){if(e.target===document.getElementById("loginModal")){document.getElementById("loginModal").classList.remove("open");document.body.style.overflow="";}}
function submitForm(e){e.preventDefault();showToast("✓ Message sent! We'll respond within 24 hours.","success");e.target.reset();}

function showToast(msg,type=""){
  const t=document.getElementById("toast");
  t.textContent=msg;t.className="toast "+type+" show";
  setTimeout(()=>t.className="toast",3500);
}

function setupScrollEffects(){
  const header=document.getElementById("header"),backToTop=document.getElementById("backToTop");
  window.addEventListener("scroll",()=>{
    const scrollY=window.scrollY;
    if(header)header.classList.toggle("scrolled",scrollY>50);
    if(backToTop)backToTop.classList.toggle("visible",scrollY>400);
    const sections=["home","subjects","featured","faq","contact"];
    sections.forEach(id=>{
      const el=document.getElementById(id);if(!el)return;
      const top=el.getBoundingClientRect().top;
      if(top<=100&&top>-el.offsetHeight+100){
        document.querySelectorAll(".nav-link").forEach(l=>l.classList.remove("active"));
        const link=document.querySelector(`.nav-link[href="#${id}"]`);
        if(link)link.classList.add("active");
      }
    });
  });
  const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity="1";e.target.style.transform="translateY(0)";}});},{threshold:.1});
  document.querySelectorAll(".subject-card,.featured-card,.step-card,.contact-card").forEach(el=>{
    el.style.opacity="0";el.style.transform="translateY(20px)";el.style.transition="opacity .5s ease,transform .5s ease";observer.observe(el);
  });
}

function toggleMenu(){document.getElementById("navLinks").classList.toggle("open");}
document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll(".nav-link").forEach(link=>link.addEventListener("click",()=>document.getElementById("navLinks").classList.remove("open")));
});
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){closeModal();closePpt();closeCheckoutModal();document.getElementById("loginModal").classList.remove("open");document.body.style.overflow="";}
});


// =========================================================
//   MLThub Studio – Dynamic Page Renderer & Live Editor Sync
// =========================================================
function loadStudioContent() {
  try {
    const raw = localStorage.getItem("mlthub_studio_site_content");
    if (raw) {
      applyStudioContent(JSON.parse(raw));
    }
  } catch (e) {}
}

function applyStudioContent(c) {
  if (!c) return;

  // Header
  if (c.header) {
    const brandName = document.querySelector(".brand-name");
    const brandSub = document.querySelector(".brand-sub");
    if (brandName && c.header.brandName) brandName.textContent = c.header.brandName;
    if (brandSub && c.header.brandSub) brandSub.textContent = c.header.brandSub;
  }

  // Hero
  if (c.hero) {
    const heroBadge = document.querySelector(".hero-badge");
    const heroTitle = document.querySelector(".hero-title");
    const heroSub = document.querySelector(".hero-subtitle");
    const searchInput = document.getElementById("searchInput");

    if (heroBadge && c.hero.badge) heroBadge.innerHTML = `<i class="fa-solid fa-star"></i> ${c.hero.badge}`;
    if (heroTitle && c.hero.titleLine1) {
      heroTitle.innerHTML = `${c.hero.titleLine1} <span class="highlight">${c.hero.highlightText || 'PowerPoint'}</span><br/>${c.hero.titleLine2 || ''}`;
    }
    if (heroSub && c.hero.subtitle) heroSub.textContent = c.hero.subtitle;
    if (searchInput && c.hero.searchPlaceholder) searchInput.placeholder = c.hero.searchPlaceholder;

    // Stats
    const stats = document.querySelectorAll(".hero-stats .stat");
    if (stats.length >= 4) {
      if (c.hero.stat1Num) stats[0].querySelector(".stat-num").textContent = c.hero.stat1Num;
      if (c.hero.stat1Label) stats[0].querySelector(".stat-label").textContent = c.hero.stat1Label;
      if (c.hero.stat2Num) stats[1].querySelector(".stat-num").textContent = c.hero.stat2Num;
      if (c.hero.stat2Label) stats[1].querySelector(".stat-label").textContent = c.hero.stat2Label;
      if (c.hero.stat3Num) stats[2].querySelector(".stat-num").textContent = c.hero.stat3Num;
      if (c.hero.stat3Label) stats[2].querySelector(".stat-label").textContent = c.hero.stat3Label;
      if (c.hero.stat4Num) stats[3].querySelector(".stat-num").textContent = c.hero.stat4Num;
      if (c.hero.stat4Label) stats[3].querySelector(".stat-label").textContent = c.hero.stat4Label;
    }
  }

  // Subjects section title
  if (c.subjectsSection) {
    const sec = document.getElementById("subjects");
    if (sec) {
      const badge = sec.querySelector(".section-badge");
      const title = sec.querySelector(".section-title");
      const sub = sec.querySelector(".section-subtitle");
      if (badge && c.subjectsSection.badge) badge.textContent = c.subjectsSection.badge;
      if (title && c.subjectsSection.title) title.textContent = c.subjectsSection.title;
      if (sub && c.subjectsSection.subtitle) sub.textContent = c.subjectsSection.subtitle;
    }
  }

  // FAQ section
  if (c.faqSection && c.faqSection.items && c.faqSection.items.length) {
    const container = document.querySelector(".faq-container");
    if (container) {
      container.innerHTML = c.faqSection.items.map(item => `
        <div class="faq-item">
          <button class="faq-question" onclick="toggleFaq(this)">
            <span>${item.q}</span>
            <i class="fa-solid fa-chevron-down faq-icon"></i>
          </button>
          <div class="faq-answer"><p>${item.a}</p></div>
        </div>
      `).join("");
    }
  }

  // Contact section
  if (c.contactSection) {
    const infoCards = document.querySelectorAll(".contact-info .contact-card");
    if (infoCards.length >= 4) {
      if (c.contactSection.email) infoCards[0].querySelector("p").textContent = c.contactSection.email;
      if (c.contactSection.phone) infoCards[1].querySelector("p").textContent = c.contactSection.phone;
      if (c.contactSection.whatsapp) infoCards[2].querySelector("p").textContent = c.contactSection.whatsapp;
      if (c.contactSection.hours) infoCards[3].querySelector("p").textContent = c.contactSection.hours;
    }
  }

  // Footer
  if (c.footer) {
    const footerDesc = document.querySelector(".footer-desc");
    const footerBottom = document.querySelector(".footer-bottom p");
    if (footerDesc && c.footer.desc) footerDesc.textContent = c.footer.desc;
    if (footerBottom && c.footer.copyright) footerBottom.innerHTML = c.footer.copyright;
  }

  // Render Custom Sections dynamically
  let customWrap = document.getElementById("customSectionsWrapper");
  if (!customWrap) {
    customWrap = document.createElement("div");
    customWrap.id = "customSectionsWrapper";
    const contactSec = document.getElementById("contact");
    if (contactSec && contactSec.parentNode) {
      contactSec.parentNode.insertBefore(customWrap, contactSec);
    }
  }

  if (c.customSections && c.customSections.length) {
    customWrap.innerHTML = c.customSections.map(sec => `
      <section style="background:${sec.bg || '#f8fafc'};padding:4rem 0;">
        <div class="container" style="text-align:center;">
          <div style="font-size:2.5rem;color:var(--primary);margin-bottom:.75rem;"><i class="${sec.icon || 'fa-solid fa-star'}"></i></div>
          <h2 class="section-title" style="margin-bottom:.5rem;">${sec.title}</h2>
          <p class="section-subtitle" style="max-width:600px;margin:0 auto;">${sec.subtitle || ''}</p>
        </div>
      </section>
    `).join("");
  } else {
    customWrap.innerHTML = "";
  }
}

// PostMessage listener for Studio Live Editor Sync
window.addEventListener("message", e => {
  if (e.data && e.data.type === "MLT_STUDIO_UPDATE") {
    if (e.data.content) applyStudioContent(e.data.content);
    if (e.data.subjects && Array.isArray(e.data.subjects)) {
      renderSubjects(e.data.subjects);
      renderFeatured();
    }
  }
});
