import "./Chatbot.css";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaCommentDots,
  FaTimes,
  FaPaperPlane,
  FaRobot,
  FaMagic,
  FaExchangeAlt,
  FaCalculator
} from "react-icons/fa";

import { getBotReply, quickReplies } from "../../data/chatbotKnowledge";

function Chatbot() {

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hey there! 👋 I'm the GoTravel Assistant. Ask me about packages, bookings, destinations, or anything else — or tap a suggestion below."
    }
  ]);

  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  }, [messages, isOpen]);

  const sendMessage = (text) => {

    const trimmed = text.trim();

    if (!trimmed) return;

    const userMessage = { sender: "user", text: trimmed };

    const botMessage = { sender: "bot", text: getBotReply(trimmed) };

    setMessages((prev) => [...prev, userMessage, botMessage]);

    setInput("");

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    sendMessage(input);

  };

  const goTo = (path) => {

    navigate(path);

    setIsOpen(false);

  };

  return (

    <>

      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
      >

        {isOpen ? <FaTimes /> : <FaCommentDots />}

      </button>

      <AnimatePresence>

        {isOpen && (

          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >

            <div className="chatbot-header">

              <FaRobot />

              <div>

                <h4>GoTravel Assistant</h4>

                <span>Usually replies instantly</span>

              </div>

            </div>

            <div className="chatbot-quick-actions">

              <button onClick={() => goTo("/trip-planner")}>
                <FaMagic />
                AI Planner
              </button>

              <button onClick={() => goTo("/compare")}>
                <FaExchangeAlt />
                Compare
              </button>

              <button onClick={() => goTo("/cost-calculator")}>
                <FaCalculator />
                Cost Calculator
              </button>

            </div>

            <div className="chatbot-messages">

              {messages.map((msg, index) => (

                <div
                  key={index}
                  className={`chat-bubble ${msg.sender}`}
                >
                  {msg.text}
                </div>

              ))}

              <div ref={messagesEndRef} />

            </div>

            {messages.length <= 1 && (

              <div className="quick-replies">

                {quickReplies.map((q, index) => (

                  <button key={index} onClick={() => sendMessage(q)}>
                    {q}
                  </button>

                ))}

              </div>

            )}

            <form className="chatbot-input" onSubmit={handleSubmit}>

              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              <button type="submit">
                <FaPaperPlane />
              </button>

            </form>

          </motion.div>

        )}

      </AnimatePresence>

    </>

  );

}

export default Chatbot;
