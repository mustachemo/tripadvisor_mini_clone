## Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is a mini-clone of the popular travel website TripAdvisor. It's built using Node.js, Express, and MongoDB, and provides a simplified version of some of the core features of TripAdvisor.

## Features

- User Authentication
- Browse Attractions
- Search Cities
- Image Uploads
- Error Handling

## Technologies

- Node.js
- Express
- MongoDB
- Middleware for Error Handling, Image Uploads, and Data Formatting

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mustachemo/tripadvisor_mini_clone.git
   ```

````
2. Install dependencies:
 ```bash
 npm install
````

3. Create a .env file in the root directory and add the following:

   ```bash

   ```

````
4. Start the server:
```bash
 npm start
````

5. Open http://localhost:3000 in your browser

## Usage

1. Create a user account
2. Browse attractions
3. Search cities
4. Upload images
5. View your profile
6. Edit your profile
7. Delete your profile
8. Logout
9. Login

## API Endpoints

GET /: Home Page
POST /login: Login
POST /signup: Signup
GET /attractions/:id: Attraction Details
PUT /attractions/:id: Edit Attraction
DELETE /attractions/:id: Delete Attraction

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[ISC](https://opensource.org/licenses/ISC)"
