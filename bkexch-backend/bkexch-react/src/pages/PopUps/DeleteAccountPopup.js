import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import {deleteAccount} from '../../actions/user';

class DeleteAccountPopup extends React.Component {
    deletePosts(){
    }

    handleDeleteAccount = () => {
        this.deletePosts();
        /* gets users from server, requires server call */
        //users.splice(this.state.user.id - 1, 1)

        deleteAccount(this.props.user._id).then((res) => {
            if (res.status === 200) {
                this.props.hideProfile();
                this.props.deleted();
            }
        }).catch((error) => console.log(error))

    }

    render() {
        const {deleted, hideProfile, ...other } = this.props;
        return (
            <Modal {...other} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Delete Account
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="danger" onClick={this.handleDeleteAccount}>Confirm Delete Account</Button>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default DeleteAccountPopup;
