import { test, expect } from '@playwright/test';
import testCases from '../test-data/tasks.json';

for (const testCase of testCases) {

  test(testCase.task, async ({ page }) => {

    await page.goto('https://create-asana-like-pr-39y5.bolt.host/');

    // Login
    await page.getByRole('textbox', { name: 'Username' }).fill('admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('password123');
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Navigate to project
    await page
      .getByRole('button', { name: testCase.project })
      .click();

    // Find the correct column heading
    const columnHeading = page.getByText(
      new RegExp(`^${testCase.column} \\(\\d+\\)$`)
    );

    await expect(columnHeading).toBeVisible();

    // Move up to the column container
    const column = columnHeading.locator('..');

    // Find the task inside that column
    const taskTitle = column.getByText(
      testCase.task,
      { exact: true }
    );

    await expect(taskTitle).toBeVisible();

    // Move up to the task card
    const taskCard = taskTitle.locator('..');

    // Verify every tag listed in the JSON
    for (const tag of testCase.tags) {
      await expect(
        taskCard.getByText(tag, { exact: true })
      ).toBeVisible();
    }

  });

}