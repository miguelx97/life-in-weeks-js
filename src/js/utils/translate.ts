export default class Translate {

    constructor() {}

    private static translations:Map<string,string> = new Map();

    static async init(language:string, filesRoute:string = './'):Promise<void> {
        if(!language || language === 'default') language = navigator.language.substring(0, 2)
        return new Promise((resolve, reject) => {
            // console.log(filesRoute+language+".json");
            const file:string = filesRoute+language+".json"
            fetch(file).then(response => response.json()).then(translationsJson => {
                Translate.translations = new Map(Object.entries(translationsJson));
                resolve();
            }).catch(error => {
                console.log(error);
                reject({name:'Translate error', error, file});
            });
        })
    }

    static word(key:string):string {
        return (Translate.translations.has(key))? Translate.translations.get(key)! : key;
    }

    static template(){
        Translate.translations.forEach((value:string, key:string) => {
            if(key) {
                const elements = document.querySelectorAll("[translate="+key+"]");
                elements.forEach((element) => element.innerHTML = value || key)
            }
        })
    }
}