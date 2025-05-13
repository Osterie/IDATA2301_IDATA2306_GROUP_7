package ntnu.no.stud.constants;

public enum ServerConfig {

    BACKEND_HOST("localhost"),
    BACKEND_PORT("8008"),
    BACKEND_DATABASE_PORT("3306"),

    FRONTEND_HOST("localhost"),
    FRONTEND_PORT("3000");

    private final String value;

    ServerConfig(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
