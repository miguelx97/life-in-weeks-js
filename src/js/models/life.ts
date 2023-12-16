import { User } from "./user";

export class Life {
    lifeExpectancyYears?:number;
    totalWeeks?:number;
    weeksLived?:number;
    percentageLived?:number;

    get weeksLeft() {
        return this.calculateWeeksLeft(this.lifeExpectancyYears!, this.weeksLived!);
    }

    get percentageLeft() {
        return 100 - this.percentageLived!;
    }

    build(user:User, lifeExpectancyYears:number){
        this.lifeExpectancyYears = lifeExpectancyYears;
        this.totalWeeks = lifeExpectancyYears * 52;
        this.weeksLived = this.calculateWeeksLived(user);
        this.percentageLived = this.calculatePercentageLived();
    }

    calculateWeeksLived(user:User):number {
        if(!user.birthdate) {
            throw new Error('Birthdate is required');
        }
        const birthdate:Date = user.birthdate;
        const today:Date = new Date();
        const diffTime:number = today.getTime() - birthdate.getTime();
        const diffWeeks:number = diffTime / (1000 * 3600 * 24 * 7);
        return Math.floor(diffWeeks);
    }

    calculateWeeksLeft(lifeExpectancy:number, weeksLived:number):number {
        return Math.floor(lifeExpectancy * 52 - weeksLived);
    }

    calculatePercentageLived():number {
        return Math.floor(this.weeksLived! * 100 / this.totalWeeks!);
    }
}