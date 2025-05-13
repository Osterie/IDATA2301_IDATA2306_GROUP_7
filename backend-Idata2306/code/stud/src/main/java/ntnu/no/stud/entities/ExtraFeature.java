package ntnu.no.stud.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// package ntnu.no.stud.entities;

// import jakarta.persistence.Entity;
// import jakarta.persistence.Table;
// import jakarta.persistence.Id;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Column;

// @Entity
// @Table(name = "extra_feature")
// public class ExtraFeature {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private int id;

//     @Column(name = "name", nullable = false, unique = true)
//     private String name;

//     // Getters and setters
// }


@Entity
@Table(name = "extra_feature")
public class ExtraFeature {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    public ExtraFeature() { }

    public ExtraFeature(String name) {
        this.name = name;
    }

    // Getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
