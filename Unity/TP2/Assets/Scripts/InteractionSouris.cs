using UnityEngine;
using System.Collections;
using System;
using System.IO;

public class InteractionSouris : MonoBehaviour {
	
	RaycastHit hit;
	Ray ray;
	
	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		if(Physics.Raycast(ray,out hit,10)) {		
			if(Input.GetMouseButtonDown(0) && hit.collider.Equals(gameObject.collider)) {
				if(GameObject.Find("GUIText")) Destroy(GameObject.Find("GUIText"));
				if(GameObject.Find("GUIText(Clone)")) Destroy(GameObject.Find("GUIText(Clone)"));
				GameObject go = Instantiate(new GameObject("GUIText"), new Vector3(0.5f, 0.5f, 0.5f), Quaternion.identity) as GameObject;		
				go.AddComponent<GUIText>();
				go.guiText.text = hit.collider.gameObject.name+hit.collider.gameObject.transform.position.ToString(); 
			}	
			if(Input.GetMouseButton(0) && hit.collider.Equals(gameObject.collider)) 
				if(Input.GetKey(KeyCode.LeftControl))
					hit.collider.gameObject.transform.position = new Vector3(hit.point.x,0,hit.point.z);
		}
		Destroy (GameObject.Find("GUIText"),3);
		Destroy (GameObject.Find("GUIText(Clone)"),3);
		
	}
}
