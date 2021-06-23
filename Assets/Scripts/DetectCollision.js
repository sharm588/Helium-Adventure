#pragma strict

function Start () {

}

function Update () {

}
function OnTriggerEnter2D (other : Collider2D) {
	if (other.gameObject.GetComponent(Connect_Script).shaken && !other.gameObject.GetComponent(Connect_Script).counted && other.gameObject.name == "Instance " + other.gameObject.GetInstanceID()) {
		other.gameObject.GetComponent(Connect_Script).counted = true;
		other.gameObject.tag = "Creatures";
		Score_Keeping.peopleScore += 1;
		Score_Keeping.AddToTotalCreaturesSaved();
	}
	else if (other.GetComponent.<Collider>().tag == "Creatures(Attached)" && other.gameObject.GetComponent(Connect_Script).shaken && !other.gameObject.GetComponent(Connect_Script).counted && other.gameObject.name != "Instance " + other.gameObject.GetInstanceID()) {
		other.transform.parent.GetComponent(Connect_Script).counted = true;
		other.gameObject.tag = "Creatures";
		Score_Keeping.peopleScore += 1;
		Score_Keeping.AddToTotalCreaturesSaved();
	}
}