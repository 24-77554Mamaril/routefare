// Local Airport Dataset for RouteFare
// Comprehensive list of top international airports to ensure high reliability and utility.

const AIRPORT_DATA = [
    // --- PHILIPPINES ---
    { code: "MNL", name: "Ninoy Aquino International Airport", city: "Manila", country: "Philippines", lat: 14.5086, lng: 121.0198 },
    { code: "CRK", name: "Clark International Airport", city: "Clark", country: "Philippines", lat: 15.1859, lng: 120.5600 },
    { code: "CEB", name: "Mactan-Cebu International Airport", city: "Lapu-Lapu", country: "Philippines", lat: 10.3067, lng: 123.8514 },
    { code: "DVO", name: "Francisco Bangoy International Airport", city: "Davao", country: "Philippines", lat: 7.1287, lng: 125.6042 },
    { code: "ILO", name: "Iloilo International Airport", city: "Cabatuan", country: "Philippines", lat: 10.7111, lng: 122.5661 },
    { code: "PPS", name: "Puerto Princesa International Airport", city: "Puerto Princesa", country: "Philippines", lat: 9.6211, lng: 118.7351 },
    { code: "TAG", name: "Tuguegarao Airport", city: "Tuguegarao", country: "Philippines", lat: 17.6133, lng: 121.5331 },
    { code: "SJP", name: "San Jose Airport", city: "San Jose", country: "Philippines", lat: 15.8333, lng: 121.5000 },
    { code: " Tac", name: "Tacloban Airport", city: "Tacloban", country: "Philippines", lat: 11.2428, lng: 124.9611 },
    { code: "ZAM", name: "Zamboanga International Airport", city: "Zamboanga", country: "Philippines", lat: 6.9211, lng: 122.0583 },

    // --- ASIA ---
    { code: "SIN", name: "Singapore Changi Airport", city: "Singapore", country: "Singapore", lat: 1.3644, lng: 103.9915 },
    { code: "HND", name: "Tokyo Haneda Airport", city: "Tokyo", country: "Japan", lat: 35.5494, lng: 139.7798 },
    { code: "NRT", name: "Tokyo Narita Airport", city: "Tokyo", country: "Japan", lat: 35.7720, lng: 140.3929 },
    { code: "ICN", name: "Incheon International Airport", city: "Seoul", country: "South Korea", lat: 37.4602, lng: 126.4407 },
    { code: "HKG", name: "Hong Kong International Airport", city: "Hong Kong", country: "Hong Kong", lat: 22.2375, lng: 113.9344 },
    { code: "BKK", name: "Suvarnabhumi Airport", city: "Bangkok", country: "Thailand", lat: 13.6900, lng: 100.7501 },
    { code: "KUL", name: "Kuala Lumpur International Airport", city: "Kuala Lumpur", country: "Malaysia", lat: 2.7456, lng: 101.7072 },
    { code: "TPE", name: "Taoyuan International Airport", city: "Taipei", country: "Taiwan", lat: 24.9, lng: 121.2343 },
    { code: "PVG", name: "Shanghai Pudong International Airport", city: "Shanghai", country: "China", lat: 31.1443, lng: 121.8083 },
    { code: "PEK", name: "Beijing Capital International Airport", city: "Beijing", country: "China", lat: 40.0799, lng: 116.6149 },
    { code: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport", city: "Mumbai", country: "India", lat: 19.0896, lng: 72.8656 },
    { code: "DEL", name: "Indira Gandhi International Airport", city: "Delhi", country: "India", lat: 28.5562, lng: 77.1000 },
    { code: "CGK", name: "Soekarno-Hatta International Airport", city: "Jakarta", country: "Indonesia", lat: -6.1256, lng: 106.6559 },

    // --- MIDDLE EAST ---
    { code: "DXB", name: "Dubai International Airport", city: "Dubai", country: "UAE", lat: 25.2532, lng: 55.3657 },
    { code: "DOH", name: "Hamad International Airport", city: "Doha", country: "Qatar", lat: 25.2731, lng: 51.6081 },
    { code: "AUH", name: "Zayed International Airport", city: "Abu Dhabi", country: "UAE", lat: 24.4323, lng: 54.6279 },
    { code: "IST", name: "Istanbul Airport", city: "Istanbul", country: "Turkey", lat: 41.2751, lng: 28.7519 },

    // --- EUROPE ---
    { code: "LHR", name: "London Heathrow Airport", city: "London", country: "UK", lat: 51.4700, lng: -0.4543 },
    { code: "CDG", name: "Charles de Gaulle Airport", city: "Paris", country: "France", lat: 49.0097, lng: 2.5479 },
    { code: "FRA", name: "Frankfurt Airport", city: "Frankfurt", country: "Germany", lat: 50.0379, lng: 8.5622 },
    { code: "AMS", name: "Schiphol Airport", city: "Amsterdam", country: "Netherlands", lat: 52.3105, lng: 4.7683 },
    { code: "MAD", name: "Adolfo Suárez Madrid–Barajas Airport", city: "Madrid", country: "Spain", lat: 40.4983, lng: -3.5676 },
    { code: "FCO", name: "Leonardo da Vinci–Fiumicino Airport", city: "Rome", country: "Italy", lat: 41.8003, lng: 12.2389 },
    { code: "MUC", name: "Munich Airport", city: "Munich", country: "Germany", lat: 48.3537, lng: 11.7750 },

    // --- NORTH AMERICA ---
    { code: "ATL", name: "Hartsfield-Jackson Atlanta International Airport", city: "Atlanta", country: "USA", lat: 33.6407, lng: -84.4277 },
    { code: "LAX", name: "Los Angeles International Airport", city: "Los Angeles", country: "USA", lat: 33.9416, lng: -118.4085 },
    { code: "ORD", name: "O'Hare International Airport", city: "Chicago", country: "USA", lat: 41.9742, lng: -87.9073 },
    { code: "DFW", name: "Dallas/Fort Worth International Airport", city: "Dallas", country: "USA", lat: 32.8998, lng: -97.0403 },
    { code: "DEN", name: "Denver International Airport", city: "Denver", country: "USA", lat: 39.8561, lng: -104.6737 },
    { code: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "USA", lat: 40.6413, lng: -73.7781 },
    { code: "YYZ", name: "Toronto Pearson International Airport", city: "Toronto", country: "Canada", lat: 43.6777, lng: -79.6248 },
    { code: "MEX", name: "Mexico City International Airport", city: "Mexico City", country: "Mexico", lat: 19.4361, lng: -99.0719 },

    // --- OCEANIA & AFRICA ---
    { code: "SYD", name: "Sydney Kingsford Smith Airport", city: "Sydney", country: "Australia", lat: -33.9399, lng: 151.1753 },
    { code: "MEL", name: "Melbourne Airport", city: "Melbourne", country: "Australia", lat: -37.6690, lng: 144.8410 },
    { code: "AKL", name: "Auckland Airport", city: "Auckland", country: "New Zealand", lat: -37.0081, lng: 174.7850 },
    { code: "JNB", name: "O.R. Tambo International Airport", city: "Johannesburg", country: "South Africa", lat: -26.1367, lng: 28.2460 },
    { code: "CAI", name: "Cairo International Airport", city: "Cairo", country: "Egypt", lat: 30.1219, lng: 31.4056 },
    { code: "CPT", name: "Cape Town International Airport", city: "Cape Town", country: "South Africa", lat: -33.9715, lng: 18.6021 }
];
