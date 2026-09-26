// RouteFare Main Application Orchestrator
// Handles API communication, event listeners, and UI synchronization.

const App = {
    // State
    departure: null,
    destination: null,
    apiKeyAviation: '5c7dd4367f0bd3993987a19bea9bc83d', // From API.txt
    apiKeyRouting: 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImI2YjQ3YTE1ODY2ZTRjZjE4NzNkMGQ5NTU0MjRjYjU0IiwiaCI6Im11cm11cjY0In0=', // From API.txt

    init: function() {
        console.log("RouteFare initializing...");
        MapManager.initMap();
        this.setupEventListeners();
    },

    setupEventListeners: function() {
        const depInput = document.getElementById('departure-input');
        const destInput = document.getElementById('destination-input');
        const calcBtn = document.getElementById('calculate-btn');

        // Airport search listeners
        depInput.addEventListener('input', (e) => this.handleSearch(e, 'departure'));
        destInput.addEventListener('input', (e) => this.handleSearch(e, 'destination'));

        // Tab listeners - enables switching between Driving and Flight info
        const tabs = document.querySelectorAll('.tab-btn');
        if (tabs.length > 0) {
            tabs.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const tabId = e.target.getAttribute('data-tab');
                    tabs.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    document.querySelectorAll('.tab-content').forEach(content => {
                        content.classList.add('hidden');
                    });
                    const activeTab = document.getElementById(tabId);
                    if (activeTab) activeTab.classList.remove('hidden');
                });
            });
        }

        // Calculate button listener
        calcBtn.addEventListener('click', () => this.handleCalculate());
    },

    /**
     * Handles airport search and autocomplete display.
     */
    handleSearch: async function(event, type) {
        const query = event.target.value.toLowerCase().trim();
        const resultsDiv = document.getElementById(`${type}-results`);

        if (query.length < 2) {
            resultsDiv.innerHTML = '';
            return;
        }

        try {
            // Local dataset search
            const airports = AIRPORT_DATA.filter(airport =>
                (airport.name && airport.name.toLowerCase().includes(query)) ||
                (airport.city && airport.city.toLowerCase().includes(query)) ||
                (airport.code && airport.code.toLowerCase().includes(query)) ||
                (airport.country && airport.country.toLowerCase().includes(query))
            );

            this.renderSearchResults(airports, type);
        } catch (err) {
            console.error("Search error:", err);
        }
    },

    fetchAirports: async function(query) {
        // This is now a legacy function used by handleCalculate smart-selection
        return AIRPORT_DATA.filter(airport =>
            airport.name.toLowerCase().includes(query.toLowerCase()) ||
            airport.code.toLowerCase().includes(query.toLowerCase())
        );
    },

    renderSearchResults: function(airports, type) {
        const resultsDiv = document.getElementById(`${type}-results`);
        resultsDiv.innerHTML = '';

        airports.forEach(airport => {
            const item = document.createElement('div');
            item.className = 'autocomplete-item';
            item.innerHTML = `<strong>${airport.iata || airport.icao}</strong> - ${airport.name}, ${airport.city}`;
            item.onclick = () => this.selectAirport(airport, type);
            resultsDiv.appendChild(item);
        });
    },

    selectAirport: function(airport, type) {
        if (type === 'departure') {
            this.departure = {
                name: airport.name,
                code: airport.iata || airport.icao,
                lat: parseFloat(airport.lat),
                lng: parseFloat(airport.lng)
            };
            document.getElementById('departure-input').value = `${airport.name} (${airport.iata || airport.icao})`;
        } else {
            this.destination = {
                name: airport.name,
                code: airport.iata || airport.icao,
                lat: parseFloat(airport.lat),
                lng: parseFloat(airport.lng)
            };
            document.getElementById('destination-input').value = `${airport.name} (${airport.iata || airport.icao})`;
        }

        document.getElementById(`${type}-results`).innerHTML = '';
        MapManager.updateMarkers(this.departure, this.destination);
    },

    /**
     * Main calculation flow: Routing API -> Calculator -> Map -> UI.
     */
    handleCalculate: async function() {
        const depInput = document.getElementById('departure-input');
        const destInput = document.getElementById('destination-input');

        // SMART FIX: If airports aren't selected but text is present, try to auto-select the first result
        if (!this.departure && depInput.value) {
            const results = await this.fetchAirports(depInput.value);
            if (results && results.length > 0) {
                this.selectAirport(results[0], 'departure');
            }
        }
        if (!this.destination && destInput.value) {
            const results = await this.fetchAirports(destInput.value);
            if (results && results.length > 0) {
                this.selectAirport(results[0], 'destination');
            }
        }

        if (!this.departure || !this.destination) {
            alert("Please enter valid airport names or select them from the list.");
            return;
        }

        const calcBtn = document.getElementById('calculate-btn');
        const originalBtnText = calcBtn.textContent;

        try {
            // UI Loading State
            calcBtn.disabled = true;
            calcBtn.textContent = "CALCULATING...";

            // 1. Get Routing Data (Using local fallback for unlimited use)
            const routeData = await this.fetchRoute(this.departure, this.destination);

            // 2. Dynamic Price Calculation
            const currency = document.getElementById('currency-select').value;
            const baseFuelPrice = 65; // ₱65 per Liter
            const baseEfficiency = 12; // 12 km/L

            const exchangeRates = {
                'PHP': 1,
                'USD': 0.018,
                'EUR': 0.016
            };

            const rate = exchangeRates[currency] || 1;

            const vehicleInfo = {
                efficiency: baseEfficiency,
                price: baseFuelPrice * rate,
                passengers: 1,
                tolls: 0 * rate,
                parking: 0 * rate,
            };

            const costs = Calculator.calculateTripCost(routeData.distance, vehicleInfo);

            // 3. Update Map
            MapManager.drawRoute(routeData.geometry);

            // 4. Update Results UI
            this.updateResultsUI(routeData, costs);

        } catch (err) {
            console.error("Calculation error:", err);
            alert(err.message || "An error occurred while calculating the route.");
        } finally {
            calcBtn.disabled = false;
            calcBtn.textContent = originalBtnText;
        }
    },

    fetchRoute: async function(start, end) {
        // COMPLETELY LOCAL ROUTING to save API credits and ensure unlimited use
        const R = 6371; // Earth's radius in km
        const dLat = (end.lat - start.lat) * Math.PI / 180;
        const dLon = (end.lng - start.lng) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(start.lat * Math.PI / 180) * Math.cos(end.lat * Math.PI / 180) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c * 1.2;
        const duration = Math.round((distance / 80) * 60);

        return {
            distance: distance,
            duration: duration,
            geometry: [[start.lng, start.lat], [end.lng, end.lat]]
        };
    },

    updateResultsUI: function(route, costs) {
        document.getElementById('results-section').classList.remove('hidden');

        const currency = document.getElementById('currency-select').value;
        const symbols = {
            'PHP': '₱',
            'USD': '$',
            'EUR': '€'
        };
        const symbol = symbols[currency] || '₱';

        document.getElementById('res-from').textContent = this.departure.name;
        document.getElementById('res-to').textContent = this.destination.name;
        document.getElementById('res-distance').textContent = `${route.distance.toFixed(1)} km`;
        document.getElementById('res-time').textContent = `${Math.floor(route.duration / 60)}h ${route.duration % 60}m`;

        document.getElementById('res-fuel').textContent = `${symbol}${costs.fuel.toFixed(2)}`;
        document.getElementById('res-toll').textContent = `${symbol}${costs.toll.toFixed(2)}`;
        document.getElementById('res-parking').textContent = `${symbol}${costs.parking.toFixed(2)}`;
        document.getElementById('res-total').textContent = `${symbol}${costs.total.toFixed(2)}`;
        document.getElementById('res-per-person').textContent = `${symbol}${costs.perPerson.toFixed(2)}`;
    }
};

window.onload = () => App.init();
