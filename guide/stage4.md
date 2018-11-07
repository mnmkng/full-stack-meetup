# Stage 4

Now that we have docs out of the way, let's add some examples too.
The workflow we've chosen is to keep the example as a separate .js
file (we will use index.js here), parse the JSDoc comment into
a description and generate a Docusaurus page out of it.

See `stage4.js` for the new code.

After running it, we need to update the navigation header and sidebars.

## sidebars.json
```json
{
  "docs": {
    "API": [
      "api/arena",
      "api/contender"
    ],
    "Examples": [
      "examples/index"
    ]
  }
}

```

## siteConfig.js
```js
headerLinks: [
    {doc: 'api/arena', label: 'API'},
    {doc: 'examples/index', label: 'Examples'},
    {page: 'help', label: 'Help'},
    {blog: true, label: 'Blog'},
  ],
```

Our documentation is now complete. Let's take a look at styling in Stage 5.
