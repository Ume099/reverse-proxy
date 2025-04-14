import { ChatTest } from "./ChatTest";

export default function Home() {
  return (
    <div>
      <main>
        ChatTest↓
        <ChatTest />
        ChatTest↑
        <div className="!bg-white text-red-300">test</div>
      </main>
    </div>
  );
}
