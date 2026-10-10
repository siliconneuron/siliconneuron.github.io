# siliconneuron.com

The company website of Silicon Neuron LLC, served by GitHub Pages.

It is plain files: one page of HTML, two stylesheets and one small script. There is no build step, no framework, no cookie and no tracker, and nothing is loaded from another company. A Content-Security-Policy in the page says the same to the browser.

## Looking at it locally

The pages use root-relative paths, so serve the folder rather than opening the file:

```bash
python -m http.server 4710
```

Then open `http://localhost:4710`.

## What is where

- `index.html`: the page. `404.html`: shown for a missing address.
- `styles.css`: layout, type and colour. `stars.css`: the star field (generated once; no image).
- `space.js`: moves the light on the Earth with the pointer. The page is complete without it.
- `img/`, `fonts/`: pictures and the two typefaces.

## Rights

© Silicon Neuron LLC. All rights reserved for the text, the pictures and the Guiding Neuron mark.

The typefaces, Fraunces and Figtree, are under the SIL Open Font License; their licence files sit beside them in `fonts/`.
