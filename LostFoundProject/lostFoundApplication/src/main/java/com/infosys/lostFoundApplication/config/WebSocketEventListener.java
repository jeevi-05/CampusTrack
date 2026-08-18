package com.infosys.lostFoundApplication.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

import com.infosys.lostFoundApplication.controller.ChatController;

@Component
public class WebSocketEventListener {

    @Autowired
    private ChatController chatController;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());
        System.out.println("[WS EVENT] SessionConnectEvent sessionId=" + sha.getSessionId() + " headers=" + sha.toNativeHeaderMap());
    }

    @EventListener
    public void handleWebSocketConnectedListener(SessionConnectedEvent event) {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());
        System.out.println("[WS EVENT] SessionConnectedEvent sessionId=" + sha.getSessionId());
    }

    @EventListener
    public void handleWebSocketSubscribeListener(SessionSubscribeEvent event) {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());
        System.out.println("[WS EVENT] SessionSubscribeEvent sessionId=" + sha.getSessionId() + " dest=" + sha.getDestination());
    }

    @EventListener
    public void handleWebSocketDisconnect(SessionDisconnectEvent event) {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = sha.getSessionId();
        System.out.println("[WS EVENT] SessionDisconnectEvent sessionId=" + sessionId + " closeStatus=" + event.getCloseStatus());
        // Inform ChatController to remove the user mapped to this session
        try {
            chatController.removeUser(sessionId);
        } catch (Exception ex) {
            System.err.println("[WS EVENT] Error removing user for session " + sessionId + ": " + ex.getMessage());
        }
    }
}
