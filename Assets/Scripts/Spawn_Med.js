#pragma strict

var spawn : boolean = true;

var redBox : GameObject;

function Start () {

}

function Update () {
	if (Manager.gameStarted) {
	
		if (spawn) {
			spawn = false;
			var whichSpawn = Random.Range (1, 1);
		
			if (whichSpawn == 1) {
				transform.position.y = Random.Range ( -2, 6);
				Instantiate (redBox, transform.position, transform.rotation);
				SpawnAgain ();
			}
		}
	}
}

function SpawnAgain () {
	yield WaitForSeconds (2);
	spawn = true;
}