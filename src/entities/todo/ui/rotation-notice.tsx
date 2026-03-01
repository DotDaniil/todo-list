import { useEffect, useState } from "react";
import { isTouchDevice } from "shared";
import { TouchNotice } from "./rotation-notice.styles";

const mobileMessage = "Tap item then hold 🖐🏻 to drag";
const desktopMessages = [
  "Done is better than perfect ✔️",
  "Stay focused 🧘",
  "One task at a time ✨",
  "Tiny progress counts 🌱",
  "Small steps, big results 💪🏻",
  "You got this 🔥",
  "Focus beats multitasking 🎯",
  "Clear mind, clear tasks 🧠",
  "Make today productive ⭐",
  "Hello, world 👋🏻",
];

export const RotatingNotice = () => {
  const [index, setIndex] = useState(0);

  const messages = isTouchDevice
    ? [mobileMessage, ...desktopMessages]
    : desktopMessages;

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 20000);

    return () => clearInterval(id);
  }, [messages.length]);

  return <TouchNotice key={index}>{messages[index]}</TouchNotice>;
};
