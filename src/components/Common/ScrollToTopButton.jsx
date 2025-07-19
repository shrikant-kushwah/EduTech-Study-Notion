import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Check scroll position to toggle button visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      setIsVisible(scrollPosition > 200);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll the window to top smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-2.5 right-5 z-50 p-3 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black shadow-lg transition duration-300"
    >
      <FaArrowUp size={20} />
    </button>
  );
};

export default ScrollToTopButton;
