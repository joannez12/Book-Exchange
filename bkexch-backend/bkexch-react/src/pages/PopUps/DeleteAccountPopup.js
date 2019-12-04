import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {withRouter} from 'react-router-dom'

import {deleteAccount, logout} from '../../actions/user';
import {deleteTextbooks} from '../../actions/textbook';

class DeleteAccountPopup extends React.Component {
    handleDeleteAccount = () => {
        deleteTextbooks().then(() => {
            return deleteAccount()
        })
        .then(() => {
            return logout()
        })
        .then(() => {
            this.props.onHide()
            this.props.hideProfile();
            this.props.deleted();
            this.props.history.push('/')
        })
        .catch((error) => console.log(error))
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

export default withRouter(DeleteAccountPopup);
