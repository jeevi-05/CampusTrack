package com.infosys.lostFoundApplication.config;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

//import com.infosys.lostFoundApplication.service.LostfoundUserService;

@Configuration
@EnableMethodSecurity
public class SystemConfig {
//	@Autowired
//	private EncoderConfig encoderConfig;
//	
//	@Autowired
//	private LostfoundUserService service;
	
	@Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
	  return configuration.getAuthenticationManager();
    }
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
 
	    http
	      .cors(Customizer.withDefaults())
	      .csrf(csrf -> csrf.disable())
	      .authorizeHttpRequests(auth -> auth
	            .requestMatchers("/lostfound/login/**").permitAll()
	            .requestMatchers("/lostfound/logout").permitAll()
	            .requestMatchers("/lostfound/**").permitAll()
	            .requestMatchers("/lostfound/admin/**").hasAuthority("admin")

	            
	            // Admin-only endpoints
                .requestMatchers("/lostfound/admin/**").hasAuthority("admin")
	            .anyRequest().authenticated()
	      )
	      .logout(logout -> logout
	            .logoutUrl("/lostfound/logout")
	            .invalidateHttpSession(true)
	            .deleteCookies("JSESSIONID")
	            .logoutSuccessHandler((request, response, authentication) -> {
	                response.setStatus(200);
	                response.getWriter().write("Logout success");
	            })
	      );
 
	    return http.build();
	}
 
}
