import PropTypes from "prop-types";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useRef } from "react";
import "./style.css";

export const Drawer = ({
  isOpen,
  position,
  onClose,
  children,
  title,
  footer,
}) => {
  const bodyRef = useRef(document.querySelector("body"));

  useEffect(() => {
    const updatePageScroll = () => {
      if (isOpen) {
        bodyRef.current.style.overflow = "hidden";
      } else {
        bodyRef.current.style.overflow = "";
      }
    };

    updatePageScroll();
  }, [isOpen]);

  return (
    <div
      aria-hidden={isOpen ? "false" : "true"}
      className={`drawer-container ${isOpen ? "open" : ""}`}
    >
      <div className={`drawer ${position}`} role="dialog">
        <div className="drawer-wrapper">
          <div className="drawer-header">
            <div className="drawer-title">{title}</div>
            <IoCloseOutline size={20} cursor={"pointer"} onClick={onClose} />
          </div>
          <div className="drawer-content">{children}</div>
          {footer ? <div className="drawer-footer">{footer}</div> : <></>}
        </div>
      </div>
      <div className="backdrop" />
    </div>
  );
};

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  position: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  footer: PropTypes.element,
};

Drawer.defaultProps = {
  position: "right",
  title: "Drawer Title",
};
