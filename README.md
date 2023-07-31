# Welcome to Statisfy
Statisfy was a project I done for my University course that essentially allows the user to see some information about their Spotify accounts that would otherwise be hidden.

## Features
- Statisfy allows users to:
    - View their top tracks (Within 3 time ranges)
    - View their top artists (Within 3 time ranges)
    - View their current playing tracks
    - Search for artists
    - Use a Spotify web player to play tracks through the application

## Getting Started
Firstly, you will need to create a Spotify Developer account at: https://developer.spotify.com/

Once you've done that, make your way to the developer dashboard and find the create app button.  
Fill out the details for the app such as the name, description, website and redirect uri.  
(You don't need to fill out website and if you are running the application locally you can use localhost as the redirect URI)  

Once you've created the app throught the dashboard, find the app and go into the settings to find the "Client ID" which you will need later.  
(It's best if you don't share your Client ID and Client Secret with anyone you don't trust)  

Once you've got the information you need you can clone the repo and begin to fill out the necessary info in the files.

# Setting up the Application
With the repo cloned, make sure you install the dependencies for the app with: `npm install`.

- Once the dependencies have been installed, you can make your way to `src/pages/` and look for:
  - `artists.js`
  - `currently-playing.js`
  - `Dashboard.js`
  - `home.js`
  - `search-artists.js`
  - `search-tracks.js`
  - `tracks.js`

- These files will contain parameters for the application like:
  - `CLIENT_ID` - The Client ID you grabbed earlier will go here.
  - `REDIRECT_URI` - The same REDIRECT_URI you set earlier will go here.
  - `AUTH_ENDPOINT` - The endpoint the application will call to for Spotify to authorise the application.
  - `RESPONSE_TYPE` - You shouldn't have to mess with this unless maybe you change the authorisation method.
  - `SCOPE` - Here you will add the scopes for the applicaiton, which you can find on the Spotify Web API documention.

Go through each of the files and fill in the relevant information for each.  
For scopes or additional paramaters for some of the API requests, go here: https://developer.spotify.com/documentation/web-api

# Using the application
Once you've set up the application with the relevant information, you can use 'npm start' in the command line and it should start the application up and open your browser to localhost:3000.  

You should be greeted with the application and everything should work as intended.

## Troubleshooting
Some issues may arise if certain details aren't correctly adjusted.  

For example if relevant scopes aren't added to the `SCOPE` field on a page, you may encounter errors.

You may also need to login and out again if you've left yourself logged in after the expiry time for the token has ran.

# Standard npm stuff
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

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

