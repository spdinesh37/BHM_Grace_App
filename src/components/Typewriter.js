import { useEffect, useState } from "react";
import { useReveal } from "./useReveal";

function Typewriter({ text, speed = 80, className = "", style = {} }) {
  const [ref, visible] = useReveal(0.2);
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    setDisplayed("");
    setDone(false);
    const timer = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [visible, text, speed]);

  return (
    <span ref={ref} className={className} style={style}>
      {displayed}
      <span className={`typewriter-cursor ${done ? "typewriter-cursor--blink" : ""}`}>|</span>
    </span>
  );
}

export default Typewriter;
