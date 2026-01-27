import { useEffect, useState } from "react";

function ChatWidget() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShouldLoad(true), 3000);

    const handleScroll = () => {
      setShouldLoad(true);
      window.removeEventListener('scroll', handleScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
useEffect(() => {
  if (!shouldLoad) return;

  window.chatmaximaConfig = {
    token: "miutk867bnhw",
    theme_color: "#5c526b",
    widget_icon: "https://chatmaxima.com/uploads/widget/632/2025/9/22/logo.png",
  };

  const script = document.createElement("script");
  script.src = "https://widget.chatmaxima.com/embed.min.js";
  script.onload = () => {
    console.log("Script loaded");

    setTimeout(() => {
      if (window.embedChatbot) {
        console.log("Initializing ChatMaxima...");
        window.embedChatbot();

        // Auto-open after 2 seconds
        setTimeout(() => {
          // Multiple methods to try opening
          const openMethods = [
            () => window.ChatMaxima?.open(),
            () => window.openChatWidget?.(),
            () => window.showChatWidget?.(),
            () => {
              // Find and click the chat button
              const selectors = [
                '[class*="chatmaxima"]',
                '[id*="chatmaxima"]',
                '[class*="chat-widget"]',
                '[class*="widget-button"]',
                'iframe[src*="chatmaxima"]',
                '[data-chatmaxima]'
              ];

              for (let selector of selectors) {
                const element = document.querySelector(selector);
                if (element) {
                  console.log('Found chat element:', element);
                  element.click();
                  return true;
                }
              }
              return false;
            }
          ];

          // Try each method
          for (let method of openMethods) {
            try {
              if (method()) break;
            } catch (e) {
              console.log('Method failed:', e);
            }
          }
        }, 2000);
      }
    }, 500);
  };

  document.body.appendChild(script);
}, [shouldLoad]);

  return null;
}

export default ChatWidget;