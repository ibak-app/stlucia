// ===== St. Lucia Business Guide - Main JS =====

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
  if (!mainContent) { updateLikesBadge(); return; }

  const sections = mainContent.querySelectorAll('div[id]');
  if (!sections.length) { updateLikesBadge(); return; }

  // Load saved state
  const likes = getLikes();
  const readSections = getReadSections(pageKey);

  // Inject like buttons and read markers into each section
  sections.forEach(section => {
    const h2 = section.querySelector('h2');
    if (!h2) return;

    const sectionId = section.id;
    const sectionTitle = h2.textContent.trim();

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
    h2.appendChild(likeBtn);

    // Read marker
    const readMarker = document.createElement('span');
    readMarker.className = 'section-read-marker';
    readMarker.innerHTML = '&#10003; Read';
    readMarker.id = 'read-' + sectionId;
    if (readSections.includes(sectionId)) {
      readMarker.classList.add('visible');
    }
    h2.appendChild(readMarker);
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
      if (section.querySelector('h2') && !readSections.includes(section.id)) {
        readObserver.observe(section);
      }
    });
  }

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
