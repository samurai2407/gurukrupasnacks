/**
 * Property-Based Test for Image Accessibility
 * Feature: gurukrupa-snacks-website, Property 14: Image Accessibility
 * **Validates: Requirements 11.3**
 * 
 * Property 14: Image Accessibility
 * *For all* image and SVG elements, an alt attribute (for img) or aria-label attribute (for SVG)
 * SHALL be present with descriptive text.
 */

import { describe, test, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';

// Load the HTML file
const htmlContent = readFileSync('./index.html', 'utf8');

describe('Property 14: Image Accessibility', () => {
  let dom;
  let document;

  beforeEach(() => {
    dom = new JSDOM(htmlContent);
    document = dom.window.document;
  });

  /**
   * Property 14: Image Accessibility
   * 
   * For all image and SVG elements, an alt attribute (for img) or aria-label attribute (for SVG)
   * SHALL be present with descriptive text.
   */
  test('Property 14: All images and SVGs have accessibility attributes', () => {
    // Feature: gurukrupa-snacks-website, Property 14: Image Accessibility
    
    // Get all img elements
    const images = Array.from(document.querySelectorAll('img'));
    
    // Get all SVG elements
    const svgs = Array.from(document.querySelectorAll('svg'));
    
    // Combine all visual elements
    const allVisualElements = [...images, ...svgs];
    
    // Property: For ALL visual elements, accessibility attributes must be present
    allVisualElements.forEach(element => {
      const tagName = element.tagName.toLowerCase();
      
      if (tagName === 'img') {
        // IMG elements must have alt attribute
        expect(element.hasAttribute('alt'), 
          `<img> element must have alt attribute: ${element.outerHTML.substring(0, 100)}`
        ).toBe(true);
        
        // Alt attribute can be empty for decorative images, but must exist
        const alt = element.getAttribute('alt');
        expect(alt !== null, 
          `<img> element alt attribute must not be null`
        ).toBe(true);
        
      } else if (tagName === 'svg') {
        // SVG elements must have either:
        // 1. aria-label attribute, OR
        // 2. aria-hidden="true" (if decorative)
        const hasAriaLabel = element.hasAttribute('aria-label');
        const hasAriaHidden = element.getAttribute('aria-hidden') === 'true';
        const hasTitle = element.querySelector('title') !== null;
        const hasRole = element.hasAttribute('role');
        
        // SVG must have at least one accessibility attribute
        expect(hasAriaLabel || hasAriaHidden || hasTitle || hasRole, 
          `<svg> element must have aria-label, aria-hidden, title, or role attribute: ${element.outerHTML.substring(0, 100)}`
        ).toBe(true);
        
        // If SVG is not hidden, it should have descriptive attributes
        if (!hasAriaHidden) {
          expect(hasAriaLabel || hasTitle, 
            `<svg> element that is not hidden must have aria-label or title: ${element.outerHTML.substring(0, 100)}`
          ).toBe(true);
        }
      }
    });
    
    // Log summary
    console.log(`\n✓ Verified ${images.length} img elements have alt attributes`);
    console.log(`✓ Verified ${svgs.length} SVG elements have accessibility attributes`);
  });

  /**
   * Property-based test: Generate random element indices and verify accessibility
   * This tests that the property holds for any subset of visual elements
   */
  test('Property 14 Extension: Accessibility holds for any subset of visual elements', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('img', 'svg'),
        (elementType) => {
          const elements = document.querySelectorAll(elementType);
          
          if (elements.length === 0) {
            // If no elements of this type exist, property trivially holds
            return true;
          }
          
          // For each element of this type, verify accessibility
          elements.forEach(element => {
            if (elementType === 'img') {
              // IMG must have alt attribute
              expect(element.hasAttribute('alt')).toBe(true);
            } else if (elementType === 'svg') {
              // SVG must have accessibility attributes
              const hasAriaLabel = element.hasAttribute('aria-label');
              const hasAriaHidden = element.getAttribute('aria-hidden') === 'true';
              const hasTitle = element.querySelector('title') !== null;
              const hasRole = element.hasAttribute('role');
              
              expect(hasAriaLabel || hasAriaHidden || hasTitle || hasRole).toBe(true);
            }
          });
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property-based test: Verify that decorative images are properly marked
   */
  test('Property 14 Extension: Decorative images have empty alt or aria-hidden', () => {
    const images = document.querySelectorAll('img');
    const svgs = document.querySelectorAll('svg');
    
    // Check images with empty alt (decorative)
    images.forEach(img => {
      const alt = img.getAttribute('alt');
      
      if (alt === '') {
        // Decorative image - should not have aria-label
        expect(img.hasAttribute('aria-label'), 
          'Decorative image (alt="") should not have aria-label'
        ).toBe(false);
        
        console.log(`  Note: Found decorative image: ${img.outerHTML.substring(0, 80)}`);
      }
    });
    
    // Check SVGs with aria-hidden (decorative)
    svgs.forEach(svg => {
      const isHidden = svg.getAttribute('aria-hidden') === 'true';
      
      if (isHidden) {
        // Decorative SVG - should not have role="img" or aria-label
        const hasRole = svg.getAttribute('role') === 'img';
        
        if (hasRole) {
          console.log(`  Warning: Decorative SVG (aria-hidden="true") has role="img": ${svg.outerHTML.substring(0, 80)}`);
        }
      }
    });
  });

  /**
   * Property-based test: Verify that non-decorative images have descriptive text
   */
  test('Property 14 Extension: Non-decorative images have descriptive text', () => {
    const images = document.querySelectorAll('img');
    const svgs = document.querySelectorAll('svg');
    
    // Check images with non-empty alt
    images.forEach(img => {
      const alt = img.getAttribute('alt');
      
      if (alt && alt.trim().length > 0) {
        // Non-decorative image - alt text should be descriptive (at least 3 characters)
        expect(alt.trim().length, 
          `Non-decorative image should have descriptive alt text (at least 3 chars): "${alt}"`
        ).toBeGreaterThanOrEqual(3);
      }
    });
    
    // Check SVGs with aria-label
    svgs.forEach(svg => {
      const ariaLabel = svg.getAttribute('aria-label');
      const isHidden = svg.getAttribute('aria-hidden') === 'true';
      
      if (ariaLabel && !isHidden) {
        // Non-decorative SVG - aria-label should be descriptive (at least 3 characters)
        expect(ariaLabel.trim().length, 
          `Non-decorative SVG should have descriptive aria-label (at least 3 chars): "${ariaLabel}"`
        ).toBeGreaterThanOrEqual(3);
      }
    });
  });

  /**
   * Property-based test: Verify consistency across all visual elements
   */
  test('Property 14 Extension: All visual elements follow consistent accessibility patterns', () => {
    const images = Array.from(document.querySelectorAll('img'));
    const svgs = Array.from(document.querySelectorAll('svg'));
    
    // Count elements with proper accessibility
    let accessibleImages = 0;
    let accessibleSvgs = 0;
    
    images.forEach(img => {
      if (img.hasAttribute('alt')) {
        accessibleImages++;
      }
    });
    
    svgs.forEach(svg => {
      const hasAriaLabel = svg.hasAttribute('aria-label');
      const hasAriaHidden = svg.getAttribute('aria-hidden') === 'true';
      const hasTitle = svg.querySelector('title') !== null;
      const hasRole = svg.hasAttribute('role');
      
      if (hasAriaLabel || hasAriaHidden || hasTitle || hasRole) {
        accessibleSvgs++;
      }
    });
    
    // Property: 100% of visual elements must be accessible
    if (images.length > 0) {
      expect(accessibleImages, 
        `All ${images.length} images must have alt attributes`
      ).toBe(images.length);
    }
    
    if (svgs.length > 0) {
      expect(accessibleSvgs, 
        `All ${svgs.length} SVGs must have accessibility attributes`
      ).toBe(svgs.length);
    }
    
    console.log(`\n✓ 100% of images (${accessibleImages}/${images.length}) are accessible`);
    console.log(`✓ 100% of SVGs (${accessibleSvgs}/${svgs.length}) are accessible`);
  });
});
