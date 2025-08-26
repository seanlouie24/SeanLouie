import { describe, expect, it, afterEach } from 'vitest';
import calendarService from '../../../src/services/calendarService.js';
import sinon from 'sinon';
import { prisma } from '../../../src/repositories/prisma.js';
import { components } from '../../../src/@types/openapi.js';

describe('services/calendarService.ts', () => {
    const calendarEvent = {
        id: 'fd2c203d-6305-4a9e-9678-2e29b5136812',
        allDay: true,
        start: new Date('2024-10-12T23:34:55.000Z').toISOString(),
        end: new Date('2024-10-13T03:34:55.000Z').toISOString(),
        title: 'My Event',
        url: 'https://google.com',
        color: 'blue',
        tags: ['tag1', 'tag2'],
    } satisfies components['schemas']['Event'];

    afterEach(() => {
        sinon.restore();
    });

    describe('getEvents function', () => {
        it('should get all events', async function () {
            prisma.event.findMany = sinon.stub().resolves([
                {
                    ...calendarEvent,
                    start: new Date('2024-10-12T16:34:55-07:00'),
                    end: new Date('2024-10-12T20:34:55-07:00'),
                    tags: 'tag1,tag2',
                },
            ]);

            const result = await calendarService.getEvents(undefined, undefined, undefined);

            expect(result).deep.equal([calendarEvent]);
        });
    });

    describe('postEvent function', () => {
        it('should create a new event', async function () {
            prisma.event.create = sinon.stub().resolves(
                {
                    ...calendarEvent,
                    start: new Date('2024-10-12T16:34:55-07:00'),
                    end: new Date('2024-10-12T20:34:55-07:00'),
                    tags: 'tag1,tag2',
                },
            );

            const result = await calendarService.postEvent(calendarEvent);

            expect(result).deep.equal(calendarEvent);
        });
    });
});
