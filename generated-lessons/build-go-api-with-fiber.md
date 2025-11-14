# Build a Go API with Fiber

## Student Learning Target

I can build a Go API with Fiber

## Why This Matters for Your Contribution

The capability to build a Go API with Fiber is critical for contributing to blockchain development projects. This technical knowledge enables you to build fast, lightweight backend services for blockchain applications, data indexers, oracle services, and integration APIs that connect on-chain and off-chain systems.

## Technical Overview

Fiber is an Express-inspired web framework built on top of Fasthttp, the fastest HTTP engine for Go. It's designed for ease of use with zero memory allocation and high performance, making it ideal for building APIs that need to handle high throughput—a common requirement in blockchain infrastructure.

In this lesson, you'll build a weather API that demonstrates core Fiber concepts you'll use when building blockchain-related services.

### Key Concepts

1. **Routing**: Define URL patterns and HTTP methods (GET, POST, etc.) that your API responds to
2. **Handlers**: Functions that process requests and return responses, containing your business logic
3. **Middleware**: Reusable functions that run before/after handlers for logging, authentication, validation, etc.

## Implementation Guide

### Code Example

First, set up your Go module and install Fiber:

```bash
mkdir weather-api && cd weather-api
go mod init weather-api
go get github.com/gofiber/fiber/v2
```

Now create `main.go` with a complete weather API:

```go
package main

import (
    "log"
    "time"

    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/logger"
    "github.com/gofiber/fiber/v2/middleware/cors"
)

// Weather represents weather data for a location
type Weather struct {
    Location    string  `json:"location"`
    Temperature float64 `json:"temperature"`
    Condition   string  `json:"condition"`
    Humidity    int     `json:"humidity"`
    Timestamp   string  `json:"timestamp"`
}

// In-memory storage (in production, use a database)
var weatherData = map[string]Weather{
    "london": {
        Location:    "London",
        Temperature: 15.5,
        Condition:   "Cloudy",
        Humidity:    75,
        Timestamp:   time.Now().Format(time.RFC3339),
    },
    "tokyo": {
        Location:    "Tokyo",
        Temperature: 22.0,
        Condition:   "Sunny",
        Humidity:    60,
        Timestamp:   time.Now().Format(time.RFC3339),
    },
}

func main() {
    // Create a new Fiber instance
    app := fiber.New(fiber.Config{
        AppName: "Weather API v1.0",
    })

    // Middleware - runs on every request
    app.Use(logger.New())  // Logs all requests
    app.Use(cors.New())    // Enables CORS

    // Routes
    app.Get("/", getRoot)
    app.Get("/health", getHealth)
    app.Get("/weather/:city", getWeather)
    app.Post("/weather", createWeather)

    // Start server
    log.Fatal(app.Listen(":3000"))
}

// Handler: Root endpoint
func getRoot(c *fiber.Ctx) error {
    return c.JSON(fiber.Map{
        "message": "Weather API",
        "version": "1.0",
        "endpoints": []string{
            "GET /health",
            "GET /weather/:city",
            "POST /weather",
        },
    })
}

// Handler: Health check
func getHealth(c *fiber.Ctx) error {
    return c.JSON(fiber.Map{
        "status": "healthy",
        "timestamp": time.Now().Format(time.RFC3339),
    })
}

// Handler: Get weather by city
func getWeather(c *fiber.Ctx) error {
    city := c.Params("city")

    // Look up weather data
    weather, exists := weatherData[city]
    if !exists {
        return c.Status(404).JSON(fiber.Map{
            "error": "City not found",
        })
    }

    return c.JSON(weather)
}

// Handler: Add new weather data
func createWeather(c *fiber.Ctx) error {
    weather := new(Weather)

    // Parse JSON body
    if err := c.BodyParser(weather); err != nil {
        return c.Status(400).JSON(fiber.Map{
            "error": "Invalid JSON",
        })
    }

    // Validate required fields
    if weather.Location == "" {
        return c.Status(400).JSON(fiber.Map{
            "error": "Location is required",
        })
    }

    // Add timestamp
    weather.Timestamp = time.Now().Format(time.RFC3339)

    // Store weather data (use lowercase for lookup)
    weatherData[weather.Location] = *weather

    return c.Status(201).JSON(weather)
}
```

Run the server:
```bash
go run main.go
```

Test it with curl:
```bash
# Get root info
curl http://localhost:3000/

# Get weather for London
curl http://localhost:3000/weather/london

# Add new weather data
curl -X POST http://localhost:3000/weather \
  -H "Content-Type: application/json" \
  -d '{"location":"paris","temperature":18.5,"condition":"Rainy","humidity":85}'
```

### Understanding the Implementation

1. **Fiber App Initialization**: `fiber.New()` creates the app instance with configuration options. This is similar to initializing a blockchain node client in many projects.

2. **Middleware Stack**: Middleware functions run before your handlers. Logger tracks requests, CORS enables cross-origin requests. In blockchain APIs, you'd add authentication middleware here to verify signatures or API keys.

