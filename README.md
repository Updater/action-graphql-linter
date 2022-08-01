# GraphQL Linter Action

This action lints the GraphQL Schemas sent in the input.

## Inputs

## `graphql-schemas`

**Required** GraphQL Schemas to lint.

## Example usage

```yaml
uses: actions/hello-world-javascript-action@v1.1
with:
  graphql-schemas: 'app/graphql.schema'
```

```yaml
uses: actions/hello-world-javascript-action@v1.1
with:
  graphql-schemas: 'graphql1.schema,graphql2.schema'
```
