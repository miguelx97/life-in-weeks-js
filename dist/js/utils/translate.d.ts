export default class Translate {
    constructor();
    private static translations;
    static init(language: string, filesRoute?: string): Promise<void>;
    static word(key: string): string;
    static template(): void;
}
