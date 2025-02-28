import React, {useEffect} from "react";
import validator from "validator";
import UnderlineGrey from "../UnderlineGrey/UnderlineGrey";
import InfoToolTip from "../InfoToolTip/InfoToolTip";
import './Profile.css';

function Profile ({ currentUser, isEmailConflicted, name, email, setName, setEmail, onLogOut, onUpdateUser }) {
    const [isInfoToolTipOpen, setInfoToolTipOpen] = React.useState(false);
    const [isNameChanged, setNameChanged] = React.useState(false);
    const [isEmailChanged, setEmailChanged] = React.useState(false);
    const [isNameValid, setNameValid] = React.useState(true);
    const [isEmailValid, setEmailValid] = React.useState(true);
    const [isAllowed, setAllowed] = React.useState(false);
    const [isUpdateSucceed, setUpdateSucceed] = React.useState(false);
    const handleNameChange = (evt) => {
        setName(evt.target.value);
        setNameValid(evt.target.value.length>1 && evt.target.value.length<31);
    }
    const handleEmailChange = (evt) => {
        setEmail(evt.target.value);
        setEmailValid(validator.isEmail(evt.target.value));
    }
    useEffect(()=>{
        setEmailChanged(!(email===currentUser.email))
    },[email, currentUser.email])
    useEffect(()=>{
        setNameChanged(!(name===currentUser.name))
    },[name, currentUser.name])
    useEffect(()=> {
        if (isEmailConflicted) {
            setEmail(currentUser.email)
            setName(currentUser.name)
            document.getElementById('name').value=name;
            document.getElementById('email').value=email;
            setUpdateSucceed(false);
        }
        else {
            setUpdateSucceed(true)
        }
    },[isEmailConflicted, isUpdateSucceed])
    const handleUpdate = (e) => {
        e.preventDefault();
        if (isAllowed){
            onUpdateUser();
            setUpdateSucceed(true);
            setInfoToolTipOpen(true)
        } else {
            setUpdateSucceed(false);
            setInfoToolTipOpen(false)
        }
        setAllowed(false);
    }
    React.useEffect(()=>{
        if ((isEmailChanged || isNameChanged) && isNameValid && isEmailValid) {
            setAllowed(true)
        } else setAllowed(false)
    },[isEmailChanged, isNameChanged , isEmailValid, isNameValid])

    return (
        <main>
            <section className="Profile">
                <InfoToolTip isEmailConflicted={isEmailConflicted} isSucceed={isUpdateSucceed} isOpen={isInfoToolTipOpen} setOpen={setInfoToolTipOpen} />
                <form name="change-profile-form" className="profile__form" noValidate onSubmit={handleUpdate}>
                    <h2 className="profile__greeting">{`Привет, ${name}!`}</h2>
                    <div className="profile__input-container">
                        <label htmlFor="name" className="profile__input-label">Имя</label>
                        <input type="text" id="name" className="profile__input" defaultValue={name} onChange={handleNameChange} />
                    </div>
                    <UnderlineGrey />
                    <div className="profile__input-container">
                        <label htmlFor="email" className="profile__input-label">E-mail</label>
                        <input type="text" id="email" className="profile__input" defaultValue={email} onChange={handleEmailChange} />
                    </div>
                    <button className="profile__submit-button">
                        <p className="profile__submit-button-text" onClick={handleUpdate}>Редактировать</p>
                    </button>
                    <p className="profile__logout" onClick={onLogOut}>Выйти из аккаунта</p>
                </form>
            </section>
        </main> 
    )
}

export default Profile