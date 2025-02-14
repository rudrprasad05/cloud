import { redirect } from 'next/navigation';
import React from 'react';

export default function page() {
    return redirect('/');
    return <div>403 Await Redirect</div>;
}
