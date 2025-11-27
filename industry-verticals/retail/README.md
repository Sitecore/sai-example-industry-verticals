# Retail - Demo Site (NextJS) - nextjsstarter

## Overview

Retail is a simple website with sample Component implementation showcasing data source handling and other essentials. This demo site is built to showcase XM Cloud capabilities using the Content SDK.

## Developer Expectations:

- Tailwind-based styling (Shadcn)
- Personalized homepage via URL parameters
- Modular components for reuse
- Localization support for English (en) and Canadian English (en-CA)

## Preconditions

1. You have deployed your XM Cloud environment already. If not follow this link: [Deploy a Project and Environment](https://doc.sitecore.com/xmc/en/developers/xm-cloud/deploy-a-project-and-environment.html)

## Build and run site locally

1. Clone the repository (if not yet done)
   `git clone https://github.com/Sitecore/Sitecore.Demo.XMCloud.IndustryVerticals.SiteTemplates`
2. Starting from the root of the repository navigate to site app folder
   `cd industry-verticals\retail`
3. Copy the environment file `.env.remote.example`
4. Rename the copied file to `.env.local`
5. Edit `.env.local` and provide a value for `SITECORE_EDGE_CONTEXT_ID`, `NEXT_PUBLIC_DEFAULT_SITE_NAME`, `NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID`, `SITECORE_EDITING_SECRET`. (More info: [Environment variables in XM Cloud](https://doc.sitecore.com/xmc/en/developers/xm-cloud/get-the-environment-variables-for-a-site.html))

6. Install dependencies:
   from `industry-verticals\retail` run `npm install`
7. Run the site locally:
   `npm run dev`
8. Access the site:
   Visit http://localhost:3000 in your browser.

## Add Editing host to XM Cloud

If you have not enabled the split deployment feature your edting hosts are automatically created based on the xmcloud.build.json if enabled is set to true. The following steps are not required. Only if you have enabled the split deployment feature, continue with the next steps.

1. Go to Sitecore Cloud Portal https://portal.sitecorecloud.io
2. Open XM Cloud Deploy
3. Select Project that has been deployed
4. Switch to tab "Editing Hosts"
5. Click "Add editing host"
6. Provide Editing host name `nextjsstarter` as per xmcloud.build.json
7. Check if the link to authoring environment is set correctly (should be by default)
8. Check if the source code provider is set correctly (should be by default)
9. Check if the GitHub Account is set correctly (should be by default)
10. Check if repository is set correctly (should be by default)
11. Check if Branch is set correctly (should be by default)
12. Set the Auto deploy option (recommended)
13. No custom environment variables are required
14. Click "Save"
15. On the new new editing host click the ... and hit "Build and deploy"

Additional Info: You do not have to create rendering host items in XM Cloud as those are created automatically for you when creating a rendering host. Mapping of sites using site templates to editing hosts is also done automatically.

[Documentation](https://doc.sitecore.com/xmc/en/developers/content-sdk/sitecore-content-sdk-for-xm-cloud.html)

## Serialization Structure

### Overview

This section explains how Sitecore items are serialized and deployed for the Retail Site Collection.
It distinguishes between IAR (Item-As-Resources) modules and SCS (Sitecore Content Serialization) post-action modules.

#### Serialization & Deployment Strategy

| Category                             | Description                                                                                                        |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| IAR (Item-As-Resources)              | Items packaged and deployed with the rendering host build (`Project.retail`)                                       |
| SCS (Sitecore Content Serialization) | Items pushed to Sitecore after deployment using post-actions (`Project.Retail-Content` and `Project.Retail-Media`) |
| Excluded                             | OOB XM Cloud items                                                                                                 |

---

#### Serialized Item Summary

| Category                                    | Path                                                           | Serialized | Deployment Type |
| ------------------------------------------- | -------------------------------------------------------------- | ---------- | --------------- |
| Project Settings                            | `/sitecore/system/Settings/Project/industry-verticals`         | Yes        | IAR             |
| Templates                                   | `/sitecore/templates/Project/industry-verticals`               | Yes        | IAR             |
| Branch Templates                            | `/sitecore/templates/Branches/Project/industry-verticals`      | Yes        | IAR             |
| Layouts / Renderings / Placeholder Settings | `/sitecore/layout/.../Project/industry-verticals`              | Yes        | IAR             |
| Tenant Root                                 | `/sitecore/content/retail`                                     | Yes        | IAR             |
| Site Root                                   | `/sitecore/content/retail/forma-lux`                           | Yes        | SCS             |
| Home, Data, Dictionary, Presentation        | `/sitecore/content/retail/forma-lux/...`                       | Yes        | SCS             |
| Media Library Folder (structure)            | `/sitecore/media library/Project/industry-verticals/forma-lux` | Yes        | SCS             |
| Media Assets                                | `/sitecore/media library/.../*`                                | Yes        | IAR             |

---

### Common CLI Commands for Serialized Items

Use the following Sitecore CLI commands to manage serialization and deployment:

```bash
# Connect your local project to a specific XM Cloud environment and allow write operations:
dotnet sitecore cloud environment connect --environment-id <envId> --allow-write true

# Pull the latest items from Sitecore to your local project
sitecore ser pull

# Push local serialized items to your Sitecore environment
sitecore ser push
```

[Documentation](https://doc.sitecore.com/xmc/en/developers/xm-cloud/serialization-in-sitecore.html)
