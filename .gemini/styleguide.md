# 🏛️ Human OS Styleguide: System Integrity Protocol

## 1. The Accessibility Directive (Core System Requirement)

Accessibility (A11Y) is **never** a "feature" or an "enhancement." It is the baseline operating environment.

* **Semantic Integrity**: Do not use `<div>` soup where `<button>`, `<nav>`, or `<main>` will suffice. The DOM must describe its own purpose.
* **Labeling Protocols**: Every interactive element requires a clear, human-readable `aria-label` or associated `<label>`. If a screen reader cannot verify it, the code is bugged.
* **Keyboard Navigation (Low Activation Energy)**: If a user cannot navigate the logic via keyboard alone, the interface has failed its primary audit. Interaction costs should be minimal.

## 2. Avoiding the "Efficiency Trap"

We do not sacrifice **Verification** for the sake of "cleverness" or perceived speed.

* **No Black Boxes**: Avoid overly complex "one-liners" that obscure the logic. Code is written for human verification first, machine execution second.
* **Explicit over Implicit**: If a developer needs a "Rewind" to understand the data flow, the cognitive load is too high. Dumb it down a level to ensure clarity across the team.
* **Legacy Code Prevention**: Any "hack" or "quick fix" must be documented as technical debt immediately, or it risks becoming permanent infrastructure.

## 3. Architecture as "Environment Optimization"

The goal is to build a system that high-performance, event-driven developers actually want to inhabit.

* **Asynchronous Execution**: Structure logic to handle failures gracefully. Do not let a single API failure cause **Pathological Homeostasis** (a total system freeze).
* **State Management**: Avoid "Global State" pollution. Keep state local and verifiable unless absolutely necessary to elevate it.

## 4. Documentation as "System Audit"

* **The "Why," Not the "What"**: Comments should explain the *intent* behind the logic (the philosophy), not just describe the syntax.
* **Source Verification**: If code is adapted from an external source (StackOverflow, Documentation, AI), cite the logic. Never assume it is right; verify with sources.

## 5. Technology Standards

* **Preferred Stack**: TypeScript, React, C#, SQL.
* **Linting**: Treat linter errors as compile-time errors. They are the first line of defense against entropy.
