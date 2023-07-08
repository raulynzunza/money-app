import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import './modal.css'

interface Props {
    title: string;
    text: string;
    method: MouseEventHandler<HTMLButtonElement>;
    setModalFlag: Dispatch<SetStateAction<boolean>>
}

const index: React.FC<Props> = ({ title, text, method, setModalFlag }) => {
    return (
        <div className="modal-back position-absolute d-flex justify-content-center align-items-center">
            <div className="modal-container rounded">
                <h1>{title}</h1>
                <p>{text}</p>
                <button className="btn btn-primary" onClick={() => {
                    setModalFlag(false)
                    document.body.classList.remove('no-scroll');
                }}>Cancel</button>
                <button onClick={method} className="btn btn-danger ms-2">Log out</button>
            </div>
        </div>
    )
}

export default index
