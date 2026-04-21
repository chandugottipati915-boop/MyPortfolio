import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_MESSAGE = {
  role: "assistant",
  content: "Hi! I'm Gopi's portfolio assistant. Ask me anything about his skills, projects, or experience!",
};

const SUGGESTIONS = ["What are his skills?", "Tell me about his projects", "How can I contact him?"];

export default function Chatbot({ open, setOpen }) {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Show greeting bubble after 2s, hide after 8s
  useEffect(() => {
    const show = setTimeout(() => setShowGreeting(true), 2000);
    const hide = setTimeout(() => setShowGreeting(false), 8000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text) {
    const message = text || input.trim();
    if (!message || loading) return;

    const userMsg = { role: "user", content: message };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true)

    try {
      const history = nextMessages.slice(1);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
      });
      const data = await res.json();
      const reply = data.reply || data.error || "Something went wrong.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't connect. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    send();
  }

  const showSuggestions = messages.length === 1;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex w-80 flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-[#0f0f0f] shadow-2xl shadow-black/70 md:w-96"
            style={{ height: 500 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-blue-500">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Portfolio Assistant</div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Powered by RAG + Groq
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl p-1.5 text-zinc-500 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-6 ${
                      msg.role === "user"
                        ? "rounded-br-sm bg-blue-500 text-white"
                        : "rounded-bl-sm border border-zinc-800 bg-zinc-900/80 text-zinc-200"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Suggestion chips */}
              {showSuggestions && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-xl border border-zinc-700/60 bg-zinc-800/60 px-3 py-1.5 text-xs text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Typing indicator */}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm border border-zinc-800 bg-zinc-900/80 px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="block h-1.5 w-1.5 rounded-full bg-blue-400"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-zinc-800 p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-blue-500/50 focus:bg-zinc-900"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-blue-500 text-white transition hover:bg-blue-400 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Greeting bubble */}
      <AnimatePresence>
        {showGreeting && !open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="relative max-w-[220px] rounded-2xl rounded-br-sm bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-xl"
            style={{ border: "1.5px solid #e2e8f0" }}
          >
            <button
              onClick={() => setShowGreeting(false)}
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300"
              style={{ fontSize: 10 }}
            >✕</button>
            👋 Hi! I'm <span className="text-blue-500 font-semibold">GoAI</span> — ask me anything about Gopi!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle button */}
      <div className="relative">
        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-2xl animate-ping bg-blue-400 opacity-30 pointer-events-none" />
        )}
        <motion.button
          onClick={() => { setOpen((prev) => !prev); setShowGreeting(false); }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="flex h-14 w-36 items-center justify-center gap-2 rounded-2xl bg-blue-500 text-white shadow-2xl shadow-blue-500/50 transition hover:bg-blue-400"
          aria-label="Open chat"
        >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-8 w-8" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <span className="text-lg font-black tracking-wide">GoAI</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      </div>
    </div>
  );
}
