import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show for 1.5s, then fade out
    const timer = setTimeout(() => {
      setFadeOut(true);
      // Remove from DOM after fade out
      setTimeout(() => setVisible(false), 700);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg z-[999] transition-opacity duration-700 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* KALKU logo with iOS pulse animation */}
      <div className="flex flex-col items-center gap-2 select-none">
        <span className="text-4xl sm:text-5xl font-extrabold tracking-wide text-blue-600 dark:text-primary animate-ios-pulse drop-shadow-lg">
          KALKU
        </span>
        <div className="mt-6">
          <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin-ios"></div>
        </div>
      </div>
      {/* Prevent scroll/interactions */}
      <style>{`
        body { overflow: hidden !important; }
      `}</style>
    </div>
  );
}

// Tailwind custom animation (add to index.css):
// .animate-ios-pulse { animation: iosPulse 1.2s infinite cubic-bezier(.4,0,.6,1); }
// @keyframes iosPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; transform: scale(1.08); } }
// .animate-spin-ios { animation: spinIos 1.1s linear infinite; }
// @keyframes spinIos { 100% { transform: rotate(360deg); } }
