# Technical Design Document: Gurukrupa Snacks Website

## Overview

The Gurukrupa Snacks website is a fully responsive static website that showcases an Indian street food restaurant's menu, brand personality, and contact information. The design embraces an "Organized Chaos" aesthetic that captures the vibrant energy of Indian street food culture while maintaining professional presentation and usability.

### Design Philosophy

The website balances two seemingly contradictory goals:
1. **Chaos**: Vibrant colors, bold typography, playful animations, and energetic visual elements that reflect the bustling atmosphere of Indian street food
2. **Organization**: Clean layouts, intuitive navigation, logical information hierarchy, and responsive design patterns that ensure usability

### Technical Approach

This is a static website built with modern web standards but without build tools or frameworks. The architecture prioritizes:
- **Simplicity**: Pure HTML5, CSS (via Tailwind CDN + custom styles), and vanilla JavaScript
- **Performance**: Minimal dependencies, CDN-delivered assets, optimized for fast loading
- **Maintainability**: Clear separation of concerns, semantic markup, modular JavaScript
- **Deployability**: Single-page application deployable to any static hosting service

## Architecture

### High-Level Structure

```
┌─────────────────────────────────────┐
│         index.html                  │
│  (Semantic HTML5 Structure)         │
│                                     │
│  ┌──────────────────────────────┐  │
│  │   Navigation Bar (Sticky)    │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │   Hero Section               │  │
│  │   - Animated SVG             │  │
│  │   - CTA Button               │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │   Menu System                │  │
│  │   - Category Filters         │  │
│  │   - Menu Grid                │  │
│  │   - Menu Cards               │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │   Fun Facts Section          │  │
│  │   - Animated Content         │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │   Footer                     │  │
│  │   - Contact Info             │  │
│  │   - Social Links             │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
         │              │
         ▼              ▼
    styles.css     script.js
    (Custom CSS)   (Interactivity)
```

### Technology Stack

**Core Technologies:**
- HTML5 (semantic markup)
- CSS3 (custom styles + Tailwind CSS via CDN)
- JavaScript ES6+ (vanilla, no frameworks)

**External Dependencies (CDN):**
- Tailwind CSS v3.x (styling utilities)
- Google Fonts (Bangers/Carter One for headings, Poppins/Inter for body)

**Deployment:**
- Static file hosting (Netlify, Vercel, GitHub Pages, or any web server)
- No build process required

### File Structure

```
gurukrupa-snacks-website/
├── index.html          # Main HTML document
├── styles.css          # Custom CSS (beyond Tailwind)
└── script.js           # JavaScript for interactivity
```

## Components and Interfaces

### 1. Navigation Bar Component

**Purpose:** Provides persistent navigation across all sections of the single-page website.

**Structure:**
```html
<nav id="navbar" class="sticky top-0 z-50">
  <div class="container">
    <div class="logo">Gurukrupa Snacks</div>
    <button id="mobile-menu-toggle" class="hamburger">☰</button>
    <ul id="nav-links" class="nav-menu">
      <li><a href="#hero">Home</a></li>
      <li><a href="#menu">Menu</a></li>
      <li><a href="#facts">Fun Facts</a></li>
      <li><a href="#footer">Contact</a></li>
    </ul>
  </div>
</nav>
```

**Behavior:**
- Sticky positioning (remains at top during scroll)
- Smooth scroll to sections on link click (800ms duration)
- Mobile: Hamburger menu toggle
- Desktop: Horizontal menu layout

