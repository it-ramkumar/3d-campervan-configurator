import { useEffect } from "react";

function ChatWidget() {
  useEffect(() => {
    window.chatmaximaConfig = {
      token: "miutk867bnhw",
      theme_color: "#5c526b",
      widget_icon:
        "https://chatmaxima.com/uploads/widget/632/2025/9/22/logo.png",
    };

    setTimeout(() => {
      const script = document.createElement("script");
      script.src =
        "https://widget.chatmaxima.com/embed.min.js?v=" + new Date().getTime();
      script.id = "miutk867bnhw";
      script.defer = true;
      script.onload = () => console.log("✅ Widget loaded & executed!");
      script.onerror = (err) => console.error("❌ Widget failed:", err);
      document.body.appendChild(script);
    }, 1000);

    return () => {
      const old = document.getElementById("miutk867bnhw");
      if (old) document.body.removeChild(old);
    };
  }, []);

  return null;
}

export default ChatWidget;
