import { useEffect, useState } from "react";

function ChatWidget() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load after 3 seconds OR on first scroll (whichever comes first)
    let timer;
    let scrollHandler;

    const loadWidget = () => {
      if (isLoaded) return;
      setIsLoaded(true);
    };

    // Timer: 3 seconds
    timer = setTimeout(loadWidget, 3000);

    // Scroll: Load immediately when user scrolls
    scrollHandler = () => {
      loadWidget();
      window.removeEventListener('scroll', scrollHandler);
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    // ChatMaxima configuration
    window.chatmaximaConfig = {
      token: "miutk867bnhw",
      theme_color: "#5c526b",
      widget_icon:
        "https://chatmaxima.com/uploads/widget/632/2025/9/22/logo.png",
    };

    // Avoid duplicate script injection
    if (document.getElementById("chatmaxima-widget")) return;

    const script = document.createElement("script");
    script.src = "https://widget.chatmaxima.com/embed.min.js";
    script.id = "chatmaxima-widget";
    script.defer = true;
    script.async = true;

    // Optional: Remove cache busting for better caching
    // script.src = "https://widget.chatmaxima.com/embed.min.js?v=" + new Date().getTime();

    script.onload = () => {
      console.log("✅ ChatMaxima loaded");
    };

    script.onerror = () => {
      console.error("❌ ChatMaxima failed to load");
      setIsLoaded(false); // Allow retry
    };

    document.body.appendChild(script);

    return () => {
      const oldScript = document.getElementById("chatmaxima-widget");
      if (oldScript) {
        document.body.removeChild(oldScript);
      }
      delete window.chatmaximaConfig;
    };
  }, [isLoaded]);

  return null;
}

export default ChatWidget;