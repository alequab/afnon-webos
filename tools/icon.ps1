# Draws Afnon's launcher icons (the mihrab arch in gold on lapis) into app/icon.png (80) and app/icon-large.png (130).
Add-Type -AssemblyName System.Drawing
$root = Split-Path $PSScriptRoot -Parent
function Draw([int]$size, [string]$out) {
    $bmp = New-Object System.Drawing.Bitmap $size, $size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = 'AntiAlias'
    $g.Clear([System.Drawing.Color]::FromArgb(255, 0x0C, 0x1B, 0x33))
    $k = $size / 24.0
    # Icon.MIHRAB: M5 21V10c0-3 3-5 7-8 4 3 7 5 7 8v11z, inside a 24 grid with a margin.
    $m = 0.18 * $size; $s = ($size - 2 * $m) / 24.0
    function P($x, $y) { New-Object System.Drawing.PointF ([single]($m + $x * $s)), ([single]($m + $y * $s)) }
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddLine((P 5 22), (P 5 10))
    $path.AddBezier((P 5 10), (P 5 7), (P 8 5), (P 12 1.5))
    $path.AddBezier((P 12 1.5), (P 16 5), (P 19 7), (P 19 10))
    $path.AddLine((P 19 10), (P 19 22))
    $path.CloseFigure()
    $fill = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 0x12, 0x26, 0x4A))
    $g.FillPath($fill, $path)
    $pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 0xD8, 0xB4, 0x6A)), ([single](1.6 * $s))
    $pen.LineJoin = 'Round'
    $g.DrawPath($pen, $path)
    $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose(); $bmp.Dispose()
}
Draw 80 "$root\app\icon.png"
Draw 130 "$root\app\icon-large.png"
