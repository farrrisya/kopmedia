<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Portal Rasmi Koperasi Media Prima Berhad (Kopmedia). Menyediakan perkhidmatan pembiayaan, pelaburan, kebajikan dan kemudahan eksklusif untuk ahli.">

        <title inertia>{{ config('app.name', 'Laravel') }}</title> {{-- state --}}

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" /> {{-- css --}}
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">

        <!-- Preload LCP Hero Banner -->
        <link rel="preload" as="image" href="/images/welcome-banner.webp" fetchpriority="high">

        <!-- Scripts -->
        @routes {{-- trigger --}}
        @viteReactRefresh {{-- trigger --}}
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"]) {{-- screen --}}
        @inertiaHead {{-- properties --}}
    </head>
    <body class="font-sans antialiased">
        @inertia {{-- UI --}}
    </body>
</html>
