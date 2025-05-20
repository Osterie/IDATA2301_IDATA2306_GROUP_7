package ntnu.no.stud.dto;

public class PurchaseRequest {
    private int priceId;
    private int userId;

    public PurchaseRequest() {
    }

    public PurchaseRequest(int priceId, int userId) {
        this.priceId = priceId;
        this.userId = userId;
    }

    public int getPriceId() {
        return priceId;
    }

    public void setPriceId(int priceId) {
        this.priceId = priceId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}