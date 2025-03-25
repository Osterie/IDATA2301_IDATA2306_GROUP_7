package ntnu.no.stud.models;

import ntnu.no.stud.entities.Route;
import java.time.LocalDate;
import java.util.List;

public class SearchedFlight {

    private Route route;

    private LocalDate fromDate;

    private LocalDate toDate;

    private List<Passenger> passengers;

    public SearchedFlight(Route route, LocalDate fromDate, LocalDate toDate, List<Passenger> passengers) {
        this.route = route;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.passengers = passengers;
    }

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    public LocalDate getFromDate() {
        return fromDate;
    }

    public void setFromDate(LocalDate fromDate) {
        this.fromDate = fromDate;
    }

    public LocalDate getToDate() {
        return toDate;
    }

    public void setToDate(LocalDate toDate) {
        this.toDate = toDate;
    }

    public List<Passenger> getPassengers() {
        return passengers;
    }

    public void setPassengers(List<Passenger> passengers) {
        this.passengers = passengers;
    }
}
