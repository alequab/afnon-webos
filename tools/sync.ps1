# Copies the files the page and the service share (no build: plain copies) into app/js and service/:
# shared/*.js, adhan-js's UMD bundle (tools/npm/node_modules/adhan, ES5), and the spoken clips, which the
# service plays itself when the page isn't in front.
$root = Split-Path $PSScriptRoot -Parent
$adhan = Join-Path $root 'tools\npm\node_modules\adhan\lib\bundles\adhan.umd.min.js'
if (-not (Test-Path $adhan)) { throw 'adhan-js is missing: run  npm ci --prefix tools/npm  first' }
foreach ($dest in @("$root\app\js", "$root\service")) {
    New-Item -ItemType Directory -Force $dest | Out-Null
    Copy-Item $adhan (Join-Path $dest 'adhan.js') -Force
    Copy-Item "$root\shared\*.js" $dest -Force
}
$clips = Join-Path $root 'app\sounds\announce'
if (Test-Path "$clips\*.wav") {
    New-Item -ItemType Directory -Force "$root\service\announce" | Out-Null
    Copy-Item "$clips\*.wav" "$root\service\announce" -Force
}
