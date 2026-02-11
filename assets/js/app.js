// ===== St. Lucia Business Guide - Main JS =====

// ===== BOOK PAGES DATA =====
const BOOK_PAGES = {
  en: [
    { file: 'index.html', title: 'Home', icon: '&#127968;', desc: 'Your gateway to business in Saint Lucia' },
    { file: 'overview.html', title: 'Country Overview', icon: '&#127758;', desc: 'Geography, economy, infrastructure & demographics' },
    { file: 'business.html', title: 'Business Setup', icon: '&#127970;', desc: 'Company registration, banking & business operations' },
    { file: 'legal.html', title: 'Legal & Tax Framework', icon: '&#9878;', desc: 'Tax rates, labor laws & regulatory landscape' },
    { file: 'sectors.html', title: 'Key Sectors', icon: '&#127965;', desc: 'Tourism, agriculture, energy & construction' },
    { file: 'cbi.html', title: 'Citizenship by Investment', icon: '&#127963;', desc: 'CBI program, requirements & real estate options' },
    { file: 'immigration.html', title: 'Immigration', icon: '&#9992;', desc: 'Visas, work permits & residency pathways' },
    { file: 'living.html', title: 'Living in St. Lucia', icon: '&#127796;', desc: 'Healthcare, education, cost of living & lifestyle' },
    { file: 'expats.html', title: 'Expat Guide', icon: '&#129489;', desc: 'Practical tips for expatriates & digital nomads' },
    { file: 'events.html', title: 'Events & Culture', icon: '&#127926;', desc: 'Jazz festival, carnival, sports & cultural calendar' },
    { file: 'trade.html', title: 'Trade & Export', icon: '&#128674;', desc: 'Import/export, trade agreements & logistics' },
    { file: 'government.html', title: 'Government', icon: '&#127963;', desc: 'Political system, budget & public policy' },
    { file: 'realestate.html', title: 'Real Estate', icon: '&#127968;', desc: 'Property market, prices & development pipeline' },
    { file: 'startups.html', title: 'Startups & Innovation', icon: '&#128161;', desc: 'Incubators, funding & digital economy' },
    { file: 'checklist.html', title: 'Business Checklist', icon: '&#9989;', desc: 'Step-by-step setup checklist' },
    { file: 'resources.html', title: 'Resources', icon: '&#128218;', desc: 'Useful links, contacts & references' },
    { file: 'faq.html', title: 'FAQ', icon: '&#10067;', desc: 'Frequently asked questions' },
    { file: 'map.html', title: 'Interactive Map', icon: '&#128506;', desc: 'Explore key locations across St. Lucia' },
    { file: 'directory.html', title: 'Business Directory', icon: '&#128210;', desc: 'Find businesses, services & contacts' }
  ],
  tr: [
    { file: 'index.html', title: 'Ana Sayfa', icon: '&#127968;', desc: 'Saint Lucia\'da iş dünyasına açılan kapınız' },
    { file: 'overview.html', title: 'Ülke Genel Bakış', icon: '&#127758;', desc: 'Coğrafya, ekonomi, altyapı ve demografi' },
    { file: 'business.html', title: 'İş Kurulumu', icon: '&#127970;', desc: 'Şirket kaydı, bankacılık ve iş operasyonları' },
    { file: 'legal.html', title: 'Hukuk ve Vergi', icon: '&#9878;', desc: 'Vergi oranları, iş hukuku ve düzenlemeler' },
    { file: 'sectors.html', title: 'Sektörler', icon: '&#127965;', desc: 'Turizm, tarım, enerji ve inşaat' },
    { file: 'cbi.html', title: 'Yatırım Yoluyla Vatandaşlık', icon: '&#127963;', desc: 'CBI programı, gereksinimler ve gayrimenkul seçenekleri' },
    { file: 'immigration.html', title: 'Göç', icon: '&#9992;', desc: 'Vize, çalışma izni ve oturma yolları' },
    { file: 'living.html', title: 'Yaşam', icon: '&#127796;', desc: 'Sağlık, eğitim, yaşam maliyeti ve yaşam tarzı' },
    { file: 'expats.html', title: 'Göçmen Rehberi', icon: '&#129489;', desc: 'Gurbetçiler ve dijital göçebeler için ipuçları' },
    { file: 'events.html', title: 'Etkinlikler', icon: '&#127926;', desc: 'Jazz festivali, karnaval, spor ve kültür takvimi' },
    { file: 'trade.html', title: 'Ticaret', icon: '&#128674;', desc: 'İthalat/ihracat, ticaret anlaşmaları ve lojistik' },
    { file: 'government.html', title: 'Hükümet', icon: '&#127963;', desc: 'Siyasi sistem, bütçe ve kamu politikası' },
    { file: 'realestate.html', title: 'Gayrimenkul', icon: '&#127968;', desc: 'Emlak piyasası, fiyatlar ve geliştirme projeleri' },
    { file: 'startups.html', title: 'Girişimler', icon: '&#128161;', desc: 'Kuluçka merkezleri, finansman ve dijital ekonomi' },
    { file: 'checklist.html', title: 'İş Kontrol Listesi', icon: '&#9989;', desc: 'Adım adım kurulum kontrol listesi' },
    { file: 'resources.html', title: 'Kaynaklar', icon: '&#128218;', desc: 'Faydalı bağlantılar, iletişim ve referanslar' },
    { file: 'faq.html', title: 'SSS', icon: '&#10067;', desc: 'Sıkça sorulan sorular' },
    { file: 'map.html', title: 'Harita', icon: '&#128506;', desc: 'St. Lucia genelinde önemli konumları keşfedin' },
    { file: 'directory.html', title: 'Rehber', icon: '&#128210;', desc: 'İşletme, hizmet ve iletişim bilgileri' }
  ]
};