3. **Route Definition**: `app.Get()` and `app.Post()` define endpoints. The `:city` syntax creates a dynamic route parameter, similar to how you'd query blockchain data by address or transaction ID.

4. **Handler Functions**: Each handler receives a `*fiber.Ctx` (context) containing request data and methods to send responses. Handlers parse inputs, execute logic, and return JSON—the same pattern you'll use for blockchain query endpoints.

5. **Error Handling**: Returning appropriate status codes (404, 400, 201) and error messages is critical for API usability. Blockchain APIs need clear errors for invalid addresses, insufficient balances, etc.

### Integration Points

When contributing to projects, you'll integrate this capability with:

- **Blockchain Nodes**: Your Fiber API will query blockchain nodes and format responses for frontend clients
- **Databases**: Store indexed blockchain data, user accounts, or off-chain metadata that complements on-chain data
- **External Services**: Connect to oracles, price feeds, IPFS gateways, or other APIs to enrich blockchain data

## Real-World Application

### Use Case 1: Blockchain Transaction Status API
Build an API that lets users check transaction status without connecting directly to the blockchain node.

**Implementation:**
```go
// Add a handler for transaction lookup
app.Get("/tx/:hash", getTransaction)

func getTransaction(c *fiber.Ctx) error {
    txHash := c.Params("hash")

    // Query blockchain node (pseudo-code)
    tx, err := blockchainClient.GetTransaction(txHash)
    if err != nil {
        return c.Status(404).JSON(fiber.Map{
            "error": "Transaction not found",
        })
    }

    return c.JSON(fiber.Map{
        "hash": tx.Hash,
        "status": tx.Status,
        "confirmations": tx.Confirmations,
        "block": tx.BlockNumber,
    })
}
```

### Use Case 2: NFT Metadata Indexer API
Create an API that serves indexed NFT metadata faster than querying the blockchain directly.

**Implementation:**
```go
// Handler to get NFT metadata from indexed database
app.Get("/nft/:collection/:tokenId", getNFTMetadata)

func getNFTMetadata(c *fiber.Ctx) error {
    collection := c.Params("collection")
    tokenId := c.Params("tokenId")

    // Query indexed database
    metadata, err := db.GetNFTMetadata(collection, tokenId)
    if err != nil {
        return c.Status(404).JSON(fiber.Map{
            "error": "NFT not found",
        })
    }

    return c.JSON(metadata)
}
```

## Best Practices

When you're contributing to projects, follow these practices:

1. **Structure Your Code**: Organize handlers into separate files/packages as your API grows. For blockchain projects, separate handlers by domain (transactions, accounts, tokens, etc.) to keep code maintainable.

2. **Use Middleware for Cross-Cutting Concerns**: Implement authentication, rate limiting, and request validation as middleware. Blockchain APIs especially need rate limiting to prevent node query abuse and authentication to protect write operations.

3. **Return Proper HTTP Status Codes**: Use 200 for success, 201 for creation, 400 for bad requests, 404 for not found, 500 for server errors. Clear status codes make your API easier to integrate with frontends and other services.

4. **Validate Input Early**: Check request parameters and body data before executing expensive operations like blockchain queries or database lookups. This prevents wasted resources and improves error messages.

5. **Handle Errors Gracefully**: Always handle errors from external services (blockchain nodes, databases). Network issues and node downtime are common in blockchain infrastructure—your API should degrade gracefully.

## Common Patterns and Pitfalls

### ✅ Do This
Structure handlers to validate input, execute logic, and handle errors:

```go
func getWeather(c *fiber.Ctx) error {
    // 1. Get and validate input
    city := c.Params("city")
    if city == "" {
        return c.Status(400).JSON(fiber.Map{
            "error": "City parameter required",
        })
    }

    // 2. Execute logic
    weather, exists := weatherData[city]
    if !exists {
        return c.Status(404).JSON(fiber.Map{
            "error": "City not found",
        })
    }

    // 3. Return success response
    return c.JSON(weather)
}
```

Use environment variables for configuration:
```go
port := os.Getenv("PORT")
if port == "" {
    port = "3000"
}
app.Listen(":" + port)
```

### ❌ Avoid This
Don't ignore errors or return unclear messages:

```go
// Bad: Silent failure
func getWeather(c *fiber.Ctx) error {
    city := c.Params("city")
    weather, _ := weatherData[city]  // Ignores "exists" check
    return c.JSON(weather)  // Returns empty data if not found
}
```

Don't hard-code configuration:
```go
// Bad: Hard-coded values
app.Listen(":3000")  // Should use env variable
dbConnection := "localhost:5432"  // Should use env variable
```

Don't put all logic in handlers:
```go
// Bad: Business logic in handler
func getWeather(c *fiber.Ctx) error {
    // 50 lines of complex logic here...
    // Better: Extract to service layer
}
```

## Testing Your Implementation

Validate your capability by:

1. **Manual Testing with curl**: Start your server and test each endpoint with curl commands. Verify correct responses for valid requests and proper error handling for invalid ones.

