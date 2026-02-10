// ===== St. Lucia Business Guide - Zones & Parcels Module =====
// Handles: zone overlays (OSM + user), building footprints, Leaflet.draw editing,
// source attribution, localStorage persistence, GeoJSON export/import

(function () {
  'use strict';

  // Zone type config
  var ZONE_TYPES = {
    residential:  { color: '#27ae60', label: 'Residential',    icon: 'fa-house-chimney' },
    commercial:   { color: '#2980b9', label: 'Commercial',     icon: 'fa-store' },
    tourism:      { color: '#8e44ad', label: 'Tourism',        icon: 'fa-umbrella-beach' },
    industrial:   { color: '#e67e22', label: 'Industrial',     icon: 'fa-industry' },
    agricultural: { color: '#f1c40f', label: 'Agricultural',   icon: 'fa-wheat-awn' },
    conservation: { color: '#16a085', label: 'Conservation',   icon: 'fa-tree' },
    mixed:        { color: '#95a5a6', label: 'Mixed Use',      icon: 'fa-layer-group' },
    institutional:{ color: '#34495e', label: 'Institutional',  icon: 'fa-building-columns' },
    cemetery:     { color: '#7f8c8d', label: 'Cemetery',       icon: 'fa-cross' },
    recreation:   { color: '#1abc9c', label: 'Recreation',     icon: 'fa-futbol' },
    construction: { color: '#d35400', label: 'Construction',   icon: 'fa-helmet-safety' },
    quarry:       { color: '#6c3483', label: 'Quarry/Mining',  icon: 'fa-mountain' }
  };

  // Map OSM landuse tags to our zone types
  var OSM_LANDUSE_MAP = {
    residential: 'residential',
    commercial: 'commercial',
    retail: 'commercial',
    industrial: 'industrial',
    farmland: 'agricultural',
    farmyard: 'agricultural',
    meadow: 'agricultural',
    forest: 'conservation',
    grass: 'recreation',
    cemetery: 'cemetery',
    recreation_ground: 'recreation',
    construction: 'construction',
    quarry: 'quarry',
    landfill: 'industrial',
    brownfield: 'industrial',
    garages: 'commercial',
    // Extended mappings for manual/generated zone data
    tourism: 'tourism',
    beach: 'tourism',
    park: 'conservation',
    institutional: 'institutional',
    aerodrome: 'mixed',
    mixed: 'mixed',
    // Additional OSM tags found in St. Lucia data
    orchard: 'agricultural',
    greenhouse_horticulture: 'agricultural',
    churchyard: 'institutional',
    religious: 'institutional',
    military: 'institutional',
    grass: 'recreation'
  };

  var STORAGE_KEY = 'stlucia_user_zones';
  var map, drawControl, drawnItems;
  var osmZoneLayer, buildingLayer, userZoneLayer;
  var osmZonesLoaded = false, buildingsLoaded = false;
  var osmZoneData = null, buildingData = null;
  var osmGeoJson = null, buildingGeoJson = null;

  // Expose init for map.js to call
  window.StLuciaZones = { init: init };

  function init() {
    map = window.StLuciaMap.map;
    if (!map) return;

    // Create layer groups
    osmZoneLayer = L.layerGroup();
    buildingLayer = L.layerGroup();
    userZoneLayer = L.layerGroup().addTo(map);
    drawnItems = new L.FeatureGroup().addTo(map);

    // Build sidebar controls
    buildZoneControls();

    // Load data
    loadOsmZones();
    loadBuildings();
    loadUserZones();

    // Setup Leaflet.draw
    initDrawTools();

    // Zoom-dependent layer visibility for performance
    map.on('zoomend', function () {
      var zoom = map.getZoom();
      var buildingToggle = document.getElementById('toggle-buildings');
      // Auto-show buildings at zoom >= 15, auto-hide at < 15
      if (buildingToggle && buildingToggle.checked) {
        if (zoom >= 15 && !map.hasLayer(buildingLayer)) {
          map.addLayer(buildingLayer);
        } else if (zoom < 15 && map.hasLayer(buildingLayer)) {
          map.removeLayer(buildingLayer);
        }
      }
    });

    // Zone info panel close
    var closeBtn = document.getElementById('zone-info-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        document.getElementById('zone-info-panel').style.display = 'none';
      });
    }
  }

  // ==================== ZONE CONTROLS ====================

  function buildZoneControls() {
    var container = document.getElementById('zone-controls');
    if (!container) return;

    // Zone type toggles
    var html = '<div class="filter-controls">';
    html += '<button class="filter-ctrl-btn" id="zones-show-all"><i class="fa-solid fa-eye"></i> All</button>';
    html += '<button class="filter-ctrl-btn" id="zones-hide-all"><i class="fa-solid fa-eye-slash"></i> None</button>';
    html += '</div>';

    // Main toggles: OSM zones, Buildings, User zones
    html += '<label class="filter-item"><input type="checkbox" id="toggle-osm-zones"> ';
    html += '<span class="filter-dot" style="background:#3498db;"><i class="fa-solid fa-map"></i></span>';
    html += '<span class="filter-label">OSM Zones <small id="osm-zone-count"></small></span></label>';

    html += '<label class="filter-item"><input type="checkbox" id="toggle-buildings"> ';
    html += '<span class="filter-dot" style="background:#e74c3c;"><i class="fa-solid fa-vector-square"></i></span>';
    html += '<span class="filter-label">Building Outlines <small id="building-count"></small></span></label>';

    html += '<label class="filter-item"><input type="checkbox" checked id="toggle-user-zones"> ';
    html += '<span class="filter-dot" style="background:#2ecc71;"><i class="fa-solid fa-pen-ruler"></i></span>';
    html += '<span class="filter-label">My Zones <small id="user-zone-count"></small></span></label>';

    html += '<div style="border-top:1px solid var(--border);margin:10px 0;padding-top:10px;">';
    html += '<div style="font-size:0.8rem;font-weight:600;margin-bottom:8px;color:var(--text);">Zone Types</div>';

    Object.keys(ZONE_TYPES).forEach(function (type) {
      var cfg = ZONE_TYPES[type];
      html += '<label class="filter-item zone-type-filter">';
      html += '<input type="checkbox" checked data-zone-type="' + type + '">';
      html += '<span class="filter-dot" style="background:' + cfg.color + ';opacity:0.7;"><i class="fa-solid ' + cfg.icon + '"></i></span>';
      html += '<span class="filter-label">' + cfg.label + '</span></label>';
    });
    html += '</div>';

    container.innerHTML = html;

    // Event handlers
    document.getElementById('toggle-osm-zones').addEventListener('change', function () {
      if (this.checked) { map.addLayer(osmZoneLayer); }
      else { map.removeLayer(osmZoneLayer); }
    });

    document.getElementById('toggle-buildings').addEventListener('change', function () {
      if (this.checked) {
        // Only show buildings at zoom >= 15 for performance
        if (map.getZoom() >= 15) {
          map.addLayer(buildingLayer);
        }
      } else {
        map.removeLayer(buildingLayer);
      }
    });

    document.getElementById('toggle-user-zones').addEventListener('change', function () {
      if (this.checked) { map.addLayer(userZoneLayer); map.addLayer(drawnItems); }
      else { map.removeLayer(userZoneLayer); map.removeLayer(drawnItems); }
    });

    document.getElementById('zones-show-all').addEventListener('click', function () {
      container.querySelectorAll('input[data-zone-type]').forEach(function (cb) { cb.checked = true; });
      filterZonesByType();
    });

    document.getElementById('zones-hide-all').addEventListener('click', function () {
      container.querySelectorAll('input[data-zone-type]').forEach(function (cb) { cb.checked = false; });
      filterZonesByType();
    });

    container.querySelectorAll('input[data-zone-type]').forEach(function (cb) {
      cb.addEventListener('change', filterZonesByType);
    });

    // Edit tools
    var editContainer = document.getElementById('zone-edit-tools');
    if (editContainer) {
      document.getElementById('btn-draw-zone').addEventListener('click', startDrawing);
      document.getElementById('btn-export-zones').addEventListener('click', exportZones);
      document.getElementById('btn-import-zones').addEventListener('click', function () {
        document.getElementById('zone-import-file').click();
      });
      document.getElementById('zone-import-file').addEventListener('change', importZones);
      document.getElementById('btn-clear-zones').addEventListener('click', clearUserZones);
    }
  }

  function filterZonesByType() {
    var container = document.getElementById('zone-controls');
    var activeTypes = new Set();
    container.querySelectorAll('input[data-zone-type]:checked').forEach(function (cb) {
      activeTypes.add(cb.dataset.zoneType);
    });

    // Filter OSM zones (iterate through geoJSON features)
    if (osmGeoJson) {
      osmGeoJson.eachLayer(function (layer) {
        var type = layer.options._zoneType;
        if (activeTypes.has(type)) {
          layer.setStyle({ opacity: 0.6, fillOpacity: 0.25 });
        } else {
          layer.setStyle({ opacity: 0, fillOpacity: 0 });
        }
      });
    }

    // Filter user zones
    userZoneLayer.eachLayer(function (layer) {
      var type = layer.options._zoneType;
      if (activeTypes.has(type)) {
        layer.setStyle({ opacity: 0.7, fillOpacity: 0.3 });
      } else {
        layer.setStyle({ opacity: 0, fillOpacity: 0 });
      }
    });

    drawnItems.eachLayer(function (layer) {
      var type = layer.options._zoneType;
      if (type) {
        if (activeTypes.has(type)) {
          layer.setStyle({ opacity: 0.7, fillOpacity: 0.3 });
        } else {
          layer.setStyle({ opacity: 0, fillOpacity: 0 });
        }
      }
    });
  }

  // ==================== OSM ZONES ====================

  function loadOsmZones() {
    fetch('data/zones-osm.geojson')
      .then(function (res) {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(function (data) {
        osmZoneData = data;
        renderOsmZones(data);
        osmZonesLoaded = true;
        var countEl = document.getElementById('osm-zone-count');
        if (countEl) countEl.textContent = '(' + data.features.length + ')';
      })
      .catch(function () {
        console.log('No OSM zone data found (data/zones-osm.geojson)');
        var countEl = document.getElementById('osm-zone-count');
        if (countEl) countEl.textContent = '(0)';
      });
  }

  function renderOsmZones(data) {
    osmZoneLayer.clearLayers();

    var canvasRenderer = L.canvas();
    osmGeoJson = L.geoJSON(data, {
      renderer: canvasRenderer,
      style: function (feature) {
        var luType = feature.properties.landuse || 'unknown';
        var zoneType = OSM_LANDUSE_MAP[luType] || 'mixed';
        var cfg = ZONE_TYPES[zoneType] || ZONE_TYPES.mixed;
        return {
          color: cfg.color,
          weight: 1.5,
          opacity: 0.6,
          fillColor: cfg.color,
          fillOpacity: 0.25
        };
      },
      onEachFeature: function (feature, layer) {
        var luType = feature.properties.landuse || 'unknown';
        var zoneType = OSM_LANDUSE_MAP[luType] || 'mixed';
        layer.options._zoneType = zoneType;

        layer.on('click', function () {
          showZoneInfo({
            name: feature.properties.name || capitalise(luType) + ' Zone',
            type: zoneType,
            source: feature.properties._source === 'manual-gis' ? 'Satellite imagery + local knowledge' : 'OpenStreetMap',
            source_date: feature.properties._source_date || '2026-02-10',
            confidence: feature.properties._confidence || 'medium',
            osm_id: feature.properties._osm_id,
            landuse: luType,
            notes: feature.properties.description || ''
          });
        });
      }
    });
    osmZoneLayer.addLayer(osmGeoJson);
  }

  // ==================== BUILDINGS ====================

  function loadBuildings() {
    fetch('data/buildings-osm.geojson')
      .then(function (res) {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(function (data) {
        buildingData = data;
        renderBuildings(data);
        buildingsLoaded = true;
        var countEl = document.getElementById('building-count');
        if (countEl) countEl.textContent = '(' + data.features.length + ')';
      })
      .catch(function () {
        console.log('No building data found (data/buildings-osm.geojson)');
        var countEl = document.getElementById('building-count');
        if (countEl) countEl.textContent = '(0)';
      });
  }

  function renderBuildings(data) {
    buildingLayer.clearLayers();

    var canvasRenderer = L.canvas();
    buildingGeoJson = L.geoJSON(data, {
      renderer: canvasRenderer,
      style: function () {
        return {
          color: '#e74c3c',
          weight: 1,
          opacity: 0.7,
          fillColor: '#e74c3c',
          fillOpacity: 0.08
        };
      },
      onEachFeature: function (feature, layer) {
        var props = feature.properties;
        var name = props.name || props['addr:street'] || 'Building';
        var bType = props.building || '';
        var popup = '<div class="map-popup">';
        popup += '<h4 style="font-size:0.85rem;">' + escapeHtml(name) + '</h4>';
        if (bType && bType !== 'yes') popup += '<span class="popup-badge">' + capitalise(bType) + '</span>';
        if (props['addr:street']) popup += '<div class="popup-detail" style="font-size:0.75rem;"><i class="fa-solid fa-location-dot"></i> ' + escapeHtml(props['addr:street']) + (props['addr:housenumber'] ? ' ' + props['addr:housenumber'] : '') + '</div>';
        popup += '<div class="popup-detail" style="font-size:0.72rem;color:#999;"><i class="fa-solid fa-database"></i> OSM #' + (props._osm_id || '') + '</div>';
        popup += '</div>';
        layer.bindPopup(popup, { maxWidth: 250 });
      }
    });
    buildingLayer.addLayer(buildingGeoJson);
  }

  // ==================== USER ZONES (localStorage) ====================

  function loadUserZones() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      updateUserZoneCount();
      return;
    }
    try {
      var data = JSON.parse(saved);
      renderUserZones(data);
    } catch (e) {
      console.error('Failed to parse saved zones:', e);
    }
  }

  function renderUserZones(data) {
    userZoneLayer.clearLayers();

    if (!data || !data.features) return;

    L.geoJSON(data, {
      style: function (feature) {
        var zoneType = feature.properties.zone_type || 'mixed';
        var cfg = ZONE_TYPES[zoneType] || ZONE_TYPES.mixed;
        return {
          color: cfg.color,
          weight: 2,
          opacity: 0.7,
          fillColor: cfg.color,
          fillOpacity: 0.3,
          dashArray: '6,3',
          _zoneType: zoneType
        };
      },
      onEachFeature: function (feature, layer) {
        layer.options._zoneType = feature.properties.zone_type || 'mixed';
        layer.options._userData = feature.properties;

        layer.on('click', function () {
          showZoneInfo({
            name: feature.properties.name || 'User Zone',
            type: feature.properties.zone_type || 'mixed',
            source: feature.properties.source || 'User-defined',
            source_date: feature.properties.source_date || new Date().toISOString().split('T')[0],
            confidence: feature.properties.confidence || 'user',
            notes: feature.properties.notes || '',
            editable: true,
            layer: layer
          });
        });

        layer.on('mouseover', function () {
          this.setStyle({ fillOpacity: 0.5, weight: 3 });
        });
        layer.on('mouseout', function () {
          this.setStyle({ fillOpacity: 0.3, weight: 2 });
        });
      }
    }).addTo(userZoneLayer);

    updateUserZoneCount();
  }

  function saveUserZones() {
    var features = [];

    // From userZoneLayer
    userZoneLayer.eachLayer(function (layer) {
      if (layer.toGeoJSON) {
        var gj = layer.toGeoJSON();
        if (gj.type === 'FeatureCollection') {
          gj.features.forEach(function (f) {
            if (f.geometry) features.push(f);
          });
        } else if (gj.geometry) {
          features.push(gj);
        }
      }
    });

    // From drawnItems
    drawnItems.eachLayer(function (layer) {
      if (layer.toGeoJSON) {
        var gj = layer.toGeoJSON();
        if (layer.options._userData) {
          gj.properties = Object.assign({}, gj.properties, layer.options._userData);
        }
        features.push(gj);
      }
    });

    var collection = { type: 'FeatureCollection', features: features };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
    updateUserZoneCount();
  }

  function updateUserZoneCount() {
    var count = 0;
    userZoneLayer.eachLayer(function () { count++; });
    drawnItems.eachLayer(function (layer) {
      if (layer.options && layer.options._userData) count++;
    });
    var el = document.getElementById('user-zone-count');
    if (el) el.textContent = '(' + count + ')';
  }

  // ==================== LEAFLET.DRAW ====================

  function initDrawTools() {
    if (!L.Control.Draw) {
      console.log('Leaflet.draw not loaded');
      return;
    }

    drawControl = new L.Control.Draw({
      position: 'topright',
      draw: {
        polygon: {
          allowIntersection: false,
          shapeOptions: { color: '#2ecc71', weight: 2, fillOpacity: 0.3, dashArray: '6,3' }
        },
        rectangle: {
          shapeOptions: { color: '#2ecc71', weight: 2, fillOpacity: 0.3, dashArray: '6,3' }
        },
        polyline: false,
        circle: false,
        circlemarker: false,
        marker: false
      },
      edit: {
        featureGroup: drawnItems,
        remove: true
      }
    });

    // Don't add control to map by default - user activates via button
    map.on(L.Draw.Event.CREATED, function (e) {
      var layer = e.layer;
      showZoneEditor(layer);
    });

    map.on(L.Draw.Event.EDITED, function () {
      saveUserZones();
    });

    map.on(L.Draw.Event.DELETED, function () {
      saveUserZones();
    });
  }

  var drawActive = false;
  function startDrawing() {
    var btn = document.getElementById('btn-draw-zone');
    if (drawActive) {
      map.removeControl(drawControl);
      drawActive = false;
      btn.innerHTML = '<i class="fa-solid fa-pen-ruler"></i> Draw Zone';
      btn.classList.remove('active');
    } else {
      map.addControl(drawControl);
      drawActive = true;
      btn.innerHTML = '<i class="fa-solid fa-xmark"></i> Stop Drawing';
      btn.classList.add('active');
    }
  }

  // ==================== ZONE EDITOR MODAL ====================

  function showZoneEditor(layer) {
    var panel = document.getElementById('zone-editor-panel');
    if (!panel) return;

    // Reset form
    document.getElementById('ze-name').value = '';
    document.getElementById('ze-type').value = 'mixed';
    document.getElementById('ze-source').value = 'User-defined';
    document.getElementById('ze-notes').value = '';

    panel.style.display = 'block';

    // Save handler
    var saveBtn = document.getElementById('ze-save');
    var cancelBtn = document.getElementById('ze-cancel');

    function onSave() {
      var name = document.getElementById('ze-name').value.trim() || 'Unnamed Zone';
      var type = document.getElementById('ze-type').value;
      var source = document.getElementById('ze-source').value;
      var notes = document.getElementById('ze-notes').value.trim();
      var cfg = ZONE_TYPES[type] || ZONE_TYPES.mixed;

      layer.setStyle({
        color: cfg.color,
        fillColor: cfg.color,
        fillOpacity: 0.3,
        weight: 2,
        dashArray: '6,3'
      });

      layer.options._zoneType = type;
      layer.options._userData = {
        name: name,
        zone_type: type,
        source: source,
        source_date: new Date().toISOString().split('T')[0],
        confidence: 'user',
        notes: notes
      };

      drawnItems.addLayer(layer);
      saveUserZones();
      panel.style.display = 'none';

      saveBtn.removeEventListener('click', onSave);
      cancelBtn.removeEventListener('click', onCancel);
    }

    function onCancel() {
      panel.style.display = 'none';
      saveBtn.removeEventListener('click', onSave);
      cancelBtn.removeEventListener('click', onCancel);
    }

    saveBtn.addEventListener('click', onSave);
    cancelBtn.addEventListener('click', onCancel);
  }

  // ==================== ZONE INFO PANEL ====================

  function showZoneInfo(info) {
    var panel = document.getElementById('zone-info-panel');
    if (!panel) return;

    var cfg = ZONE_TYPES[info.type] || ZONE_TYPES.mixed;
    var confidenceLabels = {
      high: 'High (verified)',
      medium: 'Medium (OSM community)',
      low: 'Low (approximate)',
      user: 'User-defined'
    };

    var html = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">';
    html += '<span class="filter-dot" style="background:' + cfg.color + ';"><i class="fa-solid ' + cfg.icon + '"></i></span>';
    html += '<div><strong style="font-size:0.95rem;">' + escapeHtml(info.name) + '</strong>';
    html += '<br><span style="font-size:0.8rem;color:var(--text-light);">' + cfg.label + '</span></div></div>';

    html += '<table class="zone-info-table">';
    html += '<tr><td>Source</td><td>' + escapeHtml(info.source) + '</td></tr>';
    html += '<tr><td>Date</td><td>' + escapeHtml(info.source_date) + '</td></tr>';
    html += '<tr><td>Confidence</td><td>' + (confidenceLabels[info.confidence] || info.confidence) + '</td></tr>';
    if (info.landuse) html += '<tr><td>OSM Tag</td><td>landuse=' + escapeHtml(info.landuse) + '</td></tr>';
    if (info.osm_id) html += '<tr><td>OSM ID</td><td><a href="https://www.openstreetmap.org/way/' + info.osm_id + '" target="_blank" rel="noopener">' + info.osm_id + '</a></td></tr>';
    if (info.notes) html += '<tr><td>Notes</td><td>' + escapeHtml(info.notes) + '</td></tr>';
    html += '</table>';

    if (info.editable && info.layer) {
      html += '<div style="margin-top:10px;display:flex;gap:6px;">';
      html += '<button class="filter-ctrl-btn" onclick="window.StLuciaZones._deleteZone()" style="color:#e74c3c;"><i class="fa-solid fa-trash"></i> Delete</button>';
      html += '</div>';
      window.StLuciaZones._deleteTarget = info.layer;
    }

    document.getElementById('zone-info-content').innerHTML = html;
    panel.style.display = 'block';
  }

  // ==================== EXPORT / IMPORT ====================

  function exportZones() {
    var features = [];

    // Collect from user zones
    userZoneLayer.eachLayer(function (layer) {
      if (layer.toGeoJSON) {
        var gj = layer.toGeoJSON();
        if (gj.type === 'FeatureCollection') {
          features = features.concat(gj.features);
        } else {
          features.push(gj);
        }
      }
    });

    drawnItems.eachLayer(function (layer) {
      if (layer.toGeoJSON) {
        var gj = layer.toGeoJSON();
        if (layer.options._userData) {
          gj.properties = Object.assign({}, gj.properties, layer.options._userData);
        }
        features.push(gj);
      }
    });

    if (features.length === 0) {
      alert('No user zones to export.');
      return;
    }

    var collection = {
      type: 'FeatureCollection',
      _meta: {
        exported: new Date().toISOString(),
        app: 'St. Lucia Business Guide - Zone Editor',
        count: features.length
      },
      features: features
    };

    var blob = new Blob([JSON.stringify(collection, null, 2)], { type: 'application/geo+json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'stlucia-zones-' + new Date().toISOString().split('T')[0] + '.geojson';
    a.click();
    URL.revokeObjectURL(url);
  }

  function importZones(e) {
    var file = e.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function (ev) {
      try {
        var data = JSON.parse(ev.target.result);
        if (data.type !== 'FeatureCollection' || !data.features) {
          alert('Invalid GeoJSON: must be a FeatureCollection.');
          return;
        }

        // Add each feature as a user zone
        var count = 0;
        data.features.forEach(function (feature) {
          if (!feature.geometry) return;
          // Ensure properties exist
          if (!feature.properties) feature.properties = {};
          if (!feature.properties.zone_type) feature.properties.zone_type = 'mixed';
          if (!feature.properties.source) feature.properties.source = 'Imported';
          if (!feature.properties.source_date) feature.properties.source_date = new Date().toISOString().split('T')[0];
          count++;
        });

        // Merge with existing
        var existing = localStorage.getItem(STORAGE_KEY);
        var existingData = existing ? JSON.parse(existing) : { type: 'FeatureCollection', features: [] };
        existingData.features = existingData.features.concat(data.features);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));

        // Re-render
        renderUserZones(existingData);
        alert('Imported ' + count + ' zones successfully.');
      } catch (err) {
        alert('Failed to parse GeoJSON: ' + err.message);
      }
    };
    reader.readAsText(file);
    // Reset input so same file can be re-imported
    e.target.value = '';
  }

  function clearUserZones() {
    if (!confirm('Delete all user-created zones? This cannot be undone.')) return;
    localStorage.removeItem(STORAGE_KEY);
    userZoneLayer.clearLayers();
    drawnItems.clearLayers();
    updateUserZoneCount();
  }

  // ==================== UTILITIES ====================

  function capitalise(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, ' ');
  }

  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // Expose delete function for inline onclick
  window.StLuciaZones._deleteZone = function () {
    var layer = window.StLuciaZones._deleteTarget;
    if (!layer) return;
    if (!confirm('Delete this zone?')) return;

    userZoneLayer.removeLayer(layer);
    drawnItems.removeLayer(layer);
    saveUserZones();
    document.getElementById('zone-info-panel').style.display = 'none';
  };

})();
