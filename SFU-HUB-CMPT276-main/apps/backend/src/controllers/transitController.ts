import type { Response } from 'express';
import type { OperationsRequest } from '../@types/helpers';
import transitService from '../services/transitService.js';

const getTransit = async (
    req: OperationsRequest<'getTransit'>,
    res: Response,
): Promise<void> => {
    const events = await transitService.getTransit(req.query.stopNumbers.split(','));
    res.json(events);
};

export default {
    getTransit: getTransit,
};
