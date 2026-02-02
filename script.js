(() => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // RSVP form handling
  const form = document.getElementById("rsvpForm");
  const result = document.getElementById("rsvpResult");
  if (form && result) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        // Let the browser show native messages
        form.reportValidity();
        return;
      }
      const fd = new FormData(form);
      const parent = String(fd.get("parentName") || "").trim();
      const child = String(fd.get("childNames") || "").trim();
      const going = String(fd.get("rsvp") || "");

      const msg = going === "yes"
        ? `Thanks${parent ? ", " + parent : ""}! ${child ? child + " " : ""}can’t wait to celebrate!`
        : `Thanks for the reply${parent ? ", " + parent : ""}. We’ll miss you—sending cake vibes!`;

      result.textContent = msg;
      sprinkleConfetti();

      // Optionally reset fields while keeping the message visible
      form.reset();
    });
  }

  // Simple confetti generator (no external libs)
  function sprinkleConfetti() {
    const layer = document.getElementById("confetti-layer");
    if (!layer) return;

    const colors = ["#fb923c", "#84cc16", "#a78bfa", "#14b8a6", "#fb7185", "#38bdf8"];
    const pieces = 80;

    for (let i = 0; i < pieces; i++) {
      const span = document.createElement("span");
      span.className = "confetti-piece";
      const size = 6 + Math.random() * 8; // 6–14
      span.style.width = `${size}px`;
      span.style.height = `${size * 1.2}px`;
      span.style.left = `${Math.random() * 100}%`;
      span.style.top = `-10px`;
      span.style.background = colors[Math.floor(Math.random() * colors.length)];

      // random drift and rotation
      const dx = (Math.random() * 60 - 30).toFixed(2) + "vw";
      const rot = (Math.random() * 720 - 360).toFixed(1) + "deg";
      const dur = (5 + Math.random() * 2).toFixed(2) + "s";
      span.style.setProperty("--dx", dx);
      span.style.setProperty("--rot", rot);
      span.style.animationDuration = dur;

      layer.appendChild(span);

      // cleanup after animation
      span.addEventListener("animationend", () => span.remove());
    }
  }
})();

