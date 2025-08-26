import type { Response } from 'express';
import type { OperationsRequest } from '../@types/helpers';
import calendarService from '../services/calendarService.js';

const getEvents = async (req: OperationsRequest<'getEvents'>, res: Response): Promise<void> => {
    const events = await calendarService.getEvents(req.query.tags, req.query.start, req.query.end);
    res.json(events);
};

const postEvent = async (req: OperationsRequest<'postEvent'>, res: Response): Promise<void> => {
    if (
        req.headers.authorization
        !== `Basic ${Buffer.from(process.env['AUTHENTICATION']!).toString('base64')}`
    ) {
        res.status(401).json({
            code: 401,
            message: 'Unauthorized',
        });

        return;
    }

    const event = await calendarService.postEvent(req.body);
    res.json(event);
};

export default {
    getEvents: getEvents,
    postEvent: postEvent,
};
