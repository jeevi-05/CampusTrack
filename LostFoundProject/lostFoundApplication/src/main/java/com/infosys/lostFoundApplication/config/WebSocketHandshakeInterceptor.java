package com.infosys.lostFoundApplication.config;

import java.util.Map;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

public class WebSocketHandshakeInterceptor implements HandshakeInterceptor {

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                                   WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        System.out.println("[WS HANDSHAKE] Request URI: " + request.getURI());
        System.out.println("[WS HANDSHAKE] Origin: " + request.getHeaders().getOrigin());
        System.out.println("[WS HANDSHAKE] Headers: " + request.getHeaders());
        return true; // allow handshake
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
                               WebSocketHandler wsHandler, Exception exception) {
        System.out.println("[WS HANDSHAKE] afterHandshake; response headers: " + response.getHeaders());
    }
}
