/* eslint-disable no-await-in-loop */
import csv from 'csv-parser';
import stripBom from 'strip-bom-stream';
import fs from 'node:fs';
import { prisma } from './repositories/prisma.js';

const stopTimes: {
    trip_id: string;
    arrival_time: string;
    departure_time: string;
    stop_id: string;
    stop_sequence: string;
    stop_headsign: string;
    pickup_type: string;
    drop_off_type: string;
    shape_dist_traveled: string;
    timepoint: string;
}[] = [];

const calendar: {
    service_id: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
    start_date: string;
    end_date: string;
}[] = [];

const stops: {
    stop_id: string;
    stop_code: string;
    stop_name: string;
    stop_desc: string;
    stop_lat: string;
    stop_lon: string;
    zone_id: string;
    stop_url: string;
    location_type: string;
    parent_station: string;
    wheelchair_boarding: string;
}[] = [];

const trips: {
    route_id: string;
    service_id: string;
    trip_id: string;
    trip_headsign: string;
    trip_short_name: string;
    direction_id: string;
    block_id: string;
    shape_id: string;
    wheelchair_accessible: string;
    bikes_allowed: string;
}[] = [];

const routes: {
    route_id: string;
    agency_id: string;
    route_short_name?: string;
    route_long_name: string;
    route_desc: string;
    route_type: string;
    route_url?: string;
    route_color?: string;
    route_text_color?: string;
}[] = [];

const directionNamesExceptions: {
    route_name: string;
    direction_id: string;
    direction_name: string;
    direction_do: string;
}[] = [];

// this data is from https://www.translink.ca/about-us/doing-business-with-translink/app-developer-resources/gtfs/gtfs-data
// place into /data in the root of this project
fs.createReadStream('data/stops.csv')
    .pipe(stripBom())
    .pipe(csv())
    .on('data', (data) => stops.push(data));

fs.createReadStream('data/calendar.csv')
    .pipe(stripBom())
    .pipe(csv())
    .on('data', (data) => calendar.push(data));

fs.createReadStream('data/routes.csv')
    .pipe(stripBom())
    .pipe(csv())
    .on('data', (data) => routes.push(data));

fs.createReadStream('data/trips.csv')
    .pipe(stripBom())
    .pipe(csv())
    .on('data', (data) => trips.push(data));

fs.createReadStream('data/direction_names_exceptions.csv')
    .pipe(stripBom())
    .pipe(csv())
    .on('data', (data) => directionNamesExceptions.push(data));

