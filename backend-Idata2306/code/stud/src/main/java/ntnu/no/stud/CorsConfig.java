package ntnu.no.stud;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000", "http://127.0.0.1:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*");
                // .allowedOrigins("http://" + ServerConfig.FRONTEND_HOST.getValue() + ":" +
                // ServerConfig.FRONTEND_PORT.getValue()) // React frontend URL
                // .allowedOrigins("*") // Allow all origins for testing purposes // TODO REMOVE
                // .allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }
}
