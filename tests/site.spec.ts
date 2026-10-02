import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("conteúdo, imagens, contato e layout", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle("FCar Garage | Estética automotiva em Santo André");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveAccessibleName("FGcar Garage");
  await expect(page.locator(".hero-car img")).toHaveAttribute("src", /hero-car-v2\.webp/);
  await expect(page.locator(".service-item")).toHaveCount(5);
  const contact = page.getByRole("link", { name: /Conversar no Instagram/ });
  await expect(contact).toHaveAttribute("href", "https://www.instagram.com/fcargarage_/");
  await expect(contact).toHaveAttribute("rel", "noopener noreferrer");
  await expect(page.locator("body")).not.toContainText(/[—–]/);
  await expect(page.locator("body")).not.toContainText(" - ");
  await expect(page.locator(".red-line")).toHaveCount(0);
  await page.locator(".service-photo").scrollIntoViewIfNeeded();
  await page.locator("#avaliacoes").scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator("main img").evaluateAll((images) => images.every((image) => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
  for (const width of testInfo.project.name === "mobile" ? [320, 390, 600] : [768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  expect(errors).toEqual([]);
  await page.setViewportSize(testInfo.project.use.viewport!);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(700);
  await page.screenshot({ path: `test-results/hero-${testInfo.project.name}.png` });
  await page.screenshot({ path: `test-results/${testInfo.project.name}.png`, fullPage: true });
});

test("serviços expandem e recolhem pelo teclado", async ({ page }) => {
  await page.goto("/");
  const item = page.locator("#vitrificacao");
  await item.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(item).toHaveAttribute("open", "");
  await expect(item.locator("summary")).toBeFocused();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(item.locator(".service-detail")).toBeVisible();
  await page.waitForTimeout(350);
  await expect.poll(() => item.locator(".service-detail").evaluate((element) => element.style.height)).toBe("");
  await page.keyboard.press("Enter");
  await expect(item).not.toHaveAttribute("open", "");
});

test("um segundo comando durante a expansão também recolhe o serviço", async ({ page }) => {
  await page.goto("/");
  const item = page.locator("#ppf");
  await item.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(item).toHaveAttribute("open", "");
  await page.keyboard.press("Enter");
  await expect(item).not.toHaveAttribute("open", "");
});

test("imagem do sobre permanece fixa ao selecionar serviços e cards", async ({ page }, testInfo) => {
  await page.goto("/");
  const image = page.locator("#about-photo img");
  await image.scrollIntoViewIfNeeded();
  await expect(page.getByRole("heading", { name: "Sobre nós" })).toBeVisible();
  await expect(image).toHaveAttribute("src", /about-fgcar\.jpg/);
  await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  const originalSource = await image.getAttribute("src");
  for (const id of ["vitrificacao", "ppf", "polimento", "insulfilm", "antivandalismo"]) {
    const summary = page.locator(`#${id} summary`);
    await summary.click();
    await expect(page.locator(`#${id}`)).toHaveAttribute("open", "");
    await expect(image).toHaveAttribute("src", originalSource!);
    await summary.click();
  }
  for (const card of [
    { title: "Recuperar o acabamento", id: "polimento" },
    { title: "Proteger a pintura", id: "ppf" },
    { title: "Cuidar dos vidros", id: "insulfilm" },
  ]) {
    await page.locator(".care-item").filter({ has: page.getByRole("heading", { name: card.title }) }).locator(".care-action").click();
    await expect(page.locator(`#${card.id} summary`)).toBeFocused();
    await expect(image).toHaveAttribute("src", originalSource!);
  }
  await page.getByRole("link", { name: "Conhecer a vitrificação" }).click();
  await expect(page.locator("#vitrificacao summary")).toBeFocused();
  await expect(image).toHaveAttribute("src", originalSource!);
  await page.locator("#cuidados").screenshot({ path: `test-results/care-${testInfo.project.name}.png` });
  await page.locator(".services-layout").screenshot({ path: `test-results/about-${testInfo.project.name}.png` });
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(results.violations).toEqual([]);
});

test("menu mobile contém foco, fecha com Escape e navega", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Abrir menu" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("button", { name: "Fechar menu" })).toBeFocused();
  for (let i = 0; i < 7; i++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole("link", { name: "Contato", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page.locator("#contato")).toBeFocused();
  await expect(page).toHaveURL(/#contato$/);
});

test("acessibilidade da página e menu", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.waitForTimeout(700);
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(results.violations).toEqual([]);
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await page.waitForTimeout(300);
    expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze()).violations).toEqual([]);
  }
});

test("movimento reduzido remove transformações", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator("#servicos").scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator(".photo-parallax, .photo-entrance, .hero-copy h1").evaluateAll((elements) => elements.every((element) => getComputedStyle(element).transform === "none"))).toBe(true);
  await expect.poll(() => page.locator(".draw-line-readable").evaluateAll((elements) => elements.every((element) => getComputedStyle(element).opacity === "1"))).toBe(true);
  await expect(page.locator(".draw-line-svg").first()).not.toBeVisible();
});

