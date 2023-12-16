export class User {
    birthdate?: Date;
    gender?: string;
    country?: string;

    copy(user:User) {
        if(!user) return;
        this.birthdate = new Date(user.birthdate!);
        this.gender = user.gender;
        this.country = user.country;
    }

    buildFromInputs(event: Event, value?: any) {
        value = value ?? (event.target as HTMLInputElement).value;
        const inputId = (event.target as HTMLInputElement).id;
        if (inputId in this) (this as any)[inputId] = value;
    }

    clean() {
        this.birthdate = undefined;
        this.gender = undefined;
        this.country = undefined;
    }
}