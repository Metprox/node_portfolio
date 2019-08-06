import React, { useState, useEffect } from 'react';

const Resize = props => {
    const [defaultWidth, setDefaultWidth] = useState(1440);
    const [defaultFont, setDefaultFont] = useState(16);
    const [minWidth, setMinWidth] = useState(768);
    const [minHeight, setMinHeight] = useState(600);
    const [defaultHeight, setDefaultHeight] = useState(800);
    const [fSize, setFSize] = useState(16);
    const [checkMobile, setCheckMobile] = useState(false);
    const [vW, setVW] = useState(window.innerWidth);
    const [vH, setVH] = useState(window.innerHeight);

    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    });

    const onResize = () => {
        setVW(window.innerWidth);
        setVH(window.innerHeight);
        setFSize(
            checkMobile
                ? 16
                : defaultFont *
                      Math.min(
                          Math.max(minWidth, vW) / defaultWidth,
                          Math.max(minHeight, vH) / defaultHeight,
                      ).toFixed(2),
        );
        if (vW < minWidth) {
            setCheckMobile(true);
        } else {
            setCheckMobile(false);
        }
    };

    const appFontSize = {
        fontSize: fSize + 'px',
    };
    return (
        <div className="app" style={appFontSize}>
            {props.children}
        </div>
    );
};

export default Resize;
