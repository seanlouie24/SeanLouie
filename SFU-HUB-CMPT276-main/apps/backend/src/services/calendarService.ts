import { OperationsRequest } from '../@types/helpers';
import { type components } from '../@types/openapi';
import { prisma } from '../repositories/prisma.js';

const getEvents = async (
    filterTags: string | undefined,
    start: string | undefined,
    end: string | undefined,
): Promise<components['schemas']['Event'][]> => {
    const categoriesList = filterTags?.split(',');
    const events = await prisma.event.findMany({
        where: {
            ...(typeof categoriesList !== 'undefined'
                ? {
                    OR: categoriesList.map((category) => ({
                        tags: {
                            contains: category,
                        },
                    })),
                }
                : {}),
            AND: {
                ...(typeof start !== 'undefined' ? { start: { gte: start } } : {}),
                ...(typeof end !== 'undefined' ? { end: { lte: end } } : {}),
            },
        },
        select: {
            id: true,
            title: true,
            start: true,
            end: true,
            allDay: true,
            color: true,
            url: true,
            tags: true,
        },
    });

    return events.map(({ allDay, url, color, tags, ...event }) => ({
        ...event,
        start: event.start.toISOString(),
        end: event.end.toISOString(),
        tags: tags.split(','),
        ...(allDay != null ? { allDay: allDay } : {}),
        ...(url != null ? { url: url } : {}),
        ...(color != null ? { color: color } : {}),
    }));
};

const postEvent = async (
    event: OperationsRequest<'postEvent'>['body'],
): Promise<components['schemas']['Event']> => {
    const { tags, ...restOfEvent } = event;
    const {
        allDay,
        url,
        color,
        tags: createdTags,
        ...cratedEvent
    } = await prisma.event.create({
        data: {
            ...restOfEvent,
            tags: tags.join(','),
        },
    });

    return {
        ...cratedEvent,
        start: cratedEvent.start.toISOString(),
        end: cratedEvent.end.toISOString(),
        tags: createdTags.split(','),
        ...(allDay != null ? { allDay: allDay } : {}),
        ...(url != null ? { url: url } : {}),
        ...(color != null ? { color: color } : {}),
    };
};

export default {
    getEvents: getEvents,
    postEvent: postEvent,
};
