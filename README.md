# ILoveIMG Studio - Client-Side Image Processing Application

[![Codezela Technologies](https://img.shields.io/badge/Crafted%20with%20%E2%9D%A4%EF%B8%8F%20by-Codezela%20Technologies-blue)](https://codezela.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A complete Laravel + Vue 3 application for browser-based image processing. All operations happen client-side using Canvas API and WebAssembly - no server uploads required!

**Crafted with ❤️ by [Codezela Technologies](https://codezela.com)**

## 🚀 Features

### Format Conversion
- PNG ↔ JPG ↔ WEBP
- GIF → JPG/PNG
- BMP → JPG/PNG
- TIFF → JPG/PNG
- HEIC/HEIF → JPG/PNG
- AVIF ↔ JPG/PNG/WEBP
- SVG → PNG

### Image Compression
- Compress JPG, PNG, WEBP, and GIF images
- Adjustable quality settings
- Maintain aspect ratios

### Resize & Crop
- Custom dimensions
- Maintain aspect ratio option
- Batch processing

### Edit Tools
- Rotate images (90°, 180°, 270°)
- Add watermarks

### Utilities
- Image to Base64 converter
- Base64 to Image converter
- Favicon/ICO Generator

### Advanced Features
- Image Workbench (pipeline editor)
- EXIF metadata handling (preserve/strip)
- PWA support (installable, offline capable)

## 🛠️ Technology Stack

- **Backend**: Laravel 12 (latest)
- **Frontend**: Vue 3 (Composition API)
- **Routing**: Inertia.js 2.0
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Image Processing**: HTML5 Canvas API + WebAssembly (HEIC, AVIF)
- **PWA**: Service Worker, Offline support
- **EXIF**: Metadata preservation/stripping

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd iloveimg

# Install PHP dependencies
composer install

# Install Node dependencies
npm install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate

# Build assets
npm run build
```

## 🏃 Running the Application

### Development
```bash
# Start Laravel server
php artisan serve

# In another terminal, start Vite dev server
npm run dev
```

Visit `http://localhost:8000`

### Production
```bash
# Build assets for production
npm run build

# Serve with your web server (nginx, apache, etc.)
```

## 📂 Project Structure

```
iloveimg/
├── app/
│   └── Http/
│       └── Controllers/
│           └── ImageToolController.php    # Main controller
├── resources/
│   ├── css/
│   │   └── app.css                        # Tailwind CSS
│   ├── js/
│   │   ├── app.js                         # Vue app entry
│   │   ├── Composables/
│   │   │   └── useImageProcessor.js       # Image processing logic
│   │   └── Pages/
│   │       ├── Home.vue                   # Homepage
│   │       ├── Components/
│   │       │   ├── Layout/
│   │       │   │   └── AppLayout.vue      # Main layout
│   │       │   └── UI/
│   │       │       ├── FileUploader.vue   # Drag & drop uploader
│   │       │       └── BaseToolPage.vue   # Tool page template
│   │       └── Tools/
│   │           ├── Conversion/            # Format conversion pages
│   │           ├── Compression/           # Compression pages
│   │           ├── Resize/                # Resize/crop pages
│   │           ├── Edit/                  # Edit tools pages
│   │           └── Utility/               # Utility pages
│   └── views/
│       └── app.blade.php                  # Root template
└── routes/
    └── web.php                            # All routes
```

## 🎯 Available Routes

### Home
- `/` - Homepage with all tools

### Conversion Tools
- `/png-to-jpg` - Convert PNG to JPG
- `/jpg-to-png` - Convert JPG to PNG
- `/webp-to-jpg` - Convert WEBP to JPG
- `/webp-to-png` - Convert WEBP to PNG
- `/jpg-to-webp` - Convert JPG to WEBP
- `/png-to-webp` - Convert PNG to WEBP
- `/gif-to-jpg` - Convert GIF to JPG
- `/gif-to-png` - Convert GIF to PNG
- `/bmp-to-jpg` - Convert BMP to JPG
- `/bmp-to-png` - Convert BMP to PNG
- `/tiff-to-jpg` - Convert TIFF to JPG
- `/tiff-to-png` - Convert TIFF to PNG
- `/heic-to-jpg` - Convert HEIC to JPG
- `/heic-to-png` - Convert HEIC to PNG
- `/svg-to-png` - Convert SVG to PNG
- `/jpg-to-avif` - Convert JPG to AVIF
- `/png-to-avif` - Convert PNG to AVIF
- `/webp-to-avif` - Convert WEBP to AVIF
- `/avif-to-jpg` - Convert AVIF to JPG
- `/avif-to-png` - Convert AVIF to PNG

### Compression Tools
- `/compress-jpg` - Compress JPG images
- `/compress-png` - Compress PNG images
- `/compress-webp` - Compress WEBP images
- `/compress-gif` - Compress GIF images

### Resize & Crop
- `/resize-image` - Resize images with custom dimensions
- `/crop-image` - Crop images to specific size

### Edit Tools
- `/rotate-image` - Rotate images by 90°, 180°, or 270°
- `/watermark-image` - Add watermark to images

### Utilities
- `/image-to-base64` - Convert images to Base64
- `/base64-to-image` - Convert Base64 to images
- `/ico-generator` - Generate favicon.ico files

### Advanced
- `/image-workbench` - Pipeline editor for batch processing

## 🔐 Privacy & Security

- **100% Client-Side Processing**: All image operations happen in your browser
- **No Server Uploads**: Images never leave your device
- **No Data Storage**: Nothing is stored or tracked
- **Unlimited Use**: Process as many images as you want

## 🎨 Customization

### Adding New Tools

1. Create a new route in `routes/web.php`
2. Add a method in `ImageToolController.php`
3. Create a Vue component in `resources/js/Pages/Tools/`
4. Use `BaseToolPage.vue` as a template

### Modifying Image Quality

Edit `resources/js/Composables/useImageProcessor.js`:

```javascript
// Default quality for JPG/WEBP (0.0 - 1.0)
const quality = 0.92;

// For compression
const compressQuality = 0.7;
```

## 📊 Health & Monitoring

- `/health` - Full health check endpoint
- `/up` - Simple uptime check

## 🔧 Environment Variables

```bash
# Sentry Error Tracking (optional)
SENTRY_DSN=your-sentry-dsn
SENTRY_ENVIRONMENT=production

# Security Headers
SECURITY_HEADERS_ENABLED=true
CSP_ENABLED=false
```

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

Copyright © 2025-2026 [Codezela Technologies](https://codezela.com)

## 🏢 About Codezela Technologies

**ILoveIMG Studio** is crafted with ❤️ by [Codezela Technologies](https://codezela.com)

We build privacy-first, client-side web applications that put users in control of their data.

- 🌐 Website: [https://codezela.com](https://codezela.com)
- 📧 Email: [info@codezela.com](mailto:info@codezela.com)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- [libheif-js](https://github.com/catdad-experiments/libheif-js) - HEIC/HEIF decoding
- [@squoosh/lib](https://github.com/GoogleChromeLabs/squoosh) - AVIF encoding
- [exif-js](https://github.com/exif-js/exif-js) - EXIF metadata extraction
- [Laravel](https://laravel.com) - PHP Framework
- [Vue.js](https://vuejs.org) - Progressive JavaScript Framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS Framework

## 🐛 Issues

Found a bug? Please open an issue on GitHub.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Built with ❤️ using Laravel, Vue 3, and Inertia.js
