# Flight Aggregator – Design Guidelines

## Inspiration:
- For our project we have decided to follow many of the important guidelines from a plethora of guidelines like:
- https://www.w3.org/TR/WCAG20/ 
- https://www.uutilsynet.no/nettsteder/losningsforslag-etter-tema/36
- https://usability.yale.edu/web-accessibility/articles/wcag2-checklist
- We are also aiming to keep our code as sementic as possible.

---

## Theme: 
- For our theme we have decided to go with serious/Professional. When spending a lot of money we don't want users to think our website is scammy, so we will avoid a playful design and go for a more serious/professional design.

---

## Color scheme:
- For our project we have decided to go with a blue theme. It is professional, trust, calm, honor. And it fits with the sky.
- Here we have made sure that our colors and theme match the guidelines listed on:
- https://www.uutilsynet.no/veiledning/bruk-av-farger/206 

---

### Color palette

| Role              | Color         | Hex        |
|-------------------|---------------|------------|
| **Primary**       | Dark Blue     | `#182833`  |
| **Accent**        | Darker Accent | `#101520`  |
|                   | Lighter Accent| `#183040`  |
| **Background**    | Light Gray    | `rgb(240,240,250)` |
| **Contrast**      | Orange CTA    | `#FDA300`  |
| **Text (dark)**   | Dark Gray     | `#212529`  |
| **Text (light)**  | Light Gray    | `#f1f3f5`  |
| **Box**           | White         | `#FFFFFF`  |
| **Borders**       | Black / White | `#000000` / `#FFFFFF` |

- Colors follow WCAG guidelines for contrast.  
- Color-blind–safe combos tested: [Colorblind Tool](https://davidmathlogic.com/colorblind/#%23D81B60-%231E88E5-%23FFC107-%23004D40)  
- Verified with: [Contrast Checker](https://contrastchecker.com)  
- Norwegian standards followed: [UUtilsynet Colors](https://www.uutilsynet.no/veiledning/bruk-av-farger/206)

---

## Hierarchy and layout:

- For our project the top to bottom hierarchy of importance is used.

### Importance hierarchy
- For our website the order of importance is listed below.

1. Hero text  
2. Search button (Orange CTA)  
3. Search options  
4. Product listings  
5. Search filters  
6. "Buy" buttons  
7. Recommendations  
8. Footer

- The idea is to catch the users attention to the hero section first. In the hero section we have the hero text telling the visitor what our website is about. After that we want to bring their attention to the search bar. On this bar the search button is colored orange as a call to action. 

### General layout

#### Sections

- **Header:** Logo + navigation  
- **Hero:** Image, banner text, search bar  
- **Content:** Product results, filters, recommendations  
- **Footer:** Legal info, contact, copyright  

### Different devices
- We have made sure our website is not only usable on desktop, mobile and tablet, but also responsive and accesible on all mediums.
- This includes actions like, resizing of text, dynamic resizing of boxes and different alternatives for menus accross all 3 platforms.
- There have been used websites for lighthouse tests like: https://validator.w3.org/ 

| Device   | Layout          | Adjustments                             |
|----------|------------------|-----------------------------------------|
| Mobile   | Single column     | Full-width elements, hamburger menu     |
| Tablet   | Stacked or 2-col  | Touch targets ≥ 44px, simplified layout |
| Desktop  | Multi-column      | Max width: 1200px, visible nav/filter   |

- All layouts are responsive (tested via Lighthouse & [W3 Validator](https://validator.w3.org/)) 

---

## Accessibility

- HTML5 semantic tags used: `<header>`, `<main>`, `<button>`, etc.  
- All media include `alt` text  
- Elements navigable by keyboard (Tab / Shift+Tab)  
- Clear focus states  
- Images avoid blur; dark overlays used in hero section for text clarity  
- Text resizing and container scaling tested on all devices  
- Compliant with: [WCAG 2.0](https://www.w3.org/TR/WCAG20/)

### Sizing
- We have opted for large sections and boxes so that those with impaired vision will have it easier. 

### Screen readers.
- Its important that our website is accesible for screen readers.
- Part of this is using soluions that alow us to help readers. HTML5 is and example of this.
- https://www.uutilsynet.no/veiledning/kodestandarder-og-validering/212
- Another part of this is making sure that every item that can have text, will have text. This includes images. 

### Images:
- All images are clear and high-contrast  
- Hero image has a **dark overlay** for readability  
- No blur effects planned  
- Image text is screen-reader friendly  


---

## Typography:

| Element         | Font     | Size (px) | Weight | Style        |
|-----------------|----------|-----------|--------|--------------|
| **Base Text**   | Arial    | 16px      | Regular| Sans-Serif   |
| **H1**          | Arial    | 32px      | Bold   |              |
| **H2**          | Arial    | 24px      | Bold   |              |
| **H3**          | Arial    | 20px      | Bold   |              |
| **Button Text** | Arial    | 16px      | Bold   | All caps     |

- Font is dyslexia-friendly and web-safe.
- Line height: `1.5`
- All body text is left-aligned for readability.

---

## Border rounding:
- We have decided that we will be going with a middle ground. Not to round, not to sharp. Sharp edges might take the viewers attention to much while round edges are too playfull. Therefore we are using a middle ground for a comfortable, yet professional look. TODO: What roundness do we use.

- **Box Radius:** `6px` (balanced—neither too sharp nor too round)  
- **Border Colors:** `#000000` (dark), `#FFFFFF` (light)  

---

## Shadows:

- **Box Shadows:** Minimal to none, only for hover emphasis
