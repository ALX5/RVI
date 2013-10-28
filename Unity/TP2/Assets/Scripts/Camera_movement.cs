using UnityEngine;
using System.Collections;

public class Camera_movement : MonoBehaviour {
	
	public GameObject gameObject;
	
	// Use this for initialization
	void Start () {
	}
	
	// Update is called once per frame
	void Update () {
		var objectLocation = gameObject.transform;
		if(Input.GetKey(KeyCode.UpArrow))
			transform.Translate(0,0,(float)0.1);
		else if(Input.GetKey(KeyCode.DownArrow))
			transform.Translate(0,0,(float)-0.1);
		else if(Input.GetKey(KeyCode.RightArrow)) 
			transform.RotateAround(gameObject.transform.position,transform.TransformDirection(Vector3.up),1);
		else if(Input.GetKey(KeyCode.LeftArrow))
			transform.RotateAround(gameObject.transform.position,transform.TransformDirection(Vector3.up),-1);
	}
}
