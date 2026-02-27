/**
 * Automated Accessibility Audit Tests
 * Feature: gurukrupa-snacks-website
 * Task 12.1: Run automated accessibility audit
 */

import { describe, test, expect, beforeEach } from 'vitest';
import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import { axe } from 'vitest-axe';

// Load the HTML file
const htmlContent = readFileSync('./index.html', 'utf8');

describe('Automated Accessibility Audit', () => {
  let dom;
  let document;

  beforeEach(() => {
    dom = new JSDOM(htmlContent, {
      url: 'http://localhost'
    });
    document = dom.window.document;
  });

  test('should have no critical or serious accessibility violations', async () => {
    // Run axe accessibility audit
    const results = await axe(document.body, {
      rules: {
        // Configure rules for WCAG 2.1 Level AA compliance
        'color-contrast': { enabled: false }, // Can't test in JSDOM without computed styles
        'html-has-lang': { enabled: true },
        'image-alt': { enabled: true },
        'label': { enabled: true },
        'link-name': { enabled: true },
        'button-name': { enabled: true },
        'aria-allowed-attr': { enabled: true },
        'aria-required-attr': { enabled: true },
        'aria-valid-attr': { enabled: true },
        'aria-valid-attr-value': { enabled: true },
        'landmark-one-main': { enabled: false }, // Single page app without main
        'region': { enabled: false } // Sections are used instead
      }
    });

    // Filter for critical and serious violations
    const criticalViolations = results.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    );

    // Log violations for debugging
    if (criticalViolations.length > 0) {
      console.log('\n=== Accessibility Violations Found ===');
      criticalViolations.forEach(violation => {
        console.log(`\n${violation.impact.toUpperCase()}: ${violation.help}`);
        console.log(`Description: ${violation.description}`);
        console.log(`Help URL: ${violation.helpUrl}`);
        console.log(`Affected elements (${violation.nodes.length}):`);
        violation.nodes.forEach(node => {
          console.log(`  - ${node.html}`);
          console.log(`    ${node.failureSummary}`);
        });
      });
      console.log('\n=====================================\n');
    }

    // Assert no critical or serious violations
    expect(criticalViolations.length, 
      `Found ${criticalViolations.length} critical/serious accessibility violations`
    ).toBe(0);
  });

  test('should have valid HTML lang attribute', () => {
    const html = document.documentElement;
    expect(html.hasAttribute('lang'), 'HTML element should have lang attribute').toBe(true);
    expect(html.getAttribute('lang'), 'HTML lang should be "en"').toBe('en');
  });

  test('should have proper document title', () => {
    const title = document.querySelector('title');
    expect(title, 'Document should have a title element').toBeTruthy();
    expect(title.textContent.trim().length, 'Title should not be empty').toBeGreaterThan(0);
  });

  test('should have meta viewport for responsive design', () => {
    const viewport = document.querySelector('meta[name="viewport"]');
    expect(viewport, 'Document should have viewport meta tag').toBeTruthy();
    expect(viewport.getAttribute('content')).toContain('width=device-width');
  });

  test('should have meta description for SEO and accessibility', () => {
    const description = document.querySelector('meta[name="description"]');
    expect(description, 'Document should have description meta tag').toBeTruthy();
    expect(description.getAttribute('content').length, 
      'Description should not be empty'
    ).toBeGreaterThan(0);
  });
});
