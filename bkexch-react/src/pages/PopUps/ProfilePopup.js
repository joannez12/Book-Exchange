import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import './ProfilePopup.css';


class ProfilePopup extends React.Component {
    state = {
        account: this.props.user
    }

    render() {
        const { changeEmail, changePassword, ...other } = this.props;
        return (
            <Modal {...other} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {this.state.account.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                	<Image src="/profile_img.png" width={100}/>

                    <label>Email: {this.state.account.email}</label>

                    <div>
                    	<Button variant="secondary" onClick={changeEmail}>Change Email</Button>
                    	<Button variant="secondary" onClick={changePassword}>Change Password</Button>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ProfilePopup;
