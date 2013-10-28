using UnityEngine;
using System.Collections;

public class Animation_door : MonoBehaviour {
	
	RaycastHit hit;
	Ray ray;
	
	// Use this for initialization
	void Start () {
	}
	
	// Update is called once per frame
	void Update () {
		ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		if(Physics.Raycast(ray,out hit,6))
			if(Input.GetMouseButton(0) && hit.collider.Equals(gameObject.collider))			
				GameObject.FindGameObjectWithTag("Door").animation.Play("door-open");
			else if(Input.GetMouseButton(1) && hit.collider.Equals(gameObject.collider)) 
				GameObject.FindGameObjectWithTag("Door").animation.Play("door-close");
	}
}
