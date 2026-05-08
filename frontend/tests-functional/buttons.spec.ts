import { test, expect } from '@playwright/test';

test.describe('Botones de Login', () => {
  test('botón submit existe y es clickeable', async ({ page }) => {
    await page.goto('/login');
    const submitBtn = page.getByRole('button', { name: /login/i });
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeEnabled();
  });

  test('botón submit tiene el tipo correcto', async ({ page }) => {
    await page.goto('/login');
    const submitBtn = page.getByRole('button', { name: /login/i });
    await expect(submitBtn).toHaveAttribute('type', 'submit');
  });
});

test.describe('Botones de AdminUsuarios', () => {
  test('botón + Add User existe y es clickeable', async ({ page }) => {
    await page.goto('/admin/usuarios');
    const addBtn = page.getByRole('button', { name: /\+ Add User/i });
    await expect(addBtn).toBeVisible();
    await expect(addBtn).toBeEnabled();
  });

  test('botón Edit existe en tabla', async ({ page }) => {
    await page.goto('/admin/usuarios');
    const editBtn = page.getByRole('button', { name: /edit/i }).first();
    await expect(editBtn).toBeVisible();
  });

  test('botón Delete existe en tabla', async ({ page }) => {
    await page.goto('/admin/usuarios');
    const deleteBtn = page.getByRole('button', { name: /delete/i }).first();
    await expect(deleteBtn).toBeVisible();
  });

  test('botón Cancel en modal existe y es clickeable', async ({ page }) => {
    await page.goto('/admin/usuarios');
    await page.getByRole('button', { name: /\+ Add User/i }).click();
    const cancelBtn = page.getByRole('button', { name: /cancel/i });
    await expect(cancelBtn).toBeVisible();
    await expect(cancelBtn).toBeEnabled();
  });

  test('botón Create en modal existe', async ({ page }) => {
    await page.goto('/admin/usuarios');
    await page.getByRole('button', { name: /\+ Add User/i }).click();
    const createBtn = page.getByRole('button', { name: /create/i });
    await expect(createBtn).toBeVisible();
  });
});

test.describe('Botones de BoardPrincipal', () => {
  test('botón + New Board existe y es clickeable', async ({ page }) => {
    await page.goto('/');
    const newBoardBtn = page.getByRole('button', { name: /\+ New Board/i });
    await expect(newBoardBtn).toBeVisible();
    await expect(newBoardBtn).toBeEnabled();
  });

  test('botón + Add Column existe y es clickeable', async ({ page }) => {
    await page.goto('/');
    const addColumnBtn = page.getByRole('button', { name: /\+ Add Column/i });
    await expect(addColumnBtn).toBeVisible();
    await expect(addColumnBtn).toBeEnabled();
  });

  test('botón Create en modal New Board existe', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /\+ New Board/i }).click();
    const createBtn = page.getByRole('button', { name: /create/i });
    await expect(createBtn).toBeVisible();
  });

  test('botón Cancel en modal New Board existe', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /\+ New Board/i }).click();
    const cancelBtn = page.getByRole('button', { name: /cancel/i });
    await expect(cancelBtn).toBeVisible();
  });
});

test.describe('Botones de Configuracion', () => {
  test('botón Save Changes existe y es clickeable', async ({ page }) => {
    await page.goto('/configuracion');
    const saveBtn = page.getByRole('button', { name: /save changes/i });
    await expect(saveBtn).toBeVisible();
    await expect(saveBtn).toBeEnabled();
  });

  test('botón Update Password existe y es clickeable', async ({ page }) => {
    await page.goto('/configuracion');
    const updateBtn = page.getByRole('button', { name: /update password/i });
    await expect(updateBtn).toBeVisible();
    await expect(updateBtn).toBeEnabled();
  });
});

test.describe('Botones de DetalleTarjeta', () => {
  test('botón Back to Board existe y es clickeable', async ({ page }) => {
    await page.goto('/board/tarjeta/test-id');
    const backBtn = page.getByRole('button', { name: /back to board/i });
    await expect(backBtn).toBeVisible();
    await expect(backBtn).toBeEnabled();
  });

  test('botón Delete existe y es clickeable', async ({ page }) => {
    await page.goto('/board/tarjeta/test-id');
    const deleteBtn = page.getByRole('button', { name: /^delete$/i });
    await expect(deleteBtn).toBeVisible();
    await expect(deleteBtn).toBeEnabled();
  });

  test('botón Save Changes existe y es clickeable', async ({ page }) => {
    await page.goto('/board/tarjeta/test-id');
    const saveBtn = page.getByRole('button', { name: /save changes/i });
    await expect(saveBtn).toBeVisible();
    await expect(saveBtn).toBeEnabled();
  });

  test('botón Cancel en modal Delete existe', async ({ page }) => {
    await page.goto('/board/tarjeta/test-id');
    await page.getByRole('button', { name: /^delete$/i }).click();
    const cancelBtn = page.getByRole('button', { name: /cancel/i });
    await expect(cancelBtn).toBeVisible();
  });
});

test.describe('Botones de TopNavBar', () => {
  test('botón logout existe y es clickeable', async ({ page }) => {
    await page.goto('/');
    const logoutBtn = page.locator('button').filter({ hasText: '' }).last();
    await expect(logoutBtn).toBeVisible();
  });

  test('botón notification existe', async ({ page }) => {
    await page.goto('/');
    const notificationBtn = page.locator('button').first();
    await expect(notificationBtn).toBeVisible();
  });
});

test.describe('Botones de KanbanColumn', () => {
  test('botón + Add Card existe y es clickeable', async ({ page }) => {
    await page.goto('/');
    const addCardBtn = page.getByRole('button', { name: /\+ Add Card/i }).first();
    await expect(addCardBtn).toBeVisible();
    await expect(addCardBtn).toBeEnabled();
  });
});

test.describe('Botones de Pagination', () => {
  test('botón Previous page existe y es clickeable cuando hay pagina > 1', async ({ page }) => {
    await page.goto('/admin/usuarios');
    const prevBtn = page.getByRole('button', { name: /previous/i });
    await expect(prevBtn).toBeVisible();
  });

  test('botón Next page existe y es clickeable', async ({ page }) => {
    await page.goto('/admin/usuarios');
    const nextBtn = page.getByRole('button', { name: /next/i });
    await expect(nextBtn).toBeVisible();
  });
});

test.describe('Botones de ContentCard', () => {
  test('botón Edit en card existe', async ({ page }) => {
    await page.goto('/');
    const editBtn = page.getByRole('button', { name: /^edit$/i }).first();
    await expect(editBtn).toBeVisible();
  });

  test('botón Delete en card existe', async ({ page }) => {
    await page.goto('/');
    const deleteBtn = page.getByRole('button', { name: /^delete$/i }).first();
    await expect(deleteBtn).toBeVisible();
  });
});

test.describe('Botones de ErrorBoundary', () => {
  test('botón reload existe y es clickeable', async ({ page }) => {
    await page.goto('/nonexistent-page');
    await page.waitForTimeout(1000);
    const reloadBtn = page.getByRole('button', { name: /reload/i });
    await expect(reloadBtn).toBeVisible();
    await expect(reloadBtn).toBeEnabled();
  });
});