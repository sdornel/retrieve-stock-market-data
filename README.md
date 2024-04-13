Gets stock market data and returns data based on parameters selected

To start the app:
1. generate your own API keys from twelvedata API and finnhub API. Keep these in a .env file inside the backend-application folder
Your .env file should look something like this:
FINNHUB_API_KEY=yourkey
TWELVEDATA_API_KEY=yourkey

(if you are starting the app locally)
2. cd into both frontend and backend directories
3. run "npm install" in both root directories
4. type node index.js in backend root and npm start in client root. Both of these must be running at the same time in order for the app to function correctly

(if you are using docker)
2. ensure you have docker installed (if using Docker Desktop like I am ensure it is running)
3. run docker-compose up --build