function getBookLabels() {
  const isTR = window.location.pathname.includes('/tr/');
  return isTR ? {
    continueReading: 'Okumaya Devam Et',
    nextChapter: 'Sonraki Bölüm',
    prevChapter: 'Önceki Bölüm',
    pageOf: 'Sayfa',
    of: '/',
    readComplete: 'Okundu',
    bookProgress: 'Rehber İlerlemesi',
    section: 'Bölüm',
    prev: 'Önceki',
    next: 'Sonraki'
  } : {
    continueReading: 'Continue Reading',
    nextChapter: 'Next Chapter',
    prevChapter: 'Previous Chapter',
    pageOf: 'Page',
    of: 'of',
    readComplete: 'Read',
    bookProgress: 'Guide Progress',
    section: 'Section',
    prev: 'Prev',
    next: 'Next'
  };
}

function getBookPages() {
  const isTR = window.location.pathname.includes('/tr/');
  return isTR ? BOOK_PAGES.tr : BOOK_PAGES.en;
}

function getCurrentPageIndex() {
  const pages = getBookPages();
  const pageKey = getPageKey();
  const file = pageKey.replace('tr/', '');
  return pages.findIndex(p => p.file === file);
}

function getNextPage() {
  const pages = getBookPages();
  const idx = getCurrentPageIndex();
  return idx >= 0 && idx < pages.length - 1 ? pages[idx + 1] : null;
}

function getPrevPage() {
  const pages = getBookPages();
  const idx = getCurrentPageIndex();
  return idx > 0 ? pages[idx - 1] : null;
}

function getPageFile() {
  const pageKey = getPageKey();
  return pageKey.replace('tr/', '');
}

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initTabs();
  initAccordions();
  initSearch();
  highlightActiveNav();
  initBackToTop();
  initReadingProgress();
  initSidebarScrollSpy();
  initResponsiveTables();
  initSectionReveal();
  initSiteSearch();
  initLikesAndReadTracking();
  initGlobalBookProgress();
  initMobileBottomNav();
  initContinueCTA();
  initSidebarCheckmarks();
  initIndexReadBadges();
});

// Mobile nav toggle
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
    }
  });
}

// Tab system
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabContainer => {
    const buttons = tabContainer.querySelectorAll('.tab-btn');
    const parent = tabContainer.parentElement;
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        parent.querySelectorAll('.tab-content').forEach(content => {
          content.classList.remove('active');
          if (content.id === target) content.classList.add('active');
        });
      });
    });
  });
}

