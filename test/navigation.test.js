// Navigation Functionality Tests
// Tests for Requirements 2.1, 2.2, 2.3, 2.5

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Navigation Functionality', () => {
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
        win.Element.prototype.scrollIntoView = vi.fn();
        
        // Mock window.scrollTo
        win.scrollTo = vi.fn();
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

  describe('Navigation Links - Requirement 2.2', () => {
    it('should have navigation links to all required sections', () => {
      const navLinks = document.querySelectorAll('.nav-link');
      const hrefs = Array.from(navLinks).map(link => link.getAttribute('href'));
      
      expect(hrefs).toContain('#hero');
      expect(hrefs).toContain('#menu');
      expect(hrefs).toContain('#facts');
      expect(hrefs).toContain('#footer');
    });

    it('should have all target sections present in the document', () => {
      const heroSection = document.getElementById('hero');
      const menuSection = document.getElementById('menu');
      const factsSection = document.getElementById('facts');
      const footerSection = document.getElementById('footer');
      
      expect(heroSection).toBeTruthy();
      expect(menuSection).toBeTruthy();
      expect(factsSection).toBeTruthy();
      expect(footerSection).toBeTruthy();
    });
  });

  describe('Sticky Navigation - Requirement 2.1', () => {
    it('should have sticky positioning on navigation bar', () => {
      const navbar = document.getElementById('navbar');
      expect(navbar).toBeTruthy();
      
      const styles = window.getComputedStyle(navbar);
      const classes = navbar.className;
      
      // Check for sticky class or inline style
      expect(classes.includes('sticky') || styles.position === 'sticky').toBe(true);
    });

    it('should have top-0 positioning for sticky behavior', () => {
      const navbar = document.getElementById('navbar');
      const classes = navbar.className;
      
      // Tailwind's sticky top-0 class should be present
      expect(classes.includes('top-0')).toBe(true);
    });

    it('should have high z-index to stay above content', () => {
      const navbar = document.getElementById('navbar');
      const classes = navbar.className;
      
      // Should have z-50 or similar high z-index
      expect(classes.includes('z-50') || classes.includes('z-')).toBe(true);
    });
  });

  describe('Smooth Scroll - Requirement 2.3', () => {
    it('should call scrollIntoView with smooth behavior when nav link is clicked', () => {
      const menuLink = document.querySelector('a[href="#menu"]');
      const menuSection = document.getElementById('menu');
      
      expect(menuLink).toBeTruthy();
      expect(menuSection).toBeTruthy();
      
      // Mock scrollIntoView before clicking
      const scrollIntoViewMock = vi.fn();
      menuSection.scrollIntoView = scrollIntoViewMock;
      
      // Click the link
      menuLink.click();
      
      // Check immediately (scrollIntoView is called synchronously)
      expect(scrollIntoViewMock).toHaveBeenCalled();
      const callArgs = scrollIntoViewMock.mock.calls[0][0];
      expect(callArgs.behavior).toBe('smooth');
      expect(callArgs.block).toBe('start');
    });

    it('should scroll to correct section when navigation link is clicked', () => {
      const links = [
        { href: '#hero', id: 'hero' },
        { href: '#menu', id: 'menu' },
        { href: '#facts', id: 'facts' },
        { href: '#footer', id: 'footer' }
      ];

      links.forEach(({ href, id }) => {
        const link = document.querySelector(`a[href="${href}"]`);
        const section = document.getElementById(id);
        
        expect(link).toBeTruthy();
        expect(section).toBeTruthy();
        
        // Mock scrollIntoView before clicking
        const scrollMock = vi.fn();
        section.scrollIntoView = scrollMock;
        
        // Click the link
        link.click();
        
        // Verify scrollIntoView was called on the correct element (synchronous)
        expect(scrollMock).toHaveBeenCalled();
      });
    });

    it('should use 800ms duration for smooth scroll (CONFIG.scrollDuration)', () => {
      const scriptContent = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8');
      
      // Check that CONFIG.scrollDuration is set to 800
      expect(scriptContent).toContain('scrollDuration: 800');
    });
  });

  describe('Mobile Menu Toggle - Requirement 2.5', () => {
    it('should have hamburger menu toggle button', () => {
      const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
      expect(mobileMenuToggle).toBeTruthy();
      expect(mobileMenuToggle.classList.contains('hamburger')).toBe(true);
    });

    it('should have navigation menu with hidden class initially on mobile', () => {
      const navLinks = document.getElementById('nav-links');
      expect(navLinks).toBeTruthy();
      
      // Should have hidden class for mobile
      const classes = navLinks.className;
      expect(classes.includes('hidden')).toBe(true);
    });

    it('should toggle mobile menu visibility when hamburger is clicked', () => {
      const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
      const navLinks = document.getElementById('nav-links');
      
      // Initial state - menu should be hidden
      expect(navLinks.classList.contains('hidden')).toBe(true);
      
      // Click to open
      mobileMenuToggle.click();
      
      // Menu should now be visible (synchronous)
      expect(navLinks.classList.contains('hidden')).toBe(false);
      expect(navLinks.classList.contains('show')).toBe(true);
    });

    it('should toggle hamburger icon between ☰ and ✕', () => {
      const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
      
      // Initial state
      expect(mobileMenuToggle.textContent.trim()).toBe('☰');
      
      // Click to open
      mobileMenuToggle.click();
      
      // Check immediately after click (synchronous)
      expect(mobileMenuToggle.textContent.trim()).toBe('✕');
      
      // Click to close
      mobileMenuToggle.click();
      
      // Check immediately after click (synchronous)
      expect(mobileMenuToggle.textContent.trim()).toBe('☰');
    });

    it('should update aria-expanded attribute when toggling', () => {
      const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
      
      // Initial state
      expect(mobileMenuToggle.getAttribute('aria-expanded')).toBe('false');
      
      // Click to open
      mobileMenuToggle.click();
      
      // Check immediately (synchronous)
      expect(mobileMenuToggle.getAttribute('aria-expanded')).toBe('true');
      
      // Click to close
      mobileMenuToggle.click();
      
      // Check immediately (synchronous)
      expect(mobileMenuToggle.getAttribute('aria-expanded')).toBe('false');
    });

    it('should close mobile menu when navigation link is clicked', () => {
      const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
      const navLinks = document.getElementById('nav-links');
      const menuLink = document.querySelector('a[href="#menu"]');
      
      // Open mobile menu first
      mobileMenuToggle.click();
      
      // Verify menu is open (synchronous)
      expect(navLinks.classList.contains('show')).toBe(true);
      
      // Click a navigation link
      menuLink.click();
      
      // Menu should be closed (synchronous)
      expect(navLinks.classList.contains('hidden')).toBe(true);
      expect(navLinks.classList.contains('show')).toBe(false);
    });
  });

  describe('Escape Key Closes Mobile Menu - Requirement 2.5', () => {
    it('should close mobile menu when Escape key is pressed', () => {
      const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
      const navLinks = document.getElementById('nav-links');
      
      // Open mobile menu first
      mobileMenuToggle.click();
      
      // Verify menu is open (synchronous)
      expect(navLinks.classList.contains('show')).toBe(true);
      
      // Press Escape key
      const escapeEvent = new window.KeyboardEvent('keydown', {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        bubbles: true
      });
      document.dispatchEvent(escapeEvent);
      
      // Menu should be closed (synchronous)
      expect(navLinks.classList.contains('hidden')).toBe(true);
      expect(navLinks.classList.contains('show')).toBe(false);
    });

    it('should not affect menu when Escape is pressed and menu is already closed', () => {
      const navLinks = document.getElementById('nav-links');
      
      // Ensure menu is closed
      expect(navLinks.classList.contains('hidden')).toBe(true);
      
      // Press Escape key
      const escapeEvent = new window.KeyboardEvent('keydown', {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        bubbles: true
      });
      document.dispatchEvent(escapeEvent);
      
      // Menu should still be closed (no change, synchronous)
      expect(navLinks.classList.contains('hidden')).toBe(true);
    });
  });

  describe('Navigation Module Initialization', () => {
    it('should have navigation functionality working after page load', () => {
      // Verify that navigation elements exist and are functional
      const navbar = document.getElementById('navbar');
      const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
      const navLinks = document.getElementById('nav-links');
      
      expect(navbar).toBeTruthy();
      expect(mobileMenuToggle).toBeTruthy();
      expect(navLinks).toBeTruthy();
      
      // Verify event listeners are attached by testing functionality
      mobileMenuToggle.click();
      expect(navLinks.classList.contains('show')).toBe(true);
    });
  });
});
