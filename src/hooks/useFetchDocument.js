import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc } from "firebase/firestore";

export const useFetchDocument = (doCollection, id) => {

    const [ document, setDocument ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(null);

    // deal with memory leaks
    const [ cancelled, setCancelled ] = useState(false);

    useEffect(() => {

        const loadDocument = async () => {

            if (cancelled) {
                return;
            }

            setLoading(true);

            try {

                let q;
                q = doc(db, doCollection, id)

                const docSnap = await getDoc(q);
                setDocument(docSnap.data());
                setLoading(false);


            } catch (error) {
                console.log(error);
                setError(error.message);
                setLoading(true);
            }

            setLoading(false);
        }

        loadDocument();

    }, [doCollection, id, cancelled]);

    useEffect(() => {
       return () => setCancelled(true);
    }, []);

    return { document, loading, error };
}