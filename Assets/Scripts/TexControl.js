#pragma strict

var One : Sprite;

var Two : Sprite;

var Three : Sprite;

var Four : Sprite;

var Five : Sprite;

function Update () {

if (Stages.loadOne) {
	GetComponent(SpriteRenderer).sprite = One;
}
if (Stages.loadTwo) {
	GetComponent(SpriteRenderer).sprite = Two;
}
if (Stages.loadThree) {
	GetComponent(SpriteRenderer).sprite = Three;
}
if (Stages.loadFour) {
	GetComponent(SpriteRenderer).sprite = Four;
}
if (Stages.loadFive) {
	GetComponent(SpriteRenderer).sprite = Five;
}
}