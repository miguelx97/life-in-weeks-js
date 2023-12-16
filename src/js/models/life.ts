import { User } from "./user";

export class Life {
    totalWeeks?:number;
    weeksLived?:number;
    weeksLeft?:number;
    percentageLived?:number;
    percentageLeft?:number;

    build(user:User, lifeExpectancyYears:number){
        this.totalWeeks = lifeExpectancyYears * 52;
        this.weeksLived = this.calculateWeeksLived(user);
        this.weeksLeft = this.calculateWeeksLeft(lifeExpectancyYears, this.weeksLived);
        this.percentageLived = this.calculatePercentageLived();
        this.percentageLeft = 100 - this.percentageLived;
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