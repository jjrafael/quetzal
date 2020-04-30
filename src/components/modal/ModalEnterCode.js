import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//components
import Modal from './index';
import Button from '../common/Button';
import SingleForm from '../forms/SingleForm';

//actions
import { 
  toggleEnterCodeModal, 
  toggleLoadingOverlay,
  readSession,
  initializeSession,
  editSession
} from '../../actions/session';

//misc
import { 
  // getResponse, 
  // isResType, 
  // getNow, 
  // deleteLocalStorage,
  setLocalStorage
} from '../../utils';
import { checkQuerySize } from '../../utils/data';

const mapStateToProps = state => {
  return {
    showModal: state.session.showModalEnterCode,
    session: state.session.session,
    user: state.session.user,
    userType: state.session.userType,
    deviceDetails: state.session.deviceDetails,
    submittingCode: state.session.submittingCode,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      toggleEnterCodeModal,
      toggleLoadingOverlay,
      readSession,
      initializeSession,
      editSession,
    },
    dispatch
  )
}

class ModalEnterCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haveActiveApp: this.props.session && this.props.session.status === 'active',
      haveActiveUser: this.props.user && this.props.user.status === 'active',
      code: '',
      maxChar: 6,
      verificationError: '',
      progressBar: 0,
    }
  }

  componentDidUpdate(prevProps, prevState){
      if(prevProps.session !== this.props.session){
        const haveActiveApp = this.props.session && this.props.session.status === 'active';
        this.setState({ 
          haveActiveApp, 
          progressBar: 100, 
          verificationError: '', 
        });
        this.closeLoading();
        this.closeModal();

        if(haveActiveApp){
          setLocalStorage('alias_appId', this.props.session.id);
        }
      }
  }

  removeErrorMsg() {
    this.setState({ verificationError: '' });
  }

  verifyCode(code) {
    this.props.verifyCode(code).then(res => {
      if(!res.error){
        const data = checkQuerySize(res, true);
        if(!!data && data[0] && data[0].status === 'inactive'){
          this.setState({ progressBar: 20 });
          this.verifySession(data[0]);
        }else{
          this.closeLoading('Code was not available anymore');
        }
      }else{
        this.closeLoading('Error while verifying code');
      }
    })
  }

  closeModal() {
    this.props.toggleEnterCodeModal(false);
    this.setState({ progressBar: 0, code: '' });
  }

  closeLoading(error) {
    this.props.toggleLoadingOverlay();
    if(error){
      this.setState({ verificationError: error });
    }
  }

  updateHandler = (formData) => {
    this.setState({ code: formData.code })
  }

  submitHandler = (formData) => {
    this.props.toggleLoadingOverlay(true, 'Verifying Code...');
    this.verifyCode(formData ? formData.code : this.state.code);
  }

  render() {
    const { showModal, submittingCode } = this.props;
    const { code, maxChar, verificationError } = this.state;
    const cxDisabled = !code || (code && code.length !== maxChar) ? '--disabled' : '';
    const shouldFlip = verificationError;
    const cxFlipover = shouldFlip ? '--flip' : '';
    const input = {
      id: 'code',
      type: 'text',
      placeholder: 'Code here',
      label: 'Code Verification',
      showLabel: false,
      required: true,
      validations: ['charMax-'+maxChar],
      enableEnter: true,
    }

    if(showModal){
      return (
        <Modal
            className={`--flipping --flippable ${cxFlipover}`} 
            cxOverlay="signOutModal" 
            size="m"
            id="signOutModal">
          <div className={`modal-card --back`}>
            <div className="unflip" onClick={this.removeErrorMsg.bind(this)}>X</div>
            <div className="modal-form-msg">{verificationError}</div>
          </div>
          <div className={`modal-card --front`}>
            <div className="modal__inner">
              <div className="modal__header">Code Verification</div>
                { !submittingCode ?
                  <div>
                    <div className="modal__body">
                      <SingleForm 
                        className="--on-modal"
                        formName="enter_code"
                        updateHandler={this.updateHandler}
                        onSubmit={this.submitHandler}
                        input={input}
                        noSubmitButton={true} />
                    </div>
                    <div className="modal__footer --dual-buttons">
                      <Button text="Submit" className={`--primary --plain ${cxDisabled}`} onClick={() => this.submitHandler()}/>
                      <Button text="Cancel" className="--plain" onClick={() => this.closeModal()}/>
                    </div>
                  </div>
                  : null
                }
            </div>
          </div>
        </Modal>
      );
    }else{
        return <div className="modal--blank"></div>;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEnterCode);