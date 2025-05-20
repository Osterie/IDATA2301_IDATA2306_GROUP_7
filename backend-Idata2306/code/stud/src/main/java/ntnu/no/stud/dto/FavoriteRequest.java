package ntnu.no.stud.dto;

/**
 * Data that the user will send in the request to add a product to their
 * favorites.
 */
public class FavoriteRequest {

    private int userId;

    private int priceId;

    public FavoriteRequest() {
    }

    /**
     * Constructor for FavoriteRequest.
     *
     * @param userId  the ID of the user
     * @param priceId the ID of the price
     */
    public FavoriteRequest(int userId, int priceId) {
        this.userId = userId;
        this.priceId = priceId;
    }

    /**
     * Gets the ID of the user.
     * 
     * @return the ID of the user
     */
    public int getUserId() {
        return userId;
    }

    /**
     * Sets the ID of the user.
     * 
     * @param userId the ID of the user
     */
    public void setUserId(int userId) {
        this.userId = userId;
    }

    /**
     * Gets the ID of the price.
     * 
     * @return the ID of the price
     */
    public int getPriceId() {
        return priceId;
    }

    /**
     * Sets the ID of the price.
     * 
     * @param priceId the ID of the price
     */
    public void setPriceId(int priceId) {
        this.priceId = priceId;
    }
}
