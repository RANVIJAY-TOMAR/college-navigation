# Start server with remote database configuration
# Remote MySQL server: 192.168.0.112

Write-Host "Setting environment variables..." -ForegroundColor Cyan
$env:DB_HOST = "192.168.0.241"
$env:DB_USER = "root"
$env:DB_PASSWORD = "raghav23@"
$env:DB_NAME = "bhhraman"
$env:DB_PORT = "3306"

Write-Host "Starting server..." -ForegroundColor Green
Write-Host "Remote database: $env:DB_HOST" -ForegroundColor Yellow
Write-Host ""

node index.js

