<#
.SYNOPSIS
    Sets up editing hosts for the XM Cloud environment.
.DESCRIPTION
    This script automates the creation of editing hosts and configuration of their environment variables.
    It requires the Sitecore CLI to be installed and authenticated.
.PARAMETER AuthoringEnvironmentId
    The ID of the Authoring Environment (CM) to attach the editing hosts to.
.EXAMPLE
    .\setup-editing-hosts.ps1 -AuthoringEnvironmentId "<environment-id>"
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$AuthoringEnvironmentId
)

# Configuration for each editing host
$hosts = @(
    @{
        Name = "nextjsstarter"
        Variables = @{
            "NEXT_PUBLIC_SEARCH_ENV" = "prod"
            "NEXT_PUBLIC_SEARCH_CUSTOMER_KEY" = "202092313-225191452"
            "NEXT_PUBLIC_SEARCH_API_KEY" = "01-8fa0d33b-6fefe6b976b8efc209b6d71333d76141d2f549be"
            "NEXT_PUBLIC_SEARCH_SOURCE" = "1193018"
        }
    },
    @{
        Name = "travel"
        Variables = @{
            "NEXT_PUBLIC_SEARCH_ENV" = "prod"
            "NEXT_PUBLIC_SEARCH_CUSTOMER_KEY" = "202092313-225191452"
            "NEXT_PUBLIC_SEARCH_API_KEY" = "01-8fa0d33b-6fefe6b976b8efc209b6d71333d76141d2f549be"
            "NEXT_PUBLIC_SKYWINGS_SEARCH_SOURCE" = "1197636"
        }
    },
    @{
        Name = "energy"
        Variables = @{
            "NEXT_PUBLIC_SEARCH_ENV" = "prod"
            "NEXT_PUBLIC_SEARCH_CUSTOMER_KEY" = "202092313-225191452"
            "NEXT_PUBLIC_SEARCH_API_KEY" = "01-8fa0d33b-6fefe6b976b8efc209b6d71333d76141d2f549be"
            "NEXT_PUBLIC_GRIDWELL_SEARCH_SOURCE" = "225191452"
        }
    },
    @{
        Name = "healthcare"
        Variables = @{
             # Search variables are not necessary for this host
        }
    },
    @{
        Name = "luxury-retail"
        Variables = @{
             # Search variables are not necessary for this host
        }
    }
)

Write-Host "Creating editing hosts for environment ID: $AuthoringEnvironmentId" -ForegroundColor Cyan

foreach ($hostConfig in $hosts) {
    $hostName = $hostConfig.Name
    Write-Host "Processing host: $hostName" -ForegroundColor Yellow

    # Create the editing host
    Write-Host "Creating editing host '$hostName'..."
    try {
        dotnet sitecore cloud editinghost create -n "$hostName" -cm "$AuthoringEnvironmentId"
        if ($LASTEXITCODE -ne 0) {
            Write-Warning "Failed to create editing host '$hostName'. It might already exist or there was an error."
            # Continue to variable upsert even if creation "fails" (e.g. if it exists, we might still want to update vars)
        }
    }
    catch {
        Write-Warning "An error occurred creating host '$hostName': $_"
    }
    
    # Retrieve the ID of the created editing host
    Write-Host "Retrieving ID for editing host '$hostName'..."
    $editingHostsJson = dotnet sitecore cloud editinghost list --json | ConvertFrom-Json
    
    # Filter for the host related to this environment and name
    $targetHost = $editingHostsJson | Where-Object { $_.name -eq $hostName }
    
    if (-not $targetHost) {
        Write-Error "Could not find editing host with name '$hostName'. Skipping variable configuration."
        continue
    }

    $hostId = $targetHost.id
    Write-Host "Found host ID: $hostId" -ForegroundColor Green

    # Upsert variables
    foreach ($key in $hostConfig.Variables.Keys) {
        $val = $hostConfig.Variables[$key]
        Write-Host "Upserting variable $key = $val"
        dotnet sitecore cloud environment variable upsert -id "$hostId" -n "$key" -val "$val"
    }

    Write-Host "Completed configuration for $hostName" -ForegroundColor Green
    Write-Host "----------------------------------------"
}

Write-Host "All operations completed." -ForegroundColor Cyan
