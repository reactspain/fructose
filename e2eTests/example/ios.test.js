import io from "socket.io-client";
import showcases from "./component.showcase";
import { setup, teardown } from "./setup.native.hooks";

describe("IOS example tests", () => {
  let fructoseClient;

  beforeAll(async () => {
    fructoseClient = await setup();
  }, 18000);

  it("loads all expected components ", async () => {
    expect.assertions(showcases.children.length);

    for (let i = 0; i < showcases.children.length; i++) {
      const result = await fructoseClient.loadComponent(
        `${showcases.name}/${showcases.children[i].name}`
      );
      expect(result).toBe("component loaded");
    }
  });

  afterAll(() => {
    teardown();
  });
});
