<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ImageToolController extends Controller
{
    // Conversion routes
    public function pngToJpg()
    {
        return Inertia::render('Tools/Conversion/PngToJpg', [
            'toolName' => 'PNG to JPG',
            'description' => 'Convert PNG images to JPG format in your browser'
        ]);
    }

    public function jpgToPng()
    {
        return Inertia::render('Tools/Conversion/JpgToPng', [
            'toolName' => 'JPG to PNG',
            'description' => 'Convert JPG images to PNG format in your browser'
        ]);
    }

    public function webpToJpg()
    {
        return Inertia::render('Tools/Conversion/WebpToJpg', [
            'toolName' => 'WEBP to JPG',
            'description' => 'Convert WEBP images to JPG format in your browser'
        ]);
    }

    public function webpToPng()
    {
        return Inertia::render('Tools/Conversion/WebpToPng', [
            'toolName' => 'WEBP to PNG',
            'description' => 'Convert WEBP images to PNG format in your browser'
        ]);
    }

    public function jpgToWebp()
    {
        return Inertia::render('Tools/Conversion/JpgToWebp', [
            'toolName' => 'JPG to WEBP',
            'description' => 'Convert JPG images to WEBP format in your browser'
        ]);
    }

    public function pngToWebp()
    {
        return Inertia::render('Tools/Conversion/PngToWebp', [
            'toolName' => 'PNG to WEBP',
            'description' => 'Convert PNG images to WEBP format in your browser'
        ]);
    }

    public function gifToJpg()
    {
        return Inertia::render('Tools/Conversion/GifToJpg', [
            'toolName' => 'GIF to JPG',
            'description' => 'Convert GIF images to JPG format in your browser'
        ]);
    }

    public function gifToPng()
    {
        return Inertia::render('Tools/Conversion/GifToPng', [
            'toolName' => 'GIF to PNG',
            'description' => 'Convert GIF images to PNG format in your browser'
        ]);
    }

    public function bmpToJpg()
    {
        return Inertia::render('Tools/Conversion/BmpToJpg', [
            'toolName' => 'BMP to JPG',
            'description' => 'Convert BMP images to JPG format in your browser'
        ]);
    }

    public function bmpToPng()
    {
        return Inertia::render('Tools/Conversion/BmpToPng', [
            'toolName' => 'BMP to PNG',
            'description' => 'Convert BMP images to PNG format in your browser'
        ]);
    }

    public function tiffToJpg()
    {
        return Inertia::render('Tools/Conversion/TiffToJpg', [
            'toolName' => 'TIFF to JPG',
            'description' => 'Convert TIFF images to JPG format in your browser'
        ]);
    }

    public function tiffToPng()
    {
        return Inertia::render('Tools/Conversion/TiffToPng', [
            'toolName' => 'TIFF to PNG',
            'description' => 'Convert TIFF images to PNG format in your browser'
        ]);
    }

    public function heicToJpg()
    {
        return Inertia::render('Tools/Conversion/HeicToJpg', [
            'toolName' => 'HEIC to JPG',
            'description' => 'Convert HEIC and HEIF images to JPG format locally',
        ]);
    }

    public function heicToPng()
    {
        return Inertia::render('Tools/Conversion/HeicToPng', [
            'toolName' => 'HEIC to PNG',
            'description' => 'Convert HEIC and HEIF images to PNG format locally',
        ]);
    }

    // Compression routes
    public function compressJpg()
    {
        return Inertia::render('Tools/Compression/CompressJpg', [
            'toolName' => 'Compress JPG',
            'description' => 'Compress JPG images in your browser'
        ]);
    }

    public function compressPng()
    {
        return Inertia::render('Tools/Compression/CompressPng', [
            'toolName' => 'Compress PNG',
            'description' => 'Compress PNG images in your browser'
        ]);
    }

    public function compressWebp()
    {
        return Inertia::render('Tools/Compression/CompressWebp', [
            'toolName' => 'Compress WEBP',
            'description' => 'Compress WEBP images in your browser'
        ]);
    }

    public function compressGif()
    {
        return Inertia::render('Tools/Compression/CompressGif', [
            'toolName' => 'Compress GIF',
            'description' => 'Compress GIF images in your browser'
        ]);
    }

    // Resize routes
    public function resizeImage()
    {
        return Inertia::render('Tools/Resize/ResizeImage', [
            'toolName' => 'Resize Image',
            'description' => 'Resize images in your browser'
        ]);
    }

    public function cropImage()
    {
        return Inertia::render('Tools/Resize/CropImage', [
            'toolName' => 'Crop Image',
            'description' => 'Crop images in your browser'
        ]);
    }

// Other tools
public function rotateImage()
{
    return Inertia::render('Tools/Edit/RotateImage', [
        'toolName' => 'Rotate Image',
        'description' => 'Rotate images in your browser'
    ]);
}

    public function watermarkImage()
    {
        return Inertia::render('Tools/Edit/WatermarkImage', [
            'toolName' => 'Watermark Image',
            'description' => 'Add watermark to images in your browser'
        ]);
    }

    public function imageToBase64()
    {
        return Inertia::render('Tools/Utility/ImageToBase64', [
            'toolName' => 'Image to Base64',
            'description' => 'Convert images to Base64 encoding in your browser'
        ]);
    }

    public function base64ToImage()
    {
        return Inertia::render('Tools/Utility/Base64ToImage', [
            'toolName' => 'Base64 to Image',
            'description' => 'Convert Base64 to image in your browser'
        ]);
    }

    public function imageWorkbench()
    {
        return Inertia::render('Tools/Advanced/ImageWorkbench', [
            'toolName' => 'Image Workbench',
            'description' => 'Full pipeline editor for conversion, compression, resize, filters, and metadata cleanup',
            'supportedFormats' => $this->getSupportedFormats(),
            'defaultPipeline' => $this->getDefaultPipelineConfig(),
        ]);
    }

    public function privacy()
    {
        return Inertia::render('Privacy');
    }

    // Home page
    public function index()
    {
        return Inertia::render('Home', [
            'tools' => $this->getToolCategories()
        ]);
    }

    private function getToolCategories()
    {
        return [
            [
                'name' => 'Format Conversion',
                'icon' => '🔄',
                'tools' => [
                    ['name' => 'PNG to JPG', 'path' => 'png-to-jpg'],
                    ['name' => 'JPG to PNG', 'path' => 'jpg-to-png'],
                    ['name' => 'WEBP to JPG', 'path' => 'webp-to-jpg'],
                    ['name' => 'WEBP to PNG', 'path' => 'webp-to-png'],
                    ['name' => 'JPG to WEBP', 'path' => 'jpg-to-webp'],
                    ['name' => 'PNG to WEBP', 'path' => 'png-to-webp'],
                    ['name' => 'GIF to JPG', 'path' => 'gif-to-jpg'],
                    ['name' => 'GIF to PNG', 'path' => 'gif-to-png'],
                    ['name' => 'BMP to JPG', 'path' => 'bmp-to-jpg'],
                    ['name' => 'BMP to PNG', 'path' => 'bmp-to-png'],
                    ['name' => 'TIFF to JPG', 'path' => 'tiff-to-jpg'],
                    ['name' => 'TIFF to PNG', 'path' => 'tiff-to-png'],
                    ['name' => 'HEIC to JPG', 'path' => 'heic-to-jpg'],
                    ['name' => 'HEIC to PNG', 'path' => 'heic-to-png'],
                ]
            ],
            [
                'name' => 'Compression',
                'icon' => '📦',
                'tools' => [
                    ['name' => 'Compress JPG', 'path' => 'compress-jpg'],
                    ['name' => 'Compress PNG', 'path' => 'compress-png'],
                    ['name' => 'Compress WEBP', 'path' => 'compress-webp'],
                    ['name' => 'Compress GIF', 'path' => 'compress-gif'],
                ]
            ],
            [
                'name' => 'Resize & Crop',
                'icon' => '📐',
                'tools' => [
                    ['name' => 'Resize Image', 'path' => 'resize-image'],
                    ['name' => 'Crop Image', 'path' => 'crop-image'],
                ]
            ],
            [
                'name' => 'Edit',
                'icon' => '✏️',
                'tools' => [
                    ['name' => 'Rotate Image', 'path' => 'rotate-image'],
                    ['name' => 'Watermark Image', 'path' => 'watermark-image'],
                ]
            ],
            [
                'name' => 'Utilities',
                'icon' => '🛠️',
                'tools' => [
                    ['name' => 'Image to Base64', 'path' => 'image-to-base64'],
                    ['name' => 'Base64 to Image', 'path' => 'base64-to-image'],
                ]
            ],
            [
                'name' => 'Advanced Suite',
                'icon' => '🧰',
                'tools' => [
                    ['name' => 'Image Workbench', 'path' => 'image-workbench'],
                ]
            ],
        ];
    }

    private function getSupportedFormats()
    {
        return [
            ['label' => 'JPEG', 'value' => 'jpeg'],
            ['label' => 'PNG', 'value' => 'png'],
            ['label' => 'WEBP', 'value' => 'webp'],
            ['label' => 'GIF', 'value' => 'gif'],
            ['label' => 'BMP', 'value' => 'bmp'],
            ['label' => 'TIFF', 'value' => 'tiff'],
            ['label' => 'HEIC', 'value' => 'heic'],
        ];
    }

    private function getDefaultPipelineConfig()
    {
        return [
            'format' => 'jpeg',
            'quality' => 90,
            'resizeMode' => 'original',
            'width' => 1920,
            'height' => 1080,
            'percentage' => 100,
            'maintainAspect' => true,
            'rotate' => 0,
            'flipHorizontal' => false,
            'flipVertical' => false,
            'filters' => [
                'brightness' => 100,
                'contrast' => 100,
                'saturation' => 100,
                'hue' => 0,
                'blur' => 0,
                'grayscale' => 0,
                'sepia' => 0,
            ],
            'backgroundColor' => '#ffffff',
        ];
    }
}
