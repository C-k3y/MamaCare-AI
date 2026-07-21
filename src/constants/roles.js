/**
 * Application role constants.
 * Used by AuthContext, PrivateRoute, and RoleProtectedRoute.
 */
export const ROLES = {
    PATIENT: 'patient',
    DOCTOR: 'doctor',
    ADMIN: 'admin',
};

/** Routes each role is redirected to after login */
export const ROLE_HOME = {
    [ROLES.PATIENT]: '/dashboard',
    [ROLES.DOCTOR]: '/doctor',
    [ROLES.ADMIN]: '/admin',
};
