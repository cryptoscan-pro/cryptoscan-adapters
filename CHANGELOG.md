# [1.11.0](https://github.com/cryptoscan-pro/cryptoscan-adapters/compare/v1.10.1...v1.11.0) (2024-12-26)


### Features

* **futures-arbitrage:** implement handler function to process arbitrage data and return structured result ([9c9fc9f](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/9c9fc9fcde97f2829beaa0a2907fe1f3ec0a4152))

## [1.10.1](https://github.com/cryptoscan-pro/cryptoscan-adapters/compare/v1.10.0...v1.10.1) (2024-12-25)


### Bug Fixes

* **dex-arbitrage:** update JSON parsing to handle object format instead of array format in data.content to ensure correct data extraction ([321ce95](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/321ce951e28aa7d116e8e190afe4c41959fe4074))

# [1.10.0](https://github.com/cryptoscan-pro/cryptoscan-adapters/compare/v1.9.1...v1.10.0) (2024-12-25)


### Bug Fixes

* **dex-arbitrage:** update JSON parsing to handle array format instead of object format for correct data extraction ([a5bfc65](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/a5bfc6530091332accbca9204f47367ae4ba034c))


### Features

* **dex-arbitrage:** add dynamic exchangeFrom and exchangeTo assignment based on variant to enhance flexibility in handling exchanges ([d474897](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/d474897806c8a8cafa0b36d874b48aa224da42d3))

## [1.9.1](https://github.com/cryptoscan-pro/cryptoscan-adapters/compare/v1.9.0...v1.9.1) (2024-12-25)


### Bug Fixes

* **dex-arbitrage:** format object properties for consistency and readability in handler function return statement ([c8c8b8b](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/c8c8b8b2503dcd91c22a0b51312ef75d3df23e2d))

# [1.9.0](https://github.com/cryptoscan-pro/cryptoscan-adapters/compare/v1.8.0...v1.9.0) (2024-12-25)


### Features

* **logger.ts:** export logger instance to allow usage in other modules ([5afad73](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/5afad734cb4db7ffc1d6f1b2243e05a37579441e))

# [1.8.0](https://github.com/cryptoscan-pro/cryptoscan-adapters/compare/v1.7.0...v1.8.0) (2024-12-25)


### Features

* **cex-announcements:** add JSON parsing and validation for content in handler function to ensure data integrity ([8280c7a](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/8280c7a5f5d2842530c77b8e9143d08e4b83cbc7))

# [1.7.0](https://github.com/cryptoscan-pro/cryptoscan-adapters/compare/v1.6.0...v1.7.0) (2024-12-24)


### Features

* **cex-announcements:** enhance handler function to generate UUID and structure announcement data ([08ec589](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/08ec5893bdbef36c69b18f1f592239cf2a980cb0))

# [1.6.0](https://github.com/cryptoscan-pro/cryptoscan-adapters/compare/v1.5.0...v1.6.0) (2024-12-23)


### Features

* **news:** add tags property to handler function to include parsed tags from result for better categorization ([842e9dc](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/842e9dc9f196c43cf4679eed4f7e11edfee17280))

# [1.5.0](https://github.com/cryptoscan-pro/cryptoscan-adapters/compare/v1.4.1...v1.5.0) (2024-12-23)


### Bug Fixes

* **liquidations:** handle potential undefined properties for variant and exchange to prevent runtime errors ([c421a61](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/c421a61f5d04d4b6e5e2e8c403c7d592fd166f07))


### Features

* **liquidations:** add variant property to the handler response for better data representation ([d87e990](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/d87e990fea2350ce2c2ab52b8d6d40308eff4b23))

## [1.4.1](https://github.com/cryptoscan-pro/cryptoscan-adapters/compare/v1.4.0...v1.4.1) (2024-12-23)


### Bug Fixes

* **dca/index.ts:** rename usd property to amount for clarity in response structure ([7a7447c](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/7a7447c6f3a6db0a783cb4f241d5f6acc35c2b78))

# [1.4.0](https://github.com/cryptoscan-pro/cryptoscan-adapters/compare/v1.3.0...v1.4.0) (2024-12-23)


### Features

* Add metrics import to index.ts ([8b90903](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/8b909031a15e5759325f3880e0002aa7a33e3dfa))
* Add WebSocket message counter using incrementCounter ([37f77d2](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/37f77d250706eb1614fecc52b3572bfbb3ac96b4))

