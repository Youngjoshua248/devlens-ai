import { useState } from "react";

type Message = {
  role: "system" | "user" | "ai";
  text: string;
};

const quickPrompts = [
  "Explain this repository architecture",
  "Where is authentication handled?",
  "Show me every Express route",
  "What should I refactor first?",
];

export default function AIChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      text: "DEVLENS_AI online. Repository context loaded.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(prompt?: string) {
    const question = prompt || input;

    if (!question.trim() || loading) return;

    setLoading(true);

    setMessages((prev) => [
      ...prev,
      { role: "user", text: `> ${question}` },
      { role: "ai", text: "Analyzing repository intelligence..." },
    ]);

    setInput("");

    try {
      const response = await fetch("http://localhost:4000/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "ai",
          text: data.answer || "No answer returned from AI engine.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "ai",
          text: "ERROR: Unable to reach DevLens AI backend.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-8 border border-green-500/30 rounded-lg bg-black p-6">
      <p className="text-xs text-green-300 mb-4">DEVLENS_AI_CHAT</p>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => sendMessage(prompt)}
            disabled={loading}
            className="border border-green-500/20 rounded px-3 py-2 text-left text-xs text-green-200/80 hover:border-green-300 hover:text-green-100 transition disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="h-64 overflow-y-auto border border-green-500/20 rounded p-4 space-y-3 text-sm">
        {messages.map((message, index) => (
          <p
            key={index}
            className={
              message.role === "user"
                ? "text-cyan-300"
                : message.role === "ai"
                  ? "text-green-200"
                  : "text-green-500/70"
            }
          >
            {message.text}
          </p>
        ))}

        {loading && <p className="text-green-400 animate-pulse">█</p>}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") sendMessage();
          }}
          placeholder="Ask the repository anything..."
          className="flex-1 bg-black border border-green-500/30 rounded px-4 py-3 text-green-200 outline-none focus:border-green-300"
        />

        <button
          onClick={() => sendMessage()}
          disabled={loading}
          className="border border-green-400 px-5 py-3 rounded hover:bg-green-400 hover:text-black transition disabled:opacity-50"
        >
          SEND
        </button>
      </div>
    </section>
  );
}
