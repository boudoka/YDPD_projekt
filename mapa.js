var crs = new L.Proj.CRS('EPSG:5514', '+proj=krovak +lat_0=49.5 +lon_0=24.8333333333333 +alpha=30.2881397527778 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +towgs84=589,76,480,0,0,0,0 +units=m +no_defs', {
    resolutions: [2800, 1400, 700, 350, 175, 84, 42, 21, 11.2, 5.6, 2.8, 1.4, 0.7, 0.35, 0.14, 0.07],
});
var map = L.map('map', {
    crs: crs,
    continuousWorld: false,
    worldCopyJump: false,
    zoomControl: false, maxZoom: 14, minZoom: 9
}).fitBounds([[50.07957024445426, 14.4265309592314], [50.08249819689918, 14.431934043807201]]);
var hash = new L.Hash(map);
map.attributionControl.setPrefix('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>');
var autolinker = new Autolinker({ truncate: { length: 30, location: 'smart' } });
// remove popup's row if "visible-with-data"
function removeEmptyRowsFromPopupContent(content, feature) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    var rows = tempDiv.querySelectorAll('tr');
    for (var i = 0; i < rows.length; i++) {
        var td = rows[i].querySelector('td.visible-with-data');
        var key = td ? td.id : '';
        if (td && td.classList.contains('visible-with-data') && feature.properties[key] == null) {
            rows[i].parentNode.removeChild(rows[i]);
        }
    }
    return tempDiv.innerHTML;
}
// add class to format popup if it contains media
function addClassToPopupIfMedia(content, popup) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    if (tempDiv.querySelector('td img')) {
        popup._contentNode.classList.add('media');
        // Delay to force the redraw
        setTimeout(function () {
            popup.update();
        }, 10);
    } else {
        popup._contentNode.classList.remove('media');
    }
}
var zoomControl = L.control.zoom({
    position: 'topleft'
}).addTo(map);
var measureControl = new L.Control.Measure({
    position: 'topleft',
    primaryLengthUnit: 'meters',
    secondaryLengthUnit: 'kilometers',
    primaryAreaUnit: 'sqmeters',
    secondaryAreaUnit: 'hectares'
});
measureControl.addTo(map);
document.getElementsByClassName('leaflet-control-measure-toggle')[0].innerHTML = '';
document.getElementsByClassName('leaflet-control-measure-toggle')[0].className += ' fas fa-ruler';
var bounds_group = new L.featureGroup([]);
function setBounds() {
}
map.createPane('pane_ZTM5_0');
map.getPane('pane_ZTM5_0').style.zIndex = 400;
var layer_ZTM5_0 = L.WMS.layer("https://ags.cuzk.cz/arcgis1/services/ZTM/ZTM5/MapServer/WMSServer", "0", {
    pane: 'pane_ZTM5_0',
    format: 'image/png',
    uppercase: true,
    transparent: true,
    continuousWorld: true,
    tiled: true,
    info_format: 'text/html',
    opacity: 1,
    identify: false,
    attribution: '',
});
map.addLayer(layer_ZTM5_0);
map.createPane('pane_ORTOFOTO_1');
map.getPane('pane_ORTOFOTO_1').style.zIndex = 401;
var layer_ORTOFOTO_1 = L.WMS.layer("https://ags.cuzk.cz/arcgis1/services/ORTOFOTO/MapServer/WMSServer", "0", {
    pane: 'pane_ORTOFOTO_1',
    format: 'image/png',
    uppercase: true,
    transparent: true,
    continuousWorld: true,
    tiled: true,
    info_format: 'text/html',
    opacity: 1,
    identify: false,
    attribution: '',
});
map.createPane('pane_cisarske_otisky_1440_2');
map.getPane('pane_cisarske_otisky_1440_2').style.zIndex = 402;
var layer_cisarske_otisky_1440_2 = L.WMS.layer("https://gs-pub.praha.eu/imgs/services/arch/cisarske_otisky_1440/ImageServer/WMSServer", "0", {
    pane: 'pane_cisarske_otisky_1440_2',
    format: 'image/png',
    uppercase: true,
    transparent: true,
    continuousWorld: true,
    tiled: true,
    info_format: 'text/html',
    opacity: 1,
    identify: false,
    attribution: '',
});

//CUSTOM MARKER
var arrow = L.icon({
    iconUrl: 'images/marker-icon-violet.png',
    //attribution: <a href="https://www.flaticon.com/free-icons/down-arrow" title="down arrow icons">Down arrow icons created by The Chohans Brand - Flaticon</a>

    iconSize: [20, 30], // size of the icon
    iconAnchor: [15, 25], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});


