#pragma strict

var moveSpeed : int = 40;

static var damage : int = 25;

var go : boolean = true;

var randomColor : int;

function Start () {

}

function Update () {

	if (go) {
		go = false;
		randomColor = Random.Range (0, 2);
		
		if (randomColor == 0) {
			GetComponent(SpriteRenderer).color = Color.red;
		}
		
		if (randomColor == 1) {
			GetComponent(SpriteRenderer).color = Color.green;
		}
		
		if (randomColor == 2) {
			GetComponent(SpriteRenderer).color = Color.blue;
		}
	}

	if (transform.parent == null) {
		transform.Translate(Vector3.left * Time.deltaTime * moveSpeed);
	}
}