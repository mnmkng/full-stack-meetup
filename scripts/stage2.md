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
