using UnityEngine;
using System.Collections;

public class CameraMove : MonoBehaviour {
	
	public GameObject gameObject;
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if(gameObject != null) {
			var objectLocation = gameObject.transform;
			transform.LookAt(objectLocation);
			transform.RotateAround(gameObject.transform.position,transform.TransformDirection(Vector3.up),5*Time.deltaTime);
		}
	}
}
