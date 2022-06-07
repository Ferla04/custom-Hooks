import { useEffect, useRef, useState } from "react";

const useFetch = (url) => {

    const [state, setState] = useState({data: null, loading: true, error: null});

    const isMonted = useRef(true); //hace una referencia a este componente 
                                   //para que se no cargue cuando ya no sea necesario

    useEffect(() => {

        return () => {
            isMonted.current = false;
        }
    },[])


    useEffect(() => {
        
        setState({data: null, loading: true, error: null});
        
        fetch(url)
            .then(res => res.json())
            .then(data => {

                if( isMonted.current){
                    setState({
                        loading: false,
                        error: null,
                        data
                    })
                }else{
                    console.log('setState no se llamó');
                }
                
            })

    }, [url])
    
    return state;
}

export default useFetch;