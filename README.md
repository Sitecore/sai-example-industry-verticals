# SitecoreAI Industry Verticals Front End Sites

## Table of Contents

- [Introduction](#introduction)
- [GitHub Template](#gitHub-template)
- [Prerequisites](#prerequisites)
- [Getting Started Guide](#getting-started-guide)
- [Running the Industry Vertical Starter Kit](#running-the-next.js-starter-kit)

## Introduction

This repository contains multiple industry verticals, and the SPA Starters monorepo (which includes a Node Proxy Application and and SPA starter apps) for SitecoreAI Development. It is intended to get developers up and running quickly with a new front end project that is integrated with SitecoreAI.

Here's a quick overview of the major folders and their purpose:

- `/authoring`:
  The authoring folder is where Sitecore content items are defined and stored for deployment. These items include:

  - Templates: located under /items — defines the structure of content items used in the application..
  - Powershell, Modules, etc. Organized by namespace under items/items, useful for modular development and deployment.
  - Modules: Each module has its own .module.json file (e.g., nextjs-starter.module.json) to define what items it includes and where they should be deployed in the Sitecore content tree.

- `/industry-verticals`:
  Contains starter front-end applications. Each subfolder is a working app

- `xmcloud.build.json`:
  This is the primary configuration file for building and deploying rendering hosts in your SitecoreAI environment.
  Key Sections:
  - renderingHosts: Defines one or more front-end apps to build. Each entry includes:
  - path: where the app is located (e.g., ./industry-verticals/<industry-vertical>)
  - nodeVersion: Node.js version used during build
  - jssDeploymentSecret: Deployment auth key for JSS
  - enabled: Whether the rendering host is active
  - buildCommand / runCommand: Custom scripts for build/start
  - postActions: Actions that run after a successful deployment, such as warming up the CM server or triggering reindexing.
  - authoringPath: Path to the folder containing Sitecore item definitions (default is ./authoring).

## GitHub Template

This Github repository is a template that can be used to create your own repository. To get started, click the `Use this template` button at the top of the repository.

## Prerequisites

- Access to an SitecoreAI Environment
- [Node.js LTS](https://nodejs.org/en/)

## Getting Started Guide

For developers new to SitecoreAI you can follow the Getting Started Guide on the [Sitecore Documentation Site](https://doc.sitecore.com/sai) to get up and running with SitecoreAI. This will walk you through the process of creating a new SitecoreAI Project, provisioning an Environment, deploying the NextJs Starter Kit, and finally creating your first Component.

## Running the Industry Vertical Starter Kit

> **Note:** Please refer to the `README.md` of the specific industry vertical you’re working with for detailed setup instructions.
> - [healthcare](https://github.com/Sitecore/Sitecore.Demo.SitecoreAI.IndustryVerticals.SiteTemplates/blob/main/industry-verticals/healthcare/README.md)
> - [luxury-retail](https://github.com/Sitecore/Sitecore.Demo.SitecoreAI.IndustryVerticals.SiteTemplates/blob/main/industry-verticals/luxury-retail/README.md)
> - [retail](https://github.com/Sitecore/Sitecore.Demo.SitecoreAI.IndustryVerticals.SiteTemplates/blob/main/industry-verticals/retail/README.md)
> - [travel](https://github.com/Sitecore/Sitecore.Demo.SitecoreAI.IndustryVerticals.SiteTemplates/blob/main/industry-verticals/travel/README.md)

### The following outlines the general steps for running a specific industry vertical locally:

- Log into the SitecoreAI Deploy Portal, locate your Environment and select the `Developer Settings` tab.
- Ensure that the `Preview` toggle is enabled.
- In the `Local Development` section, click to copy the sample `.env` file contents to your clipboard.
- Create a new `.env.local` file in the `./industry-verticals/<industry-vertical>` folder of this repository and paste the contents from your clipboard.
- Run the following commands in the root of the repository to start the NextJs application:
  ```bash
  cd industry-verticals/retail
  npm install
  npm run dev
  ```
- You should now be able to access your site on `http://localhost:3000` and see your changes in real-time as you make them.

## Serialization Structure

### Overview

This section explains how Sitecore items are serialized and deployed for the Retail Site Collection.
It distinguishes between IAR (Item-As-Resources) modules and SCS (Sitecore Content Serialization) post-action modules.

#### Serialization & Deployment Strategy

| Category                             | Description                                                                                                        |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| IAR (Item-As-Resources)              | Items packaged and deployed with the rendering host build (eg: `Project.retail`)                                       |
| SCS (Sitecore Content Serialization) | Items pushed to Sitecore after deployment using post-actions (eg: `Project.Retail-Content` and `Project.Retail-Media`) |
| Excluded                             | OOB SitecoreAI items                                                                                                 |

---

#### Serialized Item Summary

| Category                                    | Path                                                           | Serialized | Deployment Type |
| ------------------------------------------- | -------------------------------------------------------------- | ---------- | --------------- |
| Project Settings                            | `/sitecore/system/Settings/Project/industry-verticals`         | Yes        | IAR             |
| Templates                                   | `/sitecore/templates/Project/industry-verticals`               | Yes        | IAR             |
| Branch Templates                            | `/sitecore/templates/Branches/Project/industry-verticals`      | Yes        | IAR             |
| Layouts / Renderings / Placeholder Settings | `/sitecore/layout/.../Project/industry-verticals`              | Yes        | IAR             |
| Tenant Root                                 | `/sitecore/content/industry-verticals`                                     | Yes        | IAR             |
| Site Root                                   | `/sitecore/content/industry-verticals/{site}`                           | Yes        | SCS             |
| Home, Data, Dictionary, Presentation        | `/sitecore/content/industry-verticals/{site}/...`                       | Yes        | SCS             |
| Media Library Folder (structure)            | `/sitecore/media library/Project/industry-verticals/{site}` | Yes        | SCS             |
| Media Assets                                | `/sitecore/media library/.../*`                                | Yes        | IAR             |

---

### Common CLI Commands for Serialized Items

Use the following Sitecore CLI commands to manage serialization and deployment:

```bash
# Login with sitecore CLI
dotnet sitecore cloud login

# Connect your local project to a specific SitecoreAI environment and allow write operations:
dotnet sitecore cloud environment connect --environment-id <envId> --allow-write true

# Pull the latest items from Sitecore to your local project
sitecore ser pull

# Push local serialized items to your Sitecore environment
sitecore ser push
```

[Documentation](https://doc.sitecore.com/sai/en/developers/sitecoreai/serialization-in-sitecore.html)

## Content Hub Configuration

### Use the starter-verticals if you are using the central instance 
Set the envs as follows
```bash
   - Sitecore_ConnectionStrings_DAM_dot_ContentHub=<Your Instance>
   - SITECORE_AppSettings_damEnabled__define=yes
   - Sitecore_ConnectionStrings_DAM_dot_SearchPage=<Your Instance>
```
