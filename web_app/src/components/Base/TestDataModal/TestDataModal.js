import React, { useCallback, useEffect, useRef, useState } from "react";
import classes from './TestDataModal.module.css';


//redux

const TestDataModal = (props) => {
    const [showModal, setShowModal] = useState(true);
    
    const clickAwayHandler = useCallback(() => {
        setShowModal(!showModal);
    }, [setShowModal, showModal]);
    const { onClickOutside } = props;
    
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            onClickOutside && onClickOutside();
            clickAwayHandler();
        }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
        document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClickOutside, clickAwayHandler]);

    let modal = null;
    if (showModal) {
        modal = (
            <div  ref={ref} className={classes.TestDataBanner}>
                <p>Currently using test data!</p>
                <p>Will update in due time.</p>
                <p>Please be patient 😅</p>
            </div>
        );
    } else {
        modal = null;
    }
    
    return modal;
};

export default TestDataModal;