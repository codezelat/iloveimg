<?php

use App\Http\Controllers\ImageToolController;
use Illuminate\Support\Facades\Route;

// Home
Route::get('/', [ImageToolController::class, 'index'])->name('home');

// Format Conversion Routes
Route::get('/png-to-jpg', [ImageToolController::class, 'pngToJpg'])->name('tools.png-to-jpg');
Route::get('/jpg-to-png', [ImageToolController::class, 'jpgToPng'])->name('tools.jpg-to-png');
Route::get('/webp-to-jpg', [ImageToolController::class, 'webpToJpg'])->name('tools.webp-to-jpg');
Route::get('/webp-to-png', [ImageToolController::class, 'webpToPng'])->name('tools.webp-to-png');
Route::get('/jpg-to-webp', [ImageToolController::class, 'jpgToWebp'])->name('tools.jpg-to-webp');
Route::get('/png-to-webp', [ImageToolController::class, 'pngToWebp'])->name('tools.png-to-webp');
Route::get('/gif-to-jpg', [ImageToolController::class, 'gifToJpg'])->name('tools.gif-to-jpg');
Route::get('/gif-to-png', [ImageToolController::class, 'gifToPng'])->name('tools.gif-to-png');
Route::get('/bmp-to-jpg', [ImageToolController::class, 'bmpToJpg'])->name('tools.bmp-to-jpg');
Route::get('/bmp-to-png', [ImageToolController::class, 'bmpToPng'])->name('tools.bmp-to-png');
Route::get('/tiff-to-jpg', [ImageToolController::class, 'tiffToJpg'])->name('tools.tiff-to-jpg');
Route::get('/tiff-to-png', [ImageToolController::class, 'tiffToPng'])->name('tools.tiff-to-png');
Route::get('/heic-to-jpg', [ImageToolController::class, 'heicToJpg'])->name('tools.heic-to-jpg');
Route::get('/heic-to-png', [ImageToolController::class, 'heicToPng'])->name('tools.heic-to-png');

// Compression Routes
Route::get('/compress-jpg', [ImageToolController::class, 'compressJpg'])->name('tools.compress-jpg');
Route::get('/compress-png', [ImageToolController::class, 'compressPng'])->name('tools.compress-png');
Route::get('/compress-webp', [ImageToolController::class, 'compressWebp'])->name('tools.compress-webp');
Route::get('/compress-gif', [ImageToolController::class, 'compressGif'])->name('tools.compress-gif');

// Resize & Crop Routes
Route::get('/resize-image', [ImageToolController::class, 'resizeImage'])->name('tools.resize-image');
Route::get('/crop-image', [ImageToolController::class, 'cropImage'])->name('tools.crop-image');

// Edit Routes
Route::get('/rotate-image', [ImageToolController::class, 'rotateImage'])->name('tools.rotate-image');
Route::get('/watermark-image', [ImageToolController::class, 'watermarkImage'])->name('tools.watermark-image');

// Utility Routes
Route::get('/image-to-base64', [ImageToolController::class, 'imageToBase64'])->name('tools.image-to-base64');
Route::get('/base64-to-image', [ImageToolController::class, 'base64ToImage'])->name('tools.base64-to-image');

// Advanced Suite
Route::get('/image-workbench', [ImageToolController::class, 'imageWorkbench'])->name('tools.image-workbench');

// Legal Pages
Route::get('/privacy', [ImageToolController::class, 'privacy'])->name('privacy');
Route::get('/privacy-policy', fn() => redirect('/privacy'));
Route::get('/terms', [ImageToolController::class, 'terms'])->name('terms');
Route::get('/terms-of-service', fn() => redirect('/terms'));

// 404 Catch-All
Route::fallback(fn() => Inertia\Inertia::render('NotFound'));
