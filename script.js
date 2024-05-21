let money = 0;
let fishInventory = {
    commonTuna: 0,
    rareTuna: 0,
    legendaryTuna: 0,
    exoticTuna: 0,
    mythicalTuna: 0,
    commonSalmon: 0,
    rareSalmon: 0,
    legendarySalmon: 0,
    exoticSalmon: 0,
    mythicalSalmon: 0,
    commonBass: 0,
    rareBass: 0,
    legendaryBass: 0,
    exoticBass: 0,
    mythicalBass: 0,
    commonTrout: 0,
    rareTrout: 0,
    legendaryTrout: 0,
    exoticTrout: 0,
    mythicalTrout: 0,
    commonFlounder: 0,
    rareFlounder: 0,
    legendaryFlounder: 0,
    exoticFlounder: 0,
    mythicalFlounder: 0
};
let rodLevel = 1;
let baitLevel = 1;
let fishermanLevel = 1; // Fisherman level to unlock new fish
let rodPrice = 25;
let baitPrice = 50;
let fishingTime = 10000; // in milliseconds
let isFishing = false;
let levelUpThreshold = 100; // Amount of money required to level up
let pugs = 0;
let pugPrice = 75;
let catchMultiplier = 1;
let catchMultiplierPrice = 150;

const fishValues = {
    commonTuna: 5,
    rareTuna: 20,
    legendaryTuna: 100,
    exoticTuna: 50,
    mythicalTuna: 200,
    commonSalmon: 10,
    rareSalmon: 30,
    legendarySalmon: 120,
    exoticSalmon: 70,
    mythicalSalmon: 250,
    commonBass: 8,
    rareBass: 25,
    legendaryBass: 110,
    exoticBass: 60,
    mythicalBass: 220,
    commonTrout: 6,
    rareTrout: 22,
    legendaryTrout: 105,
    exoticTrout: 55,
    mythicalTrout: 210,
    commonFlounder: 7,
    rareFlounder: 24,
    legendaryFlounder: 115,
    exoticFlounder: 65,
    mythicalFlounder: 230
};

const fishRarities = {
    commonTuna: 'Common Tuna',
    rareTuna: 'Rare Tuna',
    legendaryTuna: 'Legendary Tuna',
    exoticTuna: 'Exotic Tuna',
    mythicalTuna: 'Mythical Tuna',
    commonSalmon: 'Common Salmon',
    rareSalmon: 'Rare Salmon',
    legendarySalmon: 'Legendary Salmon',
    exoticSalmon: 'Exotic Salmon',
    mythicalSalmon: 'Mythical Salmon',
    commonBass: 'Common Bass',
    rareBass: 'Rare Bass',
    legendaryBass: 'Legendary Bass',
    exoticBass: 'Exotic Bass',
    mythicalBass: 'Mythical Bass',
    commonTrout: 'Common Trout',
    rareTrout: 'Rare Trout',
    legendaryTrout: 'Legendary Trout',
    exoticTrout: 'Exotic Trout',
    mythicalTrout: 'Mythical Trout',
    commonFlounder: 'Common Flounder',
    rareFlounder: 'Rare Flounder',
    legendaryFlounder: 'Legendary Flounder',
    exoticFlounder: 'Exotic Flounder',
    mythicalFlounder: 'Mythical Flounder'
};

const fishProbabilities = [
    { type: 'mythicalTuna', minLevel: 5, baseChance: 0.005 },
    { type: 'legendaryTuna', minLevel: 4, baseChance: 0.01 },
    { type: 'exoticTuna', minLevel: 3, baseChance: 0.05 },
    { type: 'rareTuna', minLevel: 2, baseChance: 0.15 },
    { type: 'commonTuna', minLevel: 1, baseChance: 0.285 },
    { type: 'mythicalSalmon', minLevel: 5, baseChance: 0.005 },
    { type: 'legendarySalmon', minLevel: 4, baseChance: 0.01 },
    { type: 'exoticSalmon', minLevel: 3, baseChance: 0.05 },
    { type: 'rareSalmon', minLevel: 2, baseChance: 0.15 },
    { type: 'commonSalmon', minLevel: 1, baseChance: 0.285 },
    { type: 'mythicalBass', minLevel: 5, baseChance: 0.005 },
    { type: 'legendaryBass', minLevel: 4, baseChance: 0.01 },
    { type: 'exoticBass', minLevel: 3, baseChance: 0.05 },
    { type: 'rareBass', minLevel: 2, baseChance: 0.15 },
    { type: 'commonBass', minLevel: 1, baseChance: 0.285 },
    { type: 'mythicalTrout', minLevel: 5, baseChance: 0.005 },
    { type: 'legendaryTrout', minLevel: 4, baseChance: 0.01 },
    { type: 'exoticTrout', minLevel: 3, baseChance: 0.05 },
    { type: 'rareTrout', minLevel: 2, baseChance: 0.15 },
    { type: 'commonTrout', minLevel: 1, baseChance: 0.285 },
    { type: 'mythicalFlounder', minLevel: 5, baseChance: 0.005 },
    { type: 'legendaryFlounder', minLevel: 4, baseChance: 0.01 },
    { type: 'exoticFlounder', minLevel: 3, baseChance: 0.05 },
    { type: 'rareFlounder', minLevel: 2, baseChance: 0.15 },
    { type: 'commonFlounder', minLevel: 1, baseChance: 0.285 }
];

