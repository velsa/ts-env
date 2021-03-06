# Typescript ENV

Bring strongly typed environment variables into your Typescript project :)

## Install

```
npm install @velsa/ts-env
``` 

## Usage / Examples

```javascript
import env from '@velsa/ts-env'

export const myenv = {
    // Strings are the default type
    API_TOKEN: env("API_TOKEN"),
    // API_TOKEN type: string

    // Inferring types using the 'default' option
    SERVER_PORT: env("SERVER_PORT", { default: 3000 })
    // SERVER_PORT type: number

    // You can set boolean env vars like that: ENABLE_AUTH=yes
    ENABLE_AUTH: env("ENABLE_AUTH", { default: false })
    // ENABLE_AUTH type: boolean

    // Strict typings and autocomplete using the 'allowed' option
    NODE_ENV: env("NODE_ENV", { allowed: ["dev", "prod", "test"] as const }),
    // NODE_ENV type: "dev" | "prod" | "test"
    // cool, right? 😎
}
```

## Features

The library exposes only one method, which accepts the var name and some options:

```typescript
env(varName: string, 
    options?: { 
        default?: string | number | boolean,
        allowed?: string[] | number[]
    }
)
```

The `env()` function reads the `varName` value from the environment (`process.env`), converts it to the correct type, uses `default` if needed, checks the value against `allowed` values if they are provided and generates TS type and type checks on the fly.

Boolean env vars can be set to "true" or "yes" for true values and anything else for false.

If no `default` or `allowed` values are provided, the return type is `string`.
 
If `default` value is not provided and env var is not found, the function will throw an error.

If `allowed` array is provided and the env var value is not in the `allowed` list, the function will throw an error.

