import { useState } from "react";
import DeleteModal from "../../widgets/Modal/DeleteModal/DeleteModal";

export default function DeleteRequest() {
    const [isDelete, setIsDelete] = useState(false);
    return (
        <>
            <button className="btn-deleted" type='button' onClick={() => setIsDelete(true)}><img src='../../../../public/trash.svg' /></button>
            {isDelete && <DeleteModal onClose={() => setIsDelete(false)} type='request' />}
        </>
    )
}
