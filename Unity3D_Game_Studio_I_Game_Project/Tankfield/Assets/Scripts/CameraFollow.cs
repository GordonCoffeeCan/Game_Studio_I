using UnityEngine;
using System.Collections;

public class CameraFollow : MonoBehaviour {
    public Transform player1;
    public Transform player2;

    private Vector3 cameraOffset;
    private float playerDistance;
    private Camera _camera;

	// Use this for initialization
	void Start () {
        _camera = this.GetComponent<Camera>();

        cameraOffset = this.transform.position - (player1.position + player2.position) / 2;
        SetCamera();
	}
	
	// Update is called once per frame
	void Update () {
        this.transform.position = cameraOffset + (player1.position + player2.position) / 2;
        SetCamera();
	}

    private void SetCamera() {
        playerDistance = Vector3.Distance(player1.position, player2.position);
        _camera.orthographicSize = playerDistance * 0.85f;
    }
}
