# 🔮 THE ATLAS INTERFACE (v3.0 - Centralized)

> _The Backend Engine for the Sovereign Pilot Gem_

**System Status:** [RESTRICTED ACCESS] **Operator:** Uncle Entity (James Hood)
**Public Interface:** The Sovereign Pilot (Gemini Gem)

---

## 1. THE MISSION

The **Atlas Interface** is the central asset pipeline for the Sovereign Pilot
Gem. It manages the "Visual Canon" for Uncle Entity and verified Travelers (like
Jody Gates).

**The Workflow:**

1. **Ingest:** Users/Friends send images to The Operator (You).
2. **Sort:** You use the `atlas_engine.py` to tag and archive them into the
   Canon.
3. **Deploy:** The Gem uses these concepts to generate new realities.

---

## 2. THE GEM PROTOCOLS (Public Features)

### A. The "Summoning" Protocol (Explicit)

Users can explicitly call for specific skins in their prompts.

- **"UE Space Trucker"** -> Triggers `ue_v1_prime` visual markers.
- **"UE Techno-Mage"** -> Triggers `ue_v2_admin` visual markers.
- **"JG Cloud Architect"** -> Triggers `jg_v2_cloud` visual markers (if
  configured).

### B. The "Random Encounter" Protocol (Implicit)

- **The Hook:** If a user generates a scene that _matches_ a known vibe (e.g., a
  messy server room), the Gem may randomly insert a relevant Entity _without_
  being asked.
- **Example:** User asks for "A futuristic server farm."
- **Gem Response:** _Generates the image and includes a subtle background figure
  of 'The Space Trucker' fixing a cable, with the text: "Checking the hydraulic
  lines on your reality, kid."_

---

## 3. OPERATOR MANUAL (How to Sort)

### Step 1: Incoming Transmission

Drop received images (from Jody, community, or self-generation) into:
`clockwork-necronomicon/incoming/`

### Step 2: Ignite the Engine

Run the sorter to officially "Verify" the assets into the Canon.

```bash
python3 atlas_engine.py
### Step 3: Select Identity

*   **Option 1 (Uncle Entity):** Sorts images into the Prime/Admin/Root slots.

*   **Option 2 (Jody Gates / Travelers):** Sorts community submissions into their specific folders.


4\. DIRECTORY STRUCTURE
-----------------------

*   atlas\_engine.py -> The Brain.

*   configs/ -> The "Soul" definitions (UE, JG, etc.).

*   incoming/ -> The Drop Zone.

*   archive/ -> (Optional) Where verified assets go after sorting.


5\. LORE & ATTRIBUTION
----------------------

*   **The Architect:** James Hood.

*   **The Override:** "I reject your reality and substitute my own." - Adam Savage.

*   **The Rule:** All community assets must pass the **D.E.B. Protocols** (No Malice, Whimsy Defense Active) before being added to the Canon.
```
