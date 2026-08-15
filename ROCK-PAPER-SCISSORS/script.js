// --- DOM Helpers ---
const $ = id => document.getElementById(id);
const EMOJI = { rock: "✊", paper: "✋", scissors: "✌️" };
const NAMES = { rock: "Rock", paper: "Paper", scissors: "Scissors" };
const MOVES = ["rock", "paper", "scissors"];

// --- State Variables ---
let video, canvas, ctx, confettiCanvas, confettiCtx;
let hands, camera;
let running = false;
let currentGesture = null;
let confidence = 0;
let activeRound = false;
let lockedMove = null;
let lockAt = 0;
let scheduledFinish = false;
let autoPlayTimer = null;

let soundEnabled = true;
let activeTab = "cam"; // "cam" | "manual"
let manualMove = null;

let score = { you: 0, ai: 0, draw: 0 };
let currentStreak = 0;
let maxStreak = 0;
let history = [];
let achievements = new Set();

// --- Audio Synthesizer (Web Audio API) ---
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

function playNote(freq, type = "sine", duration = 0.15, delay = 0, volume = 0.2) {
  if (!soundEnabled) return;
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);

    gain.gain.setValueAtTime(volume, audioCtx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(audioCtx.currentTime + delay);
    osc.stop(audioCtx.currentTime + delay + duration);
  } catch (e) {
    console.warn("Audio synthesis error:", e);
  }
}

const SFX = {
  click: () => playNote(440, "sine", 0.05, 0, 0.1),
  tick: () => playNote(600, "sine", 0.08, 0, 0.15),
  lock: () => {
    playNote(300, "triangle", 0.1, 0, 0.25);
    playNote(450, "sine", 0.15, 0.08, 0.2);
  },
  win: () => {
    playNote(523.25, "triangle", 0.12, 0, 0.25); // C5
    playNote(659.25, "triangle", 0.12, 0.1, 0.25); // E5
    playNote(783.99, "triangle", 0.25, 0.2, 0.3); // G5
  },
  lose: () => {
    playNote(300, "sawtooth", 0.15, 0, 0.2);
    playNote(220, "sawtooth", 0.25, 0.12, 0.2);
  },
  draw: () => {
    playNote(350, "sine", 0.15, 0, 0.2);
    playNote(350, "sine", 0.15, 0.12, 0.2);
  },
  badge: () => {
    playNote(440, "sine", 0.1, 0, 0.2);
    playNote(554.37, "sine", 0.1, 0.08, 0.2);
    playNote(659.25, "sine", 0.1, 0.16, 0.2);
    playNote(880, "sine", 0.3, 0.24, 0.25);
  }
};

// --- Confetti Particle Engine ---
let confettiParticles = [];

function setupConfetti() {
  confettiCanvas = $("confettiCanvas");
  confettiCtx = confettiCanvas.getContext("2d");
  resizeConfetti();
  window.addEventListener("resize", resizeConfetti);
}

function resizeConfetti() {
  if (confettiCanvas) {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
}

function triggerConfetti() {
  const colors = ["#00d4ff", "#7c5cff", "#2bd576", "#ffc857", "#ff4757"];
  confettiParticles = [];
  for (let i = 0; i < 75; i++) {
    confettiParticles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.8) * 16,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rSpeed: (Math.random() - 0.5) * 10,
      opacity: 1
    });
  }
  requestAnimationFrame(renderConfetti);
}

function renderConfetti() {
  if (!confettiCtx || !confettiParticles.length) return;
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  confettiParticles.forEach((p, index) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.4; // gravity
    p.opacity -= 0.015;
    p.rotation += p.rSpeed;

    confettiCtx.save();
    confettiCtx.globalAlpha = Math.max(0, p.opacity);
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate((p.rotation * Math.PI) / 180);
    confettiCtx.fillStyle = p.color;
    confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    confettiCtx.restore();

    if (p.opacity <= 0 || p.y > window.innerHeight) {
      confettiParticles.splice(index, 1);
    }
  });

  if (confettiParticles.length > 0) {
    requestAnimationFrame(renderConfetti);
  }
}

