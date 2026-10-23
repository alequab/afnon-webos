# Downloads the adhan recordings into app/sounds/adhan/: the same 14 the Android app uses, from
# https://github.com/abodehq/Athan-MP3, and two that meypod/al-azan uses, from https://github.com/meypod/audio_files.
# Neither states a licence, so they are not committed to this repo.
# Without them Afnon still works; the call screen just stays silent.
$dest = Join-Path (Split-Path $PSScriptRoot -Parent) 'app\sounds\adhan'
$base = 'https://raw.githubusercontent.com/abodehq/Athan-MP3/master/Sounds/'
New-Item -ItemType Directory -Force $dest | Out-Null
$ProgressPreference = 'SilentlyContinue'
$list = @(
    'alafasy|Athan Mishary Alafasi.mp3'
    'almalki|Athan Hamdan Almalki.mp3'
    'alarkani|Athan Ibrahim Al-Arkani.mp3'
    'chebae_fajr|Athan Al-fajer - Malek chebae.mp3'
    'alhamathani|Athan Majed Al-hamathani.mp3'
    'alzahrani|Athan Mansoor Az-Zahrani.mp3'
    'deghreri|Athan Hamad Deghreri.mp3'
    'alqatami|Athan Nasser Alqatami.mp3'
    'khatba|Athan Suhaib Khatba.mp3'
    'menshawy|Athan Mohammad Almenshawy.mp3'
    'refaat|Athan Mohammad Ref3at.mp3'
    'abdulbasit|Athan Abed Albase6.mp3'
    'nuyne|Athan Ahmad Nuyne3.mp3'
    'makkah|Athan Makkah.mp3'
)
foreach ($item in $list) {
    $id, $name = $item -split '\|', 2
    $out = Join-Path $dest "$id.mp3"
    if (Test-Path $out) { continue }
    "  $id"
    Invoke-WebRequest -UseBasicParsing ($base + [uri]::EscapeDataString($name)) -OutFile $out
}
# Two more from meypod/al-azan's audio files (no licence stated there either).
$base2 = 'https://raw.githubusercontent.com/meypod/audio_files/main/adhan/'
foreach ($item in @('nabawi|masjid_an_nabawi.mp3', 'ghalwash|ragheb_mustafa_ghalwash.mp3')) {
    $id, $name = $item -split '\|', 2
    $out = Join-Path $dest "$id.mp3"
    if (Test-Path $out) { continue }
    "  $id"
    Invoke-WebRequest -UseBasicParsing ($base2 + $name) -OutFile $out
}
"Adhan recordings are in $dest"
