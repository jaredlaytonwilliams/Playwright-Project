import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://create-asana-like-pr-39y5.bolt.host/');

  // Click on the "Sign in" button
  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  
  // Click on the "Web Application Main web" button
  await page.getByRole('button', { name: 'Web Application Main web' }).click();

  // Find the To Do heading
  const todoHeading = page.getByText('To Do (2)', { exact: true });
  await expect(todoHeading).toBeVisible();

// Move up to the To Do column container
  const todoColumn = todoHeading.locator('..');

// Find the task inside the To Do column
const taskTitle = todoColumn.getByText(
  'Implement user authentication',
  { exact: true }
);

await expect(taskTitle).toBeVisible();

// Move up to the task card container
const taskCard = taskTitle.locator('..');

// Verify Feature
await expect(
  taskCard.getByText('Feature', { exact: true })
).toBeVisible();

// Verify High Priority
await expect(
  taskCard.getByText('High Priority', { exact: true })
).toBeVisible();
});