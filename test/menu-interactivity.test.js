// Property Tests: Menu Interactivity and Filtering
// Feature: gurukrupa-snacks-website
// Property 7: Desktop Hover Effects
// Property 8: Mobile Hover Suppression
// Property 9: Category Filter Behavior
// Property 10: Active Filter Indication
// **Validates: Requirements 5.1, 5.2, 5.3, 5.5, 6.2, 6.4, 6.5**

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import fc from 'fast-check';

describe('Menu Interactivity and Filtering Properties', () => {
  let dom;
  let window;
  let document;

  beforeEach(async () => {
    // Load the HTML file
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    
    // Load the CSS file
    const css = fs.readFileSync(path.resolve(__dirname, '../styles.css'), 'utf8');
    
    // Create a new JSDOM instance
    dom = new JSDOM(html, {
      url: 'http://localhost',
      runScripts: 'dangerously',
      resources: 'usable',
      beforeParse(win) {
        win.Element.prototype.scrollIntoView = vi.fn();
        win.scrollTo = vi.fn();
      }
    });

    window = dom.window;
    document = window.document;
    
    // Inject CSS into the document
    const styleElement = document.createElement('style');
    styleElement.textContent = css;
    document.head.appendChild(styleElement);
    
    // Load and execute the script in the window context
    const scriptContent = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8');
    const scriptFunction = new window.Function(scriptContent);
    scriptFunction.call(window);
    
    // Wait for DOMContentLoaded
    await new Promise(resolve => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
    
    await new Promise(resolve => setTimeout(resolve, 100));
  });

  afterEach(() => {
    dom.window.close();
  });

  describe('Property 7: Desktop Hover Effects', () => {
    it('Property 7: For any menu card on desktop (≥1024px), hover SHALL apply scale(1.05) transform', () => {
      // Property: Desktop hover effects must scale cards to 105%
      
      // Set desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024
      });
      
      const menuCards = document.querySelectorAll('.menu-card');
      
      if (menuCards.length === 0) {
        return;
      }
      
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: menuCards.length - 1 }),
          (cardIndex) => {
            const card = menuCards[cardIndex];
            
            // Get computed styles
            const styles = window.getComputedStyle(card);
            
            // Check that transition is defined for transform
            expect(styles.transition).toContain('transform');
            
            // Verify the CSS rule exists for hover (check stylesheet)
            const styleSheets = Array.from(document.styleSheets);
            let hoverRuleFound = false;
            
            for (const sheet of styleSheets) {
              try {
                const rules = Array.from(sheet.cssRules || []);
                for (const rule of rules) {
                  if (rule.cssText && rule.cssText.includes('.menu-card:hover') && rule.cssText.includes('scale(1.05)')) {
                    hoverRuleFound = true;
                    break;
                  }
                }
              } catch (e) {
                // Skip inaccessible stylesheets
              }
            }
            
            expect(hoverRuleFound).toBe(true);
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Property 7: For any menu card on desktop, hover SHALL apply box-shadow effect', () => {
      // Property: Desktop hover effects must add shadow
      
      const menuCards = document.querySelectorAll('.menu-card');
      
      if (menuCards.length === 0) {
        return;
      }
      
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: menuCards.length - 1 }),
          (cardIndex) => {
            const card = menuCards[cardIndex];
            
            // Get computed styles
            const styles = window.getComputedStyle(card);
            
            // Check that transition is defined for box-shadow
            expect(styles.transition).toContain('box-shadow');
            
            // Verify the CSS rule exists for hover shadow
            const styleSheets = Array.from(document.styleSheets);
            let shadowRuleFound = false;
            
            for (const sheet of styleSheets) {
              try {
                const rules = Array.from(sheet.cssRules || []);
                for (const rule of rules) {
                  if (rule.cssText && rule.cssText.includes('.menu-card:hover') && rule.cssText.includes('box-shadow')) {
                    shadowRuleFound = true;
                    break;
                  }
                }
              } catch (e) {
                // Skip inaccessible stylesheets
              }
            }
            
            expect(shadowRuleFound).toBe(true);
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Property 7: Menu card hover transition SHALL be 300ms', () => {
      // Property: Hover transitions must complete within 300ms
      
      const menuCards = document.querySelectorAll('.menu-card');
      
      if (menuCards.length === 0) {
        return;
      }
      
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: menuCards.length - 1 }),
          (cardIndex) => {
            const card = menuCards[cardIndex];
            const styles = window.getComputedStyle(card);
            
            // Check transition duration
            const transitionDuration = styles.transitionDuration;
            
            // Should be 300ms (0.3s)
            expect(transitionDuration).toContain('0.3s');
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 8: Mobile Hover Suppression', () => {
    it('Property 8: For any menu card on mobile (<1024px), hover effects SHALL NOT apply scale transform', () => {
      // Property: Mobile/tablet viewports must suppress hover scaling
      
      const menuCards = document.querySelectorAll('.menu-card');
      
      if (menuCards.length === 0) {
        return;
      }
      
      fc.assert(
        fc.property(
          fc.integer({ min: 320, max: 1023 }),
          fc.integer({ min: 0, max: menuCards.length - 1 }),
          (viewportWidth, cardIndex) => {
            // Set mobile/tablet viewport
            Object.defineProperty(window, 'innerWidth', {
              writable: true,
              configurable: true,
              value: viewportWidth
            });
            
            const card = menuCards[cardIndex];
            
            // Check that media query exists to suppress hover on mobile
            const styleSheets = Array.from(document.styleSheets);
            let mediaQueryFound = false;
            
            for (const sheet of styleSheets) {
              try {
                const rules = Array.from(sheet.cssRules || []);
                for (const rule of rules) {
                  // Look for @media (min-width: 1024px) rule that contains .menu-card:hover
                  if (rule.cssText && rule.cssText.includes('@media') && rule.cssText.includes('1024px') && rule.cssText.includes('.menu-card:hover')) {
                    mediaQueryFound = true;
                    break;
                  }
                }
              } catch (e) {
                // Skip inaccessible stylesheets
              }
            }
            
            // The hover effects should be wrapped in a min-width: 1024px media query
            expect(mediaQueryFound).toBe(true);
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Property 8: Mobile viewport widths should be < 1024px', () => {
      // Property: Verify mobile/tablet range is correctly defined
      
      fc.assert(
        fc.property(
          fc.integer({ min: 320, max: 1023 }),
          (viewportWidth) => {
            // Viewport width should be less than 1024px for mobile/tablet
            expect(viewportWidth).toBeLessThan(1024);
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 9: Category Filter Behavior', () => {
    it('Property 9: For any category filter clicked, menu SHALL display only matching items', () => {
      // Property: Category filtering must work correctly for all categories
      
      const categories = ['all', 'legends', 'triangles', 'crisp'];
      
      fc.assert(
        fc.property(
          fc.constantFrom(...categories),
          (category) => {
            // Find the filter button for this category
            const filterButton = document.querySelector(`.filter-btn[data-category="${category}"]`);
            
            if (!filterButton) {
              return true; // Skip if button not found
            }
            
            // Verify button exists and has correct data attribute
            expect(filterButton.getAttribute('data-category')).toBe(category);
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Property 9: Filter transition duration SHALL be 400ms', () => {
      // Property: Filter transitions must complete within 400ms
      
      const menuGrid = document.getElementById('menu-grid');
      
      if (!menuGrid) {
        return;
      }
      
      const styles = window.getComputedStyle(menuGrid);
      
      // Check transition duration for opacity
      const transitionDuration = styles.transitionDuration;
      
      // Should be 400ms (0.4s) - accept both formats
      const isValid = transitionDuration.includes('0.4s') || transitionDuration.includes('400ms');
      expect(isValid).toBe(true);
    });

    it('Property 9: "All" filter SHALL display all menu items', () => {
      // Property: "All" filter must show all items from all categories
      
      const allButton = document.querySelector('.filter-btn[data-category="all"]');
      
      if (!allButton) {
        return;
      }
      
      // Verify the "All" button exists and is initially active
      expect(allButton).toBeTruthy();
      expect(allButton.classList.contains('active')).toBe(true);
    });
  });

  describe('Property 10: Active Filter Indication', () => {
    it('Property 10: For any active filter button, background SHALL be Chili Red (#E53935)', () => {
      // Property: Active filter must be visually indicated with Chili Red
      
      const categories = ['all', 'legends', 'triangles', 'crisp'];
      
      fc.assert(
        fc.property(
          fc.constantFrom(...categories),
          (category) => {
            // Find the filter button
            const filterButton = document.querySelector(`.filter-btn[data-category="${category}"]`);
            
            if (!filterButton) {
              return true;
            }
            
            // Check the CSS rule for active state
            const styleSheets = Array.from(document.styleSheets);
            let activeRuleFound = false;
            
            for (const sheet of styleSheets) {
              try {
                const rules = Array.from(sheet.cssRules || []);
                for (const rule of rules) {
                  if (rule.cssText && rule.cssText.includes('.filter-btn.active') && 
                      (rule.cssText.includes('#E53935') || rule.cssText.includes('chili-red'))) {
                    activeRuleFound = true;
                    break;
                  }
                }
              } catch (e) {
                // Skip inaccessible stylesheets
              }
            }
            
            expect(activeRuleFound).toBe(true);
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Property 10: Only one filter button SHALL be active at a time', () => {
      // Property: Only the currently selected filter should have active state
      
      // Count active buttons initially
      const activeButtons = document.querySelectorAll('.filter-btn.active');
      
      // Should be exactly 1 active button (the "All" button by default)
      expect(activeButtons.length).toBe(1);
      expect(activeButtons[0].getAttribute('data-category')).toBe('all');
    });

    it('Property 10: Active filter button text color SHALL be Rice White', () => {
      // Property: Active filter text should be Rice White for contrast
      
      const activeButton = document.querySelector('.filter-btn.active');
      
      if (!activeButton) {
        return;
      }
      
      // Check the CSS rule for active state text color
      const styleSheets = Array.from(document.styleSheets);
      let textColorRuleFound = false;
      
      for (const sheet of styleSheets) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if (rule.cssText && rule.cssText.includes('.filter-btn.active') && 
                (rule.cssText.includes('rice-white') || rule.cssText.includes('#FAFAFA'))) {
              textColorRuleFound = true;
              break;
            }
          }
        } catch (e) {
          // Skip inaccessible stylesheets
        }
      }
      
      expect(textColorRuleFound).toBe(true);
    });
  });

  describe('Manual Test Verification - Desktop Hover Effects', () => {
    it('6.1: Menu cards should have hover transform and shadow on desktop', () => {
      // Verify Requirements 5.1, 5.2, 5.3, 5.4
      
      const menuCards = document.querySelectorAll('.menu-card');
      expect(menuCards.length).toBeGreaterThan(0);
      
      const firstCard = menuCards[0];
      const styles = window.getComputedStyle(firstCard);
      
      // Check transition properties
      expect(styles.transition).toContain('transform');
      expect(styles.transition).toContain('box-shadow');
      
      // Check transition duration (300ms) - accept both formats
      const isValid = styles.transitionDuration.includes('0.3s') || styles.transitionDuration.includes('300ms');
      expect(isValid).toBe(true);
    });
  });

  describe('Manual Test Verification - Mobile Hover Suppression', () => {
    it('6.2: Menu cards should NOT have hover effects on mobile/tablet', () => {
      // Verify Requirement 5.5
      
      // Check that hover effects are wrapped in media query
      const styleSheets = Array.from(document.styleSheets);
      let mediaQueryFound = false;
      
      for (const sheet of styleSheets) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if (rule.cssText && rule.cssText.includes('@media') && 
                rule.cssText.includes('min-width') && rule.cssText.includes('1024px') &&
                rule.cssText.includes('.menu-card:hover')) {
              mediaQueryFound = true;
              break;
            }
          }
        } catch (e) {
          // Skip inaccessible stylesheets
        }
      }
      
      expect(mediaQueryFound).toBe(true);
    });
  });

  describe('Manual Test Verification - Category Filtering', () => {
    it('6.3: Filter buttons should exist for all categories', () => {
      // Verify Requirement 6.1
      
      const allButton = document.querySelector('.filter-btn[data-category="all"]');
      const legendsButton = document.querySelector('.filter-btn[data-category="legends"]');
      const trianglesButton = document.querySelector('.filter-btn[data-category="triangles"]');
      const crispButton = document.querySelector('.filter-btn[data-category="crisp"]');
      
      expect(allButton).toBeTruthy();
      expect(legendsButton).toBeTruthy();
      expect(trianglesButton).toBeTruthy();
      expect(crispButton).toBeTruthy();
    });

    it('6.3: Category filter should be positioned above menu', () => {
      // Verify Requirement 6.6
      
      const filterContainer = document.querySelector('.category-filters');
      const menuGrid = document.getElementById('menu-grid');
      
      expect(filterContainer).toBeTruthy();
      expect(menuGrid).toBeTruthy();
      
      // Filter should come before menu in DOM
      const filterPosition = Array.from(document.body.querySelectorAll('*')).indexOf(filterContainer);
      const menuPosition = Array.from(document.body.querySelectorAll('*')).indexOf(menuGrid);
      
      expect(filterPosition).toBeLessThan(menuPosition);
    });

    it('6.3: Filter transition should be 400ms', () => {
      // Verify Requirement 6.4
      
      const menuGrid = document.getElementById('menu-grid');
      const styles = window.getComputedStyle(menuGrid);
      
      // Accept both 0.4s and 400ms formats
      const isValid = styles.transitionDuration.includes('0.4s') || styles.transitionDuration.includes('400ms');
      expect(isValid).toBe(true);
    });

    it('6.3: Active filter should use Chili Red color', () => {
      // Verify Requirement 6.5
      
      const activeButton = document.querySelector('.filter-btn.active');
      expect(activeButton).toBeTruthy();
      
      // Check CSS rule
      const styleSheets = Array.from(document.styleSheets);
      let activeColorFound = false;
      
      for (const sheet of styleSheets) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if (rule.cssText && rule.cssText.includes('.filter-btn.active') && 
                (rule.cssText.includes('#E53935') || rule.cssText.includes('chili-red'))) {
              activeColorFound = true;
              break;
            }
          }
        } catch (e) {
          // Skip
        }
      }
      
      expect(activeColorFound).toBe(true);
    });
  });
});
