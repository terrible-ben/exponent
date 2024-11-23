// Auth API 
import { permission } from 'process';
import API2Client from '../core/client';

export interface Role {
    id: string,
    name: string,
    description: string,
    registrable: boolean,
    permissions: [{
        [PermissionName: string]: [
            [Permission: string]
        ] 
    }]
}

export interface UserRegistration {
    id: string,
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
    user_roles: [role_id: string],
    avatar: File
}


export interface AuthData {
    token: string
}

export interface Token {
    token: string
}

export interface PasswordReset {
    email: string
}

export interface PasswordResetToken {
    token: string
}

export interface PasswordResetConfirm {
    token: string,
    password: string,
    password_confirmation: string
}

export interface UserRoles {
    user_id: string,
    role_id: string
}

export interface RoleRegistrable {
    registrable: boolean
}

export interface RegistrableRoles {
    roles: [Role]
}

export interface RolePermissions {
    permissions: [{
        [PermissionName: string]: [
            [Permission: string]
        ] 
    }]
}

export interface RolePermission {
    permission: string
}

export interface Password {
    password: string
}

export interface PasswordConfirmation {
    password_confirmation: string
}

export interface PasswordResetToken {
    token: string
}


export interface AuthData {
    data: {
        token: string,
        permissions: [{
            [PermissionName: string]: [
                [Permission: string]
            ] 
        }],
        user: {
            id: string,
            name: string,
            email: string,
            avatar: string,
            avatar_url: string,
            inserted_at: string,
            updated_at: string,
            deleted_at: string,
            archived_at: string
        }
    }
}



export class AuthAPI {
    constructor(private client: API2Client) {}

    setToken(token: string) {
        const config = this.client.getConfig();
        config.set('apiKey', token);
    }

    login(email: string, password: string) {
        const payload = {
            user: {
                email,
                password
            }
        }
        const auth =  this.client.request('POST', '/api/v1/authentication/identity/callback', payload).then((response: any) => {
            const result = response.data as AuthData;
            const token = result.token;

            this.setToken(token);   
            return response;
        });
        return auth;
    }

    logout(token: string) {
        return this.client.request('POST', '/api/v1/authentication/identity/revoke', { token });
    }

    register(userData: UserRegistration) {
        return this.client.request('POST', '/api/v1/users', userData);
    }

    // Check if role is registrable or not 
    checkRoleRegistrable(roleId: string) {
        this.client.request('GET', `/api/v1/roles/${roleId}`).then((role: any) => {
            return role.registrable;
        });    
    }

    // Get all registrable roles
    listRegistrableRoles() {
        return this.client.request('GET', '/api/v1/roles?registrable=true');
    }

    // TODO: Implement the rest of the methods (password reset, etc.)
}

