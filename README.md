# Mix - Mingle
This is a very simple Omegle clone (Or at least an attempt).
Written in Typescript. (Svelte files contains JS).

### Quick start
After cloning the repo,
- Install the dependencies using `npm install`
- Generate the tailwind css file using `npm run css`
- Generate index.js using _(read note 2)_ `tsc`
- Run the WebSocket server using `node index.js`
- Start the dev server using _(read note 1)_ `npm run dev`
- Dev server starts on `localhost:8080`
----------
 **Note**: 
 1. To make tailwind work for development also start tailwind in watch mode using `npm run css-watch`
 2. To use `tsc` you must have TypeScript installed globally which you can do using `npm install -g typescript`

 ### How to build the release version
 This section will be populated once the project satisfies the basic requirements