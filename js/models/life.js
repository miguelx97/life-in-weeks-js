"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Life = void 0;
class Life {
    lifeExpectancyYears;
    totalWeeks;
    weeksLived;
    percentageLived;
    get weeksLeft() {
        return this.calculateWeeksLeft(this.lifeExpectancyYears, this.weeksLived);
    }
    get percentageLeft() {
        return 100 - this.percentageLived;
    }
    build(user, lifeExpectancyYears) {
        this.lifeExpectancyYears = lifeExpectancyYears;
        this.totalWeeks = lifeExpectancyYears * 52;
        this.weeksLived = this.calculateWeeksLived(user);
        this.percentageLived = this.calculatePercentageLived();
    }
    calculateWeeksLived(user) {
        if (!user.birthdate) {
            throw new Error('Birthdate is required');
        }
        const birthdate = user.birthdate;
        const today = new Date();
        const diffTime = today.getTime() - birthdate.getTime();
        const diffWeeks = diffTime / (1000 * 3600 * 24 * 7);
        return Math.floor(diffWeeks);
    }
    calculateWeeksLeft(lifeExpectancy, weeksLived) {
        return Math.floor(lifeExpectancy * 52 - weeksLived);
    }
    calculatePercentageLived() {
        return Math.floor(this.weeksLived * 100 / this.totalWeeks);
    }
}
exports.Life = Life;
