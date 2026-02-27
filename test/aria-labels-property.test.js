/**
 * Property-Based Test for ARIA Labels
 * Feature: gurukrupa-snacks-website, Property 17: ARIA Labels for Interactive Elements
 * **Validates: Requirements 11.6**
 * 
 * Property 17: ARIA Labels for Interactive Elements
 * *For all* interactive elements without visible text labels (icon buttons, hamburger menu),
 * appropriate ARIA attributes (aria-label or aria-labelledby) SHALL be present.
 */

import { describe, test, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';

// Load the HTML file
const htmlContent = readFileSync('./index.html', 'utf8');

describe('Property 17: ARIA Labels for Interactive Elements', () => {
  let dom;
  let document;

  beforeEach(() => {
    dom = new JSDOM(htmlContent);
    document = dom.window.document;
  });

  /**
   * Property 17: ARIA Labels for Interactive Elements
   * 
   * For all interactive elements without visible text labels (icon buttons, hamburger menu),
   * appropriate ARIA attributes (aria-label or aria-labelledby) SHALL be present.
   */
  test('Property 17: All interactive elements have accessible names', () => {
    // Feature: gurukrupa-snacks-website, Property 17: ARIA Labels for Interactive Elements
    
    // Get all interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, select, textarea, [role="button"], [role="link"]'
    );
    
    expect(interactiveElements.length, 
      'Should have interactive elements'
    ).toBeGreaterThan(0);
    
    console.log(`\n=== ARIA Labels Verification ===`);
    console.log(`Found ${interactiveElements.length} interactive elements`);
    
    let elementsWithAccessibleNames = 0;
    let elementsWithoutVisibleText = [];
    
    interactiveElements.forEach((element, index) => {
      const tagName = element.tagName.toLowerCase();
      const id = element.id || `${tagName}-${index}`;
      
      // Check for accessible name sources
      const hasTextContent = element.textContent.trim().length > 0;
      const hasAriaLabel = element.hasAttribute('aria-label');
      const hasAriaLabelledBy = element.hasAttribute('aria-labelledby');
      const hasAlt = element.hasAttribute('alt');
      const hasTitle = element.hasAttribute('title');
      
      // Element has an accessible name if it has any of these
      const hasAccessibleName = hasTextContent || hasAriaLabel || hasAriaLabelledBy || hasAlt || hasTitle;
      
      if (hasAccessibleName) {
        elementsWithAccessibleNames++;
        
        // If element has no visible text, it should have ARIA label
        if (!hasTextContent) {
          elementsWithoutVisibleText.push({
            id,
            tagName,
            hasAriaLabel,
            hasAriaLabelledBy,
            hasAlt,
            hasTitle
          });
        }
      } else {
        // Element has no accessible name - this is a failure
        expect(hasAccessibleName, 
          `Interactive element ${tagName}#${id} must have accessible name (text, aria-label, aria-labelledby, alt, or title)`
        ).toBe(true);
      }
    });
    
    console.log(`✓ ${elementsWithAccessibleNames}/${interactiveElements.length} elements have accessible names`);
    
    if (elementsWithoutVisibleText.length > 0) {
      console.log(`\nℹ️  Elements without visible text (using ARIA):`);
      elementsWithoutVisibleText.forEach(({ id, tagName, hasAriaLabel, hasAriaLabelledBy, hasAlt, hasTitle }) => {
        const ariaMethod = hasAriaLabel ? 'aria-label' : 
                          hasAriaLabelledBy ? 'aria-labelledby' : 
                          hasAlt ? 'alt' : 
                          hasTitle ? 'title' : 'unknown';
        console.log(`  - <${tagName}> ${id}: ${ariaMethod}`);
      });
    }
    
    console.log(`================================\n`);
    
    // Property: All interactive elements must have accessible names
    expect(elementsWithAccessibleNames, 
      'All interactive elements must have accessible names'
    ).toBe(interactiveElements.length);
  });

  /**
   * Property-based test: Verify ARIA labels for elements without visible text
   */
  test('Property 17 Extension: Elements without visible text have ARIA labels', () => {
    const interactiveElements = document.querySelectorAll('a, button');
    
    interactiveElements.forEach(element => {
      const hasTextContent = element.textContent.trim().length > 0;
      
      if (!hasTextContent) {
        // Element without visible text must have ARIA label
        const hasAriaLabel = element.hasAttribute('aria-label');
        const hasAriaLabelledBy = element.hasAttribute('aria-labelledby');
        const hasTitle = element.hasAttribute('title');
        
        expect(hasAriaLabel || hasAriaLabelledBy || hasTitle, 
          `Element without visible text must have aria-label, aria-labelledby, or title: ${element.tagName}#${element.id || 'no-id'}`
        ).toBe(true);
      }
    });
  });

  /**
   * Property-based test: Verify hamburger menu has ARIA attributes
   */
  test('Property 17 Extension: Hamburger menu has proper ARIA attributes', () => {
    const hamburgerButton = document.getElementById('mobile-menu-toggle');
    
    expect(hamburgerButton, 'Hamburger menu button should exist').toBeTruthy();
    
    // Should have aria-label
    expect(hamburgerButton.hasAttribute('aria-label'), 
      'Hamburger menu should have aria-label'
    ).toBe(true);
    
    const ariaLabel = hamburgerButton.getAttribute('aria-label');
    expect(ariaLabel.trim().length, 
      'Hamburger menu aria-label should not be empty'
    ).toBeGreaterThan(0);
    
    // Should describe the action
    expect(ariaLabel.toLowerCase(), 
      'Hamburger menu aria-label should describe the action'
    ).toContain('menu');
    
    // Should have aria-expanded
    expect(hamburgerButton.hasAttribute('aria-expanded'), 
      'Hamburger menu should have aria-expanded'
    ).toBe(true);
    
    const ariaExpanded = hamburgerButton.getAttribute('aria-expanded');
    expect(['true', 'false'].includes(ariaExpanded), 
      'aria-expanded should be "true" or "false"'
    ).toBe(true);
    
    console.log(`✓ Hamburger menu has proper ARIA attributes`);
    console.log(`  - aria-label: "${ariaLabel}"`);
    console.log(`  - aria-expanded: "${ariaExpanded}"`);
  });

  /**
   * Property-based test: Verify social media links have ARIA labels
   */
  test('Property 17 Extension: Social media links have ARIA labels', () => {
    const socialLinks = document.querySelectorAll('.social-link');
    
    expect(socialLinks.length, 'Should have social media links').toBeGreaterThan(0);
    
    socialLinks.forEach((link, index) => {
      // Should have aria-label
      expect(link.hasAttribute('aria-label'), 
        `Social link ${index + 1} should have aria-label`
      ).toBe(true);
      
      const ariaLabel = link.getAttribute('aria-label');
      expect(ariaLabel.trim().length, 
        'Social link aria-label should not be empty'
      ).toBeGreaterThan(0);
      
      // Should describe the destination
      const hasDescriptiveText = 
        ariaLabel.toLowerCase().includes('facebook') ||
        ariaLabel.toLowerCase().includes('instagram') ||
        ariaLabel.toLowerCase().includes('twitter') ||
        ariaLabel.toLowerCase().includes('social');
      
      expect(hasDescriptiveText, 
        `Social link aria-label should describe the destination: "${ariaLabel}"`
      ).toBe(true);
    });
    
    console.log(`✓ Verified ${socialLinks.length} social media links have ARIA labels`);
  });

  /**
   * Property-based test: Verify icon-only elements have ARIA labels
   */
  test('Property 17 Extension: Icon-only elements have ARIA labels', () => {
    // Find elements that contain only SVG or icon content (no text)
    const buttons = document.querySelectorAll('button');
    const links = document.querySelectorAll('a');
    
    const iconOnlyElements = [];
    
    [...buttons, ...links].forEach(element => {
      const textContent = element.textContent.trim();
      const hasSvg = element.querySelector('svg') !== null;
      
      // If element has SVG but no text, it's icon-only
      if (hasSvg && textContent.length === 0) {
        iconOnlyElements.push(element);
      }
    });
    
    if (iconOnlyElements.length > 0) {
      console.log(`\nFound ${iconOnlyElements.length} icon-only elements:`);
      
      iconOnlyElements.forEach((element, index) => {
        const hasAriaLabel = element.hasAttribute('aria-label');
        const hasAriaLabelledBy = element.hasAttribute('aria-labelledby');
        const hasTitle = element.hasAttribute('title');
        
        expect(hasAriaLabel || hasAriaLabelledBy || hasTitle, 
          `Icon-only element ${index + 1} must have aria-label, aria-labelledby, or title`
        ).toBe(true);
        
        if (hasAriaLabel) {
          const ariaLabel = element.getAttribute('aria-label');
          console.log(`  ✓ Element ${index + 1}: aria-label="${ariaLabel}"`);
        }
      });
    }
  });

  /**
   * Property-based test: Verify ARIA labels are descriptive
   */
  test('Property 17 Extension: ARIA labels are descriptive (at least 3 characters)', () => {
    const elementsWithAriaLabel = document.querySelectorAll('[aria-label]');
    
    elementsWithAriaLabel.forEach(element => {
      const ariaLabel = element.getAttribute('aria-label');
      
      // ARIA label should be descriptive (at least 3 characters)
      expect(ariaLabel.trim().length, 
        `ARIA label should be descriptive (at least 3 chars): "${ariaLabel}"`
      ).toBeGreaterThanOrEqual(3);
    });
    
    if (elementsWithAriaLabel.length > 0) {
      console.log(`✓ Verified ${elementsWithAriaLabel.length} elements with aria-label have descriptive text`);
    }
  });

  /**
   * Property-based test: Verify aria-labelledby references exist
   */
  test('Property 17 Extension: aria-labelledby references valid elements', () => {
    const elementsWithAriaLabelledBy = document.querySelectorAll('[aria-labelledby]');
    
    elementsWithAriaLabelledBy.forEach(element => {
      const ariaLabelledBy = element.getAttribute('aria-labelledby');
      const referencedIds = ariaLabelledBy.split(' ');
      
      referencedIds.forEach(id => {
        const referencedElement = document.getElementById(id);
        
        expect(referencedElement, 
          `aria-labelledby references element that should exist: "${id}"`
        ).toBeTruthy();
      });
    });
    
    if (elementsWithAriaLabelledBy.length > 0) {
      console.log(`✓ Verified ${elementsWithAriaLabelledBy.length} elements with aria-labelledby reference valid elements`);
    }
  });

  /**
   * Property-based test: Verify consistency across all interactive elements
   */
  test('Property 17 Extension: All interactive elements follow consistent ARIA patterns', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('a', 'button'),
        (elementType) => {
          const elements = document.querySelectorAll(elementType);
          
          if (elements.length === 0) {
            return true;
          }
          
          elements.forEach(element => {
            // Each element must have an accessible name
            const hasTextContent = element.textContent.trim().length > 0;
            const hasAriaLabel = element.hasAttribute('aria-label');
            const hasAriaLabelledBy = element.hasAttribute('aria-labelledby');
            const hasTitle = element.hasAttribute('title');
            
            const hasAccessibleName = hasTextContent || hasAriaLabel || hasAriaLabelledBy || hasTitle;
            
            expect(hasAccessibleName, 
              `${elementType} must have accessible name`
            ).toBe(true);
          });
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property-based test: Verify SVG icons inside labeled elements are hidden
   */
  test('Property 17 Extension: SVG icons inside labeled elements have aria-hidden', () => {
    const linksWithAriaLabel = document.querySelectorAll('a[aria-label]');
    const buttonsWithAriaLabel = document.querySelectorAll('button[aria-label]');
    
    [...linksWithAriaLabel, ...buttonsWithAriaLabel].forEach(element => {
      const svg = element.querySelector('svg');
      
      if (svg) {
        // SVG inside element with aria-label should be hidden from screen readers
        const ariaHidden = svg.getAttribute('aria-hidden');
        
        expect(ariaHidden, 
          'SVG icon inside element with aria-label should have aria-hidden="true"'
        ).toBe('true');
      }
    });
    
    const totalWithSvg = [...linksWithAriaLabel, ...buttonsWithAriaLabel].filter(el => el.querySelector('svg')).length;
    if (totalWithSvg > 0) {
      console.log(`✓ Verified ${totalWithSvg} SVG icons inside labeled elements have aria-hidden="true"`);
    }
  });
});
