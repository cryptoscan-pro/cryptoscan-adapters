# Cryptoscan Project Adapter

## Overview

The Cryptoscan Project Adapter allows developers to integrate their own data parsers and send the data to the vs.cryptoscan.pro WebSocket server. Developers can create their own projects, specify a unique "type" for their data, and provide a whitelisted IP address. The adapter will then process the data received from the developer's handler and transform it into the required format, including adding a "price" field and a unique "key" field that will be used in the Cryptoscan database.

## How to Use

1. **Create a new project**: In the `src/projects` directory, create a new directory for your project (e.g., `my-project`).

2. **Implement the handler function**: Inside the new directory, create an `index.ts` file and export a default object with the following structure:

