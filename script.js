function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function randomizeStats(obj) {
    obj.Strength -= getRandomInteger(-1 ,1);
    obj.Cunning -= getRandomInteger(-1 ,1);
    obj.Speed -= getRandomInteger(-1 ,1);
    obj.Fatigue -= getRandomInteger(-6 ,6);
    obj.oriFatigue = obj.Fatigue;
}
  
function init() {
    pStats = {
        Strength: 6,
        Speed: 6,
        Cunning: 6,
        Fatigue: 30,
        Attack: 0,
        Defense: 0,
        Finisher: false,
        oriFatigue: 30,
        isDefending: false,
        finActive: false
    };
    cpuStats = {
        Strength: 6,
        Speed: 6,
        Cunning: 6,
        Fatigue: 30,
        Attack: 0,
        Defense: 0,
        Finisher: false,
        oriFatigue: 30,
        isDefending: false
    };
    randomizeStats(pStats);
    randomizeStats(cpuStats);

    document.getElementById("oStrengthP").innerHTML = pStats.Strength
    document.getElementById("oSpeedP").innerHTML = pStats.Speed
    document.getElementById("oCunningP").innerHTML = pStats.Cunning
    document.getElementById("oFatigueP").innerHTML = pStats.Fatigue
    document.getElementById("oStrengthC").innerHTML = cpuStats.Strength
    document.getElementById("oSpeedC").innerHTML = cpuStats.Speed
    document.getElementById("oCunningC").innerHTML = cpuStats.Cunning
    document.getElementById("oFatigueC").innerHTML = cpuStats.Fatigue
    document.getElementById("player-log").innerHTML = "";
    document.getElementById("computer-log").innerHTML = "";
    document.getElementById("finisher").style.display = "none";
}

function attack(obj) {
    obj.Attack = (obj.Strength + obj.Speed + obj.Cunning) / getRandomInteger(1, 3)
    obj.Defense = obj.Speed + getRandomInteger(1, 6)
    obj.isDefending = false
}

function defend(obj) {
    obj.Attack = 0
    obj.Defense = obj.Speed + obj.Cunning
    obj.isDefending = true
}

function turn() {
    if (cpuStats.Fatigue >= pStats.Fatigue * 2) {
        cpuStats.Finisher = true;
    }
    if (pStats.Fatigue >= cpuStats.Fatigue * 2) {
        pStats.Finisher = true;
    }
    if (pStats.Fatigue < 0) {
        cpuStats.Finisher = true;
    } else {
        cpuStats.Finisher = false;
    }
    if (cpuStats.Fatigue < 0) {
        pStats.Finisher = true;
    } else {
        pStats.Finisher = false;
    }
    if (pStats.Finisher) {
        document.getElementById("finisher").style.display = "block";
    } else {
        document.getElementById("finisher").style.display = "none";
    }
    if (getRandomInteger(1,2) == 1) {
        defend(cpuStats)
        document.getElementById("computer-log").innerHTML = document.getElementById("computer-log").innerHTML + "<br>Scout Defended!"
    } else {
        attack(cpuStats)
        document.getElementById("computer-log").innerHTML = document.getElementById("computer-log").innerHTML + "<br>Scout Attacked!"
    }
    if (pStats.finActive) {
        if (pStats.Attack > cpuStats.Defense) {
            alert("The player won!")
            init()
            return
        }
        pStats.finActive = false;
    }
    if (cpuStats.Finisher) {
        if (cpuStats.Attack > pStats.Defense) {
            alert("Scout won!")
            init()
            return
        }
    }
    if (pStats.Attack > cpuStats.Defense) {
        cpuStats.Fatigue -= pStats.Attack - cpuStats.Defense
    } else if (cpuStats.isDefending) {
        fChange = getRandomInteger(1,6)
        if ((cpuStats.Fatigue += fChange) > cpuStats.oriFatigue) {
            cpuStats.Fatigue = cpuStats.oriFatigue
        } else {
            cpuStats.Fatigue += fChange
        }
    }
    if (cpuStats.Attack > pStats.Defense) {
        pStats.Fatigue -= cpuStats.Attack - pStats.Defense
    } else if (pStats.isDefending) {
        fChange = getRandomInteger(1,6)
        if ((pStats.Fatigue += fChange) > pStats.oriFatigue) {
            pStats.Fatigue = pStats.oriFatigue
        } else {
            pStats.Fatigue += fChange
        }
    }
}

function display() {
    document.getElementById("cStrengthP").innerHTML = pStats.Strength
    document.getElementById("cSpeedP").innerHTML = pStats.Speed
    document.getElementById("cCunningP").innerHTML = pStats.Cunning
    document.getElementById("cFatigueP").innerHTML = pStats.Fatigue
    document.getElementById("cStrengthC").innerHTML = cpuStats.Strength
    document.getElementById("cSpeedC").innerHTML = cpuStats.Speed
    document.getElementById("cCunningC").innerHTML = cpuStats.Cunning
    document.getElementById("cFatigueC").innerHTML = cpuStats.Fatigue
}

function playerAttacks() {
    document.getElementById("player-log").innerHTML = document.getElementById("player-log").innerHTML + "<br>You Attacked!"
    attack(pStats)
    turn()
    display()
}

function playerDefends() {
    document.getElementById("player-log").innerHTML = document.getElementById("player-log").innerHTML + "<br>You Defended!"
    defend(pStats)
    turn()
    display()
}

function finisher() {
    pStats.finActive = true;
    pStats.Attack = (pStats.Strength + pStats.Speed) / getRandomInteger(1, 3)
    pStats.Defense = pStats.Speed + getRandomInteger(1, 6)
    pStats.isDefending = false
    turn()
    display()
}