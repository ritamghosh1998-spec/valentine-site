const noBtn = document.getElementById("noBtn");
const teaseText = document.getElementById("teaseText");

if (noBtn && teaseText) {
  let hasTriedNo = false;
  let minutePassed = false;
  let messageShown = false;

  // Start 1-minute timer immediately on page load
  setTimeout(() => {
    minutePassed = true;
    maybeShowLockedMessage();
  }, 60_000);

  function maybeShowLockedMessage() {
    if (!messageShown && minutePassed && hasTriedNo) {
      teaseText.textContent = "No is not an option 😌 You’re stuck with me for life, Shivani. ❤️";
      messageShown = true;
    }
  }

  function jumpNoButton() {
    hasTriedNo = true;
    maybeShowLockedMessage();

    const padding = 12; // keep it from going off-screen edges
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const rect = noBtn.getBoundingClientRect();
    const bw = rect.width;
    const bh = rect.height;

    const maxX = Math.max(padding, vw - bw - padding);
    const maxY = Math.max(padding, vh - bh - padding);

    const x = Math.random() * (maxX - padding) + padding;
    const y = Math.random() * (maxY - padding) + padding;

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    // make it feel "jumpy"
    noBtn.style.transform = "translate(0,0) scale(1.02)";
    setTimeout(() => (noBtn.style.transform = "translate(0,0) scale(1)"), 80);
  }

  // Jump when the cursor gets near / tries to click
  noBtn.addEventListener("mouseenter", jumpNoButton);
  noBtn.addEventListener("mousemove", jumpNoButton);

  // Mobile tap attempt
  noBtn.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      jumpNoButton();
    },
    { passive: false }
  );

  // Reposition if screen size changes (avoid off-screen)
  window.addEventListener("resize", () => {
    // Keep it within the new bounds
    jumpNoButton();
  });
}
