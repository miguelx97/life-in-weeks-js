import { Life } from "./models/life";
import { User } from "./models/user";
import { getLifeExpectancyByCountry } from "./services/lifeExpectancy.service";
import { Persistence } from "./services/persistence.service";

export async function processLifeInWeeks(user:User) {
    console.log('Processing life in weeks...', user);    
    if(!user || !user.birthdate || !user.country || !user.gender) return;
    const life:Life = await getLifeInWeeks(user);
    generateWeeksGrid(life);
    Persistence.save('user', user);
}

async function getLifeInWeeks(user:User) {
    const lifeExpectancy:number = await getLifeExpectancyByCountry(user);
    const life:Life = new Life();
    life.build(user, lifeExpectancy);
    console.log('Life in weeks:', life);    
    return life;
}

function generateWeeksGrid(life:Life) {
    const grid:HTMLDivElement = document.getElementById('grid') as HTMLDivElement;

    grid.innerHTML = ''; // Clear the grid
    
    for (let i = 0; i < life.totalWeeks!; i++) {
        const square = document.createElement('div');
        square.classList.add('week'); // Add the "week" class
        if(i < life.weeksLived!) {
            square.classList.add('week-lived'); // Add the "week-lived" class
        }
        grid.appendChild(square);
    }
}