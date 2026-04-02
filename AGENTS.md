# AGENTS.md

This document defines the conventions, standards, and guidelines that all contributors (human and AI) must follow when working in this repository.

---

## Project Overview

This is a TypeScript-based repository for documenting and exploring the internals of the Node.js runtime, with a focus on the event loop, async patterns, and concurrency.

---

## Commit Convention

All commits **must** follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Allowed Types

| Type       | Description                                                     |
| ---------- | --------------------------------------------------------------- |
| `feat`     | A new feature or example                                        |
| `fix`      | A bug fix                                                       |
| `docs`     | Documentation-only changes                                      |
| `style`    | Changes that do not affect the meaning of the code (formatting) |
| `refactor` | A code change that neither fixes a bug nor adds a feature       |
| `test`     | Adding or correcting tests                                      |
| `chore`    | Maintenance tasks (deps, tooling, config)                       |
| `perf`     | A code change that improves performance                         |

### Rules

- Use **lowercase** for the type and description.
- Do **not** end the description with a period.
- Use the **imperative mood** in the description (e.g., "add feature" not "added feature").
- Keep the subject line to **72 characters or fewer**.
- Use the body to explain **what** and **why**, not how.
- Reference issues in the footer when applicable (e.g., `Closes #42`).

### Examples

```
feat(event-loop): add timer phase demonstration

docs: update README with async/await section

fix(webhooks): correct race condition in concurrent handler

chore: update typescript to 5.x
```

---

## Changelog

This project follows the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.

### File

The changelog is maintained in `CHANGELOG.md` at the project root.

### Format

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
```

### Rules

- Every user-facing change **must** have a changelog entry.
- Group changes under the correct heading (`Added`, `Changed`, `Fixed`, etc.).
- Keep the `[Unreleased]` section at the top for in-progress work.
- When releasing, move `[Unreleased]` entries under the new version heading with a date: `## [x.y.z] - YYYY-MM-DD`.
- Write entries as complete, human-readable sentences.

---

## Versioning

This project follows [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).

### Format: `MAJOR.MINOR.PATCH`

| Segment   | When to Increment                                                        |
| --------- | ------------------------------------------------------------------------ |
| **MAJOR** | Breaking changes to existing examples, APIs, or restructuring of modules |
| **MINOR** | New features, examples, or documentation sections added                  |
| **PATCH** | Bug fixes, typo corrections, minor documentation improvements            |

### Rules

- Pre-release versions use a hyphen suffix: `1.0.0-alpha.1`.
- The initial development phase uses `0.x.y` — anything may change at any time.
- Never modify a released version. If a fix is needed, release a new version.

---

## TypeScript Style Guide

### General

- **Target:** ES2022 or later.
- **Module system:** ESM (`import`/`export`). Do not use CommonJS (`require`/`module.exports`).
- **Strict mode:** Always enable `strict: true` in `tsconfig.json`.

### Naming Conventions

| Construct          | Convention           | Example                    |
| ------------------ | -------------------- | -------------------------- |
| Variables          | `camelCase`          | `eventLoopPhase`           |
| Functions          | `camelCase`          | `processNextTick()`        |
| Classes            | `PascalCase`         | `WebhookHandler`           |
| Interfaces         | `PascalCase`         | `ServerConfig`             |
| Type aliases       | `PascalCase`         | `TimerCallback`            |
| Enums              | `PascalCase`         | `EventLoopPhase`           |
| Enum members       | `PascalCase`         | `EventLoopPhase.Poll`      |
| Constants          | `UPPER_SNAKE_CASE`   | `MAX_RETRY_COUNT`          |
| File names         | `kebab-case`         | `event-loop-demo.ts`       |
| Directory names    | `kebab-case`         | `timer-examples/`          |

### Interfaces & Types

- **Do not** prefix interfaces with `I` (e.g., use `ServerConfig`, not `IServerConfig`).
- Prefer `interface` for object shapes that may be extended. Use `type` for unions, intersections, and mapped types.
- Export types and interfaces that are part of the public API.

### Functions

- Prefer `const` arrow functions for top-level utilities and callbacks.
- Use named `function` declarations for exported or hoisted functions.
- Always annotate return types on exported functions.
- Avoid `any`. Use `unknown` when the type is genuinely unknown, then narrow.

### Async/Await

- Always use `async`/`await` over raw `.then()` chains for readability.
- Always handle errors with `try`/`catch` or propagate them explicitly.
- Never fire-and-forget a promise — always `await` or handle its rejection.

### Imports

- Group imports in the following order, separated by a blank line:
  1. Node.js built-in modules (e.g., `node:fs`, `node:http`)
  2. External dependencies
  3. Internal/project modules
- Use the `node:` prefix for built-in modules (e.g., `import { readFile } from 'node:fs/promises'`).
- Prefer named imports over default imports.

### Comments & Documentation

- Use JSDoc (`/** ... */`) for all exported functions, classes, and interfaces.
- Use inline comments (`//`) sparingly, only to explain *why*, not *what*.
- Every file should begin with a brief comment block explaining its purpose.

### Error Handling

- Use custom error classes that extend `Error` for domain-specific errors.
- Include meaningful error messages with context.
- Avoid silencing errors with empty `catch` blocks.

### Code Formatting

- Use **2 spaces** for indentation.
- Use **single quotes** for strings.
- Use **trailing commas** in multi-line constructs.
- Use **semicolons**.
- Max line width: **100 characters**.
- Enforce formatting with Prettier (or equivalent).

---

## Project Structure

Follow this directory layout:

```
node-runtime-deep-dive/
├── src/                    # Source code and examples
│   ├── event-loop/         # Event loop phase demonstrations
│   ├── async-patterns/     # async/await, promises, callbacks
│   ├── concurrency/        # Concurrent request handling, webhooks
│   └── utils/              # Shared utilities and helpers
├── tests/                  # Test files (mirrors src/ structure)
├── docs/                   # Extended documentation and notes
├── CHANGELOG.md
├── AGENTS.md
├── README.md
├── tsconfig.json
└── package.json
```

### Rules

- Each concept or topic gets its own directory under `src/`.
- Test files should mirror the source structure under `tests/` and use the `.test.ts` suffix.
- Documentation beyond the README goes in `docs/`.

---

## Testing

- Use a modern test runner (e.g., Vitest or Node.js built-in test runner).
- Name test files with the `.test.ts` suffix.
- Write descriptive test names that explain the expected behavior.
- Aim for tests on all non-trivial logic.

### Test Structure

```typescript
describe('TimerPhase', () => {
  it('should execute setTimeout callback after the specified delay', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

---

## Branch & PR Conventions

- Branch names should follow: `<type>/<short-description>` (e.g., `feat/timer-phase-demo`, `docs/update-readme`).
- PRs should have a clear title following the commit convention format.
- PRs should reference an issue when applicable.
- Keep PRs focused — one logical change per PR.

---

## Dependencies

- Keep dependencies minimal. This is a learning repo; avoid unnecessary abstractions.
- Pin exact versions in `package.json` (no `^` or `~` prefixes) for reproducibility.
- Document *why* a dependency was added in the PR or commit body.
