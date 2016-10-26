using UnityEngine;
using System.Collections;

public class Bins : MonoBehaviour {
    public Transform trashGuyPart;
    public Transform recycleGuyPart;

    public Transform burst;
    public Transform acidErosion;
    public Transform onFire;

    // Use this for initialization
    void Start () {
        
    }
	
	// Update is called once per frame
	void Update () {
	
	}

    private void OnTriggerEnter2D(Collider2D _garbage) {
        switch (this.name){
            case "RecycleGuy":
                if (_garbage.tag == "Recycle") {
                    GameManager.score++;
                    GameManager.Instance.PlaySound("Garbage");
                    Destroy(_garbage.gameObject);
                }else if (_garbage.tag == "Acid" || _garbage.tag == "Bomb" || _garbage.tag == "Gas") {
                    KillPlayer(_garbage, recycleGuyPart);
                } else {
                    _garbage.gameObject.tag = "Missed";
                }
                break;
            case "TrashGuy":
                if (_garbage.tag == "Trash") {
                    GameManager.score++;
                    GameManager.Instance.PlaySound("Garbage");
                    Destroy(_garbage.gameObject);
                } else if (_garbage.tag == "Acid" || _garbage.tag == "Bomb" || _garbage.tag == "Gas") {
                    KillPlayer(_garbage, trashGuyPart);
                } else {
                    _garbage.gameObject.tag = "Missed";
                }
                break;
            case "FireFighter":
                if (_garbage.tag == "Acid" || _garbage.tag == "Bomb" || _garbage.tag == "Gas") {
                    GameManager.score += 10;
                    GameManager.Instance.PlaySound("Garbage");
                    Destroy(_garbage.gameObject);
                }else if (_garbage.tag == "Recycle" || _garbage.tag == "Trash") {
                    _garbage.gameObject.tag = "Missed";
                }
                break;
        }
    }

    private void KillPlayer(Collider2D _col, Transform _part) {
        switch (_col.tag) {
            case "Bomb":
                GameManager.Instance.PlaySound("Burst");
                Instantiate(_part, this.transform.position, Quaternion.identity);
                Instantiate(burst, _col.transform.position, Quaternion.identity);
                Destroy(GameObject.Find("Player").gameObject);
                GameObject.Find("GameManager").GetComponent<GameManager>().restartBtn.gameObject.SetActive(true);
                break;
            case "Acid":
                GameManager.Instance.PlaySound("Erosion");
                Instantiate(acidErosion, this.transform.position, Quaternion.identity);
                Destroy(GameObject.Find("Player").gameObject);
                GameObject.Find("GameManager").GetComponent<GameManager>().restartBtn.gameObject.SetActive(true);
                break;
            case "Gas":
                GameManager.Instance.PlaySound("OnFire");
                Instantiate(onFire, this.transform.position, Quaternion.identity);
                Destroy(GameObject.Find("Player").gameObject);
                GameObject.Find("GameManager").GetComponent<GameManager>().restartBtn.gameObject.SetActive(true);
                break;
        }
        Destroy(_col.gameObject);
    }
}
