import { User } from "./user";
export declare class Life {
    lifeExpectancyYears?: number;
    totalWeeks?: number;
    weeksLived?: number;
    percentageLived?: number;
    get weeksLeft(): number;
    get percentageLeft(): number;
    build(user: User, lifeExpectancyYears: number): void;
    calculateWeeksLived(user: User): number;
    calculateWeeksLeft(lifeExpectancy: number, weeksLived: number): number;
    calculatePercentageLived(): number;
}
