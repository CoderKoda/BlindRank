# AI Usage & Product Development Documentation: *Consuming Earth*

**Document Purpose:** Product Planning & AI Engineering Retrospective  
**Project Name:** Consuming Earth (Repository: `CoderKoda/BlindRank`)  
**Development Period:** November 19, 2026 – November 23, 2026  
**Primary AI Tooling:** ChatGPT (with direct GitHub repository read/write integration)  

---

## 1. Executive Summary

This document outlines the AI-assisted ("vibecoded") development lifecycle of **Consuming Earth**, an interactive, real-time data visualization web application inspired by Neal Agarwal’s *Printing Money*. Over the course of two primary working sprints across four days, the product owner collaborated directly with ChatGPT—connected via a GitHub connector—to audit legacy code, implement new environmental metrics, design a scalable HTML5 Canvas animation engine, and iteratively refine the user experience (UX).

Rather than writing code manually, the product owner acted as a **Product Manager and QA Tester**, setting visual requirements, identifying UX regressions in a live browser, and approving architectural proposals, while ChatGPT acted as an **Autonomous Full-Stack Engineer**, inspecting files, refactoring logic, and committing directly to the `main` branch.

---

## 2. AI Workflow & Collaboration Model

The development followed a rapid, conversational **Human-in-the-Loop (HITL)** CI/CD loop:

1. **Repository Context & Auditing:** ChatGPT was granted direct access to the GitHub repository (`CoderKoda/BlindRank`), allowing it to bypass outdated documentation (`README.md`) and inspect live source files (`index.html`, `app.js`, `style.css`).
2. **Directive-Based Prototyping:** The user issued high-level functional and visual directives (e.g., *"Now add food waste"*, *"stack the different rows... like Printing Money"*).
3. **Direct Git Commits:** ChatGPT translated requirements into code changes and pushed commits directly to GitHub (`main`), providing commit hashes for version tracking.
4. **Live Browser QA & Visual Feedback:** Because the AI lacked a live headless browser to visually verify animations, the user performed manual visual QA via hard refreshes (`Cmd + Shift + R`), reporting visual anomalies (e.g., blank screens, solid blue stripes, backwards-appearing motion).
5. **Pre-Commit Architectural Sign-Off (Later Stage):** In the final sprint, the workflow matured into a formal planning phase where the user required ChatGPT to audit the codebase, present a written technical proposal, flag unforeseen side effects, and await explicit sign-off before committing changes.

---

## 3. Chronological Feature & Engineering Log

### Phase 1: Codebase Discovery, Bug Fixes & Core Metric Expansion
*Date: November 19, 2026 (10:57 AM – 11:13 AM)*

* **Initial Audit:** ChatGPT identified that while the repo was named `BlindRank`, the actual codebase was an early-stage prototype of *Consuming Earth* featuring Energy, Water, and CO₂ visualizations. It uncovered five critical bugs, including hardcoded initialization (`renderPage('energy')` overriding other pages), broken Google Fonts imports, blurry Retina canvas rendering, and inefficient high-speed rendering.
* **New Metric Additions:** 
  * Added **Waste** (`waste.html`) and **Food Waste** (`food.html`) as standalone visualization pages with custom datasets and color-coded tiles.
* **Navigation & UI Cleanup:**
  * Added a persistent `⌂ Home` button and unified metric navigation tabs across all subpages.
  * Removed broken legacy single-page switcher buttons on `index.html` and cleaned up non-functional buttons in the "About This Project" section.
* **Regression & Recovery:** An early canvas Retina-scaling refactor broke the rendering engine, leaving pages blank (`0ddc6f1`). ChatGPT diagnosed a mismatch between physical and logical CSS canvas dimensions and rewrote the rendering loop cleanly.

### Phase 2: Data Visualization Scaling & "Stacked Lane" Architecture
*Date: November 19, 2026 (11:13 AM – 02:32 PM)*

* **The Speed vs. Scale Dilemma:** At planetary scales, raw unit animations moved either imperceptibly slowly (e.g., 0.6 px/sec for Small Town water) or so rapidly (>2,200 px/sec) that they turned into solid solid-color stripes.
* **Iterative UX Evolution:**
  1. *Attempt 1 (Speed Multipliers):* Applied arbitrary 4×–5× speed boosts, which broke proportional accuracy.
  2. *Attempt 2 (Split Part Rows):* Split fast rows into separate labeled rows (e.g., `United States (Part 1/4)`), which cluttered the UI.
  3. *Attempt 3 (Vertical Stacked Lanes):* Inspired by *Printing Money*, the user directed the AI to stack multiple tile streams vertically under a single entity label.
