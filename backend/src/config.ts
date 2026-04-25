import type { CorsOptions } from "cors";

const DEFAULT_LOCAL_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

const REQUIRED_ENV_VARS = [
  "DATABASE_URL",
  "JWT_SECRET",
  "CLOUD_NAME",
  "API_KEY",
  "API_SECRET",
] as const;

function normalizeValue(value: string): string {
  return value.trim().replace(/\/$/, "");
}

function parseOrigins(value?: string): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((origin) => normalizeValue(origin))
    .filter(Boolean);
}

const configuredOrigins = parseOrigins(process.env.ALLOWED_ORIGINS);

export const allowedOrigins = Array.from(
  new Set([
    ...configuredOrigins,
    ...(process.env.NODE_ENV === "production" ? [] : DEFAULT_LOCAL_ORIGINS),
  ]),
);

const allowAllOrigins =
  process.env.NODE_ENV !== "production" && allowedOrigins.length === 0;

export const port = Number.parseInt(process.env.PORT ?? "3000", 10);

export function assertRequiredEnv(): void {
  if (process.env.NODE_ENV === "test") {
    return;
  }

  const missingEnvVars = REQUIRED_ENV_VARS.filter((name) => !process.env[name]);

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(", ")}`,
    );
  }
}

function isAllowedOrigin(origin?: string): boolean {
  if (!origin) {
    return true;
  }

  if (allowAllOrigins) {
    return true;
  }

  return allowedOrigins.includes(normalizeValue(origin));
}

const originHandler: CorsOptions["origin"] = (origin, callback) => {
  if (isAllowedOrigin(origin)) {
    callback(null, true);
    return;
  }

  callback(new Error(`Origin ${origin ?? "unknown"} is not allowed by CORS`));
};

export const expressCorsOptions: CorsOptions = {
  origin: originHandler,
};

export const socketCorsOptions = {
  origin: originHandler,
  methods: ["GET", "POST"],
};
