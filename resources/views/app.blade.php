<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title inertia>{{ config('app.name', 'ILoveIMG Studio') }}</title>
        
        <link rel="icon" type="image/png" sizes="32x32" href="/ilvimg.png">
        <link rel="apple-touch-icon" href="/ilvimg.png">
        <meta name="theme-color" content="#0f172a">
        <meta name="description" content="ILoveIMG Studio – private, browser-based image conversion, compression, and editing tools.">
        
        @routes
        @vite(['resources/css/app.css', 'resources/js/app.js'])
        @inertiaHead
    </head>
    <body class="antialiased bg-gray-50">
        @inertia
    </body>
</html>
