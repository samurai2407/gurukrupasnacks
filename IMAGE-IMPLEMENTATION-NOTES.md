# Menu Card Image Implementation

## Overview

The Gurukrupa Snacks website has been updated to support menu item images. This implementation uses placeholder images that can be easily replaced with actual photographs later.

## Changes Made

### 1. Data Structure (script.js)

**Added `imageSrc` property to all menu items:**

```javascript
{
  id: 1,
  name: "Vada Pav",
  price: 20,
  description: "...",
  funnyFact: "...",
  category: "legends",
  imageSrc: "https://placehold.co/600x400/FDB913/333333?text=Vada+Pav"  // NEW
}
```

All 8 menu items now include placeholder images using placehold.co with brand colors.

### 2. HTML Structure (script.js - createMenuCard function)

**Updated menu card generation to include image element:**

```javascript
card.innerHTML = `
  <img src="${item.imageSrc}" alt="${item.name}" class="item-image" loading="lazy">
  <div class="item-content">
    <h3 class="item-name">${item.name}</h3>
    <p class="item-price">₹${item.price}</p>
    <p class="item-description">${item.description}</p>
    <p class="item-fact">${item.funnyFact}</p>
  </div>
`;
```

**Key features:**
- Image placed at the top of the card
- Proper `alt` attribute using item name for accessibility
- `loading="lazy"` for performance optimization
- Content wrapped in `.item-content` div for proper spacing

### 3. CSS Styling (styles.css)

**Updated `.menu-card` styling:**

```css
.menu-card {
  background-color: var(--rice-white);
  border: 2px solid var(--chutney-green);
  border-radius: 12px;
  overflow: hidden;  /* NEW - ensures images respect border-radius */
  transition: transform var(--transition-normal) var(--ease-default),
              box-shadow var(--transition-normal) var(--ease-default);
  display: flex;
  flex-direction: column;
  min-height: 280px;
}
```

**Added image-specific styling:**

```css
.item-image {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: center;
  display: block;
}
```

**Key CSS properties:**
- `width: 100%` - Image fills card width
- `aspect-ratio: 4/3` - Maintains consistent proportions
- `object-fit: cover` - Crops images to fit without distortion
- `object-position: center` - Centers the image within the frame

**Added content wrapper styling:**

```css
.item-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex-grow: 1;
}
```

### 4. Test Updates (test/menu-card-properties.test.js)

**Updated Property 5 test to include image validation:**

```javascript
it('Property 5: For all menu items, each card SHALL contain exactly five pieces of information (image + 4 text fields)', () => {
  // Validates: image, name, price, description, funny fact
  
  menuCards.forEach(card => {
    // 0. Item image
    const itemImage = card.querySelector('.item-image');
    expect(itemImage).toBeTruthy();
    expect(itemImage.getAttribute('src')).toBeTruthy();
    expect(itemImage.getAttribute('alt')).toBeTruthy();
    
    // ... rest of validations
  });
});
```

**Added new test for image styling:**

```javascript
it('All menu card images should have proper styling for responsive layout', () => {
  menuCards.forEach(card => {
    const image = card.querySelector('.item-image');
    expect(image).toBeTruthy();
    expect(image.getAttribute('loading')).toBe('lazy');
    expect(image.getAttribute('alt')).toBeTruthy();
  });
});
```

## How to Replace Placeholder Images

When you're ready to upload your actual snack photographs:

### Option 1: Local Images

1. Create an `images` folder in your project root
2. Add your photos (e.g., `vada-pav.jpg`, `samosa.jpg`, etc.)
3. Update the `imageSrc` in script.js:

```javascript
{
  id: 1,
  name: "Vada Pav",
  imageSrc: "images/vada-pav.jpg"  // Update this
}
```

### Option 2: CDN/Cloud Storage

1. Upload images to a CDN (Cloudinary, Imgur, AWS S3, etc.)
2. Get the public URLs
3. Update the `imageSrc` in script.js:

```javascript
{
  id: 1,
  name: "Vada Pav",
  imageSrc: "https://your-cdn.com/vada-pav.jpg"  // Update this
}
```

## Image Requirements

For best results, your photographs should:

- **Aspect Ratio**: 4:3 (e.g., 1200x900px, 800x600px)
- **Minimum Size**: 600x400px
- **Recommended Size**: 800x600px or 1200x900px
- **Format**: JPEG or WebP
- **File Size**: < 200KB per image (optimized for web)

The CSS will automatically:
- Crop images to 4:3 aspect ratio
- Center the image
- Scale to fit the card width
- Maintain quality across all devices

## Benefits of This Implementation

1. **Responsive**: Images adapt to all screen sizes
2. **Performance**: Lazy loading reduces initial page load
3. **Accessibility**: Alt text for screen readers
4. **Consistent Layout**: All images display uniformly regardless of original dimensions
5. **Easy Updates**: Simply change the `imageSrc` URL to update images

## Testing

All tests have been updated and pass successfully:
- ✅ Image element presence validation
- ✅ Alt text validation
- ✅ Lazy loading attribute validation
- ✅ Data structure validation (imageSrc property)

Run tests with: `npm test`

## Notes

- The placeholder images use brand colors (Turmeric Yellow, Chili Red, Chutney Green)
- Images are displayed at the top of each menu card
- The layout remains stable even if images fail to load
- All existing functionality (filtering, hover effects) works with images