```bash
# Test GET endpoint
curl -v http://localhost:3000/weather/london

# Test POST endpoint
curl -X POST http://localhost:3000/weather \
  -H "Content-Type: application/json" \
  -d '{"location":"berlin","temperature":12.0,"condition":"Cloudy","humidity":70}'

# Test error handling
curl -v http://localhost:3000/weather/nonexistent
```

2. **Unit Testing Handlers**: Write Go tests for your handler functions to verify logic independently:

```go
// main_test.go
package main

import (
    "io"
    "net/http/httptest"
    "testing"

    "github.com/gofiber/fiber/v2"
    "github.com/stretchr/testify/assert"
)

func TestGetWeather(t *testing.T) {
    app := fiber.New()
    app.Get("/weather/:city", getWeather)

    req := httptest.NewRequest("GET", "/weather/london", nil)
    resp, _ := app.Test(req)

    assert.Equal(t, 200, resp.StatusCode)

    body, _ := io.ReadAll(resp.Body)
    assert.Contains(t, string(body), "London")
}

func TestGetWeatherNotFound(t *testing.T) {
    app := fiber.New()
    app.Get("/weather/:city", getWeather)

    req := httptest.NewRequest("GET", "/weather/atlantis", nil)
    resp, _ := app.Test(req)

    assert.Equal(t, 404, resp.StatusCode)
}
```

3. **Integration Testing**: Run the full server in a test environment and verify it handles realistic workloads. For blockchain APIs, test with actual node connections and database queries to catch integration issues early.

## Troubleshooting

**Issue**: `panic: listen tcp :3000: bind: address already in use`
**Cause**: Another process is using port 3000, or your server is already running
**Solution**: Find and kill the process using the port, or change to a different port:
```bash
# Find process using port 3000
lsof -i :3000

# Kill it
kill -9 <PID>

# Or use a different port
app.Listen(":3001")
```

**Issue**: `404 Not Found` for valid city names
**Cause**: Case sensitivity in the lookup. The map uses lowercase keys but request might use uppercase
**Solution**: Normalize the city parameter:
```go
city := strings.ToLower(c.Params("city"))
```

**Issue**: API returns empty JSON `{}` instead of error message
**Cause**: Not checking if data exists before returning, or not setting proper status codes
**Solution**: Always validate data existence and return appropriate errors:
```go
if !exists {
    return c.Status(404).JSON(fiber.Map{
        "error": "Resource not found",
    })
}
```

**Issue**: Changes to code not reflected when running `go run main.go`
**Cause**: Go caching compiled binaries, or running old binary instead of source
**Solution**: Force rebuild or run with `-a` flag:
```bash
go clean
go run main.go
```

## Additional Resources

- [Fiber Documentation](https://docs.gofiber.io/) - Official docs with comprehensive guides and API reference
- [Fiber GitHub Repository](https://github.com/gofiber/fiber) - Source code, examples, and community discussions
- [Fiber Recipes](https://github.com/gofiber/recipes) - Example implementations for common use cases (auth, databases, etc.)
- [Fasthttp Documentation](https://github.com/valyala/fasthttp) - Understanding the underlying HTTP engine
- [Go by Example](https://gobyexample.com/) - Learn Go fundamentals if you're new to the language
- [Testing in Go](https://go.dev/doc/tutorial/add-a-test) - Official guide to writing Go tests

## Practice Exercise

Demonstrate this capability by:

1. **Build the Weather API**: Implement the complete weather API from this lesson. Add at least 3 cities to the initial data and verify all endpoints work with curl.

2. **Add Authentication Middleware**: Create middleware that checks for an API key in the request header:
```go
func authMiddleware(c *fiber.Ctx) error {
    apiKey := c.Get("X-API-Key")
    if apiKey != "your-secret-key" {
        return c.Status(401).JSON(fiber.Map{
            "error": "Unauthorized",
        })
    }
    return c.Next()
}

// Apply to specific routes
app.Post("/weather", authMiddleware, createWeather)
```

3. **Extend with Query Parameters**: Add query parameter support to filter weather by temperature range:
```go
// GET /weather?min_temp=15&max_temp=25
app.Get("/weather", filterWeather)

func filterWeather(c *fiber.Ctx) error {
    minTemp := c.Query("min_temp")
    maxTemp := c.Query("max_temp")

    // Parse and filter weatherData based on temperature range
    // Return matching cities
}
```

## What You've Built

You now have the technical capability to build a Go API with Fiber. This expertise is essential for contributing to blockchain development projects that require:

- **Backend APIs** for blockchain applications (wallets, explorers, indexers)
- **Integration services** that connect blockchain nodes to web/mobile frontends
- **Data indexing services** that make blockchain data easily queryable
- **Oracle services** that bridge on-chain and off-chain data sources
- **Transaction monitoring** systems that track and notify on blockchain events

The patterns you've learned—routing, handlers, middleware, error handling—directly transfer to building production blockchain infrastructure.

## Next Steps

- Implement this in a test environment
- Review the Module Assignment to see how you'll prove this capability
- Explore how this integrates with other technical capabilities in this Module

---


*Generated with Andamio Lesson Coach*
