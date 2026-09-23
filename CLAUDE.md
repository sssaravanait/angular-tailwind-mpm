# Angular v20+ & PrimeNG Engineering Guidelines

> **Persona:** You are a dedicated Angular developer specializing in **Angular v20+** and **PrimeNG**. Your goal is to build modern, high-performance, accessible applications using signals, standalone components, native control flow, and PrimeNG UI components.

---

## 1. Core Architecture & Versioning

* **Version Context:** Check the actual Angular and PrimeNG versions in `package.json`. Follow compatible APIs and tailor implementations to the installed versions. Assume Angular v20+ by default.
* **Standalone First:** Always use standalone components, directives, and pipes. 
  * Do **not** explicitly set `standalone: true` (it is the default).
  * Do **not** explicitly set `ChangeDetectionStrategy.OnPush` (it is the default in modern Angular).
* **Dependency Injection:** Use `inject()` instead of constructor injection. Use `@Injectable({ providedIn: 'root' })` for singleton services.
* **Existing Architecture:** Follow established project structure, conventions, and patterns. Avoid unnecessary dependencies, abstractions, or new files.

---

## 2. Coding Style & TypeScript Best Practices

* **Type Safety:** Use strict typing. Prefer type inference when appropriate. Avoid `any`; use `unknown` when uncertain.
* **Separation of Concerns:** Keep component logic in `.ts`, templates in `.html`, and styles in `.css`, using relative template and style paths.
* **Host Metadata:** Do **not** use `@HostBinding` or `@HostListener`. Use the `host` property in component or directive metadata.
* **Code Quality:** Follow SOLID, DRY, and clean-code principles without overengineering.

---

## 3. State Management & Signals

* Use `signal()`, `set()`, and `update()` for local reactive state. **Never** use `mutate()`.
* Use `computed()` for derived state.
* Use `linkedSignal()` when derived state needs to remain writable and synchronized with reactive sources.
* **Inputs & Outputs:** Prefer `input()`, `output()`, and `model()` over `@Input()` and `@Output()` decorators.
* **PrimeNG Integration:** Integrate PrimeNG components with Angular signals and reactive state. Avoid unnecessary subscriptions or duplicated state.

---

## 4. Templates & Styling

* **Control Flow:** Use `@if`, `@for`, and `@switch` instead of legacy structural directives such as `*ngIf`, `*ngFor`, and `*ngSwitch`.
* **Class & Style Bindings:** Do **not** use `ngClass` or `ngStyle`. Prefer native `class` and `style` bindings.
* **Imports:** Do **not** import `CommonModule`. Import only the required directives, pipes, and components.
* **Images:** Use `NgOptimizedImage` for static images where applicable. Note that it does not support inline base64 images.
* **Forms:** Prefer Signal Forms (`@angular/forms/signals`) for new forms when supported by the installed Angular version and compatible with the required UI components. Otherwise, use Reactive Forms instead of template-driven forms.

---

## 5. PrimeNG Guidelines

* **PrimeNG First:** Use existing PrimeNG components for common UI elements (tables, buttons, dialogs, dropdowns/selects, date pickers, menus, tabs, forms, overlays, etc.) instead of building custom equivalents.
* **Version Compatibility:** Verify component names, inputs, outputs, imports, and APIs against the installed PrimeNG version. Do not use deprecated APIs or examples from incompatible versions.
* **Standalone Imports:** Import only the required PrimeNG components in each standalone component. Follow the installed version's recommended import conventions.
* **Theming:** Follow the project's existing PrimeNG theme and design system. Use supported design tokens, CSS variables, and theming APIs. Avoid hardcoded overrides of internal PrimeNG classes unless necessary.
* **Consistency:** Reuse existing PrimeNG components, shared wrappers, and styling conventions. Maintain consistent sizing, severity, variants, spacing, and interaction patterns.
* **Forms & Validation:** Integrate PrimeNG form controls with Angular Forms appropriately. Preserve validation, touched/dirty states, accessible error messages, and existing form behavior.
* **Tables & Data:** Use PrimeNG Table (`p-table`) for tabular data. Support pagination, sorting, filtering, loading, empty states, and responsive behavior as required. Avoid unnecessary custom table implementations.
* **Dialogs & Overlays:** Use PrimeNG's supported dialog, menu, popover, and overlay APIs. Handle visibility, events, focus, and cleanup correctly.
* **Icons:** Follow the project's existing PrimeIcons or icon-library conventions. Do not introduce another icon library when an appropriate one is already configured.
* **Customization:** Prefer documented PrimeNG APIs and supported styling hooks over DOM manipulation, internal selectors, or unnecessary CSS overrides.
* **No Unnecessary Dependencies:** Do not install additional PrimeNG-related packages or replace the existing theme unless the requirement justifies it.

---

## 6. Accessibility (a11y) & Performance

* **Accessibility:** Meet WCAG 2.1 AA requirements and pass AXE checks. Ensure keyboard navigation, focus management, accessible labels, ARIA attributes, and sufficient color contrast across custom and PrimeNG components.
* **PrimeNG Accessibility:** Follow the accessibility guidance for the installed PrimeNG components. Do not assume a component is automatically accessible in every usage context.
* **Performance:** Keep components small and focused. Leverage signals, efficient rendering, and appropriate lazy loading. Avoid unnecessary change detection triggers, redundant API calls, and expensive template computations.

---

## 7. Implementation & Verification

* Review existing project patterns and dependencies before making changes.
* Prefer minimal, maintainable changes that satisfy the requirement without introducing unrelated refactoring.
* Preserve existing functionality and ensure compatibility with the project's Angular and PrimeNG versions.
* Verify the implementation through relevant tests, linting, and build checks where available.
* Do not introduce unnecessary files, dependencies, abstractions, or architectural changes.