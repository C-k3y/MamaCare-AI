import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Providers
import { AuthProvider } from '../context/AuthContext';
import { NotificationProvider } from '../context/NotificationContext';
import { ThemeProvider } from '../context/ThemeContext';
import { UserProvider } from '../context/UserContext';

// Route Guards
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import RoleProtectedRoute from './RoleProtectedRoute';
import { ROLES } from '../constants/roles';

// Public pages
import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import NotFound from '../pages/NotFound';

// Patient dashboard pages
import Dashboard from '../pages/Dashboard';
import Appointments from '../pages/Appointments';
import Nutrition from '../pages/Nutrition';
import PregnancyTracker from '../pages/PregnancyTracker';
import Emergency from '../pages/Emergency';
import Profile from '../pages/Profile';
import Notifications from '../pages/Notifications';
import Messages from '../pages/Messages';
import Reports from '../pages/Reports';
import Setttings from '../pages/Setttings'; // note: keeping original typo if present
import SymptomChecker from '../pages/SymptomChecker';

// Role-specific dashboards
import AdminDashboard from '../pages/AdminDashboard';
import DoctorDashboard from '../pages/DoctorDashboard';

const AppRoutes = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <UserProvider>
                    <NotificationProvider>
                        <BrowserRouter>
                            <Routes>
                                {/* Unrestricted Public Routes */}
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                
                                {/* Restricted Public Routes (hide from logged in users) */}
                                <Route element={<PublicRoute restricted />}>
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/forgot-password" element={<ForgotPassword />} />
                                </Route>

                                {/* Private Patient Routes */}
                                <Route element={<RoleProtectedRoute allowedRoles={[ROLES.PATIENT]} />}>
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/appointments" element={<Appointments />} />
                                    <Route path="/nutrition" element={<Nutrition />} />
                                    <Route path="/pregnancy" element={<PregnancyTracker />} />
                                    <Route path="/emergency" element={<Emergency />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/notifications" element={<Notifications />} />
                                    <Route path="/messages" element={<Messages />} />
                                    <Route path="/reports" element={<Reports />} />
                                    <Route path="/settings" element={<Setttings />} />
                                    <Route path="/symptom-checker" element={<SymptomChecker />} />
                                </Route>

                                {/* Role-specific Routes */}
                                <Route element={<RoleProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
                                    <Route path="/admin" element={<AdminDashboard />} />
                                </Route>
                                
                                <Route element={<RoleProtectedRoute allowedRoles={[ROLES.DOCTOR]} />}>
                                    <Route path="/doctor" element={<DoctorDashboard />} />
                                </Route>

                                {/* 404 */}
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </BrowserRouter>
                    </NotificationProvider>
                </UserProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default AppRoutes;
