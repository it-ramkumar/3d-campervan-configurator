import { useEffect } from "react";

function ChatWidget() {
  useEffect(() => {
    // ✅ ChatMaxima config
    window.chatmaximaConfig = {
      token: 'miutk867bnhw',
      theme_color:'#5c526b',
      widget_icon:'https://chatmaxima.com/uploads/widget/632/2025/9/22/logo.png'
    };

    // ✅ Script dynamically add karna
    const script = document.createElement("script");
    script.src = "https://widget.chatmaxima.com/embed.min.js?v=" + new Date().getTime();
    script.id = "miutk867bnhw";
    script.defer = true;
    document.body.appendChild(script);

    // ✅ Cleanup on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // ✅ Ye koi UI render nahi karta
}

export default ChatWidget;
