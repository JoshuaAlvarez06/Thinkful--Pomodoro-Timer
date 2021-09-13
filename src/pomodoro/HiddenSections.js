import React from "react";
import PausedSection from "./PausedSection";

export default function HiddenSections({
  session,
  focusDuration,
  breakDuration,
  minutesToDuration,
  secondsToDuration,
  isTimerRunning,
}) {
  //Used to determine "Focusing for __ minutes" or "On Break for __ minutes"
  if (!session) return null;
  let sessionLabel;
  session?.label === "On Break"
    ? (sessionLabel = breakDuration)
    : (sessionLabel = focusDuration);

  //Progress Bar function
  let progressWidthValue = "0";
  const progressBarWidth = () => {
    if (session?.label === "On Break") {
      progressWidthValue =
        ((breakDuration - session?.timeRemaining / 60) / breakDuration) * 100;
    } else {
      progressWidthValue =
        ((focusDuration - session?.timeRemaining / 60) / focusDuration) * 100;
    }
    return `${progressWidthValue}`;
  };

  return (
    <div>
      {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
      <div className="row mb-2">
        <div className="col">
          {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
          <h2 data-testid="session-title">
            {session?.label} for {minutesToDuration(sessionLabel)} minutes
          </h2>
          {/* TODO: Update message below correctly format the time remaining in the current session */}
          <p className="lead" data-testid="session-sub-title">
            {secondsToDuration(session?.timeRemaining)} remaining
          </p>
          <PausedSection isTimerRunning={isTimerRunning} />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={progressBarWidth()} // TODO: Increase aria-valuenow as elapsed time increases
              style={{ width: `${progressBarWidth()}%` }} // TODO: Increase width % as elapsed time increases
            />
          </div>
        </div>
      </div>
    </div>
  );
}
