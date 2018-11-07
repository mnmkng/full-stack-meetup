# Stage 2
Now that we know what we're working with,
let's start with replacing the dummy docs with docs
of our own. For that, we will need `jsdoc-to-markdown`.

```bash
npm install jsdoc-to-markdown
```

It can be used as a CLI tool, but we will need to do some
scripting, so let's use it programmatically in `stage2.js`.

But first, let's create some folder structure. We will have 2 main documentation
sections. API and Examples, so let's create the two folders in the `docs` folder.

Let's run `stage2.js` now.

------

We finally have some docs, now, let's add them to Docusaurus. Open `website/sidebars.json`
delete the placeholders and add an API category, with paths to the docs we just created,
relative to the `docs` folder.

```json
{
  "docs": {
    "API": [
      "api/arena",
      "api/contender"
    ]
  }
}

```

Because we deleted the placeholder files, we also need to replace them in
`website/siteConfig.js` or we'd get a nasty error.

```js
headerLinks: [
    {doc: 'api/arena', label: 'API'},
    {page: 'help', label: 'Help'},
    {blog: true, label: 'Blog'},
  ],
```

Now run 
```bash
cd website
npm start
```
