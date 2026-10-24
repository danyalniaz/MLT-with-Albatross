// =========================================================
//   MLThub – file-storage.js  |  by Albatross
//   IndexedDB Presentation Storage Engine for Phone & Laptop
// =========================================================

const MLTFilesDB = {
  dbName: 'mlthub_files_db',
  dbVersion: 1,
  storeName: 'ppt_files',

  openDB() {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        console.warn('IndexedDB not supported on this browser.');
        return resolve(null);
      }
      const request = indexedDB.open(this.dbName, this.dbVersion);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'fileId' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  async saveFile(file) {
    const db = await this.openDB();
    const fileId = 'ppt_file_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const fileRecord = {
      fileId: fileId,
      fileName: file.name,
      fileSize: this.formatFileSize(file.size),
      sizeBytes: file.size,
      fileType: file.type || 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      lastModified: file.lastModified,
      blob: file,
      uploadedAt: new Date().toISOString()
    };

    if (!db) {
      // Fallback: Store metadata in localStorage if IndexedDB is blocked
      return fileRecord;
    }

    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readwrite');
      const store = tx.objectStore(this.storeName);
      const req = store.put(fileRecord);
      req.onsuccess = () => resolve(fileRecord);
      req.onerror = () => reject(req.error);
    });
  },

  async getFile(fileId) {
    const db = await this.openDB();
    if (!db) return null;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readonly');
      const store = tx.objectStore(this.storeName);
      const req = store.get(fileId);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  },

  async deleteFile(fileId) {
    const db = await this.openDB();
    if (!db) return false;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readwrite');
      const store = tx.objectStore(this.storeName);
      const req = store.delete(fileId);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  },

  async downloadFile(fileId, fallbackName = 'presentation.pptx') {
    const record = await this.getFile(fileId);
    if (!record || !record.blob) {
      alert('The attached file could not be found in device storage. It may have been cleared.');
      return;
    }
    const blob = record.blob;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = record.fileName || fallbackName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1200);
  },

  formatFileSize(bytes) {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  },

  cleanTitleFromFileName(name) {
    if (!name) return 'Medical Presentation';
    // Remove extension
    let clean = name.replace(/\.(pptx|ppt|pdf|ppsx|odp)$/i, '');
    // Replace underscores, hyphens, and multiple dots with spaces
    clean = clean.replace(/[_\-\.]+/g, ' ').trim();
    // Capitalize words
    clean = clean.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return clean || 'Medical Presentation';
  },

  generateSlidesForTitle(title, icon = '📋') {
    return [
      {
        title: `Introduction: ${title}`,
        icon: icon,
        body: `• Overview and clinical scope of ${title}\n• Learning objectives for medical students and specialists\n• Foundational definitions and medical terminology\n• Essential anatomy and physiological context`
      },
      {
        title: "Epidemiology & Disease Burden",
        icon: "📊",
        body: "• Global prevalence, incidence rates and demographic distribution\n• High-risk populations and clinical predispositions\n• Environmental, genetic, and modifiable lifestyle risk factors\n• Screening guidelines and preventative health measures"
      },
      {
        title: "Pathogenesis & Cellular Mechanisms",
        icon: "🔬",
        body: "• Primary molecular and cellular alterations\n• Structural tissue remodelling and histological hallmarks\n• Organ system compensation vs decompensation pathways\n• Cascade of biochemical biomarkers and acute phase reactants"
      },
      {
        title: "Clinical Presentation & Symptomatology",
        icon: "🩺",
        body: "• Hallmark cardinal symptoms and chief complaints\n• Detailed history taking: onset, duration, triggers and relieving factors\n• Key physical examination findings and clinical signs\n• Atypical presentations in elderly and paediatric populations"
      },
      {
        title: "Diagnostic Workup & Laboratory Tests",
        icon: "🧪",
        body: "• Baseline laboratory evaluations (CBC, renal, liver, inflammatory panels)\n• Specialty diagnostic assays and serological profiling\n• Diagnostic sensitivity vs specificity considerations\n• Point-of-care testing vs gold standard confirmatory assays"
      },
      {
        title: "Imaging & Diagnostic Modalities",
        icon: "🩻",
        body: "• First-line imaging modalities (X-Ray, Ultrasound)\n• Advanced cross-sectional imaging (CT Scan, MRI, Nuclear Medicine)\n• Characteristic radiologic appearances and pattern recognition\n• Diagnostic scoring systems and algorithmic interpretation"
      },
      {
        title: "Differential Diagnosis & Red Flags",
        icon: "⚠️",
        body: "• Crucial clinical mimickers requiring systematic exclusion\n• High-risk \"cannot miss\" emergency red flag features\n• Structured clinical reasoning mnemonics for exam revision\n• Algorithmic rule-out pathways"
      },
      {
        title: "Management: Medical & Pharmacotherapy",
        icon: "💊",
        body: "• First-line pharmacological agents and mechanisms of action\n• Evidence-based therapeutic dosing regimens\n• Monitoring parameters, drug-drug interactions and adverse profiles\n• Secondary treatment options and refractory management"
      },
      {
        title: "Interventions & Procedural Care",
        icon: "🏥",
        body: "• Indications for invasive procedural or surgical intervention\n• Pre-procedure medical optimisation and risk stratification\n• Procedural techniques overview and post-procedure monitoring\n• Prevention and management of acute post-procedural complications"
      },
      {
        title: "Prognosis, Complications & Key Takeaways",
        icon: "🎯",
        body: "• Short-term clinical course and long-term prognosis indicators\n• Multidisciplinary team follow-up and patient rehabilitation\n• High-yield exam revision pearls and clinical mnemonics\n• Summary of current evidence-based clinical guidelines"
      }
    ];
  }
};

window.MLTFilesDB = MLTFilesDB;
