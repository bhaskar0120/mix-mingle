# Mix - Mingle
This is a very simple Omegle clone (Or at least an attempt).
Written in Typescript. (Svelte files contains JS).

### TODO
- [x] Make PWA
- [ ] Add helpful messages to handle errors
- [ ] Add E2EE
- [ ] Make the server more secure
- [ ] Add image and video chat support (maybe)


### Quick start for development
After cloning the repo,
- Install the dependencies using  `npm install`
- Generate the tailwind css file using _(read note 1)_  `npm run css`
- Generate index.js using _(read note 2)_  `tsc`
- Start svelte dev server _(read note 3)_  `npm run dev`
- Start nodemon  `npx nodemon index.js`
- Dev server starts on  `localhost:8000`

### How to build the release version
 After cloning the repo,
 - Make sure dependencies are installed, if not  `npm install`
 - Quickly build the release version using  `npm run build`
 - Start serving by using `npm run start`

 Or use the following command to build the release version step by step

 - Compile index.ts _(read note 2)_  `tsc`
 - Generate production css  `npm run css-build`
 - Generate production svelte files  `npm run build-svelte`
 - Start the server  `node index.js`
----------

 **Note**: 
 1. To make tailwind work for development also start tailwind in watch mode using `npm run css-watch`
 2. To use `tsc` you must have TypeScript installed globally which you can do using `npm install -g typescript`
 3. This command starts the server at port 8080 for development purposes. You can ignore that or change it in the package.json ```+