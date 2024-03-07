# REST API Tester

REST API Tester is a simple web application for testing RESTful APIs. It allows users to make HTTP requests (GET, POST, PUT, PATCH, DELETE) to a specified endpoint and view the response.

It is inspired by [Postman](www.postman.com), but this is a simpler version.

## Features

- Make HTTP requests (GET, POST, PUT, PATCH, DELETE) to a specified endpoint.
- Customize request parameters including URL, method, request body, and content type. _(Custom headers to be added)_
- View the response including status code and response body.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/therealmudd/rest-api-tester/
   ```

2. Navigate to the project directory:

   ```bash
   cd rest-api-tester
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the server:

   ```bash
   npm start
   ```

2. Open your web browser and navigate to `http://localhost:5001` to access the application.

3. Enter the URL of the API endpoint, select the HTTP method, customize request parameters if needed, and click the "Send" button to make the request.

4. View the response including status code and response body.

## Customization

You can customize the application by modifying the HTML, CSS, and JavaScript files in the `public` directory.

## Dependencies

- Node.js
- Express.js
- Axios
- CORS

---
Happy coding!
