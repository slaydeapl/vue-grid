# CITE CCTK Web UI

## Requirments

[NodeJS (LTS)](https://nodejs.org/en/download/) must be installed on the machine it is running on.

[Yarn](https://yarnpkg.com/) must be installed to run, install and deploy the project.

[Git](https://git-scm.com/downloads) should be installed to make it easier to push and pull from the repo.

## Build Setup

In the root of the project directory, run these commands depending on what you want to do.

```bash
# download the repo and its contents
$ git clone http://192.168.0.36:32891/cite.allpoints.com/vue-grid.git

# install dependencies (requirment for all to start)
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how nuxtjs works, check out the [documentation](https://nuxtjs.org).

## Deploying the app

To deploy the app, simply push to the master branch of the repo. Jenkins will then be sent a webhook to build and deploy the application automatically. You will be able to find the application [here](http://192.168.0.36:34131/).

If using another host, after building the project, you can use yarn start on the machine host after building to run it for production. It is best suited to be running in a container.

If using a static host, generate the static project first, then use those files according to the instructions of your host.

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

Currently, this is where the grid objects are defined. If you would like to add an item, this is where to it, then import it to the index.vue file.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

This is where the grid is located. This file then imports the components from the components folder and displays them on the page.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
