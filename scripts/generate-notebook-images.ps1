Add-Type -AssemblyName System.Drawing
$root = Split-Path -Parent $PSScriptRoot
$displayDir = Join-Path $root 'assets\images\notebook\optimized'
$thumbDir = Join-Path $root 'assets\images\notebook\thumbnails'
$previewDir = Join-Path $root 'assets\images\notebook\previews'
New-Item -ItemType Directory -Force -Path $displayDir, $thumbDir, $previewDir | Out-Null

$sources = @{
    'aleszka'='assets\images\notebook\Aleszka.png'; 'cilward'='assets\images\notebook\Cilward.png'
    'frontman-x'='assets\images\notebook\FrontmanX.png'; 'haizara'='assets\images\notebook\Haizara.png'
    'jang-1'='assets\images\notebook\Jang1.png'; 'jang-2'='assets\images\notebook\Jang2.png'
    'jang-3'='assets\images\notebook\Jang3.png'; 'gigazep0'='assets\images\notebook\gigazep0.png'
    'skizz-art'='assets\images\notebook\skizz.artt2.png'; 'viky-arte-perron'='assets\images\notebook\viky.arte_perron.png'
    'lunna'='assets\images\notebook\Lunna.png'; 'malengil'='assets\images\notebook\Malengil.png'
    'miokagv'='assets\images\notebook\Miokagv.png'; 'not-your-rott'='assets\images\notebook\NotYourRott.png'
    'pompis-dulces'='assets\images\notebook\PompisDulces.png'; 'sonokido'='assets\images\notebook\Sonokido.png'
    'taxie-1'='assets\images\notebook\Taxie1.png'; 'taxie-2'='assets\images\notebook\Taxie2.png'
    'taxie-3'='assets\images\notebook\Taxie3.png'; 'trazh'='assets\images\notebook\Trazh.png'
    'sono-zono'='assets\images\wiki\gallery\inu\others\zono.png'
    'sono-zono-2'='assets\images\wiki\gallery\inu\others\zono2.png'
}
$jpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'

function Save-Variant($sourceRelative, $destination, [double]$limit, [long]$quality) {
    $source = [System.Drawing.Image]::FromFile((Join-Path $root $sourceRelative))
    try {
        $scale = [Math]::Min(1.0, $limit / [double][Math]::Max($source.Width, $source.Height))
        $width = [Math]::Max(1, [int][Math]::Round($source.Width * $scale))
        $height = [Math]::Max(1, [int][Math]::Round($source.Height * $scale))
        $bitmap = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
        try {
            $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
            try {
                $graphics.Clear([System.Drawing.Color]::White)
                $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
                $graphics.DrawImage($source, 0, 0, $width, $height)
            } finally { $graphics.Dispose() }
            $parameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $quality)
            $bitmap.Save($destination, $jpeg, $parameters)
            $parameters.Dispose()
        } finally { $bitmap.Dispose() }
    } finally { $source.Dispose() }
}

function Save-Preview($sourceRelative, $destination) {
    $source = [System.Drawing.Image]::FromFile((Join-Path $root $sourceRelative))
    try {
        $canvas = New-Object System.Drawing.Bitmap(1200, 630, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
        try {
            $graphics = [System.Drawing.Graphics]::FromImage($canvas)
            try {
                $graphics.Clear([System.Drawing.Color]::FromArgb(243, 234, 209))
                $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
                $scale = [Math]::Min(1120.0 / $source.Width, 570.0 / $source.Height)
                $width = [int][Math]::Round($source.Width * $scale)
                $height = [int][Math]::Round($source.Height * $scale)
                $x = [int][Math]::Round((1200 - $width) / 2)
                $y = [int][Math]::Round((630 - $height) / 2)
                $graphics.DrawImage($source, $x, $y, $width, $height)
            } finally { $graphics.Dispose() }
            $parameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]88)
            $canvas.Save($destination, $jpeg, $parameters)
            $parameters.Dispose()
        } finally { $canvas.Dispose() }
    } finally { $source.Dispose() }
}

foreach ($id in $sources.Keys) {
    Save-Variant $sources[$id] (Join-Path $displayDir ($id + '.jpg')) 1800.0 88
    Save-Variant $sources[$id] (Join-Path $thumbDir ($id + '.jpg')) 360.0 80
    Save-Preview $sources[$id] (Join-Path $previewDir ($id + '.jpg'))
}
Write-Output ('Generated {0} image variants.' -f ($sources.Count * 3))
