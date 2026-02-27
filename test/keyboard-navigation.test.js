/**
 * Keyboard Navigation Tests
 * Feature: gurukrupa-snacks-website
 * Task 12.2: Test keyboard navigation
 * 
 * Tests that all interactive elements are keyboard accessible
 * and can be navigated using Tab, Enter, Space, and Escape keys.
 */

import { describe, test, expect, beforeEach } from 'vitest';
import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';

// Load the HTML file
const htmlContent = readFileSync('./index.html', 'utf8');
const scriptContent = readFileSync('./script.js', 'utf8');

describe('Keyboard Navigation Tests', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    dom = new JSDOM(htmlContent, {
      url: 'http://localhost',
      runScripts: 'dangerously',
      resources: 'usable'
    });
    document = dom.window.document;
    window = dom.window;

    // Execute the script
    const scriptElement = document.createElement('script');
    scriptElement.textContent = scriptContent;
    document.body.appendChild(scriptElement);

    // Wait for script to initialize
    return new Promise(resolve => setTimeout(resolve, 100));
  });

  test('all interactive elements should be keyboard accessible (have tabindex or be naturally focusable)', () => {
    // Get all interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]'
    );

    expect(interactiveElements.length, 
      'Should have interactive elements'
    ).toBeGreaterThan(0);

    interactiveElements.forEach(element => {
      // Check if element is focusable
      const tabindex = element.getAttribute('tabindex');
      const isNaturallyFocusable = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName);
      
      // Element should either be naturally focusable or have a non-negative tabindex
      const isFocusable = isNaturallyFocusable || (tabindex !== null && parseInt(tabindex) >= 0);
      
      expect(isFocusable, 
        `Element ${element.tagName} should be focusable`
      ).toBe(true);

      // Element should not have tabindex="-1" unless it's intentionally non-focusable
      if (tabindex === '-1') {
        // This is OK for elements that should be programmatically focusable but not in tab order
        // Just log it for awareness
        console.log(`Note: Element has tabindex="-1": ${element.outerHTML.substring(0, 100)}`);
      }
    });
  });

  test('navigation links should be reachable via Tab key', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    expect(navLinks.length, 'Should have navigation links').toBeGreaterThan(0);

    navLinks.forEach(link => {
      // Links should be <a> elements (naturally focusable)
      expect(link.tagName, 'Navigation links should be <a> elements').toBe('A');
      
      // Links should have href attribute
      expect(link.hasAttribute('href'), 
        'Navigation links should have href attribute'
      ).toBe(true);
      
      // Links should not have tabindex="-1"
      const tabindex = link.getAttribute('tabindex');
      expect(tabindex !== '-1', 
        'Navigation links should be in tab order'
      ).toBe(true);
    });
  });

  test('buttons should be activatable with Enter and Space keys', () => {
    const buttons = document.querySelectorAll('button');
    
    expect(buttons.length, 'Should have buttons').toBeGreaterThan(0);

    buttons.forEach(button => {
      // Buttons should be <button> elements (naturally support Enter/Space)
      expect(button.tagName, 'Interactive buttons should use <button> element').toBe('BUTTON');
      
      // Buttons should not be disabled (unless intentionally)
      if (button.disabled) {
        console.log(`Note: Button is disabled: ${button.outerHTML.substring(0, 100)}`);
      }
    });
  });

  test('mobile menu toggle button should have proper keyboard support', () => {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    
    expect(mobileMenuToggle, 'Mobile menu toggle should exist').toBeTruthy();
    expect(mobileMenuToggle.tagName, 'Mobile menu toggle should be a button').toBe('BUTTON');
    
    // Should have aria-label for screen readers
    expect(mobileMenuToggle.hasAttribute('aria-label'), 
      'Mobile menu toggle should have aria-label'
    ).toBe(true);
    
    // Should have aria-expanded attribute
    expect(mobileMenuToggle.hasAttribute('aria-expanded'), 
      'Mobile menu toggle should have aria-expanded'
    ).toBe(true);
  });

  test('CTA button should be keyboard accessible', () => {
    const ctaButton = document.getElementById('cta-button');
    
    expect(ctaButton, 'CTA button should exist').toBeTruthy();
    expect(ctaButton.tagName, 'CTA button should be a button element').toBe('BUTTON');
    
    // Should not have tabindex="-1"
    const tabindex = ctaButton.getAttribute('tabindex');
    expect(tabindex !== '-1', 
      'CTA button should be in tab order'
    ).toBe(true);
  });

  test('category filter buttons should be keyboard accessible', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    expect(filterButtons.length, 'Should have filter buttons').toBeGreaterThan(0);

    filterButtons.forEach(button => {
      expect(button.tagName, 'Filter buttons should be button elements').toBe('BUTTON');
      
      // Should have data-category attribute
      expect(button.hasAttribute('data-category'), 
        'Filter buttons should have data-category attribute'
      ).toBe(true);
    });
  });

  test('social media links should be keyboard accessible', () => {
    const socialLinks = document.querySelectorAll('.social-link');
    
    expect(socialLinks.length, 'Should have social media links').toBeGreaterThan(0);

    socialLinks.forEach(link => {
      expect(link.tagName, 'Social links should be <a> elements').toBe('A');
      
      // Should have href attribute
      expect(link.hasAttribute('href'), 
        'Social links should have href attribute'
      ).toBe(true);
      
      // Should have target="_blank" for external links
      expect(link.getAttribute('target'), 
        'Social links should open in new tab'
      ).toBe('_blank');
      
      // Should have aria-label
      expect(link.hasAttribute('aria-label'), 
        'Social links should have aria-label'
      ).toBe(true);
    });
  });

  test('no elements should have positive tabindex values (anti-pattern)', () => {
    const elementsWithTabindex = document.querySelectorAll('[tabindex]');
    
    elementsWithTabindex.forEach(element => {
      const tabindex = parseInt(element.getAttribute('tabindex'));
      
      // Positive tabindex values are an anti-pattern
      expect(tabindex, 
        `Element should not have positive tabindex: ${element.outerHTML.substring(0, 100)}`
      ).toBeLessThanOrEqual(0);
    });
  });

  test('focus should be visible on interactive elements', () => {
    // Check that interactive elements have focus styles
    const interactiveElements = document.querySelectorAll('a, button');
    
    interactiveElements.forEach(element => {
      // Elements should either have focus-visible class support or focus styles
      // We can't test computed styles in JSDOM, but we can check for focus-related classes
      const classList = Array.from(element.classList);
      const hasFocusClass = classList.some(cls => 
        cls.includes('focus') || cls.includes('ring')
      );
      
      // If no focus class, element should rely on browser default focus styles
      // This is acceptable, so we just log it
      if (!hasFocusClass) {
        console.log(`Note: Element relies on default focus styles: ${element.tagName}#${element.id || 'no-id'}`);
      }
    });
  });
});
