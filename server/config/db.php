<?php
/**
 * Database connection for XAMPP (MySQL).
 *
 * Option A: Create server/config/local.php (copy from local.example.php)
 * Option B: Set env vars DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS
 */
declare(strict_types=1);

function db_env(string $key, string $default): string
{
    $v = getenv($key);
    return ($v !== false && $v !== '') ? $v : $default;
}

function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $config = [];
    $localFile = __DIR__ . '/local.php';
    if (is_readable($localFile)) {
        $loaded = require $localFile;
        if (is_array($loaded)) {
            $config = $loaded;
        }
    }

    $host = $config['host'] ?? db_env('DB_HOST', '127.0.0.1');
    $port = $config['port'] ?? db_env('DB_PORT', '3306');
    $name = $config['database'] ?? db_env('DB_NAME', 'computer_collegiate');
    $user = $config['user'] ?? db_env('DB_USER', 'root');
    $pass = $config['password'] ?? db_env('DB_PASS', '');

    $dsn = "mysql:host={$host};port={$port};dbname={$name};charset=utf8mb4";

    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    return $pdo;
}