// --- MediaPipe Setup & Classification ---
function setupHands() {
  hands = new Hands({
    locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}`
  });
  hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.65,
    minTrackingConfidence: 0.65
  });
  hands.onResults(onHandResults);
}

function resizeCanvas() {
  if (video && canvas) {
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
  }
}

function onHandResults(results) {
  resizeCanvas();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!results.multiHandLandmarks?.length) {
    currentGesture = null;
    confidence = 0;
    $("badge").textContent = activeRound ? "Show hand ✋" : "Waiting";
    return;
  }

  const lm = results.multiHandLandmarks[0];

  // Draw Neon Glowing Skeleton
  drawConnectors(ctx, lm, HAND_CONNECTIONS, { color: "#00d4ff", lineWidth: 3 });
  drawLandmarks(ctx, lm, { color: "#7c5cff", lineWidth: 1, radius: 5 });

  // Draw HUD Reticle Box
  drawHudBox(lm);

  const classified = classifyGesture(lm);
  currentGesture = classified.move;
  confidence = classified.confidence;

  $("badge").textContent = `${EMOJI[currentGesture]} ${NAMES[currentGesture]}`;
  $("confidence").textContent = `Detection: ${Math.round(confidence * 100)}%`;

  // Auto trigger schedule if in Camera Mode during active round
  if (activeTab === "cam" && activeRound && performance.now() - lockAt > 900 && confidence >= 0.7) {
    scheduleFinish(currentGesture);
  }
}

function drawHudBox(lm) {
  let minX = 1, maxX = 0, minY = 1, maxY = 0;
  lm.forEach(pt => {
    if (pt.x < minX) minX = pt.x;
    if (pt.x > maxX) maxX = pt.x;
    if (pt.y < minY) minY = pt.y;
    if (pt.y > maxY) maxY = pt.y;
  });

  const x = (1 - maxX) * canvas.width; // mirrored
  const y = minY * canvas.height;
  const w = (maxX - minX) * canvas.width;
  const h = (maxY - minY) * canvas.height;

  ctx.strokeStyle = "#00d4ff";
  ctx.lineWidth = 2;
  ctx.strokeRect(x - 10, y - 10, w + 20, h + 20);

  // Corner Accents
  ctx.fillStyle = "#7c5cff";
  ctx.fillRect(x - 12, y - 12, 6, 6);
  ctx.fillRect(x + w + 6, y - 12, 6, 6);
  ctx.fillRect(x - 12, y + h + 6, 6, 6);
  ctx.fillRect(x + w + 6, y + h + 6, 6, 6);
}

function isExtended(lm, tipIdx, pipIdx) {
  return lm[tipIdx].y < lm[pipIdx].y - 0.035;
}

function classifyGesture(lm) {
  let idx = isExtended(lm, 8, 6);
  let mid = isExtended(lm, 12, 10);
  let rng = isExtended(lm, 16, 14);
  let pnk = isExtended(lm, 20, 18);

  let extCount = [idx, mid, rng, pnk].filter(Boolean).length;
  let move;

  if (idx && mid && !rng && !pnk) move = "scissors";
  else if (extCount >= 3) move = "paper";
  else if (extCount <= 1) move = "rock";
  else move = (idx && mid) ? "scissors" : "rock";

  let conf = (move === "paper" && extCount === 4) ? 0.94 :
             (move === "rock" && extCount === 0) ? 0.94 :
             (move === "scissors" && idx && mid && !rng && !pnk) ? 0.95 : 0.78;

  return { move, confidence: conf };
}

// --- AI Brain & Markov Prediction Engine ---
function getPlayerMoveProbabilities() {
  if (!history.length) return { rock: 1/3, paper: 1/3, scissors: 1/3 };

  let weights = { rock: 0, paper: 0, scissors: 0 };
  let recentRounds = history.slice(-15);

  // Recency weighting
  recentRounds.forEach((entry, idx) => {
    const factor = 1 + (idx / Math.max(1, recentRounds.length - 1)) * 1.8;
    weights[entry.player] += factor;
  });

  // Markov Transition probabilities (1-step & 2-step n-grams)
  if (recentRounds.length > 1) {
    const lastMove = recentRounds.at(-1).player;
    let trans = { rock: 0, paper: 0, scissors: 0 };

    for (let i = 0; i < recentRounds.length - 1; i++) {
      if (recentRounds[i].player === lastMove) {
        trans[recentRounds[i + 1].player]++;
      }
    }

    MOVES.forEach(m => {
      weights[m] += trans[m] * 2.5;
    });
  }

  const total = weights.rock + weights.paper + weights.scissors;
  return {
    rock: weights.rock / total,
    paper: weights.paper / total,
    scissors: weights.scissors / total
  };
}

function counterMove(m) {
  return m === "rock" ? "paper" : m === "paper" ? "scissors" : "rock";
}

function predictAIMove() {
  const diff = $("difficultySelect").value;
  const probs = getPlayerMoveProbabilities();

  if (diff === "easy") {
    // 50% random, 50% predicted
    if (Math.random() < 0.5) {
      return { move: MOVES[Math.floor(Math.random() * 3)], probs };
    }
  }

  // Find most likely move player will make
  let predictedPlayerMove = MOVES.reduce((a, b) => probs[b] > probs[a] ? b : a);

  if (diff === "hard" && history.length >= 3) {
    // Psychic Master: Counter-tactical prediction
    // If player just lost, they often switch. If player won, they often stay.
    const last = history.at(-1);
    if (last.result === "lose") {
      // Player lost last round, likely to switch to what would have beaten AI
      predictedPlayerMove = counterMove(last.ai);
    }
  }

  const bestAiMove = counterMove(predictedPlayerMove);
  return { move: bestAiMove, probs };
}

// --- AI Personality Taunts Generator ---
function updateAiTaunt(state, data = {}) {
  const speech = $("aiSpeech");
  const eyeL = $("eyeLeft");
  const eyeR = $("eyeRight");

  let text = "";
  let eyeColor = "#00d4ff";

  switch (state) {
    case "welcome":
      text = "Greetings human! Start a round and let's see if you can outsmart my pattern prediction.";
      break;
    case "locked":
      text = "🔒 I have locked my decision! Show your hand or choose a move.";
      eyeColor = "#7c5cff";
      break;
    case "win_ai":
      if (currentStreak < -2) {
        text = "🤖 I am reading your mind! You cannot hide your sub-conscious patterns.";
      } else {
        text = "Ah! I anticipated your decision perfectly!";
      }
      eyeColor = "#ff4757";
      break;
    case "win_player":
      if (currentStreak >= 3) {
        text = "⚡ Impossible! Your unpredictability is corrupting my prediction model!";
      } else {
        text = "Curious choice! You beat my prediction this time.";
      }
      eyeColor = "#2bd576";
      break;
    case "draw":
      text = "A synchronized mind link! Great minds think alike.";
      eyeColor = "#ffc857";
      break;
  }

  if (speech) speech.textContent = text;
  if (eyeL) eyeL.setAttribute("fill", eyeColor);
  if (eyeR) eyeR.setAttribute("fill", eyeColor);
}

// --- Round Gameplay Workflow ---
function startRound() {
  if (activeRound) return;
  SFX.click();

  if (activeTab === "cam" && !running) {
    startCamera();
  }

  activeRound = true;
  scheduledFinish = false;
  manualMove = null;

  // AI calculates & locks move
  const prediction = predictAIMove();
  lockedMove = prediction.move;
  lockAt = performance.now();

  // Reset UI
  $("ai").textContent = "🔒";
  $("aiStatus").textContent = "Locked";
  $("player").textContent = "—";
  $("resultTitle").textContent = "AI Has Locked Its Move";
  $("resultSub").textContent = activeTab === "cam" ? "Hold your gesture steady!" : "Click a move button below or press 1, 2, or 3!";
  $("instruction").textContent = "Decision locked. Show or select your move.";

  updateAiTaunt("locked");
  SFX.lock();

  // Start Countdown
  let count = 3;
  $("countdown").textContent = count;

  let timer = setInterval(() => {
    count--;
    if (count > 0) {
      $("countdown").textContent = count;
      SFX.tick();
    } else {
      $("countdown").textContent = "SHOW!";
      SFX.tick();
      clearInterval(timer);
      setTimeout(() => {
        if ($("countdown")) $("countdown").textContent = "";
      }, 500);
    }
  }, 600);
}

function selectManualMove(move) {
  if (!activeRound) {
    startRound();
  }
  manualMove = move;

  // Highlight button
  document.querySelectorAll(".manual-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.move === move);
  });

  $("player").textContent = EMOJI[move];
  $("confidence").textContent = "Manual Choice";

  // Finish round after brief delay
  setTimeout(() => {
    if (activeRound) finishRound(move);
  }, 400);
}

function scheduleFinish(move) {
  if (scheduledFinish) return;
  scheduledFinish = true;
  setTimeout(() => {
    scheduledFinish = false;
    if (activeRound && currentGesture === move && confidence >= 0.7) {
      finishRound(move);
    }
  }, 450);
}

function compareMoves(player, ai) {
  if (player === ai) return "draw";
  return (player === "rock" && ai === "scissors") ||
         (player === "paper" && ai === "rock") ||
         (player === "scissors" && ai === "paper") ? "win" : "lose";
}

function finishRound(playerMove) {
  if (!activeRound || !lockedMove) return;
  activeRound = false;

  const aiMove = lockedMove;
  const outcome = compareMoves(playerMove, aiMove);

  // Update Score & Streak
  if (outcome === "win") {
    score.you++;
    currentStreak = currentStreak < 0 ? 1 : currentStreak + 1;
    if (currentStreak > maxStreak) maxStreak = currentStreak;
    SFX.win();
    triggerConfetti();
    updateAiTaunt("win_player");
  } else if (outcome === "lose") {
    score.ai++;
    currentStreak = currentStreak > 0 ? -1 : currentStreak - 1;
    SFX.lose();
    updateAiTaunt("win_ai");
  } else {
    score.draw++;
    currentStreak = 0;
    SFX.draw();
    updateAiTaunt("draw");
  }

  history.push({ player: playerMove, ai: aiMove, result: outcome });

  // Animate battle displays
  $("player").textContent = EMOJI[playerMove];
  $("ai").textContent = EMOJI[aiMove];
  $("player").classList.add("bounce");
  $("ai").classList.add("bounce");
  setTimeout(() => {
    $("player").classList.remove("bounce");
    $("ai").classList.remove("bounce");
  }, 400);

  $("aiStatus").textContent = NAMES[aiMove];
  $("resultTitle").textContent = outcome === "win" ? "YOU WIN! 🎉" : outcome === "lose" ? "AI WINS! 🤖" : "DRAW! 🤝";
  $("resultSub").textContent = `${NAMES[playerMove]} vs ${NAMES[aiMove]}`;
  $("result").className = `result-banner ${outcome}`;
  $("instruction").textContent = "Round complete! Start another round.";

  lockedMove = null;
  updateStats();
  checkAchievements(outcome);

  // Handle Auto-Play
  if ($("autoPlayToggle").checked) {
    clearTimeout(autoPlayTimer);
    autoPlayTimer = setTimeout(() => {
      startRound();
    }, 2500);
  }
}

// --- Achievements Engine ---
function checkAchievements(lastOutcome) {
  const probs = getPlayerMoveProbabilities();
  const maxP = Math.max(probs.rock, probs.paper, probs.scissors);
  const diff = $("difficultySelect").value;

  if (score.you >= 1) unlockBadge("first_win");
  if (currentStreak >= 3) unlockBadge("streak_3");
  if (history.length >= 5 && maxP < 0.4) unlockBadge("unpredictable");
  if (lastOutcome === "win" && diff === "hard") unlockBadge("mind_bender");
  if (history.length >= 15) unlockBadge("veteran");
}

function unlockBadge(id) {
  if (achievements.has(id)) return;
  achievements.add(id);

  const el = document.querySelector(`.badge-item[data-badge="${id}"]`);
  if (el) {
    el.classList.remove("locked");
    el.classList.add("unlocked");
    SFX.badge();
  }
}

// --- Dashboard & UI Updates ---
function updateStats() {
  $("you").textContent = score.you;
  $("ais").textContent = score.ai;
  $("draw").textContent = score.draw;

  const totalRounds = history.length;
  $("count").textContent = `${totalRounds} ${totalRounds === 1 ? "round" : "rounds"} completed`;

  const winPercentage = totalRounds > 0 ? Math.round((score.you / totalRounds) * 100) : 0;
  $("winRate").textContent = `${winPercentage}%`;

  // Streak badge
  $("streakBadge").textContent = currentStreak > 0 ? `🔥 ${currentStreak} Win Streak` :
                                  currentStreak < 0 ? `❄️ ${Math.abs(currentStreak)} AI Streak` : `🔥 0 Streak`;

  // Predictability Meter
  const probs = getPlayerMoveProbabilities();
  const topProb = totalRounds < 2 ? 0 : Math.round(Math.max(probs.rock, probs.paper, probs.scissors) * 100);

  $("pred").textContent = `${topProb}%`;
  $("bar").style.width = `${topProb}%`;

  $("rp").textContent = `${Math.round(probs.rock * 100)}%`;
  $("pp").textContent = `${Math.round(probs.paper * 100)}%`;
  $("sp").textContent = `${Math.round(probs.scissors * 100)}%`;

  $("hint").textContent = totalRounds < 2 ? "Play a few rounds so the AI can analyze your psychological patterns." :
                          topProb >= 60 ? "Warning: Your recent choices show a strong predictable pattern." :
                          topProb >= 45 ? "Notice: Your pattern is moderately predictable." : "Great job! Your move choices are highly unpredictable.";

  // History List Rendering
  const historyContainer = $("history");
  if (!history.length) {
    historyContainer.innerHTML = '<p class="empty-state">No rounds played yet. Click "Start Round" or use shortcut keys!</p>';
    return;
  }

  historyContainer.innerHTML = history.slice().reverse().map((round, idx) => {
    const num = history.length - idx;
    const resClass = round.result;
    const resLabel = round.result === "win" ? "WIN" : round.result === "lose" ? "LOSE" : "DRAW";
    return `
      <div class="history-row">
        <span class="idx">#${num}</span>
        <span class="moves">${EMOJI[round.player]} <small style="color:var(--muted)">vs</small> ${EMOJI[round.ai]}</span>
        <span class="tag-res ${resClass}">${resLabel}</span>
      </div>
    `;
  }).join("");
}

// --- Camera Controller ---
async function startCamera() {
  if (!hands) setupHands();
  try {
    camera = new Camera(video, {
      onFrame: async () => hands.send({ image: video }),
      width: 960,
      height: 600
    });
    await camera.start();
    running = true;

    $("cameraBtn").disabled = true;
    $("cameraBtn").textContent = "Camera Active";
    $("status").textContent = "● Camera on";
    $("status").classList.add("on");
    $("overlay").classList.add("hidden");
    $("instruction").textContent = "Camera ready. Start a round!";
  } catch (err) {
    console.error("Camera access error:", err);
    $("instruction").textContent = "Camera failed. Switch to Manual Play mode!";
  }
}

// --- Game Reset ---
function resetGame() {
  SFX.click();
  score = { you: 0, ai: 0, draw: 0 };
  currentStreak = 0;
  maxStreak = 0;
  history = [];
  activeRound = false;
  lockedMove = null;
  currentGesture = null;
  scheduledFinish = false;
  clearTimeout(autoPlayTimer);

  $("player").textContent = "—";
  $("ai").textContent = "—";
  $("confidence").textContent = "No gesture detected";
  $("aiStatus").textContent = "Not locked";
  $("badge").textContent = "Waiting";
  $("result").className = "result-banner";
  $("resultTitle").textContent = "Ready?";
  $("resultSub").textContent = "Start a round to challenge the AI prediction engine.";

  updateAiTaunt("welcome");
  updateStats();
}

// --- Event Listeners & Initialization ---
function init() {
  video = $("video");
  canvas = $("canvas");
  ctx = canvas.getContext("2d");

  setupConfetti();

  // Button clicks
  $("cameraBtn").onclick = startCamera;
  $("roundBtn").onclick = startRound;
  $("resetBtn").onclick = resetGame;

  // Sound toggle
  $("soundBtn").onclick = () => {
    soundEnabled = !soundEnabled;
    $("soundIcon").textContent = soundEnabled ? "🔊" : "🔇";
    SFX.click();
  };

  // Tab Switching
  $("tabCam").onclick = () => {
    activeTab = "cam";
    $("tabCam").classList.add("active");
    $("tabManual").classList.remove("active");
  };

  $("tabManual").onclick = () => {
    activeTab = "manual";
    $("tabManual").classList.add("active");
    $("tabCam").classList.remove("active");
  };

  // Manual gesture buttons
  document.querySelectorAll(".manual-btn").forEach(btn => {
    btn.onclick = () => {
      const move = btn.dataset.move;
      selectManualMove(move);
    };
  });

  // Keyboard Shortcuts
  window.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;

    const key = e.key.toLowerCase();
    if (key === " " || key === "enter") {
      e.preventDefault();
      startRound();
    } else if (key === "1" || key === "r") {
      selectManualMove("rock");
    } else if (key === "2" || key === "p") {
      selectManualMove("paper");
    } else if (key === "3" || key === "s") {
      selectManualMove("scissors");
    } else if (key === "m") {
      soundEnabled = !soundEnabled;
      $("soundIcon").textContent = soundEnabled ? "🔊" : "🔇";
    } else if (key === "c") {
      startCamera();
    }
  });

  window.onresize = resizeCanvas;
  updateStats();
}

window.onload = init;