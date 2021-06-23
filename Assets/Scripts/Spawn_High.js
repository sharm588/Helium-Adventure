#pragma strict
var spawnNeeded : boolean = false;
var spawnTime : int = 5;
var go : boolean = true;
var helMine : GameObject;
var crazyBomb : GameObject;
var mysteryThing : GameObject;
var powerGiver : GameObject;
function Start () {

}

function Update () {

	if (Manager.wave > 2) {

		if (Manager.gameStarted) {

			if (go) {
				go = false;
				SpawnRate ();
			}
		}

		if (spawnNeeded) {
			var spawnType = Random.Range(0, 10);
			spawnNeeded = false;
			if (spawnType < 6) {
				transform.position.y = Random.Range(-4, 8);
				Instantiate(helMine, transform.position, transform.rotation);
			}
	
			if (spawnType > 5 && spawnType < 7) {
				transform.position.y = Random.Range(-4, 8);
				var crazyB = Instantiate(crazyBomb, transform.position, transform.rotation);
				var col = Random.Range (1, 6);
				
				if (col == 1) {
					crazyB.gameObject.GetComponent.<Renderer>().material.color = Color.white;
				}
				
				if (col == 2) {
					crazyB.gameObject.GetComponent.<Renderer>().material.color = Color.red;
				}
				
				if (col == 3) {
					crazyB.gameObject.GetComponent.<Renderer>().material.color = Color.blue;
				}
			
				if (col == 4) {
					crazyB.gameObject.GetComponent.<Renderer>().material.color = Color.green;
				}
				
				if (col == 5) {
					crazyB.gameObject.GetComponent.<Renderer>().material.color = Color.yellow;
				}
				
				if (col == 6) {
					crazyB.gameObject.GetComponent.<Renderer>().material.color = Color.magenta;
				}
			}
	
			if (spawnType > 6 && spawnType < 8) {
				transform.position.y = Random.Range(-4, 8);
				Instantiate(mysteryThing, transform.position, transform.rotation);
			}
	
			if (spawnType > 7) {
				transform.position.y = Random.Range(-4, 8);
				Instantiate(powerGiver, transform.position, transform.rotation);
			}
		}
	}
}
function SpawnRate () {
	yield WaitForSeconds (spawnTime);
	spawnNeeded = true;
	go = true;
}