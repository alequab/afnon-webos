# Packages Afnon LG (app + service) into out\, and with -Install puts it on the TV (ares device name, "lg" by default).
# No build: tools/sync.ps1 copies the shared files, then ares-package zips the two folders as they are.
# Needs ares-* on PATH (npm install -g @webos-tools/cli); tools/env.local.ps1, if present, is run first to set that up.
param([switch]$Install, [switch]$Launch, [string]$Device = 'lg')
$local = Join-Path $PSScriptRoot 'env.local.ps1'
if (Test-Path $local) { . $local }
$root = Split-Path $PSScriptRoot -Parent
& (Join-Path $PSScriptRoot 'sync.ps1')
Set-Location $root
Remove-Item out\*.ipk -ErrorAction SilentlyContinue
# The service's own state (settings saved on the TV) never goes into the package.
Remove-Item service\state.json -ErrorAction SilentlyContinue
ares-package.cmd app service -o out --no-minify 2>&1 | Where-Object { $_ -notmatch 'requiredACG|ACG|Depending on|declare an empty|For details|acg-guide|Node.js version|js-service-basics' }
$ipk = Get-ChildItem out\*.ipk | Select-Object -First 1
"{0}  {1:N1} MB" -f $ipk.Name, ($ipk.Length / 1MB)
if ($Install) { ares-install.cmd --device $Device $ipk.FullName 2>&1 }
if ($Launch) { ares-launch.cmd --device $Device tv.afnon.lg 2>&1 }