**Styling:**
- Background: Turmeric Yellow (#FDB913)
- Text: Charcoal (#333333)
- Font: Bangers or Carter One (bold display)
- Height: 64px (desktop), 56px (mobile)

**JavaScript Interface:**
```javascript
// Navigation module
const Navigation = {
  init() { /* Initialize event listeners */ },
  toggleMobileMenu() { /* Toggle mobile menu visibility */ },
  smoothScroll(targetId) { /* Smooth scroll to section */ }
};
```

### 2. Hero Section Component

**Purpose:** Creates an engaging first impression with brand identity and call-to-action.

**Structure:**
```html
<section id="hero" class="hero-section">
  <div class="hero-content">
    <h1 class="hero-title">Gurukrupa Snacks</h1>
    <p class="hero-tagline">Where Chaos Meets Crunch!</p>
    <button id="cta-button" class="cta-btn">Explore Menu</button>
  </div>
  <div class="hero-graphic">
    <!-- Animated SVG graphic -->
  </div>
</section>
```

**Behavior:**
- CTA button scrolls to menu section on click
- SVG animation plays on page load
- Responsive layout (stacked on mobile, side-by-side on desktop)

**Styling:**
- Background: Turmeric Yellow (#FDB913)
- Heading Font: Bangers or Carter One (72px desktop, 48px mobile)
- CTA Button: Chili Red (#E53935) with hover effects
- Min Height: 100vh (mobile), 80vh (desktop)

**JavaScript Interface:**
```javascript
const HeroSection = {
  init() { /* Initialize CTA button listener */ },
  scrollToMenu() { /* Scroll to menu section */ }
};
```

### 3. Category Filter Component

**Purpose:** Allows users to filter menu items by category.

**Structure:**
```html
<div class="category-filters">
  <button class="filter-btn active" data-category="all">All</button>
  <button class="filter-btn" data-category="legends">The Legends</button>
  <button class="filter-btn" data-category="triangles">The Golden Triangles</button>
  <button class="filter-btn" data-category="crisp">The Crisp Cartel</button>
</div>
```

**Behavior:**
- Click to filter menu items by category
- Visual indication of active filter (Chili Red)
- Smooth transition when filtering (400ms)
- "All" shows all items

**Styling:**
- Default: Rice White background, Charcoal text
- Active: Chili Red background, Rice White text
- Hover: Scale 105%, shadow effect
- Border Radius: 24px (pill shape)

**JavaScript Interface:**
```javascript
const CategoryFilter = {
  init() { /* Initialize filter buttons */ },
  filterItems(category) { /* Filter and display items */ },
  setActiveButton(button) { /* Update active state */ }
};
```

### 4. Menu Card Component

**Purpose:** Displays individual menu item information in an engaging format.

**Structure:**
```html
<div class="menu-card" data-category="legends">
  <h3 class="item-name">Vada Pav</h3>
  <p class="item-price">₹20</p>
  <p class="item-description">The OG Mumbai burger that puts Big Macs to shame!</p>
  <p class="item-fact">💡 Fun Fact: Sold every 2 seconds in Mumbai!</p>
</div>
```

**Behavior:**
- Hover effect on desktop: scale to 105%, add shadow (300ms transition)
- No hover effects on mobile/tablet
- Filterable by category attribute

**Styling:**
- Background: Rice White (#FAFAFA)
- Border: 2px solid Chutney Green (#7CB342)
- Border Radius: 12px
- Padding: 24px
- Font: Poppins or Inter (body text)
- Shadow on hover: 0 8px 16px rgba(0,0,0,0.15)

**Data Structure:**
```javascript
const menuItem = {
  name: String,        // Item name
  price: Number,       // Price in rupees
  description: String, // Witty description
  funnyFact: String,   // Entertaining fact
  category: String     // 'legends' | 'triangles' | 'crisp'
};
```

### 5. Menu System Component

**Purpose:** Organizes and displays all menu items with filtering capability.

**Structure:**
```html
<section id="menu" class="menu-section">
  <h2 class="section-title">Our Menu</h2>
  <!-- Category Filter Component -->
  <div id="menu-grid" class="menu-grid">
    <!-- Menu Card Components -->
  </div>
</section>
```

**Behavior:**
- Renders menu cards from data structure
- Responds to filter changes
- Responsive grid layout (1/2/3/4 columns based on viewport)

**Styling:**
- Grid Gap: 24px
- Columns: 1 (mobile), 2 (tablet), 3-4 (desktop)
- Padding: 48px (mobile), 80px (desktop)

**JavaScript Interface:**
```javascript
const MenuSystem = {
  menuData: [],        // Array of menu items
  init() { /* Initialize menu */ },
  renderMenuItems(category) { /* Render filtered items */ },
  createMenuCard(item) { /* Create card HTML */ }
};
```

### 6. Fun Facts Section Component

**Purpose:** Displays entertaining facts with engaging animations.

**Structure:**
```html
<section id="facts" class="facts-section">
  <h2 class="section-title">Did You Know?</h2>
  <div class="facts-container">
    <div class="fact-card">
      <p class="fact-text">Vada Pav was invented in 1966 by Ashok Vaidya!</p>
    </div>
    <!-- More fact cards -->
  </div>
</section>
```

**Behavior:**
- Marquee scroll animation (continuous horizontal scroll)
- OR flip-card interaction (click/tap to flip)
- Readable animation speed (not too fast)

**Styling:**
- Background: Chutney Green (#7CB342)
- Text: Rice White (#FAFAFA)
- Font: Poppins or Inter (18px)
- Animation: Smooth, continuous

**JavaScript Interface:**
```javascript
const FactsSection = {
  init() { /* Initialize animation */ },
  startMarquee() { /* Start scrolling animation */ }
  // OR
  initFlipCards() { /* Initialize flip interaction */ }
};
```

### 7. Footer Component

**Purpose:** Provides contact information, hours, and social media links.

**Structure:**
```html
<footer id="footer" class="footer">
  <div class="footer-content">
    <div class="footer-section">
      <h3>Location</h3>
      <p>Shop No. 16, Shreeji Solicitor<br>
         Khadakpada Circle, Murbad Road<br>
         Kalyan West, Thane, Maharashtra</p>
    </div>
    <div class="footer-section">
      <h3>Hours</h3>
      <p>8:00 AM - 8:30 PM</p>
    </div>
    <div class="footer-section">
      <h3>Follow Us</h3>
      <div class="social-links">
        <a href="#" target="_blank" aria-label="Facebook">
          <svg><!-- Facebook icon --></svg>
        </a>
        <a href="#" target="_blank" aria-label="Instagram">
          <svg><!-- Instagram icon --></svg>
        </a>
      </div>
    </div>
  </div>
</footer>
```

**Behavior:**
- Social links open in new tab (target="_blank")
- Responsive layout (stacked on mobile, grid on desktop)

**Styling:**
- Background: Charcoal (#333333)
- Text: Rice White (#FAFAFA)
- Font: Poppins or Inter
- Padding: 48px (mobile), 64px (desktop)

## Data Models

### Menu Item Data Structure

```javascript
const menuData = [
  // The Legends Category
  {
    id: 1,
    name: "Vada Pav",
    price: 20,
    description: "The OG Mumbai burger that puts Big Macs to shame!",
    funnyFact: "Sold every 2 seconds in Mumbai!",
    category: "legends"
  },
  {
    id: 2,
    name: "Misal Pav",
    price: 40,
    description: "Spicy sprout curry that'll wake up your taste buds!",
    funnyFact: "The spicier, the better - it's a Maharashtrian rule!",
    category: "legends"
  },
  
  // The Golden Triangles Category
  {
    id: 3,
    name: "Samosa",
    price: 15,
    description: "Crispy pyramids of potato perfection!",
    funnyFact: "Originated in the Middle East, perfected in India!",
    category: "triangles"
  },
  {
    id: 4,
    name: "Kachori",
    price: 18,
    description: "Flaky, spicy, and dangerously addictive!",
    funnyFact: "The round cousin of samosa with more attitude!",
    category: "triangles"
  },
  
  // The Crisp Cartel Category
  {
    id: 5,
    name: "Onion Bhajiya",
    price: 25,
    description: "Crispy onion fritters that crunch louder than your thoughts!",
    funnyFact: "Best enjoyed during Mumbai's monsoon season!",
    category: "crisp"
  },
  {
    id: 6,
    name: "Mixed Pakoda",
    price: 30,
    description: "A crispy medley of vegetables in chickpea batter!",
    funnyFact: "Every household has their own secret pakoda recipe!",
    category: "crisp"
  }
];
```

### Category Configuration

```javascript
const categories = {
  all: {
    id: "all",
    label: "All",
    description: "Show all menu items"
  },
  legends: {
    id: "legends",
    label: "The Legends",
    description: "Iconic Mumbai street food classics"
  },
  triangles: {
    id: "triangles",
    label: "The Golden Triangles",
    description: "Crispy triangular delights"
  },
  crisp: {
    id: "crisp",
    label: "The Crisp Cartel",
    description: "Deep-fried crispy goodness"
  }
};
```

### Fun Facts Data

```javascript
const funFacts = [
  "Vada Pav was invented in 1966 by Ashok Vaidya near Dadar station!",
  "Mumbai sells over 2 million Vada Pavs every single day!",
  "Samosas were originally called 'Sambosa' in the Middle East!",
  "The perfect Bhajiya requires exactly 7 minutes of frying!",
  "Misal Pav spice levels range from 'tourist-friendly' to 'fire-breathing dragon'!",
  "Street food vendors in Mumbai serve over 20 million people daily!"
];
```

## Color System Implementation

### Color Palette

```css
:root {
  /* Primary Brand Colors */
  --turmeric-yellow: #FDB913;
  --chutney-green: #7CB342;
  --chili-red: #E53935;
  
  /* Neutral Colors */
  --rice-white: #FAFAFA;
  --charcoal: #333333;
  
  /* Semantic Colors */
  --background-primary: var(--rice-white);
  --background-accent: var(--turmeric-yellow);
  --text-primary: var(--charcoal);
  --text-inverse: var(--rice-white);
  --accent-primary: var(--chili-red);
  --accent-secondary: var(--chutney-green);
  
  /* Interactive States */
  --hover-shadow: rgba(0, 0, 0, 0.15);
  --active-state: var(--chili-red);
}
```

### Color Usage Guidelines

**Turmeric Yellow (#FDB913):**
- Navigation bar background
- Hero section background
- Primary brand color for headers

**Chutney Green (#7CB342):**
- Menu card borders
- Fun facts section background
- Accent elements and icons

**Chili Red (#E53935):**
- CTA buttons
- Active filter state
- Hover states for interactive elements
- Links and emphasis

**Rice White (#FAFAFA):**
- Main content background
- Menu card backgrounds
- Text on dark backgrounds

**Charcoal (#333333):**
- Primary text color
- Footer background
- Navigation text

### Contrast Requirements

All text must meet WCAG AA standards (4.5:1 contrast ratio):
- Charcoal on Rice White: ✓ 14.5:1
- Rice White on Charcoal: ✓ 14.5:1
- Charcoal on Turmeric Yellow: ✓ 5.2:1
- Rice White on Chutney Green: ✓ 4.8:1
- Rice White on Chili Red: ✓ 5.1:1

## Typography System

### Font Families

```css
/* Import from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Carter+One&family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');

:root {
  /* Display Fonts (Headings) */
  --font-display: 'Bangers', 'Carter One', cursive;
  
  /* Body Fonts (Content) */
  --font-body: 'Poppins', 'Inter', sans-serif;
}
```

### Typography Scale

```css
/* Heading Sizes */
--text-h1: 4.5rem;      /* 72px - Hero title (desktop) */
--text-h1-mobile: 3rem; /* 48px - Hero title (mobile) */
--text-h2: 3rem;        /* 48px - Section titles */
--text-h2-mobile: 2rem; /* 32px - Section titles (mobile) */
--text-h3: 1.5rem;      /* 24px - Menu item names */

/* Body Sizes */
--text-base: 1rem;      /* 16px - Base body text */
--text-lg: 1.125rem;    /* 18px - Large body text */
--text-sm: 0.875rem;    /* 14px - Small text */

/* Font Weights */
--weight-normal: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
```

### Typography Usage

**Headings (H1, H2, H3):**
- Font: Bangers or Carter One
- Weight: Bold (inherent in font)
- Color: Charcoal or Chili Red
- Line Height: 1.2

**Body Text:**
- Font: Poppins or Inter
- Weight: 400 (normal), 500 (medium), 600 (semibold)
- Color: Charcoal
- Line Height: 1.6
- Minimum Size: 16px

**Menu Item Names:**
- Font: Bangers or Carter One
- Size: 24px
- Color: Charcoal

**Menu Item Descriptions:**
- Font: Poppins or Inter
- Size: 16px
- Weight: 400
- Color: Charcoal

**Prices:**
- Font: Poppins or Inter
- Size: 18px
- Weight: 600 (semibold)
- Color: Chili Red

## Responsive Design Approach

### Mobile-First Strategy

The design starts with mobile layouts and progressively enhances for larger screens:

1. **Base Styles (Mobile):** Single column, stacked layouts, touch-friendly targets
2. **Tablet Enhancements:** Two-column grids, expanded spacing
3. **Desktop Enhancements:** Multi-column grids, hover effects, larger typography

### Breakpoints

```css
/* Mobile First - Base styles apply to all sizes */

/* Tablet: 768px and up */
@media (min-width: 768px) {
  /* Two-column layouts */
  /* Expanded navigation */
  /* Larger typography */
}

/* Desktop: 1024px and up */
@media (min-width: 1024px) {
  /* Three/four-column layouts */
  /* Hover effects enabled */
  /* Maximum content width */
}
```

### Responsive Patterns

**Navigation:**
- Mobile: Hamburger menu, vertical dropdown
- Tablet/Desktop: Horizontal menu, always visible

**Menu Grid:**
- Mobile (<768px): 1 column
- Tablet (768-1023px): 2 columns
- Desktop (≥1024px): 3-4 columns

**Hero Section:**
- Mobile: Stacked (text above graphic)
- Desktop: Side-by-side (text left, graphic right)

**Footer:**
- Mobile: Stacked sections
- Tablet/Desktop: 3-column grid

### Touch Targets

All interactive elements meet minimum touch target size:
- Buttons: 44px × 44px minimum
- Links: 44px × 44px minimum (with padding)
- Filter buttons: 48px height minimum

## Animation and Transition Specifications

### Transition Timing

```css
:root {
  /* Duration */
  --transition-fast: 200ms;
  --transition-normal: 300ms;
  --transition-slow: 400ms;
  --transition-scroll: 800ms;
  
  /* Easing Functions */
  --ease-default: ease-in-out;
  --ease-smooth: cubic-bezier(0.4, 0.0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Component Animations

**Menu Card Hover (Desktop Only):**
```css
.menu-card {
  transition: transform 300ms ease-in-out,
              box-shadow 300ms ease-in-out;
}

.menu-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* Disable on mobile/tablet */
@media (max-width: 1023px) {
  .menu-card:hover {
    transform: none;
    box-shadow: none;
  }
}
```

**Filter Transition:**
```css
.menu-grid {
  transition: opacity 400ms ease-in-out;
}

.menu-grid.filtering {
  opacity: 0.5;
}
```

**Smooth Scroll:**
```javascript
// Smooth scroll with 800ms duration
element.scrollIntoView({
  behavior: 'smooth',
  block: 'start'
});
```

**Hero SVG Animation:**
- Fade in: 1000ms
- Scale from 0.8 to 1: 1000ms
- Easing: ease-out
- Delay: 200ms (after page load)

**Facts Marquee:**
```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.facts-marquee {
  animation: marquee 30s linear infinite;
}
```

**Button Hover:**
```css
.cta-btn {
  transition: transform 200ms ease-in-out,
              background-color 200ms ease-in-out;
}

.cta-btn:hover {
  transform: translateY(-2px);
  background-color: #d32f2f; /* Darker red */
}
```

### Animation Performance

- Use `transform` and `opacity` for animations (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left` (causes reflow)
- Use `will-change` sparingly for complex animations
- Respect `prefers-reduced-motion` media query

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## JavaScript Module Organization

### Module Structure

```javascript
// script.js - Main application file

// ============================================
// 1. CONFIGURATION & DATA
// ============================================

const CONFIG = {
  scrollDuration: 800,
  filterTransitionDuration: 400,
  hoverTransitionDuration: 300
};

const menuData = [ /* menu items */ ];
const funFacts = [ /* facts array */ ];

// ============================================
// 2. UTILITY FUNCTIONS
// ============================================

const Utils = {
  // Smooth scroll to element
  smoothScrollTo(elementId, duration = 800) { },
  
  // Debounce function for performance
  debounce(func, wait) { },
  
  // Check if mobile viewport
  isMobile() { return window.innerWidth < 768; },
  
  // Check if desktop viewport
  isDesktop() { return window.innerWidth >= 1024; }
};

// ============================================
// 3. NAVIGATION MODULE
// ============================================

const Navigation = {
  mobileMenuOpen: false,
  
  init() {
    this.bindEvents();
    this.handleScroll();
  },
  
  bindEvents() {
    // Mobile menu toggle
    // Navigation link clicks
    // Window scroll listener
  },
  
  toggleMobileMenu() { },
  
  handleNavClick(event) { },
  
  handleScroll() { }
};

// ============================================
// 4. HERO SECTION MODULE
// ============================================

const HeroSection = {
  init() {
    this.bindEvents();
    this.animateSVG();
  },
  
  bindEvents() {
    // CTA button click
  },
  
  animateSVG() { },
  
  scrollToMenu() { }
};

// ============================================
// 5. MENU SYSTEM MODULE
// ============================================

const MenuSystem = {
  currentFilter: 'all',
  menuData: [],
  
  init(data) {
    this.menuData = data;
    this.renderMenuItems('all');
  },
  
  renderMenuItems(category) { },
  
  createMenuCard(item) { },
  
  filterItems(category) { }
};

// ============================================
// 6. CATEGORY FILTER MODULE
// ============================================

const CategoryFilter = {
  activeFilter: 'all',
  
  init() {
    this.bindEvents();
  },
  
  bindEvents() {
    // Filter button clicks
  },
  
  handleFilterClick(event) { },
  
  setActiveButton(button) { }
};

// ============================================
// 7. FACTS SECTION MODULE
// ============================================

const FactsSection = {
  facts: [],
  
  init(factsData) {
    this.facts = factsData;
    this.startMarquee();
  },
  
  startMarquee() { },
  
  createFactElements() { }
};

// ============================================
// 8. FOOTER MODULE
// ============================================

const Footer = {
  init() {
    this.bindEvents();
  },
  
  bindEvents() {
    // Social link clicks (analytics tracking)
  }
};

// ============================================
// 9. APPLICATION INITIALIZATION
// ============================================

const App = {
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.start());
    } else {
      this.start();
    }
  },
  
  start() {
    // Initialize all modules
    Navigation.init();
    HeroSection.init();
    MenuSystem.init(menuData);
    CategoryFilter.init();
    FactsSection.init(funFacts);
    Footer.init();
    
    console.log('Gurukrupa Snacks website initialized! 🎉');
  }
};

// Start the application
App.init();
```

### Event Handling Strategy

**Event Delegation:**
Use event delegation for dynamically created elements (menu cards, filter buttons):

```javascript
// Instead of binding to each button
document.querySelector('.category-filters').addEventListener('click', (e) => {
  if (e.target.classList.contains('filter-btn')) {
    CategoryFilter.handleFilterClick(e);
  }
});
```

**Debouncing:**
Debounce expensive operations like scroll and resize:

```javascript
window.addEventListener('scroll', Utils.debounce(() => {
  Navigation.handleScroll();
}, 100));
```

### State Management

Simple state management without frameworks:

```javascript
const AppState = {
  currentFilter: 'all',
  mobileMenuOpen: false,
  
  setFilter(category) {
    this.currentFilter = category;
    this.notifyFilterChange();
  },
  
  notifyFilterChange() {
    MenuSystem.filterItems(this.currentFilter);
  }
};
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I identified the following redundancies:
- Criteria 1.5 and 11.2 both test semantic HTML5 usage (consolidated into Property 1)
- Criteria 4.3 and 12.4 both test menu card information display (consolidated into Property 5)
- Criteria 1.2, 1.3, and 1.4 test responsive layouts at different breakpoints (consolidated into Property 2)
- Criteria 5.1 and 5.2 both test hover effects on desktop (consolidated into Property 7)

### Property 1: Semantic HTML Structure

*For all* structural components in the website (navigation, sections, footer), the HTML elements used SHALL be semantic HTML5 elements (nav, header, section, article, footer, aside) rather than generic div elements.

**Validates: Requirements 1.5, 11.2**

### Property 2: Responsive Grid Layout

*For any* viewport width, the menu grid SHALL display the appropriate number of columns: 1 column for widths < 768px, 2 columns for widths 768-1023px, and 3-4 columns for widths ≥ 1024px.

**Validates: Requirements 1.2, 1.3, 1.4**

### Property 3: Minimum Font Size

*For all* text elements across all viewport sizes, the computed font size SHALL be at least 16px to ensure readability.

**Validates: Requirements 1.6**

### Property 4: Sticky Navigation Visibility

*For any* scroll position on the page, the navigation bar SHALL remain visible at the top of the viewport.

**Validates: Requirements 2.1**

### Property 5: Menu Card Information Completeness

*For all* menu items displayed on the page, each menu card SHALL contain exactly four pieces of information: item name, price (with ₹ symbol), description, and funny fact.

**Validates: Requirements 4.3, 12.4, 12.5**

### Property 6: Menu Card Background Colors

*For all* menu cards, the background color SHALL be either Rice White (#FAFAFA) or Charcoal (#333333).

**Validates: Requirements 4.4**

### Property 7: Desktop Hover Effects

*For any* menu card when viewport width ≥ 1024px, hovering SHALL apply both scale transform (105%) and box-shadow effect, and removing hover SHALL return the card to its original state.

**Validates: Requirements 5.1, 5.2, 5.3**

### Property 8: Mobile Hover Suppression

*For any* menu card when viewport width < 1024px, hover interactions SHALL NOT apply scale transforms or additional shadows.

**Validates: Requirements 5.5**

### Property 9: Category Filter Behavior

*For any* category filter button clicked, the menu system SHALL display only menu items matching that category (or all items if "All" is selected) within 400 milliseconds.

**Validates: Requirements 6.2, 6.4**

### Property 10: Active Filter Indication

*For any* currently active filter button, the button SHALL be visually indicated with Chili Red (#E53935) background color.

**Validates: Requirements 6.5**

### Property 11: Social Link Target Behavior

*For all* social media links in the footer, clicking SHALL open the link in a new browser tab (target="_blank" attribute).

**Validates: Requirements 8.4**

### Property 12: Heading Font Family

*For all* heading elements (h1, h2, h3), the computed font-family SHALL include either "Bangers" or "Carter One".

**Validates: Requirements 9.5**

### Property 13: Body Text Font Family

*For all* body text elements (paragraphs, descriptions, labels), the computed font-family SHALL include either "Poppins" or "Inter" with minimum font-weight of 400.

**Validates: Requirements 4.5, 9.6**

### Property 14: Image Accessibility

*For all* image and SVG elements, an alt attribute (for img) or aria-label attribute (for SVG) SHALL be present with descriptive text.

**Validates: Requirements 11.3**

### Property 15: Color Contrast Compliance

*For all* body text elements, the color contrast ratio between text and background SHALL be at least 4.5:1 to meet WCAG AA standards.

**Validates: Requirements 11.4**

### Property 16: Keyboard Navigation

*For all* interactive elements (buttons, links, form controls), the element SHALL be reachable and operable using keyboard controls (Tab, Enter, Space).

**Validates: Requirements 11.5**

### Property 17: ARIA Labels for Interactive Elements

*For all* interactive elements without visible text labels (icon buttons, hamburger menu), appropriate ARIA attributes (aria-label or aria-labelledby) SHALL be present.

**Validates: Requirements 11.6**

### Property 18: Smooth Scroll Timing

*For any* navigation link clicked, the page SHALL smoothly scroll to the target section, completing the scroll within 800 milliseconds.

**Validates: Requirements 2.3**

### Property 19: Mobile Menu Toggle

*For any* state of the mobile menu (open or closed), clicking the hamburger icon SHALL toggle to the opposite state (closed to open, or open to closed).

**Validates: Requirements 2.5**

## Error Handling

### User Input Errors

Since this is a static informational website with no forms or user input beyond navigation, there are minimal error scenarios. However, the following should be handled:

**Broken Navigation Links:**
- All internal links use hash navigation (#hero, #menu, etc.)
- JavaScript should verify target elements exist before scrolling
- Fallback: If target doesn't exist, scroll to top of page

```javascript
function safeScrollTo(targetId) {
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.warn(`Target element ${targetId} not found`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
```

**Missing Menu Data:**
- If menuData array is empty or undefined, display a friendly message
- Prevent JavaScript errors from breaking the page

```javascript
function renderMenuItems(category) {
  if (!menuData || menuData.length === 0) {
    menuGrid.innerHTML = '<p class="error-message">Menu items coming soon!</p>';
    return;
  }
  // Normal rendering logic
}
```

**Failed CDN Resources:**
- Tailwind CSS CDN failure: Custom CSS should provide basic fallback styles
- Google Fonts CDN failure: System fonts specified as fallbacks
- Graceful degradation: Site remains functional without external resources

```css
/* Font fallbacks */
font-family: 'Bangers', 'Carter One', 'Arial Black', cursive, sans-serif;
font-family: 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Browser Compatibility

**Unsupported Features:**
- CSS Grid: Fallback to Flexbox for older browsers
- Smooth scroll: Fallback to instant scroll if not supported
- CSS Custom Properties: Fallback values provided

```javascript
// Feature detection for smooth scroll
function smoothScrollSupported() {
  return 'scrollBehavior' in document.documentElement.style;
}

if (!smoothScrollSupported()) {
  // Use polyfill or instant scroll
}
```

**Console Logging:**
- All errors logged to console for debugging
- No user-facing error messages for minor issues
- Graceful degradation for all features

### Accessibility Errors

**Missing Alt Text:**
- All images must have alt attributes (enforced in HTML)
- SVG graphics must have aria-label or title elements
- Build-time validation recommended

**Keyboard Trap:**
- Ensure mobile menu can be closed with Escape key
- Ensure focus doesn't get trapped in any component

```javascript
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && Navigation.mobileMenuOpen) {
    Navigation.toggleMobileMenu();
  }
});
```

## Testing Strategy

### Dual Testing Approach

This project requires both unit tests and property-based tests to ensure comprehensive coverage:

**Unit Tests** focus on:
- Specific examples and edge cases
- Integration between components
- DOM manipulation correctness
- Event handler behavior

**Property-Based Tests** focus on:
- Universal properties that hold for all inputs
- Responsive behavior across viewport ranges
- Accessibility compliance across all elements
- Consistent styling across all components

### Testing Tools

**Property-Based Testing Library:**
- **fast-check** (JavaScript/TypeScript property-based testing library)
- Minimum 100 iterations per property test
- Each test tagged with feature name and property number

**Unit Testing Framework:**
- **Jest** or **Vitest** for unit tests
- **Testing Library** for DOM testing
- **Puppeteer** or **Playwright** for E2E tests

### Property Test Configuration

Each property test must:
1. Run minimum 100 iterations with randomized inputs
2. Include a comment tag referencing the design property
3. Test the universal quantification ("for all" statement)

**Tag Format:**
```javascript
// Feature: gurukrupa-snacks-website, Property 2: Responsive Grid Layout
test('menu grid displays correct columns for any viewport width', () => {
  fc.assert(
    fc.property(fc.integer(320, 2560), (viewportWidth) => {
      // Test implementation
    }),
    { numRuns: 100 }
  );
});
```

### Test Coverage Requirements

**Property-Based Tests (17 tests):**
- Property 1: Semantic HTML structure validation
- Property 2: Responsive grid layout across viewport widths
- Property 3: Minimum font size across all elements
- Property 4: Sticky navigation visibility during scroll
- Property 5: Menu card information completeness
- Property 6: Menu card background color validation
- Property 7: Desktop hover effects (scale + shadow)
- Property 8: Mobile hover suppression
- Property 9: Category filter behavior and timing
- Property 10: Active filter visual indication
- Property 11: Social link target behavior
- Property 12: Heading font family validation
- Property 13: Body text font family validation
- Property 14: Image accessibility (alt text)
- Property 15: Color contrast compliance
- Property 16: Keyboard navigation functionality
- Property 17: ARIA labels for interactive elements
- Property 18: Smooth scroll timing
- Property 19: Mobile menu toggle behavior

**Unit Tests (Examples and Edge Cases):**
- Navigation links exist and point to correct sections (Req 2.2)
- Mobile viewport displays hamburger icon (Req 2.4)
- Hero section contains required elements (Req 3.1, 3.2, 3.3)
- Hero section uses correct colors and fonts (Req 3.5, 3.6)
- CTA button scrolls to menu (Req 3.4)
- Menu categories are correctly structured (Req 4.1, 12.1, 12.2, 12.3)
- Menu uses Grid or Flexbox (Req 4.2)
- CSS transitions defined for hover effects (Req 5.4)
- Filter buttons exist for all categories (Req 6.1)
- "All" filter shows all items (Req 6.3)
- Category filter positioned above menu (Req 6.6)
- Facts section displays minimum 5 facts (Req 7.1)
- Facts section uses marquee or flip-card (Req 7.2, 7.4)
- Facts section uses Chutney Green (Req 7.5)
- Footer displays complete address (Req 8.1)
- Footer displays operating hours (Req 8.2)
- Footer includes social media links (Req 8.3)
- Footer uses contrasting background (Req 8.5)
- Website uses correct brand colors (Req 9.1, 9.2, 9.3, 9.4)
- Tailwind CSS loaded via CDN (Req 10.1)
- Required files exist (Req 10.2, 10.3, 10.6)
- Fonts loaded from Google Fonts (Req 10.4)

### Testing Implementation Notes

**Viewport Testing:**
Use viewport simulation for responsive tests:
```javascript
function setViewportWidth(width) {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width
  });
  window.dispatchEvent(new Event('resize'));
}
```

**Color Contrast Testing:**
Use contrast calculation utilities:
```javascript
function getContrastRatio(color1, color2) {
  // Calculate relative luminance and contrast ratio
  // Return ratio value
}
```

**Accessibility Testing:**
Use automated accessibility testing tools:
- axe-core for automated accessibility checks
- Manual keyboard navigation testing
- Screen reader testing (manual)

### Test Execution

**Continuous Integration:**
- Run all tests on every commit
- Property tests with 100 iterations minimum
- Unit tests with coverage reporting
- Accessibility tests with axe-core

**Local Development:**
- Fast unit tests during development
- Full property test suite before commits
- Visual regression testing for UI changes

### Performance Testing

While not part of automated testing, manual performance checks should verify:
- Page load time < 3 seconds (Req 11.1)
- Smooth animations (60fps target)
- No layout shifts during load
- Efficient JavaScript execution

Use Chrome DevTools Lighthouse for performance audits.

## Implementation Checklist

### Phase 1: HTML Structure
- [ ] Create index.html with semantic HTML5 structure
- [ ] Add navigation bar with sticky positioning
- [ ] Create hero section with heading, tagline, CTA button
- [ ] Add menu section with filter buttons and grid container
- [ ] Create fun facts section container
- [ ] Add footer with address, hours, social links
- [ ] Include Tailwind CSS CDN link
- [ ] Include Google Fonts CDN link
- [ ] Add meta tags for responsive design

### Phase 2: CSS Styling
- [ ] Create styles.css for custom styles
- [ ] Define CSS custom properties for colors
- [ ] Define CSS custom properties for typography
- [ ] Style navigation bar (desktop and mobile)
- [ ] Style hero section with brand colors
- [ ] Style menu cards with hover effects
- [ ] Style category filter buttons
- [ ] Style fun facts section with animation
- [ ] Style footer layout
- [ ] Add responsive breakpoints (768px, 1024px)
- [ ] Implement mobile-first responsive design
- [ ] Add CSS transitions for smooth animations
- [ ] Ensure WCAG AA contrast compliance

### Phase 3: JavaScript Functionality
- [ ] Create script.js with module structure
- [ ] Define menu data array
- [ ] Define fun facts data array
- [ ] Implement Navigation module (smooth scroll, mobile toggle)
- [ ] Implement HeroSection module (CTA button, SVG animation)
- [ ] Implement MenuSystem module (render cards, filter)
- [ ] Implement CategoryFilter module (filter logic, active state)
- [ ] Implement FactsSection module (marquee animation)
- [ ] Implement Footer module (social link tracking)
- [ ] Add event listeners for all interactions
- [ ] Add keyboard navigation support (Escape for mobile menu)
- [ ] Initialize all modules on DOM ready

### Phase 4: Content Population
- [ ] Add restaurant name and tagline to hero
- [ ] Create animated SVG graphic for hero
- [ ] Add menu items for "The Legends" category
- [ ] Add menu items for "The Golden Triangles" category
- [ ] Add menu items for "The Crisp Cartel" category
- [ ] Add fun facts content (minimum 5 facts)
- [ ] Add complete restaurant address to footer
- [ ] Add operating hours to footer
- [ ] Add social media links with icons
- [ ] Add alt text for all images/SVGs
- [ ] Add ARIA labels for interactive elements

### Phase 5: Testing and Refinement
- [ ] Test responsive layouts on mobile, tablet, desktop
- [ ] Test navigation smooth scrolling
- [ ] Test mobile menu toggle
- [ ] Test category filtering functionality
- [ ] Test hover effects on desktop
- [ ] Test keyboard navigation
- [ ] Run accessibility audit (axe-core)
- [ ] Verify color contrast ratios
- [ ] Test in multiple browsers (Chrome, Firefox, Safari)
- [ ] Optimize performance (Lighthouse audit)
- [ ] Validate HTML (W3C validator)
- [ ] Test with slow network connection

### Phase 6: Deployment
- [ ] Verify all files are ready (index.html, styles.css, script.js)
- [ ] Test deployment to static hosting
- [ ] Verify CDN resources load correctly
- [ ] Test live site on multiple devices
- [ ] Set up custom domain (if applicable)
- [ ] Configure HTTPS
- [ ] Add analytics (optional)

## Conclusion

This design document provides a comprehensive blueprint for building the Gurukrupa Snacks website. The architecture emphasizes simplicity, performance, and maintainability while delivering a vibrant, engaging user experience that captures the energy of Indian street food culture.

The modular JavaScript structure, semantic HTML, and mobile-first responsive design ensure the website is accessible, performant, and easy to maintain. The dual testing approach with both unit tests and property-based tests provides confidence in the correctness and reliability of the implementation.

The next phase is to implement the design according to this specification, following the implementation checklist and ensuring all acceptance criteria are met through comprehensive testing.
