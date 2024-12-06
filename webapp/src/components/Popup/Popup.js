import "./Popup.css";

export default function Popup({ children, close }) {
  return (
    <>
      <div className="modal"></div>
      <div className="modal-container">
        <div className="body">{children}</div>
      </div>
      <div className="closer" onClick={close}>
        <span className="material-symbols-outlined">close</span>
      </div>
    </>
  );
}