# [1.3.0](https://github.com/cryptoscan-pro/cryptoscan-adapters/compare/v1.2.0...v1.3.0) (2024-12-23)


### Features

* Modify logging format to separate port and total message metrics ([9bf6607](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/9bf66079661431fb366aa63a0f0f4fea504efdd9))

# [1.2.0](https://github.com/cryptoscan-pro/cryptoscan-adapters/compare/v1.1.0...v1.2.0) (2024-12-23)


### Features

* Add metrics tracking and logging for worker processes ([0e90b5e](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/0e90b5ee99746b66bd4bb2efc6277ed0d945dbc2))
* **package.json:** add winston and @axiomhq/winston dependencies for logging functionality ([f5e1740](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/f5e1740c40462c634e804030ada9c6a7cf480263))

# [1.1.0](https://github.com/cryptoscan-pro/cryptoscan-adapters/compare/v1.0.2...v1.1.0) (2024-12-23)


### Features

* Add cluster management with multi-port worker support ([9e02021](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/9e02021c7aeec69de30e9e6b1c17df524d2f48e5))

## [1.0.2](https://github.com/cryptoscan-pro/cryptoscan-adapters/compare/v1.0.1...v1.0.2) (2024-12-22)


### Bug Fixes

* **deploy.yml:** update GitHub token secret from GITHUB_TOKEN to GH_TOKEN for Docker login in deployment workflow ([4b575b7](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/4b575b7935d07a2d379e34c83f22de2a9e336da5))

## [1.0.1](https://github.com/cryptoscan-pro/cryptoscan-adapters/compare/v1.0.0...v1.0.1) (2024-12-22)


### Bug Fixes

* **deploy.yml:** update docker-compose commands to use repository name without owner for better compatibility with GitHub Actions ([fae5f20](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/fae5f202a13ca87017be898d32703a1c42956487))

# 1.0.0 (2024-12-22)


### Bug Fixes

* **cex-listings:** add optional chaining and default values for exchange, pairLink, and link to prevent runtime errors when properties are undefined ([bb39fd3](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/bb39fd39908a784adb52cae9a6d630deb0db749b))
* **cex-pumps/index.ts:** add nullish coalescing to handle potential undefined values for price and volume fields ([fdc29a2](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/fdc29a23c9da306d1deaf445b6f90bd9a8877ece))
* **dex-transfers:** handle potential undefined values for amount and usd by providing default values ([8800462](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/8800462df7f8b24daeca24d46aa6785df9bbab0f))
* **trending/index.ts:** ensure reference and contract fields default to empty string to prevent undefined values in response ([3e421a0](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/3e421a08135f54de14d34a3dce01b52d17ddab99))


### Features

* add documentation for cryptoscan adapter project ([e5daaab](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/e5daaab8491f173ae655474406c75e89da918d1b))
* Add documentation for Cryptoscan Project Adapter ([447e5e5](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/447e5e5da02c33231d0c010d76a03410254694dd))
* Add README.md ([82b5b6c](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/82b5b6c95fc7408e8b92bf4eac01612d268a7bda))
* **cex-api:** add type property to handler response to specify data type ([dca0388](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/dca03886392fb1f9940df9bb3be92cdfebddc480))
* **cex-arbitrage:** add format property to handler function for enhanced data handling ([2da0959](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/2da09591d9c04817033c0b9a0a8d4ecf28e57833))
* **cex-listings:** add isAddedToApi field to the response object for better tracking of API additions ([b032e24](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/b032e24f03db678ef843ff754a885391374214b0))
* **Dockerfile:** add Dockerfile for containerizing the application to streamline deployment and development processes ([b2db08a](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/b2db08a591d771ce200ae91734e3c059d15e6d85))
* **trending:** add trending module with handler for processing data content and generating a unique key ([f98cfa5](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/f98cfa5d10792a3a764e8f2916c4aa42609c0318))
* **workflows:** add GitHub Actions workflows for deployment, Docker publish, release, and Telegram notifications to automate CI/CD processes ([791eafc](https://github.com/cryptoscan-pro/cryptoscan-adapters/commit/791eafcd0f2f20484060b6220944d611c45be304))

# cryptoscan-adapters

## 1.1.0

### Minor Changes

- feat
