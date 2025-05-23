
import { useState } from "react";
import axios from "axios";
import { Send } from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message = userInput) => {
    if (!message.trim()) return;

    const newMessages = [...messages, { sender: "You", text: message }];
    setMessages(newMessages);
    setUserInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:4000/api/chatbot", {
        message,
      });

      setMessages([...newMessages, { sender: "Chatbot", text: response.data.reply }]);
    } catch (error) {
      setMessages([...newMessages, { sender: "Chatbot", text: "Error connecting to chatbot." }]);
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    "What payment methods do you accept?",
    "product condition",
    "What is your return policy?",
    "delivery time?",
    "Do you offer discounts?",
    "How to contact customer support?",
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-500 text-white text-center py-4 font-bold text-xl">
        IntelliMall Chatbot
      </div>

      {/* FAQ Section */}
      <div className="bg-white shadow-md p-4">
        <div className="font-semibold mb-2">Frequently Asked Questions</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {faqs.map((question, index) => (
            <button
              key={index}
              onClick={() => sendMessage(question)}
              className="text-left bg-gray-200 hover:bg-gray-300 text-sm p-2 rounded"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
            <div
              className={`p-3 rounded-lg max-w-xs ${
                msg.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
              }`}
            >
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          </div>
        ))}
        {loading && <p className="text-center text-gray-500">Typing...</p>}
      </div>

      {/* Input Box */}
      <div className="flex items-center bg-white border-t p-3">
        <input
          type="text"
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
          placeholder="Ask me anything..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3"
          onClick={() => sendMessage()}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;

