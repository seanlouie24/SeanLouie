import type { Response } from 'express';
import type { OperationsRequest } from '../@types/helpers';
import resourcesService from '../services/resourcesService.js';

const getResources = async (
    _req: OperationsRequest<'getResources'>,
    res: Response,
): Promise<void> => {
    // Calling the service
    const resources = await resourcesService.getResources();

    res.status(200).json(resources);
};

export default {
    getResources: getResources,
};

