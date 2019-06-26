# reactjs-uob
INTRO
The app has the form for receiving Transaction details of three users - USEAR A, USER B, USER C. The banks involved in the transactions include 'American Express', 'DBS Paylah!' and 'Visa'. 
The transactions are stored both in MongoDB as well as reducer of Redux Saga and updated in the stores as the transactions happen. 
The Table below the form shows the transactions and updated as and when the transactions happen
Simiarly, the line chart has been connected to stores and hence, the chart gets updated as the transaction happens.
Currently, five transaction has been kept per page for demo purpose and it can be changed in the app.

STEPS
Please run the following commands after traversing to root folder (reactjs-uob):
  1. 'npm install' - to install all the dependencies
  2. 'npm start' to start the webpack dev server at port 8080 i.e. please open http://localhost:8080 to access the app
  3. 'transaction-server' is a NodeJS server to receive the requests from Front End and at the same time, connects to MongoDB Atlas DB
