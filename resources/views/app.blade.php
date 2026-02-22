<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        
        <!-- Performance Hints -->
        <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com">
        
        <!-- Icons -->
        <link rel="icon" type="image/png" sizes="32x32" href="/ilvimg.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/ilvimg.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/ilvimg.png">
        <link rel="mask-icon" href="/icon.svg" color="#3b82f6">
        
        <!-- Theme Colors -->
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)">
        <meta name="theme-color" content="#f8fafc" media="(prefers-color-scheme: light)">
        <meta name="msapplication-TileColor" content="#0f172a">
        <meta name="msapplication-config" content="/browserconfig.xml">
        
        <!-- Base SEO (will be overridden by Inertia SeoHead component) -->
        <title inertia>{{ config('app.name', 'ILoveIMG Studio') }}</title>
        <meta name="description" content="ILoveIMG Studio – 100% private, browser-based image conversion, compression, and editing tools. 33+ tools, zero uploads, works offline.">
        <meta name="keywords" content="image converter, compress images, resize images, heic to jpg, avif converter, svg to png, browser image editor, privacy focused">
        <meta name="author" content="Codezela Technologies">
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
        
        <!-- Mobile App Capability -->
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="apple-mobile-web-app-title" content="ILoveIMG">
        <meta name="application-name" content="ILoveIMG Studio">
        
        <!-- Geo Tags -->
        <meta name="geo.region" content="LK">
        <meta name="geo.placename" content="Colombo">
        
        <!-- Generator -->
        <meta name="generator" content="Laravel 12, Vue 3, Inertia.js">
        
        @routes
        @vite(['resources/css/app.css', 'resources/js/app.js'])
        @inertiaHead
    </head>
    <body class="antialiased bg-slate-950 text-white">
        @inertia
    </body>
</html>
