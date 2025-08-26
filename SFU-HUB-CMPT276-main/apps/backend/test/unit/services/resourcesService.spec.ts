import {
    describe, expect, it, afterEach
} from 'vitest';
import resourcesService from "../../../src/services/resourcesService.js";
import sinon from "sinon";
import { prisma } from "../../../src/repositories/prisma.js";
import { components } from '../../../src/@types/openapi.js';

describe("services/resourcesService.ts", () => {
  const resourcesEvent = {
    id: '1',
    title: 'Test Event',
    description: 'Test Description',
    link: 'https://sfu.ca/',
    category: 'Test Category',
  } satisfies components["schemas"]["Resource"];

  afterEach(() => {
    sinon.restore();
  });

  describe("getResources function", () => {
    it("should get all resources", async function () {
      prisma.resources.findMany = sinon.stub().resolves([
        {
            ...resourcesEvent,
        },
      ]);

      const result = await resourcesService.getResources();

      expect(result).deep.equal([resourcesEvent]);
    });
  });
});