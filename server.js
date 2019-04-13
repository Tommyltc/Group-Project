const next = require("next");
const express = require("express");
const nextRoutes = require("next-routes");

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 8080;

const app = next({ dev: true });

app.prepare().then(() => {
    let server = express();
    server.use(function(req, res, next) {
        next();
    });

    server.get('/google832ce009b43ea227.html', (req, res) => (
        res.status(200).sendFile('google832ce009b43ea227.html', {
            root: './static/',
            headers: {
                'Content-Type': 'text/plain;charset=UTF-8',
            },
        })
    ));

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