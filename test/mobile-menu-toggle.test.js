// Property Test: Mobile Menu Toggle
// Feature: gurukrupa-snacks-website, Property 19: Mobile Menu Toggle
// **Validates: Requirements 2.5**

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import fc from 'fast-check';

describe('Property 19: Mobile Menu Toggle', () => {
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
        win.Element.prototype.scrollIntoView = vi.fn();
        win.scrollTo = vi.fn();
      }
    });

    window = dom.window;
    document = window.document;
    
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
    
    await new Promise(resolve => setTimeout(resolve, 50));
  });

  afterEach(() => {
    dom.window.close();
  });

  it('Property 19: For any state of the mobile menu, clicking hamburger SHALL toggle to opposite state', () => {
    // Property: For any state (open/closed), clicking hamburger toggles to opposite state
    
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10 }),
        (numClicks) => {
          const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
          const navLinks = document.getElementById('nav-links');
          
          if (!mobileMenuToggle || !navLinks) {
            return true; // Skip if elements don't exist
          }
          
          // Start with a known state (closed)
          if (navLinks.classList.contains('show')) {
            mobileMenuToggle.click();
          }
          
          // Verify initial state is closed
          expect(navLinks.classList.contains('hidden')).toBe(true);
          expect(navLinks.classList.contains('show')).toBe(false);
          expect(mobileMenuToggle.getAttribute('aria-expanded')).toBe('false');
          expect(mobileMenuToggle.textContent.trim()).toBe('☰');
          
          // Click multiple times and verify toggle behavior
          for (let i = 0; i < numClicks; i++) {
            const wasOpen = navLinks.classList.contains('show');
            
            mobileMenuToggle.click();
            
            const isOpen = navLinks.classList.contains('show');
            
            // Verify state toggled
            expect(isOpen).toBe(!wasOpen);
            
            // Verify all related attributes are consistent
            if (isOpen) {
              expect(navLinks.classList.contains('hidden')).toBe(false);
              expect(mobileMenuToggle.getAttribute('aria-expanded')).toBe('true');
              expect(mobileMenuToggle.textContent.trim()).toBe('✕');
            } else {
              expect(navLinks.classList.contains('hidden')).toBe(true);
              expect(mobileMenuToggle.getAttribute('aria-expanded')).toBe('false');
              expect(mobileMenuToggle.textContent.trim()).toBe('☰');
            }
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 19: Mobile menu state should be consistent across all state indicators', () => {
    // Property: All state indicators (classes, aria, icon) should be synchronized
    
    fc.assert(
      fc.property(
        fc.boolean(),
        (shouldBeOpen) => {
          const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
          const navLinks = document.getElementById('nav-links');
          
          if (!mobileMenuToggle || !navLinks) {
            return true;
          }
          
          // Set to desired state
          const currentlyOpen = navLinks.classList.contains('show');
          if (currentlyOpen !== shouldBeOpen) {
            mobileMenuToggle.click();
          }
          
          // Verify all indicators are consistent
          const isOpen = navLinks.classList.contains('show');
          const isHidden = navLinks.classList.contains('hidden');
          const ariaExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
          const iconIsClose = mobileMenuToggle.textContent.trim() === '✕';
          
          // All indicators should agree on the state
          expect(isOpen).toBe(!isHidden);
          expect(isOpen).toBe(ariaExpanded);
          expect(isOpen).toBe(iconIsClose);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 19: Escape key should close menu when open, no effect when closed', () => {
    // Property: Escape key behavior depends on current state
    
    fc.assert(
      fc.property(
        fc.boolean(),
        (startOpen) => {
          const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
          const navLinks = document.getElementById('nav-links');
          
          if (!mobileMenuToggle || !navLinks) {
            return true;
          }
          
          // Set initial state
          const currentlyOpen = navLinks.classList.contains('show');
          if (currentlyOpen !== startOpen) {
            mobileMenuToggle.click();
          }
          
          // Press Escape key
          const escapeEvent = new window.KeyboardEvent('keydown', {
            key: 'Escape',
            code: 'Escape',
            keyCode: 27,
            bubbles: true
          });
          document.dispatchEvent(escapeEvent);
          
          // Menu should always be closed after Escape
          expect(navLinks.classList.contains('hidden')).toBe(true);
          expect(navLinks.classList.contains('show')).toBe(false);
          expect(mobileMenuToggle.getAttribute('aria-expanded')).toBe('false');
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 19: Clicking navigation link should close mobile menu if open', () => {
    // Property: Navigation links should close the menu when clicked
    
    fc.assert(
      fc.property(
        fc.constantFrom('#hero', '#menu', '#facts', '#footer'),
        (targetSection) => {
          const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
          const navLinks = document.getElementById('nav-links');
          const navLink = document.querySelector(`a[href="${targetSection}"]`);
          
          if (!mobileMenuToggle || !navLinks || !navLink) {
            return true;
          }
          
          // Open the mobile menu
          if (!navLinks.classList.contains('show')) {
            mobileMenuToggle.click();
          }
          
          // Verify menu is open
          expect(navLinks.classList.contains('show')).toBe(true);
          
          // Click a navigation link
          navLink.click();
          
          // Menu should be closed
          expect(navLinks.classList.contains('hidden')).toBe(true);
          expect(navLinks.classList.contains('show')).toBe(false);
          expect(mobileMenuToggle.getAttribute('aria-expanded')).toBe('false');
          expect(mobileMenuToggle.textContent.trim()).toBe('☰');
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 19: Toggle behavior should be idempotent - same number of clicks returns to same state', () => {
    // Property: Even number of clicks returns to original state, odd number toggles
    
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 20 }),
        (numClicks) => {
          const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
          const navLinks = document.getElementById('nav-links');
          
          if (!mobileMenuToggle || !navLinks) {
            return true;
          }
          
          // Start with closed state
          if (navLinks.classList.contains('show')) {
            mobileMenuToggle.click();
          }
          
          const initialState = navLinks.classList.contains('show');
          
          // Click numClicks times
          for (let i = 0; i < numClicks; i++) {
            mobileMenuToggle.click();
          }
          
          const finalState = navLinks.classList.contains('show');
          
          // Even number of clicks should return to initial state
          // Odd number of clicks should be opposite of initial state
          if (numClicks % 2 === 0) {
            expect(finalState).toBe(initialState);
          } else {
            expect(finalState).toBe(!initialState);
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
