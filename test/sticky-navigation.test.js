// Property Test: Sticky Navigation Visibility
// Feature: gurukrupa-snacks-website, Property 4: Sticky Navigation Visibility
// **Validates: Requirements 2.1**

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fc from 'fast-check';
import fs from 'fs';
import path from 'path';

describe('Property 4: Sticky Navigation Visibility', () => {
  let dom;
  let window;
  let document;

  beforeEach(async () => {
    // Load the HTML file
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    
    // Create a new JSDOM instance
    dom = new JSDOM(html, {
      url: 'http://localhost',
      runScripts: 'dangerously',
      resources: 'usable',
      beforeParse(win) {
        // Mock scrollIntoView
        win.Element.prototype.scrollIntoView = function() {};
        
        // Mock window.scrollTo
        win.scrollTo = function() {};
      }
    });

    window = dom.window;
    document = window.document;
    
    // Load and execute the script in the window context
    const scriptContent = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8');
    
    // Execute script in window context
    const scriptFunction = new window.Function(scriptContent);
    scriptFunction.call(window);
    
    // Wait for DOMContentLoaded to fire
    await new Promise(resolve => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
    
    // Give a small delay for initialization
    await new Promise(resolve => setTimeout(resolve, 50));
  });

  afterEach(() => {
    dom.window.close();
  });

  it('should have sticky positioning for any scroll position', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 10000 }), // Generate scroll positions from 0 to 10000px
        (scrollPosition) => {
          const navbar = document.getElementById('navbar');
          
          // Verify navbar exists
          expect(navbar).toBeTruthy();
          
          // Simulate scroll position
          Object.defineProperty(window, 'scrollY', {
            writable: true,
            configurable: true,
            value: scrollPosition
          });
          
          Object.defineProperty(window, 'pageYOffset', {
            writable: true,
            configurable: true,
            value: scrollPosition
          });
          
          // Dispatch scroll event
          window.dispatchEvent(new window.Event('scroll'));
          
          // Check that navbar has sticky positioning
          const styles = window.getComputedStyle(navbar);
          const classes = navbar.className;
          
          // Property: Navigation bar SHALL remain visible at the top of the viewport
          // This is achieved through sticky positioning
          const hasSticky = classes.includes('sticky') || styles.position === 'sticky';
          const hasTopZero = classes.includes('top-0') || styles.top === '0px' || styles.top === '0';
          const hasHighZIndex = classes.includes('z-50') || classes.includes('z-');
          
          // All conditions must be true for sticky navigation to work
          return hasSticky && hasTopZero && hasHighZIndex;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should maintain visibility properties across all scroll positions', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 50000 }), // Test even larger scroll positions
        (scrollPosition) => {
          const navbar = document.getElementById('navbar');
          
          // Simulate scroll position
          Object.defineProperty(window, 'scrollY', {
            writable: true,
            configurable: true,
            value: scrollPosition
          });
          
          // The navbar should always be present in the DOM
          expect(navbar).toBeTruthy();
          
          // The navbar should have the required classes for sticky behavior
          const classes = navbar.className;
          
          // Check for sticky, top-0, and z-index classes
          const hasRequiredClasses = 
            classes.includes('sticky') && 
            classes.includes('top-0') && 
            (classes.includes('z-50') || classes.includes('z-'));
          
          return hasRequiredClasses;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should have consistent positioning attributes regardless of scroll', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.integer({ min: 0, max: 20000 }),
          fc.integer({ min: 0, max: 20000 })
        ),
        ([scrollPos1, scrollPos2]) => {
          const navbar = document.getElementById('navbar');
          
          // Set first scroll position
          Object.defineProperty(window, 'scrollY', {
            writable: true,
            configurable: true,
            value: scrollPos1
          });
          window.dispatchEvent(new window.Event('scroll'));
          
          const classes1 = navbar.className;
          const hasSticky1 = classes1.includes('sticky');
          const hasTop1 = classes1.includes('top-0');
          
          // Set second scroll position
          Object.defineProperty(window, 'scrollY', {
            writable: true,
            configurable: true,
            value: scrollPos2
          });
          window.dispatchEvent(new window.Event('scroll'));
          
          const classes2 = navbar.className;
          const hasSticky2 = classes2.includes('sticky');
          const hasTop2 = classes2.includes('top-0');
          
          // Property: The sticky positioning should be consistent across all scroll positions
          return hasSticky1 === hasSticky2 && hasTop1 === hasTop2 && hasSticky1 && hasTop1;
        }
      ),
      { numRuns: 100 }
    );
  });
});
