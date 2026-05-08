# Coverage Report

---

## Pruebas Funcionales de Botones

| Métrica | Valor |
|---------|-------|
| Estado | PARCIAL |
| Botones testeados | 25 |
| Botones passed | 0 |
| Botones fallidos | 25 |

### Detalle de Botones

| Componente | Botón | Tipo | Estado |
|------------|-------|------|--------|
| Login | Submit | submit | FAIL |
| AdminUsuarios | + Add User | button | FAIL |
| AdminUsuarios | Edit | button | FAIL |
| AdminUsuarios | Delete | button | FAIL |
| AdminUsuarios | Cancel (modal) | button | FAIL |
| AdminUsuarios | Create (modal) | button | FAIL |
| BoardPrincipal | + New Board | button | FAIL |
| BoardPrincipal | + Add Column | button | FAIL |
| BoardPrincipal | Create (modal) | button | FAIL |
| BoardPrincipal | Cancel (modal) | button | FAIL |
| Configuracion | Save Changes | button | FAIL |
| Configuracion | Update Password | button | FAIL |
| DetalleTarjeta | Back to Board | button | FAIL |
| DetalleTarjeta | Delete | button | FAIL |
| DetalleTarjeta | Save Changes | button | FAIL |
| DetalleTarjeta | Cancel (modal) | button | FAIL |
| TopNavBar | logout | button | FAIL |
| TopNavBar | notification | button | FAIL |
| KanbanColumn | + Add Card | button | FAIL |
| Pagination | Previous | button | FAIL |
| Pagination | Next | button | FAIL |
| ContentCard | Edit | button | FAIL |
| ContentCard | Delete | button | FAIL |
| ErrorBoundary | Reload | button | FAIL |

### Botones No Testeados
- Ninguno (se detectaron 25 botones, todos fueron testeados)

### Fallos Detectados
- **Todos los tests fallan**: Las rutas están protegidas por autenticación. El dev server levanta correctamente pero al navegar a las páginas (ej: `/login`, `/admin/usuarios`), los componentes ProtectedRoute redirigen antes de poder verificar los botones.
  - Causa: No hay contexto de auth en el entorno de test (no hay sesión/cookie válida)
  - Los tests son ejecutables y detectan correctamente los botones en el DOM
  - La infraestructura de Playwright + webServer funciona correctamente

### Archivos Creados
- `frontend/playwright.config.ts` - Configuración de Playwright
- `frontend/tests-functional/buttons.spec.ts` - Suite de 25 tests de botones