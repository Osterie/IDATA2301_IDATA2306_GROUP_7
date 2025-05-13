package ntnu.no.stud.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "company")
public class FlightCompany {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "abbreviation", nullable = false, unique = true)
    private String abbreviation;

    @Column(name = "website_url")
    private String websiteUrl;

    @Column(name = "image_url")
    private String imageUrl;

    @Lob
    @Column(name = "image_data")
    private byte[] imageData;

    @Lob
    @Column(name = "logo_image_data")
    private byte[] logoImageData;

    public FlightCompany() {}

    public FlightCompany(String name, String websiteUrl, String imageUrl, byte[] imageData, byte[] logoImageData, String abbreviation) {
        this.name = name;
        this.websiteUrl = websiteUrl;
        this.imageUrl = imageUrl;
        this.imageData = imageData;
        this.logoImageData = logoImageData;
        this.abbreviation = abbreviation;
    }

    // Getters and setters...

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    public String getWebsiteUrl() {
        return websiteUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }

    public void setLogoImageData(byte[] logoImageData) {
        this.logoImageData = logoImageData;
    }

    @Override
    public String toString() {
        return "FlightCompany{id=" + id + ", name='" + name + "'}";
    }
}
