/**
 * ARIA Labels and Alt Text Tests
 * Feature: gurukrupa-snacks-website
 * Task 12.3: Verify ARIA labels and alt text
 * 
 * Tests that all images and SVGs have alt text or aria-label,
 * and that interactive elements without visible text have appropriate ARIA attributes.
 */

import { describe, test, expect, beforeEach } from 'vitest';
import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';

// Load the HTML file
const htmlContent = readFileSync('./index.html', 'utf8');

describe('ARIA Labels and Alt Text Tests', () => {
  let dom;
  let document;

  beforeEach(() => {
    dom = new JSDOM(htmlContent);
    document = dom.window.document;
  });

  test('all img elements should have alt attribute', () => {
    const images = document.querySelectorAll('img');
    
    // If there are images, they must have alt text
    images.forEach(img => {
      expect(img.hasAttribute('alt'), 
        `Image should have alt attribute: ${img.outerHTML.substring(0, 100)}`
      ).toBe(true);
      
      // Alt text should not be empty (unless it's decorative)
      const altText = img.getAttribute('alt');
      if (altText === '') {
        console.log(`Note: Image has empty alt (decorative): ${img.outerHTML.substring(0, 100)}`);
      }
    });
  });

  test('all SVG elements should have proper accessibility attributes', () => {
    const svgs = document.querySelectorAll('svg');
    
    expect(svgs.length, 'Should have SVG elements').toBeGreaterThan(0);

    svgs.forEach(svg => {
      const isHidden = svg.getAttribute('aria-hidden') === 'true';
      
      if (isHidden) {
        // If SVG is hidden from screen readers (e.g., decorative icon inside a labeled link),
        // it should NOT have role="img" or aria-label
        console.log(`Note: SVG is decorative (aria-hidden="true"): ${svg.outerHTML.substring(0, 100)}`);
      } else {
        // If SVG is not hidden, it should have role="img" for accessibility
        const role = svg.getAttribute('role');
        expect(role, 
          `SVG should have role="img": ${svg.outerHTML.substring(0, 100)}`
        ).toBe('img');
        
        // SVG should have aria-label or title element
        const hasAriaLabel = svg.hasAttribute('aria-label');
        const hasTitle = svg.querySelector('title') !== null;
        
        expect(hasAriaLabel || hasTitle, 
          `SVG should have aria-label or title element: ${svg.outerHTML.substring(0, 100)}`
        ).toBe(true);
        
        // If it has aria-label, it should not be empty
        if (hasAriaLabel) {
          const ariaLabel = svg.getAttribute('aria-label');
          expect(ariaLabel.trim().length, 
            'SVG aria-label should not be empty'
          ).toBeGreaterThan(0);
        }
      }
    });
  });

  test('hamburger menu button should have aria-label', () => {
    const hamburgerButton = document.getElementById('mobile-menu-toggle');
    
    expect(hamburgerButton, 'Hamburger menu button should exist').toBeTruthy();
    
    // Should have aria-label
    expect(hamburgerButton.hasAttribute('aria-label'), 
      'Hamburger menu button should have aria-label'
    ).toBe(true);
    
    const ariaLabel = hamburgerButton.getAttribute('aria-label');
    expect(ariaLabel.trim().length, 
      'Hamburger menu aria-label should not be empty'
    ).toBeGreaterThan(0);
    
    // Should describe the action
    expect(ariaLabel.toLowerCase(), 
      'Hamburger menu aria-label should describe the action'
    ).toContain('menu');
  });

  test('hamburger menu button should have aria-expanded attribute', () => {
    const hamburgerButton = document.getElementById('mobile-menu-toggle');
    
    expect(hamburgerButton, 'Hamburger menu button should exist').toBeTruthy();
    
    // Should have aria-expanded
    expect(hamburgerButton.hasAttribute('aria-expanded'), 
      'Hamburger menu button should have aria-expanded'
    ).toBe(true);
    
    const ariaExpanded = hamburgerButton.getAttribute('aria-expanded');
    expect(['true', 'false'].includes(ariaExpanded), 
      'aria-expanded should be "true" or "false"'
    ).toBe(true);
  });

  test('social media links should have aria-label', () => {
    const socialLinks = document.querySelectorAll('.social-link');
    
    expect(socialLinks.length, 'Should have social media links').toBeGreaterThan(0);

    socialLinks.forEach(link => {
      // Should have aria-label
      expect(link.hasAttribute('aria-label'), 
        `Social link should have aria-label: ${link.outerHTML.substring(0, 100)}`
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
  });

  test('social media SVG icons should have aria-hidden="true"', () => {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
      const svg = link.querySelector('svg');
      
      if (svg) {
        // SVG inside a link with aria-label should be hidden from screen readers
        const ariaHidden = svg.getAttribute('aria-hidden');
        expect(ariaHidden, 
          'SVG icon inside link with aria-label should have aria-hidden="true"'
        ).toBe('true');
      }
    });
  });

  test('CTA button should have descriptive text or aria-label', () => {
    const ctaButton = document.getElementById('cta-button');
    
    expect(ctaButton, 'CTA button should exist').toBeTruthy();
    
    // Button should have visible text content or aria-label
    const hasTextContent = ctaButton.textContent.trim().length > 0;
    const hasAriaLabel = ctaButton.hasAttribute('aria-label');
    
    expect(hasTextContent || hasAriaLabel, 
      'CTA button should have text content or aria-label'
    ).toBe(true);
    
    if (hasTextContent) {
      expect(ctaButton.textContent.trim().length, 
        'CTA button text should not be empty'
      ).toBeGreaterThan(0);
    }
  });

  test('filter buttons should have descriptive text', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    expect(filterButtons.length, 'Should have filter buttons').toBeGreaterThan(0);

    filterButtons.forEach(button => {
      // Buttons should have visible text content
      const textContent = button.textContent.trim();
      expect(textContent.length, 
        `Filter button should have text content: ${button.outerHTML.substring(0, 100)}`
      ).toBeGreaterThan(0);
    });
  });

  test('navigation links should have descriptive text', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    expect(navLinks.length, 'Should have navigation links').toBeGreaterThan(0);

    navLinks.forEach(link => {
      // Links should have visible text content
      const textContent = link.textContent.trim();
      expect(textContent.length, 
        `Navigation link should have text content: ${link.outerHTML.substring(0, 100)}`
      ).toBeGreaterThan(0);
    });
  });

  test('all interactive elements should have accessible names', () => {
    // Get all interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, select, textarea'
    );

    interactiveElements.forEach(element => {
      // Element should have one of: text content, aria-label, aria-labelledby, or alt (for images)
      const hasTextContent = element.textContent.trim().length > 0;
      const hasAriaLabel = element.hasAttribute('aria-label');
      const hasAriaLabelledBy = element.hasAttribute('aria-labelledby');
      const hasAlt = element.hasAttribute('alt');
      const hasTitle = element.hasAttribute('title');
      
      const hasAccessibleName = hasTextContent || hasAriaLabel || hasAriaLabelledBy || hasAlt || hasTitle;
      
      expect(hasAccessibleName, 
        `Interactive element should have accessible name: ${element.tagName}#${element.id || 'no-id'}`
      ).toBe(true);
    });
  });

  test('decorative images should have empty alt text', () => {
    // This test checks that if an image is decorative, it has alt=""
    // We don't have decorative images in this site, but this is a good practice to test
    
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      const alt = img.getAttribute('alt');
      
      // If alt is empty, the image is considered decorative
      if (alt === '') {
        console.log(`Decorative image found: ${img.outerHTML.substring(0, 100)}`);
        
        // Decorative images should not have role="img" or aria-label
        expect(img.hasAttribute('aria-label'), 
          'Decorative image should not have aria-label'
        ).toBe(false);
      }
    });
  });
});
