# Node Runtime Deep Dive

This repository is dedicated to documenting my learnings and explorations into the NodeJS runtime. The goal is to build a solid, low-level understanding of how Node operates under the hood.

## Core Focus Areas

Our study focuses on the following key concepts:

### The Event Loop & Phases
Understanding the architecture of the event loop and its distinct phases:
- **Timers:** Execution of callbacks scheduled by `setTimeout()` and `setInterval()`.
- **I/O Callbacks:** Execution of almost all callbacks, with the exception of close callbacks, those scheduled by timers, and `setImmediate()`.
- **Poll:** Retrieval of new I/O events; execution of I/O related callbacks.
- **Check:** Execution of callbacks scheduled by `setImmediate()`.

### Asynchronous Patterns
- How `async`/`await` actually maps onto the event loop.
- The critical differences and execution order between:
  - `setTimeout`
  - `setImmediate`
  - `process.nextTick`

### Real-World Application
- **Why this matters:** Applying this knowledge to understand how it impacts an HTTP server processing a high volume of concurrent webhook requests. Understanding the event loop is crucial for preventing bottlenecks and ensuring efficient, non-blocking asynchronous execution.
