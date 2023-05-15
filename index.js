const gameObjects = {
    coins: 100,
    quillsCollected: 0,
    quillsAvailable:0,
};

var hedgehogs = 0;

function updateQuillsAvailable() {
    console.log(hedgehogs)
    gameObjects.quillsAvailable++;
}


function updateQuillsCollected() 
{
    if (gameObjects.quillsAvailable > 0) {
        gameObjects.quillsCollected++;
        gameObjects.quillsAvailable--;
        document.getElementById("quills").innerHTML = gameObjects.quillsCollected;
        document.getElementById("message").innerHTML = "Collected a quill."
    }
    else {
        document.getElementById("message").innerHTML = "Error: no quills available to collect."
    }
}

function buyHedgehog()
{
    if (gameObjects.coins >= 50) {
        hedgehogs++;
        gameObjects.coins -= 50;
        document.getElementById("hedgehogs").innerHTML = hedgehogs;
        document.getElementById("coins").innerHTML = gameObjects.coins;
        document.getElementById("message").innerHTML = "Bought a hedgehog for 50 coins."
    }
    else {
        document.getElementById("message").innerHTML = "Error: not enough coins to buy a hedgehog."
    }
}