// Accordion
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.accordion-body');
      const inner = body.querySelector('.accordion-body-inner');
      const isOpen = item.classList.contains('open');

      // Close all in same group
      const group = item.closest('.accordion-group');
      if (group) {
        group.querySelectorAll('.accordion-item').forEach(i => {
          i.classList.remove('open');
          i.querySelector('.accordion-body').style.maxHeight = '0';
        });
      }

      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = inner.scrollHeight + 'px';
      }
    });
  });
}

// Search/filter
function initSearch() {
  const searchInput = document.querySelector('#search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLocaleLowerCase('tr').trim();
    const searchableItems = document.querySelectorAll('[data-searchable]');

    searchableItems.forEach(item => {
      const text = item.textContent.toLocaleLowerCase('tr');
      item.style.display = text.includes(query) || query === '' ? '' : 'none';
    });

    // Update result count if exists
    const counter = document.querySelector('#search-count');
    if (counter) {
      const visible = document.querySelectorAll('[data-searchable]:not([style*="display: none"])').length;
      counter.textContent = `${visible} result${visible !== 1 ? 's' : ''}`;
    }
  });
}

// Highlight current page in nav
function highlightActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Back to top button
function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.innerHTML = '&#9650;';
  btn.setAttribute('aria-label', 'Back to top');
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}

// Reading progress bar
function initReadingProgress() {
  const bar = document.createElement('div');
  bar.className = 'reading-progress';
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  }, { passive: true });
}

// Sidebar scroll-spy
function initSidebarScrollSpy() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  const links = sidebar.querySelectorAll('a[href^="#"]');
  if (links.length === 0) return;

  const sections = [];
  links.forEach(link => {
    const id = link.getAttribute('href').substring(1);
    const section = document.getElementById(id);
    if (section) sections.push({ link, section });
  });

  if (sections.length === 0) return;

  function updateActive() {
    const scrollPos = window.scrollY + 120;
    let current = sections[0];

    for (const item of sections) {
      if (item.section.offsetTop <= scrollPos) {
        current = item;
      }
    }

    links.forEach(l => l.classList.remove('active'));
    if (current) current.link.classList.add('active');
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
}

// Auto-inject data-label and table-card-mobile class for wide tables on mobile
function initResponsiveTables() {
  document.querySelectorAll('.table-wrapper table').forEach(table => {
    const headers = table.querySelectorAll('thead th');
    if (headers.length < 5) return; // Only apply to wide tables (5+ cols)
    table.classList.add('table-card-mobile');
    const labels = Array.from(headers).map(th => th.textContent.trim());
    table.querySelectorAll('tbody tr').forEach(row => {
      row.querySelectorAll('td').forEach((td, i) => {
        if (labels[i]) td.setAttribute('data-label', labels[i]);
      });
    });
  });
}

// Section reveal on scroll
function initSectionReveal() {
  const targets = document.querySelectorAll('.section, .info-box, .card, .table-wrapper');
  if (!targets.length) return;

  // Skip animations if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Add will-reveal class via JS (content stays visible if JS fails)
  targets.forEach(el => {
    if (!el.classList.contains('hero')) el.classList.add('will-reveal');
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    targets.forEach(el => observer.observe(el));
  }

  // Fallback: reveal everything after 2s in case observer fails
  setTimeout(() => {
    document.querySelectorAll('.will-reveal:not(.revealed)').forEach(el => {
      el.classList.add('revealed');
    });
  }, 2000);
}

// Hide page loader when content is ready
function hidePageLoader() {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    loader.classList.add('loaded');
    setTimeout(() => loader.remove(), 500);
  }
}
window.addEventListener('load', hidePageLoader);
// Fallback: hide loader after 4s max
setTimeout(hidePageLoader, 4000);

