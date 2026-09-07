# Carpeta `tmp/` — Ejecutar los ejemplos de los apuntes

Los apuntes de TypeScript (S02/S03) incrustan al final de cada apunte el **código completo**
de cada fichero `REPO-XX` (ejemplos históricamente alojados en `repos/01-typescript-fundamentos`,
ahora integrados en los apuntes como única copia).

Si quieres **ejecutarlos**, copia el bloque del apunte a esta carpeta:

```bash
# desde ejercicios/
npx tsx tmp/REPO-XX.ts
```

- El `tsconfig.json` de `ejercicios/` ya aporta el entorno estricto que necesitan
  (`strict`, `noUncheckedIndexedAccess`, `lib: ES2024/DOM`), igual que hacía `repos/01`.
- Esta carpeta está **fuera del `include`** de `tsconfig.json`, por lo que `npm run typecheck`
  no la valida (es material de experimentación, no de evaluación).
- No hace falta registrar aquí nada: los ficheros que copies son tuyos, temporales y se pueden
  borrar al terminar.