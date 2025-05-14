package ntnu.no.stud.dto;

import jakarta.persistence.*;


public class FlightCompanyDTO {

    private int id;

    private String name;

    private String abbreviation;

    /**
     * Default constructor required by JPA.
     */
    public FlightCompanyDTO() {
    }

    /**
     * Constructs a new FlightCompanyDTO with the specified details.
     *
     * @param name          the full name of the company
     * @param abbreviation  the unique abbreviation for the company
     */
    public FlightCompanyDTO(String name,  String abbreviation) {
        this.name = name;
        this.abbreviation = abbreviation;
    }

    /**
     * Returns the unique ID of the flight company.
     *
     * @return the company ID
     */
    public int getId() {
        return id;
    }

    /**
     * Returns the name of the company.
     *
     * @return the company name
     */
    public String getName() {
        return name;
    }

    /**
     * Returns the abbreviation of the company.
     *
     * @return the company abbreviation
     */
    public String getAbbreviation() {
        return abbreviation;
    }


    /**
     * Sets the unique ID of the flight company.
     *
     * @param id the ID to set
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * Sets the name of the company.
     *
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Sets the abbreviation of the company.
     *
     * @param abbreviation the abbreviation to set
     */
    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }
}
