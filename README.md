```
    .aMMMb  dMP     dMP dMP dMP dMMMMMP 2020
   dMP"dMP dMP     amr dMP dMP dMP
  dMMMMMP dMP     dMP dMP dMP dMMMP
 dMP dMP dMP     dMP  YMvAP" dMP
dMP dMP dMMMMMP dMP    VP"  dMMMMMP
```

## Setup

#### ENV
Exit the postgres shell and create a new file in the root of this directory called `.env`. Now copy the contents of `.env.example` into it, and do the following:

1. Leave `NODE_CONFIG_DIR` as is. This tells the `config` package where to find environment variables for our environment in the node application.
2. Replace the value for `ALIVE2020_API_URL` with the full url for the Alive2020 API server you wish to interact with, including the API version.

#### Packages
Install packages needed for server: `npm install`

## Running
To start the app, run `npm run web`.

## Debugging
To run the app in debugger mode, do the following:

1. Start the app with `foreman start webDebug`.
2. Open chrome and navigate to `chrome://inspect` in the address bar.
3. Click the Open dedicated DevTools for Node

## Development

#### Webpack
Changes to the files in `app/webpack` will automatically trigger webpack to rebuild the bundle using `webpack-dev-middleware`. In development the express app uses `webpack-dev-middleware` to automatically associate an in-memory build of the app with the main app layout, `app/views/layouts/default.ejs`. For production however you will need to actually build the bundle so that it is placed in `public/dist/`. For the time being the only way to do this is to run `npm run buildWebpackBundle`, but you could easily add this as a pre-deploy command using whatever deployment method you wind up at.

##### How is this not Single Page?
Essentially we use the `express-ejs-layouts` package to make `ejs` function more like `erb` in terms of layouts. When a route renders its template, the template is rendered inside the layout (see `<%- body %>` in `views/layouts/default.ejs`.

Inside any route specific `ejs` template where we want to hook up a React component, we use the `ejs` "helper" (to use Rails terminology... this is actually just a function defined as a `local`. See `app.locals` in `app.js`) `reactComponent`. This helper will render an element with `data-react-class` for each React component rendered through it. When our webpack bundle's entrypoint is called (see: `app/webpack/entrypoints/app.js`) it will walk over each element it finds that has a `data-react-class` and build the associated React component. Prop data for each component will be retrieved from the page data store (see how `app/webpack/utils/page_data_store.js` uses `#page-data-store`), which is also set from the `reactComponent` `ejs` helper, and made available to the component.

**One critical but kind of sad detail here**: Because webpack removes unused code (tree shaking) when building its bundles, we need to keep a reference to all react components that might possibly be rendered directly via `reactComponent` (that is, components rendered from `ejs` and not those imported by other React components in general) on the `window`. Think of of this as a manifest of all of the root level components you may render for any given route. See the file `app/webpack/utils/component_manifest`. Within this file we have imported the `Foos` component, set it as a value on the `AppComponents` object, and exported the `AppComponents` object. Any time you want to use `reactComponent` from `ejs` to render a react component, you should follow this format by adding to this file.

#### SCSS
NOTE: This is currently outdated. Leaving this until it gets added back in.

~To build css files from scss on save, from your terminal `cd` into the `/public/styles` directory and run `scss --watch .:.`.~
