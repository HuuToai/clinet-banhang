!(function (t) {
    'use strict';
    var e = function () {};
    (e.prototype.createMarkers = function (e) {
        var t = new GMaps({ div: e, lat: -12.043333, lng: -77.028333 });
        return (
            t.addMarker({
                lat: -12.043333,
                lng: -77.03,
                title: 'Lima',
                details: { database_id: 42, author: 'HPNeo' },
                click: function (e) {
                    console.log && console.log(e),
                        alert('You clicked in this marker');
                },
            }),
            t.addMarker({
                lat: -12.042,
                lng: -77.028333,
                title: 'Marker with InfoWindow',
                infoWindow: { content: '<p>HTML Content</p>' },
            }),
            t
        );
    }),
        (e.prototype.createWithOverlay = function (e) {
            var t = new GMaps({ div: e, lat: -12.043333, lng: -77.028333 });
            return (
                t.drawOverlay({
                    lat: t.getCenter().lat(),
                    lng: t.getCenter().lng(),
                    content:
                        '<div class="gmaps-overlay">Our Office!<div class="gmaps-overlay_arrow above"></div></div>',
                    verticalAlign: 'top',
                    horizontalAlign: 'center',
                }),
                t
            );
        }),
        (e.prototype.createWithStreetview = function (e, t, a) {
            return GMaps.createPanorama({ el: e, lat: t, lng: a });
        }),
        (e.prototype.createMapByType = function (e, t, a) {
            var n = new GMaps({
                div: e,
                lat: t,
                lng: a,
                mapTypeControlOptions: {
                    mapTypeIds: [
                        'hybrid',
                        'roadmap',
                        'satellite',
                        'terrain',
                        'osm',
                        'cloudmade',
                    ],
                },
            });
            return (
                n.addMapType('osm', {
                    getTileUrl: function (e, t) {
                        return (
                            'http://tile.openstreetmap.org/' +
                            t +
                            '/' +
                            e.x +
                            '/' +
                            e.y +
                            '.png'
                        );
                    },
                    tileSize: new google.maps.Size(256, 256),
                    name: 'OpenStreetMap',
                    maxZoom: 18,
                }),
                n.addMapType('cloudmade', {
                    getTileUrl: function (e, t) {
                        return (
                            'http://b.tile.cloudmade.com/8ee2a50541944fb9bcedded5165f09d9/1/256/' +
                            t +
                            '/' +
                            e.x +
                            '/' +
                            e.y +
                            '.png'
                        );
                    },
                    tileSize: new google.maps.Size(256, 256),
                    name: 'CloudMade',
                    maxZoom: 18,
                }),
                n.setMapTypeId('osm'),
                n
            );
        }),
        (e.prototype.createWithMenu = function (e, t, a) {
            new GMaps({ div: e, lat: t, lng: a }).setContextMenu({
                control: 'map',
                options: [
                    {
                        title: 'Add marker',
                        name: 'add_marker',
                        action: function (e) {
                            this.addMarker({
                                lat: e.latLng.lat(),
                                lng: e.latLng.lng(),
                                title: 'New marker',
                            }),
                                this.hideContextMenu();
                        },
                    },
                    {
                        title: 'Center here',
                        name: 'center_here',
                        action: function (e) {
                            this.setCenter(e.latLng.lat(), e.latLng.lng());
                        },
                    },
                ],
            });
        }),
        (e.prototype.init = function () {
            var e = this;
            t(document).ready(function () {
                e.createMarkers('#gmaps-markers'),
                    e.createWithOverlay('#gmaps-overlay'),
                    e.createWithStreetview('#panorama', 42.3455, -71.0983),
                    e.createMapByType('#gmaps-types', -12.043333, -77.028333);
            });
        }),
        (t.GoogleMap = new e()),
        (t.GoogleMap.Constructor = e);
})(window.jQuery),
    (function (e) {
        'use strict';
        window.jQuery.GoogleMap.init();
    })();
