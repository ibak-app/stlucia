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
  initTopPageNav();
  initBottomSectionNav();
  initCollapsibleDetails();
  initReadMore();
  initIndexReadBadges();
  initNextPageButton();
  initWelcomeWalkthrough();
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

  // Create full-screen liked feed overlay (same pattern as search overlay)
  const overlay = document.createElement('div');
  overlay.className = 'liked-feed-overlay';
  overlay.id = 'liked-feed-overlay';
  overlay.innerHTML = `
    <div class="liked-feed-content">
      <div class="liked-feed-header">
        <h3>&#9829; Liked Sections</h3>
        <button class="liked-feed-close" aria-label="Close">&times;</button>
      </div>
      <div id="liked-feed-body"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector('.liked-feed-close').addEventListener('click', () => {
    closeLikedFeed();
  });

  // Close on overlay background click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLikedFeed();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeLikedFeed();
  });

  // Find content sections
  const mainContent = document.querySelector('.main-content');
  const pageFile = getPageFile();
  const isHome = pageFile === 'index.html';
  let sections;

  if (isHome) {
    // Homepage uses <section class="section"> with <h2> inside .section-header
    sections = [];
    document.querySelectorAll('section.section').forEach((sec, i) => {
      const h2 = sec.querySelector('.section-header h2') || sec.querySelector('h2');
      if (!h2) return;
      if (!sec.id) sec.id = 'home-section-' + i;
      sections.push(sec);
    });
  } else if (!mainContent) {
    storeSectionCount(); return;
  } else {
    const isFaq = pageFile === 'faq.html';

    if (isFaq) {
      sections = [];
      mainContent.querySelectorAll('.faq-category-header').forEach((header, i) => {
        const parent = header.closest('div[id]') || header.parentElement;
        if (!parent.id) parent.id = 'faq-section-' + i;
        sections.push(parent);
      });
      sections = sections.filter((s, i, arr) => arr.indexOf(s) === i);
    } else {
      sections = Array.from(mainContent.querySelectorAll('div[id]')).filter(s => s.querySelector('h2'));
    }
  }

  if (!sections.length) { storeSectionCount(); return; }

  const readSections = getReadSections(pageKey);

  // Apply .section-liked class to already-liked sections
  sections.forEach(section => {
    if (isLiked(pageKey, section.id)) {
      section.classList.add('section-liked');
    }
  });

  // Double-click to like/unlike sections (NO like buttons in headings)
  sections.forEach(section => {
    const isFaq = pageFile === 'faq.html';
    const heading = isFaq ? section.querySelector('.faq-category-header h3, .faq-category-header') : (section.querySelector('.section-header h2') || section.querySelector('h2'));
    if (!heading) return;
    const sectionId = section.id;
    const sectionTitle = heading.textContent.trim();

    section.addEventListener('dblclick', (e) => {
      // Skip if double-click was on interactive elements
      if (e.target.closest('a, button, input, textarea, select, details, summary')) return;

      toggleLike(pageKey, sectionId, sectionTitle);
      const liked = isLiked(pageKey, sectionId);
      section.classList.toggle('section-liked', liked);
      showHeartAnimation(e.clientX, e.clientY, liked);
    });
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
}

function showHeartAnimation(x, y, liked) {
  const heart = document.createElement('div');
  heart.className = 'heart-pop';
  heart.innerHTML = liked ? '&#9829;' : '&#9825;';
  heart.style.left = x + 'px';
  heart.style.top = y + 'px';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 900);
}

function closeLikedFeed() {
  const overlay = document.getElementById('liked-feed-overlay');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
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
  renderLikedFeed();
  // Remove .section-liked class if on same page
  const currentPage = getPageKey();
  if (pageKey === currentPage) {
    const section = document.getElementById(sectionId);
    if (section) section.classList.remove('section-liked');
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

function renderLikedFeed() {
  const body = document.getElementById('liked-feed-body');
  if (!body) return;
  const likes = getLikes();

  if (likes.length === 0) {
    body.innerHTML = '<div class="liked-feed-empty">No liked sections yet.<br>Double-tap any section to like it.</div>';
    return;
  }

  const sorted = [...likes].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  const isTR = window.location.pathname.includes('/tr/');

  body.innerHTML = sorted.map(like => {
    let href = like.page;
    if (isTR && !like.page.startsWith('tr/')) {
      href = '../' + like.page;
    } else if (!isTR && like.page.startsWith('tr/')) {
      href = like.page;
    }
    href += '#' + like.section;

    return `<a href="${href}" class="liked-feed-card" onclick="closeLikedFeed();">
      <span class="liked-feed-icon">&#9829;</span>
      <div class="liked-feed-info">
        <div class="liked-feed-title">${escapeHtml(like.title)}</div>
        <div class="liked-feed-page">${escapeHtml(like.pageTitle || like.page)}</div>
      </div>
      <button class="liked-feed-remove" title="Remove" onclick="event.preventDefault();event.stopPropagation();removeLike('${like.page}','${like.section}');">&times;</button>
    </a>`;
  }).join('');
}

// ===== SITE-WIDE SEARCH =====
let searchIndex = null;

function initSiteSearch() {
  const searchOverlay = document.getElementById('search-overlay');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-overlay-input');
  const searchResults = document.getElementById('search-results');

  if (!searchOverlay) return;

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

  // Close search
  function closeSearch() {
    searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.innerHTML = '';
  }

  if (searchClose) searchClose.addEventListener('click', closeSearch);

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
  if (searchInput && searchResults) {
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
  const isHome = pageFile === 'index.html';
  const mainContent = document.querySelector('.main-content');

  let count = 0;
  if (isHome) {
    document.querySelectorAll('section.section').forEach(sec => {
      if (sec.querySelector('h2')) count++;
    });
  } else if (!mainContent) {
    return;
  } else if (pageFile === 'faq.html') {
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

// ===== PAGE TRANSITION =====
function showPageTransition(targetPage, callback) {
  var overlay = document.createElement('div');
  overlay.className = 'page-transition';
  var label = targetPage ? targetPage.icon + ' ' + targetPage.title : '';
  overlay.innerHTML = '<div class="page-transition-content">' +
    '<div class="page-transition-spinner"></div>' +
    '<div class="page-transition-label">' + label + '</div>' +
    '</div>';
  document.body.appendChild(overlay);

  // Force reflow then add active class for animation
  overlay.offsetHeight;
  overlay.classList.add('active');

  setTimeout(function() {
    if (callback) callback();
  }, 350);
}

// ===== TOP PAGE NAVIGATION BAR =====
function initTopPageNav() {
  var pages = getBookPages();
  var idx = getCurrentPageIndex();
  if (idx < 0) return;

  var prevPage = getPrevPage();
  var nextPage = getNextPage();
  var currentPage = pages[idx];
  var isTR = window.location.pathname.includes('/tr/');

  var bar = document.createElement('div');
  bar.className = 'top-page-nav';
  bar.id = 'top-page-nav';

  // Build expandable page list
  var listHtml = '<div class="tpn-list" id="tpn-list">';
  // Search entry at top
  var searchLabel = isTR ? 'Rehberde Ara...' : 'Search the guide...';
  listHtml += '<div class="tpn-list-search" id="tpn-open-search">';
  listHtml += '<span>&#128269;</span> <span>' + searchLabel + '</span>';
  listHtml += '</div>';
  // Liked feed entry
  var likeCount = getLikes().length;
  listHtml += '<div class="tpn-list-liked" id="tpn-open-liked">';
  listHtml += '<span>&#9829;</span> <span>' + (isTR ? 'Beğenilen Bölümler' : 'Liked Sections') + '</span>';
  listHtml += '<span class="tpn-liked-count" id="tpn-liked-count">' + likeCount + '</span>';
  listHtml += '</div>';
  // Language switcher
  var currentFile = pages[idx].file;
  var enHref = isTR ? '../' + currentFile : currentFile;
  var trHref = isTR ? currentFile : 'tr/' + currentFile;
  listHtml += '<div class="tpn-list-lang">';
  listHtml += '<a href="' + enHref + '" class="tpn-lang-btn' + (isTR ? '' : ' active') + '">&#127468;&#127463; English</a>';
  listHtml += '<a href="' + trHref + '" class="tpn-lang-btn' + (isTR ? ' active' : '') + '">&#127481;&#127479; T\u00fcrk\u00e7e</a>';
  listHtml += '</div>';
  // Page links
  pages.forEach(function(p, i) {
    var activeClass = i === idx ? ' active' : '';
    var prefix = isTR ? '' : '';
    listHtml += '<a href="' + prefix + p.file + '" class="tpn-list-item' + activeClass + '">';
    listHtml += '<span class="tpn-list-icon">' + p.icon + '</span>';
    listHtml += '<span class="tpn-list-label">' + p.title + '</span>';
    listHtml += '</a>';
  });
  listHtml += '</div>';

  // Page progress track with markers
  var trackHtml = '<div class="tpn-track">';
  trackHtml += '<div class="tpn-track-fill"></div>';
  pages.forEach(function(p, i) {
    trackHtml += '<div class="tpn-marker' + (i === idx ? ' active' : '') + '" data-idx="' + i + '" title="' + p.title + '"></div>';
  });
  trackHtml += '</div>';

  var html = trackHtml;
  html += '<div class="tpn-controls">';

  // Prev button
  if (prevPage) {
    html += '<a href="' + prevPage.file + '" class="tpn-btn tpn-nav-link" title="' + prevPage.title + '">&#9664;</a>';
  } else {
    html += '<span class="tpn-btn tpn-disabled">&#9664;</span>';
  }

  // Current page title (tappable to expand page list)
  html += '<div class="tpn-info">';
  html += '<div class="tpn-title">' + currentPage.icon + ' ' + currentPage.title + '</div>';
  html += '</div>';

  // Next button
  if (nextPage) {
    html += '<a href="' + nextPage.file + '" class="tpn-btn tpn-nav-link" title="' + nextPage.title + '">&#9654;</a>';
  } else {
    html += '<span class="tpn-btn tpn-disabled">&#9654;</span>';
  }

  html += '</div>';
  html += listHtml;
  bar.innerHTML = html;
  document.body.appendChild(bar);

  // Position page markers evenly and set track fill to current page
  var tpnMarkers = bar.querySelectorAll('.tpn-marker');
  var tpnTrackFill = bar.querySelector('.tpn-track-fill');
  tpnMarkers.forEach(function(m, i) {
    var pct = pages.length > 1 ? (i / (pages.length - 1)) * 100 : 50;
    m.style.left = pct + '%';
  });
  if (tpnTrackFill) {
    var fillPct = pages.length > 1 ? (idx / (pages.length - 1)) * 100 : 0;
    tpnTrackFill.style.width = fillPct + '%';
  }

  // Click page marker to navigate
  tpnMarkers.forEach(function(m) {
    m.addEventListener('click', function() {
      var i = parseInt(m.getAttribute('data-idx'));
      var prefix = isTR ? '' : '';
      showPageTransition(pages[i], function() {
        window.location.href = prefix + pages[i].file;
      });
    });
  });

  // Tap title to expand/collapse page list
  bar.querySelector('.tpn-info').addEventListener('click', function() {
    bar.classList.toggle('expanded');
  });

  // Close page list when clicking a page link
  bar.querySelectorAll('.tpn-list-item').forEach(function(item) {
    item.addEventListener('click', function() {
      bar.classList.remove('expanded');
    });
  });

  // Search entry opens search overlay
  bar.querySelector('#tpn-open-search').addEventListener('click', function() {
    bar.classList.remove('expanded');
    var searchOverlay = document.getElementById('search-overlay');
    var searchInput = document.getElementById('search-overlay-input');
    if (searchOverlay) {
      searchOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (searchInput) searchInput.focus();
    }
  });

  // Liked feed entry opens overlay
  bar.querySelector('#tpn-open-liked').addEventListener('click', function() {
    bar.classList.remove('expanded');
    var overlay = document.getElementById('liked-feed-overlay');
    if (overlay) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      renderLikedFeed();
    }
  });

  // Sync liked count periodically
  setInterval(function() {
    var countEl = document.getElementById('tpn-liked-count');
    if (countEl) {
      var c = getLikes().length;
      countEl.textContent = c;
      countEl.style.display = c > 0 ? 'flex' : 'none';
    }
  }, 1000);

  // Close expanded menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!bar.contains(e.target)) {
      bar.classList.remove('expanded');
    }
  });

  // Page transition on prev/next nav links
  bar.querySelectorAll('.tpn-nav-link').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var href = link.getAttribute('href');
      var targetIdx = pages.findIndex(function(p) { return p.file === href; });
      var targetPage = targetIdx >= 0 ? pages[targetIdx] : null;
      showPageTransition(targetPage, function() {
        window.location.href = href;
      });
    });
  });

  // Page transition on page list items
  bar.querySelectorAll('.tpn-list-item').forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      var href = item.getAttribute('href');
      // Don't animate if it's the current page
      if (href === currentPage.file) { bar.classList.remove('expanded'); return; }
      var targetIdx = pages.findIndex(function(p) { return p.file === href; });
      var targetPage = targetIdx >= 0 ? pages[targetIdx] : null;
      bar.classList.remove('expanded');
      showPageTransition(targetPage, function() {
        window.location.href = href;
      });
    });
  });
}

// ===== BOTTOM SECTION NAVIGATION BAR =====
function initBottomSectionNav() {
  var pageFile = getPageFile();
  var skipPages = ['map.html', 'directory.html'];
  if (skipPages.indexOf(pageFile) >= 0) return;

  var isHome = pageFile === 'index.html';
  var mainContent = document.querySelector('.main-content');

  var sections = [];
  if (isHome) {
    // Homepage uses <section class="section"> with <h2> inside .section-header
    document.querySelectorAll('section.section').forEach(function(sec, i) {
      var h2 = sec.querySelector('.section-header h2') || sec.querySelector('h2');
      if (!h2) return;
      if (!sec.id) sec.id = 'home-section-' + i;
      sections.push({ el: sec, id: sec.id, title: h2.textContent.trim() });
    });
  } else if (!mainContent) {
    return;
  } else {
    var isFaq = pageFile === 'faq.html';
    if (isFaq) {
      mainContent.querySelectorAll('.faq-category-header').forEach(function(header, i) {
        var parent = header.closest('div[id]') || header.parentElement;
        var id = parent.id || 'faq-section-' + i;
        if (!parent.id) parent.id = id;
        var titleEl = header.querySelector('h3') || header;
        sections.push({ el: parent, id: id, title: titleEl.textContent.trim() });
      });
    } else {
      mainContent.querySelectorAll('div[id]').forEach(function(s) {
        var h2 = s.querySelector('h2');
        if (h2) {
          sections.push({ el: s, id: s.id, title: h2.textContent.trim() });
        }
      });
    }
  }
  if (sections.length === 0) return;

  // Build section list panel (expandable)
  var listHtml = '<div class="bsn-list" id="bsn-list">';
  sections.forEach(function(s, i) {
    listHtml += '<a href="#' + s.id + '" class="bsn-list-item" data-idx="' + i + '">' + escapeHtml(s.title) + '</a>';
  });
  listHtml += '</div>';

  var nav = document.createElement('div');
  nav.className = 'bottom-section-nav';
  nav.id = 'bottom-section-nav';

  // Progress track with markers integrated into the bar
  var trackHtml = '<div class="bsn-track">';
  trackHtml += '<div class="bsn-track-fill"></div>';
  sections.forEach(function(s, i) {
    trackHtml += '<div class="bsn-marker" data-idx="' + i + '" title="' + escapeHtml(s.title) + '"></div>';
  });
  trackHtml += '</div>';

  nav.innerHTML = listHtml +
    '<div class="bsn-controls">' +
    '<button class="bsn-btn bsn-prev" aria-label="Previous section">&#9650;</button>' +
    '<div class="bsn-info"><div class="bsn-title"></div></div>' +
    '<button class="bsn-btn bsn-next" aria-label="Next section">&#9660;</button></div>' +
    trackHtml;
  document.body.appendChild(nav);
  document.body.classList.add('has-bottom-nav');

  var titleEl = nav.querySelector('.bsn-title');
  var trackFill = nav.querySelector('.bsn-track-fill');
  var markers = nav.querySelectorAll('.bsn-marker');
  var prevBtn = nav.querySelector('.bsn-prev');
  var nextBtn = nav.querySelector('.bsn-next');
  var listPanel = nav.querySelector('#bsn-list');
  var listItems = nav.querySelectorAll('.bsn-list-item');
  var currentIdx = 0;

  // Position markers along the track based on section positions
  function positionMarkers() {
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    markers.forEach(function(m, i) {
      var sTop = sections[i].el.offsetTop;
      var pct = Math.min((sTop / (docHeight || 1)) * 100, 100);
      m.style.left = pct + '%';
    });
  }

  function update() {
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var scrollPct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    trackFill.style.width = scrollPct + '%';

    var scrollPos = window.scrollY + window.innerHeight * 0.4;
    var idx = 0;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].el.offsetTop <= scrollPos) idx = i;
    }
    currentIdx = idx;
    titleEl.textContent = sections[idx].title;

    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === sections.length - 1;

    // Highlight active marker
    markers.forEach(function(m, i) { m.classList.toggle('active', i === idx); });

    // Highlight active list item
    listItems.forEach(function(item, i) { item.classList.toggle('active', i === idx); });
  }

  // Tap title area to expand/collapse section list
  nav.querySelector('.bsn-info').addEventListener('click', function() {
    nav.classList.toggle('expanded');
  });

  // List item click: scroll to section and collapse
  listItems.forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      var i = parseInt(item.getAttribute('data-idx'));
      sections[i].el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      nav.classList.remove('expanded');
    });
  });

  // Marker click: scroll to that section
  markers.forEach(function(m) {
    m.addEventListener('click', function() {
      var i = parseInt(m.getAttribute('data-idx'));
      sections[i].el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  prevBtn.addEventListener('click', function() {
    if (currentIdx > 0) sections[currentIdx - 1].el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  nextBtn.addEventListener('click', function() {
    if (currentIdx < sections.length - 1) sections[currentIdx + 1].el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  window.addEventListener('scroll', update, { passive: true });
  positionMarkers();
  update();
  // Reposition markers after images load etc
  window.addEventListener('load', positionMarkers);
}

// ===== COLLAPSIBLE INFO BOXES (mobile) =====
function initCollapsibleDetails() {
  if (window.innerWidth > 960) return;

  var mainContent = document.querySelector('.main-content');
  if (!mainContent) return;

  mainContent.querySelectorAll('.info-box').forEach(function(box) {
    if (box.textContent.trim().length < 150) return;
    var h4 = box.querySelector('h4');
    if (!h4) return;

    var content = document.createElement('div');
    content.className = 'collapsible-content';
    while (h4.nextSibling) {
      content.appendChild(h4.nextSibling);
    }
    box.appendChild(content);

    box.classList.add('collapsible');
    h4.classList.add('collapsible-toggle');
    h4.insertAdjacentHTML('beforeend', ' <span class="collapsible-arrow">&#9662;</span>');

    h4.addEventListener('click', function() {
      box.classList.toggle('expanded');
    });
  });
}

// ===== READ MORE FOR LONG PARAGRAPHS (mobile) =====
function initReadMore() {
  if (window.innerWidth > 960) return;

  var mainContent = document.querySelector('.main-content');
  if (!mainContent) return;

  var isTR = window.location.pathname.indexOf('/tr/') >= 0;
  var moreText = isTR ? 'Devam\u0131n\u0131 oku' : 'Read more';
  var lessText = isTR ? 'Daha az' : 'Show less';

  mainContent.querySelectorAll('p').forEach(function(p) {
    if (p.closest('.collapsible-content')) return;
    if (p.closest('.info-box')) return;
    if (p.closest('.card')) return;
    if (p.closest('.page-toc')) return;
    if (p.textContent.trim().length < 300) return;
    if (p.querySelector('a, strong, em, code')) {
      // Skip paragraphs with lots of inline elements (likely structured content)
      if (p.querySelectorAll('a').length > 3) return;
    }

    p.classList.add('truncated-p');
    var btn = document.createElement('button');
    btn.className = 'read-more-btn';
    btn.textContent = moreText;
    btn.addEventListener('click', function() {
      p.classList.toggle('expanded');
      btn.textContent = p.classList.contains('expanded') ? lessText : moreText;
    });
    p.parentElement.insertBefore(btn, p.nextSibling);
  });
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

// ===== REMOVE RELATED PAGES & ADD NEXT PAGE BUTTON =====
function initNextPageButton() {
  var isTR = window.location.pathname.includes('/tr/');

  // Remove all "Related Pages" sections
  document.querySelectorAll('h3').forEach(function(h3) {
    var text = h3.textContent.trim();
    if (text === 'Related Pages' || text === 'İlgili Sayfalar') {
      var container = h3.parentElement;
      if (container) container.remove();
    }
  });

  // Add "Next Page" button at the bottom
  var nextPage = getNextPage();
  if (!nextPage) return;

  var prefix = isTR ? '' : '';
  var label = isTR ? 'Sonraki Sayfa' : 'Next Page';

  var btn = document.createElement('a');
  btn.href = prefix + nextPage.file;
  btn.className = 'next-page-btn';
  btn.innerHTML = '<div class="next-page-info">' +
    '<span class="next-page-label">' + label + '</span>' +
    '<span class="next-page-title">' + nextPage.icon + ' ' + nextPage.title + '</span>' +
    '</div>' +
    '<span class="next-page-arrow">&#8594;</span>';

  // Add page transition on click
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    showPageTransition(nextPage, function() {
      window.location.href = btn.href;
    });
  });

  // Insert before footer (which is hidden) or at end of body
  var footer = document.querySelector('.footer');
  if (footer) {
    footer.parentElement.insertBefore(btn, footer);
  } else {
    var script = document.querySelector('body > script[src*="app.js"]');
    if (script) {
      script.parentElement.insertBefore(btn, script);
    } else {
      document.body.appendChild(btn);
    }
  }
}

// ===== WELCOME WALKTHROUGH =====
function initWelcomeWalkthrough() {
  // Only show once per device
  if (localStorage.getItem('stlucia_walkthrough_done')) return;

  var isTR = window.location.pathname.includes('/tr/');
  var steps = isTR ? [
    { icon: '&#128214;', title: 'Hoş Geldiniz!', text: 'Bu rehber Saint Lucia\'da iş kurma hakkında kapsamlı bir kaynaktır. Nasıl kullanacağınızı öğrenin.' },
    { icon: '&#9664; &#9654;', title: 'Sayfalar Arası Gezinin', text: 'Üst bardaki ok butonlarıyla sayfalar arasında geçiş yapın. Sayfa başlığına dokunarak tüm sayfaları görün.' },
    { icon: '&#9829;', title: 'Bölümleri Beğenin', text: 'Herhangi bir bölüme çift dokunarak beğenin. Beğenilerinize sayfa menüsünden ulaşın.' },
    { icon: '&#9650; &#9660;', title: 'Bölümler Arası Gezinin', text: 'Alt bardaki ok butonlarıyla bölümler arasında geçiş yapın. Bölüm başlığına dokunarak tüm bölümleri görün.' }
  ] : [
    { icon: '&#128214;', title: 'Welcome!', text: 'This guide is a comprehensive resource for doing business in Saint Lucia. Here\'s how to use it.' },
    { icon: '&#9664; &#9654;', title: 'Navigate Pages', text: 'Use the arrows in the top bar to move between pages. Tap the page title to see all pages.' },
    { icon: '&#9829;', title: 'Like Sections', text: 'Double-tap any section to like it. Access your liked sections from the page menu.' },
    { icon: '&#9650; &#9660;', title: 'Browse Sections', text: 'Use the bottom bar arrows to jump between sections. Tap the section title to see all sections.' }
  ];

  var overlay = document.createElement('div');
  overlay.className = 'walkthrough-overlay';
  overlay.id = 'walkthrough-overlay';

  var currentStep = 0;

  function render() {
    var step = steps[currentStep];
    var isLast = currentStep === steps.length - 1;
    var isFirst = currentStep === 0;
    var nextLabel = isTR ? (isLast ? 'Başla' : 'İleri') : (isLast ? 'Get Started' : 'Next');
    var skipLabel = isTR ? 'Atla' : 'Skip';

    overlay.innerHTML =
      '<div class="walkthrough-card">' +
        '<div class="walkthrough-icon">' + step.icon + '</div>' +
        '<h3 class="walkthrough-title">' + step.title + '</h3>' +
        '<p class="walkthrough-text">' + step.text + '</p>' +
        '<div class="walkthrough-dots">' +
          steps.map(function(_, i) {
            return '<span class="walkthrough-dot' + (i === currentStep ? ' active' : '') + '"></span>';
          }).join('') +
        '</div>' +
        '<div class="walkthrough-actions">' +
          (isFirst ? '<button class="walkthrough-skip">' + skipLabel + '</button>' : '<button class="walkthrough-back">&#9664;</button>') +
          '<button class="walkthrough-next">' + nextLabel + '</button>' +
        '</div>' +
      '</div>';

    // Event listeners
    var nextBtn = overlay.querySelector('.walkthrough-next');
    var skipBtn = overlay.querySelector('.walkthrough-skip');
    var backBtn = overlay.querySelector('.walkthrough-back');

    nextBtn.addEventListener('click', function() {
      if (isLast) {
        closeWalkthrough();
      } else {
        currentStep++;
        render();
      }
    });

    if (skipBtn) {
      skipBtn.addEventListener('click', closeWalkthrough);
    }

    if (backBtn) {
      backBtn.addEventListener('click', function() {
        currentStep--;
        render();
      });
    }
  }

  function closeWalkthrough() {
    localStorage.setItem('stlucia_walkthrough_done', '1');
    overlay.classList.add('closing');
    setTimeout(function() { overlay.remove(); }, 300);
  }

  render();
  document.body.appendChild(overlay);
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
