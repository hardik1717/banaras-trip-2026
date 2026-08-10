import { useEffect, useState } from "react";

function Countdown() {
  const calculateTime = () => {
    const target = new Date("2026-10-01T00:00:00+05:30").getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),
      minutes: Math.floor(
        (difference / (1000 * 60)) % 60
      ),
      seconds: Math.floor(
        (difference / 1000) % 60
      ),
    };
  };

  const [time, setTime] = useState(calculateTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown">
      <div>
        <strong>{time.days}</strong>
        <span>DAYS</span>
      </div>

      <div>
        <strong>{String(time.hours).padStart(2, "0")}</strong>
        <span>HOURS</span>
      </div>

      <div>
        <strong>{String(time.minutes).padStart(2, "0")}</strong>
        <span>MINUTES</span>
      </div>

      <div>
        <strong>{String(time.seconds).padStart(2, "0")}</strong>
        <span>SECONDS</span>
      </div>
    </div>
  );
}

export default Countdown;