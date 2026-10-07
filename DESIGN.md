---
name: AMBRA
description: Tasting-menu restaurant in a Gdańsk Hanseatic townhouse; plaster white, sandstone and gilding.
colors:
  plaster-white: "#ffffff"
  warm-paper: "#fbf8f2"
  sandstone: "#ecdfc8"
  sandstone-deep: "#dcc7a2"
  sand-line: "#e3d5bb"
  gilding: "#b08a3e"
  gilding-bright: "#c9a457"
  gilding-ink: "#7a5c22"
  tar-ink: "#221c14"
  ink-soft: "#554a3a"
  on-gold: "#1b150d"
  ticket-muted: "#bfb19a"
  error-brick: "#a5361f"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(38px, 5.6vw, 80px)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(28px, 3.6vw, 48px)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "0.005em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(16px, 1.6vw, 22px)"
    fontWeight: 700
    lineHeight: 1.3
    fontVariation: "'wdth' 125"
  lead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(20px, 1.8vw, 24px)"
    fontWeight: 500
    lineHeight: 1.5
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "0.08em"
    fontVariation: "'wdth' 125"
  figure:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(26px, 3vw, 36px)"
    fontWeight: 700
    lineHeight: 1
    fontFeature: "'tnum'"
    fontVariation: "'wdth' 125"
rounded:
  none: "0px"
  round: "50%"
spacing:
  section: "clamp(72px, 9vw, 128px)"
  container: "1240px"
  gutter: "20px"
  gutter-phone: "16px"
  head-gap: "40px"
  field-gap: "14px"
components:
  button-gold:
    backgroundColor: "{colors.gilding}"
    textColor: "{colors.on-gold}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "14px 28px"
    height: "52px"
  button-gold-hover:
    backgroundColor: "{colors.gilding-bright}"
  button-dark:
    backgroundColor: "{colors.tar-ink}"
    textColor: "{colors.warm-paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "14px 28px"
    height: "52px"
  button-dark-hover:
    backgroundColor: "{colors.gilding}"
    textColor: "{colors.on-gold}"
  button-light-on-photo:
    backgroundColor: "transparent"
    textColor: "{colors.plaster-white}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "18px 34px"
    height: "60px"
  tab:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.tar-ink}"
    rounded: "{rounded.none}"
    padding: "18px 20px"
  tab-active:
    backgroundColor: "{colors.tar-ink}"
    textColor: "{colors.warm-paper}"
  input:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.tar-ink}"
    rounded: "{rounded.none}"
    padding: "13px 14px"
    height: "54px"
  input-focus:
    backgroundColor: "{colors.plaster-white}"
  ticket:
    backgroundColor: "{colors.tar-ink}"
    textColor: "{colors.warm-paper}"
    rounded: "{rounded.none}"
    padding: "26px"
  gallery-arrow:
    backgroundColor: "transparent"
    textColor: "{colors.tar-ink}"
    rounded: "{rounded.round}"
    size: "54px"
---

# Design System: AMBRA

## Overview

**Creative North Star: "The Gilded Townhouse"**

AMBRA is a Hanseatic townhouse on Długie Pobrzeże rendered as a page: whitewashed plaster, sandstone courses and gilt lettering on a facade, not cream-and-serif fine dining. Surfaces alternate between plaster white, warm paper and sandstone like storeys of a facade; gold appears as solid fields and thin lines, never as a gradient or glow. Headings are wide, uppercase Archivo set like carved signage; everything else is plain, legible Archivo.

The page is light and bright by commitment. The only dark surfaces are the full-bleed food photograph in the hero (with text set directly on it), the active tab or option, and the booking ticket. Density is generous: one idea per section, large type, big gold fields, sharp corners everywhere.

**Key Characteristics:**
- Light facade palette (white, paper, sandstone) with gold as the single accent family.
- Archivo at 125% width, uppercase, for every heading, price and label; regular-width Archivo for reading.
- Sharp rectangular geometry; the stepped Gdańsk gable is the one recurring silhouette.
- Flat surfaces; depth from tonal section bands, 2px ink rules and gold fields.
- Tabular figures for anything that is a number the guest compares (courses, prices, ticket).

## Colors

A warm, bright facade palette: three light neutrals, one gold family, one dark ink.

