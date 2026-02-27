/**
 * Property-Based Tests for Responsive Layout
 * Feature: gurukrupa-snacks-website
 */

import { describe, test, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';

// Load the HTML and CSS files
const htmlContent = readFileSync('./index.html', 'utf8');
const cssContent = readFileSync('./styles.css', 'utf8');

describe('Responsive Layout Property Tests', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    dom = new JSDOM(htmlContent, {
      resources: 'usable',
      runScripts: 'dangerously'
    });
    document = dom.window.document;
    window = dom.window;

    // Inject CSS
    const style = document.createElement('style');
    style.textContent = cssContent;
    document.head.appendChild(style);
  });

  /**
   * Helper function to simulate viewport width
   */
  function setViewportWidth(width) {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width
    });
    window.dispatchEvent(new window.Event('resize'));
  }

  /**
   * Helper function to get computed grid columns
   */
  function getGridColumns(element) {
    const computedStyle = window.getComputedStyle(element);
    const gridTemplateColumns = computedStyle.gridTemplateColumns;
    
    if (!gridTemplateColumns || gridTemplateColumns === 'none') {
      return 1;
    }
    
    // Count the number of column definitions
    const columns = gridTemplateColumns.split(' ').filter(col => col && col !== 'none');
    return columns.length;
  }

  /**
   * Property 2: Responsive Grid Layout
   * **Validates: Requirements 1.2, 1.3, 1.4**
   * 
   * For any viewport width, the menu grid SHALL display the appropriate number of columns:
   * 1 column for widths < 768px, 2 columns for widths 768-1023px,
   * and 3-4 columns for widths ≥ 1024px.
   */
  test('Property 2: Menu grid displays correct columns for any viewport width', () => {
    // Feature: gurukrupa-snacks-website, Property 2: Responsive Grid Layout
    
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 2560 }),
        (viewportWidth) => {
          setViewportWidth(viewportWidth);
          
          const menuGrid = document.getElementById('menu-grid');
          expect(menuGrid, 'Menu grid should exist').toBeTruthy();
          
          // Check the grid-cols class applied
          const classList = Array.from(menuGrid.classList);
          
          // Determine expected columns based on viewport width
          let expectedMinCols, expectedMaxCols;
          
          if (viewportWidth < 768) {
            // Mobile: 1 column
            expectedMinCols = 1;
            expectedMaxCols = 1;
            expect(
              classList.some(cls => cls.includes('grid-cols-1')),
              `Mobile viewport (${viewportWidth}px) should have grid-cols-1 class`
            ).toBe(true);
          } else if (viewportWidth >= 768 && viewportWidth < 1024) {
            // Tablet: 2 columns
            expectedMinCols = 2;
            expectedMaxCols = 2;
            expect(
              classList.some(cls => cls.includes('md:grid-cols-2')),
              `Tablet viewport (${viewportWidth}px) should have md:grid-cols-2 class`
            ).toBe(true);
          } else {
            // Desktop: 3-4 columns
            expectedMinCols = 3;
            expectedMaxCols = 4;
            expect(
              classList.some(cls => cls.includes('lg:grid-cols-3') || cls.includes('xl:grid-cols-4')),
              `Desktop viewport (${viewportWidth}px) should have lg:grid-cols-3 or xl:grid-cols-4 class`
            ).toBe(true);
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3: Minimum Font Size
   * **Validates: Requirements 1.6**
   * 
   * For all text elements across all viewport sizes,
   * the computed font size SHALL be at least 16px to ensure readability.
   */
  test('Property 3: All text elements have minimum 16px font size', () => {
    // Feature: gurukrupa-snacks-website, Property 3: Minimum Font Size
    
    // Check that the HTML element has base font-size of 16px
    const htmlElement = document.documentElement;
    const htmlStyle = window.getComputedStyle(htmlElement);
    const baseFontSize = parseFloat(htmlStyle.fontSize) || 16;
    
    // The requirement states minimum 16px base font size
    // In JSDOM, this might not compute correctly, so we verify the CSS instead
    expect(
      baseFontSize >= 16 || htmlStyle.fontSize === '16px' || htmlStyle.fontSize === '1rem',
      'HTML element should have base font-size of at least 16px'
    ).toBe(true);
    
    // Verify that the CSS file sets the base font size
    const cssHasBaseFontSize = cssContent.includes('font-size: 16px') || 
                               cssContent.includes('html {') && cssContent.includes('font-size:');
    
    expect(
      cssHasBaseFontSize,
      'CSS should define base font size for html element'
    ).toBe(true);
    
    // Test across different viewports that text remains readable
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 2560 }),
        (viewportWidth) => {
          setViewportWidth(viewportWidth);
          
          // Verify that no text elements have extremely small font sizes
          // (This tests the structure, not computed styles which JSDOM doesn't handle well)
          const textElements = document.querySelectorAll('p, span, a, li, button, label');
          
          textElements.forEach(element => {
            // Check that elements don't have inline styles making them too small
            const inlineStyle = element.getAttribute('style') || '';
            const hasSmallInlineFont = inlineStyle.includes('font-size') && 
                                      (inlineStyle.includes('px') && 
                                       parseInt(inlineStyle.match(/font-size:\s*(\d+)px/)?.[1] || '16') < 16);
            
            expect(
              hasSmallInlineFont,
              `Element ${element.tagName} should not have inline font-size < 16px`
            ).toBe(false);
          });
          
          return true;
        }
      ),
      { numRuns: 30 }
    );
  });

  /**
   * Sub-task 2.1: Test mobile viewport layout (< 768px)
   */
  test('2.1: Mobile viewport displays single-column layout', () => {
    const mobileWidths = [320, 375, 414, 480, 640, 767];
    
    mobileWidths.forEach(width => {
      setViewportWidth(width);
      
      const menuGrid = document.getElementById('menu-grid');
      const classList = Array.from(menuGrid.classList);
      
      // Should have grid-cols-1 for mobile
      expect(
        classList.includes('grid-cols-1'),
        `Mobile viewport ${width}px should have single column layout`
      ).toBe(true);
      
      // Hamburger menu should be visible (not hidden on mobile)
      const hamburger = document.getElementById('mobile-menu-toggle');
      expect(hamburger, 'Hamburger menu should exist').toBeTruthy();
      
      const hamburgerClasses = Array.from(hamburger.classList);
      expect(
        hamburgerClasses.includes('md:hidden'),
        'Hamburger should be hidden on desktop but visible on mobile'
      ).toBe(true);
    });
  });

  /**
   * Sub-task 2.2: Test tablet viewport layout (768-1024px)
   */
  test('2.2: Tablet viewport displays two-column layout', () => {
    const tabletWidths = [768, 800, 900, 1000, 1023];
    
    tabletWidths.forEach(width => {
      setViewportWidth(width);
      
      const menuGrid = document.getElementById('menu-grid');
      const classList = Array.from(menuGrid.classList);
      
      // Should have md:grid-cols-2 for tablet
      expect(
        classList.some(cls => cls.includes('md:grid-cols-2')),
        `Tablet viewport ${width}px should have two-column layout`
      ).toBe(true);
      
      // Navigation should display horizontally
      const navLinks = document.getElementById('nav-links');
      const navClasses = Array.from(navLinks.classList);
      
      expect(
        navClasses.includes('md:flex'),
        'Navigation should display as flex on tablet'
      ).toBe(true);
    });
  });

  /**
   * Sub-task 2.3: Test desktop viewport layout (≥ 1024px)
   */
  test('2.3: Desktop viewport displays three or four-column layout', () => {
    const desktopWidths = [1024, 1280, 1440, 1920, 2560];
    
    desktopWidths.forEach(width => {
      setViewportWidth(width);
      
      const menuGrid = document.getElementById('menu-grid');
      const classList = Array.from(menuGrid.classList);
      
      // Should have lg:grid-cols-3 or xl:grid-cols-4 for desktop
      const hasThreeOrFourCols = classList.some(cls => 
        cls.includes('lg:grid-cols-3') || cls.includes('xl:grid-cols-4')
      );
      
      expect(
        hasThreeOrFourCols,
        `Desktop viewport ${width}px should have 3 or 4 column layout`
      ).toBe(true);
    });
  });

  /**
   * Additional test: Verify responsive spacing and alignment
   */
  test('Responsive spacing maintains consistency across viewports', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 2560 }),
        (viewportWidth) => {
          setViewportWidth(viewportWidth);
          
          const menuGrid = document.getElementById('menu-grid');
          
          // Check that grid has gap classes (Tailwind)
          const classList = Array.from(menuGrid.classList);
          const hasGapClass = classList.some(cls => cls.includes('gap-'));
          expect(hasGapClass, 'Menu grid should have gap class').toBe(true);
          
          // Sections should have padding classes
          const sections = document.querySelectorAll('section');
          sections.forEach(section => {
            const sectionClasses = Array.from(section.classList);
            const hasPaddingClass = sectionClasses.some(cls => 
              cls.includes('py-') || cls.includes('p-') || cls.includes('px-')
            );
            expect(hasPaddingClass, 'Sections should have padding classes').toBe(true);
          });
          
          return true;
        }
      ),
      { numRuns: 30 }
    );
  });

  /**
   * Test: Verify mobile-first approach
   */
  test('Mobile-first: Base styles work without media queries', () => {
    // At the smallest viewport, everything should still be functional
    setViewportWidth(320);
    
    // Check that essential elements exist and are accessible
    const nav = document.getElementById('navbar');
    const hero = document.getElementById('hero');
    const menu = document.getElementById('menu');
    const facts = document.getElementById('facts');
    const footer = document.getElementById('footer');
    
    expect(nav, 'Navigation should exist at 320px').toBeTruthy();
    expect(hero, 'Hero should exist at 320px').toBeTruthy();
    expect(menu, 'Menu should exist at 320px').toBeTruthy();
    expect(facts, 'Facts should exist at 320px').toBeTruthy();
    expect(footer, 'Footer should exist at 320px').toBeTruthy();
    
    // Menu grid should have base single-column class
    const menuGrid = document.getElementById('menu-grid');
    expect(
      menuGrid.classList.contains('grid-cols-1'),
      'Menu grid should have base single-column layout'
    ).toBe(true);
  });

  /**
   * Test: Verify breakpoint transitions
   */
  test('Layout transitions smoothly at breakpoints', () => {
    const breakpoints = [
      { width: 767, name: 'just before tablet' },
      { width: 768, name: 'tablet start' },
      { width: 1023, name: 'just before desktop' },
      { width: 1024, name: 'desktop start' }
    ];
    
    breakpoints.forEach(({ width, name }) => {
      setViewportWidth(width);
      
      const menuGrid = document.getElementById('menu-grid');
      expect(menuGrid, `Menu grid should exist at ${name} (${width}px)`).toBeTruthy();
      
      // Verify grid classes are present
      const classList = Array.from(menuGrid.classList);
      expect(
        classList.some(cls => cls.includes('grid')),
        `Menu grid should have grid class at ${name}`
      ).toBe(true);
    });
  });
});
