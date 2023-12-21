import { useState, useEffect } from 'react';

// timeLeft için bir tip tanımı
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Counter = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date('2024-01-01T00:00:00') - +new Date();
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval as keyof TimeLeft] > 1 ? interval : interval.substring(0, interval.length -1)}{' '}
      </span>
    );
  });

  return (
    <div className="counter-container">
      <div className="time-section">
        <div className="time-value">{timeLeft.days}</div>
        <div className="time-label">{timerComponents[0]}</div>
      </div>
      <div className="time-section">
        <div className="time-value">{timeLeft.hours}</div>
        <div className="time-label">{timerComponents[1]}</div>
      </div>
      <div className="time-section">
        <div className="time-value">{timeLeft.minutes}</div>
        <div className="time-label">{timerComponents[2]}</div>
      </div>
      <div className="time-section">
        <div className="time-value">{timeLeft.seconds}</div>
        <div className="time-label">{timerComponents[3]}</div>
      </div>
    </div>
  );
};

export default Counter;