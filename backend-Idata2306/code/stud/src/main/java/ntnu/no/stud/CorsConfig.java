package ntnu.no.stud;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import ntnu.no.stud.constants.ServerConfig;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://" + ServerConfig.FRONTEND_HOST.getValue() + ":" + ServerConfig.FRONTEND_PORT.getValue()) // React frontend URL
                        .allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }
}
