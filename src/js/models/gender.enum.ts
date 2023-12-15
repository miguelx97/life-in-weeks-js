export enum Gender {
    Male = 'male'
    , Female = 'female'
    , Other = 'other'
}

export namespace Gender {
    export function getList(): any[] {
        return Object.values(Gender).filter(val => typeof val === 'string');
    }
}