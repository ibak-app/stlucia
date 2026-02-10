// ===== St. Lucia Business Guide - Directory Module =====

(function () {
  'use strict';

  // Category display config
  const CATEGORIES = {
    government:   { label: 'Government', icon: 'fa-landmark', badge: 'badge-primary' },
    banks:        { label: 'Banks & Finance', icon: 'fa-building-columns', badge: 'badge-primary' },
    law:          { label: 'Law Firms', icon: 'fa-scale-balanced', badge: 'badge-success' },
    accounting:   { label: 'Accounting', icon: 'fa-calculator', badge: 'badge-accent' },
    realestate:   { label: 'Real Estate', icon: 'fa-house', badge: 'badge-success' },
    ibc:          { label: 'IBC Agents', icon: 'fa-briefcase', badge: 'badge-accent' },
    insurance:    { label: 'Insurance', icon: 'fa-shield-halved', badge: 'badge-primary' },
    shipping:     { label: 'Shipping & Freight', icon: 'fa-ship', badge: 'badge-accent' },
    business:     { label: 'Business & Retail', icon: 'fa-store', badge: 'badge-primary' },
    technology:   { label: 'Technology & BPO', icon: 'fa-laptop-code', badge: 'badge-accent' },
    construction: { label: 'Construction', icon: 'fa-hard-hat', badge: 'badge-primary' },
    hotels:       { label: 'Hotels & Venues', icon: 'fa-hotel', badge: 'badge-success' },
    supermarkets: { label: 'Supermarkets', icon: 'fa-cart-shopping', badge: 'badge-primary' },
    fuel:         { label: 'Fuel Stations', icon: 'fa-gas-pump', badge: 'badge-accent' },
    carrental:    { label: 'Car Rentals', icon: 'fa-car', badge: 'badge-primary' },
    healthcare:   { label: 'Healthcare', icon: 'fa-hospital', badge: 'badge-primary' },
    education:    { label: 'Education', icon: 'fa-graduation-cap', badge: 'badge-accent' },
    embassies:    { label: 'Embassies', icon: 'fa-flag', badge: 'badge-primary' },
    utilities:    { label: 'Utilities & Telecom', icon: 'fa-bolt', badge: 'badge-primary' },
    attractions:  { label: 'Attractions', icon: 'fa-camera', badge: 'badge-success' },
    beaches:      { label: 'Beaches', icon: 'fa-umbrella-beach', badge: 'badge-success' },
    diving:       { label: 'Diving Sites', icon: 'fa-water', badge: 'badge-accent' },
    cities:       { label: 'Cities', icon: 'fa-city', badge: 'badge-primary' },
    towns:        { label: 'Towns', icon: 'fa-map-pin', badge: 'badge-primary' },
    airports:     { label: 'Airports', icon: 'fa-plane', badge: 'badge-primary' },
    ports:        { label: 'Ports & Marinas', icon: 'fa-anchor', badge: 'badge-accent' },
    restaurants:  { label: 'Restaurants', icon: 'fa-utensils', badge: 'badge-success' },
    courier:      { label: 'Courier & Shipping', icon: 'fa-truck-fast', badge: 'badge-accent' },
    hardware:     { label: 'Hardware & Supplies', icon: 'fa-hammer', badge: 'badge-primary' },
    fitness:      { label: 'Fitness & Gyms', icon: 'fa-dumbbell', badge: 'badge-accent' }
  };

  // Default visible categories in directory (business-relevant ones)
  const DEFAULT_CATEGORIES = [
    'government', 'banks', 'law', 'accounting', 'realestate', 'ibc',
    'insurance', 'shipping', 'business', 'technology', 'construction',
    'hotels', 'utilities', 'healthcare', 'education', 'embassies',
    'supermarkets', 'fuel', 'carrental', 'restaurants', 'courier', 'hardware', 'fitness'
  ];

  let allBusinesses = [];
  let activeCategories = new Set(DEFAULT_CATEGORIES);
  let activeDistrict = '';
  let searchQuery = '';

  const resultsContainer = document.getElementById('directory-results');
  const resultCount = document.getElementById('directory-count');
  const searchInput = document.getElementById('directory-search');
  const categoryFilter = document.getElementById('category-filter');
  const districtFilter = document.getElementById('district-filter');

  function init() {
    if (!resultsContainer) return;
    loadData();
  }

  function loadData() {
    fetch('data/businesses.json')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        allBusinesses = data;
        buildCategoryFilter();
        buildDistrictFilter();
        render();
        handleUrlParams();
      })
      .catch(function (err) {
        console.error('Failed to load businesses.json:', err);
        resultsContainer.innerHTML = '<p style="text-align:center;color:var(--danger);">Failed to load directory data.</p>';
      });
  }

  function buildCategoryFilter() {
    if (!categoryFilter) return;

    // Count per category
    var counts = {};
    allBusinesses.forEach(function (b) {
      counts[b.category] = (counts[b.category] || 0) + 1;
    });

    // "All" option
    var allLabel = document.createElement('label');
    allLabel.className = 'cat-filter-item';
    allLabel.innerHTML =
      '<input type="checkbox" id="cat-all" checked>' +
      '<span>All Categories</span>';
    categoryFilter.appendChild(allLabel);

    Object.keys(CATEGORIES).forEach(function (cat) {
      if (!counts[cat]) return;
      var cfg = CATEGORIES[cat];
      var isDefault = DEFAULT_CATEGORIES.includes(cat);
      var label = document.createElement('label');
      label.className = 'cat-filter-item';
      label.innerHTML =
        '<input type="checkbox" data-cat="' + cat + '"' + (isDefault ? ' checked' : '') + '>' +
        '<i class="fa-solid ' + cfg.icon + '" style="width:16px;text-align:center;color:var(--primary);"></i>' +
        '<span>' + cfg.label + ' <small>(' + counts[cat] + ')</small></span>';
      categoryFilter.appendChild(label);
    });

    // Event listeners
    var allCb = document.getElementById('cat-all');
    allCb.addEventListener('change', function () {
      var checked = this.checked;
      categoryFilter.querySelectorAll('input[data-cat]').forEach(function (cb) {
        cb.checked = checked;
      });
      updateActiveCategories();
      render();
    });

    categoryFilter.querySelectorAll('input[data-cat]').forEach(function (cb) {
      cb.addEventListener('change', function () {
        updateActiveCategories();
        // Update "All" checkbox
        var allChecked = categoryFilter.querySelectorAll('input[data-cat]:not(:checked)').length === 0;
        allCb.checked = allChecked;
        render();
      });
    });
  }

  function updateActiveCategories() {
    activeCategories = new Set();
    categoryFilter.querySelectorAll('input[data-cat]:checked').forEach(function (cb) {
      activeCategories.add(cb.dataset.cat);
    });
  }

  function buildDistrictFilter() {
    if (!districtFilter) return;
    var districts = new Set();
    allBusinesses.forEach(function (b) {
      if (b.district) districts.add(b.district);
    });
    var sorted = Array.from(districts).sort();
    sorted.forEach(function (d) {
      var opt = document.createElement('option');
      opt.value = d;
      opt.textContent = d;
      districtFilter.appendChild(opt);
    });
    districtFilter.addEventListener('change', function () {
      activeDistrict = this.value;
      render();
    });
  }

  function getFilteredBusinesses() {
    return allBusinesses.filter(function (b) {
      // Category filter
      if (!activeCategories.has(b.category)) return false;
      // District filter
      if (activeDistrict && b.district !== activeDistrict) return false;
      // Search filter
      if (searchQuery) {
        var q = searchQuery.toLowerCase();
        var searchable = (b.name + ' ' + (b.description || '') + ' ' + (b.address || '') + ' ' + (b.subcategory || '') + ' ' + (b.tags || []).join(' ')).toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      return true;
    });
  }

  function render() {
    var filtered = getFilteredBusinesses();

    // Update count
    if (resultCount) {
      resultCount.textContent = filtered.length + ' result' + (filtered.length !== 1 ? 's' : '');
    }

    if (filtered.length === 0) {
      resultsContainer.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-light);"><i class="fa-solid fa-magnifying-glass" style="font-size:2rem;margin-bottom:12px;display:block;opacity:0.3;"></i>No results found. Try adjusting your filters.</div>';
      return;
    }

    // Group by category
    var grouped = {};
    filtered.forEach(function (b) {
      if (!grouped[b.category]) grouped[b.category] = [];
      grouped[b.category].push(b);
    });

    var html = '';
    Object.keys(CATEGORIES).forEach(function (cat) {
      if (!grouped[cat]) return;
      var cfg = CATEGORIES[cat];
      html += '<div class="directory-category-group">';
      html += '<h3 class="directory-category-title"><i class="fa-solid ' + cfg.icon + '"></i> ' + cfg.label + ' <small>(' + grouped[cat].length + ')</small></h3>';
      html += '<div class="directory-cards">';
      grouped[cat].forEach(function (b) {
        html += renderCard(b);
      });
      html += '</div></div>';
    });

    resultsContainer.innerHTML = html;
  }

  function renderCard(b) {
    var cfg = CATEGORIES[b.category] || { label: '', badge: 'badge-primary' };
    var card = '<div class="directory-card" id="biz-' + b.id + '" data-searchable>';
    card += '<div class="directory-card-body">';
    card += '<h4>' + escapeHtml(b.name) + '</h4>';
    if (b.subcategory) card += '<span class="badge ' + cfg.badge + '">' + escapeHtml(b.subcategory) + '</span>';
    if (b.description) card += '<p class="dir-desc">' + escapeHtml(b.description) + '</p>';
    if (b.address) card += '<div class="dir-detail"><i class="fa-solid fa-location-dot"></i> ' + escapeHtml(b.address) + '</div>';
    if (b.phone) card += '<div class="dir-detail"><i class="fa-solid fa-phone"></i> ' + escapeHtml(b.phone) + '</div>';
    if (b.website) card += '<div class="dir-detail"><i class="fa-solid fa-globe"></i> <a href="' + b.website + '" target="_blank" rel="noopener">' + b.website.replace(/^https?:\/\//, '').replace(/\/$/, '') + '</a></div>';
    // Show on Map link
    if (b.lat && b.lng) {
      card += '<a href="map.html?id=' + b.id + '" class="dir-map-link"><i class="fa-solid fa-map-location-dot"></i> Show on Map</a>';
    }
    card += '</div></div>';
    return card;
  }

  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function handleUrlParams() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');
    if (id) {
      setTimeout(function () {
        var el = document.getElementById('biz-' + id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.style.boxShadow = '0 0 0 3px var(--primary-light)';
          setTimeout(function () { el.style.boxShadow = ''; }, 3000);
        }
      }, 300);
    }
  }

  // Search
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      searchQuery = this.value.trim();
      render();
    });
  }

  // Init
  document.addEventListener('DOMContentLoaded', init);
})();
