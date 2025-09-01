// Import the json-server library to create a mock REST API
import jsonServer from "json-server";

// Import custom route handlers for users
import userRoutes from "./routes/user.route.mjs";
import authRoutes from "./routes/auth.route.mjs";

// Create a new JSON Server instance
const server = jsonServer.create();

// Set up default middlewares (logger, static, CORS, etc.)
// 'noCors: true' disables the default CORS headers since we handle them manually
const middlewares = jsonServer.defaults({ noCors: true });

// Define the port number for the server
const PORT = 3001;

// Apply the default middlewares to the server
server.use(middlewares);

// Enable parsing of JSON bodies in incoming requests
server.use(jsonServer.bodyParser);

// Custom middleware to set CORS headers
server.use((req, res, next) => {
    // Allow requests only from localhost:3000 (your frontend)
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");

    // Allow all headers
    res.header("Access-Control-Allow-Headers", "*");

    // Allow these HTTP methods
    res.header("Access-Control-Allow-Methods", ["GET", "POST", "PUT", "DELETE", "OPTIONS"]);

    // Call next middleware or route
    next();
});

/* ROUTES */
// Register user-related routes from the imported module
userRoutes(server);
authRoutes(server);

// Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`JSON Server is running at PORT: ${PORT}`);
});
