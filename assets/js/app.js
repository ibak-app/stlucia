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

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}

// Utility: smooth scroll to element
function scrollTo(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
