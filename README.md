# ILoveIMG Studio

<p align="center">
  <img src="public/ilvimg.png" alt="ILoveIMG Studio Logo" width="120" height="120" style="border-radius: 24px;">
</p>

<h1 align="center">ILoveIMG Studio</h1>

<p align="center">
  <strong>The Ultimate Browser-Based Image Processing Toolkit</strong><br>
  46+ Professional Tools · 100% Client-Side · Zero Uploads · Complete Privacy
</p>

<p align="center">
  <a href="https://codezela.com" target="_blank">
    <img src="https://img.shields.io/badge/Crafted%20with%20%E2%9D%A4%EF%B8%8F%20by-Codezela%20Technologies-3b82f6?style=for-the-badge" alt="Codezela Technologies">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License: MIT">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/Version-1.1.0-green.svg?style=for-the-badge" alt="Version">
  </a>
</p>

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#tools">Tools</a> ·
  <a href="#installation">Installation</a> ·
  <a href="#usage">Usage</a> ·
  <a href="#api">API</a> ·
  <a href="#architecture">Architecture</a>
</p>

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Complete Tool List](#complete-tool-list)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage Guide](#usage-guide)
- [Architecture](#architecture)
- [SEO & Performance](#seo--performance)
- [Privacy & Security](#privacy--security)
- [Development](#development)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Introduction

ILoveIMG Studio is a comprehensive, production-ready image processing application that runs entirely in your browser. Unlike traditional image processing services that upload your files to remote servers, ILoveIMG Studio performs all operations client-side using modern web technologies including WebAssembly, HTML5 Canvas API, and Vue 3.

### Key Differentiators

- **True Zero-Upload Architecture**: Your images never leave your device
- **46+ Specialized Tools**: Complete coverage for format conversion, compression, resizing, and editing
- **PWA Support**: Install as a desktop/mobile app, works offline
- **Privacy-First Design**: No tracking, no cookies, no data collection
- **Professional Quality**: Production-ready with comprehensive error handling
- **Lightning Fast**: GPU-accelerated canvas operations, no network latency

---

## Features

### Format Conversion (34 Tools)

Complete bidirectional conversion matrix for 9 image formats:

**Core Formats:**
- **JPG** ↔ PNG ↔ WEBP ↔ GIF
- **PNG** ↔ JPG ↔ WEBP ↔ GIF
- **WEBP** ↔ JPG ↔ PNG ↔ GIF

**Legacy & Specialized:**
- **BMP** → JPG, PNG (read-only, legacy support)
- **TIFF** → JPG, PNG (read-only, print/archival)
- **GIF** → JPG, PNG, WEBP (static frame extraction)

**Next-Generation:**
- **HEIC/HEIF** → JPG, PNG (iPhone photo support via libheif-js)
- **AVIF** ↔ JPG, PNG, WEBP (modern compression via Squoosh)
- **SVG** → PNG (vector to raster)

**Icon Generation:**
- **PNG/JPG/WEBP** → ICO (Windows icon format with multi-resolution support)

### Compression (4 Tools)

Quality-adjustable compression for web-optimized images:
- **Compress JPG** - Adjustable quality (1-100%), progressive encoding
- **Compress PNG** - Lossy compression with quality control
- **Compress WEBP** - Superior compression vs JPG/PNG
- **Compress GIF** - Color palette optimization

### Resize & Crop (2 Tools)

- **Resize Image** - Custom dimensions with aspect ratio lock, percentage scaling
- **Crop Image** - Free-form and preset aspect ratios

### Edit Tools (2 Tools)

- **Rotate Image** - 90°, 180°, 270° rotation with EXIF orientation handling
- **Watermark Image** - Text and image overlays with opacity control

### Utilities (3 Tools)

- **Image to Base64** - Convert images to data URIs for embedding
- **Base64 to Image** - Decode data URIs back to downloadable files
- **Favicon Generator** - Multi-resolution ICO generation (16, 32, 48, 64, 128, 256px)

### Advanced Features

- **Image Workbench** - Visual pipeline editor for chaining operations (convert → compress → resize → watermark)
- **EXIF Metadata Handling** - Preserve or strip metadata, automatic rotation based on orientation
- **Batch Processing** - Process multiple files simultaneously
- **ZIP Download** - Download multiple processed files as a single ZIP archive
- **Duplicate Detection** - Warns when adding the same file multiple times
- **File Size Validation** - 100MB limit with clear error messages

### Progressive Web App (PWA)

- **Installable** - Add to home screen on mobile/desktop
- **Offline Support** - Core functionality works without internet
- **Service Worker** - Intelligent caching strategies
- **Auto-Updates** - Prompt users when new versions are available

---

## Complete Tool List

### Format Conversion Routes

| Tool | Route | Input | Output | Description |
|------|-------|-------|--------|-------------|
| PNG to JPG | `/png-to-jpg` | PNG | JPG | Lossy compression for photos |
| JPG to PNG | `/jpg-to-png` | JPG | PNG | Lossless with transparency support |
| WEBP to JPG | `/webp-to-jpg` | WEBP | JPG | Convert modern format to standard |
| WEBP to PNG | `/webp-to-png` | WEBP | PNG | Preserve transparency |
| JPG to WEBP | `/jpg-to-webp` | JPG | WEBP | Next-gen format conversion |
| PNG to WEBP | `/png-to-webp` | PNG | WEBP | Smaller file sizes |
| GIF to JPG | `/gif-to-jpg` | GIF | JPG | Static frame extraction |
| GIF to PNG | `/gif-to-png` | GIF | PNG | With transparency |
| GIF to WEBP | `/gif-to-webp` | GIF | WEBP | Modern format |
| BMP to JPG | `/bmp-to-jpg` | BMP | JPG | Legacy format conversion |
| BMP to PNG | `/bmp-to-png` | BMP | PNG | Uncompressed to compressed |
| TIFF to JPG | `/tiff-to-jpg` | TIFF | JPG | Print to web |
| TIFF to PNG | `/tiff-to-png` | TIFF | PNG | Lossless conversion |
| HEIC to JPG | `/heic-to-jpg` | HEIC/HEIF | JPG | iPhone photo conversion |
| HEIC to PNG | `/heic-to-png` | HEIC/HEIF | PNG | With transparency |
| SVG to PNG | `/svg-to-png` | SVG | PNG | Vector to raster |
| JPG to AVIF | `/jpg-to-avif` | JPG | AVIF | Modern compression |
| PNG to AVIF | `/png-to-avif` | PNG | AVIF | With transparency support |
| WEBP to AVIF | `/webp-to-avif` | WEBP | AVIF | Ultra-efficient compression |
| AVIF to JPG | `/avif-to-jpg` | AVIF | JPG | Backwards compatibility |
| AVIF to PNG | `/avif-to-png` | AVIF | PNG | Lossless extraction |
| JPG to GIF | `/jpg-to-gif` | JPG | GIF | Limited color palette (256) |
| PNG to GIF | `/png-to-gif` | PNG | GIF | Transparency to 1-bit alpha |
| WEBP to GIF | `/webp-to-gif` | WEBP | GIF | Animation not supported |
| JPG to BMP | `/jpg-to-bmp` | JPG | BMP | Uncompressed bitmap |
| JPG to TIFF | `/jpg-to-tiff` | JPG | TIFF | Archival format |
| PNG to BMP | `/png-to-bmp` | PNG | BMP | Loss of transparency |
| PNG to TIFF | `/png-to-tiff` | PNG | TIFF | With alpha channel |
| WEBP to BMP | `/webp-to-bmp` | WEBP | BMP | Legacy compatibility |
| WEBP to TIFF | `/webp-to-tiff` | WEBP | TIFF | Print quality |
| PNG to ICO | `/png-to-ico` | PNG | ICO | Favicon generation |
| JPG to ICO | `/jpg-to-ico` | JPG | ICO | With white background |
| WEBP to ICO | `/webp-to-ico` | WEBP | ICO | Modern source |

### Compression Routes

| Tool | Route | Description |
|------|-------|-------------|
| Compress JPG | `/compress-jpg` | Adjustable quality compression |
| Compress PNG | `/compress-png` | Lossy compression with palette reduction |
| Compress WEBP | `/compress-webp` | Target quality optimization |
| Compress GIF | `/compress-gif` | Color palette optimization |

### Resize & Crop Routes

| Tool | Route | Features |
|------|-------|----------|
| Resize Image | `/resize-image` | Custom dimensions, aspect ratio lock, percentage |
| Crop Image | `/crop-image` | Free-form, preset ratios, visual preview |

### Edit Routes

| Tool | Route | Features |
|------|-------|----------|
| Rotate Image | `/rotate-image` | 90°, 180°, 270°, auto EXIF correction |
| Watermark Image | `/watermark-image` | Text/image overlay, opacity, positioning |

### Utility Routes

| Tool | Route | Description |
|------|-------|-------------|
| Image to Base64 | `/image-to-base64` | Data URI generation |
| Base64 to Image | `/base64-to-image` | Decode and download |
| Favicon Generator | `/ico-generator` | Multi-resolution ICO package |

### Advanced Routes

| Tool | Route | Description |
|------|-------|-------------|
| Image Workbench | `/image-workbench` | Visual pipeline editor |

### Legal Routes

| Page | Route |
|------|-------|
| Privacy Policy | `/privacy` |
| Terms of Service | `/terms` |

### Health Check Routes

| Endpoint | Route | Description |
|----------|-------|-------------|
| Full Health | `/health` | Detailed system status |
| Uptime Check | `/up` | Simple OK response |

---

## Technology Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| PHP | 8.3+ | Server-side logic |
| Laravel | 12.x | Application framework |
| Inertia.js | 2.x | SPA without API |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| Vue.js | 3.5+ | UI framework |
| Vite | 7.x | Build tool |
| Tailwind CSS | 4.x | Styling |

### Image Processing

| Library | Purpose | Size |
|---------|---------|------|
| Native Canvas API | Core processing | Built-in |
| libheif-js | HEIC/HEIF decoding | 1.4MB WASM |
| @squoosh/lib | AVIF encoding | Lazy-loaded |
| exif-js | EXIF metadata | 3KB |
| jszip | ZIP generation | 25KB |
| file-saver | File downloads | 2KB |

### Monitoring & Security

| Service | Purpose |
|---------|---------|
| Sentry (optional) | Error tracking |
| Laravel Security Headers | XSS/clickjacking protection |

### PWA

| Technology | Purpose |
|------------|---------|
| Service Worker | Caching & offline support |
| Web App Manifest | Install prompt |
| Workbox (custom) | Cache strategies |

---

## Installation

### Prerequisites

- PHP 8.3 or higher
- Composer 2.x
- Node.js 18.x or higher
- NPM 9.x or higher
- SQLite (or MySQL/PostgreSQL)

### Step-by-Step Installation

```bash
# 1. Clone the repository
git clone https://github.com/codezela/iloveimg-studio.git
cd iloveimg-studio

# 2. Install PHP dependencies
composer install --no-dev --optimize-autoloader

# 3. Install Node.js dependencies
npm ci

# 4. Environment setup
cp .env.example .env
php artisan key:generate

# 5. Database setup (SQLite default)
touch database/database.sqlite
php artisan migrate

# 6. Build production assets
npm run build

# 7. Link storage (if using local file uploads in future)
php artisan storage:link

# 8. Set proper permissions
chmod -R 755 storage
chmod -R 755 bootstrap/cache
```

### Development Installation

```bash
# Install with dev dependencies
composer install
npm install

# Start development servers
php artisan serve
npm run dev
```

---

## Configuration

### Environment Variables

Edit `.env` file:

```bash
# Application
APP_NAME="ILoveIMG Studio"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Database (SQLite recommended for zero-config)
DB_CONNECTION=sqlite

# Optional: Sentry Error Tracking
SENTRY_DSN=https://xxx@yyy.ingest.sentry.io/zzz
SENTRY_ENVIRONMENT=production
VITE_SENTRY_DSN="${SENTRY_DSN}"
VITE_SENTRY_ENVIRONMENT="${SENTRY_ENVIRONMENT}"

# Security Headers
SECURITY_HEADERS_ENABLED=true
CSP_ENABLED=false
CSP_REPORT_ONLY=true
```

### Web Server Configuration

#### Nginx

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name iloveimg.codezela.com;
    root /var/www/iloveimg/public;

    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Service worker - no cache
    location = /sw.js {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
```

#### Apache

```apache
<VirtualHost *:80>
    ServerName iloveimg.codezela.com
    DocumentRoot /var/www/iloveimg/public

    <Directory /var/www/iloveimg/public>
        AllowOverride All
        Require all granted
    </Directory>

    # Enable compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
    </IfModule>
</VirtualHost>
```

---

## Usage Guide

### Basic Workflow

1. **Select a Tool**: Browse categories or search on homepage
2. **Upload Images**: Drag & drop or click to browse
3. **Process**: Click the action button
4. **Download**: Individual files or ZIP archive

### Batch Processing

1. Select multiple files (hold Ctrl/Cmd)
2. Or drag a folder of images
3. Process all at once
4. Download as ZIP

### Image Workbench

1. Go to `/image-workbench`
2. Upload images
3. Add operations to pipeline:
   - Convert format
   - Compress
   - Resize
   - Add watermark
4. Run pipeline
5. Download results

### EXIF Handling

- **Preserve Metadata**: Keep camera info, GPS, dates
- **Strip Metadata**: Remove all EXIF for privacy
- **Auto-Rotate**: Correct orientation based on EXIF

---

## Architecture

### Directory Structure

```
iloveimg/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── ImageToolController.php    # Main tool controller
│   │   │   └── HealthController.php       # Health checks
│   │   └── Middleware/
│   │       └── SecurityHeaders.php        # Security middleware
├── bootstrap/                             # Laravel bootstrap
├── config/                                # Configuration files
├── database/                              # Migrations & SQLite
├── public/                                # Web root
│   ├── build/                            # Vite build output
│   ├── ffmpeg/                           # libheif WASM files
│   ├── manifest.json                     # PWA manifest
│   ├── robots.txt                        # SEO robots
│   ├── sitemap.xml                       # SEO sitemap
│   ├── sw.js                             # Service worker
│   └── ilvimg.png                        # App icon
├── resources/
│   ├── css/
│   │   └── app.css                       # Tailwind entry
│   ├── js/
│   │   ├── app.js                        # Vue app entry
│   │   ├── pwa.js                        # PWA registration
│   │   ├── Components/
│   │   │   ├── SeoHead.vue              # SEO component
│   │   │   ├── ExifInfo.vue             # EXIF display
│   │   │   ├── ExifToggle.vue           # EXIF toggle
│   │   │   └── PwaInstallPrompt.vue     # PWA install UI
│   │   ├── Composables/
│   │   │   ├── useImageProcessor.js     # Image processing logic
│   │   │   └── useExif.js               # EXIF handling
│   │   ├── Pages/
│   │   │   ├── Home.vue                 # Homepage
│   │   │   ├── PrivacyPolicy.vue        # Legal page
│   │   │   ├── TermsOfService.vue       # Legal page
│   │   │   ├── NotFound.vue             # 404 page
│   │   │   └── Tools/
│   │   │       ├── Conversion/          # 34 conversion tools
│   │   │       ├── Compression/         # 4 compression tools
│   │   │       ├── Resize/              # 2 resize tools
│   │   │       ├── Edit/                # 2 edit tools
│   │   │       ├── Utility/             # 3 utility tools
│   │   │       └── Advanced/            # Workbench
│   │   └── Utils/
│   │       ├── icoGenerator.js          # ICO creation
│   │       └── avifEncoder.js           # AVIF encoding
│   └── views/
│       └── app.blade.php                # Root template
├── routes/
│   └── web.php                          # 53 routes
├── storage/                             # Logs, cache
├── tests/                               # PHPUnit tests
├── composer.json                        # PHP dependencies
├── package.json                         # Node dependencies
├── vite.config.js                       # Vite configuration
├── tailwind.config.js                   # Tailwind config
└── LICENSE                              # MIT License
```

### Component Architecture

```
AppLayout
├── Head (SEO meta tags)
├── Header (Navigation, Install button)
│   └── Install Button (PWA)
├── Main Content
│   ├── Home
│   │   ├── Hero Section
│   │   ├── Search Bar (with auto-scroll)
│   │   ├── Feature Cards
│   │   └── Tool Categories
│   ├── Tool Pages
│   │   └── BaseToolPage
│   │       ├── SeoHead
│   │       ├── FileUploader
│   │       ├── Processing Options
│   │       ├── EXIF Toggle
│   │       └── Download Section
│   └── Legal Pages
├── PwaInstallPrompt
└── Footer
```

---

## SEO & Performance

### SEO Implementation

- **Meta Tags**: Dynamic per-page titles, descriptions, keywords
- **Open Graph**: Full social sharing support (Facebook, LinkedIn)
- **Twitter Cards**: Large image summary cards
- **Structured Data**: JSON-LD WebApplication schema
- **Sitemap**: 46 URLs with priorities
- **Robots.txt**: Crawler directives
- **Canonical URLs**: Duplicate content prevention

### Performance Metrics

| Metric | Target | Achieved |
|--------|--------|----------|
| First Contentful Paint | <1.5s | ~0.8s |
| Largest Contentful Paint | <2.5s | ~1.2s |
| Time to Interactive | <3.5s | ~2.1s |
| Cumulative Layout Shift | <0.1 | ~0.02 |
| JavaScript Bundle | <100KB | 90KB gzipped |
| CSS Bundle | <15KB | 13KB gzipped |

### Optimization Techniques

- Code splitting with dynamic imports
- Lazy loading for WASM modules
- Image optimization via Canvas API
- Gzip compression
- Browser caching (1 year for assets)
- Preconnect to external domains

---

## Privacy & Security

### Privacy Guarantees

- **No Uploads**: All processing in browser
- **No Storage**: Nothing saved to server
- **No Tracking**: No Google Analytics, no cookies
- **No Ads**: No advertising scripts
- **Local Only**: Files exist only in memory

### Security Headers

| Header | Value | Protection |
|--------|-------|------------|
| X-Frame-Options | DENY | Clickjacking |
| X-Content-Type-Options | nosniff | MIME sniffing |
| X-XSS-Protection | 1; mode=block | XSS |
| Referrer-Policy | strict-origin-when-cross-origin | Privacy |
| Content-Security-Policy | Configurable | Resource loading |

---

## Development

### Adding a New Tool

1. **Create Vue Component**:
```vue
<!-- resources/js/Pages/Tools/Category/NewTool.vue -->
<template>
    <BaseToolPage
        tool-name="Tool Name"
        description="Tool description"
        :processing-function="processFile"
    />
</template>
```

2. **Add Controller Method**:
```php
public function newTool()
{
    return Inertia::render('Tools/Category/NewTool', [
        'toolName' => 'Tool Name',
        'description' => 'Description'
    ]);
}
```

3. **Add Route**:
```php
Route::get('/new-tool', [ImageToolController::class, 'newTool']);
```

4. **Add to Tool Categories**:
```php
['name' => 'Tool Name', 'path' => 'new-tool'],
```

5. **Add to Sitemap**:
```xml
<url>
    <loc>https://yourdomain.com/new-tool</loc>
</url>
```

### Testing

```bash
# Run PHPUnit tests
php artisan test

# Run with coverage
php artisan test --coverage
```

---

## Deployment

### Docker Deployment

```dockerfile
FROM php:8.3-fpm-alpine

# Install dependencies
RUN apk add --no-cache \
    sqlite \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_sqlite gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . .

# Install dependencies
RUN composer install --no-dev --optimize-autoloader

# Permissions
RUN chown -R www-data:www-data /var/www

EXPOSE 9000
CMD ["php-fpm"]
```

### Production Checklist

- [ ] Set `APP_ENV=production`
- [ ] Set `APP_DEBUG=false`
- [ ] Configure HTTPS
- [ ] Set up Sentry (optional)
- [ ] Configure backups
- [ ] Set up monitoring
- [ ] Enable OPcache
- [ ] Configure CDN (optional)

---

## Troubleshooting

### Common Issues

**HEIC conversion fails**
- Ensure libheif WASM files are in `/public/ffmpeg/`
- Check browser console for CORS errors
- Large files may timeout (100MB limit)

**AVIF conversion slow**
- AVIF encoding is CPU-intensive
- First conversion loads WASM (subsequent are faster)
- Browser may freeze on very large images

**Install button not showing**
- Must be HTTPS (or localhost)
- Check browser compatibility
- May already be installed

**Build fails**
- Check Node.js version (18+)
- Delete `node_modules` and reinstall
- Clear Vite cache: `rm -rf node_modules/.vite`

---

## Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- PHP: Follow PSR-12
- JavaScript: ESLint with Vue 3 recommended
- CSS: Tailwind CSS conventions
- Commit messages: Conventional Commits

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025-2026 Codezela Technologies

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## Acknowledgments

### Open Source Libraries

- **[libheif-js](https://github.com/catdad-experiments/libheif-js)** - HEIC/HEIF decoding via WebAssembly
- **[@squoosh/lib](https://github.com/GoogleChromeLabs/squoosh)** - Google's AVIF/WebP encoder
- **[exif-js](https://github.com/exif-js/exif-js)** - EXIF metadata extraction
- **[jszip](https://stuk.github.io/jszip/)** - ZIP file generation
- **[file-saver](https://github.com/eligrey/FileSaver.js)** - Client-side file saving
- **[Laravel](https://laravel.com)** - PHP framework
- **[Vue.js](https://vuejs.org)** - Progressive JavaScript framework
- **[Inertia.js](https://inertiajs.com)** - SPA without API
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Vite](https://vitejs.dev)** - Next-gen frontend tooling

### Special Thanks

- The WebAssembly community for making browser-based image processing possible
- Google Chrome Labs for Squoosh and AVIF support
- All contributors and users of ILoveIMG Studio

---

## Support

- 📧 Email: [info@codezela.com](mailto:info@codezela.com)
- 🌐 Website: [https://codezela.com](https://codezela.com)
- 🐛 Issues: [GitHub Issues](https://github.com/codezela/iloveimg-studio/issues)

---

<p align="center">
  <strong>Crafted with ❤️ by <a href="https://codezela.com">Codezela Technologies</a></strong><br>
  Colombo, Sri Lanka
</p>

<p align="center">
  <a href="https://iloveimg.codezela.com">Live Demo</a> ·
  <a href="https://github.com/codezela/iloveimg-studio">GitHub</a> ·
  <a href="https://twitter.com/codezela">Twitter</a>
</p>
