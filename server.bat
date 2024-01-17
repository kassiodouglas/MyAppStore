@echo off

start cmd /k "cd .\mystore-api && php artisan dev"
start cmd /k "cd .\mystore-app && npm run dev"
