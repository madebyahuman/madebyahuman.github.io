# GEN·GRID  
**Interactive Generative Grid System (p5.js)**

## Overview

**GEN·GRID** is an interactive generative system exploring the grid as a visual, structural, and interactional object.  
The project combines parametric generation and direct manipulation to study how rigid systems can be progressively altered through user intervention.

The tool produces unique graphic compositions that evolve through parameters and interaction, positioning the user as an active agent within the generative process.

---

## Conceptual Framework

GEN·GRID is developed within a **research-through-design** approach.

The project investigates:
- the grid as a foundational structure in graphic and interface design,
- the balance between deterministic systems and emergent variation,
- interaction as a method of disrupting formal order,
- constraints as productive elements in generative systems.

---

## System Logic

The visual output is based on a modular grid composed of vertical and horizontal segments.

Key parameters:
- **Density** controls the number of columns and overall structural tension.
- **Flow** modulates the number of rows, affecting rhythm and spatial perception.
- **Depth** introduces a pseudo-3D reading by extruding grid cells.

Multiple visual interpretations are generated from a single rule set.

---

## Visual Modes

- **Brutalist**  
  Strict orthogonal grid with minimal variation.

- **Sinuous**  
  Controlled distortion of segments introducing organic deviation.

- **Colorful**  
  Chromatic variation derived from spatial coordinates.

A **3D mode** overlays volumetric cues, shifting the reading of the grid from planar to spatial.

---

## Interaction Model

- Click or touch removes grid segments directly on the canvas.
- Interactions permanently alter the structure until regeneration.
- Regeneration resets the system while preserving parameter values.

This interaction model emphasizes irreversibility and intentional gesture over undo-based experimentation.

---

## Interface Design

The interface is deliberately minimal and functional.

- Parameters are continuously readable and immediately reflected visually.
- Controls are grouped by conceptual role (structure, mode, output).
- The interface is designed to reveal the system rather than dominate it.

The UI operates as an extension of the generative logic.

---

## Technical Implementation

- Implemented with **p5.js** for rendering and interaction.
- Single-canvas architecture with explicit redraw control.
- Grid state stored as mutable segment matrices.
- Deterministic parameter mapping combined with localized stochastic variation.

---

## Project Structure


<pre>
├── index.html   
├── style.css    
├── sketch.js    
└── README.md
</pre>

---

## Research Perspective


GEN·GRID is an open research project developed through my own practice.  
It explores how generative systems can be designed, interacted with, and interpreted, while remaining a flexible platform rather than a finished tool.

Beyond the grid itself, the project is envisioned as a **complete generative toolkit**, supporting multiple styles, direct interaction, and evolving functionalities.  
Future extensions could include new visual modes, temporal or animated transformations, and expanded user-driven control, allowing continued exploration in design, computational aesthetics, and human–machine interaction.
