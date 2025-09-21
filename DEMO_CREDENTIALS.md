# Demo Credentials

This document contains the demo user credentials for testing the application.

## Available Demo Accounts

All demo accounts use the password: **1234**

### Student Accounts
- `test@asu.edu` - Test User (Student)
- `student@asu.edu` - Demo Student
- `john.doe@asu.edu` - John Doe (Student)
- `jane.smith@asu.edu` - Jane Smith (Student)

### Faculty Account
- `faculty@asu.edu` - Demo Faculty
- `professor.wilson@asu.edu` - Professor Wilson

### Staff Accounts
- `staff@asu.edu` - Demo Staff
- `admin@asu.edu` - Admin User

## Usage

1. Open the login screen
2. Click "Show Demo Credentials" to see available test accounts
3. Tap any email to auto-fill the login form
4. The password is automatically filled as "1234"
5. Click "Sign In" to log in

## Security Note

⚠️ **IMPORTANT**: These credentials are for development and testing purposes only. 
Never use these credentials or this authentication method in a production environment.

## Files

- `data/demoUsers.ts` - Contains the demo user data and validation functions
- `components/DemoCredentials.tsx` - UI component for displaying demo credentials
- `app/login.tsx` - Updated login screen with demo credential support
