import { useState, useEffect, useReducer } from "react";
import { db } from '../firebase/config';
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null,
}

const DeleteReducer = (state, action) => {
    switch(action.type) {
        case "LOADING":
            return {loading: true, error: null}
        case "DELETED_DOC":
            return {loading: false, error: null}
        case "ERROR":
            return {loading: false, error: action.payload}
        default:
            return state;
    }
};

export const useDeleteDocument = (docColletion) => {
    const [response, dispatch] = useReducer(DeleteReducer, initialState)

    // deal with memory leaks
    const [cancelled, setCancelled] = useState(true);

    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action);
        }
    };

    const deleteDocument = async(id) => {

        checkCancelBeforeDispatch({
            type: "LOADING",
        });

        try {

            const deleteDocument = await deleteDoc(doc(db, docColletion, id));

            checkCancelBeforeDispatch({
                type: "DELETED_DOC",
                payload: deleteDocument,
            });

        } catch (error) {
            checkCancelBeforeDispatch({type: "ERROR", payload: error.message});
        }
    }

    useEffect(() => {
        return () => setCancelled(false);
    }, []);

    return { deleteDocument, response };
}