var pohled1922 = L.marker([50.080301, 14.428696], {
    icon: arrow
})
    .bindPopup('<img src="images/fotky/Pohled_1922.jpg" style="width:200px"></img><br><strong>1922</strong><br>'),
    pohled1960 = L.marker([50.08038, 14.428739], {
        icon: arrow
    })
        .bindPopup('<img src="images/fotky/Pohled_1960.jpg" style="width:200px"></img><br><strong>1960</strong><br>'),
    pohled1961 = L.marker([50.080948, 14.427747], {
        icon: arrow
    })
        .bindPopup('<img src="images/fotky/Pohled_1961.jpg" style="width:200px"></img><br><strong>1961</strong><br>'),
    pohled2022 = L.marker([50.0808225, 14.4286014], {
        icon: arrow
    })
        .bindPopup('<img src="images/fotky/Pohled_2022.jpg" style="width:200px"></img><br><strong>2022</strong><br>');
var pohledy = L.layerGroup([pohled1922, pohled1960, pohled1961, pohled2022]);
bounds_group.addLayer(pohledy);

function pop_727181HP_3(feature, layer) {
    var popupContent = '<table>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['ID'] !== null ? autolinker.link(String(feature.properties['ID']).replace(/'/g, '\'').replace(/"/g, '&quot;').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['STAV_DAT'] !== null ? autolinker.link(String(feature.properties['STAV_DAT']).replace(/'/g, '\'').replace(/"/g, '&quot;').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['DATUM_VZNIKU'] !== null ? autolinker.link(String(feature.properties['DATUM_VZNIKU']).replace(/'/g, '\'').replace(/"/g, '&quot;').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['DATUM_ZANIKU'] !== null ? autolinker.link(String(feature.properties['DATUM_ZANIKU']).replace(/'/g, '\'').replace(/"/g, '&quot;').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['PRIZNAK_KONTEXTU'] !== null ? autolinker.link(String(feature.properties['PRIZNAK_KONTEXTU']).replace(/'/g, '\'').replace(/"/g, '&quot;').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['RIZENI_ID_VZNIKU'] !== null ? autolinker.link(String(feature.properties['RIZENI_ID_VZNIKU']).replace(/'/g, '\'').replace(/"/g, '&quot;').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['RIZENI_ID_ZANIKU'] !== null ? autolinker.link(String(feature.properties['RIZENI_ID_ZANIKU']).replace(/'/g, '\'').replace(/"/g, '&quot;').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['TYPPPD_KOD'] !== null ? autolinker.link(String(feature.properties['TYPPPD_KOD']).replace(/'/g, '\'').replace(/"/g, '&quot;').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['PAR_ID_1'] !== null ? autolinker.link(String(feature.properties['PAR_ID_1']).replace(/'/g, '\'').replace(/"/g, '&quot;').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['PAR_ID_2'] !== null ? autolinker.link(String(feature.properties['PAR_ID_2']).replace(/'/g, '\'').replace(/"/g, '&quot;').toLocaleString()) : '') + '</td>\
                    </tr>\
                </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function (e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

function style_727181HP_3_0() {
    return {
        pane: 'pane_727181HP_3',
        opacity: 1,
        color: 'rgba(0,0,0,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 2.0,
        fillOpacity: 0,
        interactive: false,
    }
}
map.createPane('pane_727181HP_3');
map.getPane('pane_727181HP_3').style.zIndex = 403;
map.getPane('pane_727181HP_3').style['mix-blend-mode'] = 'normal';
var layer_727181HP_3 = new L.geoJson(json_727181HP_3, {
    attribution: '',
    interactive: false,
    dataVar: 'json_727181HP_3',
    layerName: 'layer_727181HP_3',
    pane: 'pane_727181HP_3',
    onEachFeature: pop_727181HP_3,
    style: style_727181HP_3_0,
});
bounds_group.addLayer(layer_727181HP_3);

var overlaysTree = [
    { label: "Fotografie", layer: pohledy },
    { label: '<img src="legend/727181HP_3.png" /> 727181 — HP', layer: layer_727181HP_3 },
    { label: "cisarske_otisky_1440", layer: layer_cisarske_otisky_1440_2, radioGroup: 'bm' },
    { label: "ORTOFOTO", layer: layer_ORTOFOTO_1, radioGroup: 'bm' },
    { label: "ZTM5", layer: layer_ZTM5_0, radioGroup: 'bm' },]
var lay = L.control.layers.tree(null, overlaysTree, {
    //namedToggle: true,
    //selectorBack: false,
    //closedSymbol: '&#8862; &#x1f5c0;',
    //openedSymbol: '&#8863; &#x1f5c1;',
    //collapseAll: 'Collapse all',
    //expandAll: 'Expand all',
    collapsed: true,
});
lay.addTo(map);
setBounds();