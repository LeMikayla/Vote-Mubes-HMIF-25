import { useState, useEffect } from "react";

export const useCountdown = (targetDate) => {
  const calculateTimeLeft = () => {
    if (!targetDate) return null;

    const difference = new Date(targetDate) - new Date();

    // If time is up, return null
    if (difference <= 0) {
      return null;
    }

    // If time is remaining, return the time object
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!targetDate) {
      setTimeLeft(null);
      return;
    }

    // Calculate immediately when targetDate changes
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};
