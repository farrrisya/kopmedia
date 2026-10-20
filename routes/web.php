<?php

// --1. imports--
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\AlbumController;
use App\Http\Controllers\Admin\SliderController;
use App\Models\Gallery;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// --2. public routes--
Route::get('/', function () {

    return Inertia::render('Welcome', [ // screen
        'canLogin' => Route::has('login'), // check
        'canRegister' => Route::has('register'), // check
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'notices' => \App\Models\Notice::where('is_active', true)->orderBy('published_at', 'desc')->take(8)->get(), // state
        'dbSliders' => \App\Models\Slider::where('is_active', true)->orderBy('sort_order', 'asc')->orderBy('created_at', 'asc')->get(), // state
        'galleries' => \App\Models\Gallery::where('type', 'image')->whereNull('album_id')->orderBy('created_at', 'desc')->take(5)->get(), // state
        'albums' => \App\Models\Album::with('latestGallery')->withCount('galleries')->orderBy('created_at', 'desc')->take(5)->get(), // state
        'penerbitans' => \App\Models\Penerbitan::where('is_active', true)->where('category', 'buletin')->where('sub_category', 'kopmedia')->orderBy('created_at', 'desc')->take(10)->get(),
        'arrahnuId' => \App\Models\Product::where('category', "AR-RAHNU X'CHANGE")->value('id'),
        'coopmartId' => \App\Models\Product::where('category', "COOP MART")->value('id'),
        'knstpId' => \App\Models\Product::where('category', "KNSTP SMART SOLUTIONS")->value('id'),
    ]);
})->name('home');

Route::get('/dokumen', function () {
    return Inertia::render('Public/Dokumen', [ // screen
        'documents' => \App\Models\Document::where('is_active', true)->orderBy('category', 'asc')->orderBy('created_at', 'asc')->get() // state
    ]);
})->name('dokumen');

Route::get('/profil', function () {
    return Inertia::render('Public/Profil');
})->name('profil');

Route::get('/galeri', function () {
    return Inertia::render('Public/Galeri', [ // screen
        'galleries' => \App\Models\Gallery::whereNull('album_id')->orderBy('created_at', 'desc')->get(), // state
        'albums' => \App\Models\Album::with(['latestGallery', 'galleries'])->withCount('galleries')->orderBy('created_at', 'desc')->get(), // state
        'activeType' => request('type', 'gambar'), // state
    ]);
})->name('galeri');

Route::get('/galeri/album/{album}', function (\App\Models\Album $album) {
    $album->load(['galleries' => function($query) {
        $query->orderBy('created_at', 'desc');
    }]);

    $otherAlbums = \App\Models\Album::where('id', '!=', $album->id)
        ->with('latestGallery')
        ->orderBy('created_at', 'desc')
        ->limit(3)
        ->get();

    return Inertia::render('Public/AlbumShow', [ // screen
        'album' => $album,
        'otherAlbums' => $otherAlbums
    ]);
})->name('galeri.album');

Route::get('/galeri/{gallery}', function (\App\Models\Gallery $gallery) {
    $otherGalleries = \App\Models\Gallery::where('id', '!=', $gallery->id)
        ->whereNull('album_id')
        ->orderBy('created_at', 'desc')
        ->limit(3)
        ->get();

    return Inertia::render('Public/GalleryShow', [
        'galleryItem' => $gallery,
        'otherGalleries' => $otherGalleries
    ]);
})->name('galeri.show');

Route::get('/perkhidmatan', function () {
    return Inertia::render('Public/Perkhidmatan', [
        'products' => \App\Models\Product::where('is_active', true)->orderBy('category', 'asc')->orderBy('created_at', 'asc')->get()
    ]);
})->name('perkhidmatan');

Route::get('/perkhidmatan/pembiayaan/{subcategory}', function ($subcategory) {
    return Inertia::render('Public/PembiayaanSubcategory', [
        'products' => \App\Models\Product::where('is_active', true)
            ->where('category', 'SKIM PEMBIAYAAN')
            ->where('sub_category', $subcategory)
            ->orderBy('created_at', 'asc')
            ->get(),
        'subcategoryName' => $subcategory
    ]);
})->name('perkhidmatan.pembiayaan');

Route::get('/produk-dan-perkhidmatan/{product}', [\App\Http\Controllers\PublicProductController::class, 'show'])->name('public.produk.show');

Route::get('/hubungi-kami', function () {
    return Inertia::render('Public/HubungiKami', [ // screen
        'settings' => \App\Models\Setting::all()->pluck('value', 'key') // state
    ]);
})->name('hubungi-kami');

