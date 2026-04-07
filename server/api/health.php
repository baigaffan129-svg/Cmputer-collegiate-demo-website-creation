<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../helpers/json.php';

api_headers();
api_handle_options();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_out(405, ['ok' => false, 'message' => 'Method not allowed']);
}

try {
    $pdo = db();
    $pdo->query('SELECT 1');
    json_out(200, [
        'ok' => true,
        'service' => 'computer-collegiate-api',
        'database' => 'connected',
    ]);
} catch (Throwable $e) {
    json_out(503, [
        'ok' => false,
        'service' => 'computer-collegiate-api',
        'database' => 'unavailable',
    ]);
}
