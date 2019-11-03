import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ChangeEmailPopup from "../../pages/PopUps/ChangeEmailPopup";
import ChangePasswordPopup from "../../pages/PopUps/ChangePasswordPopup";
import DeleteAccountPopup from "../../pages/PopUps/DeleteAccountPopup";

import './ProfilePopup.css';


class ProfilePopup extends React.Component {
    state = {
        account: this.props.user,
        changeEmail: false,
        changePassword: false,
        deleteAccount: false
    }

    handleChangeEmailPopup = () => {
        this.setState(prevState => ({ changeEmail: !prevState.changeEmail}))
    }

    handleChangePasswordPopup = () => {
        this.setState(prevState => ({ changePassword: !prevState.changePassword}))
    }

    handleDeleteAccountPopup = () => {
        this.setState(prevState => ({ deleteAccount: !prevState.deleteAccount}))
    }

    render() {
        const { deleted, ...other } = this.props;
        return (
        	<>
            <Modal {...other} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {this.state.account.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                	<img className="profilePic" src="/profile_img.png" alt="Profile"/>

                    <label>Email: {this.state.account.email}</label>

                    <div className="profileButtons">
                    	<Button variant="secondary" onClick={this.handleChangeEmailPopup}>Change Email</Button>
                    	<Button variant="secondary" onClick={this.handleChangePasswordPopup}>Change Password</Button>
                    	<Button variant="danger" onClick={this.handleDeleteAccountPopup}>Delete Account</Button>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
            {this.state.changeEmail ? <ChangeEmailPopup show={this.state.changeEmail} onHide={() => this.setState({ changeEmail: false })} user={this.state.account} /> : null }
            {this.state.changePassword ? <ChangePasswordPopup show={this.state.changePassword} onHide={() => this.setState({ changePassword: false })} user={this.state.account} /> : null }
            {this.state.deleteAccount ? <DeleteAccountPopup show={this.state.deleteAccount} hideProfile={this.props.onHide} onHide={()=>this.setState({deleteAccount: false})} user={this.state.account} deleted={this.props.deleted}/> : null }
            </>
        )
    }
}

export default ProfilePopup;
