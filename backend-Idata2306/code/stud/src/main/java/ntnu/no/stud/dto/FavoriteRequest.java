package ntnu.no.stud.dto;

public class FavoriteRequest {

    private int userId;

    private int priceId;

    public FavoriteRequest() {
    }

    public FavoriteRequest(int userId, int priceId) {
        this.userId = userId;
        this.priceId = priceId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getPriceId() {
        return priceId;
    }

    public void setPriceId(int priceId) {
        this.priceId = priceId;
    }
}
