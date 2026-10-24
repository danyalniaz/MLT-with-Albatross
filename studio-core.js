// =========================================================
//   MLThub Studio – Elementor-Style Core Engine
//   by Albatross
// =========================================================

const STUDIO_STORAGE_KEYS = {
  CONTENT: 'mlthub_studio_site_content',
  USERS: 'mlthub_studio_admin_users',
  SESSION: 'mlthub_studio_session',
  DRAFT: 'mlthub_studio_draft_content'
};

// Default Initial Admin Credentials
const INITIAL_ADMIN = {
  id: 'usr_master_admin',
  name: 'Albatross Administrator',
  email: 'admin@albatross.com',
  password: 'albatross123', // Clean default password for initial login
  role: 'SuperAdmin',
  createdAt: new Date().toISOString().split('T')[0]
};

// Default Site Content Schema (Header, Hero, Subjects, FAQ, Contact, Footer, Custom Sections)
const DEFAULT_SITE_CONTENT = {
  header: {
    brandName: "MLThub",
    brandSub: "by Albatross",
    logoIcon: "fa-solid fa-dna",
    navHome: "Home",
    navSubjects: "Subjects",
    navFeatured: "Featured",
    navFaq: "FAQ",
    navContact: "Contact"
  },
  hero: {
    badge: "#1 Medical PPT Platform",
    titleLine1: "Premium Medical",
    highlightText: "PowerPoint",
    titleLine2: "Presentations for Students",
    subtitle: "Access 1500+ professionally designed PPTs across 17 medical subjects. High-quality slides crafted by medical educators and specialists.",
    searchPlaceholder: "Search subjects, topics, slides…",
    stat1Num: "1500+",
    stat1Label: "PPT Slides",
    stat2Num: "17+",
    stat2Label: "Subjects",
    stat3Num: "50K+",
    stat3Label: "Students",
    stat4Num: "4.9★",
    stat4Label: "Rating",
    bgColor1: "#eff6ff",
    bgColor2: "#f0fdf4",
    bgColor3: "#fdf4ff"
  },
  subjectsSection: {
    badge: "Browse Library",
    title: "Medical Subjects",
    subtitle: "Explore our comprehensive library of professionally curated medical presentations"
  },
  featuredSection: {
    badge: "Top Picks",
    title: "Featured Presentations",
    subtitle: "Most downloaded and highest-rated slides this month"
  },
  howSection: {
    badge: "Simple Process",
    title: "How It Works",
    steps: [
      { num: "01", icon: "fa-solid fa-magnifying-glass", title: "Search & Browse", desc: "Find your subject or specific topic using our smart search or browse through categories." },
      { num: "02", icon: "fa-solid fa-eye", title: "Preview Slides", desc: "Preview all 10 slides before purchasing. Know exactly what you're getting." },
      { num: "03", icon: "fa-solid fa-cart-shopping", title: "Purchase", desc: "Secure checkout with multiple payment options. Instant delivery to your email." },
      { num: "04", icon: "fa-solid fa-download", title: "Download & Learn", desc: "Download your PPT files and start learning with expert-designed presentations." }
    ]
  },
  faqSection: {
    badge: "Got Questions?",
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about MLThub",
    items: [
      { q: "What is MLThub?", a: "MLThub (Medical Learning & Teaching Hub) by Albatross is a premium digital platform offering professionally designed PowerPoint presentations across all major medical subjects." },
      { q: "How many slides are included in each PPT?", a: "Each PPT presentation contains exactly 10 professionally designed slides covering key concepts, including medical illustrations, diagrams, mnemonics, and clinical pearls." },
      { q: "Can I preview slides before buying?", a: "Yes! You can preview all 10 slides of any presentation before making a purchase. Click on any subject or PPT card to open the slide viewer." },
      { q: "What formats are the PPT files available in?", a: "All presentations are available in Microsoft PowerPoint format (.pptx) which is fully editable." },
      { q: "What payment options are available?", a: "We accept all major payment methods including credit/debit cards, PayPal, UPI, and bank transfers." },
      { q: "Is there a refund policy?", a: "We offer a 7-day satisfaction guarantee. If you're not happy with the quality of our slides, we'll provide a full refund." }
    ]
  },
  contactSection: {
    badge: "Get In Touch",
    title: "Contact Us",
    subtitle: "Have questions? Our team is here to help you 24/7",
    email: "support@mlthub.com",
    phone: "+1 (800) MLT-HUBS",
    whatsapp: "Chat with us instantly",
    hours: "24/7 Online Support"
  },
  footer: {
    desc: "Premium medical PowerPoint presentations crafted by specialists. Empowering the next generation of healthcare professionals.",
    copyright: "© 2026 MLThub by Albatross. All rights reserved. | Designed with ❤ for Medical Students"
  },
  customSections: [] // Allows adding unlimited custom sections anywhere on the page
};

