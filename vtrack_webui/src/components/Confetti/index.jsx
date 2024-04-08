import React, { useEffect } from 'react';
import ConfettiGenerator from 'confetti-js';

const Confetti = () => {
  useEffect(() => {
    const confettiSettings = { target: 'confetti-container' };

    // Ensure that 'cv' is a reference to a valid HTML canvas element
    const cv = document.getElementById('confetti-container');
    if (!cv || !(cv instanceof HTMLCanvasElement)) {
      console.error("Couldn't find a valid canvas element with the ID 'confetti-container'");
      return;
    }

    confettiSettings['canvas'] = cv;

    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    // Clear confetti after 5 seconds
    const confettiTimeout = setTimeout(() => {
      confetti.clear();

      // Hide or remove the canvas element
      cv.style.display = 'none'; // or cv.remove();
    }, 5000);

    // Cleanup confetti and timeout on component unmount
    return () => {
      confetti.clear();
      clearTimeout(confettiTimeout);
    };
  }, []);

  return <canvas id="confetti-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} />;
};

export default Confetti;
