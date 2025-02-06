import React from 'react';

export enum ImageTypes {
    PNG = 'png-svgrepo-com.svg',
    JPG = 'jpg-svgrepo-com.svg',
}

export default function HandleImageTypeIcon({ file }: { file: string }) {
    const handleBg = (): string => {
        let bg = '';
        if (file == 'image/jpeg') {
            bg = `url('/svg/${ImageTypes.JPG}')`;
        }
        return bg;
    };
    return (
        <div
            className="w-8 h-8"
            style={{
                backgroundImage: handleBg(),
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'white',
                filter: 'invert(1) hue-rotate(180deg) brightness(1.5) saturate(2)',
            }}
        ></div>
    );
}
