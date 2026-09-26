// Map Visualizer for RouteFare
// Wrapper for Leaflet.js to handle map rendering, markers, and route lines.

const MapManager = {
    map: null,
    markers: [],
    routeLine: null,
    planeMarker: null,

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
            html: '<div class="icon-inner">📍</div>',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });

        if (start) {
            const startMarker = L.marker([start.lat, start.lng], { icon: airportIcon }).addTo(this.map).bindPopup(`<b>Departure:</b><br>${start.name}`);
            startMarker.on('mousedown', () => {
                document.getElementById('departure-input').value = `${start.name} (${start.code})`;
                App.departure = start;
            });
            this.markers.push(startMarker);
        }

        if (end) {
            const endMarker = L.marker([end.lat, end.lng], { icon: airportIcon }).addTo(this.map).bindPopup(`<b>Destination:</b><br>${end.name}`);
            endMarker.on('mousedown', () => {
                document.getElementById('destination-input').value = `${end.name} (${end.code})`;
                App.destination = end;
            });
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
        if (this.planeMarker) {
            this.map.removeLayer(this.planeMarker);
        }

        // Convert [lng, lat] (Routing API) to [lat, lng] (Leaflet)
        const latLngs = geometry.map(coord => [coord[1], coord[0]]);

        this.routeLine = L.polyline(latLngs, {
            color: '#3498db',
            weight: 5,
            opacity: 0.7
        }).addTo(this.map);

        // Plane Animation
        const startPos = latLngs[0];
        const endPos = latLngs[latLngs.length - 1];

        const planeIcon = L.divIcon({
            className: 'plane-marker',
            html: `<div class="plane-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#3498db" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V11l-8 5v2c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-2l6 4v5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5l6-4v2c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-2z"/>
                </svg>
            </div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });

        this.planeMarker = L.marker(startPos, { icon: planeIcon }).addTo(this.map);

        // Simple linear interpolation for animation
        let step = 0;
        const totalSteps = 100;
        const interval = setInterval(() => {
            step++;
            const ratio = step / totalSteps;
            const currentLat = startPos[0] + (endPos[0] - startPos[0]) * ratio;
            const currentLng = startPos[1] + (endPos[1] - startPos[1]) * ratio;

            this.planeMarker.setLatLng([currentLat, currentLng]);

            if (step >= totalSteps) clearInterval(interval);
        }, 20);

        this.map.fitBounds(this.routeLine.getBounds().pad(0.1));
    }
};