fs.createReadStream('data/stop_times.csv')
    .pipe(stripBom())
    .pipe(csv())
    .on('data', (data) => stopTimes.push(data))
    .on('end', async () => {
        console.log('Finished loading');

        // this is hacky; using the csv with a million to hope that all the other csvs have finished loading. works tho.
        const stops2 = stops.reduce(
            (accumulator, event) => {
                accumulator[event.stop_id] = event;
                return accumulator;
            },
            {} as {
                [key: string]: (typeof stops)[number];
            },
        );

        const trips2 = trips.reduce(
            (accumulator, event) => {
                accumulator[event.trip_id] = event;
                return accumulator;
            },
            {} as {
                [key: string]: (typeof trips)[number];
            },
        );

        const routes2 = routes.reduce(
            (accumulator, event) => {
                accumulator[event.route_id] = event;
                return accumulator;
            },
            {} as {
                [key: string]: (typeof routes)[number];
            },
        );

        const calendar2 = calendar.reduce(
            (accumulator, event) => {
                accumulator[event.service_id] = event;
                return accumulator;
            },
            {} as {
                [key: string]: (typeof calendar)[number];
            },
        );

        const final = stopTimes
            .map((stopTime) => {
                const timeComponents = stopTime.arrival_time.trim().split(':');

                const time = Number(timeComponents[0]) * 3600
                    + Number(timeComponents[1]) * 60
                    + Number(timeComponents[2]);
                return {
                    tripId: stopTime.trip_id,
                    time: time,
                    stopId: stopTime.stop_id,
                };
            })
            .map((entry) => ({
                ...entry,
                stopNumber: stops2[entry.stopId]!.stop_code,
                stopName: stops2[entry.stopId]!.stop_name,
            }))
            .map((entry) => ({
                ...entry,
                routeId: trips2[entry.tripId]!.route_id,
                direction: trips2[entry.tripId]!.direction_id,
                serviceId: trips2[entry.tripId]!.service_id,
            }))
            .map((entry) => ({
                ...entry,
                routeCode: routes2[entry.routeId]?.route_short_name ?? null,
                routeName: routes2[entry.routeId]!.route_long_name,
            }))
            .map((entry) => ({
                ...entry,
                destination:
                    directionNamesExceptions.find(
                        (directionName) => entry.direction === directionName.direction_id
                            && (directionName.route_name === entry.routeCode
                                || Number(directionName.route_name) === Number(entry.routeCode)),
                    )?.direction_name ?? 'Unknown',
            }))
            .map((entry) => ({
                ...entry,
                monday: calendar2[entry.serviceId]?.monday === '1',
                tuesday: calendar2[entry.serviceId]?.tuesday === '1',
                wednesday: calendar2[entry.serviceId]?.wednesday === '1',
                thursday: calendar2[entry.serviceId]?.thursday === '1',
                friday: calendar2[entry.serviceId]?.friday === '1',
                saturday: calendar2[entry.serviceId]?.saturday === '1',
                sunday: calendar2[entry.serviceId]?.sunday === '1',
            }))
            .reduce(
                (accumulator, event) => {
                    const { stopId, stopNumber, stopName, ...stopping } = event;
                    // a really good hack that saves me some time right now
                    const reallyGoodKey = `${stopId}😀${stopNumber}😀${stopName}`;
                    accumulator[reallyGoodKey] = accumulator[reallyGoodKey] ?? [];
                    accumulator[reallyGoodKey]!.push(stopping);
                    return accumulator;
                },
                {} as {
                    [key: string]: {
                        tripId: string;
                        time: number;
                        destination: string;
                        direction: string;
                        routeId: string;
                        routeCode: string | null;
                        routeName: string;
                        monday: boolean;
                        tuesday: boolean;
                        wednesday: boolean;
                        thursday: boolean;
                        friday: boolean;
                        saturday: boolean;
                        sunday: boolean;
                        serviceId: string;
                    }[];
                },
            );

        console.log('Writing to DB');

        // const promises = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const key of Object.keys(final)) {
            const [stopId, stopNumber, stopName] = key.split('😀') as string[];
            const stoppings = final[key]!;
            await prisma.bus_stops.create({
                data: {
                    stopId: stopId!,
                    stopNumber: stopNumber!,
                    stopName: stopName!,
                    stops: {
                        create: [
                            ...stoppings.map(({ time, ...trip }) => ({
                                time: time,
                                trip: {
                                    connectOrCreate: {
                                        create: trip,
                                        where: {
                                            tripId: trip.tripId,
                                        },
                                    },
                                },
                            })),
                        ],
                    },
                },
            });
        }

        // await prisma.$transaction([
        //     ...Object.entries(final).map(([key, stoppings]) => {
        //         const [stopId, stopCode, stopName] = key.split('😀') as string[];
        //         return prisma.stops.create({
        //             data: {
        //                 stopId: stopId!,
        //                 stopCode: stopCode!,
        //                 stopName: stopName!,
        //                 stoppings: {
        //                     create: [
        //                         ...stoppings.map(({ time, ...trip }) => ({
        //                             time: time,
        //                             trip: {
        //                                 connectOrCreate: {
        //                                     create: trip,
        //                                     where: {
        //                                         tripId: trip.tripId,
        //                                     },
        //                                 },
        //                             },
        //                         })),
        //                     ],
        //                 },
        //             },
        //         });
        //     }),
        // ]);

        // this overwhelms the sqlite database, could work with higher timeout maybe
        // await Promise.all(promises);

        // await fsP.writeFile('out.json', JSON.stringify(final));
    });
