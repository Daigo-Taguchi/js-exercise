import { test, expect } from "@playwright/test";

function gotoTestTarget(page) {
  return page.goto("/ch15.01-03/ex14/index.html");
}

test.describe("select box test", () => {
  test("When it selected all, display all category", async ({ page }) => {
    await gotoTestTarget(page);
    await page.selectOption("#category-select", "all");

    const foodProduct = await page.locator('[data-testid="food1"]');
    const stationeryProduct1 = await page.locator(
      '[data-testid="stationery1"]'
    );
    const stationeryProduct2 = await page.locator(
      '[data-testid="stationery2"]'
    );

    // 食品カテゴリーのみ表示されていることを確認
    await expect(foodProduct).toBeVisible();
    await expect(stationeryProduct1).toBeVisible();
    await expect(stationeryProduct2).toBeVisible();
  });

  test("When it selected food, display food category", async ({ page }) => {
    await gotoTestTarget(page);
    await page.selectOption("#category-select", "food");

    const foodProduct = await page.locator('[data-testid="food1"]');
    const stationeryProduct1 = await page.locator(
      '[data-testid="stationery1"]'
    );
    const stationeryProduct2 = await page.locator(
      '[data-testid="stationery2"]'
    );

    // 食品カテゴリーのみ表示されていることを確認
    await expect(foodProduct).toBeVisible();
    await expect(stationeryProduct1).toBeHidden();
    await expect(stationeryProduct2).toBeHidden();
  });

  test("When it selected stationery, display stationery category", async ({
    page,
  }) => {
    await gotoTestTarget(page);
    await page.selectOption("#category-select", "stationery");

    const foodProduct = await page.locator('[data-testid="food1"]');
    const stationeryProduct1 = await page.locator(
      '[data-testid="stationery1"]'
    );
    const stationeryProduct2 = await page.locator(
      '[data-testid="stationery2"]'
    );

    // 食品カテゴリーのみ表示されていることを確認
    await expect(foodProduct).toBeHidden();
    await expect(stationeryProduct1).toBeVisible();
    await expect(stationeryProduct2).toBeVisible();
  });
});
