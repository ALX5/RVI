using UnityEngine;
using System.Collections;

public class Animation_hero : MonoBehaviour {
	
	// Use this for initialization
	void Start () {
	}
	
	// Update is called once per frame
	void Update () {
		float speed = 1;	
		if(Input.GetKey(KeyCode.RightShift)) {
			speed = 2;
			if(Input.GetKey(KeyCode.UpArrow)||Input.GetKey(KeyCode.DownArrow))
				gameObject.animation.Play("soldierSprint");
		} else if(Input.GetKey(KeyCode.UpArrow)||Input.GetKey(KeyCode.DownArrow))
				gameObject.animation.Play("soldierWalk");
		else gameObject.animation.Play("soldierIdleRelaxed");
		CharacterController controller = GetComponent<CharacterController>();
		controller.transform.Rotate(new Vector3(0,Input.GetAxis("Horizontal")*(float)3,0));
		controller.Move(transform.TransformDirection(new Vector3(0, 0, Input.GetAxis("Vertical") * (float)0.1*speed)));
	}
}
