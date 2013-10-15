using UnityEngine;
using System.Collections;

public class Animation_door : MonoBehaviour {
	
	public GameObject gameObject;
	
	// Use this for initialization
	void Start () {
	}
	
	// Update is called once per frame
	void Update () {
		RaycastHit hit;
		if(Physics.Raycast(Camera.main.ScreenPointToRay(Input.mousePosition)))
			if(Input.GetMouseButton(0)) {			
				gameObject.animation.Play("door-open");
			}	
			else if(Input.GetMouseButton(1)) {
				gameObject.animation.Play("door-close");
			}	
	}
}
