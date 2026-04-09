// GSAP v3.14 doesn't ship its own .d.ts type declarations.
// Since your tsconfig.json extends astro/tsconfigs/strict 
// (which enables strict: true), TypeScript refuses implicit 
// any types for untyped modules. 
// The fix is src/env.d.ts — Astro's conventional ambient 
// declaration file — which declares the gsap module so 
// TypeScript knows it exists and stops flagging the import
// in the Header.astro file.

/// <reference types="astro/client" />

declare module 'gsap' {
  const gsap: import('gsap').gsap;
  export default gsap;
  export * from 'gsap';
}
