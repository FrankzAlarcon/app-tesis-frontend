/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/commission",
  "/company",
]

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to /dashboard.
 * @type {string[]}
 */
export const authRoutes = [
  "/login",
  "/register/student",
  "/register/company",
  "/register-type-selection",
]


/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"


/**
 * The default redirect path for admin after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_ADMIN_REDIRECT = "/a/dashboard"


/**
 * The default redirect path for students after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_STUDENT_REDIRECT = "/e" // TODO: Change this to the student start page


/**
 * The default redirect path for business after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_BUSINESS_REDIRECT = "/b" // TODO: Change this to the business start page