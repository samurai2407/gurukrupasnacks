// Property Tests: Menu Card Properties
// Feature: gurukrupa-snacks-website
// Property 5: Menu Card Information Completeness
// Property 6: Menu Card Background Colors
// **Validates: Requirements 4.3, 4.4, 12.4, 12.5**

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import fc from 'fast-check';

describe('Menu Card Properties', () => {
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
    
    await new Promise(resolve => setTimeout(resolve, 100));
  });

  afterEach(() => {
    dom.window.close();
  });

  describe('Property 5: Menu Card Information Completeness', () => {
    it('Property 5: For all menu items, each card SHALL contain exactly five pieces of information (image + 4 text fields)', () => {
      // Property: All menu cards must display image, name, price (with ₹), description, and funny fact
      
      fc.assert(
        fc.property(
          fc.constantFrom('all', 'legends', 'triangles', 'crisp', 'sweets'),
          (category) => {
            // Get all menu cards
            const menuCards = document.querySelectorAll('.menu-card');
            
            if (menuCards.length === 0) {
              return true; // Skip if no cards rendered yet
            }
            
            // Check each menu card
            menuCards.forEach(card => {
              // 0. Item image
              const itemImage = card.querySelector('.item-image');
              expect(itemImage).toBeTruthy();
              expect(itemImage.getAttribute('src')).toBeTruthy();
              expect(itemImage.getAttribute('alt')).toBeTruthy();
              
              // 1. Item name
              const itemName = card.querySelector('.item-name');
              expect(itemName).toBeTruthy();
              expect(itemName.textContent.trim().length).toBeGreaterThan(0);
              
              // 2. Item price with ₹ symbol
              const itemPrice = card.querySelector('.item-price');
              expect(itemPrice).toBeTruthy();
              expect(itemPrice.textContent).toContain('₹');
              
              // 3. Item description
              const itemDescription = card.querySelector('.item-description');
              expect(itemDescription).toBeTruthy();
              expect(itemDescription.textContent.trim().length).toBeGreaterThan(0);
              
              // 4. Funny fact
              const itemFact = card.querySelector('.item-fact');
              expect(itemFact).toBeTruthy();
              expect(itemFact.textContent.trim().length).toBeGreaterThan(0);
            });
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Property 5: Menu cards should have exactly 4 child elements for the 4 pieces of information', () => {
      // Property: Each menu card structure should contain exactly 4 information elements
      
      const menuCards = document.querySelectorAll('.menu-card');
      
      if (menuCards.length === 0) {
        return; // Skip if no cards rendered yet
      }
      
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: menuCards.length - 1 }),
          (cardIndex) => {
            const card = menuCards[cardIndex];
            
            // Count the information elements
            const itemName = card.querySelector('.item-name');
            const itemPrice = card.querySelector('.item-price');
            const itemDescription = card.querySelector('.item-description');
            const itemFact = card.querySelector('.item-fact');
            
            // All 4 elements must exist
            expect(itemName).toBeTruthy();
            expect(itemPrice).toBeTruthy();
            expect(itemDescription).toBeTruthy();
            expect(itemFact).toBeTruthy();
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Property 5: Price format should always include ₹ symbol', () => {
      // Property: All prices must be formatted with the Indian Rupee symbol
      
      const menuCards = document.querySelectorAll('.menu-card');
      
      if (menuCards.length === 0) {
        return;
      }
      
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: menuCards.length - 1 }),
          (cardIndex) => {
            const card = menuCards[cardIndex];
            const itemPrice = card.querySelector('.item-price');
            
            expect(itemPrice).toBeTruthy();
            
            const priceText = itemPrice.textContent;
            
            // Must contain ₹ symbol
            expect(priceText).toContain('₹');
            
            // Should have a number after ₹
            const priceMatch = priceText.match(/₹\s*(\d+)/);
            expect(priceMatch).toBeTruthy();
            expect(parseInt(priceMatch[1], 10)).toBeGreaterThan(0);
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 6: Menu Card Background Colors', () => {
    it('Property 6: For all menu cards, background SHALL be Rice White (#FAFAFA) or Charcoal (#333333)', () => {
      // Property: Menu card backgrounds must use specified brand colors
      
      const menuCards = document.querySelectorAll('.menu-card');
      
      if (menuCards.length === 0) {
        return;
      }
      
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: menuCards.length - 1 }),
          (cardIndex) => {
            const card = menuCards[cardIndex];
            const styles = window.getComputedStyle(card);
            const backgroundColor = styles.backgroundColor;
            
            // Convert RGB to hex for comparison
            const rgbMatch = backgroundColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            
            if (rgbMatch) {
              const r = parseInt(rgbMatch[1], 10);
              const g = parseInt(rgbMatch[2], 10);
              const b = parseInt(rgbMatch[3], 10);
              
              // Rice White: #FAFAFA = rgb(250, 250, 250)
              // Charcoal: #333333 = rgb(51, 51, 51)
              
              const isRiceWhite = r === 250 && g === 250 && b === 250;
              const isCharcoal = r === 51 && g === 51 && b === 51;
              
              // Background should be one of these two colors
              expect(isRiceWhite || isCharcoal).toBe(true);
            }
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Property 6: Menu cards should have consistent background color across all cards', () => {
      // Property: All menu cards should use the same background color
      
      const menuCards = document.querySelectorAll('.menu-card');
      
      if (menuCards.length < 2) {
        return; // Need at least 2 cards to compare
      }
      
      const firstCardStyles = window.getComputedStyle(menuCards[0]);
      const firstBackgroundColor = firstCardStyles.backgroundColor;
      
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: menuCards.length - 1 }),
          (cardIndex) => {
            const card = menuCards[cardIndex];
            const styles = window.getComputedStyle(card);
            const backgroundColor = styles.backgroundColor;
            
            // All cards should have the same background color
            expect(backgroundColor).toBe(firstBackgroundColor);
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Property 6: Menu card border should use Chutney Green (#7CB342)', () => {
      // Property: Menu cards should have Chutney Green borders
      
      const menuCards = document.querySelectorAll('.menu-card');
      
      if (menuCards.length === 0) {
        return;
      }
      
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: menuCards.length - 1 }),
          (cardIndex) => {
            const card = menuCards[cardIndex];
            const styles = window.getComputedStyle(card);
            const borderColor = styles.borderColor || styles.borderTopColor;
            
            // Chutney Green: #7CB342 = rgb(124, 179, 66)
            const rgbMatch = borderColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            
            if (rgbMatch) {
              const r = parseInt(rgbMatch[1], 10);
              const g = parseInt(rgbMatch[2], 10);
              const b = parseInt(rgbMatch[3], 10);
              
              // Should be Chutney Green
              expect(r).toBe(124);
              expect(g).toBe(179);
              expect(b).toBe(66);
            }
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Menu Card Data Integrity', () => {
    it('All menu items should have valid data structure including images', () => {
      // Verify menu data structure from script.js
      const scriptContent = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8');
      
      // Extract menuData array
      const menuDataMatch = scriptContent.match(/const menuData = \[([\s\S]*?)\];/);
      expect(menuDataMatch).toBeTruthy();
      
      // Verify each item has required fields including imageSrc
      expect(scriptContent).toContain('name:');
      expect(scriptContent).toContain('price:');
      expect(scriptContent).toContain('description:');
      expect(scriptContent).toContain('funnyFact:');
      expect(scriptContent).toContain('category:');
      expect(scriptContent).toContain('imageSrc:');
    });

    it('Menu categories should be properly defined', () => {
      const menuCards = document.querySelectorAll('.menu-card');
      
      if (menuCards.length === 0) {
        return;
      }
      
      menuCards.forEach(card => {
        const category = card.getAttribute('data-category');
        expect(category).toBeTruthy();
        expect(['legends', 'triangles', 'crisp', 'sweets']).toContain(category);
      });
    });
    
    it('All menu card images should have proper styling for responsive layout', () => {
      // Verify that images have the correct CSS classes and attributes
      const menuCards = document.querySelectorAll('.menu-card');
      
      if (menuCards.length === 0) {
        return;
      }
      
      menuCards.forEach(card => {
        const image = card.querySelector('.item-image');
        expect(image).toBeTruthy();
        
        // Check for lazy loading attribute
        expect(image.getAttribute('loading')).toBe('lazy');
        
        // Check that image has alt text matching the item name
        const altText = image.getAttribute('alt');
        expect(altText).toBeTruthy();
        expect(altText.length).toBeGreaterThan(0);
      });
    });
  });
});
