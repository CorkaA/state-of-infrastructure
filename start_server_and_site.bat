@echo off
setlocal

REM Получаем путь к папке, где находится этот скрипт
set "ROOT_DIR=%~dp0"

REM Переходим в папку бэкенда и запускаем сервер
cd "%ROOT_DIR%backend"
start "Backend Server" cmd /c "node server.js"

REM Ждем 30 секунд перед запуском фронтенда
timeout /t 7 /nobreak >nul

REM Переходим в папку фронтенда и запускаем его
cd "%ROOT_DIR%frontend"
start "Frontend" cmd /c "npm start"

endlocal