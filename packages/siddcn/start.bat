@echo off
echo Building siddcn...
call pnpm run build
if %errorlevel% neq 0 (
    echo Build failed!
    exit /b %errorlevel%
)

echo.
echo Starting siddcn TUI...
node dist\cli.js