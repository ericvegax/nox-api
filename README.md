# Nox API
### Introduction
Nox-API is an open source Rest API, that handles all the heavy lifting a Minecraft server would typically need to do in the background.
### Project Support Features
* Chat Filtering
* Cache Basic Data (UUID, Name, Primary Rank, Last Login)
* More coming soon...
### Installation Guide
* Clone this repository
* The main branch is the most stable branch at any given time, ensure you're working from it.
* Run npm install to install all dependencies
* Setup your Redis Server/Database
* Create an .env file in your project root folder and add your variables. See .env.sample for assistance.
### Usage
* Run `npm run start` to start the application.
* Connect to the API using Postman on port 3000.
### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /api/chat/filter | filters a chat message |
| POST | /api/login | update & save player data to the redis cache |
### Technologies Used
* [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.

* [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.

* [Redis](https://redis.io/) Redis is an advanced, open-source, in-memory data structure store used as a database, cache, and message broker.

* [TypeScript](https://mongoosejs.com/) TypeScript is a statically typed superset of JavaScript, designed and maintained by Microsoft. It builds on JavaScript by adding optional static types, interfaces, and other features that enable developers to write more robust, scalable, and maintainable code.
### Authors
* [Eric Vega](https://github.com/ericvegax)
### License
This project is available for use under the MIT License.