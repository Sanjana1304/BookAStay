import React, { useContext, useEffect, useRef, useState } from 'react';
import '../UserAuth.css';
import DataContext from '../context/DataContext';
import api from '../api/axiosConfig';
import AlertIdModal from '../components/AlertIdModal';
import { useNavigate } from 'react-router-dom';

const UserAuth = () => {

  const navig = useNavigate();
  const {errorMessage, setErrorMessage,logUserId,setlogUserId,logPwd,setlogPwd,name,setName,userType,setUserType,email,setEmail,password,setPwd} = useContext(DataContext);
  
  //this is for the UI
  const switchCtnRef = useRef(null);
  const switchC1Ref = useRef(null);
  const switchC2Ref = useRef(null);
  const switchCircleRefs = useRef([]);
  const switchBtnRefs = useRef([]);
  const aContainerRef = useRef(null);
  const bContainerRef = useRef(null);

  //variables for the modal
  const [showModal, setShowModal] = useState(false);
  const [headmodalMessage,setheadmodalMessage] = useState('');
  const [modalMessage,setModalMessage] = useState('');


  const handleSignUp = async(e) => {
    e.preventDefault();
    setErrorMessage('');
    const newRecord = {
      userId:email.slice(0,email.indexOf('@'))+"@"+userType+".com",
      name:name,
      userType:userType,
      email:email,
      password:password
    }
    
    const ussu = email.slice(0,email.indexOf('@'))+"@"+userType+".com"
    try {
      await api.post(`/userRoute/register`,newRecord,{
        headers:{
          'Content-Type':"application/json"
        }
      })

      setShowModal(true);
      setheadmodalMessage("Woohoo! Registered !")
      setModalMessage(`Use ${ussu} to sign in `);
      

      setEmail('');
      setName('');
      setPwd('');
      setUserType('');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setModalMessage(error.response.data.message);
        setheadmodalMessage(" !! Oops !!")
        setShowModal(true);
      } else {
        console.log(error.message);
      }
    }
    
  };

  
  const handleSignIn = async(e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const authbody = {
        userId:logUserId,
        password:logPwd
      }
      const response = await api.post(`/authRoute/login`,authbody,{
        headers:{
          'Content-Type':'application/json'
        }
      });
      if (response.status === 200) {
        
        const { token, user } = response.data;
        document.cookie = `token=${token}; path=/; HttpOnly`;
        if (user.userId.includes('hotel')) {
          navig(`/hotelhome/${user.userId}`);
        }
        else{
          navig(`/userhome/${user.userId}`);
        }
        
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message); // Set error message from backend
    } else {
        setErrorMessage('An unexpected error occurred'); // Fallback error message
    }
    }
  };

  //this is for flip UI
  useEffect(() => {
    const changeForm = (e) => {
      if (!switchCtnRef.current || !switchC1Ref.current || !switchC2Ref.current || !aContainerRef.current || !bContainerRef.current) {
        return;
      }

      switchCtnRef.current.classList.add("is-gx");
      setTimeout(() => {
        switchCtnRef.current.classList.remove("is-gx");
      }, 1500);

      switchCtnRef.current.classList.toggle("is-txr");
      switchCircleRefs.current.forEach(circle => circle.classList.toggle("is-txr"));
      switchC1Ref.current.classList.toggle("is-hidden");
      switchC2Ref.current.classList.toggle("is-hidden");
      aContainerRef.current.classList.toggle("is-txl");
      bContainerRef.current.classList.toggle("is-txl");
      bContainerRef.current.classList.toggle("is-z200");
    };

    const buttons = switchBtnRefs.current;
    buttons.forEach(button => {
      if (button) {
      button.addEventListener("click", changeForm);
      }
    });

    return () => {
      buttons.forEach(button => {
        if (button) {
        button.removeEventListener("click", changeForm);
        }
      });
    };
  }, [switchBtnRefs]);

  return (
    <div className="main">
      {/* sign up container */}
      <div className="containerr a-container" id="a-container" ref={aContainerRef}>
        <form  className="form" onSubmit={handleSignUp}>
          <h2 className="appname">BookAStay</h2>
          <h2 className="form_title title">Create Account</h2>
          <input 
            className="form__input" 
            value={name}
            onChange={(e)=>setName(e.target.value)}
            type="text" 
            placeholder="Name" 
            required />
          <select className="form__input" value={userType} onChange={(e)=>setUserType(e.target.value)} required>
            <option value="" disabled>-- Select User Type --</option>
            <option value="user">User</option>
            <option value="hotel">Hotel Owner</option>
          </select>
          <input 
            className="form__input" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type="text" 
            placeholder="Email" 
            required />
          <input 
            className="form__input" 
            type="password" 
            value={password}
            onChange={(e)=>setPwd(e.target.value)}
            placeholder="Password" 
            required />
          <button className="form__button button submit">SIGN UP</button>
        </form>

        <AlertIdModal
          show={showModal} 
          handleClose={() => setShowModal(false)} 
          message={modalMessage}
          msg={headmodalMessage}/>
        
      </div>

      {/* login container */}
      <div className="containerr b-container" id="b-container" ref={bContainerRef}>
        <form className="form" id="b-form" onSubmit={handleSignIn}>
          <h2 className="appname">BookAStay</h2>
          <h2 className="form_title title">Sign in to Website</h2>
          <input 
            className="form__input" 
            type="email" 
            value={logUserId}
            onChange={(e)=>setlogUserId(e.target.value)}
            placeholder="UserID" 
            
            required />
          <input 
            className="form__input" 
            type="password" 
            value={logPwd}
            onChange={(e)=>setlogPwd(e.target.value)}
            placeholder="Password"
            required />
            {errorMessage && <p className="text-red font-bold">{errorMessage} !!! </p>}
          <button className="form__button button submit">SIGN IN</button>
        </form>
      </div>

      <div className="switch" id="switch-cnt" ref={switchCtnRef}>
        <div className="switch__circle" ref={el => (switchCircleRefs.current[0] = el)}></div>
        <div className="switch__circle switch__circle--t" ref={el => (switchCircleRefs.current[1] = el)}></div>
        <div className="switch__container" id="switch-c1" ref={switchC1Ref}>
          <h2 className="switch__title title">Welcome Back!</h2>
          <p className="switch__description description">Already have an account? Access your personalized experience in hotel booking by signing in to our app</p>
          <button className="switch__button button switch-btn" ref={el => (switchBtnRefs.current[0] = el)}>SIGN IN</button>

          <AlertIdModal
          show={showModal} 
          handleClose={() => setShowModal(false)} 
          message={modalMessage}
          msg={headmodalMessage}/>
        
        </div>
        <div className="switch__container is-hidden" id="switch-c2" ref={switchC2Ref}>
          <h2 className="switch__title title">New here?</h2>
          <p className="switch__description description">Let's get started on your hospitality journey! Sign up to explore a world of seamless bookings and exceptional stays.</p>
          <button className="switch__button button switch-btn" ref={el => (switchBtnRefs.current[1] = el)}>SIGN UP</button>
        </div>
      </div>

    </div>
  );
};

export default UserAuth;
