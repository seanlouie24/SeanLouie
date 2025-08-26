import { describe, expect, it, afterEach } from 'vitest';
import transitService from '../../../src/services/transitService.js';
import sinon from 'sinon';
import { prisma } from '../../../src/repositories/prisma.js';
import { components } from '../../../src/@types/openapi.js';
import { msToSeconds } from '../../../src/util/constants.js';

describe('services/transitService.ts', () => {
    const midnight = new Date();
    midnight.setHours(0, 0, 0); // set to the start of the day
    const date = new Date(midnight)
    date.setSeconds(75066);
    const transitStop = {
        stopNumber: '52806',
        stopName: 'SFU Transportation Centre @ Bay 2',
        stops: [
            {
                destination: 'SFU',
                routeName: 'Burquitlam Station/SFU',
                routeCode: '143',
                time: msToSeconds(date.getTime()),
            },
        ].filter((item2) => item2.time >= msToSeconds(Date.now())),
    } satisfies components['schemas']['TransitStop'];

    afterEach(() => {
        sinon.restore();
    });

    describe('getTransit function', () => {
        it('should get transit information for stop 52806', async function () {
            prisma.bus_stops.findMany = sinon.stub().resolves([
                {
                    stopNumber: '52806',
                    stopName: 'SFU Transportation Centre @ Bay 2',
                    stops: [
                        {
                            time: 75066,
                            trip: {
                                tripId: '14018867',
                                destination: 'SFU',
                                routeCode: '143',
                                routeName: 'Burquitlam Station/SFU',
                                serviceId: '1',
                                monday: true,
                                tuesday: true,
                                wednesday: true,
                                thursday: true,
                                friday: true,
                                saturday: true,
                                sunday: true,
                            },
                        },
                    ],
                },
            ]);

            const result = await transitService.getTransit(['59314']);

            expect(result).deep.equal([transitStop]);
            expect(result.length).toBeGreaterThanOrEqual(1);
            // expect(result[0].stops.length).toBeGreaterThan(0);
        });
    });
});
