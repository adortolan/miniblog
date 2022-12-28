import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    where,
    getDocs
  } from "firebase/firestore";

export const useFetchDocuments = (doCollection, search = null, uid = null) => {

    const [ documents, setDocuments ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(null);

    // deal with memory leaks
    const [ cancelled, setCancelled ] = useState(false);

    useEffect(() => {

        const fetchPost = async () => {

            if (cancelled) {
                return;
            }

            setLoading(true);

            try {

                let q;

                if (search) {
                    q = query(collection(db, doCollection), where("tagsArray", "array-contains", search), orderBy("createAt","desc"));
                } else if(uid) {
                    q = query(collection(db, doCollection), where("uid", "==", uid));

                } else {
                    q = query(collection(db, doCollection), orderBy("createAt","desc"));
                }

                await getDocs(q)
                .then((querySnapshot)=>{
                    const newData = querySnapshot.docs.map((doc) => ({
                            id:doc.id,
                            ...doc.data(),
                        }));
                        setDocuments(newData);
                });

            } catch (error) {
                console.log(error);
                setError(error.message);
            }

            setLoading(false);
        }

        fetchPost();

    }, [doCollection, search, uid, cancelled]);

    useEffect(() => {
       return () => setCancelled(true);
    }, []);

    return { documents, loading, error };
}