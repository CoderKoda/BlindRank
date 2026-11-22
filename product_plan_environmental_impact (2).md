# Product Plan: Environmental Impact

**Project Name:** Environmental Impact  
**Target Level:** Grade 9 Static Website  
**Design Inspiration:** *Neal.fun* ("Printing Money" / visual scale-comparison mechanics)  

---

## 1. Target Users
* **Primary Audience (General Public):** Everyday individuals, families, and casual web visitors who want to understand abstract environmental statistics through intuitive, visual comparisons rather than dense data tables.
* **Secondary Audience (Educators & Peers):** Grade 9 teachers and classmates evaluating the project for clarity, accuracy, design execution, and educational value.

---

## 2. Project Goals & Mission
* **Core Mission:** Numbers become meaningful when you can actually see their size. Our goal is to translate abstract environmental data into tangible, visual experiences.
* **Translate Abstract Numbers into Visual Scale:** Help users grasp the massive jump in environmental impact from a single individual up to the entire global population using *Neal.fun*-style visual accumulation and scrolling comparisons.
* **Educate Across Four Core Metrics:** Provide clear, accessible data on CO₂ emissions, water consumption, energy usage, and plastic waste.
* **Establish Project Credibility & Context:** Clearly introduce the purpose of the platform on the homepage and showcase the Grade 9 student creators, methodology, and verified sources on the About Us page.

---

## 3. Minimum Viable Product (MVP) Scope
The MVP consists of **6 static web pages** connected via a persistent top navigation bar:

1. **Homepage (`index.html`)**
   * Clear, engaging hero section explaining what *Environmental Impact* is and why visualizing human consumption matters.
   * Quick-launch cards/links directing users to the four core comparison topics.
2. **About Us (`about.html`)**
   * **Hero & Mission:** Friendly introduction (*"Why We Built Environmental Impact"*) and mission statement.
   * **Meet the Grade 9 Team:** 3- or 4-column profile grid showcasing each student member's name, avatar/icon, role (e.g., *Lead Researcher, UI/UX Designer, Front-End Coder, Content Writer*), and a personal sustainability habit.
   * **Methodology & Population Assumptions:** Explains how the 6 tiers scale from a single individual up to the entire planet (e.g., 1 person, $\approx 2.5\text{–}4$ people per household, $\approx 1,000$ per neighborhood, $\approx 500,000$ per city, benchmark country, and $\approx 8.1\text{ billion}$ globally).
   * **Data Sources:** Dedicated section citing reputable organizations (*Our World in Data, UNEP, OECD, EPA, IEA*).
3. **CO₂ Emissions (`co2.html`)**
   * Interactive/visual scale comparison progressing across 6 tiers: **Average Person $\rightarrow$ Household $\rightarrow$ Neighborhood $\rightarrow$ City $\rightarrow$ Country $\rightarrow$ Entire World**.
   * Uses repeatable visual units (e.g., standard-sized CO₂ bubbles, trees needed to offset, or equivalent car miles) inspired by *Neal.fun* to show scale as the user scrolls or toggles tiers.
4. **Water Consumption (`water.html`)**
   * Visual scale comparison across the same 6 tiers (**Person $\rightarrow$ Household $\rightarrow$ Neighborhood $\rightarrow$ City $\rightarrow$ Country $\rightarrow$ World**).
   * Uses relatable visual units (e.g., standard water bottles, bathtubs, or Olympic swimming pools) to represent daily or annual usage.
5. **Energy Consumption (`energy.html`)**
   * Visual scale comparison across the 6 tiers (**Person $\rightarrow$ Household $\rightarrow$ Neighborhood $\rightarrow$ City $\rightarrow$ Country $\rightarrow$ World**).
   * Uses relatable visual units (e.g., lightbulbs, batteries, or lightning bolts representing $\text{kWh}$).
6. **Plastic Waste Production (`plastic-waste.html`)**
   * Visual scale comparison across the 6 tiers (**Person $\rightarrow$ Household $\rightarrow$ Neighborhood $\rightarrow$ City $\rightarrow$ Country $\rightarrow$ World**).
   * Uses relatable visual units (e.g., plastic water bottles, shopping bags, or garbage trucks representing kilograms/tons of plastic waste).

---

## 4. Exclusions (Out of Scope)
To ensure the project remains achievable as a Grade 9 static website, the following features are explicitly **excluded** from the MVP:
* **Backend Databases & User Accounts:** No user logins, saved profiles, or server-side data storage.
* **Real-Time Live API Feeds:** Data will rely on verified, static annual/daily averages (e.g., from EPA, UNEP, OECD, or Our World in Data) rather than live-updating global counters.
* **Personalized Carbon/Impact Calculators:** Users will view pre-calculated averages across the 6 defined tiers rather than filling out multi-step personal lifestyle surveys.
* **Mobile App Packaging:** Built strictly as a responsive static website for web browsers (not native iOS/Android apps).

---

## 5. Acceptance Criteria
The project will be considered complete and ready for submission when it meets all of the following conditions:
* **Navigation & Completeness:** All 6 pages (Home, About Us, CO₂, Water, Energy, Plastic Waste) exist, load without broken links, and feature a consistent navigation menu.
* **Consistent 6-Tier Progression:** Every one of the four topic pages accurately displays data for all 6 required scales: *Person, Household, Neighborhood, City, Country,* and *World*, matching the population assumptions defined on the About Us page.
* **Visual Scale Mechanic (*Neal.fun* Style):** Each topic page visually represents quantities through repeated icons, proportional blocks, or scroll-driven counters—avoiding plain text-only bullet lists for the comparisons.
* **Data Clarity & Citations:** Every statistic includes clear units (e.g., metric tons, liters, $\text{kWh}$, kilograms), states the timeframe (e.g., per day or per year), and cites a credible source (*Our World in Data, UNEP, OECD, EPA, IEA*).
* **Homepage & Team Info:** The homepage clearly articulates the site's description and purpose, and the About Us page lists all Grade 9 group members, their roles, methodology, and data sources.
* **Responsive Layout:** All pages render cleanly on both standard desktop screens and smaller laptop/tablet viewports without horizontal overflow or overlapping text.