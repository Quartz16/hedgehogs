const gameObjects = {
    quillsCollected: 0,
    quillsDropped:0,
};

function updateQuillsDropped() {
    gameObjects.quillsDropped++;
}


function updateQuillsCollected() 
{
    if (gameObjects.quillsDropped > 0) {
        gameObjects.quillsCollected++;
        gameObjects.quillsDropped--;
        console.log(gameObjects.quillsCollected + " " + gameObjects.quillsDropped);
        document.getElementById("quills").innerHTML = gameObjects.quillsCollected;
    }
}
