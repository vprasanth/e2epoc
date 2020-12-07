const { reset } = require("./util/backend");

beforeAll(async () => {
  await reset();
  await page.goto("https://morbo.travel0.net/");
});

afterAll(async () => await reset());

describe("Travel0 App", () => {
  it('should be titled "Travel0"', async () => {
    // await jestPuppeteer.debug();
    const title = await page.title();
    expect(title).toMatch("Travel0");
  });

  it("should have Auth0 login toggle set to off", async () => {
    await expect(page).toClick("#app > div > button");
    await expect(page).toClick(
      "#app > div > div:nth-child(1) > div.sideBar > div.d-flex-1 > div:nth-child(2)"
    );
    const colour = await page.evaluate(() => {
      const auth0LoginSlider =
        "#app > div > div:nth-child(1) > div.sideBar > div.d-flex-1 > div > div:nth-child(2) > div.col-2 > label > span";
      return window.getComputedStyle(document.querySelector(auth0LoginSlider))
        .backgroundColor;
    });

    // close settings panel
    await expect(page).toClick(
      "#app > div > div:nth-child(1) > div.sideBar > button"
    );
    expect(colour).toMatch("rgba(0, 0, 0, 0)");
  });

  it("should be using stock login", async () => {
    // click stock login link
    await page.waitForTimeout(1000);
    await page.click("#nav-right-items > ul > a:nth-child(1)").then(() => {
      expect(page.url()).toMatch(/travel0\.net\/login/);
    });
  });

  it("should enable Auth0 login", async () => {
    await page.goto("https://morbo.travel0.net/");
    // open feature toggle panel
    await expect(page).toClick("#app > div > button");
    await expect(page).toClick(
      "#app > div > div:nth-child(1) > div.sideBar > div.d-flex-1 > div:nth-child(2)"
    );

    // toggle Auth0 Login
    await expect(page).toClick(
      "#app > div > div:nth-child(1) > div.sideBar > div.d-flex-1 > div > div:nth-child(2) > div.col-2 > label > span"
    );

    await page.waitForTimeout(2000);

    const colour = await page.evaluate(() => {
      // document.querySelector("#app > div > div:nth-child(1) > div.sideBar > div.d-flex-1 > div > div:nth-child(2) > div.col-2 > label > span").click()
      const auth0LoginSlider =
        "#app > div > div:nth-child(1) > div.sideBar > div.d-flex-1 > div > div:nth-child(2) > div.col-2 > label > span";
      return window.getComputedStyle(document.querySelector(auth0LoginSlider))
        .backgroundColor;
    });

    // close feature toggle panel
    await expect(page)
      .toClick("#app > div > div:nth-child(1) > div.sideBar > button")
      .then(() => {
        expect(colour).toMatch("rgb(3, 192, 123)");
      });
  });

  it("should load Auth0 universal login", async () => {
    await expect(page).toClick(
      "#nav-right-items > ul > button.login-button.no-session.btn.btn-outline-secondary"
    );
    await page.waitForNavigation();
    await page.waitForTimeout(3000);
    await page.$(".auth0-lock-container");
  });
});
