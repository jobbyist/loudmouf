# Asset Migration Guide for Vercel Deployment

## Required Assets in `/public` Directory

The following assets need to be placed in the `/public` directory for the site to work correctly on Vercel:

### Core Assets
- `/loudmouf-logo.png` - Main logo (already exists)
- `/favicon.ico` - Site favicon (already exists)

### Hero Section
- `/hero-poster.png` - Hero video poster image
- `/hero.mp4` - Hero video (should be optimized for web, max 10MB recommended)

### Product & Brand Assets
- `/story.png` - Brand story section image
- `/products-hero.png` - Product lineup showcase image
- `/ad-creative.png` - Social media og:image for sharing
- `/true-grade.webp` - Quality badge overlay for product modal

### Flavor Assets
- `/blueberry-hero.png` - Blueberry flavor image
- `/cheesecake-hero.png` - Cheesecake flavor image
- `/bubblegum.png` - Bubblegum flavor image

### Press/Partner Logos
- `/images/logos/businessbagel.svg` - Business Bagel logo
- `/images/logos/gravitas.svg` - Gravitas Industries logo
- `/images/logos/nsbc.svg` - NSBC Africa logo

## Asset Optimization Tips

1. **Images**: Compress PNG/JPG files using tools like TinyPNG or ImageOptim
2. **Hero Video**: Use H.264 codec, compress to under 10MB, resolution 1080p max
3. **SVG Logos**: Minify SVG files and ensure they're properly sized
4. **WebP Format**: Consider converting large PNGs to WebP for better compression

