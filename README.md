# Move Planner App

This app uses requests from 3 different APIs to dynamically build a web
page when a street address and city are submitted. The APIs that are
used are:

* Google Maps
* NY Times
* Wikipedia

## Getting Started

First clone or download the repo to your local computer. Then to get the
project up and running for development and testing you will need to
setup gulp.

### Requires
- Node.js
- gulp-cli (installed globally)

### Install
From the command line in the root project folder run:

```$ npm install```

This will install gulp locally with all the necessary modules.

### Running Dev Environment

```$ gulp```

This task spins up a localhost server, and watches all files for changes
. BrowserSync automatically opens the index.html page and refreshes
the site after any changes are saved.

## License
MIT
