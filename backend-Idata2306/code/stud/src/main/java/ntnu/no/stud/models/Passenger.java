package ntnu.no.stud.models;

import ntnu.no.stud.entities.ClassEntity;

public class Passenger {

    private ClassEntity classType;

    private int amount;


    public Passenger() { }

    public Passenger(ClassEntity classType, int amount) {
        this.classType = classType;
        this.amount = amount;
    }

    // Getters and Setters
    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public ClassEntity getClassType() {
        return classType;
    }

    public void setClassType(ClassEntity classType) {
        this.classType = classType;
    }
}