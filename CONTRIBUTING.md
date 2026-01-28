# Contributing to MediFinance

Thank you for considering contributing to MediFinance! This document provides guidelines for contributing to the project.

## Code of Conduct

Please be respectful and constructive in all interactions.

## How to Contribute

### Reporting Bugs
- Use the GitHub Issues tracker
- Describe the bug in detail
- Include steps to reproduce
- Mention your environment (OS, Node version, etc.)

### Suggesting Features
- Open an issue with the "feature request" label
- Explain the use case and benefits
- Include mockups if applicable

### Pull Requests
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Write/update tests
5. Ensure all tests pass: `npm test`
6. Commit with clear messages: `git commit -m 'Add amazing feature'`
7. Push to your fork: `git push origin feature/amazing-feature`
8. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/medifinance-platform.git
cd medifinance-platform

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

## Coding Standards

### TypeScript
- Use TypeScript for all new code
- Define proper interfaces/types
- Avoid `any` type

### React
- Use functional components with hooks
- Follow React best practices
- Keep components small and focused

### Styling
- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Maintain consistent spacing

### Naming Conventions
- Components: PascalCase (`MyComponent.tsx`)
- Functions/variables: camelCase (`myFunction`)
- Constants: UPPER_SNAKE_CASE (`MAX_VALUE`)
- Files: kebab-case for non-components

## Commit Message Guidelines

Format: `type(scope): subject`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Example: `feat(insurance): add policy upload validation`

## Testing

- Write unit tests for new features
- Maintain test coverage above 80%
- Test edge cases

## Documentation

- Update README.md for major changes
- Add JSDoc comments for functions
- Update API documentation

## Questions?

Open an issue or email: developers@medifinance.health

Thank you for contributing! 🎉
