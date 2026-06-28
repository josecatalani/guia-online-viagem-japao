# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

Greenfield. The only content so far is the spec at `.sdd/0.concepts.md`. There is no application code yet — when you build features, follow the constraints below rather than inferring conventions from existing files.

## What this is

A personal travel-guide PWA for a family trip to Tokyo. The audience is the author's siblings, who are **not comfortable with technology**. Every UX decision flows from that: the interface must be easy, direct, and minimal. When in doubt, fewer screens, bigger tap targets, less text.

Base language of the UI is **Portuguese (pt-BR)**. The phrasebook/vocabulary feature goes pt-BR → Japanese (with pronunciation), never English as the pivot.

Key trip facts (used by the countdown, itinerary, etc.):
- Depart São Paulo (GRU) **2026-10-10**, connecting in Doha.
- Return to São Paulo **2026-10-31**.
- "Today" in this environment is 2026-06-28, but countdown logic must compute from the real current date at runtime.

Planned feature areas (from the spec): currency converter (JPY⇄BRL), trip countdown, hotels/locations, day-by-day itinerary, vocabulary/phrasebook (offline, with pronunciation), practical info (plugs/voltage, emergency numbers, transport, tipping), and a one-tap emergency card (hospital, embassy, emergency number, "I need help" phrase).

## Hard tech constraints (do not deviate without being asked)

- **PWA, single-file, no build step.** Plain HTML + JS. Output must be servable as-is.
- **No template/JS framework.** No React/Vue/Svelte/etc.
- **CSS framework: pico.css** (via CDN).
- **Content lives in JSON**, kept separate from logic — itinerary, phrases, hotels, practical info should be data-driven so the author can edit content without touching code.
- **No tests.** The spec explicitly opts out; do not add a test harness or testing tooling.
- **Hosting: GitHub Pages**, deployed by pushing to `main`. There is no server and no secrets — everything runs client-side.

## Offline behavior

Several features (phrasebook, emergency card) must work **offline**. This implies a service worker and a web app manifest. Cache the app shell and the JSON content so the guide is usable without connectivity abroad.

## Workflow notes

- No build/lint/test commands exist. To preview locally, serve the directory over HTTP (e.g. `python3 -m http.server`) — opening `file://` breaks service-worker/PWA features.
- `.sdd/` holds spec-driven-development docs, numbered by stage (`0.concepts.md` is the concept brief). Treat these as the source of truth for intent; consult the latest before adding features.
