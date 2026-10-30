# Packages Afnon for a release (the GitHub release and the LG Content Store), the version app/appinfo.json's, into
# out\release\, with the adhan and voice recordings this PC has in app\sounds (tools/fetch-adhans.ps1 and
# tools/make-voice.ps1 put them there): Afnon is of no use without them. They stay out of the source (no licence);
# THIRD_PARTY.md credits them. The service's state.json never goes in.
#   powershell -ExecutionPolicy Bypass -File tools\release.ps1
# Then: gh release create vX.Y.Z out\release\*.ipk --notes-file <notes>
$ErrorActionPreference = 'Stop'
$local = Join-Path $PSScriptRoot 'env.local.ps1'
if (Test-Path $local) { . $local }
$root = Split-Path $PSScriptRoot -Parent
& (Join-Path $PSScriptRoot 'sync.ps1')
$version = (Get-Content (Join-Path $root 'app\appinfo.json') -Raw | ConvertFrom-Json).version
foreach ($need in 'app\sounds\adhan\*.mp3', 'app\sounds\announce\*.wav') {
    if (-not (Test-Path (Join-Path $root $need))) { throw "No $need yet: run tools\fetch-adhans.ps1 and tools\make-voice.ps1 first" }
}
$stage = Join-Path $env:TEMP "afnon-lg-$version"
$svc = "$stage-service"
$out = Join-Path $root 'out\release'
Remove-Item -Recurse -Force $stage, $svc -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force $out | Out-Null
Remove-Item (Join-Path $out '*.ipk') -ErrorAction SilentlyContinue
robocopy (Join-Path $root 'app') $stage /E /NFL /NDL /NJH /NJS /NP | Out-Null
robocopy (Join-Path $root 'service') $svc /E /XF state.json /NFL /NDL /NJH /NJS /NP | Out-Null
ares-package.cmd $stage $svc -o $out --no-minify 2>&1 | Where-Object { $_ -match 'Create|Success|rror' }
Remove-Item -Recurse -Force $stage, $svc
$ipk = Get-ChildItem (Join-Path $out '*.ipk') | Select-Object -First 1
"v$version  {0}  {1:N1} MB" -f $ipk.FullName, ($ipk.Length / 1MB)
