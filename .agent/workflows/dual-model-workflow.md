---
description: Dual-Model AI Workflow for Sahxiety Development
---

# Sahxiety Dual-Model AI Workflow

You are an expert AI coding agent working on the **Sahxiety** project—a personal blog/portfolio built with **React + Vite + Three.js + Framer Motion**.

## Available Models & Strengths

| Model | Strengths | Use For |
|-------|-----------|---------|
| **Claude (Core)** | Deep reasoning, precise implementation, debugging, architecture, production-quality code | Back-end logic, refactoring, complex debugging, final implementations |
| **Gemini Pro** | Rapid prototyping, UI/UX generation, large context handling, multimodal (images), creative exploration | Front-end/UI tasks, 3D visual concepts, rapid iterations, code reviews |

## Mandatory Workflow Rules

### 1. Planning First
Always start by analyzing the task thoroughly. Break down into:
- What needs to change (files, components)
- Dependencies and side effects
- Verification steps

### 2. Task Delegation Matrix

| Task Type | Primary Model | Rationale |
|-----------|---------------|-----------|
| **Visual Design / 3D Effects** | **Gemini (CODE GENERATION)** | Gemini excels at "cool" factor. **MUST generate the actual code**, not just the idea. |
| **CSS/Styling** | Gemini (Code) → Claude (Integration) | Gemini for aesthetic code generation. |
| **React component logic** | Claude | Precision and correctness. |
| **Debugging/Errors** | Claude | Deep analysis required. |
| **New page layouts** | Gemini (Code) → Claude (Refine) | Speed + coolness. |
| **Animation (Framer Motion)** | Claude | Subtle timing requires precision. |
| **Large file analysis (>300 lines)** | Gemini | Better context window. |

### 3. Review & Integration (The "Claude" Phase)
After Gemini generates the design code:
- **DEBUG ONLY**: Claude must NOT rewrite the design logic unless broken.
- **Check**: Duplicate imports, syntax errors (e.g., decorators), React hook rules.
- **Integrate**: Ensure it fits the project structure.
- **Test**: Verify it compiles.

### 4. Sahxiety-Specific Guidelines
- **Brand**: Always lowercase `sahxiety`
- **Aesthetic**: Dark, starry, subtle, premium, subconsciously attracting
- **3D Elements**: Each page should have a unique 3D visual anchor
- **Responsiveness**: All layouts must work on mobile (grid collapse, visual reordering)
- **Scrollbars**: Always hidden globally

### 5. Parallel Execution
When multiple independent subtasks exist:
- Delegate simultaneously where possible
- Example: UI mockup (Gemini) + API logic (Claude) in parallel

### 6. When Stuck
1. Query for a second opinion/critique
2. Synthesize the best approach from both perspectives
3. Implement the refined solution

## Project Tech Stack Reference

```
Framework:     React 18 + Vite
3D:            @react-three/fiber + @react-three/drei
Animation:     Framer Motion
Routing:       React Router DOM
Styling:       CSS (index.css) with CSS Variables
```

## Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main layout, routing, fixed header |
| `src/index.css` | Global styles, 3D header CSS |
| `src/components/ThreeBackground.jsx` | Starfield background |
| `src/pages/Home.jsx` | Homepage with 3D visual |
| `src/pages/Socials.jsx` | Social links with 3D tilt |
| `src/pages/Newsletter.jsx` | Newsletter signup with "Orb" visual |
