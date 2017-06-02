# BITLAB IoT Web Server

This project is the web server for our 2nd semester project in the course "IT Project" at Copenhagen Business School.
The project is highly experimental and therefore uses certain technologies that would otherwise be deemed unfit for
production (i.e. SQLite3). This documentation has two main sections. The first section is an explanation of which
technologies we have employed so that the reader has a bit of background knowledge. The second section is a walkthrough
of the project structure and an explanation of some of the most important source code and its functionality.

# 1. Technology stack

This project is built using the following core technologies:

* Node
* Express
* React
* SQLite3

Let's run them through one by one.

## 1.1 Node.js

Node.js is a JavaScript run-time environment that essentially introduces JS for the backend. Historically, JS code was
exclusively provided on the frontend, by adding a reference to the JS file in the HTML. The browser would then download
this file and execute it using its own JavaScript interpreter. Google's interpreter which is used by Google Chrome is
called the V8 Engine, and Node.js is built upon this very engine. Node.js allows for the development of an entire
project - both frontend and backend - using the same programming language.

## 1.2 Express

Express is the name of the most popular Node.js framework used today at the time of writing. It is lightweight, makes
barely any decisions, and provides you with just enough code to get started with your project. Express generates the
following:

1. A project folder structure.
2. Creates and launches a web server with a pre-defined port 3000.
3. A lightweight app.js file (see 2.X) with basic debug settings, default templating engine, and a public folder.
4. Generates two basic routes (see 2.X).
5. Two basic Pug (the default templating engine) files

The Express framework essentially sets you up so that you can immediately launch the server and be greeted with the
"Welcome to Express!" message by visiting http://localhost:3000.

## 1.3 React

React is a frontend library developed by Facebook. Projects built on React divide the entire frontend layout into
so-called "components" (see 2.x). React controls everything that happens visually on your project and updates only the
relevant components when data input changes. This is a different way of dealing with the frontend than how it used to
be done traditionally. When Express generates your project, it uses Pug as the default templating engine. Templating
engines are smarter, faster ways of writing HTML code. People don't always agree on the best way of doing things
which is why there are many templating engines available. In our project, however, we hardly use Pug at all; only to
create a basic HTML skeleton. This is where React kicks in and controls everything else. By supplying React with an
"anchor point" (an existing HTML element), React knows where to begin inserting its components.

## 1.4 SQLite3

SQLite3 was the safest and fastest choice of database for an experimental project such as ours. SQLite3 is great because
it is self-contained, meaning that nothing needs to be installed unlike almost all other databases. SQLite3 is a
relational database which means that it understands most basic SQL syntax.

# 2. Project walkthrough

This is the heavy part. One of the hardest parts of programming isn't developing code, but *reading and understanding*
other people's code. Therefore, take your time and read all this through several times. You will never gain a full
100% understanding without programming yourself, but rather a strong architecture understanding is achievable.

On Github, you are viewing the root directory of the project. In general there are three main sections of code: The
`src` folder, the `node_modules` folder, and the remaining individual files in the root directory. We are going to
start from the top with the most important files and go deeper as we progress.

## 2.1 `package.json`

This is an essential file in any Node.js project. It is a text document, formatted in JSON, that lists important
details about the project. Arguably the most important, are your dependencies. A 'dependency' is a software package
written by a third party that you have integrated into your project. The Express framework, is an example of a
dependency. Read them through and try guessing what they provide in terms of functionality. When a stranger decides to
download this project's source code from Github, all of the projects dependencies are *not* included. It is considered
bad practice to include your project's dependencies on Github because they fill a lot of unnecessary data storage.
Node.js provides you with a special console command to automatically install all of your project's dependencies, by
reading the `package.json` file. The dependencies are then stored in the `node_modules` folder.

## 2.2 `.gitignore`

Notice that `node_modules` is not part of the repository. You can control which files and folders are uploaded to
Github with the `.gitignore` text file.

## 2.3 `webpack.config.js`

Web browsers are only able to understand HTML, CSS, and JavaScript, but writing these purely during development is
extremely time-consuming and ineffective. React components even look like a weird mix of HTML and JavaScript, so how
can all of this work? Our solution is a dependency called Webpack, which we have added in our `package.json`. Webpack
does two things: 1) It *transpiles* all of the files written in newer technologies into pure HTML, CSS, and JavaScript.
In our case, it is only the CSS and JavaScript that is created, since React takes care of generating the HTML for us.
2) It *merges* all of the files into a single CSS and JavaScript files. This allows us to organize our code into
different components which matches the way you organize React components.

## 2.4 `app.js`

This is the core configuration file for the Express framework. It sets fundamental settings and declares its
dependence to all other core files. It's like a motherboard to a PC. This file is directly read by Node.js when
launching your project.

## 2.5 `app-client.js`

The placement of this file is perhaps a bit misleading. It is not an ordinary JS file and is never read by Node. This
file tells React where to be injected on page load. Imagine a tree structure of React components where this file is at
the very top.

## 2.6 `routes.js`

This is the file where the magical RESTful API is configured. It dictates what happens when you visit specific URLs.
Only the root page returns a webpage, while all other routes return JSON files as we specified in the report. React
calls upon this API to get updates to the latest noise recordings at `/rpi`. Other apps, such as an Android app, would
also be able to use this API and display the information provided.

## 2.7 `/bin/www`

This is where Express launches your web server using the settings provided in `app.js`. This code was auto-generated.

## 2.8 `/assets`

Static visual files.

## 2.9 `/components`

All the React components

## 2.10 `/config`

Contains a file telling Node where to find/create your database.

## 2.11 `/dist`

The ONLY folder accessibly from the public. Webpack places all finished files in this folder. The two most important
ones are `bitlabiot.js` and `bitlabiot.css`. The rest is just fonts and the CBS logo.

## 2.12 `/templates`

This folder normally contains a whole tree structure of Pug template files. Since React is dealing with our frontend,
we only use Pug to create a HTML skeleton.