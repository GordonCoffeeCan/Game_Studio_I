using UnityEngine;
using System.Collections;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class GameManager : MonoBehaviour {
    private static GameManager _instance;

    public static GameManager Instance {
        get {
            return _instance;
        }
    }

    public Transform restartBtn;
    public Text scoreUI;

    public static int score;

    private AudioSource audio;

    public AudioClip burstSound;
    public AudioClip erosionSound;
    public AudioClip garbageSound;
    public AudioClip onFireSound;

    void Awake() {
        _instance = this;
    }

	// Use this for initialization
	void Start () {
        score = 0;
        audio = GetComponent<AudioSource>();
    }
	
	// Update is called once per frame
	void Update () {
        scoreUI.text = score.ToString();
    }

    public void ReloadLevel() {
        SceneManager.LoadScene("Main", LoadSceneMode.Single);
    }

    public void PlaySound(string _clip) {
        switch (_clip) {
            case "Burst":
                audio.clip = burstSound;
                audio.Play();
                break;
            case "Erosion":
                audio.clip = erosionSound;
                audio.Play();
                break;
            case "Garbage":
                audio.clip = garbageSound;
                audio.Play();
                break;
            case "OnFire":
                audio.clip = onFireSound;
                audio.Play();
                break;
        }
    }
}
