import { User } from "./user";

export class Life {
    totalWeeks?:number;
    weeksLived?:number;
    weeksLeft?:number;

    build(user:User, lifeExpectancyYears:number){
        this.totalWeeks = lifeExpectancyYears * 52;
        this.weeksLived = this.calculateWeeksLived(user);
        this.weeksLeft = this.calculateWeeksLeft(lifeExpectancyYears, this.weeksLived);
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
}