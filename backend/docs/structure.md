# Structure

I'll use Model-Controller-Service architecture.

Models: db access, prepare/finalize statemenets.
Services: business logic and orchestration (validation, mappers, etc...), calls models
Controllers: HTTP layer, parse requests, calls services

## Code Standards
1. kebab-case for files
3. classes/types/interface in PascalCase
2. camelCase for fields/properties