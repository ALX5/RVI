using UnityEngine;
using System.Collections;

public class Take_key : MonoBehaviour {
	
	RaycastHit hit;
	Ray ray;
	
	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		if(Physics.Raycast(ray,out hit,4))
			if(Input.GetMouseButton(0) && hit.collider.Equals(gameObject.collider)) {	
				print ("You take the "+gameObject+".");
				Destroy(gameObject);
				GameObject.FindGameObjectWithTag("Securited Door").animation.Play("door-open");
			}	
	}
}