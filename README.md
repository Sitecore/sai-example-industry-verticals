# XM Cloud Front End Application Industry Verticals Starter Kits

## Table of Contents

- [Introduction](#introduction)
- [GitHub Template](#gitHub-template)
- [Prerequisites](#prerequisites)
- [Getting Started Guide](#getting-started-guide)
- [Running the Industry Vertical Starter Kit](#running-the-next.js-starter-kit)

## Introduction

This repository contains multiple industry verticals, and the SPA Starters monorepo (which includes a Node Proxy Application and and SPA starter apps) for Sitecore XM Cloud Development. It is intended to get developers up and running quickly with a new front end project that is integrated with Sitecore XM Cloud.

[Deploying XM Cloud](https://doc.sitecore.com/xmc/en/developers/xm-cloud/deploying-xm-cloud.html)

Here's a quick overview of the major folders and their purpose:

- `/industry-verticals`:
  Contains starter front-end applications. Each subfolder is a working app

  - industry-verticals: [README](https://github.com/Sitecore/Sitecore.Demo.XMCloud.IndustryVerticals.SiteTemplates/blob/main/industry-verticals/industry-verticals/README.md)

- `/local-containers`:
  Contains Docker-related files for local development environments.

- `/authoring`:
  The authoring folder is where Sitecore content items are defined and stored for deployment. These items include:

  - Templates: located under /items — defines the structure of content items used in the application..
  - Powershell, Modules, etc. Organized by namespace under items/items, useful for modular development and deployment.
  - Modules: Each module has its own .module.json file (e.g., nextjs-starter.module.json) to define what items it includes and where they should be deployed in the Sitecore content tree.

- `xmcloud.build.json`:
  This is the primary configuration file for building and deploying rendering hosts in your XM Cloud environment.

  Key Sections:

  - renderingHosts: Defines one or more front-end apps to build. Each entry includes:

  - path: where the app is located (e.g., ./industry-verticals/industry-verticals)

  - nodeVersion: Node.js version used during build

  - jssDeploymentSecret: Deployment auth key for JSS

  - enabled: Whether the rendering host is active

  - buildCommand / runCommand: Custom scripts for build/start

  - postActions: Actions that run after a successful deployment, such as warming up the CM server or triggering reindexing.

  - authoringPath: Path to the folder containing Sitecore item definitions (default is ./authoring).

## GitHub Template

This Github repository is a template that can be used to create your own repository. To get started, click the `Use this template` button at the top of the repository.

## Prerequisites

- Access to an Sitecore XM Cloud Environment
- [Node.js LTS](https://nodejs.org/en/)

## Getting Started Guide

For developers new to XM Cloud you can follow the Getting Started Guide on the [Sitecore Documentation Site](https://doc.sitecore.com/xmc) to get up and running with XM Cloud. This will walk you through the process of creating a new XM Cloud Project, provisioning an Environment, deploying the NextJs Starter Kit, and finally creating your first Component.

## Running the Industry Vertical Starter Kit

> **Note:** Please refer to the `README.md` of the specific industry vertical you’re working with for detailed setup instructions.
> The following outlines the general steps to run the app locally:

- Log into the Sitecore XM Cloud Deploy Portal, locate your Environment and select the `Developer Settings` tab.
- Ensure that the `Preview` toggle is enabled.
- In the `Local Development` section, click to copy the sample `.env` file contents to your clipboard.
- Create a new `.env.local` file in the `./industry-verticals/industry-verticals` folder of this repository and paste the contents from your clipboard.
- Run the following commands in the root of the repository to start the NextJs application:
  ```bash
  cd industry-verticals/industry-verticals
  npm install
  npm run dev
  ```
- You should now be able to access your site on `http://localhost:3000` and see your changes in real-time as you make them.
