# Expense_Tracker_Backend

## Table of Contents

- [Project Name](#project-name)
- [Description](#description)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [API Documentation](#api-documentation)

## Description

Introducing Expense_Tracker_Backend

ExpenseTracker is a cutting-edge and user-centric expense management app designed to revolutionize the way you handle your finances. Whether you're a meticulous budgeter or someone looking to gain better control over their spending, ExpenseTracker is your go-to solution for seamless and efficient expense tracking.

## Technologies Used

List the key technologies and frameworks used in your Expense_Tracker_Backend application, such as:

- Mongodb
- Express
- nodejs
- Typescript
- Additional libraries or dependencies you've utilized (e.g. mongoose,jsonwebtoken,bcrypt etc.)

## Installation

Provide step-by-step instructions on how to install and set up your application. Include any prerequisites, such as having Node.js and specify any environment variables or configuration files that need to be set up. For example:

1. Clone the repository:

```
git clone https://github.com/Kalyankumarpokkula/Expense_Tracker_Backend.git
```

2. Navigate to the project directory:

```
cd Expense_Tracker_Backend
```

3. Create a .env file:

```
MONGODB = "https://localhost:27017"
PORT=3001
```

3. Install dependencies:

```
npm install
```

4. Start the development server:

```
npm start
```

## Usage

To efficiently manage expenses, users must first create an account to access the ExpenseTracker. If a user doesn't have an account, they can easily register and create one. Once logged in, users can seamlessly add new expenses, specifying the date, month, and year of the expense, along with details such as the name and price. This streamlined process empowers users to maintain a comprehensive record of their expenditures and gain better control over their finances.

## File Structure

Explain the structure of your project's directories and files. Provide a brief overview of each major directory and its purpose. For example:

- /src: Contains the source code of your Expense_Tracker_Backend application.
- /dist: Contains the javascript code converted from typescript

## Contributing

code enhancements, bug fixes, or new features to collectively improve the application's functionality and user experience other Developers can Contribute.

## API Documentation

Creating API documentation for an expense tracker involves detailing the endpoints, methods, request and response structures, and any authentication mechanisms. Here's a simple example for creating and signing up a user in a RESTful API:

- POST /api/vi/users/signup : This will create a new User
- /api/vi/users/signin : This will check user is exists in over database or not if exists it will create a token send to a user if not exits than it will user doesn't exists
- POST /api/v1/expense : This route will create a expense
- PATCH /api/v1/expense/{id} : This route will update expense
- DELETE /api/v1/expense/{id} : This route will delete expense
