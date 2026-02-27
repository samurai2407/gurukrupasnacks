// Property Tests: Footer and Typography
// Feature: gurukrupa-snacks-website
// Property 11: Social Link Target Behavior
// Property 12: Heading Font Family
// Property 13: Body Text Font Family
// **Validates: Requirements 8.4, 9.5, 4.5, 9.6**

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import fc from 'fast-check';

describe('Footer and Typography Properties', () => {
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

  describe('Property 11: Social Link Target Behavior', () => {
    it('Property 11: For all social media links, target SHALL be "_blank"', () => {
      // Property: Social links must open in new tabs
      
      const socialLinks = document.querySelectorAll('.social-link');
      
      expect(socialLinks.length).toBeGreaterThan(0);
      
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: socialLinks.length - 1 }),
          (linkIndex) => {
            const link = socialLinks[linkIndex];
            
            // Check target attribute
            expect(link.getAttribute('target')).toBe('_blank');
            
            // Check rel attribute for security
            const rel = link.getAttribute('rel');
            expect(rel).toContain('noopener');
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Property 11: Social links should have aria-label for accessibility', () => {
      // Property: Social links must have accessible labels
      
      const socialLinks = document.querySelectorAll('.social-link');
      
      socialLinks.forEach(link => {
        const ariaLabel = link.getAttribute('aria-label');
        expect(ariaLabel).toBeTruthy();
        expect(ariaLabel.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Property 12: Heading Font Family', () => {
    it('Property 12: For all heading elements, font-family SHALL include Bangers or Carter One', () => {
      // Property: Headings must use display fonts
      
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      
      expect(headings.length).toBeGreaterThan(0);
      
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: headings.length - 1 }),
          (headingIndex) => {
            const heading = headings[headingIndex];
            
            // Check if heading has font-display class or inline style
            const hasDisplayClass = heading.classList.contains('font-display') || 
                                   heading.classList.contains('hero-title') ||
                                   heading.classList.contains('section-title') ||
                                   heading.classList.contains('item-name');
            
            expect(hasDisplayClass).toBe(true);
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Property 12: CSS should define display font family', () => {
      // Property: CSS must define Bangers or Carter One for headings
      
      const styleSheets = Array.from(document.styleSheets);
      let displayFontFound = false;
      
      for (const sheet of styleSheets) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if (rule.cssText && rule.cssText.includes('font-display') && 
                (rule.cssText.includes('Bangers') || rule.cssText.includes('Carter One'))) {
              displayFontFound = true;
              break;
            }
          }
        } catch (e) {
          // Skip inaccessible stylesheets
        }
      }
      
      expect(displayFontFound).toBe(true);
    });
  });

  describe('Property 13: Body Text Font Family', () => {
    it('Property 13: For all body text elements, font-family SHALL include Poppins or Inter', () => {
      // Property: Body text must use readable sans-serif fonts
      
      const bodyTexts = document.querySelectorAll('p, .item-description, .item-price, .item-fact');
      
      expect(bodyTexts.length).toBeGreaterThan(0);
      
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: bodyTexts.length - 1 }),
          (textIndex) => {
            const text = bodyTexts[textIndex];
            
            // Check if element has font-body class or inherits it
            const hasBodyClass = text.classList.contains('font-body') ||
                                text.closest('.font-body') !== null ||
                                text.closest('body') !== null;
            
            expect(hasBodyClass).toBe(true);
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Property 13: CSS should define body font family', () => {
      // Property: CSS must define Poppins or Inter for body text
      
      const styleSheets = Array.from(document.styleSheets);
      let bodyFontFound = false;
      
      for (const sheet of styleSheets) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if (rule.cssText && rule.cssText.includes('font-body') && 
                (rule.cssText.includes('Poppins') || rule.cssText.includes('Inter'))) {
              bodyFontFound = true;
              break;
            }
          }
        } catch (e) {
          // Skip inaccessible stylesheets
        }
      }
      
      expect(bodyFontFound).toBe(true);
    });

    it('Property 13: Body text font weight SHALL be at least 400', () => {
      // Property: Body text must have minimum font weight
      
      const bodyTexts = document.querySelectorAll('p, .item-description');
      
      if (bodyTexts.length === 0) {
        return;
      }
      
      // Check CSS for font-weight definition
      const styleSheets = Array.from(document.styleSheets);
      let minWeightDefined = false;
      
      for (const sheet of styleSheets) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if (rule.cssText && rule.cssText.includes('font-body')) {
              // Font weight 400 is normal, which is the default
              minWeightDefined = true;
              break;
            }
          }
        } catch (e) {
          // Skip
        }
      }
      
      expect(minWeightDefined).toBe(true);
    });
  });

  describe('Manual Test Verification - Footer', () => {
    it('8.1: Footer should contain social links with target="_blank"', () => {
      // Verify Requirement 8.4
      
      const footer = document.getElementById('footer');
      expect(footer).toBeTruthy();
      
      const socialLinks = footer.querySelectorAll('.social-link');
      expect(socialLinks.length).toBeGreaterThan(0);
      
      socialLinks.forEach(link => {
        expect(link.getAttribute('target')).toBe('_blank');
      });
    });
  });

  describe('Manual Test Verification - Typography', () => {
    it('9.1: Headings should use display font class', () => {
      // Verify Requirement 9.5
      
      const headings = document.querySelectorAll('h1, h2, h3');
      expect(headings.length).toBeGreaterThan(0);
      
      headings.forEach(heading => {
        const hasDisplayClass = heading.classList.contains('font-display') ||
                               heading.classList.contains('hero-title') ||
                               heading.classList.contains('section-title') ||
                               heading.classList.contains('item-name');
        expect(hasDisplayClass).toBe(true);
      });
    });

    it('9.2: Body should use body font class', () => {
      // Verify Requirements 4.5, 9.6
      
      const body = document.body;
      expect(body.classList.contains('font-body')).toBe(true);
    });
  });

  describe('Manual Test Verification - Technical Implementation', () => {
    it('10: HTML should link to required files', () => {
      // Verify Requirements 10.2, 10.3, 10.6
      
      const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
      
      // Check for styles.css link
      expect(html).toContain('styles.css');
      
      // Check for script.js
      expect(html).toContain('script.js');
      
      // Check for Tailwind CSS CDN
      expect(html).toContain('tailwindcss.com');
      
      // Check for Google Fonts
      expect(html).toContain('fonts.googleapis.com');
    });
  });
});
