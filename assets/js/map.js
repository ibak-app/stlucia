// ===== St. Lucia Business Guide - Map Module =====
// Handles business markers, tile layers, search, filters
// Zone/building overlays handled by zones.js

(function () {
  'use strict';

  // Category config: color, icon, label
  const CATEGORIES = {
    government:   { color: '#1a5276', icon: 'fa-landmark',       label: 'Government' },
    banks:        { color: '#148f77', icon: 'fa-building-columns', label: 'Banks' },
    law:          { color: '#6c3483', icon: 'fa-scale-balanced',  label: 'Law Firms' },
    accounting:   { color: '#af601a', icon: 'fa-calculator',     label: 'Accounting' },
    realestate:   { color: '#b7950b', icon: 'fa-house',          label: 'Real Estate' },
    ibc:          { color: '#1f618d', icon: 'fa-briefcase',      label: 'IBC Agents' },
    insurance:    { color: '#7d3c98', icon: 'fa-shield-halved',  label: 'Insurance' },
    shipping:     { color: '#2471a3', icon: 'fa-ship',           label: 'Shipping' },
    business:     { color: '#95a5a6', icon: 'fa-store',          label: 'Business' },
    technology:   { color: '#17a589', icon: 'fa-laptop-code',    label: 'Technology' },
    construction: { color: '#a04000', icon: 'fa-hard-hat',       label: 'Construction' },
    hotels:       { color: '#f1c40f', icon: 'fa-hotel',          label: 'Hotels' },
    supermarkets: { color: '#27ae60', icon: 'fa-cart-shopping',  label: 'Supermarkets' },
    fuel:         { color: '#e67e22', icon: 'fa-gas-pump',       label: 'Fuel Stations' },
    carrental:    { color: '#2980b9', icon: 'fa-car',            label: 'Car Rentals' },
    healthcare:   { color: '#c0392b', icon: 'fa-hospital',       label: 'Healthcare' },
    education:    { color: '#8e44ad', icon: 'fa-graduation-cap', label: 'Education' },
    embassies:    { color: '#2c3e50', icon: 'fa-flag',           label: 'Embassies' },
    utilities:    { color: '#d35400', icon: 'fa-bolt',           label: 'Utilities' },
    cities:       { color: '#e74c3c', icon: 'fa-city',           label: 'Cities' },
    towns:        { color: '#3498db', icon: 'fa-map-pin',        label: 'Towns' },
    airports:     { color: '#2ecc71', icon: 'fa-plane',          label: 'Airports' },
    ports:        { color: '#f39c12', icon: 'fa-anchor',         label: 'Ports' },
    attractions:  { color: '#9b59b6', icon: 'fa-camera',         label: 'Attractions' },
    beaches:      { color: '#1abc9c', icon: 'fa-umbrella-beach', label: 'Beaches' },
    diving:       { color: '#0097a7', icon: 'fa-water',          label: 'Diving Sites' }
  };

  // Expose map + categories globally so zones.js can access them
  window.StLuciaMap = { map: null, CATEGORIES: CATEGORIES };

  let businesses = [], layerGroups = {}, allMarkers = {};
  const sidebar = document.getElementById('map-sidebar');
  const searchInput = document.getElementById('map-search');
  const searchResults = document.getElementById('map-search-results');
  const filterContainer = document.getElementById('map-filters');
  const markerCount = document.getElementById('marker-count');

  function initMap() {
    var map = L.map('map', {
      center: [13.9094, -60.9789],
      zoom: 11,
      zoomControl: false
    });
    window.StLuciaMap.map = map;

    // Tile layers
    var satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: '&copy; Esri, Maxar, Earthstar Geographics'
    });

    var labels = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: ''
    });

    var streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    });

    // Default: satellite + labels
    var satelliteWithLabels = L.layerGroup([satellite, labels]);
    satelliteWithLabels.addTo(map);

    // Layer control
    L.control.layers({
      'Satellite': satelliteWithLabels,
      'Street Map': streets
    }, null, { position: 'topright' }).addTo(map);

    // Zoom control
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Locate me button
    var locateBtn = L.control({ position: 'topright' });
    locateBtn.onAdd = function () {
      var div = L.DomUtil.create('div', 'leaflet-bar');
      div.innerHTML = '<a href="#" title="My Location" style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;font-size:16px;text-decoration:none;color:#333;background:#fff;"><i class="fa-solid fa-location-crosshairs"></i></a>';
      div.querySelector('a').addEventListener('click', function (e) {
        e.preventDefault();
        map.locate({ setView: true, maxZoom: 15 });
      });
      return div;
    };
    locateBtn.addTo(map);

    loadBusinesses();
  }

  function loadBusinesses() {
    fetch('data/businesses.json')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        businesses = data;
        createFilters();
        addMarkers();
        handleUrlParams();
        // Signal zones.js that map is ready
        if (window.StLuciaZones && window.StLuciaZones.init) {
          window.StLuciaZones.init();
        }
      })
      .catch(function (err) {
        console.error('Failed to load businesses.json:', err);
      });
  }

  function createFilters() {
    if (!filterContainer) return;

    var counts = {};
    businesses.forEach(function (b) {
      counts[b.category] = (counts[b.category] || 0) + 1;
    });

    // Show All / Hide All
    var controlRow = document.createElement('div');
    controlRow.className = 'filter-controls';
    controlRow.innerHTML =
      '<button class="filter-ctrl-btn" id="show-all-btn"><i class="fa-solid fa-eye"></i> Show All</button>' +
      '<button class="filter-ctrl-btn" id="hide-all-btn"><i class="fa-solid fa-eye-slash"></i> Hide All</button>';
    filterContainer.appendChild(controlRow);

    // Category toggles
    Object.keys(CATEGORIES).forEach(function (cat) {
      if (!counts[cat]) return;
      var cfg = CATEGORIES[cat];
      var item = document.createElement('label');
      item.className = 'filter-item';
      item.innerHTML =
        '<input type="checkbox" checked data-category="' + cat + '">' +
        '<span class="filter-dot" style="background:' + cfg.color + ';"><i class="fa-solid ' + cfg.icon + '"></i></span>' +
        '<span class="filter-label">' + cfg.label + ' <small>(' + counts[cat] + ')</small></span>';
      filterContainer.appendChild(item);
    });

    // Event listeners
    filterContainer.querySelectorAll('input[type="checkbox"]').forEach(function (cb) {
      cb.addEventListener('change', function () {
        toggleCategory(this.dataset.category, this.checked);
        updateCount();
      });
    });

    document.getElementById('show-all-btn').addEventListener('click', function () {
      filterContainer.querySelectorAll('input[type="checkbox"]').forEach(function (cb) {
        cb.checked = true;
        toggleCategory(cb.dataset.category, true);
      });
      updateCount();
    });

    document.getElementById('hide-all-btn').addEventListener('click', function () {
      filterContainer.querySelectorAll('input[type="checkbox"]').forEach(function (cb) {
        cb.checked = false;
        toggleCategory(cb.dataset.category, false);
      });
      updateCount();
    });
  }

  // Create marker icon - no clustering, direct markers
  function createMarkerIcon(category) {
    var cfg = CATEGORIES[category] || { color: '#95a5a6', icon: 'fa-circle' };
    return L.divIcon({
      className: 'custom-marker-icon',
      html: '<div class="marker-pin" style="background:' + cfg.color + ';"><i class="fa-solid ' + cfg.icon + '"></i></div>',
      iconSize: [28, 36],
      iconAnchor: [14, 36],
      popupAnchor: [0, -36]
    });
  }

  // Add all markers directly to map (no clustering)
  function addMarkers() {
    var map = window.StLuciaMap.map;
    Object.keys(CATEGORIES).forEach(function (cat) {
      layerGroups[cat] = L.layerGroup().addTo(map);
    });

    businesses.forEach(function (b) {
      if (!b.lat || !b.lng) return;

      var marker = L.marker([b.lat, b.lng], {
        icon: createMarkerIcon(b.category)
      });

      // Popup
      var popup = '<div class="map-popup">';
      popup += '<h4>' + escapeHtml(b.name) + '</h4>';
      if (b.subcategory) popup += '<span class="popup-badge">' + escapeHtml(b.subcategory) + '</span>';
      if (b.description) popup += '<p>' + escapeHtml(b.description) + '</p>';
      if (b.address) popup += '<div class="popup-detail"><i class="fa-solid fa-location-dot"></i> ' + escapeHtml(b.address) + '</div>';
      if (b.phone) popup += '<div class="popup-detail"><i class="fa-solid fa-phone"></i> ' + escapeHtml(b.phone) + '</div>';
      if (b.website) popup += '<div class="popup-detail"><i class="fa-solid fa-globe"></i> <a href="' + b.website + '" target="_blank" rel="noopener">' + b.website.replace(/^https?:\/\//, '').replace(/\/$/, '') + '</a></div>';
      popup += '</div>';

      marker.bindPopup(popup, { maxWidth: 300, minWidth: 200 });

      allMarkers[b.id] = marker;
      if (layerGroups[b.category]) {
        layerGroups[b.category].addLayer(marker);
      }
    });

    updateCount();
  }

  function toggleCategory(category, visible) {
    if (!layerGroups[category]) return;
    var map = window.StLuciaMap.map;
    if (visible) {
      map.addLayer(layerGroups[category]);
    } else {
      map.removeLayer(layerGroups[category]);
    }
  }

  function updateCount() {
    if (!markerCount) return;
    var count = 0;
    Object.keys(layerGroups).forEach(function (cat) {
      var cb = filterContainer.querySelector('input[data-category="' + cat + '"]');
      if (cb && cb.checked) {
        count += layerGroups[cat].getLayers().length;
      }
    });
    markerCount.textContent = count + ' locations';
  }

  // Search
  function initSearch() {
    if (!searchInput || !searchResults) return;

    searchInput.addEventListener('input', function () {
      var query = this.value.toLowerCase().trim();
      searchResults.innerHTML = '';
      if (query.length < 2) {
        searchResults.style.display = 'none';
        return;
      }

      var matches = businesses.filter(function (b) {
        return b.name.toLowerCase().includes(query) ||
               (b.address && b.address.toLowerCase().includes(query)) ||
               (b.tags && b.tags.some(function (t) { return t.toLowerCase().includes(query); }));
      }).slice(0, 8);

      if (matches.length === 0) {
        searchResults.style.display = 'none';
        return;
      }

      matches.forEach(function (b) {
        var cfg = CATEGORIES[b.category] || { color: '#95a5a6', icon: 'fa-circle', label: '' };
        var item = document.createElement('div');
        item.className = 'search-result-item';
        item.innerHTML =
          '<span class="search-dot" style="background:' + cfg.color + ';"><i class="fa-solid ' + cfg.icon + '"></i></span>' +
          '<div><strong>' + escapeHtml(b.name) + '</strong><br><small>' + escapeHtml(b.district || '') + ' &mdash; ' + cfg.label + '</small></div>';
        item.addEventListener('click', function () {
          flyToMarker(b.id);
          searchResults.style.display = 'none';
          searchInput.value = b.name;
        });
        searchResults.appendChild(item);
      });
      searchResults.style.display = 'block';
    });

    document.addEventListener('click', function (e) {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
      }
    });
  }

  function flyToMarker(id) {
    var map = window.StLuciaMap.map;
    var marker = allMarkers[id];
    if (!marker) return;

    // Ensure category visible
    var biz = businesses.find(function (b) { return b.id === id; });
    if (biz) {
      var cb = filterContainer.querySelector('input[data-category="' + biz.category + '"]');
      if (cb && !cb.checked) {
        cb.checked = true;
        toggleCategory(biz.category, true);
        updateCount();
      }
    }

    map.flyTo(marker.getLatLng(), 16, { duration: 1 });
    setTimeout(function () { marker.openPopup(); }, 1100);
  }

  function handleUrlParams() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');
    if (id) {
      setTimeout(function () { flyToMarker(id); }, 500);
    }
  }

  function initSidebarToggle() {
    var toggle = document.getElementById('sidebar-toggle');
    if (!toggle || !sidebar) return;
    toggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      this.querySelector('i').classList.toggle('fa-chevron-down');
      this.querySelector('i').classList.toggle('fa-chevron-up');
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // Init
  document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('map')) return;
    initMap();
    initSearch();
    initSidebarToggle();
  });
})();
