import { type components } from '../@types/openapi';
import { prisma } from '../repositories/prisma.js';

const getResources = async (): Promise<components['schemas']['Resource'][]> => {
    const resources = await prisma.resources.findMany({
        select: {
            title: true,
            description: true,
            link: true,
            category: true,
        },
    });

    return resources as components['schemas']['Resource'][];
};

export default {
    getResources: getResources,
};