Route::get('/faq', function () {
    return Inertia::render('Public/FAQ', [ // screen
        'faqs' => \App\Models\Faq::where('is_active', true)->orderBy('sort_order', 'asc')->orderBy('created_at', 'asc')->get() // state
    ]);
})->name('faq');

Route::get('/keanggotaan', function () {
    return Inertia::render('Public/Keanggotaan');
})->name('keanggotaan');

Route::get('/penerbitan', function () {
    return Inertia::render('Public/Penerbitan', [ // screen
        'buletinKopmedia' => \App\Models\Penerbitan::where('is_active', true)->where('category', 'buletin')->where('sub_category', 'kopmedia')->orderBy('created_at', 'desc')->get(), // state
        'buletinKontemporari' => \App\Models\Penerbitan::where('is_active', true)->where('category', 'buletin')->where('sub_category', 'kontemporari')->orderBy('created_at', 'desc')->get(), // state
        'laporanTahunan' => \App\Models\Penerbitan::where('is_active', true)->where('category', 'laporan')->orderBy('created_at', 'desc')->get() // state
    ]);
})->name('public.penerbitan');

Route::get('/hebahan', [NoticeController::class, 'publicIndex'])->name('public.notices'); // redirect
Route::get('/notices/{notice}', [NoticeController::class, 'show'])->name('notices.show'); // redirect
Route::get('/penerbitan/{penerbitan}', function (\App\Models\Penerbitan $penerbitan) {
    return Inertia::render('Public/PenerbitanShow', [
        'penerbitan' => $penerbitan
    ]);
})->name('penerbitan.show');