// Utility: smooth scroll to element
function scrollTo(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== LIKES & READ TRACKING =====
function initLikesAndReadTracking() {
  const pageKey = getPageKey();
  const likesBtn = document.getElementById('likes-toggle');
  const likesBadge = document.getElementById('likes-badge');
  if (!likesBtn) return;

  // Create likes panel
  const panel = document.createElement('div');
  panel.className = 'likes-panel';
  panel.id = 'likes-panel';
  panel.innerHTML = `
    <div class="likes-panel-header">
      <h4>&#9829; Liked Sections</h4>
      <button class="likes-panel-close" aria-label="Close">&times;</button>
    </div>
    <div class="likes-panel-body" id="likes-panel-body"></div>
  `;
  document.body.appendChild(panel);

  // Toggle panel
  likesBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) renderLikesPanel();
  });

  panel.querySelector('.likes-panel-close').addEventListener('click', () => {
    panel.classList.remove('open');
  });

  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !likesBtn.contains(e.target)) {
      panel.classList.remove('open');
    }
  });

  // Find content sections (div[id] with h2 inside .main-content)
  const mainContent = document.querySelector('.main-content');
  if (!mainContent) { updateLikesBadge(); storeSectionCount(); return; }

  const pageFile = getPageFile();
  let sections;
  const isFaq = pageFile === 'faq.html';

  if (isFaq) {
    // FAQ uses .faq-category-header inside div[id] instead of h2
    sections = [];
    mainContent.querySelectorAll('.faq-category-header').forEach((header, i) => {
      const parent = header.closest('div[id]') || header.parentElement;
      if (!parent.id) parent.id = 'faq-section-' + i;
      sections.push(parent);
    });
    sections = sections.filter((s, i, arr) => arr.indexOf(s) === i); // deduplicate
  } else {
    sections = Array.from(mainContent.querySelectorAll('div[id]')).filter(s => s.querySelector('h2'));
  }

  if (!sections.length) { updateLikesBadge(); storeSectionCount(); return; }

  // Load saved state
  const likes = getLikes();
  const readSections = getReadSections(pageKey);

  // Inject like buttons and read markers into each section
  sections.forEach(section => {
    const heading = isFaq ? section.querySelector('.faq-category-header h3, .faq-category-header') : section.querySelector('h2');
    if (!heading) return;

    const sectionId = section.id;
    const sectionTitle = heading.textContent.trim();

    // Like button
    const likeBtn = document.createElement('button');
    likeBtn.className = 'section-like-btn' + (isLiked(pageKey, sectionId) ? ' liked' : '');
    likeBtn.innerHTML = '<span class="like-heart-icon">&#9825;</span><span class="like-heart-filled">&#9829;</span>';
    likeBtn.title = isLiked(pageKey, sectionId) ? 'Unlike this section' : 'Like this section';
    likeBtn.addEventListener('click', () => {
      toggleLike(pageKey, sectionId, sectionTitle);
      const liked = isLiked(pageKey, sectionId);
      likeBtn.classList.toggle('liked', liked);
      likeBtn.title = liked ? 'Unlike this section' : 'Like this section';
      likeBtn.classList.add('animate');
      setTimeout(() => likeBtn.classList.remove('animate'), 300);
      updateLikesBadge();
    });
    heading.appendChild(likeBtn);

    // Read marker
    const readMarker = document.createElement('span');
    readMarker.className = 'section-read-marker';
    readMarker.innerHTML = '&#10003; Read';
    readMarker.id = 'read-' + sectionId;
    if (readSections.includes(sectionId)) {
      readMarker.classList.add('visible');
    }
    heading.appendChild(readMarker);
  });

  // Read tracking with IntersectionObserver
  if ('IntersectionObserver' in window) {
    const readTimers = {};
    const readObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        if (entry.isIntersecting) {
          if (!readTimers[id] && !readSections.includes(id)) {
            readTimers[id] = setTimeout(() => {
              markAsRead(pageKey, id);
              readSections.push(id);
              const marker = document.getElementById('read-' + id);
              if (marker) marker.classList.add('visible');
              updateSidebarCheck(id);
              updateGlobalBookProgress();
              readObserver.unobserve(entry.target);
            }, 3000);
          }
        } else {
          if (readTimers[id]) {
            clearTimeout(readTimers[id]);
            delete readTimers[id];
          }
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(section => {
      if (!readSections.includes(section.id)) {
        readObserver.observe(section);
      }
    });
  }

  storeSectionCount();
  updateLikesBadge();
}

