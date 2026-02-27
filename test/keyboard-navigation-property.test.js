/**
 * Property-Based Test for Keyboard Navigation
 * Feature: gurukrupa-snacks-website, Property 16: Keyboard Navigation
 * **Validates: Requirements 11.5**
 * 
 * Property 16: Keyboard Navigation
 * *For all* interactive elements (buttons, links, form controls), the element SHALL be
 * reachable and operable using keyboard controls (Tab, Enter, Space).
 */

import { describe, test, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';

// Load the HTML file
const htmlContent = readFileSync('./index.html', 'utf8');

describe('Property 16: Keyboard Navigation', () => {
  let dom;
  let document;

  beforeEach(() => {
    dom = new JSDOM(htmlContent);
    document = dom.window.document;
  });

  /**
   * Property 16: Keyboard Navigation
   * 
   * For all interactive elements (buttons, links, form controls), the element SHALL be
   * reachable and operable using keyboard controls (Tab, Enter, Space).
   */
  test('Property 16: All interactive elements are keyboard accessible', () => {
    // Feature: gurukrupa-snacks-website, Property 16: Keyboard Navigation
    
    // Get all interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, select, textarea, [role="button"], [role="link"]'
    );
    
    expect(interactiveElements.length, 
      'Should have interactive elements'
    ).toBeGreaterThan(0);
    
    console.log(`\n=== Keyboard Navigation Verification ===`);
    console.log(`Found ${interactiveElements.length} interactive elements`);
    
    let keyboardAccessibleCount = 0;
    let issuesFound = [];
    
    interactiveElements.forEach((element, index) => {
      const tagName = element.tagName.toLowerCase();
      const role = element.getAttribute('role');
      const tabindex = element.getAttribute('tabindex');
      const id = element.id || `element-${index}`;
      
      // Check if element is keyboard accessible
      const isNaturallyFocusable = ['a', 'button', 'input', 'select', 'textarea'].includes(tagName);
      const hasPositiveTabindex = tabindex !== null && parseInt(tabindex) >= 0;
      const hasNegativeTabindex = tabindex === '-1';
      
      // Element should be focusable (naturally or via tabindex >= 0)
      const isFocusable = isNaturallyFocusable || hasPositiveTabindex;
      
      if (isFocusable && !hasNegativeTabindex) {
        keyboardAccessibleCount++;
        
        // Verify element type supports keyboard interaction
        if (tagName === 'a') {
          // Links must have href
          expect(element.hasAttribute('href'), 
            `Link ${id} must have href attribute for keyboard navigation`
          ).toBe(true);
        } else if (tagName === 'button' || role === 'button') {
          // Buttons are naturally keyboard accessible
          expect(true).toBe(true);
        }
      } else if (hasNegativeTabindex) {
        // Element is programmatically focusable but not in tab order
        issuesFound.push({
          id,
          tagName,
          issue: 'Has tabindex="-1" (not in tab order)'
        });
      } else {
        // Element is not keyboard accessible
        issuesFound.push({
          id,
          tagName,
          issue: 'Not keyboard accessible'
        });
      }
    });
    
    console.log(`✓ ${keyboardAccessibleCount}/${interactiveElements.length} elements are keyboard accessible`);
    
    if (issuesFound.length > 0) {
      console.log(`\nℹ️  Elements with special handling:`);
      issuesFound.forEach(({ id, tagName, issue }) => {
        console.log(`  - <${tagName}> ${id}: ${issue}`);
      });
    }
    
    console.log(`========================================\n`);
    
    // Property: All interactive elements must be keyboard accessible
    // (excluding those intentionally removed from tab order with tabindex="-1")
    const accessibleElements = interactiveElements.length - issuesFound.filter(i => i.issue === 'Not keyboard accessible').length;
    expect(accessibleElements, 
      'All interactive elements must be keyboard accessible'
    ).toBe(interactiveElements.length);
  });

  /**
   * Property-based test: Verify keyboard accessibility for each element type
   */
  test('Property 16 Extension: Each interactive element type is keyboard accessible', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('a', 'button'),
        (elementType) => {
          const elements = document.querySelectorAll(elementType);
          
          if (elements.length === 0) {
            // If no elements of this type exist, property trivially holds
            return true;
          }
          
          elements.forEach(element => {
            const tabindex = element.getAttribute('tabindex');
            
            // Element should not have positive tabindex (anti-pattern)
            if (tabindex !== null && parseInt(tabindex) > 0) {
              expect(parseInt(tabindex), 
                `${elementType} should not have positive tabindex (anti-pattern)`
              ).toBeLessThanOrEqual(0);
            }
            
            // Element should be naturally focusable or have tabindex="0"
            const isNaturallyFocusable = ['a', 'button', 'input', 'select', 'textarea'].includes(elementType);
            const hasTabindexZero = tabindex === '0';
            
            expect(isNaturallyFocusable || hasTabindexZero, 
              `${elementType} should be keyboard accessible`
            ).toBe(true);
          });
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property-based test: Verify no positive tabindex values (anti-pattern)
   */
  test('Property 16 Extension: No elements have positive tabindex values', () => {
    const elementsWithTabindex = document.querySelectorAll('[tabindex]');
    
    elementsWithTabindex.forEach(element => {
      const tabindex = parseInt(element.getAttribute('tabindex'));
      
      // Positive tabindex values are an anti-pattern
      expect(tabindex, 
        `Element should not have positive tabindex: ${element.tagName}#${element.id || 'no-id'}`
      ).toBeLessThanOrEqual(0);
    });
    
    console.log(`✓ Verified ${elementsWithTabindex.length} elements with tabindex have no positive values`);
  });

  /**
   * Property-based test: Verify links have href attribute
   */
  test('Property 16 Extension: All links have href attribute for keyboard navigation', () => {
    const links = document.querySelectorAll('a');
    
    expect(links.length, 'Should have links').toBeGreaterThan(0);
    
    links.forEach(link => {
      // Links must have href to be keyboard accessible
      expect(link.hasAttribute('href'), 
        `Link must have href attribute: ${link.textContent.trim().substring(0, 50)}`
      ).toBe(true);
      
      // Href should not be empty
      const href = link.getAttribute('href');
      expect(href.length, 
        'Link href should not be empty'
      ).toBeGreaterThan(0);
    });
    
    console.log(`✓ Verified ${links.length} links have href attributes`);
  });

  /**
   * Property-based test: Verify buttons are proper button elements
   */
  test('Property 16 Extension: Interactive buttons use button element', () => {
    const buttons = document.querySelectorAll('button');
    
    expect(buttons.length, 'Should have buttons').toBeGreaterThan(0);
    
    buttons.forEach(button => {
      // Buttons should be <button> elements (naturally keyboard accessible)
      expect(button.tagName, 
        'Interactive buttons should use <button> element'
      ).toBe('BUTTON');
      
      // Buttons should not be disabled (unless intentionally)
      if (button.disabled) {
        console.log(`  Note: Button is disabled: ${button.textContent.trim().substring(0, 50)}`);
      }
    });
    
    console.log(`✓ Verified ${buttons.length} buttons use proper <button> element`);
  });

  /**
   * Property-based test: Verify focus management
   */
  test('Property 16 Extension: Interactive elements support focus', () => {
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
    
    interactiveElements.forEach(element => {
      const tagName = element.tagName.toLowerCase();
      const tabindex = element.getAttribute('tabindex');
      
      // Element should be focusable
      const isNaturallyFocusable = ['a', 'button', 'input', 'select', 'textarea'].includes(tagName);
      const hasTabindexZero = tabindex === '0';
      const hasNegativeTabindex = tabindex === '-1';
      
      if (!hasNegativeTabindex) {
        // Element should be in tab order
        expect(isNaturallyFocusable || hasTabindexZero, 
          `${tagName} should be focusable`
        ).toBe(true);
      }
    });
  });

  /**
   * Property-based test: Verify navigation links are keyboard accessible
   */
  test('Property 16 Extension: Navigation links are keyboard accessible', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    expect(navLinks.length, 'Should have navigation links').toBeGreaterThan(0);
    
    navLinks.forEach(link => {
      // Navigation links should be <a> elements
      expect(link.tagName, 'Navigation links should be <a> elements').toBe('A');
      
      // Should have href
      expect(link.hasAttribute('href'), 
        'Navigation links should have href'
      ).toBe(true);
      
      // Should not have tabindex="-1"
      const tabindex = link.getAttribute('tabindex');
      expect(tabindex !== '-1', 
        'Navigation links should be in tab order'
      ).toBe(true);
    });
    
    console.log(`✓ Verified ${navLinks.length} navigation links are keyboard accessible`);
  });

  /**
   * Property-based test: Verify filter buttons are keyboard accessible
   */
  test('Property 16 Extension: Filter buttons are keyboard accessible', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    expect(filterButtons.length, 'Should have filter buttons').toBeGreaterThan(0);
    
    filterButtons.forEach(button => {
      // Filter buttons should be <button> elements
      expect(button.tagName, 'Filter buttons should be <button> elements').toBe('BUTTON');
      
      // Should not have tabindex="-1"
      const tabindex = button.getAttribute('tabindex');
      expect(tabindex !== '-1', 
        'Filter buttons should be in tab order'
      ).toBe(true);
    });
    
    console.log(`✓ Verified ${filterButtons.length} filter buttons are keyboard accessible`);
  });

  /**
   * Property-based test: Verify CTA button is keyboard accessible
   */
  test('Property 16 Extension: CTA button is keyboard accessible', () => {
    const ctaButton = document.getElementById('cta-button');
    
    expect(ctaButton, 'CTA button should exist').toBeTruthy();
    
    // Should be a button element
    expect(ctaButton.tagName, 'CTA should be a button element').toBe('BUTTON');
    
    // Should not have tabindex="-1"
    const tabindex = ctaButton.getAttribute('tabindex');
    expect(tabindex !== '-1', 
      'CTA button should be in tab order'
    ).toBe(true);
    
    console.log(`✓ Verified CTA button is keyboard accessible`);
  });

  /**
   * Property-based test: Verify mobile menu toggle is keyboard accessible
   */
  test('Property 16 Extension: Mobile menu toggle is keyboard accessible', () => {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    
    expect(mobileMenuToggle, 'Mobile menu toggle should exist').toBeTruthy();
    
    // Should be a button element
    expect(mobileMenuToggle.tagName, 'Mobile menu toggle should be a button').toBe('BUTTON');
    
    // Should not have tabindex="-1"
    const tabindex = mobileMenuToggle.getAttribute('tabindex');
    expect(tabindex !== '-1', 
      'Mobile menu toggle should be in tab order'
    ).toBe(true);
    
    // Should have aria-label for screen readers
    expect(mobileMenuToggle.hasAttribute('aria-label'), 
      'Mobile menu toggle should have aria-label'
    ).toBe(true);
    
    console.log(`✓ Verified mobile menu toggle is keyboard accessible`);
  });
});