class MLTStudioCore {
  constructor() {
    this.initStorage();
  }

  initStorage() {
    if (!localStorage.getItem(STUDIO_STORAGE_KEYS.USERS)) {
      localStorage.setItem(STUDIO_STORAGE_KEYS.USERS, JSON.stringify([INITIAL_ADMIN]));
    }
    if (!localStorage.getItem(STUDIO_STORAGE_KEYS.CONTENT)) {
      localStorage.setItem(STUDIO_STORAGE_KEYS.CONTENT, JSON.stringify(DEFAULT_SITE_CONTENT));
    }
  }

  // --- Auth & Session ---
  getUsers() {
    return JSON.parse(localStorage.getItem(STUDIO_STORAGE_KEYS.USERS) || '[]');
  }

  saveUsers(users) {
    localStorage.setItem(STUDIO_STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  login(email, password) {
    const users = this.getUsers();
    const cleanEmail = email.trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail && u.password === password);

    if (!user) {
      throw new Error('Invalid admin email or password.');
    }

    const session = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: 'studio_sess_' + Date.now(),
      createdAt: Date.now()
    };

    sessionStorage.setItem(STUDIO_STORAGE_KEYS.SESSION, JSON.stringify(session));
    return session;
  }

  getCurrentSession() {
    try {
      const raw = sessionStorage.getItem(STUDIO_STORAGE_KEYS.SESSION);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  logout() {
    sessionStorage.removeItem(STUDIO_STORAGE_KEYS.SESSION);
  }

  createAdminUser({ name, email, password, role = 'Admin' }) {
    const users = this.getUsers();
    const cleanEmail = email.trim().toLowerCase();

    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      name: name.trim(),
      email: cleanEmail,
      password: password,
      role: role,
      createdAt: new Date().toISOString().split('T')[0]
    };

    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }

  updatePassword(email, newPassword) {
    const users = this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      user.password = newPassword;
      this.saveUsers(users);
    }
  }

  // --- Content Management (Save & Discard) ---
  getContent() {
    try {
      const raw = localStorage.getItem(STUDIO_STORAGE_KEYS.CONTENT);
      return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(DEFAULT_SITE_CONTENT));
    } catch (e) {
      return JSON.parse(JSON.stringify(DEFAULT_SITE_CONTENT));
    }
  }

  saveContent(newContent) {
    localStorage.setItem(STUDIO_STORAGE_KEYS.CONTENT, JSON.stringify(newContent));
    // Clear draft once saved
    localStorage.removeItem(STUDIO_STORAGE_KEYS.DRAFT);
  }

  saveDraft(draftContent) {
    localStorage.setItem(STUDIO_STORAGE_KEYS.DRAFT, JSON.stringify(draftContent));
  }

  getDraft() {
    try {
      const raw = localStorage.getItem(STUDIO_STORAGE_KEYS.DRAFT);
      return raw ? JSON.parse(raw) : this.getContent();
    } catch (e) {
      return this.getContent();
    }
  }

  discardDraft() {
    localStorage.removeItem(STUDIO_STORAGE_KEYS.DRAFT);
    return this.getContent();
  }

  resetToDefaults() {
    localStorage.setItem(STUDIO_STORAGE_KEYS.CONTENT, JSON.stringify(DEFAULT_SITE_CONTENT));
    localStorage.removeItem(STUDIO_STORAGE_KEYS.DRAFT);
    return DEFAULT_SITE_CONTENT;
  }
}

window.MLTStudio = new MLTStudioCore();
