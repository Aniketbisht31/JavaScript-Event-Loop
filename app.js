let time = 0;

let callStack = [];
let microtasks = [];
let macrotasks = [];
let timers = [];

const logEl = document.getElementById("log");

function log(msg) {
  logEl.innerHTML += `• ${msg}<br>`;
  logEl.scrollTop = logEl.scrollHeight;
}

function render() {
  draw("callstack-items", callStack);
  draw("microtask-items", microtasks, "micro");
  draw("macrotask-items", macrotasks);
  draw("timer-items", timers.map(t => t.label), "timer");
}

function draw(id, list, cls="") {
  const el = document.getElementById(id);
  el.innerHTML = "";
  list.forEach(item => {
    const d = document.createElement("div");
    d.className = `task ${cls}`;
    d.textContent = item.label || item;
    el.appendChild(d);
  });
}

function highlight(boxId) {
  const box = document.getElementById(boxId);
  box.classList.add("active");
  setTimeout(() => box.classList.remove("active"), 400);
}

/* ------------------ SCHEDULER CORE ------------------ */

function tick() {
  time++;

  // timers → macrotask
  while (timers.length && timers[0].time <= time) {
    const t = timers.shift();
    macrotasks.push(t);
    log(`Timer expired → ${t.label}`);
  }

  // microtask priority
  if (microtasks.length) {
    const task = microtasks.shift();
    execute(task, "microtasks");
    return;
  }

  // macrotask
  if (macrotasks.length) {
    const task = macrotasks.shift();
    execute(task, "macrotasks");
    return;
  }

  detectStarvation();
}

function execute(task, source) {
  callStack.push(task.label);
  render();
  highlight("callstack");

  const stackTask = document.querySelector("#callstack-items .task");
  if (stackTask) stackTask.classList.add("executing");

  log(`Executing ${task.label}`);

  setTimeout(() => {
    callStack.pop();
    render();
  }, 300);
}

/* ------------------ STARVATION LOGIC ------------------ */

function detectStarvation() {
  if (microtasks.length > 3 && macrotasks.length > 0) {
    document.getElementById("macrotasks").classList.add("starving");
    log("⚠️ Macrotask starvation detected");
  }
}

/* ------------------ DEMOS ------------------ */

function loadDemo() {
  reset();
  log("main() executed");

  microtasks.push({ label: "Promise.then()", createdAt: time });
  timers.push({ label: "setTimeout(1)", time: time + 1 });
  timers.push({ label: "setTimeout(3)", time: time + 3 });

  timers.sort((a,b) => a.time - b.time);
  render();
}

function starvation() {
  reset();
  log("🔥 Infinite microtask loop started");

  function loop() {
    microtasks.push({ label: "Promise.then()", createdAt: time });
  }

  for (let i = 0; i < 5; i++) loop();

  timers.push({ label: "setTimeout(0)", time: time + 1 });
  render();
}

/* ------------------ CONTROLS ------------------ */

function step() {
  tick();
}

function reset() {
  time = 0;
  callStack = [];
  microtasks = [];
  macrotasks = [];
  timers = [];
  logEl.innerHTML = "";
  document.getElementById("macrotasks").classList.remove("starving");
  render();
}
