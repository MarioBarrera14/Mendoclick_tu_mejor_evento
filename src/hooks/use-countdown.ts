"use client";

import { useState, useEffect, useMemo } from "react";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

interface UseCountdownOptions {
  eventDate: string; // Formato: "YYYY-MM-DD"
  eventTime?: string; // Formato: "HH:mm"
}

export function useCountdown({ eventDate, eventTime = "00:00" }: UseCountdownOptions): CountdownTime {
  const targetDate = useMemo(() => {
    const [hours, minutes] = eventTime.split(":").map(Number);
    const date = new Date(eventDate);
    date.setHours(hours, minutes, 0, 0);
    return date;
  }, [eventDate, eventTime]);

  const calculateTimeLeft = (): CountdownTime => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isExpired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}
