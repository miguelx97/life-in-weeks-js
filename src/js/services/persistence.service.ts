export class Persistence {
    static save(key: string, value: any) {
        const json = JSON.stringify(value);
        localStorage.setItem(key, json);
    }
    
    static load(key: string) {
        if(!localStorage.getItem(key)) {
            return null;
        }
        const json = localStorage.getItem(key);
        return JSON.parse(json!);
    }
}
