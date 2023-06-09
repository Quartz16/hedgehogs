

var gameObjects= {};
var coins = "coins";
var hedgehogs = "hedgehogs";
var quillsCollected = "quillsCollected";
var quillsAvailable = "quillsAvailable";
var glue = "glue";
var pens = "pens";
var ink = "ink";
var sitters = "sitters";
var gluers = "gluers";
var penmakers = "penmakers";
var pensellers = "pensellers";

var automations = {};


const journal = [];
var journalOpen = false;
var journalIndex = 0;
var journalViewingIndex = 0;

function setGameObject(name, value) {
    gameObjects[name] = value;
    var elements = document.querySelectorAll("#" + name);
    for(let i=0; i<elements.length; i++) {
        elements[i].innerHTML = value;
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
    setGameObject(sitters, 0);
    setGameObject(gluers, 0);
    setGameObject(penmakers, 0);
    setGameObject(pensellers, 0);

}

function initializeAutomations() {
    automations[hedgehogs] = [];
    automations[sitters] = [];
    automations[gluers] = [];
    automations[penmakers] = [];
    automations[pensellers] = [];
}

function updateQuillsAvailable() {
    setGameObject(quillsAvailable, gameObjects[quillsAvailable]+1);
}


function updateQuillsCollected() 
{
    if (gameObjects[hedgehogs] == 0) {
        setMessage("Error: need a hedgehog to be able to collect quills.")
        return;
    }
    if (gameObjects[quillsAvailable] > 0) {
        setGameObject(quillsAvailable, gameObjects[quillsAvailable]-1);
        setGameObject(quillsCollected, gameObjects[quillsCollected]+1);
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
            setGameObject(pens, gameObjects[pens]+1);
            setGameObject(quillsCollected, gameObjects[quillsCollected]-5);
            setGameObject(glue, gameObjects[glue]-1);
            if (gameObjects[glue] == 0) {
                hide('#glueBought');
            }
            setVisible("#pensBought", true);
        }
        else {
            setMessage("Error: not enough glue to make a pen.");
        }
    }
    else {
        setMessage("Error: not enough quills to make a pen (needs 5).");
    }
}

//function for buying normal items
function buyItem(itemName, cost)
{
    if (gameObjects[coins] >= cost) {
        setGameObject(itemName, gameObjects[itemName]+1);
        setGameObject(coins, gameObjects[coins]-cost);
        setVisible('#' + itemName + 'Bought', true);
        setMessage("Bought " + itemName + " for " + cost + " coins.");
    }
    else {
        setMessage("Error: not enough coins to buy " + itemName + " (needs " + cost + ").");
    }
}

function buyGlue() {
    buyItem('glue', 5);
}

function sellPen() {
    sellItem('pens', 10);
}

//function for buying items that perform actions every interval seconds
function buyAutomation(itemName, cost, interval, automationFunction)
{
    if (gameObjects[coins] >= cost) {
        setGameObject(itemName, gameObjects[itemName]+1);
        setGameObject(coins, gameObjects[coins]-cost);
        setVisible('#' + itemName + 'Bought', true);
        setMessage("Bought " + itemName + " for " + cost + " coins.");
        //if the interval isn't positive, there's a problem
        if (interval > 0) {
            const automation = setInterval(automationFunction, interval * 1000);
            automations[itemName].push(automation);
        }
    }
    else {
        setMessage("Error: not enough coins to buy " + itemName + " (needs " + cost + ").");
    }
}

function sellItem(itemName, cost)
{
    if(gameObjects[itemName] > 0) {
        if (gameObjects[itemName] == 1) {
            hide('#' + itemName + 'Bought');
        }
        setGameObject(itemName, gameObjects[itemName]-1);
        setGameObject(coins, gameObjects[coins]+cost);
        setMessage("Sold " + itemName + " for " + cost + " coins.");

        //if the item was an automation, we need to delete one of the setIntervals
        if (itemName in automations) {
            clearInterval((automations[itemName]).pop());
        }
    }
    else {
        setMessage("Error: no " + itemName + " left to sell.");
    }
}



function hide(elementName)
{
    var elements = document.querySelectorAll(elementName);
    for (let i=0; i<elements.length; i++) {
        elements[i].style.display = 'none';
    }
}

function setVisible(elementName, inline)
{
    var styleType;
    if (inline) {
        styleType = 'inline';
    }
    else {
        styleType = 'block';
    }
    var elements = document.querySelectorAll(elementName);
    for (let i=0; i<elements.length;i++) {
        elements[i].style.display = styleType;
    }
}

function updateJournalLength()
{
    var textLength = gameObjects[ink] * 100;
    document.getElementById('journal').setAttribute('maxlength', textLength); 
}

function writeEntry() {
    if (gameObjects[pens] >= 1) {
        if (gameObjects[ink] >= 1) {
            setVisible("#writeJournal", false);
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
        setVisible("#toggleJournalButton", true);
        hide("#writeJournal");
        inkUsed = Math.ceil(entry.length / 100);
        setGameObject(ink, gameObjects[ink]-inkUsed);
        if (gameObjects[ink] == 0) {
            hide('#inkBought');
        }
        updateJournalLength();
    }
    else {
        setMessage("Error: need a pen to write and save entries.")
    }

}

function toggleJournal() {
    if (journalIndex > 0) {
        if (journalOpen == false) {
            setVisible("#toggleJournal", false);
            document.getElementById("toggleJournalButton").textContent = "Close journal";
            entryIndex = 0;
            document.getElementById("journalViewing"). innerHTML = journal[journalViewingIndex];
            document.getElementById("entryNum").innerHTML = journalViewingIndex+1;
            journalOpen = true;
        }
        else {
            hide("#toggleJournal");
            document.getElementById("toggleJournalButton").textContent = "Open journal";
            journalOpen = false;
        }
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
                                                                                                 