function getPageKey() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  const isTR = path.includes('/tr/');
  return (isTR ? 'tr/' : '') + page;
}

function getPageTitle() {
  const h1 = document.querySelector('.hero h1');
  return h1 ? h1.textContent.trim() : document.title;
}

function getLikes() {
  try {
    return JSON.parse(localStorage.getItem('stlucia_likes') || '[]');
  } catch { return []; }
}

function saveLikes(likes) {
  localStorage.setItem('stlucia_likes', JSON.stringify(likes));
}

function isLiked(pageKey, sectionId) {
  return getLikes().some(l => l.page === pageKey && l.section === sectionId);
}

function toggleLike(pageKey, sectionId, sectionTitle) {
  let likes = getLikes();
  const idx = likes.findIndex(l => l.page === pageKey && l.section === sectionId);
  if (idx >= 0) {
    likes.splice(idx, 1);
  } else {
    likes.push({
      page: pageKey,
      section: sectionId,
      title: sectionTitle,
      pageTitle: getPageTitle(),
      timestamp: Date.now()
    });
  }
  saveLikes(likes);
}

function removeLike(pageKey, sectionId) {
  let likes = getLikes();
  likes = likes.filter(l => !(l.page === pageKey && l.section === sectionId));
  saveLikes(likes);
  updateLikesBadge();
  renderLikesPanel();
  // Update section button if on same page
  const currentPage = getPageKey();
  if (pageKey === currentPage) {
    const section = document.getElementById(sectionId);
    if (section) {
      const btn = section.querySelector('.section-like-btn');
      if (btn) {
        btn.classList.remove('liked');
        btn.title = 'Like this section';
      }
    }
  }
}

function getReadSections(pageKey) {
  try {
    const all = JSON.parse(localStorage.getItem('stlucia_read') || '{}');
    return all[pageKey] || [];
  } catch { return []; }
}

function markAsRead(pageKey, sectionId) {
  try {
    const all = JSON.parse(localStorage.getItem('stlucia_read') || '{}');
    if (!all[pageKey]) all[pageKey] = [];
    if (!all[pageKey].includes(sectionId)) all[pageKey].push(sectionId);
    localStorage.setItem('stlucia_read', JSON.stringify(all));
  } catch {}
}

function updateLikesBadge() {
  const badge = document.getElementById('likes-badge');
  const btn = document.getElementById('likes-toggle');
  if (!badge || !btn) return;
  const count = getLikes().length;
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
  btn.classList.toggle('has-likes', count > 0);
  btn.innerHTML = (count > 0 ? '&#9829;' : '&#9825;') + badge.outerHTML;
}

function renderLikesPanel() {
  const body = document.getElementById('likes-panel-body');
  if (!body) return;
  const likes = getLikes();

  if (likes.length === 0) {
    body.innerHTML = '<div class="likes-panel-empty">No liked sections yet.<br>Click the &#9825; on any section to save it here.</div>';
    return;
  }

  // Sort by most recent first
  const sorted = [...likes].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  const isTR = window.location.pathname.includes('/tr/');
  const prefix = isTR ? '' : '';

  body.innerHTML = sorted.map(like => {
    let href = like.page;
    const currentPage = getPageKey();
    // Build relative URL
    if (isTR && !like.page.startsWith('tr/')) {
      href = '../' + like.page;
    } else if (!isTR && like.page.startsWith('tr/')) {
      href = like.page;
    }
    href += '#' + like.section;

    return `<div class="likes-panel-item">
      <span class="like-heart">&#9829;</span>
      <a href="${href}" class="like-info" onclick="document.getElementById('likes-panel').classList.remove('open');">
        <div class="like-section">${escapeHtml(like.title)}</div>
        <div class="like-page">${escapeHtml(like.pageTitle || like.page)}</div>
      </a>
      <button class="like-remove" title="Remove" onclick="event.stopPropagation();removeLike('${like.page}','${like.section}');">&times;</button>
    </div>`;
  }).join('');
}

// ===== SITE-WIDE SEARCH =====
let searchIndex = null;

