export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
}

export class UserModel {
    private users: User[] = [];
    private currentId: number = 1;

    public getAllUsers(): User[] {
        return this.users;
    }

    public getUserById(id: number): User | undefined {
        return this.users.find(user => user.id === id);
    }

    public createUser(user: Omit<User, 'id'>): User {
        const newUser = { id: this.currentId++, ...user };
        this.validateUser(newUser);
        this.users.push(newUser);
        return newUser;
    }

    public updateUser(id: number, updatedUser: Partial<Omit<User, 'id'>>): User | undefined {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) return undefined;

        const user = { ...this.users[userIndex], ...updatedUser };
        this.validateUser(user);
        this.users[userIndex] = user;
        return user;
    }

    public deleteUser(id: number): boolean {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) return false;

        this.users.splice(userIndex, 1);
        return true;
    }

    private validateUser(user: User): void {
        if (!user.firstName || !user.lastName || !user.email) {
            throw new Error('Fields cannot be empty');
        }
        if (!isNaN(Number(user.firstName))) {
            throw new Error('First name cannot contain numbers');
        }
        if (typeof user.age !== 'number') {
            throw new Error('Age must be a number');
        }
    }
}