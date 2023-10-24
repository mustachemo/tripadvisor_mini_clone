# TripAdvisor Mini Clone\n\n## Table of Contents\n1. [Introduction](#introduction)\n2. [Features](#features)\n3. [Technologies](#technologies)\n4. [Installation](#installation)\n5. [Usage](#usage)\n6. [API Endpoints](#api-endpoints)\n7. [Contributing](#contributing)\n8. [License](#license)\n\n## Introduction\nThis project is a mini-clone of the popular travel website TripAdvisor. It's built using Node.js, Express, and MongoDB, and provides a simplified version of some of the core features of TripAdvisor.\n\n## Features\n- User Authentication\n- Browse Attractions\n- Search Cities\n- Image Uploads\n- Error Handling\n\n## Technologies\n- Node.js\n- Express\n- MongoDB\n- Middleware for Error Handling, Image Uploads, and Data Formatting\n\n## Installation\n1. Clone the repository:\n   ```bash\ngit clone https://github.com/mustachemo/tripadvisor_mini_clone.git\n   ```\n2. Navigate to the project directory:\n   ```bash\ncd tripadvisor_mini_clone\n   ```\n3. Install dependencies:\n   ```bash\nnpm install\n   ```\n4. Set up your MongoDB database and update the `src/configs/db.config.js` file with your database credentials.\n\n5. Run the server:\n   ```bash\nnpm start\n   ```\n\n## Usage\nAfter running the server, you can access the application at `http://localhost:3000`.\n\n## API Endpoints\n- `GET /`: Home Page\n- `POST /login`: Login\n- `POST /signup`: Signup\n- `GET /attractions`: List of Attractions\n- `POST /attractions`: Add a New Attraction\n\n## Contributing\nIf you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.\n\n## License\nThis project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
