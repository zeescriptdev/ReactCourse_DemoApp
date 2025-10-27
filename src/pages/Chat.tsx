import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
    createNewChat,
  loadChats,
  loadMessages,
  sendMessage,
  setCurrentChat,
} from "../store/slices/chatSlice";
import { logout } from "../lib/api";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../firebase";
import { logoutUser } from "../store/slices/authSlice";

export default function Chat() {
  const dispatch = useAppDispatch();
  const { chats, messages, currentChatId, isSending, error } = useAppSelector(
    (state) => state.chats
  );
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(loadChats()).then((action) => {
      const firstChat = action.payload[0]?.id;
      if(firstChat) {
        dispatch(setCurrentChat(firstChat));
        dispatch(loadMessages(firstChat));
      }
    });
  }, [dispatch]);

  const loadChat = (chatId: string) => {
    dispatch(setCurrentChat(chatId));
    dispatch(loadMessages(chatId));
  };

  const handleSend = () => {
      console.log(input,currentChatId)
    if (!input.trim() || !currentChatId) return
    
    const userInput = input
    setInput('')
    
    dispatch(sendMessage({ chatId: currentChatId, content: userInput }))
  }

  const handleLogout =async () => {
    try {
        await logout();
        await firebaseSignOut(auth);
        dispatch(logoutUser());
    } catch (error) {
        console.error('Error logging out:', error)
    }
  };

  const handleCreateChat = () => {
    dispatch(createNewChat(undefined));
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-3 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900 dark:text-white">Chats</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCreateChat}
              className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors"
            >
              New
            </button>
          </div>
        </div>
        <div className="overflow-y-auto flex-1">
          {chats.map((c) => (
            <button
              key={c.id}
              onClick={() => loadChat(c.id)}
              className={`w-full text-left px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors ${
                currentChatId === c.id ? "bg-blue-100 dark:bg-gray-700" : ""
              }`}
            >
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {c.title || "Untitled"}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(c.created_at).toLocaleString()}
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={handleLogout}
          className="mt-3 text-sm text-red-600 dark:text-red-400 hover:underline"
        >
          Logout
        </button>
        <a
          href="/profile"
          className="mt-2 text-sm text-gray-700 dark:text-gray-300 hover:underline"
        >
          Profile
        </a>
      </aside>

      {/* Main chat */}
      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-sm flex flex-col h-[80vh]">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : ""}`}
              >
                <div
                  className={`max-w-[75%] px-3 py-2 rounded ${
                    m.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.content}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t dark:border-gray-700 p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 border dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              disabled={isSending}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
            >
              {isSending ? "Sending..." : "Send"}
            </button>
          </div>
          {error && (
            <div className="p-2 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
