# Catinder

## Created by Erkka Virtanen ( vidnyte )

<img src="./public/assets/images/catinder-logo-alt.svg" alt="Catinder Logo by Undraw" width="200"/>

Developed during a weekend and half.
This single page React application showcases a fluid and responsive user interface for viewing different cat breeds. You can search for you favorite cat breed or filter breeds by their origin country and temperaments. After finding your favorites you can save them for later viewing!

## Features

- Responsive mobile friendly implementation with CSS Grid
- Multiple language support built-in
- Random cat breed feature
- Saving favorite breeds to browser's localStorage for later sessions
- Fluid animations and snappy design

## Easter Egg!

- Try clicking the Catinder logo to change the language! Meow!

## Thanks to and developed with the help of the following libraries and APIs:

- The Cat API
  https://thecatapi.com/
- React
- Spectre.css
- Illustration and logo from Undraw
  https://undraw.co/
- React-localization
- React-reveal
- React-paginate
- Material UI icons
- Game Icons
  https://game-icons.net/
- Particle Effects by Louis Hoebregts
  https://css-tricks.com/playing-with-particles-using-the-web-animations-api/

## Live Demo

A live demo is deployed on Heroku.

- https://catinder-app.herokuapp.com/

## To Do in the Future:

- Refactor code and dependencies to remove warnings from console
- Add tests
- Check WAI-ARIA compliance
- Research how to improve site performance and loading ( https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fcatinder-app.herokuapp.com%2F )
- Add analytics(Google Analytics?)
- Check and optimize SEO

## Available Scripts

For local development add your own `.env` file to the root directory with your keys to The Cat API

```
REACT_APP_CAT_API_URL=https://api.thecatapi.com/v1
REACT_APP_CAT_API_KEY=<YOUR-API-KEY-HERE>
```

Then in the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.
