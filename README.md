WIP Gets stock market data and returns data based on parameters selected

There are previous commits that are not shown. I had to delete the old repository for security reasons (I did something dumb)


If you want to run unit tests in headless mode: ng test --no-watch --no-progress --browsers=ChromeHeadless

To start the app:
1. generate your own API keys from twelvedata API and finnhub API. Keep these in a .env file
2. cd into both frontend and backend directories
3. run "npm install" in both root directories
4. type node index.js in backend root and npm start in client root