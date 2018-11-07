# Stage 5

In stage 5, we will look at configuration and deployment.

Most of that is handled in `siteConfig.js`.

## siteConfig.js
Deals with most of the configuration, try changing the page's title and colors.

Blood Red: #660000

And also customize the code block style.

```js
highlight: {
        theme: 'monokai-sublime',
        defaultLang: 'javascript',
    },

    usePrism: true,
```

It's also an important place for deployment. To successfully publish the site,
we need to change the following properties:

   * `projectName`: the name of the project. For me, it's `full-stack-meetup`.
   * `organizationName`: this will be your GitHub username. I will use `mnmkng`.
   * `url`: `https://mnmkng.github.io` for this project.
   * `baseUrl`: `/full-stack-meetup/` for this project.

Once set up, execute the following script, replacing the ENV_VARS as necessary:

```bash
GIT_USER=mnmkng CURRENT_BRANCH=master USE_SSH=true npm run publish-gh-pages
```

See the full [docs at Docusaurus](https://docusaurus.io/docs/en/publishing)


