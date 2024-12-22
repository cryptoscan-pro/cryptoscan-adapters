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
