import { ChatTest } from "./ChatTest";

export default function Home() {
  return (
    <div>
      <main>
        <p className="mb-8" style={{ marginBottom: "50px" }}>
          ここはofficeのpage.tsx
        </p>
        <p>ChatTest↓</p>
        <ChatTest />
        <p>ChatTest↑</p>
      </main>
    </div>
  );
}
