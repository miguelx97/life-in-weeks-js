"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Life = void 0;
class Life {
    totalWeeks;
    weeksLived;
    weeksLeft;
    percentageLived;
    percentageLeft;
    build(user, lifeExpectancyYears) {
        this.totalWeeks = lifeExpectancyYears * 52;
        this.weeksLived = this.calculateWeeksLived(user);
        this.weeksLeft = this.calculateWeeksLeft(lifeExpectancyYears, this.weeksLived);
        this.percentageLived = this.calculatePercentageLived();
        this.percentageLeft = 100 - this.percentageLived;
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
