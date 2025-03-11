package ntnu.no.stud.constants;

public enum ServerConfig {

    BACKEND_HOST("localhost"),
    BACKEND_PORT("8080"),
    BACKEND_DATABASE_PORT("8080");

    private final String value;

    ServerConfig(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
