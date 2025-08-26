import type { Response } from 'express';
import type { OperationsRequest } from '../@types/helpers';
import diningService from '../services/restaurantsService.js';

const getRestaurants = async (
    _req: OperationsRequest<'getRestaurants'>,
    res: Response,
): Promise<void> => {
    // Calling the service
    const resources = await diningService.getRestaurants();

    res.status(200).json(resources);
};

export default {
    getRestaurants: getRestaurants,
};