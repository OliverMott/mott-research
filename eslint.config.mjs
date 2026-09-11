import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "components/ui/**",
    "db/**",
    "examples/**",
    "hooks/**",
    "scripts/**",
    "vendor/**",
    "vite.config.ts",
    "drizzle.config.ts",
    "cloudflare-env.d.ts",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