const catchFishButton = document.getElementById('catchFishButton');
const inventoryList = document.getElementById('inventoryList');
const sellAllButton = document.getElementById('sellAllButton');
const moneyDisplay = document.getElementById('money');
const totalWorthDisplay = document.getElementById('totalWorth'); // Add this line
const upgradeRodButton = document.getElementById('upgradeRodButton');
const upgradeBaitButton = document.getElementById('upgradeBaitButton');
const levelUpButton = document.getElementById('levelUpButton');
const buyPugButton = document.getElementById('buyPugButton'); // Add this line
const upgradeCatchButton = document.getElementById('upgradeCatchButton'); // Add this line

catchFishButton.addEventListener('click', startFishing);
sellAllButton.addEventListener('click', sellAllFish);
upgradeRodButton.addEventListener('click', upgradeRod);
upgradeBaitButton.addEventListener('click', upgradeBait);
levelUpButton.addEventListener('click', levelUp);
buyPugButton.addEventListener('click', buyPug); // Add this line
upgradeCatchButton.addEventListener('click', upgradeCatch); // Add this line

function startFishing() {
    if (!isFishing) {
        isFishing = true;
        catchFishButton.disabled = true;
        setTimeout(finishFishing, fishingTime);
    }
}

function finishFishing() {
    let fishType = getFishType();
    fishInventory[fishType] += catchMultiplier; // Apply catch multiplier
    isFishing = false;
    catchFishButton.disabled = false;
    updateInventory();
}

function getFishType() {
    let rand = Math.random();
    let cumulativeChance = 0;
    let availableFish = fishProbabilities.filter(fish => fish.minLevel <= fishermanLevel);

    // Calculate cumulative chance based on available fish types
    for (let i = 0; i < availableFish.length; i++) {
        cumulativeChance += availableFish[i].baseChance;
        if (rand < cumulativeChance) {
            return availableFish[i].type;
        }
    }
    return 'commonTuna'; // Fallback, should rarely hit this
}

function updateInventory() {
    inventoryList.innerHTML = '';
    let totalWorth = 0;
    for (let fish in fishInventory) {
        if (fishInventory[fish] > 0) {
            let listItem = document.createElement('li');
            listItem.textContent = `${fishRarities[fish]}: ${fishInventory[fish]}`;
            inventoryList.appendChild(listItem);
            totalWorth += fishInventory[fish] * fishValues[fish]; // Calculate total worth
        }
    }
    totalWorthDisplay.textContent = `Total Worth: $${totalWorth}`; // Update total worth display
}

function sellAllFish() {
    for (let fish in fishInventory) {
        money += fishInventory[fish] * fishValues[fish];
        fishInventory[fish] = 0    }
        updateInventory();
        updateMoney();
    }
    
    function updateMoney() {
        moneyDisplay.textContent = `$${money}`;
        checkLevelUp();
    }
    
    function upgradeRod() {
        if (money >= rodPrice) {
            money -= rodPrice;
            rodLevel++;
            rodPrice = Math.floor(rodPrice * 1.5); // Increase price by 50%
            updateMoney();
            updateUpgradeButtons();
        }
    }
    
    function upgradeBait() {
        if (money >= baitPrice) {
            money -= baitPrice;
            baitLevel++;
            baitPrice = Math.floor(baitPrice * 1.5); // Increase price by 50%
            fishingTime = Math.max(fishingTime / 2, 1000); // Decrease fishing time, but not below 1 second
            updateMoney();
            updateUpgradeButtons();
        }
    }
    
    function levelUp() {
        if (money >= levelUpThreshold) {
            money -= levelUpThreshold;
            fishermanLevel++;
            levelUpThreshold = Math.floor(levelUpThreshold * 1.5);
            updateMoney();
            updateUpgradeButtons();
        }
    }
    
    function buyPug() {
        if (money >= pugPrice) {
            money -= pugPrice;
            pugs++;
            pugPrice = Math.floor(pugPrice * 1.5); // Increase price by 50%
            setInterval(autoFish, fishingTime); // Each pug fishes automatically
            updateMoney();
            updateUpgradeButtons();
        }
    }
    
    function autoFish() {
        let fishType = getFishType();
        fishInventory[fishType] += catchMultiplier; // Apply catch multiplier
        updateInventory();
    }
    
    function upgradeCatch() {
        if (money >= catchMultiplierPrice) {
            money -= catchMultiplierPrice;
            catchMultiplier++;
            catchMultiplierPrice = Math.floor(catchMultiplierPrice * 1.5); // Increase price by 50%
            updateMoney();
            updateUpgradeButtons();
        }
    }
    
    function updateUpgradeButtons() {
        upgradeRodButton.textContent = `Upgrade Rod ($${rodPrice})`;
        upgradeBaitButton.textContent = `Upgrade Bait ($${baitPrice})`;
        levelUpButton.textContent = `Level Up ($${levelUpThreshold})`;
        buyPugButton.textContent = `Buy Pug ($${pugPrice})`;
        upgradeCatchButton.textContent = `Upgrade Catch ($${catchMultiplierPrice})`;
    }
    
    // Initialize button texts
    updateUpgradeButtons();
    
    function checkLevelUp() {
        if (money >= levelUpThreshold) {
            levelUpButton.disabled = false;
        } else {
            levelUpButton.disabled = true;
        }
    }
    
