# S12 · Soluciones

## 1. Funciones puras

```ts
import { describe, expect, it } from "vitest";
import { sumar, esPar } from "../src/matematicas";

describe("sumar", () => {
  it("suma dos positivos", () => {
    expect(sumar(2, 3)).toBe(5);
  });
  it("funciona con negativos", () => {
    expect(sumar(-1, 5)).toBe(4);
  });
  it("es conmutativa", () => {
    expect(sumar(4, 6)).toBe(sumar(6, 4));
  });
});

describe("esPar", () => {
  it("detecta pares", () => expect(esPar(4)).toBe(true));
  it("detecta impares", () => expect(esPar(3)).toBe(false));
});
```

## 2. Componentes

```tsx
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Boton } from "../src/components/Boton";

describe("Boton", () => {
  it("renderiza el children", () => {
    render(<Boton>Pulsa</Boton>);
    expect(screen.getByText("Pulsa")).toBeDefined();
  });

  it("deshabilitado no llama onClick", () => {
    const onClick = vi.fn();
    render(<Boton deshabilitado onClick={onClick}>Pulsa</Boton>);
    fireEvent.click(screen.getByText("Pulsa"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("clic llama a onClick una vez", () => {
    const onClick = vi.fn();
    render(<Boton onClick={onClick}>Pulsa</Boton>);
    fireEvent.click(screen.getByText("Pulsa"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
```

## 3. Async

```ts
import { describe, expect, it } from "vitest";
import { esperar } from "../src/async";

describe("esperar", () => {
  it("resuelve tras al menos el tiempo indicado", async () => {
    const inicio = Date.now();
    await esperar(30);
    expect(Date.now() - inicio).toBeGreaterThanOrEqual(25);
  });
});
```

## 4. E2E con Playwright

```ts
import { test, expect } from "@playwright/test";

test("humo: contador", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /tienda/i })).toBeVisible();
  await page.getByRole("button", { name: "Contar" }).click();
  await expect(page.getByText("1")).toBeVisible();
});
```