test("avaliações têm atribuição e a abertura FGcar termina sem bloquear o site", async ({ page }, testInfo) => {
  await page.addInitScript(() => {
    const state = window as unknown as Window & { introStates: string[] };
    state.introStates = [];
    new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        const element = mutation.target as HTMLElement;
        if (element.classList.contains("brand-intro")) state.introStates.push(element.getAttribute("data-playing") ?? "");
      }
    }).observe(document, { subtree: true, attributes: true, attributeFilter: ["data-playing"] });
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect.poll(() => page.evaluate(() => (window as unknown as Window & { introStates: string[] }).introStates)).toContain("true");
  await page.waitForTimeout(180);
  await page.screenshot({ path: `test-results/intro-${testInfo.project.name}.png` });
  await expect(page.locator("h1")).toHaveAccessibleName("FGcar Garage");
  const intro = page.locator(".brand-intro");
  await expect(intro).toHaveAttribute("aria-hidden", "true");
  await expect(intro.locator(".draw-line-readable")).toHaveText("FGcar");
  await expect(intro).toHaveCSS("pointer-events", "none");
  await expect(intro).toHaveAttribute("data-playing", "false");
  await expect(intro).not.toBeVisible();
  await expect.poll(() => page.locator(".draw-line-readable").evaluateAll((elements) => elements.every((element) => getComputedStyle(element).opacity === "1"))).toBe(true);
  await expect.poll(() => page.locator(".draw-line-svg").evaluateAll((elements) => elements.every((element) => getComputedStyle(element).opacity === "0"))).toBe(true);
  await page.locator("#avaliacoes").scrollIntoViewIfNeeded();
  await expect(page.locator("#avaliacoes blockquote")).toHaveCount(4);
  await expect(page.locator("#avaliacoes")).toContainText("FG Car Mecânica de Autos");
  await expect(page.locator("#avaliacoes")).toContainText("Marcos Cressoni");
  await expect(page.locator("#avaliacoes")).toContainText("Rodrigo Maita Ferreira");
  const avatars = page.locator("#avaliacoes .reviewer-photo");
  await expect(avatars).toHaveCount(2);
  await expect.poll(() => avatars.evaluateAll((images) => images.every((image) => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
  await expect(page.getByRole("link", { name: /^Marcos Cressoni/ })).toHaveAttribute("href", "https://www.google.com/maps/contrib/101690924004061913236/reviews?hl=pt-BR");
  await expect(page.getByRole("link", { name: /^Rodrigo Maita Ferreira/ })).toHaveAttribute("href", "https://www.google.com/maps/contrib/112051118361121209335/reviews?hl=pt-BR");
  await expect(page.locator("#avaliacoes")).toContainText("Já fez alguns serviços no meu Passat CC e todos ficaram ótimos");
  await expect(page.locator("#avaliacoes")).not.toContainText("SolaceUI");
  const maps = page.getByRole("link", { name: /Ver no Google/ });
  await expect(maps).toHaveAttribute("href", /https:\/\/www\.google\.com\/maps\/place\/FG\+Car\+/);
});

test("conteúdo e serviços funcionam sem JavaScript", async ({ browser }, testInfo) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: testInfo.project.use.viewport });
  const page = await context.newPage();
  await page.goto(testInfo.project.use.baseURL!);
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator(".brand-intro")).not.toBeVisible();
  await expect(page.locator("h1")).toHaveAccessibleName("FGcar Garage");
  await page.locator("#ppf summary").click();
  await expect(page.locator("#ppf .service-detail")).toBeVisible();
  if (testInfo.project.name === "mobile") await expect(page.getByRole("navigation", { name: "Navegação mobile" })).toBeVisible();
  await context.close();
});
