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
To give it some life, run `foreman start web`.

## Debugging
To run the app in debugger mode, start the app with `foreman start webDebug`. This will launch a chrome inspection window that will pause on any breakpoints (`debugger` statements in your code) for inspection. Note the following:
1. There will be an immediate breakpoint thrown on startup at the first line of code in our app.js. I'm unsure why node-debug does this but it appears to be standard. Simply click the console's "continue" icon to continue running the app.
2. Node-debug is a little slow. You dont want to be using this for all of your development purposes.

## Development

#### Webpack
NOTE: This is currently outdated. Leaving this until it gets added back in.
~To build the react app (`public/bundle.js`) during development, run `webpack --watch`.~

#### SCSS
NOTE: This is currently outdated. Leaving this until it gets added back in.
~To build css files from scss on save, from your terminal `cd` into the `/public/styles` directory and run `scss --watch .:.`.~
