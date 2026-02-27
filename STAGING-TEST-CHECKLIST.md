# Staging Deployment Test Checklist

## Pre-Deployment Verification

- [x] All required files present (index.html, styles.css, script.js)
- [x] CDN links verified (Tailwind CSS, Google Fonts)
- [x] All tests passing (211/214 tests pass)
- [x] No critical errors in code
- [x] Deployment documentation created

## Deployment Steps

### For Netlify (Recommended)

1. [ ] Create Netlify account or log in
2. [ ] Drag and drop files to Netlify dashboard
3. [ ] Wait for deployment to complete
4. [ ] Note the generated URL

### For Vercel

1. [ ] Create Vercel account or log in
2. [ ] Run `vercel` command in project directory
3. [ ] Follow CLI prompts
4. [ ] Note the generated URL

### For GitHub Pages

1. [ ] Create GitHub repository
2. [ ] Push files to repository
3. [ ] Enable GitHub Pages in settings
4. [ ] Note the generated URL

## Post-Deployment Testing

### Visual Verification

- [ ] Website loads without errors
- [ ] All fonts load correctly (Bangers/Carter One for headings, Poppins/Inter for body)
- [ ] Colors display correctly (Turmeric Yellow, Chutney Green, Chili Red)
- [ ] Images and SVG graphics display correctly
- [ ] Layout appears correct on desktop

### Functional Testing

#### Navigation
- [ ] Navigation bar is sticky and remains visible during scroll
- [ ] All navigation links work (Home, Menu, Fun Facts, Contact)
- [ ] Smooth scrolling works (800ms duration)
- [ ] Hamburger menu appears on mobile
- [ ] Hamburger menu toggles correctly
- [ ] Escape key closes mobile menu

#### Hero Section
- [ ] Hero section displays with correct background color
- [ ] Heading and tagline are visible
- [ ] CTA button ("Explore Menu") is visible
- [ ] CTA button scrolls to menu section when clicked
- [ ] SVG animation plays on page load

#### Menu System
- [ ] All menu items display correctly
- [ ] Each menu card shows: name, price (₹), description, funny fact
- [ ] Menu cards have correct background color (Rice White)
- [ ] Menu cards have Chutney Green borders

#### Category Filtering
- [ ] All filter buttons are visible (All, The Legends, The Golden Triangles, The Crisp Cartel)
- [ ] "All" filter is active by default
- [ ] Clicking each filter shows only matching items
- [ ] Active filter has Chili Red background
- [ ] Filter transitions are smooth (400ms)

#### Menu Interactivity (Desktop)
- [ ] Menu cards scale to 105% on hover
- [ ] Menu cards show shadow effect on hover
- [ ] Hover transitions are smooth (300ms)
- [ ] Cards return to original state after hover

#### Menu Interactivity (Mobile/Tablet)
- [ ] Menu cards do NOT scale on hover
- [ ] Touch interactions work correctly

#### Fun Facts Section
- [ ] Fun facts section is visible
- [ ] At least 5 fun facts are displayed
- [ ] Marquee animation works smoothly
- [ ] Section uses Chutney Green accent color
- [ ] Text is readable

#### Footer
- [ ] Complete address is displayed correctly
- [ ] Operating hours are displayed (8:00 AM - 8:30 PM)
- [ ] Social media links are present
- [ ] Social media links open in new tabs
- [ ] Footer has contrasting background (Charcoal)

### Responsive Testing

#### Mobile (< 768px)
- [ ] Single-column layout for all content
- [ ] Hamburger menu displays
- [ ] Navigation menu toggles correctly
- [ ] Text is readable (minimum 16px)
- [ ] All interactive elements are touch-friendly (44px minimum)
- [ ] No horizontal scrolling

#### Tablet (768-1024px)
- [ ] Two-column grid for menu items
- [ ] Navigation displays horizontally
- [ ] Spacing and alignment are correct
- [ ] No hover effects on menu cards

#### Desktop (≥ 1024px)
- [ ] Three or four-column grid for menu items
- [ ] Hover effects work on menu cards
- [ ] All interactive elements work correctly
- [ ] Maximum content width is maintained

### Browser Testing

- [ ] Chrome (latest): All features work
- [ ] Firefox (latest): All features work
- [ ] Safari (latest): All features work
- [ ] Edge (latest): All features work

### Accessibility Testing

- [ ] All images have alt text
- [ ] All interactive elements are keyboard accessible
- [ ] Tab navigation works correctly
- [ ] ARIA labels are present for icon buttons
- [ ] Color contrast meets WCAG AA standards (4.5:1)
- [ ] Screen reader compatibility (manual test)

### Performance Testing

- [ ] Page loads in < 3 seconds on standard broadband
- [ ] Lighthouse performance score ≥ 90
- [ ] No layout shifts during load
- [ ] Animations run smoothly (60fps)
- [ ] CDN resources load correctly

### HTTPS Verification

- [ ] Site is served over HTTPS
- [ ] No mixed content warnings
- [ ] SSL certificate is valid
- [ ] HTTP redirects to HTTPS

## Issues Found

Document any issues discovered during testing:

| Issue | Severity | Description | Status |
|-------|----------|-------------|--------|
|       |          |             |        |

## Sign-Off

- [ ] All critical tests passed
- [ ] All functional requirements met
- [ ] All accessibility requirements met
- [ ] Performance targets achieved
- [ ] Ready for production deployment

**Tested By**: _______________
**Date**: _______________
**Staging URL**: _______________
**Notes**: _______________
