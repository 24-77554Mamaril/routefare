// Pure Math Engine for RouteFare
// Responsible for calculating fuel and total trip costs.

const Calculator = {
    /**
     * Calculates the estimated trip cost based on distance and vehicle data.
     * @param {number} distance - Trip distance in kilometers.
     * @param {Object} vehicle - Vehicle data { efficiency, price, tolls, parking, passengers }.
     * @returns {Object} Cost breakdown { fuel, toll, parking, total, perPerson }.
     */
    calculateTripCost: function(distance, vehicle) {
        if (vehicle.efficiency <= 0 || vehicle.passengers <= 0) {
            throw new Error("Fuel efficiency and passengers must be greater than zero.");
        }

        const fuelRequired = distance / vehicle.efficiency;
        const fuelCost = fuelRequired * vehicle.price;
        const totalCost = fuelCost + vehicle.tolls + vehicle.parking;
        const perPerson = totalCost / vehicle.passengers;

        return {
            fuel: fuelCost,
            toll: vehicle.tolls,
            parking: vehicle.parking,
            total: totalCost,
            perPerson: perPerson
        };
    }
};
