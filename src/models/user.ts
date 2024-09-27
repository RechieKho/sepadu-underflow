// /src/models/user.ts

export type Privilege = 'admin' | 'community';

export class User {
  constructor(
    public ic: string,
    public name: string,
    public phoneNo: string,
    public email: string,
    public privilege: Privilege,
    public avatar: string = '' // Optional avatar URL
  ) {}

  isAdmin(): boolean {
    return this.privilege === 'admin';
  }

  getDisplayName(): string {
    return this.name;
  }
}