// --3. auth routes--
Route::middleware('auth')->group(function () { // check
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// --4. member portal--
Route::get('/dashboard', function (\Illuminate\Http\Request $request) {
    return redirect()->route('admin.dashboard'); // redirect
})->name('dashboard');


// --5. admin portal--
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () { // check
    Route::get('/dashboard', function () {
        $totalNotices = \App\Models\Notice::count(); // convert
        $totalLaporan = \App\Models\Penerbitan::where('category', 'laporan')->count(); // convert
        $totalProduk = \App\Models\Product::count(); // convert
        $totalMuatTurun = \App\Models\Document::count(); // convert
        $totalBuletin = \App\Models\Penerbitan::where('category', 'buletin')->count(); // convert
        
        $latestNotices = \App\Models\Notice::orderBy('created_at', 'desc')->take(3)->get(); // state
        $latestPenerbitan = \App\Models\Penerbitan::orderBy('created_at', 'desc')->take(3)->get(); // state
        
        // Fetch more to filter out redundant consecutive logins
        $rawActivities = \App\Models\ActivityLog::with('user')->orderBy('created_at', 'desc')->take(20)->get();
        $recentActivities = collect();
        $lastAction = null;
        
        foreach($rawActivities as $activity) {
            if ($activity->action === 'Log Masuk' && $lastAction === 'Log Masuk') {
                continue;
            }
            $recentActivities->push($activity);
            $lastAction = $activity->action;
            if ($recentActivities->count() >= 5) break;
        }
        
        $chartData = []; // convert
        for ($i = 11; $i >= 0; $i--) {
            $date = \Carbon\Carbon::now()->subMonths($i);
            $year = $date->year;
            $month = $date->month;
            
            $chartData[] = [
                'name' => $date->format('M Y'),
                'Notis' => \App\Models\Notice::whereYear('created_at', $year)->whereMonth('created_at', $month)->count(),
                'Laporan' => \App\Models\Penerbitan::where('category', 'laporan')->whereYear('created_at', $year)->whereMonth('created_at', $month)->count(),
                'Perkhidmatan' => \App\Models\Product::whereYear('created_at', $year)->whereMonth('created_at', $month)->count(),
                'Muat Turun' => \App\Models\Document::whereYear('created_at', $year)->whereMonth('created_at', $month)->count(),
                'Buletin' => \App\Models\Penerbitan::where('category', 'buletin')->whereYear('created_at', $year)->whereMonth('created_at', $month)->count(),
            ];
        }
        
        return Inertia::render('Admin/Dashboard', [ // screen
            'metrics' => [
                'total_notices' => $totalNotices,
                'total_laporan' => $totalLaporan,
                'total_produk' => $totalProduk,
                'total_muat_turun' => $totalMuatTurun,
                'total_buletin' => $totalBuletin,
            ],
            'latest_notices' => $latestNotices,
            'latest_penerbitan' => $latestPenerbitan,
            'recent_activities' => $recentActivities,
            'chart_data' => $chartData,
        ]);
    })->name('dashboard');

    Route::get('/members', function () {
        return Inertia::render('Admin/Members', [ // screen
            'members' => \App\Models\User::where('role', 'member')->orderBy('created_at', 'desc')->get(), // state
        ]);
    })->name('members');

    Route::get('/notices', function () {
        return Inertia::render('Admin/Notices/Index', [ // screen
            'notices' => \App\Models\Notice::orderBy('created_at', 'desc')->get(), // state
        ]);
    })->name('notices.index');
    
    Route::get('/notices/create', [NoticeController::class, 'create'])->name('notices.create'); // screen
    Route::get('/notices/{notice}/edit', [NoticeController::class, 'edit'])->name('notices.edit'); // screen
    Route::post('/notices', [NoticeController::class, 'store'])->name('notices.store'); // save
    Route::put('/notices/{notice}', [NoticeController::class, 'update'])->name('notices.update'); // save
    Route::patch('/notices/{notice}/status', [NoticeController::class, 'updateStatus'])->name('notices.update-status'); // save
    Route::delete('/notices/{notice}', [NoticeController::class, 'destroy'])->name('notices.destroy'); // trigger

    Route::get('/galleries', [GalleryController::class, 'index'])->name('galleries.index'); // screen
    Route::get('/galleries/create', [GalleryController::class, 'create'])->name('galleries.create'); // screen
    Route::get('/galleries/{gallery}/edit', [GalleryController::class, 'edit'])->name('galleries.edit'); // screen
    Route::post('/galleries', [GalleryController::class, 'store'])->name('galleries.store'); // save
    Route::put('/galleries/{gallery}', [GalleryController::class, 'update'])->name('galleries.update'); // save
    Route::delete('/galleries/{gallery}', [GalleryController::class, 'destroy'])->name('galleries.destroy'); // trigger

    Route::resource('albums', AlbumController::class)->except(['index']); // routes

    Route::get('/applications', function () {
        return Inertia::render('Admin/Applications/Index', [ // screen
            'applications' => \App\Models\Application::with(['user', 'scheme'])->orderBy('created_at', 'desc')->get(), // state
        ]);
    })->name('applications.index');

    Route::patch('/applications/{application}/status', [ApplicationController::class, 'updateStatus'])->name('applications.update-status'); // save

    Route::get('/sliders', [SliderController::class, 'index'])->name('sliders.index');
    Route::get('/sliders/create', [SliderController::class, 'create'])->name('sliders.create');
    Route::get('/sliders/{slider}/edit', [SliderController::class, 'edit'])->name('sliders.edit');
    Route::post('/sliders', [SliderController::class, 'store'])->name('sliders.store');
    Route::put('/sliders/{slider}', [SliderController::class, 'update'])->name('sliders.update');
    Route::patch('/sliders/{slider}/status', [SliderController::class, 'updateStatus'])->name('sliders.update-status');
    Route::delete('/sliders/bulk', [SliderController::class, 'bulkDestroy'])->name('sliders.bulk-destroy');
    Route::delete('/sliders/{slider}', [SliderController::class, 'destroy'])->name('sliders.destroy');

    Route::get('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');

    Route::get('/page/{slug}', [\App\Http\Controllers\Admin\SinglePageController::class, 'edit'])->name('page.edit');
    Route::post('/page/{slug}', [\App\Http\Controllers\Admin\SinglePageController::class, 'update'])->name('page.update');

    Route::get('/penerbitan', [\App\Http\Controllers\Admin\PenerbitanController::class, 'index'])->name('penerbitan.index');
    Route::get('/penerbitan/create', [\App\Http\Controllers\Admin\PenerbitanController::class, 'create'])->name('penerbitan.create');
    Route::get('/penerbitan/{penerbitan}/edit', [\App\Http\Controllers\Admin\PenerbitanController::class, 'edit'])->name('penerbitan.edit');
    Route::post('/penerbitan', [\App\Http\Controllers\Admin\PenerbitanController::class, 'store'])->name('penerbitan.store');
    Route::put('/penerbitan/{penerbitan}', [\App\Http\Controllers\Admin\PenerbitanController::class, 'update'])->name('penerbitan.update');
    Route::patch('/penerbitan/{penerbitan}/status', [\App\Http\Controllers\Admin\PenerbitanController::class, 'updateStatus'])->name('penerbitan.update-status');
    Route::delete('/penerbitan/{penerbitan}', [\App\Http\Controllers\Admin\PenerbitanController::class, 'destroy'])->name('penerbitan.destroy');

    Route::get('/media', [\App\Http\Controllers\Admin\MediaController::class, 'index'])->name('media.index');
    Route::get('/media/create', [\App\Http\Controllers\Admin\MediaController::class, 'create'])->name('media.create');
    Route::post('/media', [\App\Http\Controllers\Admin\MediaController::class, 'store'])->name('media.store');
    Route::put('/media/{medium}', [\App\Http\Controllers\Admin\MediaController::class, 'update'])->name('media.update');
    Route::delete('/media/bulk', [\App\Http\Controllers\Admin\MediaController::class, 'bulkDestroy'])->name('media.bulk-destroy');
    Route::delete('/media/{medium}', [\App\Http\Controllers\Admin\MediaController::class, 'destroy'])->name('media.destroy');

    Route::get('/muat-turun', [\App\Http\Controllers\Admin\DocumentController::class, 'index'])->name('muat-turun.index');
    Route::get('/muat-turun/create', [\App\Http\Controllers\Admin\DocumentController::class, 'create'])->name('muat-turun.create');
    Route::get('/muat-turun/{document}/edit', [\App\Http\Controllers\Admin\DocumentController::class, 'edit'])->name('muat-turun.edit');
    Route::post('/muat-turun', [\App\Http\Controllers\Admin\DocumentController::class, 'store'])->name('muat-turun.store');
    Route::put('/muat-turun/{document}', [\App\Http\Controllers\Admin\DocumentController::class, 'update'])->name('muat-turun.update');
    Route::patch('/muat-turun/{document}/status', [\App\Http\Controllers\Admin\DocumentController::class, 'updateStatus'])->name('muat-turun.update-status');
    Route::delete('/muat-turun/{document}', [\App\Http\Controllers\Admin\DocumentController::class, 'destroy'])->name('muat-turun.destroy');

    Route::get('/produk-perkhidmatan', [\App\Http\Controllers\Admin\ProductController::class, 'index'])->name('produk-perkhidmatan.index');
    Route::get('/produk-perkhidmatan/create', [\App\Http\Controllers\Admin\ProductController::class, 'create'])->name('produk-perkhidmatan.create');
    Route::post('/produk-perkhidmatan', [\App\Http\Controllers\Admin\ProductController::class, 'store'])->name('produk-perkhidmatan.store');
    Route::get('/produk-perkhidmatan/{product}', [\App\Http\Controllers\Admin\ProductController::class, 'show'])->name('produk-perkhidmatan.show');
    Route::get('/produk-perkhidmatan/{product}/edit', [\App\Http\Controllers\Admin\ProductController::class, 'edit'])->name('produk-perkhidmatan.edit');
    Route::put('/produk-perkhidmatan/{product}', [\App\Http\Controllers\Admin\ProductController::class, 'update'])->name('produk-perkhidmatan.update');
    Route::patch('/produk-perkhidmatan/{product}/status', [\App\Http\Controllers\Admin\ProductController::class, 'updateStatus'])->name('produk-perkhidmatan.update-status');
    Route::delete('/produk-perkhidmatan/{product}', [\App\Http\Controllers\Admin\ProductController::class, 'destroy'])->name('produk-perkhidmatan.destroy');

    Route::get('/soalan-lazim', [\App\Http\Controllers\Admin\FaqController::class, 'index'])->name('soalan-lazim.index');
    Route::get('/soalan-lazim/create', [\App\Http\Controllers\Admin\FaqController::class, 'create'])->name('soalan-lazim.create');
    Route::get('/soalan-lazim/{faq}/edit', [\App\Http\Controllers\Admin\FaqController::class, 'edit'])->name('soalan-lazim.edit');
    Route::post('/soalan-lazim', [\App\Http\Controllers\Admin\FaqController::class, 'store'])->name('soalan-lazim.store');
    Route::put('/soalan-lazim/{faq}', [\App\Http\Controllers\Admin\FaqController::class, 'update'])->name('soalan-lazim.update');
    Route::patch('/soalan-lazim/{faq}/status', [\App\Http\Controllers\Admin\FaqController::class, 'updateStatus'])->name('soalan-lazim.update-status');
    Route::delete('/soalan-lazim/{faq}', [\App\Http\Controllers\Admin\FaqController::class, 'destroy'])->name('soalan-lazim.destroy');

    Route::get('/api/media', function () {
        return response()->json(\App\Models\Media::orderBy('created_at', 'desc')->get());
    })->name('api.media');
});

require __DIR__.'/auth.php';
