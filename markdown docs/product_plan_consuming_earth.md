# Product Plan: Consuming Earth

**Project Name:** Consuming Earth  
**Target Level:** Grade 9 Static Website  
**Design Inspiration:** *Neal.fun* ("Printing Money" / visual scale-comparison mechanics)  

---

## 1. Target Users
* **Primary Audience (General Public):** Everyday individuals, families, and casual web visitors who want to understand abstract environmental statistics through intuitive, visual comparisons rather than dense data tables.
* **Secondary Audience (Educators & Peers):** Grade 9 teachers and classmates evaluating the project for clarity, accuracy, design execution, and educational value.

---

## 2. Project Goals & Mission
* **Core Mission:** Numbers become meaningful when you can actually see their size. Our goal is to translate abstract environmental data into tangible, visual experiences.
* **Translate Abstract Numbers into Visual Scale:** Help users grasp the massive jump in human consumption and environmental impact from a single individual up to the entire global population using *Neal.fun*-style visual accumulation and scrolling comparisons.
* **Educate Across Five Core Metrics:** Provide clear, accessible data on CO₂ emissions, water consumption, energy usage, plastic waste, and food waste.
* **Establish Project Credibility & Methodology:** Clearly explain the population scaling assumptions (from 1 person up to $\approx 8.1\text{ billion}$ globally) and cite reputable environmental organizations (*Our World in Data, UNEP, OECD, FAO, EPA, IEA*) directly on the homepage and topic pages.

---

## 3. Minimum Viable Product (MVP) Scope
The MVP consists of **6 static web pages** connected via a persistent top navigation bar:

1. **Homepage (`index.html`)**
   * **Hero & Mission:** Engaging introduction explaining what *Consuming Earth* is, our mission, and why visualizing human consumption matters.
   * **Methodology & Data Sources Note:** Brief overview of the 6-tier population scaling (1 person $\rightarrow$ $\approx 2.5\text{–}4$ per household $\rightarrow$ $\approx 1,000$ per neighborhood $\rightarrow$ $\approx 500,000$ per city $\rightarrow$ benchmark country $\rightarrow$ $\approx 8.1\text{ billion}$ globally) and our verified data sources.
   * **Topic Launch Cards:** Quick-launch cards directing users to the five core comparison pages.
2. **CO₂ Emissions (`co2.html`)**
   * Interactive/visual scale comparison progressing across 6 tiers: **Average Person $\rightarrow$ Household $\rightarrow$ Neighborhood $\rightarrow$ City $\rightarrow$ Country $\rightarrow$ Entire World**.
   * Uses repeatable visual units (e.g., standard-sized CO₂ bubbles, trees needed to offset, or equivalent car miles) inspired by *Neal.fun* to show scale as the user scrolls or toggles tiers.
3. **Water Consumption (`water.html`)**
   * Visual scale comparison across the same 6 tiers (**Person $\rightarrow$ Household $\rightarrow$ Neighborhood $\rightarrow$ City $\rightarrow$ Country $\rightarrow$ World**).
   * Uses relatable visual units (e.g., standard water bottles, bathtubs, or Olympic swimming pools) to represent daily or annual usage.
4. **Energy Consumption (`energy.html`)**
   * Visual scale comparison across the 6 tiers (**Person $\rightarrow$ Household $\rightarrow$ Neighborhood $\rightarrow$ City $\rightarrow$ Country $\rightarrow$ World**).
   * Uses relatable visual units (e.g., lightbulbs, batteries, or lightning bolts representing $\text{kWh}$).
5. **Plastic Waste Production (`plastic-waste.html`)**
   * Visual scale comparison across the 6 tiers (**Person $\rightarrow$ Household $\rightarrow$ Neighborhood $\rightarrow$ City $\rightarrow$ Country $\rightarrow$ World**).
   * Uses relatable visual units (e.g., plastic water bottles, shopping bags, or garbage trucks representing kilograms/tons of plastic waste).
6. **Food Waste Production (`food-waste.html`)**
   * Visual scale comparison across the 6 tiers (**Person $\rightarrow$ Household $\rightarrow$ Neighborhood $\rightarrow$ City $\rightarrow$ Country $\rightarrow$ World**).
   * Uses relatable visual units (e.g., food baskets, meals, or garbage trucks representing kilograms/tons of wasted food).

---

## 4. Exclusions (Out of Scope)
To ensure the project remains achievable as a Grade 9 static website, the following features are explicitly **excluded** from the MVP:
* **Dedicated About Us Page:** Team and methodology notes are integrated directly into the Homepage (`index.html`) rather than a separate page.
* **Backend Databases & User Accounts:** No user logins, saved profiles, or server-side data storage.
* **Real-Time Live API Feeds:** Data will rely on verified, static annual/daily averages (e.g., from EPA, UNEP, OECD, FAO, or Our World in Data) rather than live-updating global counters.
* **Personalized Carbon/Impact Calculators:** Users will view pre-calculated averages across the 6 defined tiers rather than filling out multi-step personal lifestyle surveys.
* **Mobile App Packaging:** Built strictly as a responsive static website for web browsers (not native iOS/Android apps).

---

## 5. Acceptance Criteria
The project will be considered complete and ready for submission when it meets all of the following conditions:
* **Navigation & Completeness:** All 6 pages (Home, CO₂, Water, Energy, Plastic Waste, Food Waste) exist, load without broken links, and feature a consistent navigation menu.
* **Consistent 6-Tier Progression:** Every one of the five topic pages accurately displays data for all 6 required scales: *Person, Household, Neighborhood, City, Country,* and *World*, matching the population assumptions defined on the Homepage.
* **Visual Scale Mechanic (*Neal.fun* Style):** Each topic page visually represents quantities through repeated icons, proportional blocks, or scroll-driven counters—avoiding plain text-only bullet lists for the comparisons.
* **Data Clarity & Citations:** Every statistic includes clear units (e.g., metric tons, liters, $\text{kWh}$, kilograms), states the timeframe (e.g., per day or per year), and cites a credible source (*Our World in Data, UNEP, OECD, FAO, EPA, IEA*).
* **Homepage & Methodology Clarity:** The homepage clearly articulates *Consuming Earth*'s description, purpose, 6-tier scaling assumptions, and data sources.
* **Responsive Layout:** All pages render cleanly on both standard desktop screens and smaller laptop/tablet viewports without horizontal overflow or overlapping text.