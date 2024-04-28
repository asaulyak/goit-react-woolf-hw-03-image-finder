import css from './Modal.module.css';
import { PureComponent } from 'react';

export class Modal extends PureComponent {
  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc, false);
  }

  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  handleEsc = event => {
    if (event.keyCode === 27) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.handleOverlayClick}>
        <div className={css.modal}>
          {this.props.url && <img src={this.props.url} alt={this.props.url} />}
        </div>
      </div>
    );
  }
}
