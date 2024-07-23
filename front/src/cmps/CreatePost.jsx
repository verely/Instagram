import { useState, useEffect } from "react";
import signV from "../assets/img/CreatePost/signV.png"
import left from "../assets/img/CreatePost/leftArrow.svg"
import close from "../assets/img/CreatePost/close.svg"
import { uploadService } from '../services/upload.service'
import { showErrorMsg } from "../services/event-bus.service";
import { addPost } from '../store/actions/post.actions.js'

const States = {
    SELECT_IMAGE: 'selectImage',
    ADD_TEXT: 'addText',
    SHARED: 'shared',
  };

export function CreatePost({ onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentStep, setCurrentStep] = useState(States.SELECT_IMAGE);
  const [fileLoadingComplete, setFileLoadingComplete] = useState(false);
  const [postText, setPostText] = useState("");
  const [imgFile, setImgFile] = useState("");

  useEffect(()=>{
    setCurrentStep(States.SELECT_IMAGE);
    setPostText("")
  },[]);

  useEffect(() => {
    if (fileLoadingComplete) {
      setCurrentStep(States.ADD_TEXT);
      setFileLoadingComplete(true);
    }
  }, [fileLoadingComplete]);

  useEffect(() => {
    if (currentStep === States.SHARED) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  async function onAddPost(post) {
    try {
        await addPost(post)
    } catch (err) {
        showErrorMsg('Cannot add post')
    }
  }

  function getLoggedInUser() {
    const imgPath = '../media_samples/img_profile/1.jpg'
    return { "_id": "u101", "userName": "Tuppence", "fullName": "Tuppence Beresford", "imgUrl": imgPath}

    // const imgPath = '../media_samples/img_profile/sloner.jpeg'
    // return { "_id": "u103", "userName": "Sloner_garden", "fullName": "Mashtelat Sloner", "imgUrl": imgPath}
    //return userService.getLoggedInUser()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
       setImgFile(file)
       const reader = new FileReader();
       reader.onloadend = () => {
         setSelectedImage(reader.result);
         setCurrentStep(States.ADD_TEXT);
         console.log("Reading completed")
         event.target.value = null;
       };
       reader.readAsDataURL(file);
    }
   };

  async function sharePost() {
    try {
      const { secure_url } = await uploadService.uploadImgFile(imgFile)
      const newPost = {
        desc: postText,
        imgUrl: secure_url
      };
      onAddPost(newPost)
      setCurrentStep(States.SHARED)
      setImgFile("")
    } catch (err) {
      console.log(`Error occurred while post sharing: ${err}`)
      showErrorMsg("Cannot share post")
    }
  }

  const owner = getLoggedInUser()

  const handleModalBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleModalBackdropClick}>

      <button className="close-button" onClick={onClose}>
        <img src={close} alt="closeImg" />
      </button>

      <div className={`modal-content ${currentStep === States.ADD_TEXT ? 'expanded' : ''}`}>
          <header>
            {currentStep === States.SELECT_IMAGE && <p className="title">Create new post</p>}

            {currentStep === States.ADD_TEXT && (
                <>
                    <button className="prev" onClick={() => setCurrentStep(States.SELECT_IMAGE)}>
                        <img src={left} alt="left" />
                    </button>
                    <p className="title">Add text to your post</p>
                    <button className="next" onClick={sharePost}>Share</button>
                </>
                )}

            {currentStep === States.SHARED && <p className="title">Post shared</p>}

            <hr/>
          </header>


          <div className={`modal-content-area ${currentStep} === States.SELECT_IMAGE ? 'expanded' : ''`}>
            {currentStep === States.SELECT_IMAGE && (
              <div className="currentStep">
                <button onClick={() => document.getElementById("fileInput").click()}>
                  Select From Computer
                </button>
              </div>
            )}

            {currentStep === States.ADD_TEXT && (
                <div className="adding-post-details">
                    <div className="selected-image-container">
                      <img src={selectedImage} alt="Selected" />
                    </div>
                    <div className="post-text-area">
                      <div className="post-owner-details">
                        <img className="owner-icon" src={owner.imgUrl} alt={owner.userName} />
                        <span className="owner-username">{owner.userName}</span>
                      </div>
                      <textarea
                          value={postText}
                          onChange={(e) => setPostText(e.target.value)}
                          placeholder="Write a caption..."
                      />
                    </div>
                </div>
            )}
            {currentStep === States.SHARED && (
                <div className="currentStep">
                    <img className="signV" src={signV} alt="signV" />
                    <p>Your post has been shared.</p>
                </div>
            )}


          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
}
