"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send, X } from "lucide-react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

interface Message {
    id: string;
    user: string;
    text: string;
    timestamp: Date;
    isOwn: boolean;
}
//
// interface User {
//     id: string;
//     name: string;
//     avatar: string;
//     isOnline: boolean;
// }
//
type StateType = React.Dispatch<React.SetStateAction<boolean>>;
export const ChatSidebar = ({
    setIsChatOpen,
}: {
    setIsChatOpen: StateType;
}) => {
    const [messageText, setMessageText] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [username] = useState("You");

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // 🔥 setup socket listeners
    useEffect(() => {
        socket.on("chat_message", (msg) => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    user: msg.user,
                    text: msg.text,
                    timestamp: new Date(),
                    isOwn: msg.user === username,
                },
            ]);
        });

        return () => {
            socket.off("chat_message");
        };
    }, [username]);

    const handleSendMessage = () => {
        if (messageText.trim()) {
            const msgData = {
                user: username,
                text: messageText,
            };
            socket.emit("chat_message", msgData);
            setMessageText("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };

    return (
        <div className="h-full w-80 bg-gray-900 border-r border-gray-700 flex flex-col">
            <div className="flex items-center justify-between z-10 p-4 border-b border-gray-700">
                <button
                    onClick={() => setIsChatOpen(false)}
                    className="p-2 cursor-pointer hover:bg-gray-800 rounded-lg transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.isOwn ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={`max-w-[85%] ${message.isOwn ? "order-2" : "order-1"}`}
                        >
                            {!message.isOwn && (
                                <div className="text-xs text-gray-400 mb-1 font-medium">
                                    {message.user}
                                </div>
                            )}
                            <div
                                className={`rounded-lg px-3 py-2 text-sm ${message.isOwn
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-800 text-gray-300"
                                    }`}
                            >
                                {message.text}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                                {formatTime(message.timestamp)}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-3 border-t border-gray-700">
                <div className="flex space-x-2">
                    <div className="flex-1 relative">
                        <textarea
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            rows={1}
                            style={{
                                minHeight: "36px",
                                maxHeight: "80px",
                            }}
                        />
                    </div>
                    <button
                        onClick={handleSendMessage}
                        disabled={!messageText.trim()}
                        className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <div className="text-xs text-gray-400 mt-2">
                    Press Enter to send, Shift+Enter for new line
                </div>
            </div>
        </div>
    );
};
