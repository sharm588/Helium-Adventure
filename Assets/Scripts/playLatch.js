#pragma strict

static var playLatch : boolean = false;


function Update () {
	if (playLatch) {
		playLatch = false;
		GetComponent(AudioSource).Play();
	}
}