package ntnu.no.stud.models;

public class SetProductVisibilityModel {

    private int priceId;

    private boolean doHide;


    public SetProductVisibilityModel() {
    }

    public SetProductVisibilityModel(int priceId, boolean doHide) {
        this.priceId = priceId;
        this.doHide = doHide;
    }

    public int getPriceId() {
        return priceId;
    }

    public void setPriceId(int priceId) {
        this.priceId = priceId;
    }

    public boolean doHide() {
        return doHide;
    }

    public void setDoHide(boolean doHide) {
        this.doHide = doHide;
    }
}
