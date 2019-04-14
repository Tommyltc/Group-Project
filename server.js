const next = require("next");
const express = require("express");
const nextRoutes = require("next-routes");
const proxy = require("http-proxy-middleware");

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 8080;

console.log(process.env.NODE_ENV);
const isDev = process.env.NODE_ENV !== "production";
const app = next({ dev:  isDev });

app.prepare().then(() => {
    let server = express();
    server.use(function(req, res, next) {
        next();
    });

    server.get('/favicon.ico', (req, res) => (
        res.status(200).sendFile('favicon.ico', {
            root: './static/',
            headers: {
                'Content-Type': 'image/x-icon',
            },
        })
    ));

    //Proxy server for Pinterest API (solve browser CORS policy issue)
    server.use(
        "/api/pinterest",
        proxy({
            target: "https://www.pinterest.com",
            changeOrigin: true,
            pathRewrite: { "^/api/pinterest": "" },
            ws: false,
        }),
    );

    server.get("*", (req, res) => {
        //URL Routing
        const routes = nextRoutes();
        routes.add("index", "/:keyword?", "index");
        const { route, query } = routes.match(req.url);

        return routes.getRequestHandler(app)(req, res);
    });

    server.listen(port, host, (e) => {
        if (e) throw e;
        console.log(`> Ready on http://${host}:${port}`);
    });
});