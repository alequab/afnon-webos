# adhan-java 1.2.1 (the Android app's library, from the Gradle cache) against shared/prayer.js.
# Needs a JDK (JAVA_HOME, or java/javac on PATH) and Node; tools/env.local.ps1, if present, is run first.
$tools = Split-Path $PSScriptRoot -Parent
$local = Join-Path $tools 'env.local.ps1'
if (Test-Path $local) { . $local }
$here = $PSScriptRoot
& (Join-Path $tools 'sync.ps1')
$jar = Get-ChildItem -Recurse "$env:USERPROFILE\.gradle\caches\modules-2\files-2.1\com.batoulapps.adhan\adhan\1.2.1" -Filter 'adhan-1.2.1.jar' | Select-Object -First 1
if (-not $jar) { throw 'adhan-1.2.1.jar is not in the Gradle cache: build the Android app once first' }
$javac = if ($env:JAVA_HOME) { Join-Path $env:JAVA_HOME 'bin\javac.exe' } else { 'javac' }
$java = if ($env:JAVA_HOME) { Join-Path $env:JAVA_HOME 'bin\java.exe' } else { 'java' }
$build = Join-Path $here 'build'
New-Item -ItemType Directory -Force $build | Out-Null
& $javac -cp $jar.FullName -d $build (Join-Path $here 'Times.java')
& $java -cp "$build;$($jar.FullName)" Times | node (Join-Path $here 'compare.js')
