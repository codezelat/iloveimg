<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    /**
     * Add security headers to all responses
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Only add headers if enabled in env
        if (!config('security.headers_enabled', true)) {
            return $response;
        }

        // Prevent clickjacking - don't allow site in iframes
        $response->headers->set('X-Frame-Options', 'DENY');

        // Prevent MIME type sniffing
        $response->headers->set('X-Content-Type-Options', 'nosniff');

        // Legacy XSS protection (modern browsers use CSP)
        $response->headers->set('X-XSS-Protection', '1; mode=block');

        // Control referrer information leakage
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        // HTTPS only (uncomment for production with SSL)
        // $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

        // Add CSP if enabled
        if (config('security.csp_enabled', false)) {
            $this->addCspHeaders($response);
        }

        return $response;
    }

    private function addCspHeaders(Response $response): void
    {
        $csp = $this->buildCspPolicy();
        
        $headerName = config('security.csp_report_only', true) 
            ? 'Content-Security-Policy-Report-Only' 
            : 'Content-Security-Policy';

        $response->headers->set($headerName, $csp);
    }

    private function buildCspPolicy(): string
    {
        $directives = [
            // Default: only same origin
            "default-src" => "'self'",
            
            // Scripts: same origin + inline (needed for Vue) + eval (needed for WASM)
            "script-src" => "'self' 'unsafe-inline' 'unsafe-eval'",
            
            // Styles: same origin + inline (needed for Tailwind)
            "style-src" => "'self' 'unsafe-inline'",
            
            // Images: same origin + blob (canvas output) + data (inline images)
            "img-src" => "'self' blob: data:",
            
            // Media: same origin + blob (audio/video processing)
            "media-src" => "'self' blob:",
            
            // Fonts: same origin
            "font-src" => "'self'",
            
            // Connections: same origin (API calls)
            "connect-src" => "'self'",
            
            // Workers: same origin + blob (WASM workers)
            "worker-src" => "'self' blob:",
            
            // Frames: don't allow embedding
            "frame-src" => "'none'",
            
            // Form actions: same origin
            "form-action" => "'self'",
            
            // Base URI: restrict to self
            "base-uri" => "'self'",
            
            // No embedding in frames
            "frame-ancestors" => "'none'",
        ];

        $policy = [];
        foreach ($directives as $name => $value) {
            $policy[] = "{$name} {$value}";
        }

        return implode('; ', $policy);
    }
}
