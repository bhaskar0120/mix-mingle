# Mix - Mingle
This is a very simple Omegle clone (Or at least an attempt).
Written in Typescript. (Svelte files contains JS).

### Quick start for development
After cloning the repo,
- Install the dependencies using  `npm install`
- Generate the tailwind css file using _(read note 1)_  `npm run css`
- Generate index.js using _(read note 2)_  `tsc`
- Run the WebSocket server using  `node index.js`
- Dev server starts on  `localhost:8000`

 ### How to build the release version
 After cloning the repo,
 - Make sure dependencies are installed, if not  `npm install`
 - Compile index.ts _(read note 2)_  `tsc`
 - Generate production css  `npm run css-build`
 - Generate production svelte files  `npm run build`
 - Start the server  `node index.js`
----------

 **Note**: 
 1. To make tailwind work for development also start tailwind in watch mode using `npm run css-watch`
 2. To use `tsc` you must have TypeScript installed globally which you can do using `npm install -g typescript`