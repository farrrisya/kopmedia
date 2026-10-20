<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $settings = Setting::all()->pluck('value', 'key'); // state

        return Inertia::render('Admin/Settings/Index', [ // screen
            'settings' => $settings
        ]);
    }

    /**
     * Update the specified settings in storage.
     */
    public function update(Request $request)
    {
        $data = $request->except(['_token', '_method']);

        foreach ($data as $key => $value) {
            if ($value instanceof \Illuminate\Http\UploadedFile) {
                $value = $value->store('settings', 'public');
            }
            Setting::updateOrCreate( // save
                ['key' => $key],
                ['value' => $value]
            );
        }

        return back()->with('success', 'Tetapan berjaya dikemaskini.'); // redirect
    }
}
