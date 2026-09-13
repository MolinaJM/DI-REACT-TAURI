# Carpeta `tmp/` — Ejecutar los ejemplos de los apuntes

Los apuntes de TypeScript (S02/S03) incrustan al final de cada apunte el **código completo**
de cada bloque "📦 Ejemplo completo" (una única copia, integrada en los propios apuntes).

Si quieres **ejecutarlos**, copia el bloque del apunte a esta carpeta:

```bash
# desde ejercicios/
npx tsx tmp/<nombre>.ts
```

- El `tsconfig.json` de `ejercicios/` ya aporta el entorno estricto que necesitan
  (`strict`, `noUncheckedIndexedAccess`, `lib: ES2024/DOM`).
- Esta carpeta está **fuera del `include`** de `tsconfig.json`, por lo que `npm run typecheck`
  no la valida (es material de experimentación, no de evaluación).
- No hace falta registrar aquí nada: los ficheros que copies son tuyos, temporales y se pueden
  borrar al terminar.