### Primary
- **Gilding** (#b08a3e): primary button fill, selected "Prestige" row fill, figcaption plate, step number squares, gable mark, footer top rule (4px), hover underline on nav, focus ring. Used as a field or a line, not as body text.
- **Bright Gilding** (#c9a457): hover state of gold buttons; gold text on dark surfaces (active tab sublabel, ticket total and header, selection highlight).
- **Gilding Ink** (#7a5c22): the gold that may be read on light ground: links, course numbers, footer column headings, select chevron.

### Neutral
- **Plaster White** (#ffffff): intro, wine cellar and private room sections; form card.
- **Warm Paper** (#fbf8f2): page body, gallery and booking sections, solid header, inputs, inactive tabs.
- **Sandstone** (#ecdfc8): menu, reviews and footer bands.
- **Deep Sandstone** (#dcc7a2): course dividers and borders on sandstone ground.
- **Sand Line** (#e3d5bb): hairlines and 2px input/option borders on white and paper.
- **Tar Ink** (#221c14): all primary text, 2px structural rules, dark button, active tab/option, ticket.
- **Soft Ink** (#554a3a): secondary copy, descriptions, captions.
- **On-Gold** (#1b150d): text placed on any gold field.
- **Ticket Muted** (#bfb19a): secondary text on the dark ticket.
- **Error Brick** (#a5361f): field error border and message.

### Named Rules
**The Facade Bands Rule.** Consecutive sections never share a background; they cycle white, paper and sandstone so the page reads as stacked storeys without dividers.

**The Gold Is a Field Rule.** Gold appears as flat solid fills and lines. Text in gold on light ground uses Gilding Ink (#7a5c22) only; mid gold (#b08a3e) is never body or label text on white or paper.

**The Light House Rule.** The page stays light. Dark ink surfaces are reserved for the photo hero overlay, selected states and the ticket; never a dark section band.

## Typography

**Display Font:** Archivo, width axis 125, uppercase (with system-ui, sans-serif)
**Body Font:** Archivo, normal width (with system-ui, sans-serif)

**Character:** One variable family carries both voices: expanded uppercase for signage-like headings, normal width for calm reading. Loaded weights: 400-700 at width 100, 500-700 at width 125.

### Hierarchy
- **Display** (700, clamp(38px, 5.6vw, 80px), 1.02; phone clamp(30px, 8.6vw, 40px)): hero headline only, max ~10.5em wide, on photography.
- **Headline** (600, clamp(28px, 3.6vw, 48px), 1.08): section headings, balanced wrapping.
- **Title** (700, 16-22px, expanded uppercase): tab names, option names, wine pairing names, legends (18px/600), footer wordmark.
- **Figure** (700, 26-36px, expanded uppercase, tabular): menu price, pairing prices, ticket total.
- **Lead** (500, clamp(20px, 1.8vw, 24px), 1.5): section intro paragraph; hero lead 17-20px on light warm text (#f3ebdc).
- **Body** (400, 17px / 16px on phone, 1.65): reading copy at 44-60ch.
- **Label** (600, 13-15px, 0.08em tracking, expanded uppercase): buttons, sticky mobile CTA, footer column heads, ticket field names.

### Named Rules
**The Expanded Caps Rule.** Every heading, price and button label is Archivo at 125% width in uppercase; nothing else is. Body copy is never set expanded or in caps.

**The Ledger Figures Rule.** Course numbers (01-09), prices and ticket data use tabular numerals so columns align.

## Layout

Single container `min(1240px, 100% - 40px)` (phone: 100% - 32px). Sections pad vertically clamp(72px, 9vw, 128px). Section heads are a split row: heading left, a short explanatory paragraph right (max 44ch), 40px below. Content sections are asymmetric two-column grids (roughly 1.1fr / 0.9fr or 1.35fr / 0.65fr) with clamp gaps of 32-110px; image and text swap sides between sections. The gallery breaks out of the container as a full-bleed horizontal scroll-snap strip aligned to the container edge.

Breakpoints: at 1000px everything stacks to one column, the nav becomes a burger drop panel, the menu photo hides, the ticket moves above the form, and a sticky full-width gold "reserve" bar appears at the bottom. At 640px tabs and options stack, hero buttons go full width, and the gallery arrows hide in favor of swipe.

## Elevation & Depth

Flat by default. Depth comes from tonal section bands, 2px ink rules and solid gold fields, not shadows. The header gains a 1px Sand Line rule (as box-shadow) when solid. Shadows exist only on floating mobile layers.

### Shadow Vocabulary
- **Floating CTA** (`box-shadow: 0 12px 28px -10px rgba(30, 20, 5, .6)`): sticky mobile reserve bar.
- **Drop panel** (`box-shadow: 0 20px 30px -20px rgba(0, 0, 0, .35)`): mobile nav panel.

### Named Rules
**The Flat Facade Rule.** Cards, images, buttons and forms carry no shadow. Only elements that float over scrolling content (mobile nav, sticky CTA) may cast one.

## Shapes

Corners are square everywhere (0 radius, including inputs). The signature silhouette is the stepped Gdańsk gable: a three-step clip-path cut into the top edge of feature photographs (chef portrait, private room) and the same gable as the solid gold logo mark, favicon and ticket emblem. Structural edges are 2px Tar Ink (tabs frame, wine list top rule, gallery arrows) or 1-2px sand lines. The only circles are functional: gallery arrow buttons, the status dot, and the ticket perforation notches.

### Named Rules
**The One Gable Rule.** The stepped gable is the only decorative shape. Use it on at most one or two feature images per page and as the mark; never on gallery or menu photos, never rotated or mirrored.

## Components

### Buttons
Solid, rectangular and loud; expanded uppercase labels.
- **Shape:** square corners (0px), 2px transparent border, min height 52px (large: 60px).
- **Gold (primary):** Gilding fill, On-Gold text; hover lifts 2px to Bright Gilding.
- **Dark:** Tar Ink fill, Warm Paper text; hover turns gold.
- **Light (on photo only):** transparent with 85% white border; hover fills white with ink text.
- **Focus:** 2px Gilding outline, 3px offset. Motion uses `cubic-bezier(.16, 1, .3, 1)` at .25s.

### Tasting-menu tabs
A three-up segmented bar framed in 2px Tar Ink with 2px ink dividers on paper. Each tab: menu name (Title) over course count and price (14px Soft Ink). Active tab inverts to Tar Ink with Bright Gilding sublabel. Stacks vertically on phone. Below, courses list as numbered ledger rows (01-09 in Gilding Ink, tabular) separated by Deep Sandstone rules, closing on a paper price block with a gold button.

### Option tiles and inputs
- **Option tiles:** 2px Sand Line border on paper, hover border gold, checked state inverts to Tar Ink with Bright Gilding small text, same as tabs.
- **Inputs:** 54px tall, paper fill, 2px Sand Line border, 0 radius; focus switches border to Gilding and fill to white (no glow). Errors: Error Brick border plus 14px message below.
- **Step markers:** 32px gold squares with the step number, before each uppercase legend.

### Wine pairing list
Full-width ledger rows under a 2px ink rule: name (expanded caps) / description / large tabular price, separated by Sand Line. One featured row is a solid Gilding field.

### Navigation
Transparent white-on-photo over the hero, becoming solid Warm Paper with ink text after scroll. Wordmark: gold gable plus "AMBRA" in expanded caps at 0.22em tracking. Links 15px/500 with a 2px gold underline that wipes in on hover; a compact gold button closes the row. Below 1000px: burger (two bars crossing to an X) opening a full-width paper panel with ruled 17px links.

### Boarding-pass ticket (signature)
The reservation summary as a dark Tar Ink stub, sticky beside the form on desktop. Header row of Bright Gilding caps with the gable; a two-column grid of uppercase muted field names over 17px/600 tabular values; a dashed gold perforation with paper-colored half-circle notches cut into both edges; then the total in Bright Gilding Figure type and deposit terms in Ticket Muted.

### Gallery strip
Full-bleed horizontal strip, 20px gaps, scroll-snap, hidden scrollbar; images alternate 4:5 and 1:1 (centered) for a rhythmic skyline. Controlled by circular 54px arrows with 2px ink borders that fill ink on hover and fade to 30% at the ends.

## Do's and Don'ts

### Do:
- **Do** set every heading, price and button label in Archivo at 125% width, uppercase.
- **Do** cycle section backgrounds through Plaster White (#ffffff), Warm Paper (#fbf8f2) and Sandstone (#ecdfc8).
- **Do** use Gilding (#b08a3e) as solid fields and lines, with On-Gold (#1b150d) text on top; use Gilding Ink (#7a5c22) for gold text on light ground.
- **Do** keep every box square-cornered and flat.
- **Do** put hero text directly on a full-bleed food photograph, protected by a warm-black (rgba(20,14,6,…)) directional overlay.
- **Do** render selected states (tab, option) as an ink inversion with bright-gold secondary text.

### Don't:
- **Don't** use rounded corners on cards, buttons, inputs or images; circles are only for arrows, status dots and ticket notches.
- **Don't** use gold gradients, metallic sheens or glows.
- **Don't** add serif or thin display faces; the thin Bodoni direction was rejected as illegible.
- **Don't** add dark section bands; dark is reserved for the hero photo, selected states and the ticket.
- **Don't** add shadows to cards, images or buttons.
- **Don't** apply the gable clip-path to every image; it marks feature photographs only.
