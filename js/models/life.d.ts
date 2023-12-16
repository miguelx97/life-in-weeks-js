import { User } from "./user";
export declare class Life {
    totalWeeks?: number;
    weeksLived?: number;
    weeksLeft?: number;
    percentageLived?: number;
    percentageLeft?: number;
    build(user: User, lifeExpectancyYears: number): void;
    calculateWeeksLived(user: User): number;
    calculateWeeksLeft(lifeExpectancy: number, weeksLived: number): number;
    calculatePercentageLived(): number;
}
