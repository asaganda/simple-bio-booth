## Simple Responsive Landing Page

A clean, minimal light-themed personal landing page — single screen, mobile-first, centered layout.

### Layout (top → bottom, centered)

1. **Profile picture** — circular avatar (~112px), placeholder image
2. **Name + handle** — name (bold), @handle (muted)
3. **Blurb** — 1–2 sentence bio, max ~480px wide
4. **Stacked link buttons** — full-width pill buttons with social icons:
   - Twitter / X
   - Instagram
   - LinkedIn
   - GitHub
   - Email
5. **Footer** — small muted copyright line

### Visual style

- White background, near-black text, subtle gray borders
- Clean sans-serif (system default via Tailwind)
- Pill buttons (`rounded-full`), full width, hover: light gray fill + subtle scale
- Comfortable vertical spacing, generous padding on mobile
- Max content width ~28rem, centered horizontally and vertically

### Responsive behavior

- Mobile: full-width buttons with side padding, avatar slightly smaller
- Desktop: same centered column, just more breathing room above/below

### Files

- Replace `src/routes/index.tsx` with the landing page (single route, no extra pages needed)
- Update `__root.tsx` meta title/description to "Your Name — Links"
- Use `lucide-react` icons (already available) for socials; brand-style icons for X/Instagram/LinkedIn/GitHub, Mail for email
- All link `href`s use `#` placeholders that you can edit later

No backend, no database, no extra dependencies.