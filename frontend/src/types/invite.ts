
export interface InviteRole {
  value: string;
  label: string;
  description: string;
  permissions: string[];
}

export interface InviteData {
  email: string;
  role: string;
  message?: string;
}

export const INVITE_ROLES: InviteRole[] = [
  {
    value: 'admin',
    label: 'Admin',
    description: 'Full access to all features and settings',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_settings']
  },
  {
    value: 'editor',
    label: 'Editor',
    description: 'Can edit code and collaborate in real-time',
    permissions: ['read', 'write', 'collaborate']
  },
  {
    value: 'reviewer',
    label: 'Reviewer',
    description: 'Can view and comment on code',
    permissions: ['read', 'comment']
  },
  {
    value: 'viewer',
    label: 'Viewer',
    description: 'Read-only access to view code',
    permissions: ['read']
  }
];

