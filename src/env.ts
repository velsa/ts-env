type TGeneralizeType<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T;

/**
 * Gets `varName` value from the environment, uses default if needed,
 * checks if value is allowed, auto generates return type and type checks
 *
 * Type support for strings, numbers and booleans.
 * Boolean env vars can be set equal to "true" or "yes" for true value
 * and anything else for false
 *
 * @param varName name of the evnironment variable
 * @param options `default` value and list of `allowed` values for the var
 * @returns environment variable value if found, default value if not.
 * If default value is not provided and env var is not found,
 * the function will throw an error.
 *
 * If the env var value is not in the `allowed` list, an error will be thrown.
 *
 * **Examples:**
 * ```
 * const myenv = {
 *    NODE_ENV: env("NODE_ENV", { allowed: ["dev", "prod", "test"] as const }),
 *    // NODE_ENV type: "dev" | "prod" | "test"
 *
 *    SERVER_PORT: env("SERVER_PORT", { default: 3000 })
 *    // SERVER_PORT type: number
 * }
 * ```
 */
export function env<
  TReturnType extends TAllowedArray extends undefined
    ? TDefaultType extends undefined
      ? string
      : TGeneralizeType<TDefaultType>
    : TAllowedArray extends readonly (infer TElement)[]
    ? TDefaultType extends undefined
      ? TElement
      : TDefaultType extends TElement
      ? TElement
      : never
    : never,
  TAllowedArray extends readonly string[] | number[] | undefined = undefined,
  TDefaultType extends TAllowedArray extends readonly (infer TElement)[]
    ? TElement | undefined
    : string | number | boolean | undefined = undefined,
>(
  varName: string,
  options?: {
    readonly allowed?: TAllowedArray;
    default?: TDefaultType;
  },
): TReturnType {
  const { default: defaultValue, allowed } = options || {};
  const value = process.env[varName];

  const varNotAllowedError = new Error(
    `ENV ERROR: ${varName} not is allowed, "${value}" is not in ${JSON.stringify(
      allowed,
    )}`,
  );

  function checkAllowed<T extends number | string>(value: T) {
    if (allowed === undefined || (allowed as T[]).includes(value)) {
      return value;
    }
    throw varNotAllowedError;
  }

  if (!value || value.length === 0) {
    if (defaultValue !== undefined) {
      return defaultValue as TReturnType;
    }
    throw new Error(`ENV ERROR: ${varName} is not defined and has no default`);
  }

  if (defaultValue !== undefined) {
    if (typeof defaultValue === "string") {
      return checkAllowed(value) as TReturnType;
    }
    if (typeof defaultValue === "number") {
      return checkAllowed(+value) as TReturnType;
    }
    return (
      ["true", "yes"].includes(value.toLowerCase()) ? true : false
    ) as TReturnType;
  }

  return checkAllowed(value) as TReturnType;
}
