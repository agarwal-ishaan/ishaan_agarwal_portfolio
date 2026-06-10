# Ishaan Agarwal — Portfolio

Personal portfolio site built with React 19, Vite, Tailwind CSS, and Framer Motion.
Live at: https://agarwal-ishaan.github.io/ishaan_agarwal_portfolio/

## Development

```bash
npm install
npm run dev        # local dev server
npm run build      # production build to dist/
npm run preview    # serve the production build locally
npm run deploy     # build + publish to GitHub Pages (gh-pages branch)
```

## Visitor analytics (one-time setup required)

The site includes a [GoatCounter](https://www.goatcounter.com) snippet — free,
privacy-friendly (no cookies, GDPR-safe, no consent banner needed).

To activate it:

1. Sign up at https://www.goatcounter.com/signup with the site code **`ishaan-agarwal`**
   (must match the code in `index.html`; if you pick a different code, update the
   `data-goatcounter` URL there).
2. Deploy the site (`npm run deploy`).
3. View your visitor dashboard at https://ishaan-agarwal.goatcounter.com — it shows
   visits, referrers, countries, browsers, and screen sizes.

### Custom events

Besides page views, the site reports these actions (they appear in the
dashboard as event paths, via `src/lib/track.js`):

| Event path        | Fired when                                  |
|-------------------|---------------------------------------------|
| `resume-download` | Resume downloaded (hero or navbar button)    |
| `open-project-*`  | A project card / case study is opened        |
| `code-project-*`  | A project's GitHub "Code" link is clicked    |
| `research-code`   | The research "View Code" link is clicked     |
| `click-email`     | Email link clicked (hero or footer)          |
| `click-linkedin`  | LinkedIn link clicked                        |
| `click-github`    | GitHub profile link clicked                  |
| `/no-js`          | Visit from a browser with JavaScript off     |

## SEO / discoverability

- Meta description, Open Graph and Twitter Card tags, and JSON-LD `Person`
  structured data live in `index.html`.
- `public/robots.txt` and `public/sitemap.xml` are served from the site root.
- After deploying, submit the sitemap once at
  https://search.google.com/search-console (add the property
  `https://agarwal-ishaan.github.io/ishaan_agarwal_portfolio/`) so Google indexes
  the site quickly. Also paste the site URL into the LinkedIn Post Inspector
  (https://www.linkedin.com/post-inspector/) to refresh the link preview card.
