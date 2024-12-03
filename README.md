# Cryptoscan Adapters

Cryptoscan Adapters allow developers to integrate their own data parsers with the Cryptoscan platform. The adapters act as a middleware, processing and validating the incoming data before forwarding it to Cryptoscan.

## Integration Process

1. **Create a new project**: Inside the `src/projects` directory, create a new directory for your project. For example, `src/projects/my-project`.

2. **Implement the adapter logic**: Within your project directory, create an `index.ts` file. This file should export an object with the following structure:

