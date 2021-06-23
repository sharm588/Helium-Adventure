#pragma strict

var timer : float = 5.0;
var randomExpression : int;
var expression : SpriteRenderer;
var openMouth : Sprite;
var sad : Sprite;
var happy : Sprite;
var smile : Sprite;

function Start () {

}

function Update () {

	if (timer > 0) {
		timer -= Time.deltaTime;
	}

	if (timer <= 0) {
		randomExpression = Random.Range(0, 3);
		
		if (randomExpression == 0) {
			transform.localPosition.y = -0.15;
			expression.sprite = smile;
			timer = 5;
		}
	
		if (randomExpression == 1) {
			transform.localPosition.y = -0.07;
			expression.sprite = openMouth;
			timer = 5;
		}
		
		if (randomExpression == 2) {
			transform.localPosition.y = -0.15;
			expression.sprite = happy;
			timer = 5;
		}
		
		if (randomExpression == 3) {
			transform.localPosition.y = -0.07;
			expression.sprite = openMouth;
			timer = 5;
		}
	}
}