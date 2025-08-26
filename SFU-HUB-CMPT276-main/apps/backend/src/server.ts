import cors from 'cors';
import express, { type ErrorRequestHandler } from 'express';
import swaggerUi, { type JsonObject } from 'swagger-ui-express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as OpenApiValidator from 'express-openapi-validator';
import resourcesRoute from './routes/resourcesRoute.js';
import calendarRoute from './routes/calendarRoute.js';
import diningRoute from './routes/diningRoute.js';
import transitRoute from './routes/transitRoute.js';

// import { jwtDecode } from "jwt-decode";

if (!process.env['AUTHENTICATION']) {
    console.log('Missing AUTHENTICATION env value');
    process.exit();
}

const app = express();
const port = process.env['PORT'] ?? 3000;

app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
const openApiDocument = fs.readFileSync('./api/openapi.json', 'utf-8');
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(JSON.parse(openApiDocument) as JsonObject),
);

app.get('/openapi', (_req, res) => res.sendFile('../api/openapi.json', {
    root: dirname(fileURLToPath(import.meta.url)),
}));

app.use(
    OpenApiValidator.middleware({
        apiSpec: './api/openapi.json',
        validateRequests: true, // (default)
        validateResponses: false, // false by default
        validateSecurity: false,
    }),
);

app.use('/calendar', calendarRoute);
app.use('/resources', resourcesRoute);
app.use('/dining', diningRoute);
app.use('/transit', transitRoute);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(((err, _req, res, _next) => {
    // format error
    res.status((err.status as number) || 500).json({
        message: err.message,
        errors: err.errors,
    });
}) as ErrorRequestHandler);

app.listen(port, () => console.log(`API Magic happening on port ${port}`));
