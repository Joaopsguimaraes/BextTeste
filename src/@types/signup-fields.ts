import type User from './user'

export type SignupFields = Omit<User, 'id' | 'createdAt' | 'updatedAt'>
