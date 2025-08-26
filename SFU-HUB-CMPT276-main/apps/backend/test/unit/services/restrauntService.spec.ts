import {
    describe, expect, it, afterEach
} from 'vitest';
import restaurantsService from "../../../src/services/restaurantsService.js";
import sinon from "sinon";
import { prisma } from "../../../src/repositories/prisma.js";
import { components } from '../../../src/@types/openapi.js';

describe("services/restaurantService.ts", () => {
  const Restaurants = {
    id: "484e3768-6335-4a94-8a29-ca8756e120f1",
    name: "TestName",
    image: "https://plus.unsplash.com/premium_photo-1694819488591-a43907d1c5cc?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFieSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D",
    address: "8888 University Dr W, Burnaby, BC V5A 1S6",
    category: "Univercity",
    contact: "911",
    description: "Descript description",
    website: "https://www.sfu.ca",
    hours: "9-5",
    menu: "https://www.starbucks.ca/menu"
  } satisfies components["schemas"]["Restaurants"];

  afterEach(() => {
    sinon.restore();
  });

  describe("getRestaurants function", () => {
    it("should get restaurants", async function () {
      prisma.dining.findMany = sinon.stub().resolves([
        {
          ...Restaurants,
        },
      ]);

      const result = await restaurantsService.getRestaurants();

      expect(result).deep.equal([Restaurants]);
    });
  });
});