* **Dynamic Speed-Based Stacking:** Engineered an algorithm where every row automatically calculates its required vertical lane count based on its velocity, preventing visual blurring while keeping hourly rate statistics intact.
* **Syntax Crash Recovery:** A commit (`9a3f7fd`) accidentally injected literal `\n` characters into `app.js`, crashing the renderer. ChatGPT identified and patched the syntax error immediately (`e234191`).

### Phase 3: Proportional Scaling, Custom User Inputs & Repo Reorganization
*Date: November 23, 2026 (07:46 AM – 08:22 AM)*

* **Directory Restructuring:** HTML metric pages were moved into a `webpages/` subdirectory. ChatGPT remapped relative CSS/JS asset paths (`../style.css`, `../app.js`), updated internal navigation links, and created root-level HTML redirects to preserve backward compatibility.
* **Intra-Category Proportional Accuracy:** Previous ad-hoc speed boosts caused smaller entities (e.g., Small Town) to animate faster than larger ones (e.g., Major City). ChatGPT standardized the animation multiplier within each category so that every strip from *Average Person* to *Whole Planet* scales strictly proportionally to its true hourly rate.
* **Standardized Tile Denominations:** At the user's request, irregular grouping numbers (e.g., `1.8k`) were replaced with a clean, standardized progression (`1, 2.5, 5, 10, 25, 50, 100, 250, 500, 1K... 5B`), reducing excessive lane stacking on high-volume Energy rows.
* **Dynamic User Input Engine:**
  * Lowered default custom inputs for Waste (`0.09 kg/hr`) and Food Waste (`0.02 kg/hr`) to match average human benchmarks, preventing high-speed "wagon-wheel" backwards optical illusions.
  * Built auto-scaling and auto-lane-splitting for custom user inputs (e.g., entering `200` dynamically selects appropriate tile units and splits the stream into 2 balanced lanes).
  * Implemented `sessionStorage` persistence so custom inputs remain isolated per metric tab rather than bleeding across different units.

---

## 4. Summary of AI Contributions vs. Human Oversight

| Dimension | AI Role (ChatGPT) | Human Role (Product Owner) |
| :--- | :--- | :--- |
| **Product Vision & UX** | Proposed technical solutions (e.g., `sessionStorage` isolation, speed-based lane thresholds). | Defined visual benchmarks (*Printing Money*), set proportional scaling rules, and approved feature scopes. |
| **Code Architecture** | Wrote all HTML, CSS, and Vanilla JS; managed HTML5 Canvas DPI scaling and frame loops. | Directed repository restructuring (`webpages/` folder) and enforced standardized numerical scales. |
| **Data & Content** | Generated baseline hourly estimates for Waste and Food Waste across 6 population tiers. | Audited relative speeds across categories and flagged misleading default user input values. |
| **Quality Assurance** | Performed static JS syntax checks, simulated DOM tests, and link-target verification. | Conducted live browser visual QA, caught rendering crashes, and identified optical speed illusions. |

---

## 5. Key Takeaways & Lessons Learned for AI-Assisted Development

1. **Visual Verification Remains a Human Bottleneck:** Because the AI could only run code-level syntax and simulated DOM checks, visual regressions (such as literal `\n` syntax breaks, solid color stripes, and optical stroboscopic effects) required human browser testing to catch.
2. **Ad-Hoc Fixes Create Technical Debt:** Early "quick fixes" (like applying isolated 1,000× speed multipliers to specific rows) broke the mathematical integrity of the visualization. Requiring the AI to step back and build a unified, proportional scaling system resolved multiple bugs simultaneously.
3. **Structured Sign-Off Improves Code Quality:** Transitioning from rapid, unreviewed commits to a *"propose first, inspect for side effects, then commit"* workflow in Phase 3 eliminated regressions and allowed the AI to proactively catch unrelated UI bugs (such as a mismatched legend label in Producing Waste).
4. **Known Technical Debt / Future Backlog:**
   * `webpages/plastic.html` exists as an empty placeholder file awaiting dataset integration.
   * Environmental consumption rates are currently hardcoded estimates and should be linked to cited methodologies or live data APIs in a future release.