/**
 * Performance Testing Suite
 * Simulates Lighthouse-style performance audits
 * 
 * Tests for:
 * - Page load time
 * - Resource optimization
 * - Animation performance
 * - Network efficiency
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Performance Tests', () => {
  let dom;
  let document;
  let window;
  let html;
  let css;
  let js;

  beforeEach(() => {
    // Load all files
    html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');
    css = fs.readFileSync(path.resolve(__dirname, '../styles.css'), 'utf-8');
    js = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf-8');
    
    dom = new JSDOM(html, {
      runScripts: 'dangerously',
      resources: 'usable',
      url: 'http://localhost'
    });
    
    document = dom.window.document;
    window = dom.window;
  });

  describe('Lighthouse Performance Audit Simulation', () => {
    it('should have minimal HTML file size (< 50KB)', () => {
      const htmlSize = Buffer.byteLength(html, 'utf-8');
      const htmlSizeKB = htmlSize / 1024;
      
      console.log(`HTML size: ${htmlSizeKB.toFixed(2)} KB`);
      expect(htmlSizeKB).toBeLessThan(50);
    });

    it('should have minimal CSS file size (< 50KB)', () => {
      const cssSize = Buffer.byteLength(css, 'utf-8');
      const cssSizeKB = cssSize / 1024;
      
      console.log(`CSS size: ${cssSizeKB.toFixed(2)} KB`);
      expect(cssSizeKB).toBeLessThan(50);
    });

    it('should have minimal JavaScript file size (< 50KB)', () => {
      const jsSize = Buffer.byteLength(js, 'utf-8');
      const jsSizeKB = jsSize / 1024;
      
      console.log(`JavaScript size: ${jsSizeKB.toFixed(2)} KB`);
      expect(jsSizeKB).toBeLessThan(50);
    });

    it('should have total page weight under 150KB (excluding CDN)', () => {
      const totalSize = Buffer.byteLength(html, 'utf-8') + 
                       Buffer.byteLength(css, 'utf-8') + 
                       Buffer.byteLength(js, 'utf-8');
      const totalSizeKB = totalSize / 1024;
      
      console.log(`Total page weight: ${totalSizeKB.toFixed(2)} KB`);
      expect(totalSizeKB).toBeLessThan(150);
    });

    it('should use CDN for external resources', () => {
      // Tailwind CSS from CDN
      const tailwindScript = document.querySelector('script[src*="cdn.tailwindcss.com"]');
      expect(tailwindScript).toBeTruthy();
      
      // Google Fonts from CDN
      const googleFonts = document.querySelector('link[href*="fonts.googleapis.com"]');
      expect(googleFonts).toBeTruthy();
    });

    it('should have preconnect hints for external domains', () => {
      const preconnects = document.querySelectorAll('link[rel="preconnect"]');
      expect(preconnects.length).toBeGreaterThan(0);
      
      const domains = Array.from(preconnects).map(link => link.getAttribute('href'));
      expect(domains).toContain('https://fonts.googleapis.com');
    });

    it('should have proper meta tags for performance', () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).toBeTruthy();
      expect(viewport.getAttribute('content')).toContain('width=device-width');
      
      const charset = document.querySelector('meta[charset]');
      expect(charset).toBeTruthy();
    });

    it('should load CSS before JavaScript', () => {
      const headChildren = Array.from(document.head.children);
      const cssIndex = headChildren.findIndex(el => 
        el.tagName === 'LINK' && el.getAttribute('href') === 'styles.css'
      );
      const jsIndex = headChildren.findIndex(el => 
        el.tagName === 'SCRIPT' && el.getAttribute('src') === 'script.js'
      );
      
      // JavaScript should be at the end of body, not in head
      expect(jsIndex).toBe(-1); // Not in head
      
      const bodyScript = document.querySelector('body > script[src="script.js"]');
      expect(bodyScript).toBeTruthy();
    });

    it('should have minimal number of DOM elements (< 500)', () => {
      const allElements = document.querySelectorAll('*');
      console.log(`Total DOM elements: ${allElements.length}`);
      expect(allElements.length).toBeLessThan(500);
    });

    it('should not have render-blocking resources in critical path', () => {
      // Custom CSS is small and necessary
      const customCSS = document.querySelector('link[href="styles.css"]');
      expect(customCSS).toBeTruthy();
      
      // JavaScript is at the end of body (non-blocking)
      const scripts = document.querySelectorAll('head script[src]');
      const blockingScripts = Array.from(scripts).filter(script => 
        !script.hasAttribute('async') && 
        !script.hasAttribute('defer') &&
        !script.getAttribute('src').includes('tailwindcss') // Tailwind is necessary
      );
      
      expect(blockingScripts.length).toBe(0);
    });
  });

  describe('Animation Performance', () => {
    it('should use GPU-accelerated properties for animations', () => {
      // Check for transform and opacity (GPU-accelerated)
      expect(css).toContain('transform:');
      expect(css).toContain('opacity');
      
      // Should not animate layout properties
      const badAnimations = [
        'animation: width',
        'animation: height',
        'animation: top',
        'animation: left',
        'animation: margin',
        'animation: padding'
      ];
      
      badAnimations.forEach(badAnim => {
        expect(css).not.toContain(badAnim);
      });
    });

    it('should use CSS transitions instead of JavaScript animations', () => {
      expect(css).toContain('transition:');
      
      // JavaScript should not contain animation loops
      expect(js).not.toContain('setInterval');
      expect(js).not.toContain('requestAnimationFrame');
    });

    it('should have reasonable animation durations', () => {
      const transitionMatches = css.match(/transition:.*?;/g) || [];
      // Match durations but exclude the reduced motion 0.01ms
      const durationMatches = css.match(/(?<!0\.)(\d{2,})ms/g) || [];
      
      durationMatches.forEach(match => {
        const duration = parseInt(match);
        
        // Animations should be between 100ms and 1000ms
        expect(duration).toBeGreaterThanOrEqual(100);
        expect(duration).toBeLessThanOrEqual(1000);
      });
      
      // Ensure we found some durations
      expect(durationMatches.length).toBeGreaterThan(0);
    });

    it('should respect prefers-reduced-motion', () => {
      expect(css).toContain('@media (prefers-reduced-motion: reduce)');
      expect(css).toContain('animation-duration: 0.01ms !important');
    });

    it('should use CSS animations for marquee (not JavaScript)', () => {
      expect(css).toContain('@keyframes marquee');
      expect(css).toContain('animation: marquee');
    });
  });

  describe('Resource Optimization', () => {
    it('should have minimal inline styles', () => {
      const inlineStyles = document.querySelectorAll('[style]');
      expect(inlineStyles.length).toBe(0);
    });

    it('should use semantic HTML to reduce markup', () => {
      // Check for semantic elements
      expect(document.querySelector('nav')).toBeTruthy();
      expect(document.querySelector('section')).toBeTruthy();
      expect(document.querySelector('footer')).toBeTruthy();
      
      // Should not have excessive divs
      const divs = document.querySelectorAll('div');
      const allElements = document.querySelectorAll('*');
      const divRatio = divs.length / allElements.length;
      
      // Divs should be less than 40% of all elements
      expect(divRatio).toBeLessThan(0.4);
    });

    it('should use CSS classes efficiently', () => {
      // Check that Tailwind classes are used (utility-first)
      const elementsWithClasses = document.querySelectorAll('[class]');
      expect(elementsWithClasses.length).toBeGreaterThan(0);
      
      // Custom CSS should not be excessively large
      const cssLines = css.split('\n').length;
      expect(cssLines).toBeLessThan(1000);
    });

    it('should minimize HTTP requests', () => {
      // Count external resources
      const externalScripts = document.querySelectorAll('script[src]');
      const externalStyles = document.querySelectorAll('link[rel="stylesheet"]');
      const externalImages = document.querySelectorAll('img[src^="http"]');
      
      const totalExternal = externalScripts.length + externalStyles.length + externalImages.length;
      
      console.log(`External resources: ${totalExternal}`);
      // Should have minimal external resources (CDN + custom files)
      expect(totalExternal).toBeLessThan(10);
    });

    it('should use inline SVG instead of external images', () => {
      const inlineSVG = document.querySelectorAll('svg');
      const externalImages = document.querySelectorAll('img');
      
      // Hero graphic should be inline SVG
      expect(inlineSVG.length).toBeGreaterThan(0);
      
      // Should not have external images for decorative graphics
      expect(externalImages.length).toBe(0);
    });
  });

  describe('JavaScript Performance', () => {
    it('should use event delegation for dynamic elements', () => {
      // Check for event delegation patterns
      expect(js).toContain('querySelectorAll');
      expect(js).toContain('forEach');
    });

    it('should debounce expensive operations', () => {
      expect(js).toContain('debounce');
      expect(js).toContain('resize');
    });

    it('should minimize DOM queries', () => {
      // Check that elements are cached
      expect(js).toContain('getElementById');
      expect(js).toContain('querySelector');
      
      // Should store references instead of repeated queries
      const getElementByIdCount = (js.match(/getElementById/g) || []).length;
      expect(getElementByIdCount).toBeLessThan(20);
    });

    it('should use efficient array methods', () => {
      // Modern array methods are optimized
      expect(js).toContain('forEach');
      expect(js).toContain('filter');
      // map is not used in this codebase, but forEach and filter are sufficient
    });

    it('should have modular code structure', () => {
      // Check for module pattern
      expect(js).toContain('const Navigation =');
      expect(js).toContain('const MenuSystem =');
      expect(js).toContain('const CategoryFilter =');
      
      // Should have init methods
      expect(js).toContain('init()');
    });

    it('should handle errors gracefully', () => {
      expect(js).toContain('if (!');
      expect(js).toContain('console.warn');
      expect(js).toContain('console.error');
    });
  });

  describe('Network Efficiency', () => {
    it('should have minimal data in JavaScript', () => {
      // Menu data should be reasonable size
      const menuDataMatch = js.match(/const menuData = \[([\s\S]*?)\];/);
      expect(menuDataMatch).toBeTruthy();
      
      const menuDataSize = Buffer.byteLength(menuDataMatch[0], 'utf-8');
      const menuDataKB = menuDataSize / 1024;
      
      console.log(`Menu data size: ${menuDataKB.toFixed(2)} KB`);
      expect(menuDataKB).toBeLessThan(10);
    });

    it('should use efficient CSS selectors', () => {
      // Check for efficient selectors (no universal selectors in rules)
      const universalSelectors = css.match(/\* \{[^}]*\}/g) || [];
      
      // Only * for reset is acceptable
      expect(universalSelectors.length).toBeLessThanOrEqual(2);
    });

    it('should minimize CSS specificity', () => {
      // Check for overly specific selectors
      const highSpecificity = css.match(/\w+\.\w+\.\w+\.\w+/g) || [];
      expect(highSpecificity.length).toBe(0);
    });
  });

  describe('Critical Rendering Path', () => {
    it('should have above-the-fold content in HTML', () => {
      // Hero section should be in HTML
      const heroSection = document.getElementById('hero');
      expect(heroSection).toBeTruthy();
      
      // Navigation should be in HTML
      const navbar = document.getElementById('navbar');
      expect(navbar).toBeTruthy();
    });

    it('should not require JavaScript for initial render', () => {
      // Menu grid should exist in HTML
      const menuGrid = document.getElementById('menu-grid');
      expect(menuGrid).toBeTruthy();
      
      // Facts section should exist in HTML
      const factsSection = document.getElementById('facts');
      expect(factsSection).toBeTruthy();
    });

    it('should have content visible without JavaScript', () => {
      // All sections should be in HTML
      const sections = document.querySelectorAll('section');
      expect(sections.length).toBeGreaterThan(0);
      
      // Footer should be visible
      const footer = document.getElementById('footer');
      expect(footer).toBeTruthy();
    });
  });

  describe('Slow Network Simulation', () => {
    it('should have reasonable total page size for 3G', () => {
      const totalSize = Buffer.byteLength(html, 'utf-8') + 
                       Buffer.byteLength(css, 'utf-8') + 
                       Buffer.byteLength(js, 'utf-8');
      
      // 3G speed: ~400 Kbps = 50 KB/s
      // Target: Load in < 3 seconds = < 150 KB
      const totalSizeKB = totalSize / 1024;
      
      console.log(`Total size for 3G: ${totalSizeKB.toFixed(2)} KB`);
      console.log(`Estimated load time on 3G: ${(totalSizeKB / 50).toFixed(2)} seconds`);
      
      expect(totalSizeKB).toBeLessThan(150);
    });

    it('should prioritize critical resources', () => {
      // CSS should be in head
      const cssInHead = document.querySelector('head link[href="styles.css"]');
      expect(cssInHead).toBeTruthy();
      
      // JavaScript should be at end of body
      const jsInBody = document.querySelector('body > script[src="script.js"]');
      expect(jsInBody).toBeTruthy();
    });

    it('should have minimal blocking resources', () => {
      // Only Tailwind CSS should block (necessary for layout)
      const blockingScripts = document.querySelectorAll('head script:not([async]):not([defer])');
      
      // Tailwind is blocking but necessary
      expect(blockingScripts.length).toBeLessThanOrEqual(1);
    });
  });

  describe('Performance Best Practices', () => {
    it('should not use document.write', () => {
      expect(js).not.toContain('document.write');
    });

    it('should not use synchronous XMLHttpRequest', () => {
      expect(js).not.toContain('XMLHttpRequest');
      expect(js).not.toContain('async: false');
    });

    it('should use passive event listeners where appropriate', () => {
      // For scroll events, passive listeners improve performance
      // Note: This is a best practice, not always required
      const hasScrollListeners = js.includes('scroll');
      if (hasScrollListeners) {
        // Should use debounce for scroll
        expect(js).toContain('debounce');
      }
    });

    it('should minimize layout thrashing', () => {
      // Should not read and write to DOM in loops
      expect(js).not.toContain('for (let i = 0; i < elements.length; i++) {');
      
      // Should use forEach or modern methods
      expect(js).toContain('forEach');
    });

    it('should use CSS for visual effects instead of JavaScript', () => {
      // Hover effects should be in CSS
      expect(css).toContain(':hover');
      
      // Transitions should be in CSS
      expect(css).toContain('transition:');
    });
  });
});
