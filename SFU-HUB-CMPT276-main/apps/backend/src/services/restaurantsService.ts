import { type components } from '../@types/openapi.js';
import { prisma } from '../repositories/prisma.js';

const getRestaurants = async (): Promise<components['schemas']['Restaurants'][]> => {
    const dining = await prisma.dining.findMany({
        select: {
            name: true,
            address: true,
            contact: true,
            category: true,
            description: true,
            website: true,
            hours: true,
            image: true,
            menu: true,
        },
    });

    return dining as components['schemas']['Restaurants'][];
};

export default {
    getRestaurants: getRestaurants,
};
