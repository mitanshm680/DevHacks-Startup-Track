// Demo user credentials for testing purposes
// DO NOT USE IN PRODUCTION - These are for development/testing only

export interface DemoUser {
  email: string;
  password: string;
  name: string;
  role: 'student' | 'faculty' | 'staff';
}

export const demoUsers: DemoUser[] = [
  {
    email: 'test@asu.edu',
    password: '1234',
    name: 'Test User',
    role: 'student'
  },
  {
    email: 'student@asu.edu',
    password: '1234',
    name: 'Demo Student',
    role: 'student'
  },
  {
    email: 'faculty@asu.edu',
    password: '1234',
    name: 'Demo Faculty',
    role: 'faculty'
  },
  {
    email: 'staff@asu.edu',
    password: '1234',
    name: 'Demo Staff',
    role: 'staff'
  },
  {
    email: 'john.doe@asu.edu',
    password: '1234',
    name: 'John Doe',
    role: 'student'
  },
  {
    email: 'jane.smith@asu.edu',
    password: '1234',
    name: 'Jane Smith',
    role: 'student'
  },
  {
    email: 'professor.wilson@asu.edu',
    password: '1234',
    name: 'Professor Wilson',
    role: 'faculty'
  },
  {
    email: 'admin@asu.edu',
    password: '1234',
    name: 'Admin User',
    role: 'staff'
  }
];

// Helper function to validate demo credentials
export const validateDemoCredentials = (email: string, password: string): DemoUser | null => {
  const user = demoUsers.find((user: DemoUser) => 
    user.email.toLowerCase() === email.toLowerCase() && 
    user.password === password
  );
  return user || null;
};

// Helper function to get all demo emails (useful for testing)
export const getDemoEmails = (): string[] => {
  return demoUsers.map(user => user.email);
};
