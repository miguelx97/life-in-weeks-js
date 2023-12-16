export declare class User {
    birthdate?: Date;
    gender?: string;
    country?: string;
    copy(user: User): void;
    buildFromInputs(event: Event, value?: any): void;
    clean(): void;
}
