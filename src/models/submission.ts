// /src/models/submission.ts

import { User } from './user';

export type SubmissionStatus = 'Open' | 'Closed' | 'In Progress';

export class Submission {
  constructor(
    public id: string,
    public type: string,
    public subject: string,
    public body: string,
    public datetime: string,
    public agency: string,
    public tags: string[],
    public status: SubmissionStatus,
    public user: User,
    public vote: number
  ) {}

  getTimeAgo(): string {
    const date = new Date(this.datetime);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  }

  updateVote(direction: 'up' | 'down'): void {
    this.vote += direction === 'up' ? 1 : -1;
  }

  isOpen(): boolean {
    return this.status === 'Open';
  }
}