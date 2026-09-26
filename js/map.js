// Map Visualizer for RouteFare
// Wrapper for Leaflet.js to handle map rendering, markers, and route lines.

const MapManager = {
    map: null,
    markers: [],
    routeLine: null,

    /**
     * Initializes the map and adds the base OpenStreetMap layer.
     */
    initMap: function() {
        this.map = L.map('map').setView([14.5995, 120.9842], 6); // Default center (Philippines)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        return this.map;
    },

    /**
     * Updates markers on the map for departure and destination.
     * @param {Object} start - { lat, lng, name }
     * @param {Object} end - { lat, lng, name }
     */
    updateMarkers: function(start, end) {
        // Clear existing markers
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];

        // Custom icon for airports to make them stand out
        const airportIcon = L.divIcon({
            className: 'custom-airport-icon',
            html: '<div class="icon-inner">✈️</div>',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });

        if (start) {
            const startMarker = L.marker([start.lat, start.lng], { icon: airportIcon }).addTo(this.map).bindPopup(`<b>Departure:</b><br>${start.name}`);
            this.markers.push(startMarker);
        }

        if (end) {
            const endMarker = L.marker([end.lat, end.lng], { icon: airportIcon }).addTo(this.map).bindPopup(`<b>Destination:</b><br>${end.name}`);
            this.markers.push(endMarker);
        }

        // Zoom to fit both markers
        if (start && end) {
            const group = new L.featureGroup([this.markers[0], this.markers[1]]);
            this.map.fitBounds(group.getBounds().pad(0.2));
        }
    },

    /**
     * Draws the routing polyline on the map.
     * @param {Array} geometry - Array of [lng, lat] coordinates from the Routing API.
     */
    drawRoute: function(geometry) {
        // Clear existing route line
        if (this.routeLine) {
            this.map.removeLayer(this.routeLine);
        }

        // Convert [lng, lat] (Routing API) to [lat, lng] (Leaflet)
        const latLngs = geometry.map(coord => [coord[1], coord[0]]);

        this.routeLine = L.polyline(latLngs, {
            color: '#3498db',
            weight: 5,
            opacity: 0.7
        }).addTo(this.map);

        this.map.fitBounds(this.routeLine.getBounds().pad(0.1));
    }
};
