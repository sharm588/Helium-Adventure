#pragma strict

static var playExplo : boolean = false;

function Update () {
	if (playExplo) {
		playExplo = false;
		GetComponent(AudioSource).Play();
	}
}