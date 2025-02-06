import React from 'react';

export default function Header() {
    return (
        <div className="grid grid-cols-12 text-muted-foreground">
            <div className="col-span-6">Name</div>
            <div className="col-span-3">Uploaded</div>
            <div className="col-span-3">Size</div>
        </div>
    );
}