function initSiteSearch() {
  const searchBtn = document.getElementById('search-toggle');
  const searchOverlay = document.getElementById('search-overlay');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-overlay-input');
  const searchResults = document.getElementById('search-results');

  if (!searchBtn || !searchOverlay) return;

  // Load search index (handle both EN and TR paths)
  const searchIndexPath = window.location.pathname.includes('/tr/')
    ? '../data/search-index.json'
    : 'data/search-index.json';

  fetch(searchIndexPath)
    .then(res => res.json())
    .then(data => {
      searchIndex = data;
    })
    .catch(err => console.error('Failed to load search index:', err));

  // Open search
  searchBtn.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    searchInput.focus();
    document.body.style.overflow = 'hidden';
  });

  // Close search
  function closeSearch() {
    searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
    searchInput.value = '';
    searchResults.innerHTML = '';
  }

  searchClose.addEventListener('click', closeSearch);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
      closeSearch();
    }
  });

  // Close on overlay click
  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
      closeSearch();
    }
  });

  // Search as user types
  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const query = e.target.value.trim();

    if (query.length < 2) {
      searchResults.innerHTML = '';
      return;
    }

    searchTimeout = setTimeout(() => {
      performSearch(query, searchResults);
    }, 300);
  });
}

function performSearch(query, resultsContainer) {
  if (!searchIndex) {
    resultsContainer.innerHTML = '<div class="search-loading">Loading search index...</div>';
    return;
  }

  const queryLower = query.toLowerCase();
  const results = [];

  searchIndex.forEach(page => {
    page.sections.forEach(section => {
      const titleMatch = section.title.toLowerCase().includes(queryLower);
      const contentMatch = section.content.toLowerCase().includes(queryLower);

      if (titleMatch || contentMatch) {
        const snippet = getSnippet(section.content, query, 150);
        results.push({
          page: page.page,
          url: page.url,
          section: section.title,
          anchor: section.anchor,
          snippet: snippet,
          relevance: titleMatch ? 2 : 1
        });
      }
    });
  });

  // Sort by relevance
  results.sort((a, b) => b.relevance - a.relevance);

  // Display results
  if (results.length === 0) {
    resultsContainer.innerHTML = '<div class="search-no-results">No results found for "' + escapeHtml(query) + '"</div>';
  } else {
    resultsContainer.innerHTML = results.slice(0, 20).map(result => `
      <a href="${result.url}${result.anchor}" class="search-result-item" onclick="document.getElementById('search-overlay').classList.remove('active'); document.body.style.overflow='';">
        <div class="search-result-page">${escapeHtml(result.page)}</div>
        <div class="search-result-title">${escapeHtml(result.section)}</div>
        <div class="search-result-snippet">${highlightMatches(result.snippet, query)}</div>
      </a>
    `).join('');
  }
}

function getSnippet(text, query, maxLength) {
  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();
  const index = textLower.indexOf(queryLower);

  if (index === -1) {
    return text.substring(0, maxLength) + '...';
  }

  const start = Math.max(0, index - 50);
  const end = Math.min(text.length, index + query.length + 100);
  let snippet = text.substring(start, end);

  if (start > 0) snippet = '...' + snippet;
  if (end < text.length) snippet = snippet + '...';

  return snippet;
}

