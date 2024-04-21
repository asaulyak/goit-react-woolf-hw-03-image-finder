import css from './Modal.module.css';
import { clsx } from 'clsx';
import { PureComponent } from 'react';

export class Modal extends PureComponent {
  state = {
    open: false,
    hiddenManually: false,
    url: null,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc, false);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.open !== prevState.open) {
      this.setState({
        hiddenManually: false,
        open: this.props.open,
      });
    }

    if (this.state.hiddenManually !== prevState.hiddenManually) {
      this.setState({
        open: !this.state.hiddenManually,
      });
    }
  }

  handleOverlayClick = () => {
    this.setState({ open: false });
  };

  handleEsc = event => {
    if (event.keyCode === 27) {
      this.handleOverlayClick();
    }
  };

  render() {
    return (
      <div
        className={clsx(css.overlay, {
          [css['visually-hidden']]: !this.state.open,
        })}
        onClick={this.handleOverlayClick}
      >
        <div className={css.modal}>
          {this.props.url && this.state.open && <img src={this.props.url} alt={this.props.url} />}
        </div>
      </div>
    );
  }
}
