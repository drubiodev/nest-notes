class Router {
  constructor() {
    this.routes = {
      GET: [],
      POST: [],
      DELETE: [],
      OPTIONS: [],
    };
  }

  pathToRegExp(path) {
    // Check if path is empty and return a regex that matches nothing
    if (path === '') {
        return new RegExp('$.^'); // This regex matches nothing
    }
    let pattern = path.replace(/:[^\s/]+/g, '([^\\s/]+)');
    // Prepend a '.' to pattern starting with '*' to make the regex valid
    if (pattern[0] === '*') {
        pattern = '.' + pattern;
    }
    return new RegExp(`^${pattern}$`);
}

  get(path, handler) {
    const regex = this.pathToRegExp(path);
    this.routes.GET.push({ regex, handler });
  }

  post(path, handler) {
    const regex = this.pathToRegExp(path);
    this.routes.POST.push({ regex, handler });
  }

  delete(path, handler) {
    const regex = this.pathToRegExp(path);
    this.routes.DELETE.push({ regex, handler });
  }

  options(path, handler) {
    const regex = this.pathToRegExp(path);
    this.routes.OPTIONS.push({ regex, handler });
  }

  route(req, res) {
    const { method, url } = req;
    const routes = this.routes[method] || [];
    let matched = false;

    for (const { regex, handler } of routes) {
      const match = url.match(regex);
      if (match) {
        matched = true;
        const args = match.slice(1); // Extract dynamic segments
        handler(req, res, ...args); // Pass dynamic segments to handler
        break;
      }
    }

    if (!matched) {
      res.writeHead(404);
      res.end("Not found");
    }
  }
}

//   route(req, res) {
//     const { method, url } = req;
//     let handler;
//     if (method === "OPTIONS") {
//       handler = this.routes[method]["*"];
//     } else {
//       handler = this.routes[method][url];
//     }
//     if (handler) {
//       handler(req, res);
//     } else {
//       res.writeHead(404);
//       res.end("Not found");
//     }
//   }
// }

module.exports = Router;
