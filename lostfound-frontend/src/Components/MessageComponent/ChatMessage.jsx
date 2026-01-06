import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { getUserDetails } from "../../Services/LoginService";
import "../MessageComponent/ChatMeesage.css";
import { useNavigate } from "react-router-dom";

let stompClient = null;

const ChatMessage = () => {
  const navigate = useNavigate();

  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* -------------------- Save messages to localStorage -------------------- */
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  /* -------------------- Fetch user & auto-connect -------------------- */
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails();
        const user =
          response.data?.username ||
          response.data?.name ||
          response.data;

        if (user) {
          setUsername(user);
          connect(user); // ✅ FIXED
        } else {
          console.error("Username not found in API response");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();

    return () => {
      if (stompClient) {
        console.log("🔌 Disconnecting WebSocket...");
        stompClient.deactivate();
        stompClient = null;
      }
    };
  }, []);

  /* -------------------- WebSocket Connect -------------------- */
  const connect = (autoName) => {
    if (!autoName?.trim()) return;

    if (stompClient && stompClient.active) {
      console.log("Already connected");
      return;
    }

    const socket = new SockJS("http://localhost:8080/lostfound/ws");

    stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,

      onConnect: () => {
        console.log("✅ WebSocket Connected");
        setConnected(true);

        // Register user
        stompClient.publish({
          destination: "/app/register",
          body: JSON.stringify({ sender: autoName }),
        });

        // Messages
        stompClient.subscribe("/topic/messages", (payload) => {
          const msg = JSON.parse(payload.body);
          setMessages((prev) => [...prev, msg]);
        });

        // Online users
        stompClient.subscribe("/topic/users", (payload) => {
          setUsers(JSON.parse(payload.body));
        });
      },

      onStompError: (frame) => {
        console.error("Broker error:", frame.headers["message"]);
      },
    });

    stompClient.activate();
  };

  /* -------------------- Send Message -------------------- */
  const sendMessage = () => {
    if (!stompClient || !stompClient.connected) return;
    if (!input.trim()) return;

    const msg = { sender: username, content: input };

    stompClient.publish({
      destination: "/app/sendMessage",
      body: JSON.stringify(msg),
    });

    setInput("");
  };

  /* -------------------- Navigation -------------------- */
  const returnBack = () => {
    navigate("/StudentMenu");
  };

  /* -------------------- Loading -------------------- */
  if (loading) {
    return (
      <div className="loading-screen">
        <h3>Loading user details...</h3>
      </div>
    );
  }

  /* -------------------- UI -------------------- */
  return (
    <div className="chat-container">
      {!connected ? (
        <div className="login-screen">
          <div className="login-card">
            <h2>Connecting to Chat...</h2>
          </div>
        </div>
      ) : (
        <div className="chat-room">
          {/* Sidebar */}
          <div className="sidebar">
            <h3>👥 Online Users</h3>
            <ul>
              {users.length === 0 && <li>No users online</li>}
              {users.map((user, i) => (
                <li key={i} className="user-item">
                  🟢 {user}
                </li>
              ))}
            </ul>
          </div>

          {/* Chat Content */}
          <div className="chat-content">
            <div className="chat-header">
              <h3>💬 General Chat</h3>
              <span className="username">{username}</span>
              <button
                className="btn btn-warning"
                style={{ marginLeft: "10px" }}
                onClick={returnBack}
              >
                Return
              </button>
            </div>

            <div className="messages" id="messageBox">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message ${
                    msg.sender === username ? "self" : "other"
                  }`}
                >
                  <b>{msg.sender}:</b> {msg.content}
                </div>
              ))}
            </div>

            <div className="input-area">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
