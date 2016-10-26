using UnityEngine;
using System.Collections;

public class throwObjects : MonoBehaviour {
    private string buildingName;
    private int forceDirection;
    private float force = 2;

    public Rigidbody2D[] garbages;
    public Transform[] leftThrowPoint;
    public Transform[] rightThrowPoint;

    private float gapTime = 1.8f;
    private float timer;

    // Use this for initialization
    void Start () {
        timer = gapTime;
}
	
	// Update is called once per frame
	void Update () {
        timer -= Time.deltaTime;
        if(timer <= 0) {
            timer = gapTime * Random.Range(0.85f, 1.35f);
            int _buildingID = Random.Range(0, 2);
            if(_buildingID == 0) {
                //Debug.Log("Left_Building" + _pointID);
                forceDirection = 1;
                Rigidbody2D _garbage = (Rigidbody2D)Instantiate(garbages[Random.Range(0, 9)], leftThrowPoint[Random.Range(0, 3)].position, Quaternion.identity);
                _garbage.AddForce(new Vector2(force * forceDirection * Random.Range(0.8f, 3.5f), 0), ForceMode2D.Impulse);
                _garbage.angularVelocity = Random.Range(-520, 520);
            } else if(_buildingID == 1) {
                //Debug.Log("Right_Building" + _pointID);
                forceDirection = -1;
                Rigidbody2D _garbage = (Rigidbody2D)Instantiate(garbages[Random.Range(0, 9)], rightThrowPoint[Random.Range(0, 3)].position, Quaternion.identity);
                _garbage.AddForce(new Vector2(force * forceDirection * Random.Range(0.65f, 1.65f), 0), ForceMode2D.Impulse);
                _garbage.angularVelocity = Random.Range(-520, 520);
            }
        }
	}
}
