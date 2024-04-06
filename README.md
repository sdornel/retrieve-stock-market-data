NOTE TO SELF:
I need to ensure the websockets are actually working. As of this weekend (and starting friday night) nothing got returned except pings. I suspect this is because the market was closed but I need to verify. I also need to leave comments for myself as a reminder if this is the case.
I also thought it would be a good idea to dockerize the application. It would be easier than running the frontend and backend separately.

Gets stock market data and returns data based on parameters selected

There are previous commits that are not shown. I had to delete the old repository for security reasons (I did something dumb)


If you want to run unit tests in headless mode: ng test --no-watch --no-progress --browsers=ChromeHeadless

To start the app:
1. generate your own API keys from twelvedata API and finnhub API. Keep these in a .env file
2. cd into both frontend and backend directories
3. run "npm install" in both root directories
4. type node index.js in backend root and npm start in client root
