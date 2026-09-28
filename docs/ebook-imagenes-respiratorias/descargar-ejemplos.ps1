param([switch]$MetadataOnly)
$ErrorActionPreference = 'Stop'
$atlasFolder = 'C:/Users/Hp/OneDrive/Documentos/json/inser-web/public/academia/ebook/imagenes-respiratorias/images'
$atlasItems = @(
  @{id='real-rx-hiper';title='File:BullousEmphysema.png';file='real-rx-hiper.png'},
  @{id='real-rx-nodulo';title='File:Thorax pa peripheres Bronchialcarcinom li OF markiert.jpg';file='real-rx-nodulo.jpg'},
  @{id='real-ct-nodulo';title='File:Solitary pulmonary nodule CT arrow.jpg';file='real-ct-nodulo.jpg'},
  @{id='real-ct-atelectasia';title='File:CT LF mit bds Unterlappen-Atelektase.jpg';file='real-ct-atelectasia.jpg'},
  @{id='real-ct-vidrio';title='File:HRCT of mosaic ground-glass opacities of pneumocystis pneumonia 1.jpg';file='real-ct-vidrio.jpg'},
  @{id='real-ct-consolidacion';title='File:CT of organized infiltrate of pneumocystis pneumonia.jpg';file='real-ct-consolidacion.jpg'}
)
$atlasTitles = $atlasItems.title -join '|'
$atlasUri = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=videoinfo&viprop=url%7Csize%7Cextmetadata%7Cderivatives&viurlwidth=960&titles=' + [uri]::EscapeDataString($atlasTitles)
$atlasBatch = Invoke-RestMethod -Uri $atlasUri
function Plain($value) { [System.Net.WebUtility]::HtmlDecode(($value -replace '<[^>]+>',' ')).Trim() }
$atlasRecords = foreach ($item in $atlasItems) {
  $atlasPage = @($atlasBatch.query.pages.PSObject.Properties.Value | Where-Object { $_.title -eq $item.title })[0]
  $info = $atlasPage.videoinfo[0]
  if (-not $info) { throw "Sin archivo: $($item.title)" }
  $license = $info.extmetadata.LicenseShortName.value
  if ($license -notmatch '^CC0$|^CC BY(\-SA)? [234]\.0$|^Public domain$') { throw "Licencia pendiente: $($item.title): $license" }
  $delivery = if ($info.thumburl) { $info.thumburl } else { $info.url }
  if ($item.video) {
    $variant = @($info.derivatives | Where-Object { $_.transcodekey -match '(480p|720p)\.vp9\.webm' } | Sort-Object height -Descending)[0]
    if (-not $variant) { throw "No hay WebM compatible: $($item.title)" }
    $delivery = $variant.src
  }
  $record = [ordered]@{id=$item.id;file=$item.file;title=$item.title;source=$info.descriptionurl;download=$delivery;author=(Plain $info.extmetadata.Artist.value);license=$license;licenseUrl=$info.extmetadata.LicenseUrl.value;description=(Plain $info.extmetadata.ImageDescription.value);width=$info.width;height=$info.height;kind=$(if($item.video){'video'}else{'image'});modifications='Miniatura o transcodificación oficial de Wikimedia, sin edición local; anotaciones educativas separadas del archivo.';reviewed=$false}
  if ($item.video) { $record.poster="$($item.id)-poster.jpg"; $record.posterDownload=$info.thumburl; $record.duration=$info.duration }
  if (-not $MetadataOnly) {
    $target = Join-Path $atlasFolder $item.file
    if (-not (Test-Path -LiteralPath $target)) { Start-Sleep -Seconds 3; Invoke-WebRequest -Uri ($delivery -split '\?')[0] -OutFile $target }
    if ($item.video -and -not (Test-Path -LiteralPath (Join-Path $atlasFolder $record.poster))) { Start-Sleep -Seconds 3; Invoke-WebRequest -Uri ($info.thumburl -split '\?')[0] -OutFile (Join-Path $atlasFolder $record.poster) }
  }
  [pscustomobject]$record
}
$atlasRecords | ConvertTo-Json -Depth 8
