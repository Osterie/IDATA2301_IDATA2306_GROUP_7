package ntnu.no.stud.models;

import java.time.LocalDate;
import java.util.List;

public class SearchedFlight {

    private String departure;

    private String arrival;

    private LocalDate fromDate;

    private LocalDate toDate;

    private List<Passenger> passengers;

    public SearchedFlight(String departure, String arrival, LocalDate fromDate, LocalDate toDate, List<Passenger> passengers) {
        this.departure = departure;
        this.arrival = arrival;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.passengers = passengers;
    }

    public String getDeparture() {
        return departure;
    }

    public void setDeparture(String departure) {
        this.departure = departure;
    }

    public String getArrival() {
        return arrival;
    }

    public void setArrival(String arrival) {
        this.arrival = arrival;
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
