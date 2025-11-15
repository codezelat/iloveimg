# ILoveIMG - Client-Side Image Processing Application

A complete Laravel + Vue 3 application for browser-based image processing. All operations happen client-side using Canvas API - no server uploads required!

## 🚀 Features

### Format Conversion
- PNG ↔ JPG ↔ WEBP
- GIF → JPG/PNG
- BMP → JPG/PNG
- TIFF → JPG/PNG

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
- Add watermarks (coming soon)

### Utilities
- Image to Base64 converter
- Base64 to Image converter

## 🛠️ Technology Stack

- **Backend**: Laravel 12 (latest)
- **Frontend**: Vue 3 (Composition API)
- **Routing**: Inertia.js 2.0
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Image Processing**: HTML5 Canvas API

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

## 📝 License

This project is open-source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Issues

Found a bug? Please open an issue on GitHub.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Built with ❤️ using Laravel, Vue 3, and Inertia.js
