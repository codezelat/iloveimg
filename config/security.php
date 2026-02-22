<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Security Headers
    |--------------------------------------------------------------------------
    |
    | Control whether security headers are added to responses.
    |
    */
    'headers_enabled' => env('SECURITY_HEADERS_ENABLED', true),

    /*
    |--------------------------------------------------------------------------
    | Content Security Policy (CSP)
    |--------------------------------------------------------------------------
    |
    | CSP helps prevent XSS attacks by controlling what resources can load.
    | 
    | WARNING: Enabling CSP can break functionality if not configured correctly.
    | Start with CSP_REPORT_ONLY=true to test in production.
    |
    */
    'csp_enabled' => env('CSP_ENABLED', false),
    
    // When true, CSP violations are logged but not enforced
    // Set to false to actively block violations
    'csp_report_only' => env('CSP_REPORT_ONLY', true),
];
