<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\File;

class HealthController extends Controller
{
    /**
     * Health check endpoint for monitoring and load balancers
     */
    public function __invoke(): JsonResponse
    {
        $checks = [
            'php' => $this->checkPhp(),
            'libheif' => $this->checkLibheif(),
            'disk_space' => $this->checkDiskSpace(),
            'permissions' => $this->checkPermissions(),
        ];

        $allHealthy = collect($checks)->every(fn($check) => $check['status'] === 'ok');

        return response()->json([
            'status' => $allHealthy ? 'ok' : 'degraded',
            'timestamp' => now()->toIso8601String(),
            'version' => config('app.version', '1.0.0'),
            'environment' => config('app.env'),
            'checks' => $checks,
        ], $allHealthy ? 200 : 503);
    }

    private function checkPhp(): array
    {
        return [
            'status' => 'ok',
            'version' => PHP_VERSION,
        ];
    }

    private function checkLibheif(): array
    {
        $libheifPath = public_path('ffmpeg/libheif.mjs');
        
        if (!File::exists($libheifPath)) {
            return [
                'status' => 'error',
                'message' => 'libheif.mjs not found - HEIC conversion unavailable',
            ];
        }

        $size = File::size($libheifPath);
        $sizeMb = round($size / 1024 / 1024, 2);

        return [
            'status' => 'ok',
            'size_mb' => $sizeMb,
            'path' => 'ffmpeg/libheif.mjs',
        ];
    }

    private function checkDiskSpace(): array
    {
        $free = disk_free_space(base_path());
        $total = disk_total_space(base_path());
        $usedPercent = round((($total - $free) / $total) * 100, 1);

        $status = $usedPercent > 95 ? 'warning' : ($usedPercent > 90 ? 'warning' : 'ok');

        return [
            'status' => $status,
            'free_gb' => round($free / 1024 / 1024 / 1024, 2),
            'total_gb' => round($total / 1024 / 1024 / 1024, 2),
            'used_percent' => $usedPercent,
        ];
    }

    private function checkPermissions(): array
    {
        $writablePaths = [
            storage_path(),
            storage_path('framework/cache'),
            storage_path('framework/sessions'),
            storage_path('framework/views'),
            storage_path('logs'),
        ];

        $issues = [];
        foreach ($writablePaths as $path) {
            if (!is_writable($path)) {
                $issues[] = basename($path);
            }
        }

        if (empty($issues)) {
            return ['status' => 'ok'];
        }

        return [
            'status' => 'warning',
            'message' => 'Some directories not writable: ' . implode(', ', $issues),
        ];
    }
}
