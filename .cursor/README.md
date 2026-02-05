# Cursor Rules for XM Cloud Starter Applications

This directory contains AI coding agent guidance files to help maintain consistent code quality and follow SitecoreAI best practices across all starter applications in this repository.

## Rules Overview

### Core Rules (Always Applied)
- **`general.mdc`** - Universal coding principles and architecture patterns
- **`code-style.mdc`** - Vibe-coding principles, TypeScript standards, and quality guidelines
- **`project-context.mdc`** - Repository-specific context and multi-starter architecture
- **`safety.mdc`** - Safety rules to prevent editing compiled artifacts and generated files
- **`linting-formatting.mdc`** - Mandatory ESLint and Prettier enforcement for all JavaScript, TypeScript, and React file edits

### Scoped Rules (Applied to Specific Files)
- **`javascript.mdc`** - JavaScript/TypeScript naming conventions, performance, JSDoc standards
- **`sitecore.mdc`** - Sitecore development patterns and component guidelines
- **`nextjs.mdc`** - Next.js specific patterns, routing, and API development
- **`testing.mdc`** - Testing strategies for XM Cloud components and integrations

## Usage

When using AI coding assistants like Cursor:
1. Rules automatically provide context based on the files you're working with
2. Follow the naming conventions and architectural guidance provided
3. Refer to specific rules when uncertain about implementation approaches
4. All starter applications inherit these rules for consistent development

## XM Cloud Starter Context

This repository contains multiple starter applications:
- **Nova Medical** - Healthcare focused site template with physicians listing
- **Essential Living** - Retail focused site template for an upscale furniture brand with products and articles
- **FormaLux** - Retail focused site template for a furniture brand with products and articles
- **starter** - Simple Next.js starter with basic components
- **Skywings** - Travel focused site template with articles and destinations
- **Gridwell** - Energy focused site template with articles 

Each starter follows the same patterns and conventions defined in these rules while maintaining their unique functionality and design.

## Contributing

To improve these rules:
1. Edit the relevant `.mdc` files in this directory
2. Keep rules under 500 lines and focused on specific concerns
3. Include concrete examples and file references using `@filepath` syntax
4. Test changes with AI coding assistants to ensure effectiveness
5. Consider impact across all starter applications

For more details, see the [Contributing Guide](../CONTRIBUTING.md#ai-assisted-development).

## Development Workflow

When working on any starter application:
- The AI assistant will automatically apply relevant rules based on file types
- SitecoreAI-specific patterns will be suggested for component development
- Next.js best practices will be enforced for routing and API development
- Consistent naming and code organization will be maintained across all starters

These rules ensure that all starter applications maintain high code quality and follow established SitecoreAI development patterns.