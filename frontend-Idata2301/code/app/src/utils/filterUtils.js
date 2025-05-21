import { calculateFinalPriceInUserCurrency } from "./currencyUtils";

export function findMinPrice(flights) {
  return Math.min(
    ...flights.map((flight) =>
      calculateFinalPriceInUserCurrency(
        flight.price,
        flight.discount,
        flight.currencyCode
      )
    )
  );
}

export function findMaxPrice(flights) {
  return Math.max(
    ...flights.map((flight) =>
      calculateFinalPriceInUserCurrency(
        flight.price,
        flight.discount,
        flight.currencyCode
      )
    )
  );
}

// Dynamically extract unique companies from the flights array
export function getUniqueCompanies(flights) {
  const companies = flights.map(
    (flight) => flight.scheduledFlight.flight.company.name
  );
  return [...new Set(companies)]; // Remove duplicates
}

export function filterFlights(flightsToFilter, min, max, companies) {
  const updatedFlights = flightsToFilter.map((flight) => {
    const flightCompany = flight.scheduledFlight.flight.company.name;
    const flightPrice = calculateFinalPriceInUserCurrency(
      flight.price,
      flight.discount,
      flight.currencyCode
    );
    const isPriceInRange = flightPrice >= min && flightPrice <= max;
    const isCompanySelected = companies[flightCompany];

    const isFilteredOut = !(isPriceInRange && isCompanySelected);
    return { ...flight, isFilteredOut };
  });
  return updatedFlights;
};

export function sortFlights(flightsToSort, option) {
  const sorted = [...flightsToSort];

  switch (option) {
    case "cheap":
      sorted.sort(
        (a, b) =>
          calculateFinalPriceInUserCurrency(
            a.price,
            a.discount,
            a.currencyCode
          ) -
          calculateFinalPriceInUserCurrency(b.price, b.discount, b.currencyCode)
      );
      break;
    case "expensive":
      sorted.sort(
        (a, b) =>
          calculateFinalPriceInUserCurrency(
            b.price,
            b.discount,
            b.currencyCode
          ) -
          calculateFinalPriceInUserCurrency(a.price, a.discount, a.currencyCode)
      );
      break;
    case "soon":
      sorted.sort(
        (a, b) =>
          new Date(a.scheduledFlight.date) - new Date(b.scheduledFlight.date)
      );
      break;
    case "late":
      sorted.sort(
        (a, b) =>
          new Date(b.scheduledFlight.date) - new Date(a.scheduledFlight.date)
      );
      break;
    default:
      break;
  }

  return sorted;
};