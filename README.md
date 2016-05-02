# Customer Counter #

A Node and Socket.io app for displaying a row count from a DB table that is constantly updated.
One use case is to see how many customers you have by latching this on to your 'customers' table.
Also plays sounds depending on what the count does.

## Instructions ##

1. Download and install node from https://nodejs.org (skip to 3 if you have node)
2. Verify that node is working by opening your command line and running "node console.log('node is working!')" (might be 'nodejs' for some linux users) 
3. Clone this repo to the location of your choice, and navigate to its root folder in your command line.
4. Enter the command "npm install" to install all dependencies.
5. Open 'server.js' and look at lines 10-18. Enter your database credentials, database name, and table name.
6. Enter the command "node server.js"
7. Open your browser and navigate to "localhost:3000". The count may read '0' for a moment, but will correct itself.
8. Done!

You can edit 'offset' at server.js line 53, which will be subtracted from the count. This is handy if you have a few rows you dont want counted, like for test customers. It's 0 by default.

Also, you can change 'check_interval' at server.js line 54, which will change how often it checks the database. Default is 5 seconds (5000ms)