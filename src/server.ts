import App from "./app";
const server = new App();

Promise.resolve()
  .then(() => server.initDatabase())
  .then(() => {
    server.run();
  });
