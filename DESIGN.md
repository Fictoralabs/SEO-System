# Fictora Labs Design Tokens

Use these tokens across all pages to keep the experience aligned with the Fictora Labs/Instagram carousel look.

## Colors (all verified)

| Token | Hex | Usage |
| --- | --- | --- |
| Primary dark navy | `#152B4B` | Main backgrounds |
| Gradient deep | `#002C4D` | Gradient endpoint |
| Gradient teal top | `#3AA0B7` | Gradient top-left |
| Gradient darkest | `#051D43` | Gradient bottom-right |
| Accent yellow | `#E7FF00` | Headlines + CTAs only — never as background |
| Mint | `#d8ecd1` | Light background slides |
| Teal accent | `#52b4d4` | Secondary elements |
| Mid-blue | `#3376b0` | Supporting elements |
| Muted white text | `#F0F0F0` | Body text on dark |

**Hero gradient (radial):**

```css
background: radial-gradient(ellipse at 15% 5%, #3AA0B7 0%, #1a6a85 22%, #0d3a5c 52%, #051D43 100%);
```

**Dark variant gradient:**

```css
background: radial-gradient(ellipse at 10% 0%, #002C4D 0%, #0d3655 35%, #051D43 100%);
```

## Typography

| Role | Font | Weight | Notes |
| --- | --- | --- | --- |
| Headlines | Barlow Condensed | 700–900 | ALL CAPS (match real slides) |
| Body | DM Sans | 400 | Sentence case |
| CTA/Labels | Barlow Condensed | 700 | Caps |
| URL/Handle | DM Sans | 300 | Lowercase |

**Import:**

```html
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

## SVG Brand Marks

**Wand/Spark Icon (yellow on transparent):**

```html
<svg width="40" height="40" viewBox="0 0 32 32" fill="none" aria-hidden="true">
  <line x1="16" y1="2" x2="16" y2="10" stroke="#E7FF00" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="16" y1="22" x2="16" y2="30" stroke="#E7FF00" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="2" y1="16" x2="10" y2="16" stroke="#E7FF00" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="22" y1="16" x2="30" y2="16" stroke="#E7FF00" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="6.3" y1="6.3" x2="11.8" y2="11.8" stroke="#E7FF00" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="20.2" y1="20.2" x2="25.7" y2="25.7" stroke="#E7FF00" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="25.7" y1="6.3" x2="20.2" y2="11.8" stroke="#E7FF00" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="11.8" y1="20.2" x2="6.3" y2="25.7" stroke="#E7FF00" stroke-width="3.5" stroke-linecap="round"/>
</svg>
```

**Brand Arrow Mark (diagonal bars, bleed off-canvas):**

```html
<div style="position:absolute;top:0;right:0;z-index:5;pointer-events:none;width:1px;height:1px;overflow:visible;">
  <svg width="0" height="0" style="overflow:visible;">
    <line x1="860" y1="-60" x2="1180" y2="260" stroke="#E7FF00" stroke-width="80" stroke-linecap="square"/>
    <line x1="990" y1="-60" x2="1310" y2="260" stroke="#E7FF00" stroke-width="80" stroke-linecap="square"/>
  </svg>
</div>
```

## UI Notes
- Accent yellow is for headlines, highlights, and CTAs — avoid using it as a solid background block.
- Keep cards on dark navy or mint/light backgrounds; body text uses muted white on dark.
- Headlines all caps (Barlow Condensed), body in DM Sans.
- Use generous letter spacing on labels/eyebrows; slight negative tracking on big headlines matches the carousel feel.

