import { useEffect } from "react";

function ChatWidget() {
  useEffect(() => {
    // ✅ Step 1: ChatMaxima configuration (must exist before script loads)
    window.chatmaximaConfig = {
      token: "miutk867bnhw",
      theme_color: "#5c526b",
      widget_icon:
        "https://chatmaxima.com/uploads/widget/632/2025/9/22/logo.png",
    };

    // ✅ Step 2: Small delay to ensure DOM & config are ready
    const timer = setTimeout(() => {
      // Avoid duplicate script injection
      if (document.getElementById("chatmaxima-widget")) return;

      const script = document.createElement("script");
      script.src =
        "https://widget.chatmaxima.com/embed.min.js?v=" + new Date().getTime();
      script.id = "chatmaxima-widget";
      script.defer = true;

      // Debugging logs
      script.onload = () => console.log("✅ ChatMaxima widget loaded successfully!");
      script.onerror = (err) => console.error("❌ ChatMaxima widget failed to load:", err);

      document.body.appendChild(script);
    }, 1500);

    // ✅ Cleanup (for route changes / unmount)
    return () => {
      clearTimeout(timer);
      const oldScript = document.getElementById("chatmaxima-widget");
      if (oldScript) document.body.removeChild(oldScript);
    };
  }, []);

  return null; // No visible UI element
}

export default ChatWidget;
