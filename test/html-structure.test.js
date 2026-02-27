/**
 * Property-Based Tests for HTML Structure
 * Feature: gurukrupa-snacks-website
 */

import { describe, test, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';

// Load the HTML file
const htmlContent = readFileSync('./index.html', 'utf8');

describe('HTML Structure Property Tests', () => {
  let dom;
  let document;

  beforeEach(() => {
    dom = new JSDOM(htmlContent);
    document = dom.window.document;
  });

  /**
   * Property 1: Semantic HTML Structure
   * **Validates: Requirements 1.5, 11.2**
   * 
   * For all structural components in the website (navigation, sections, footer),
   * the HTML elements used SHALL be semantic HTML5 elements (nav, header, section,
   * article, footer, aside) rather than generic div elements.
   */
  test('Property 1: All major structural components use semantic HTML5 elements', () => {
    // Feature: gurukrupa-snacks-website, Property 1: Semantic HTML Structure
    
    // Define the semantic elements we expect to find
    const semanticElements = [
      { selector: 'nav', name: 'Navigation', minCount: 1 },
      { selector: 'section', name: 'Section', minCount: 3 }, // hero, menu, facts
      { selector: 'footer', name: 'Footer', minCount: 1 }
    ];

    // Check each semantic element exists
    semanticElements.forEach(({ selector, name, minCount }) => {
      const elements = document.querySelectorAll(selector);
      expect(elements.length, 
        `Expected at least ${minCount} ${name} element(s), found ${elements.length}`
      ).toBeGreaterThanOrEqual(minCount);
    });

    // Verify specific structural sections use semantic elements
    const structuralChecks = [
      { id: 'navbar', expectedTag: 'NAV', name: 'Navigation bar' },
      { id: 'hero', expectedTag: 'SECTION', name: 'Hero section' },
      { id: 'menu', expectedTag: 'SECTION', name: 'Menu section' },
      { id: 'facts', expectedTag: 'SECTION', name: 'Facts section' },
      { id: 'footer', expectedTag: 'FOOTER', name: 'Footer' }
    ];

    structuralChecks.forEach(({ id, expectedTag, name }) => {
      const element = document.getElementById(id);
      expect(element, `${name} with id="${id}" should exist`).toBeTruthy();
      expect(element.tagName, 
        `${name} should use <${expectedTag.toLowerCase()}> element, found <${element.tagName.toLowerCase()}>`
      ).toBe(expectedTag);
    });

    // Property: Verify that major content containers are NOT just divs
    // Check that the main structural elements are semantic
    const nav = document.querySelector('nav');
    const sections = document.querySelectorAll('section');
    const footer = document.querySelector('footer');

    expect(nav, 'Navigation should use <nav> element').toBeTruthy();
    expect(sections.length, 'Should have multiple <section> elements').toBeGreaterThanOrEqual(3);
    expect(footer, 'Footer should use <footer> element').toBeTruthy();

    // Verify the semantic elements contain the expected content
    expect(nav.id, 'Navigation should have id="navbar"').toBe('navbar');
    expect(footer.id, 'Footer should have id="footer"').toBe('footer');

    // Check that sections have proper IDs
    const sectionIds = Array.from(sections).map(s => s.id).filter(id => id);
    expect(sectionIds, 'Sections should have IDs').toContain('hero');
    expect(sectionIds, 'Sections should have IDs').toContain('menu');
    expect(sectionIds, 'Sections should have IDs').toContain('facts');
  });

  /**
   * Property-based test: Semantic elements should have appropriate ARIA attributes
   * This tests that semantic elements maintain their semantic meaning
   */
  test('Property 1 Extension: Semantic elements maintain accessibility', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('nav', 'section', 'footer'),
        (tagName) => {
          const elements = document.querySelectorAll(tagName);
          
          // Property: All semantic elements should exist and be properly structured
          expect(elements.length).toBeGreaterThan(0);
          
          // For each semantic element, verify it's not misused
          elements.forEach(element => {
            // Semantic elements should have content or children
            const hasContent = element.textContent.trim().length > 0 || 
                             element.children.length > 0;
            expect(hasContent, 
              `<${tagName}> element should have content or children`
            ).toBe(true);
            
            // Semantic elements should not be hidden (unless intentionally)
            const style = element.getAttribute('style') || '';
            const hasHiddenStyle = style.includes('display: none') || 
                                  style.includes('visibility: hidden');
            
            // If it's the nav menu, it might be hidden on mobile, which is OK
            const isNavMenu = element.id === 'nav-links';
            if (!isNavMenu) {
              expect(hasHiddenStyle, 
                `<${tagName}> should not be hidden with inline styles`
              ).toBe(false);
            }
          });
          
          return true;
        }
      ),
      { numRuns: 10 } // Test with all semantic element types
    );
  });

  /**
   * Property-based test: Verify semantic structure is consistent
   */
  test('Property 1 Extension: Document structure follows semantic hierarchy', () => {
    // The document should have a clear semantic structure
    const body = document.body;
    
    // Get all direct children of body that are semantic elements
    const semanticChildren = Array.from(body.children).filter(child => 
      ['NAV', 'HEADER', 'MAIN', 'SECTION', 'ARTICLE', 'ASIDE', 'FOOTER'].includes(child.tagName)
    );
    
    // Property: Body should contain semantic elements, not just divs
    expect(semanticChildren.length, 
      'Body should contain semantic HTML5 elements'
    ).toBeGreaterThan(0);
    
    // Verify the order makes sense: nav should come before footer
    const navIndex = Array.from(body.children).findIndex(el => el.tagName === 'NAV');
    const footerIndex = Array.from(body.children).findIndex(el => el.tagName === 'FOOTER');
    
    if (navIndex !== -1 && footerIndex !== -1) {
      expect(navIndex, 'Navigation should come before footer in document order')
        .toBeLessThan(footerIndex);
    }
  });
});
