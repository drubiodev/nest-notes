class Router {
  constructor() {
    this.routes = {
      GET: {},
      POST: {},
      OPTIONS: {},
    };
  }

  get(path, handler) {
    this.routes.GET[path] = handler;
  }

  post(path, handler) {
    this.routes.POST[path] = handler;
  }

  options(path, handler) {
    this.routes.OPTIONS[path] = handler;
  }

  route(req, res) {
    const { method, url } = req;
    let handler;
    if (method === "OPTIONS") {
      handler = this.routes[method]["*"];
    } else {
      handler = this.routes[method][url];
    }
    if (handler) {
      handler(req, res);
    } else {
      res.writeHead(404);
      res.end("Not found");
    }
  }
}

module.exports = Router;
