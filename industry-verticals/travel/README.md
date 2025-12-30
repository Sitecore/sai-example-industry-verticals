# Travel

## Overview

Skywings is a demo website created to illustrate a modern travel experience. It focuses on inspiring destinations, easy trip planning, and user-friendly navigation. The site demonstrates how travel brands can provide a seamless and engaging platform that helps users explore options, book trips, and access essential travel information effortlessly.

## Developer Expectations:

- Tailwind-based styling (Shadcn)
- Modular components for reuse
- Localization support 

## Preconditions

1. You have deployed your XM Cloud environment already. If not follow this link: [Deploy a Project and Environment](https://doc.sitecore.com/xmc/en/developers/xm-cloud/deploy-a-project-and-environment.html)

## Run site locally

1. Clone the repository (if not yet done)
   `git clone https://github.com/Sitecore/Sitecore.Demo.XMCloud.IndustryVerticals.SiteTemplates`
2. Starting from the root of the repository navigate to site app folder
   `cd industry-verticals\retail`
3. Copy the environment file `.env.remote.example`
4. Rename the copied file to `.env.local`
5. Edit `.env.local` and provide a value for
   - SITECORE_EDGE_CONTEXT_ID
   - NEXT_PUBLIC_DEFAULT_SITE_NAME
   - NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID
   - SITECORE_EDITING_SECRET
   - NEXT_PUBLIC_SEARCH_ENV
   - NEXT_PUBLIC_SEARCH_CUSTOMER_KEY
   - NEXT_PUBLIC_SEARCH_API_KEY
   - NEXT_PUBLIC_SEARCH_SOURCE
   - NEXT_PUBLIC_BASE_URL
6. Install dependencies:
   from `industry-verticals\travel` run `npm install`
7. Run the site locally:
   `npm run dev`
8. Access the site:
   Visit http://localhost:3000 in your browser.

## Add Editing host to XM Cloud

If you have not enabled the split deployment feature your editing hosts are automatically created based on the xmcloud.build.json if enabled is set to true. The following steps are not required. Only if you have enabled the split deployment feature, continue with the next steps.

1. Go to Sitecore Cloud Portal https://portal.sitecorecloud.io
2. Open XM Cloud Deploy
3. Select Project that has been deployed
4. Switch to tab "Editing Hosts"
5. Click "Add editing host"
6. Provide Editing host name `travel` as per xmcloud.build.json
7. Include search related environment variables
8. Check if the link to authoring environment is set correctly (should be by default)
9. Check if the source code provider is set correctly (should be by default)
10. Check if the GitHub Account is set correctly (should be by default)
11. Check if repository is set correctly (should be by default)
12. Check if Branch is set correctly (should be by default)
13. Set the Auto deploy option (recommended)
15. Click "Save"
16. On the new new editing host click the ... and hit "Build and deploy"

Additional Info: You do not have to create rendering host items in XM Cloud as those are created automatically for you when creating a rendering host. Mapping of sites using site templates to editing hosts is also done automatically.

[Documentation](https://doc.sitecore.com/xmc/en/developers/content-sdk/sitecore-content-sdk-for-xm-cloud.html)

## Sitecore Search Configuration

There are two options for you can try for search configuration:
1. Use the existing skywings search source
2. Create a new source in the CEC portal and link it to your application

### Use existing skywings search source
Set the envs as follows
```bash
   - NEXT_PUBLIC_SEARCH_ENV=prod
   - NEXT_PUBLIC_SEARCH_CUSTOMER_KEY=<Can be taken from cec portal>
   - NEXT_PUBLIC_SEARCH_API_KEY=<Can be taken from cec portal>
   - NEXT_PUBLIC_SEARCH_SOURCE=1197636
   - NEXT_PUBLIC_BASE_URL=<Hosted Domain URL>
```

### Create new source in CEC portal and link to your application
https://sitecore.atlassian.net/wiki/x/ZwAengE
