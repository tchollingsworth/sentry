import PropTypes from 'prop-types';
import React from 'react';
import styled, {cx} from 'react-emotion';

import {t} from 'app/locale';
import InlineSvg from 'app/components/inlineSvg';
import LoadingIndicator from 'app/components/loadingIndicator';

const Toast = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 15px 0 10px;
  margin-top: 15px;
  background: #fff;
  background-image: linear-gradient(
    -180deg,
    rgba(255, 255, 255, 0.12) 0%,
    rgba(240, 238, 245, 0.35) 98%
  );
  color: ${p => p.theme.gray5};
  border-radius: 44px 5px 5px 44px;
  box-shadow: 0 0 0 1px rgba(47, 40, 55, 0.12), 0 1px 2px 0 rgba(47, 40, 55, 0.12),
    0 4px 12px 0 rgba(47, 40, 55, 0.16);
  transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.4s linear;
  position: relative;
  transform: translate3d(0, 0, 0);

  &.toast-enter {
    opacity: 0;
    transform: translate3d(0, 70px, 0);
  }

  &.toast-enter-active {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  &.toast-leave {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  &.toast-leave-active {
    opacity: 0;
    transform: translate3d(0, 70px, 0);
  }

  &:before {
    opacity: 1;
    content: '';
    display: block;
    position: fixed;
    right: -10000px;
    bottom: -40px;
    left: -10000px;
    height: 130px;
    background: linear-gradient(rgba(47, 40, 55, 0), rgba(47, 40, 55, 0.08));
    z-index: -1;
  }
`;

const Icon = styled.div`
  margin-right: 6px;
  svg {
    display: block;
  }

  color: ${p => (p.type == 'success' ? p.theme.green : p.theme.red)};
`;

const Message = styled.div`
  flex: 1;
`;

const Undo = styled.div`
  display: inline-block;
  color: ${p => p.theme.gray2};
  padding-left: 16px;
  margin-left: 16px;
  border-left: 1px solid ${p => p.theme.borderLight};
  cursor: pointer;

  &:hover {
    color: ${p => p.theme.gray3};
  }
`;

function ToastIndicator({indicator, onDismiss, className, ...props}) {
  let icon;
  let {options, message, type} = indicator;
  let {undo, disableDismiss} = options || {};
  let showUndo = typeof undo === 'function';
  const handleClick = e => {
    if (disableDismiss) return;
    if (typeof onDismiss === 'function') {
      onDismiss(indicator, e);
    }
  };

  if (type == 'success') {
    icon = <InlineSvg src="icon-circle-check" size="24px" />;
  } else if (type == 'error') {
    icon = <InlineSvg src="icon-circle-close" size="24px" />;
  }
  return (
    <Toast
      onClick={handleClick}
      className={cx(className, 'ref-toast', `ref-${type}`)}
      {...props}
    >
      {type == 'loading' ? <LoadingIndicator mini /> : <Icon type={type}>{icon}</Icon>}
      <Message>{message}</Message>
      {showUndo && <Undo onClick={undo}>{t('Undo')}</Undo>}
    </Toast>
  );
}

ToastIndicator.propTypes = {
  indicator: PropTypes.shape({
    type: PropTypes.oneOf(['error', 'success', 'loading', 'undo', '']),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    message: PropTypes.node,
    options: PropTypes.object,
  }),
  onDismiss: PropTypes.func,
};

export default ToastIndicator;
