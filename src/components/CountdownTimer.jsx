import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const CountdownTimer = ({ marathonStart }) => {
  const startTime = Date.now() / 1000; // current time in seconds
  const endTime = new Date(marathonStart).getTime() / 1000; // marathon start time in seconds
  const duration = endTime - startTime;

  const renderTime = (dimension, time) => (
    <div className="flex flex-col items-center">
      <div className="text-3xl font-bold">{time}</div>
      <div className="text-sm text-gray-500">{dimension}</div>
    </div>
  );

  return (
    <div className="fontJakarta flex justify-center gap-4">
      <CountdownCircleTimer
        isPlaying
        duration={duration}
        initialRemainingTime={duration}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[duration, duration * 0.6, duration * 0.3, 0]}
        size={110}
        trailColor="#eee"
      >
        {({ remainingTime }) => {
          const days = Math.floor(remainingTime / (60 * 60 * 24));
          return renderTime("Days", days);
        }}
      </CountdownCircleTimer>

      <CountdownCircleTimer
        isPlaying
        duration={86400}
        initialRemainingTime={duration % (60 * 60 * 24)}
        colors={["#004777"]}
        size={110}
        trailColor="#eee"
      >
        {({ remainingTime }) => {
          const hours = Math.floor(remainingTime / 3600);
          return renderTime("Hours", hours);
        }}
      </CountdownCircleTimer>

      <CountdownCircleTimer
        isPlaying
        duration={3600}
        initialRemainingTime={duration % 3600}
        colors={["#F7B801"]}
        size={110}
        trailColor="#eee"
      >
        {({ remainingTime }) => {
          const minutes = Math.floor(remainingTime / 60);
          return renderTime("Minutes", minutes);
        }}
      </CountdownCircleTimer>
    </div>
  );
};

export default CountdownTimer;
