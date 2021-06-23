#pragma strict

var go : boolean = true; 
var flyingMethod : int = 1;
var largeBalloon : GameObject;

function Start () {

}

function Update () {

	if (flyingMethod == 1) {
		
		if (go) {
			go = false;
			//gameObject.AddComponent(Rigidbody2D);
			//GetComponent(Rigidbody2D).mass = 0.1;
			largeBalloon.SetActive(true);
		}
	}

}