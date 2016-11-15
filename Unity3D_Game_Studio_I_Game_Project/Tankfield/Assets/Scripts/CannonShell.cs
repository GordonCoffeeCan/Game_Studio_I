using UnityEngine;
using System.Collections;

public class CannonShell : MonoBehaviour {
    public Transform burstDust;

    private Vector3 massCenter;
    private Rigidbody _rigidbody;
    private float damage = 20;

    private AudioSource _audio;
    private MeshRenderer _render;

	// Use this for initialization
	void Start () {
        _audio = this.GetComponent<AudioSource>();
        _render = this.GetComponent<MeshRenderer>();
        massCenter = new Vector3(0, 0, 0.1f);
        _rigidbody = this.GetComponent<Rigidbody>();
        _rigidbody.centerOfMass = massCenter;
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    void OnCollisionEnter(Collision _collistion) {
        if (_render.enabled == true) {
            Instantiate(burstDust, this.transform.position, burstDust.rotation);
            _audio.Play();
            if (_collistion.gameObject.tag == "Tank") {
                TankController _tank;
                _tank = _collistion.gameObject.GetComponent<TankController>();
                _tank.isHit = true;
                _tank.health -= damage;
                _collistion.rigidbody.AddForce(_rigidbody.transform.forward * _rigidbody.velocity.magnitude * 0.15f, ForceMode.Impulse);
            }

            _render.enabled = false;
        }
    }
}
