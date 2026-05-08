# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: frontend/tests-functional/buttons.spec.ts >> Botones de Login >> botón submit tiene el tipo correcto
- Location: frontend/tests-functional/buttons.spec.ts:11:3

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/login", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Botones de Login', () => {
  4   |   test('botón submit existe y es clickeable', async ({ page }) => {
  5   |     await page.goto('/login');
  6   |     const submitBtn = page.getByRole('button', { name: /login/i });
  7   |     await expect(submitBtn).toBeVisible();
  8   |     await expect(submitBtn).toBeEnabled();
  9   |   });
  10  | 
  11  |   test('botón submit tiene el tipo correcto', async ({ page }) => {
> 12  |     await page.goto('/login');
      |                ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  13  |     const submitBtn = page.getByRole('button', { name: /login/i });
  14  |     await expect(submitBtn).toHaveAttribute('type', 'submit');
  15  |   });
  16  | });
  17  | 
  18  | test.describe('Botones de AdminUsuarios', () => {
  19  |   test('botón + Add User existe y es clickeable', async ({ page }) => {
  20  |     await page.goto('/admin/usuarios');
  21  |     const addBtn = page.getByRole('button', { name: /\+ Add User/i });
  22  |     await expect(addBtn).toBeVisible();
  23  |     await expect(addBtn).toBeEnabled();
  24  |   });
  25  | 
  26  |   test('botón Edit existe en tabla', async ({ page }) => {
  27  |     await page.goto('/admin/usuarios');
  28  |     const editBtn = page.getByRole('button', { name: /edit/i }).first();
  29  |     await expect(editBtn).toBeVisible();
  30  |   });
  31  | 
  32  |   test('botón Delete existe en tabla', async ({ page }) => {
  33  |     await page.goto('/admin/usuarios');
  34  |     const deleteBtn = page.getByRole('button', { name: /delete/i }).first();
  35  |     await expect(deleteBtn).toBeVisible();
  36  |   });
  37  | 
  38  |   test('botón Cancel en modal existe y es clickeable', async ({ page }) => {
  39  |     await page.goto('/admin/usuarios');
  40  |     await page.getByRole('button', { name: /\+ Add User/i }).click();
  41  |     const cancelBtn = page.getByRole('button', { name: /cancel/i });
  42  |     await expect(cancelBtn).toBeVisible();
  43  |     await expect(cancelBtn).toBeEnabled();
  44  |   });
  45  | 
  46  |   test('botón Create en modal existe', async ({ page }) => {
  47  |     await page.goto('/admin/usuarios');
  48  |     await page.getByRole('button', { name: /\+ Add User/i }).click();
  49  |     const createBtn = page.getByRole('button', { name: /create/i });
  50  |     await expect(createBtn).toBeVisible();
  51  |   });
  52  | });
  53  | 
  54  | test.describe('Botones de BoardPrincipal', () => {
  55  |   test('botón + New Board existe y es clickeable', async ({ page }) => {
  56  |     await page.goto('/');
  57  |     const newBoardBtn = page.getByRole('button', { name: /\+ New Board/i });
  58  |     await expect(newBoardBtn).toBeVisible();
  59  |     await expect(newBoardBtn).toBeEnabled();
  60  |   });
  61  | 
  62  |   test('botón + Add Column existe y es clickeable', async ({ page }) => {
  63  |     await page.goto('/');
  64  |     const addColumnBtn = page.getByRole('button', { name: /\+ Add Column/i });
  65  |     await expect(addColumnBtn).toBeVisible();
  66  |     await expect(addColumnBtn).toBeEnabled();
  67  |   });
  68  | 
  69  |   test('botón Create en modal New Board existe', async ({ page }) => {
  70  |     await page.goto('/');
  71  |     await page.getByRole('button', { name: /\+ New Board/i }).click();
  72  |     const createBtn = page.getByRole('button', { name: /create/i });
  73  |     await expect(createBtn).toBeVisible();
  74  |   });
  75  | 
  76  |   test('botón Cancel en modal New Board existe', async ({ page }) => {
  77  |     await page.goto('/');
  78  |     await page.getByRole('button', { name: /\+ New Board/i }).click();
  79  |     const cancelBtn = page.getByRole('button', { name: /cancel/i });
  80  |     await expect(cancelBtn).toBeVisible();
  81  |   });
  82  | });
  83  | 
  84  | test.describe('Botones de Configuracion', () => {
  85  |   test('botón Save Changes existe y es clickeable', async ({ page }) => {
  86  |     await page.goto('/configuracion');
  87  |     const saveBtn = page.getByRole('button', { name: /save changes/i });
  88  |     await expect(saveBtn).toBeVisible();
  89  |     await expect(saveBtn).toBeEnabled();
  90  |   });
  91  | 
  92  |   test('botón Update Password existe y es clickeable', async ({ page }) => {
  93  |     await page.goto('/configuracion');
  94  |     const updateBtn = page.getByRole('button', { name: /update password/i });
  95  |     await expect(updateBtn).toBeVisible();
  96  |     await expect(updateBtn).toBeEnabled();
  97  |   });
  98  | });
  99  | 
  100 | test.describe('Botones de DetalleTarjeta', () => {
  101 |   test('botón Back to Board existe y es clickeable', async ({ page }) => {
  102 |     await page.goto('/board/tarjeta/test-id');
  103 |     const backBtn = page.getByRole('button', { name: /back to board/i });
  104 |     await expect(backBtn).toBeVisible();
  105 |     await expect(backBtn).toBeEnabled();
  106 |   });
  107 | 
  108 |   test('botón Delete existe y es clickeable', async ({ page }) => {
  109 |     await page.goto('/board/tarjeta/test-id');
  110 |     const deleteBtn = page.getByRole('button', { name: /^delete$/i });
  111 |     await expect(deleteBtn).toBeVisible();
  112 |     await expect(deleteBtn).toBeEnabled();
```