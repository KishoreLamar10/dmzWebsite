# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## TypeScript

- Strict TypeScript — no `any`, no `as` casts without a comment explaining why
- Prefer `type` over `interface` for object shapes; use `interface` for extension/implementation
- Named exports only — no default exports
- Async/await over raw Promise chains
- Zod for runtime validation at API boundaries
- Tests: vitest, co-located `*.test.ts` files

## Python

- Type annotations on all function signatures
- Pydantic models for data validation and serialization
- `ruff` for linting and formatting (line length 88)
- Prefer dataclasses or Pydantic over plain dicts for structured data
- `pathlib.Path` over `os.path`
- Tests: pytest, `tests/` directory mirroring `src/` structure

## Architecture

- Keep business logic framework-agnostic — no Express/FastAPI imports in domain code
- Validate at boundaries — TypeScript API routes use Zod, Python endpoints use Pydantic
- Database access only in repository/service layer, never directly in route handlers
- Environment config via `.env` files — never hardcode secrets

## Testing

- Unit tests for pure logic; integration tests for DB/API layers
- Do not mock the database in integration tests — use a real test DB

## What to Avoid

- No `any` in TypeScript or untyped `dict` in Python for domain models
- Do not catch exceptions silently — log or re-raise with context
- Do not commit `console.log` or `print` debug statements
- Do not use `os.system` or `subprocess` when a library exists for the task
