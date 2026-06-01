# Calculator Application

A clean and responsive browser-based calculator built with HTML, CSS, and Vanilla JavaScript. Features a purple-gradient glassmorphism UI, robust arithmetic logic, and a self-contained test suite for edge-case validation.


## Features

- **Four Operations** — Addition, Substraction, Multiplication, and Division

- **Chaining Calculations** — Operators evaluate from left to right across multiple operands

- **Division-by-Zero Guard** — Displays `ERROR` and cleanly resets state

- **Decimal Handling** — Prepends a `0` when `.` is pressed on an empty field while at the same time, ignores duplicate decimals

- **Operator Swapping** — Pressing a new operator before entering a second number replaces the previous one without duplication

- **All Clear [AC]** — Fully resets the internal state

- **Delete [DEL]** — Removes the last character and deletes an operator if no digits follow afterwards

- **Post-Result Chaining** — After pressing `=`, typing a digit starts a brand new expression

## Project Structure

```
Calculator_Application/
├── index.html   // Calculator App Base Markup and Layout
├── styles.css   // Glassmorphism UI and Button Styling
├── script.js    // Core Calculator Logic (IIFE) + DOM Wiring
└── suite.html   // Self-Contained Test Suite for Browser
```

## Known Behaviors
 
- **No Keyboard Input** — The calculator is Click / Tap only. Keyboard support is not implemented

- **Display Overflow** — The `.calc-display` element uses `overflow: auto`, so very long expressions scroll horizontally rather than wrapping

- **Delete on a Result** — Pressing `DEL` immediately after `=` triggers a full clear (Equivalent to `AC`), since `resetNext` is `true` at that point

- **Precision Limit** — All results are passed through `parseFloat(result.toPrecision(10))`, which caps significant digits at 10. This corrects common floating-point noise but will round extremely large or precise values

## Author

**Maurice Gonzalez** | **Created: March 18, 2026** | **Completed: May 26, 2026**