# Page Plan: CO₂ Emissions (`co2.md`)

**Target File:** `co2.html`  
**Role:** Grade 9 Web-Development Planning Document  
**Design Inspiration:** *Neal.fun* ("Printing Money" / visual accumulation & scale comparison)

---

## 1. Page Purpose & Core Mechanic
* **Purpose:** Help users visualize the staggering difference between one person's annual carbon footprint and global greenhouse gas emissions.
* **Neal.fun Visual Mechanic:** **"The Carbon Cloud / Tree Counter"**
  * As the user scrolls down through the 6 tiers (or uses a sticky tier-switcher bar), visual units accumulate on screen.
  * **Base Visual Unit:** $1\text{ metric ton of CO}_2$ represented by a dark gray cloud icon (or the number of mature trees needed to absorb it for a year: $\approx 45\text{ trees}$).
  * For smaller tiers (Person/Household), individual icons render cleanly in a grid. For massive tiers (City/Country/World), the mechanic transitions into a high-speed visual stream, stacked mega-blocks, or an interactive scroll-rate counter (just like *Printing Money* speeds up as numbers grow).

---

## 2. The 6-Tier Data Breakdown (Annual Estimates)
*Note: Baseline values represent global/standard annual averages to be finalized during research.*
1. **Average Person:** $\approx 4.7\text{ metric tons CO}_2\text{/year}$ (Visual: ~5 CO₂ blocks)
2. **Average Household:** $\approx 15\text{–}20\text{ metric tons CO}_2\text{/year}$ (Visual: 15–20 blocks)
3. **Average Neighborhood (~1,000 people):** $\approx 4,700\text{ metric tons CO}_2\text{/year}$
4. **Average City (~500,000 people):** $\approx 2.35\text{ million metric tons CO}_2\text{/year}$
5. **Average Country (e.g., mid-to-large nation benchmark):** $\approx 300\text{–}500\text{ million metric tons CO}_2\text{/year}$
6. **Entire World (~8.1 billion people):** $\approx 37+\text{ billion metric tons CO}_2\text{/year}$

---

## 3. Key Page Elements
* **Sticky HUD / Counter Bar:** Remains pinned at the top while scrolling, showing current tier, total metric tons, and real-world equivalent (e.g., *"Equivalent to driving X miles"*).
* **Tier Milestones:** Full-width banner dividers introducing each of the 6 tiers with a short, plain-English takeaway.
* **Takeaway / Action Footer:** 3 simple ways an individual or household can reduce their slice of the visual grid, plus a button to jump to **Water Consumption**.

---

## 4. Acceptance Criteria
* Displays all 6 required tiers in sequential order from Person to World.
* Visual unit scaling is immediately clear without requiring users to read dense paragraphs.
* Numbers include exact units ($\text{metric tons of CO}_2\text{ per year}$) and cited sources.