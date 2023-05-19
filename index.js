//const gameObjects[= {
//    coins: 100,
//    hedgehogs: 0,
//    quillsCollected: 0,
//    quillsAvailable:0,
//    glue: 0,
//    pens: 0,
//    ink: 0,
//};


var gameObjects= {};
var coins = "coins";
var hedgehogs = "hedgehogs";
var quillsCollected = "quillsCollected";
var quillsAvailable = "quillsAvailable";
var glue = "glue";
var pens = "pens";
var ink = "ink";

const journal = [];
var journalIndex = 0;
var journalViewingIndex = 0;

function setGameObject(name, value) {
    gameObjects[name] = value;
    element = document.getElementById(name)
    //if there's a corresponding id, then set its value
    if (element) {
        element.innerHTML = value;
    }
}

function setMessage(message) {
    document.getElementById("message").innerHTML = message;
}


function initializeGameObjects() {
    setGameObject(coins, 100);
    setGameObject(hedgehogs, 0);
    setGameObject(quillsCollected, 0);
    setGameObject(quillsAvailable, 0);
    setGameObject(glue, 0);
    setGameObject(pens, 0);
    setGameObject(ink, 0);

}


function updateQuillsAvailable() {
    gameObjects[quillsAvailable]++;
}


function updateQuillsCollected() 
{
    if (gameObjects[hedgehogs] == 0) {
        setMessage("Error: need a hedgehog to be able to collect quills.")
        return;
    }
    if (gameObjects[quillsAvailable] > 0) {
        gameObjects[quillsCollected]++;
        gameObjects[quillsAvailable]--;
        document.getElementById("quillsCollected").innerHTML = gameObjects[quillsCollected];
        setMessage("Collected a quill.");
    }
    else {
        setMessage("Error: no quills available to collect.");
    }
}



function makePen()
{
    if (gameObjects[quillsCollected] >= 5) {
        if (gameObjects[glue] >= 1) {
            gameObjects[pens]++;
            gameObjects[quillsCollected] -= 5;
            gameObjects[glue]--;
            document.getElementById("pens").innerHTML = gameObjects[pens];
            document.getElementById("quillsCollected").innerHTML = gameObjects[quillsCollected];
            document.getElementById("glue").innerHTML = gameObjects[glue];
        }
        else {
            setMessage("Error: not enough glue to make a pen.");
        }
    }
    else {
        setMessage("Error: not enough quills to make a pen (needs 5).");
    }
}

function buyItem(itemName, cost)
{
    if (gameObjects[coins] >= cost) {
        gameObjects[itemName]++;
        gameObjects[coins] -= cost;
        document.getElementById(itemName).innerHTML = gameObjects[itemName];
        document.getElementById("coins").innerHTML = gameObjects[coins];
        setMessage("Bought " + itemName + " for " + cost + " coins.");
    }
    else {
        setMessage("Error: not enough coins to buy " + itemName + " (needs " + cost + ").");
    }
    
}

function writeEntry() {
    if (gameObjects[pens] >= 1) {
        if (gameObjects[ink] >= 1) {
            setGameObject(ink, gameObjects[ink]-1);
        }
        else {
            setMessage("Error: need ink to write.");
        }
    }
    else {
        setMessage("Error: need a pen to write.");
    }
}

function saveEntry() {
    if (gameObjects[pens] >= 1) {
        entry = document.getElementById("journal").value;
        journal[journalIndex] = entry;
        journalIndex++;
    }
    else {
        setMessage("Error: need a pen to write and save entries.")
    }

}

function viewJournal() {
    if (journalIndex > 0) {
        entryIndex = 0;
        document.getElementById("journalViewing"). innerHTML = journal[journalViewingIndex];
        document.getElementById("entryNum").innerHTML = journalViewingIndex+1;
    }
    else {
        setMessage("Error: please write a journal entry to be viewed");
    }
}

function previousEntry() {
    if (journalIndex > 0) {
        if (journalViewingIndex > 0) {
            journalViewingIndex--;
            document.getElementById("journalViewing"). innerHTML = journal[journalViewingIndex];
            document.getElementById("entryNum").innerHTML = journalViewingIndex+1;
        }
        else {
            setMessage("Error: no previous entry.")
        }

    }
    else {
        setMessage("Error: please write a journal entry to be viewed");
    }
}

function nextEntry() {                                                                  
    if (journalIndex > 0) {                                                              
        if (journalViewingIndex < journal.length - 1) {                         
            journalViewingIndex++;                                                     
            document.getElementById("journalViewing"). innerHTML = journal[journalViewingIndex]; 
            document.getElementById("entryNum").innerHTML = journalViewingIndex+1;
        }                                                                       
        else {                                                                 
            setMessage("Error: no next entry.")                                  
        }                                                                        
                                                                                
    }                                                                             
    else {                                                                       
        setMessage("Error: please write a journal entry to be viewed");            
    }                                                                              
}                                                                               
                                                                                                 
