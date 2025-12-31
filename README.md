# JavaScript-Event-Loop


# A Visual and Interactive Simulator for the JavaScript Event Loop

## Abstract

The JavaScript Event Loop is a key concurrency mechanism that controls the execution of synchronous code, asynchronous callbacks, microtasks, and timers. Despite its significance, it is often misunderstood due to the lack of interactive and execution-level visualizations.

This project presents an **interactive simulator of the JavaScript Event Loop** that can model scheduling behavior across the **Call Stack**, **Microtask Queue**, **Macrotask Queue**, and **Timer Min Heap**. The simulator allows users to step through execution, visualize starvation scenarios, and observe scheduling outcomes based on user-provided JavaScript code.

The goal of this work is **clear teaching through execution modeling**, rather than static illustration.

---

## Keywords

JavaScript Runtime, Event Loop, Microtasks, Macrotasks, Scheduling, Starvation, Time-Travel Debugging, Program Visualization

---

## Motivation

Traditional explanations of the JavaScript Event Loop often rely on static diagrams or pre-recorded animations. These methods do not effectively capture:

* Dynamic queue interactions  
* Priority inversion caused by microtask flooding  
* Temporal relationships between timers and execution phases  
* Realistic scheduling behavior under load  

This simulator addresses these issues by implementing a **discrete-time scheduler** that models execution state and queue transitions at each step.

---

## System Overview

The simulator models the following runtime components:

### 1. Call Stack

Represents the currently executing synchronous context. Only one frame can execute at a time.

### 2. Microtask Queue

Models high-priority tasks (e.g., `Promise.then`) that need to be completely drained before macrotask execution can continue.

### 3. Macrotask Queue

Represents lower-priority asynchronous tasks such as timers and I/O callbacks.

### 4. Timer Min Heap

Implements a simplified min-heap structure ordered by expiration time, simulating the browser timer system.

---

## Key Features

### Discrete Event Scheduling

Execution happens in **deterministic ticks**, during which:

* Expired timers are moved to the macrotask queue  
* Microtasks are fully executed before macrotasks  
* The call stack enforces mutual exclusion  

---

### Time-Travel Debugging

During every scheduler tick, a snapshot of the runtime state is recorded, enabling:

* Forward stepping  
* Backward execution (rewind)  
* Post-event review of starvation and scheduling issues  

This system mimics techniques used in deterministic debugging systems.

---

### Microtask Starvation Detection

The simulator locates and visually highlights starvation conditions where:

* A non-empty macrotask queue is blocked  
* The microtask queue exceeds a defined limit  

This models real-world UI freezes caused by unbounded Promise chains.

---

### User-Provided Code Visualization

Users can input JavaScript source code into an editor. The simulator performs lightweight structural detection to identify:

* Promise-based microtasks  
* Timer-based macrotasks  

These elements are then mapped to runtime queues, facilitating execution-based learning.

---

### Visual Execution Feedback

Without changing the underlying UI layout, the system applies:

* Active queue highlighting  
* Pulsing starvation indicators  
* Transition-based execution feedback  

These visual cues sync with the scheduler state.

---

## Architecture

```
+--------------------+
|   User JS Input    |
+---------+----------+
          |
          v
+--------------------+
|  Scheduler Engine  |
| (Discrete Time)    |
+----+-------+-------+
     |       |
     v       v
 Microtasks  Timers (Min Heap)
     |       |
     +----> Macrotasks
             |
             v
         Call Stack
```

---

## Implementation Details

* Language: Vanilla JavaScript (ES6)  
* Rendering: HTML + CSS  
* State Management: Snapshot-based runtime history  
* Scheduling Policy:

  * Microtasks are fully drained before macrotasks  
  * Timers are ordered by expiration time  
  * Call stack enforces single-task execution  

No external libraries or frameworks are used.

---

## Project Structure

```
event-loop-autopsy/
├── index.html   # UI and user controls  
├── style.css    # Visual feedback and animations  
└── app.js       # Scheduler and execution engine  
```

---

## Usage

1. Open `index.html` in a modern browser.  
2. Enter JavaScript code into the editor.  
3. Parse the code to fill runtime queues.  
4. Step through execution or use time-travel controls.  
5. Observe scheduling behavior and starvation scenarios.  

---

## Example Input

```javascript
console.log("start");

setTimeout(() => {
  console.log("timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("microtask");
});
```

---

## Educational Applications

This simulator is suitable for:

* Undergraduate operating systems and runtime courses  
* JavaScript internals instruction  
* Interview preparation focused on concurrency  
* Demonstrating scheduling issues and starvation  

---

## Limitations

* AST parsing is heuristic and not yet fully syntactic.  
* Node.js-specific event loop phases are not yet modeled.  
* I/O callbacks are simplified.  

These limitations are intentional to maintain conceptual clarity.

---

## Future Work

* Full AST parsing using Acorn or Esprima  
* Node.js phase modeling (poll, check, close)  
* Worker thread simulation  
* Formal starvation metrics  
* Execution speed control  

---

## License

MIT License

---

## Author

**Aniket Bisht**  
B.Tech, Computer Science (Cloud Computing)  
SRM Institute of Science and Technology  

---
