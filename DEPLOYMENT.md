# Gurukrupa Snacks Website - Deployment Guide

## Overview

This is a static website that can be deployed to any static hosting service without a build process. The website consists of three main files and uses CDN-delivered dependencies.

## Required Files

The following files must be deployed:

1. **index.html** - Main HTML document
2. **styles.css** - Custom CSS styles
3. **script.js** - JavaScript for interactivity

## External Dependencies (CDN)

The website uses the following CDN-delivered resources:

- **Tailwind CSS v3.x**: `https://cdn.tailwindcss.com`
- **Google Fonts**: 
  - Bangers (display font for headings)
  - Carter One (alternative display font)
  - Poppins (body text font)
  - Inter (alternative body font)

## Deployment Options

### Option 1: Netlify

1. Create a Netlify account at https://www.netlify.com
2. Drag and drop the three files (index.html, styles.css, script.js) into the Netlify dashboard
3. Your site will be live immediately with a generated URL
4. Optional: Configure a custom domain in the Netlify settings

### Option 2: Vercel

1. Create a Vercel account at https://vercel.com
2. Install Vercel CLI: `npm install -g vercel`
3. Run `vercel` in the project directory
4. Follow the prompts to deploy
5. Your site will be live with a generated URL

### Option 3: GitHub Pages

1. Create a GitHub repository
2. Push the three files to the repository
3. Go to repository Settings > Pages
4. Select the branch to deploy from (usually `main`)
5. Your site will be available at `https://username.github.io/repository-name`

### Option 4: Traditional Web Hosting

1. Upload the three files to your web server via FTP/SFTP
2. Ensure the files are in the public_html or www directory
3. Access your site via your domain name

## Browser Compatibility

The website is compatible with:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Older browsers will experience graceful degradation with fallback fonts and instant scrolling instead of smooth scrolling.

## Performance Considerations

- **Page Load Time**: < 3 seconds on standard broadband
- **CDN Resources**: Tailwind CSS and Google Fonts are cached by browsers
- **No Build Process**: Files can be deployed as-is
- **Lighthouse Score**: Target 90+ for performance

## HTTPS Configuration

Most modern hosting providers (Netlify, Vercel, GitHub Pages) automatically provide HTTPS. For traditional hosting:

1. Obtain an SSL certificate (Let's Encrypt is free)
2. Configure your web server to use HTTPS
3. Redirect HTTP traffic to HTTPS

## Testing After Deployment

After deploying, verify:

1. **Navigation**: All navigation links work and smooth scroll to sections
2. **Mobile Menu**: Hamburger menu toggles correctly on mobile devices
3. **Menu Filtering**: Category filter buttons work correctly
4. **Responsive Design**: Test on mobile, tablet, and desktop viewports
5. **Fonts**: Verify custom fonts load correctly
6. **Styles**: Verify all colors and layouts display correctly

## Troubleshooting

### Fonts Not Loading

- Check browser console for CORS errors
- Verify Google Fonts CDN is accessible
- Fallback fonts (Arial, sans-serif) will be used if CDN fails

### Tailwind CSS Not Working

- Check browser console for CDN loading errors
- Verify the Tailwind CDN script tag is in the `<head>` section
- Custom styles in styles.css will still apply

### JavaScript Not Working

- Check browser console for errors
- Verify script.js is linked correctly in index.html
- Ensure script.js is loaded after the DOM content

## Maintenance

### Updating Content

To update menu items, prices, or other content:

1. Edit index.html for structural changes
2. Edit script.js to modify the menuData array
3. Redeploy the updated files

### Updating Styles

To modify colors, fonts, or layouts:

1. Edit styles.css for custom styles
2. Modify Tailwind classes in index.html for utility-based changes
3. Redeploy the updated files

## Support

For issues or questions:

- Review the browser console for error messages
- Check that all three files are deployed correctly
- Verify CDN resources are accessible
- Test in multiple browsers to isolate browser-specific issues

## Version Information

- **Website Version**: 1.0.0
- **Last Updated**: 2024
- **Tailwind CSS**: v3.x (via CDN)
- **Browser Support**: Modern browsers (ES6+)