function highlightMatches(text, query) {
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
  return escapeHtml(text).replace(regex, '<mark>$1</mark>');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ===== GLOBAL BOOK PROGRESS =====
function initGlobalBookProgress() {
  const bar = document.createElement('div');
  bar.className = 'book-progress-bar';
  bar.id = 'book-progress-bar';
  document.body.appendChild(bar);
  updateGlobalBookProgress();
}

function storeSectionCount() {
  const pageFile = getPageFile();
  const mainContent = document.querySelector('.main-content');
  if (!mainContent) return;

  // Count sections: div[id] with h2, or faq-category-header
  let count = 0;
  if (pageFile === 'faq.html') {
    count = mainContent.querySelectorAll('.faq-category-header').length;
  } else {
    mainContent.querySelectorAll('div[id]').forEach(s => {
      if (s.querySelector('h2')) count++;
    });
  }
  if (count === 0) return;

  try {
    const counts = JSON.parse(localStorage.getItem('stlucia_section_counts') || '{}');
    const pageKey = getPageKey();
    counts[pageKey] = count;
    localStorage.setItem('stlucia_section_counts', JSON.stringify(counts));
  } catch {}
}

function updateGlobalBookProgress() {
  const bar = document.getElementById('book-progress-bar');
  if (!bar) return;

  try {
    const counts = JSON.parse(localStorage.getItem('stlucia_section_counts') || '{}');
    const readData = JSON.parse(localStorage.getItem('stlucia_read') || '{}');
    let totalSections = 0;
    let totalRead = 0;

    Object.keys(counts).forEach(pageKey => {
      totalSections += counts[pageKey];
      const readArr = readData[pageKey] || [];
      totalRead += Math.min(readArr.length, counts[pageKey]);
    });

    const pct = totalSections > 0 ? (totalRead / totalSections) * 100 : 0;
    bar.style.width = pct + '%';
  } catch {}
}

// ===== MOBILE BOTTOM NAVIGATION =====
function initMobileBottomNav() {
  // Only on mobile
  if (window.innerWidth > 960) return;

  const pageFile = getPageFile();
  // Skip on pages without sections
  const skipPages = ['index.html', 'map.html', 'directory.html'];
  if (skipPages.includes(pageFile)) return;

  const mainContent = document.querySelector('.main-content');
  if (!mainContent) return;

  // Gather sections
  let sections = [];
  if (pageFile === 'faq.html') {
    mainContent.querySelectorAll('.faq-category-header').forEach((header, i) => {
      const parent = header.closest('div[id]') || header.parentElement;
      const id = parent.id || 'faq-section-' + i;
      if (!parent.id) parent.id = id;
      const titleEl = header.querySelector('h3') || header;
      sections.push({ el: parent, id: id, title: titleEl.textContent.trim() });
    });
  } else {
    mainContent.querySelectorAll('div[id]').forEach(s => {
      const h2 = s.querySelector('h2');
      if (h2) {
        // Get text excluding like/read buttons
        let title = '';
        h2.childNodes.forEach(n => {
          if (n.nodeType === 3) title += n.textContent;
          else if (n.tagName && !n.classList.contains('section-like-btn') && !n.classList.contains('section-read-marker')) {
            title += n.textContent;
          }
        });
        sections.push({ el: s, id: s.id, title: title.trim() });
      }
    });
  }
  if (sections.length === 0) return;

  const labels = getBookLabels();

  // Create bottom nav
  const nav = document.createElement('div');
  nav.className = 'mobile-bottom-nav';
  nav.innerHTML = `
    <div class="mbn-progress"><div class="mbn-progress-fill"></div></div>
    <div class="mbn-controls">
      <button class="mbn-btn mbn-prev" aria-label="${labels.prev}">&#9664;</button>
      <div class="mbn-info">
        <div class="mbn-title"></div>
        <div class="mbn-counter"></div>
      </div>
      <button class="mbn-btn mbn-next" aria-label="${labels.next}">&#9654;</button>
    </div>
  `;
  document.body.appendChild(nav);
  document.body.classList.add('has-bottom-nav');

  const titleEl = nav.querySelector('.mbn-title');
  const counterEl = nav.querySelector('.mbn-counter');
  const progressFill = nav.querySelector('.mbn-progress-fill');
  const prevBtn = nav.querySelector('.mbn-prev');
  const nextBtn = nav.querySelector('.mbn-next');
  let currentIdx = 0;

  function updateBottomNav() {
    const scrollPos = window.scrollY + window.innerHeight * 0.4;
    let idx = 0;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].el.offsetTop <= scrollPos) idx = i;
    }
    currentIdx = idx;
    titleEl.textContent = sections[idx].title;
    counterEl.textContent = `${idx + 1} / ${sections.length}`;
    progressFill.style.width = ((idx + 1) / sections.length * 100) + '%';
    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === sections.length - 1;
  }

  prevBtn.addEventListener('click', () => {
    if (currentIdx > 0) {
      sections[currentIdx - 1].el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIdx < sections.length - 1) {
      sections[currentIdx + 1].el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  window.addEventListener('scroll', updateBottomNav, { passive: true });
  updateBottomNav();
}

// ===== CONTINUE TO NEXT PAGE CTA =====
function initContinueCTA() {
  const pages = getBookPages();
  const idx = getCurrentPageIndex();
  if (idx < 0) return; // Not in book

  const nextPage = getNextPage();
  const prevPage = getPrevPage();
  if (!nextPage && !prevPage) return;

  const labels = getBookLabels();
  const isTR = window.location.pathname.includes('/tr/');
  const prefix = isTR ? '' : '';

  // Find insertion point
  const mainContent = document.querySelector('.main-content');
  const footer = document.querySelector('.footer');
  const insertTarget = mainContent || (footer ? footer.parentElement : null);
  if (!insertTarget) return;

  const cta = document.createElement('div');
  cta.className = 'continue-cta';

  let html = '';
  if (prevPage) {
    html += `<a href="${prefix}${prevPage.file}" class="continue-prev">&larr; ${labels.prevChapter}: ${prevPage.title}</a>`;
  }
  if (nextPage) {
    html += `
      <div class="continue-label">${labels.continueReading}</div>
      <div class="continue-next-info">
        <span class="continue-icon">${nextPage.icon}</span>
        <div>
          <div class="continue-next-title">${nextPage.title}</div>
          <div class="continue-next-desc">${nextPage.desc}</div>
        </div>
      </div>
      <a href="${prefix}${nextPage.file}" class="continue-btn">${labels.nextChapter} &rarr;</a>
    `;
  }
  html += `<div class="continue-meta">${labels.pageOf} ${idx + 1} ${labels.of} ${pages.length}</div>`;
  cta.innerHTML = html;

  if (mainContent) {
    mainContent.appendChild(cta);
  } else if (footer) {
    footer.parentElement.insertBefore(cta, footer);
  }
}

// ===== SIDEBAR READ CHECKMARKS =====
function initSidebarCheckmarks() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  const pageKey = getPageKey();
  const readSections = getReadSections(pageKey);

  sidebar.querySelectorAll('a[href^="#"]').forEach(link => {
    const sectionId = link.getAttribute('href').substring(1);
    const check = document.createElement('span');
    check.className = 'sidebar-check';
    check.id = 'sidebar-check-' + sectionId;
    check.innerHTML = '&#10003;';
    if (readSections.includes(sectionId)) {
      check.classList.add('visible');
    }
    link.appendChild(check);
  });
}

function updateSidebarCheck(sectionId) {
  const check = document.getElementById('sidebar-check-' + sectionId);
  if (check) check.classList.add('visible');
}

// ===== INDEX PAGE READ BADGES =====
function initIndexReadBadges() {
  const pageFile = getPageFile();
  if (pageFile !== 'index.html') return;

  const cards = document.querySelectorAll('.card-grid .card[href]');
  if (!cards.length) return;

  try {
    const counts = JSON.parse(localStorage.getItem('stlucia_section_counts') || '{}');
    const readData = JSON.parse(localStorage.getItem('stlucia_read') || '{}');
    const isTR = window.location.pathname.includes('/tr/');
    const labels = getBookLabels();

    cards.forEach(card => {
      const href = card.getAttribute('href');
      if (!href) return;
      const file = href.replace('../', '').replace('tr/', '');
      const cardPageKey = (isTR ? 'tr/' : '') + file;

      const total = counts[cardPageKey] || 0;
      const read = readData[cardPageKey] ? Math.min(readData[cardPageKey].length, total) : 0;
      if (total === 0) return;

      const pct = Math.round((read / total) * 100);
      const isComplete = pct === 100;

      const badge = document.createElement('div');
      badge.className = 'card-read-progress';
      badge.innerHTML = `
        <div class="card-progress-bar"><div class="card-progress-fill" style="width:${pct}%"></div></div>
        ${isComplete ? `<span class="card-read-badge">${labels.readComplete}</span>` : `<span class="card-read-pct">${pct}%</span>`}
      `;
      card.appendChild(badge);
    });
  } catch {}
}

// ===== PWA: Service Worker Registration =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/stlucia/sw.js')
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}
