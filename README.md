# Typescript ENV

Bring strongly typed environment variables into your Typescript project :)

## Install

```
npm install @velsa/ts-env
``` 

## Usage / Examples

```javascript
import env from '@velsa/ts-env'

const myenv = {
    API_TOKEN: env("API_TOKEN"),
    // API_TOKEN type: string

    SERVER_PORT: env("SERVER_PORT", { default: 3000 })
    // SERVER_PORT type: number

    NODE_ENV: env("NODE_ENV", { allowed: ["dev", "prod", "test"] as const }),
    // NODE_ENV type: "dev" | "prod" | "test"    
}
```

## Features

The library exposes only one method, which accepts the var name and options:

```typescript
env(varName: string, options?: { 
    default?: string | number | boolean,
    allowed?: string[] | number[]
})
```

It gets `varName` value from the environment (`process.env`), converts it to a correct type, uses default if needed, checks the value against `allowed` values if they are provided and generates return type and type checks on the fly.

Boolean env vars can be set to "true" or "yes" for true value and anything else for false.

If no `default` or `allowed` values are provided, the default type for the value is `string`.
 
If `default` value is not provided and env var is not found, the function will throw an error.

If `allowed` array is provided and the env var value is not in the `allowed` list, an error will be thrown.

