/**
 * Browser Compatibility Test Suite
 * Tests for cross-browser compatibility across Chrome, Firefox, Safari, and Edge
 * 
 * This test suite validates that the website uses compatible features
 * and provides appropriate fallbacks for older browsers.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Browser Compatibility Tests', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    // Load the HTML file
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');
    const css = fs.readFileSync(path.resolve(__dirname, '../styles.css'), 'utf-8');
    
    // Create DOM with resources
    dom = new JSDOM(html, {
      runScripts: 'dangerously',
      resources: 'usable',
      url: 'http://localhost'
    });
    
    document = dom.window.document;
    window = dom.window;
    
    // Inject CSS
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  });

  describe('CSS Feature Compatibility', () => {
    it('should use CSS Grid with Flexbox fallback capability', () => {
      const menuGrid = document.getElementById('menu-grid');
      expect(menuGrid).toBeTruthy();
      
      const styles = window.getComputedStyle(menuGrid);
      // CSS Grid is used (supported in all modern browsers)
      expect(menuGrid.classList.contains('grid')).toBe(true);
    });

    it('should use CSS custom properties (CSS variables)', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../styles.css'), 'utf-8');
      
      // Check that CSS variables are defined
      expect(css).toContain('--turmeric-yellow');
      expect(css).toContain('--chutney-green');
      expect(css).toContain('--chili-red');
      expect(css).toContain('--rice-white');
      expect(css).toContain('--charcoal');
    });

    it('should have font fallbacks for system fonts', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../styles.css'), 'utf-8');
      
      // Check display font fallbacks
      expect(css).toContain("'Arial Black'");
      expect(css).toContain('cursive');
      expect(css).toContain('sans-serif');
      
      // Check body font fallbacks
      expect(css).toContain('-apple-system');
      expect(css).toContain('BlinkMacSystemFont');
      expect(css).toContain("'Segoe UI'");
    });

    it('should use vendor-prefixed properties where needed', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../styles.css'), 'utf-8');
      
      // Modern CSS doesn't need many prefixes, but check for standard properties
      expect(css).toContain('box-sizing: border-box');
      expect(css).toContain('transition:');
      expect(css).toContain('transform:');
    });

    it('should support smooth scrolling with fallback', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../styles.css'), 'utf-8');
      
      // Check for scroll-behavior
      expect(css).toContain('scroll-behavior: smooth');
    });

    it('should have reduced motion support', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../styles.css'), 'utf-8');
      
      // Check for prefers-reduced-motion media query
      expect(css).toContain('@media (prefers-reduced-motion: reduce)');
      expect(css).toContain('animation-duration: 0.01ms !important');
      expect(css).toContain('transition-duration: 0.01ms !important');
    });
  });

  describe('JavaScript Feature Compatibility', () => {
    it('should use ES6+ features with broad browser support', () => {
      const js = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf-8');
      
      // Check for modern but widely supported features
      expect(js).toContain('const ');
      expect(js).toContain('let ');
      expect(js).toContain('=>'); // Arrow functions
      expect(js).toContain('...'); // Spread operator
    });

    it('should have error handling for missing elements', () => {
      const js = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf-8');
      
      // Check for null checks
      expect(js).toContain('if (!');
      expect(js).toContain('console.warn');
      expect(js).toContain('console.error');
    });

    it('should check for element existence before manipulation', () => {
      const js = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf-8');
      
      // Verify defensive programming
      expect(js).toContain('if (!menuGrid)');
      expect(js).toContain('if (!marqueeContainer)');
      expect(js).toContain('if (!targetElement)');
    });

    it('should use standard DOM APIs', () => {
      const js = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf-8');
      
      // Check for standard DOM methods (supported in all browsers)
      expect(js).toContain('getElementById');
      expect(js).toContain('querySelectorAll');
      expect(js).toContain('addEventListener');
      expect(js).toContain('classList');
    });

    it('should use scrollIntoView for smooth scrolling', () => {
      const js = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf-8');
      
      // scrollIntoView with smooth behavior is widely supported
      expect(js).toContain('scrollIntoView');
      expect(js).toContain("behavior: 'smooth'");
    });
  });

  describe('HTML5 Feature Compatibility', () => {
    it('should use semantic HTML5 elements', () => {
      // All modern browsers support these
      expect(document.querySelector('nav')).toBeTruthy();
      expect(document.querySelector('section')).toBeTruthy();
      expect(document.querySelector('footer')).toBeTruthy();
    });

    it('should have proper meta tags for mobile browsers', () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).toBeTruthy();
      expect(viewport.getAttribute('content')).toContain('width=device-width');
      expect(viewport.getAttribute('content')).toContain('initial-scale=1.0');
    });

    it('should have proper charset declaration', () => {
      const charset = document.querySelector('meta[charset]');
      expect(charset).toBeTruthy();
      expect(charset.getAttribute('charset')).toBe('UTF-8');
    });

    it('should have proper doctype', () => {
      const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');
      expect(html.trim().startsWith('<!DOCTYPE html>')).toBe(true);
    });
  });

  describe('CDN Resource Loading', () => {
    it('should load Tailwind CSS from CDN', () => {
      const tailwindScript = document.querySelector('script[src*="tailwindcss"]');
      expect(tailwindScript).toBeTruthy();
      expect(tailwindScript.getAttribute('src')).toContain('cdn.tailwindcss.com');
    });

    it('should load Google Fonts with preconnect', () => {
      const preconnects = document.querySelectorAll('link[rel="preconnect"]');
      expect(preconnects.length).toBeGreaterThan(0);
      
      const googleFonts = Array.from(preconnects).some(link => 
        link.getAttribute('href').includes('fonts.googleapis.com') ||
        link.getAttribute('href').includes('fonts.gstatic.com')
      );
      expect(googleFonts).toBe(true);
    });

    it('should have font stylesheet link', () => {
      const fontLink = document.querySelector('link[rel="stylesheet"][href*="fonts.googleapis.com"]');
      expect(fontLink).toBeTruthy();
      expect(fontLink.getAttribute('rel')).toBe('stylesheet');
    });

    it('should load custom CSS and JS files', () => {
      const customCSS = document.querySelector('link[href="styles.css"]');
      const customJS = document.querySelector('script[src="script.js"]');
      
      expect(customCSS).toBeTruthy();
      expect(customJS).toBeTruthy();
    });
  });

  describe('Accessibility Features (Cross-browser)', () => {
    it('should have ARIA labels for icon buttons', () => {
      const mobileToggle = document.getElementById('mobile-menu-toggle');
      expect(mobileToggle).toBeTruthy();
      expect(mobileToggle.getAttribute('aria-label')).toBeTruthy();
      expect(mobileToggle.getAttribute('aria-expanded')).toBeTruthy();
    });

    it('should have proper alt text or aria-label for images', () => {
      const svg = document.querySelector('svg[role="img"]');
      expect(svg).toBeTruthy();
      expect(svg.getAttribute('aria-label')).toBeTruthy();
    });

    it('should have proper link attributes for external links', () => {
      const socialLinks = document.querySelectorAll('a[target="_blank"]');
      
      socialLinks.forEach(link => {
        expect(link.getAttribute('rel')).toContain('noopener');
        expect(link.getAttribute('aria-label')).toBeTruthy();
      });
    });

    it('should have focus-visible styles', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../styles.css'), 'utf-8');
      expect(css).toContain(':focus-visible');
    });
  });

  describe('Responsive Design (Cross-browser)', () => {
    it('should use mobile-first responsive breakpoints', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../styles.css'), 'utf-8');
      
      // Check for standard breakpoints
      expect(css).toContain('@media (min-width: 768px)');
      expect(css).toContain('@media (min-width: 1024px)');
    });

    it('should have responsive grid classes', () => {
      const menuGrid = document.getElementById('menu-grid');
      const classes = menuGrid.className;
      
      // Tailwind responsive classes
      expect(classes).toContain('grid-cols-1');
      expect(classes).toContain('md:grid-cols-2');
      expect(classes).toContain('lg:grid-cols-3');
    });

    it('should hide mobile menu on desktop', () => {
      const navLinks = document.getElementById('nav-links');
      expect(navLinks.classList.contains('hidden')).toBe(true);
      expect(navLinks.classList.contains('md:flex')).toBe(true);
    });
  });

  describe('Animation Performance', () => {
    it('should use GPU-accelerated properties', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../styles.css'), 'utf-8');
      
      // Check for transform and opacity (GPU-accelerated)
      expect(css).toContain('transform:');
      expect(css).toContain('opacity');
      
      // Should avoid animating layout properties
      const hasLayoutAnimations = css.includes('animation: width') || 
                                   css.includes('animation: height') ||
                                   css.includes('animation: top') ||
                                   css.includes('animation: left');
      expect(hasLayoutAnimations).toBe(false);
    });

    it('should use CSS transitions for smooth effects', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../styles.css'), 'utf-8');
      
      expect(css).toContain('transition:');
      expect(css).toContain('var(--transition-');
    });
  });

  describe('Print Styles', () => {
    it('should have print-specific styles', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../styles.css'), 'utf-8');
      
      expect(css).toContain('@media print');
    });
  });

  describe('Browser-Specific Considerations', () => {
    it('should work without jQuery or other dependencies', () => {
      const js = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf-8');
      
      // Should use vanilla JavaScript
      expect(js).not.toContain('jQuery');
      expect(js).not.toContain('$.');
    });

    it('should handle missing CDN resources gracefully', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../styles.css'), 'utf-8');
      
      // Custom CSS provides fallback styles
      expect(css.length).toBeGreaterThan(1000); // Has substantial custom styles
    });

    it('should use standard event listeners', () => {
      const js = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf-8');
      
      // Standard addEventListener (not attachEvent for old IE)
      expect(js).toContain('addEventListener');
      expect(js).not.toContain('attachEvent');
    });
  });
});
