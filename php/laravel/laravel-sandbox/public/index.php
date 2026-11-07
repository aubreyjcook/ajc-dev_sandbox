<?php

declare(strict_types=1);

$host = getenv('DB_HOST') ?: 'db';
$database = getenv('DB_DATABASE') ?: 'laravel';
$username = getenv('DB_USERNAME') ?: 'laravel';
$password = getenv('DB_PASSWORD') ?: 'secret';

header('Content-Type: text/plain; charset=utf-8');
echo "laravel-app\n";
echo 'php ' . PHP_VERSION . "\n";

try {
    new PDO(
        sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', $host, $database),
        $username,
        $password,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION],
    );
    echo "mysql ok\n";
} catch (Throwable $exception) {
    http_response_code(503);
    echo 'mysql pending: ' . $exception->getMessage() . "\n";
}
