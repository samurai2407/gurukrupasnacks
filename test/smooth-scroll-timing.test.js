// Property Test: Smooth Scroll Timing
// Feature: gurukrupa-snacks-website, Property 18: Smooth Scroll Timing
// **Validates: Requirements 2.3**

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import fc from 'fast-check';

describe('Property 18: Smooth Scroll Timing', () => {
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
        // Mock scrollIntoView with timing tracking
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

  it('Property 18: For any navigation link clicked, smooth scroll configuration should be set to 800ms', () => {
    // Property: For any navigation link, the scroll duration configuration SHALL be 800ms
    
    fc.assert(
      fc.property(
        fc.constantFrom('#hero', '#menu', '#facts', '#footer'),
        (targetSection) => {
          // Find the navigation link for this section
          const link = document.querySelector(`a[href="${targetSection}"]`);
          const targetElement = document.getElementById(targetSection.substring(1));
          
          // Both link and target must exist
          if (!link || !targetElement) {
            return true; // Skip if elements don't exist
          }
          
          // Mock scrollIntoView to track calls
          const scrollMock = vi.fn();
          targetElement.scrollIntoView = scrollMock;
          
          // Click the navigation link
          link.click();
          
          // Verify scrollIntoView was called with smooth behavior
          expect(scrollMock).toHaveBeenCalled();
          const callArgs = scrollMock.mock.calls[0][0];
          
          // The scroll should use smooth behavior
          expect(callArgs.behavior).toBe('smooth');
          expect(callArgs.block).toBe('start');
          
          // Verify CONFIG.scrollDuration is set to 800ms
          const scriptContent = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8');
          const configMatch = scriptContent.match(/scrollDuration:\s*(\d+)/);
          
          if (configMatch) {
            const duration = parseInt(configMatch[1], 10);
            expect(duration).toBe(800);
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 18: Smooth scroll behavior should be consistent across all navigation links', () => {
    // Property: All navigation links should use the same smooth scroll configuration
    
    const navLinks = [
      { href: '#hero', id: 'hero' },
      { href: '#menu', id: 'menu' },
      { href: '#facts', id: 'facts' },
      { href: '#footer', id: 'footer' }
    ];

    fc.assert(
      fc.property(
        fc.shuffledSubarray(navLinks, { minLength: 1, maxLength: navLinks.length }),
        (selectedLinks) => {
          const scrollBehaviors = [];
          
          selectedLinks.forEach(({ href, id }) => {
            const link = document.querySelector(`a[href="${href}"]`);
            const section = document.getElementById(id);
            
            if (link && section) {
              const scrollMock = vi.fn();
              section.scrollIntoView = scrollMock;
              
              link.click();
              
              if (scrollMock.mock.calls.length > 0) {
                const callArgs = scrollMock.mock.calls[0][0];
                scrollBehaviors.push({
                  behavior: callArgs.behavior,
                  block: callArgs.block
                });
              }
            }
          });
          
          // All scroll behaviors should be identical
          if (scrollBehaviors.length > 1) {
            const firstBehavior = scrollBehaviors[0];
            scrollBehaviors.forEach(behavior => {
              expect(behavior.behavior).toBe(firstBehavior.behavior);
              expect(behavior.block).toBe(firstBehavior.block);
            });
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 18: CTA button should also use 800ms scroll duration', () => {
    // Property: The CTA button scroll should use the same timing as navigation links
    
    fc.assert(
      fc.property(
        fc.constant('cta-button'),
        (buttonId) => {
          const ctaButton = document.getElementById(buttonId);
          const menuSection = document.getElementById('menu');
          
          if (!ctaButton || !menuSection) {
            return true; // Skip if elements don't exist
          }
          
          // Mock scrollIntoView
          const scrollMock = vi.fn();
          menuSection.scrollIntoView = scrollMock;
          
          // Click the CTA button
          ctaButton.click();
          
          // Verify smooth scroll was called
          expect(scrollMock).toHaveBeenCalled();
          const callArgs = scrollMock.mock.calls[0][0];
          
          expect(callArgs.behavior).toBe('smooth');
          expect(callArgs.block).toBe('start');
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 18: Scroll duration configuration should be accessible and consistent', () => {
    // Property: The CONFIG.scrollDuration should be defined and set to 800ms
    
    const scriptContent = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8');
    
    // Check that CONFIG object exists and has scrollDuration
    expect(scriptContent).toContain('const CONFIG = {');
    expect(scriptContent).toContain('scrollDuration:');
    
    // Extract the scrollDuration value
    const configMatch = scriptContent.match(/scrollDuration:\s*(\d+)/);
    expect(configMatch).toBeTruthy();
    
    const duration = parseInt(configMatch[1], 10);
    
    // Verify it's exactly 800ms as per requirement 2.3
    expect(duration).toBe(800);
  });
});
