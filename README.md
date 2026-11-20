# Yunxiao Zhang — academic website

This copy contains the latest website, including the LinkedIn link, the unified publications list, the shorter Academic appointments title, and the revised About me section.

## Publish free with GitHub Pages

1. Sign in at https://github.com and create a **public** repository named `YOUR-USERNAME.github.io`. Replace `YOUR-USERNAME` with your actual GitHub username. If that repository already exists, check its contents before replacing anything.
2. Extract this ZIP. Upload the extracted **contents** to the repository, so `index.html` is at its top level. Keep the `assets` and `content` folders intact. Upload the files, not the ZIP itself or an enclosing folder. Commit the upload to `main`.
3. In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then select **main** and **/(root)**. Save.
4. Visit `https://YOUR-USERNAME.github.io/`. Publishing can take up to 10 minutes. The Pages settings show the published address.

No domain purchase, package installation, or build step is required. `.nojekyll` is included for direct static publishing; it is a hidden file on macOS.

## Update the website

- Edit `index.html` for page text, profile links, and biography.
- Edit `styles.css` for appearance; `site.js` handles publication search and navigation.
- The portrait and favicon are in `assets/`.
- To update publication records, edit `content/publications.json` and run `node render-publications.mjs` locally. Upload the regenerated `index.html` as well as the changed records.
- Commit later edits to `main` to publish them automatically.

All links to the former hosting address have been removed from the page metadata. Once the GitHub address is confirmed, canonical and social-sharing image URLs can be added for that address.

## Official instructions

- https://docs.github.com/en/pages/quickstart
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
