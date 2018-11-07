# Stage 3
Ok, we have some docs now, but they're not that great yet.
The titles are displayed twice, links to other classes don't work,
the Kind information is unnecessary and long descriptions don't
look very good.

Everything we're gonna do now can be done 'more properly',
by changing the underlying templates that power `jsdoc-to-markdown`.
It would be super tedious though, so let's just quickly hack
the fixes using some RegExp replacements.

Visit `stage3.js` to see the implementation.

