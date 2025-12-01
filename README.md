# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
## Hangman — Simple React Implementation

This repository contains a small Hangman game built with Create React App. The UI is split into components and the game includes:

- Header with a `New Game` button
- Search box to submit a single letter
- SVG images for hangman stages (in `public/images/`)
- Missed letters list and tries left count
- Popup modal when the player wins or loses

Run locally (development):

```bash
npm install
npm start
```

Open http://localhost:3000 in your browser.

Run in Docker (build and run the production bundle):

```bash
# build image (example tag)
docker build -t hangman1:latest .

# run container mapping port 3000
docker run --rm -p 3000:3000 hangman1:latest
```

Notes
- The `public/images/` folder contains simple SVG stage images used for the hangman visualization.
- The game logic is in `src/HangmanGame.js` and the `SingleLetterSearchBar` component sends letter guesses to the parent.

Next improvements (ideas)
- Add persistent high scores or player names
- Add animations for the hangman drawing
- Add keyboard support (listen for key presses)

