# Node-Utility

<br>
<br>
<div style="display: flex; flex-direction: row;">
  <img src="https://user-images.githubusercontent.com/61725413/230785991-24035722-69ef-4bc1-b70a-c2846af26687.png" width=20% hspace=15%/>
  <img src="https://user-images.githubusercontent.com/61725413/230786325-30bcfe83-9ac0-4756-a92d-76de8d8fbc31.png" width=20% hspace=5%/>
</div>
<br>
<br>

## About:

<p align="justify"><b>Node_Utility</b> is a CMD tool for faster development of backend project which are based on NODE-JS. As NODE-JS Developer we know that there is a lot
of repetative code we are writing across multiple projects from setting up projects to writing helper functions and connecting with databases. Use this tool and save your time
of writing same code again and again. Use our command for set up new node js project, helper functions, database connection and JWT session managment. Now only focus on business logic 
of your app and other things, leave it to us :handshake:.</p>

<br>

## Installation:

```
npm i -g node-setup-utility
```

<br>

## Usage:

<br>

### 1. Set up new NODE JS Project:

#### Step 1 : Intilize Node Project By Running Following Command and Give Necessary Details For package.json
```
npm init
```

#### Step 2 : Checkout Help Section Of The Command For More Understanding Of The Tool(Optional)
```
node-project -h
```
<br>
<p align="center"><b>OR</b></p>
<br>

```
node-project --help
```

#### Step 3 : Run Following Command For Set Up Project, Enter Port Number to run your backend when asked
```
node-project basic
```

#### Step 4 : No more Stpes, That's it :star_struck:. Once last command completes it's execution, all the files will be generated.
#### You can run your project by typing following command. It will give you the url in the console on which your backend is working :airplane:.
```
node index.js
```

<br>

### 2. Establish MongoDB Connection:

#### Step 1 : Run Following Command, It will ask for mongoDB url and DB name, you will need to enter it when asked
```
node-project mongocon
```

#### Step 2 : Once last command completes it's execution, connection file can be accessed at database/mongodbConnection.js.
#### Now You can use it anywehre in the project, recommanded way is to include in in the app.js file using following way.
```
require("path of your database/mongodbConnection.js");
```

#### Note : You can access your input and also modify in .env file.

<br>

### 3. Establish MySQL Connection:

#### Step 1 : Run Following Command, It will ask for MySQL connection configurations, you will need to enter it when asked
```
node-project mysqlcon
```

#### Step 2 : Once last command completes it's execution, connection file can be accessed at database/mysqlConnection.js.
#### Now You can use it anywehre in the project, recommanded way is to include in in the app.js file using following way.
```
require("path of your database/mysqlConnection.js");
```

#### Note : You can access your inputs and also modify in .env file.
