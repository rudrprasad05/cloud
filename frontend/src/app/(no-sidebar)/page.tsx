'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { API } from '@/constants';
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';
import { LoginState } from '@/types/enums';

function App() {
    const [state, setState] = useState<LoginState>(LoginState.LOGIN);

    if (state == LoginState.LOGIN) return <Login setState={setState} />;
    if (state == LoginState.REGISTER) return <Register setState={setState} />;
    else return <>Uhmmm</>;
}

export default App;
