using UnityEngine;
using System.Collections;

public class Camera_movement : MonoBehaviour {
	
	public GameObject gameObject;
	private Transform transform;
	
	// Use this for initialization
	void Start () {
		transform = gameObject.transform;
	}
	
	// Update is called once per frame
	void Update () {
		if(Input.GetKey(KeyCode.UpArrow))
			transform.Translate(0,0,(float)0.2);
		else if(Input.GetKey(KeyCode.DownArrow))
			transform.Translate(0,0,(float)-0.2);
		else if(Input.GetKey(KeyCode.RightArrow))
			transform.Rotate(0,1,0);
		else if(Input.GetKey(KeyCode.LeftArrow))
			transform.Rotate(0,-1,0);
		else if (Input.GetAxis("Mouse ScrollWheel") != 0)
			transform.Rotate(Input.GetAxis("Mouse ScrollWheel")*50,0,0);
	}
}
