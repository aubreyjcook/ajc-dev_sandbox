[CmdletBinding()]
param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$Target,

    [Parameter(Mandatory = $true, Position = 1)]
    [ValidatePattern("^[a-z][a-z0-9-]*$")]
    [string]$Name
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot

$validGroups = @("js", "php", "rust", "cpp", "css", "asm", "java", "python")
$singleTech = @("rust", "cpp", "java", "python")

$parts = $Target -split "/"
if ($parts.Count -gt 2 -or $parts[0] -eq "") {
    throw "usage: new-project.ps1 <group[/tech]> <name>"
}
$group = $parts[0]
$tech = if ($parts.Count -eq 2) { $parts[1] } else { $null }

if ($validGroups -notcontains $group) {
    throw "unknown group '$group'. Groups: $($validGroups -join ', ')"
}

$template = Join-Path $PSScriptRoot "templates\$group"
if (-not (Test-Path -LiteralPath $template)) {
    throw "missing template: $template (group '$group' has no scaffold)"
}

if (-not $tech -and $singleTech -notcontains $group) {
    throw "group '$group' needs a technology, e.g. new-project.ps1 $group/<tech> $Name"
}

$relative = if ($tech) { "$group/$tech/$Name" } else { "$group/$Name" }
$dest = Join-Path $root $relative
if (Test-Path -LiteralPath $dest) {
    throw "already exists: $dest"
}

New-Item -ItemType Directory -Force -Path (Split-Path -Parent $dest) | Out-Null
Copy-Item -LiteralPath $template -Destination $dest -Recurse

$utf8 = New-Object System.Text.UTF8Encoding $false
Get-ChildItem -LiteralPath $dest -Recurse -File | ForEach-Object {
    $text = [System.IO.File]::ReadAllText($_.FullName)
    $updated = $text.Replace("__NAME__", $Name)
    if ($updated -ne $text) {
        [System.IO.File]::WriteAllText($_.FullName, $updated, $utf8)
    }
}

Write-Output "created $relative"
Write-Output "if it serves traffic, set a free port and add a row to PORTS.md"
