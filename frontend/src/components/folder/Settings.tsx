'use client';

import { Download, Edit, Pen, Share, Star, UserPlus } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

export default function Settings() {
    return (
        <div className="flex items-center gap-2">
            <button className="rounded-full hover:bg-background/50 text-white transition p-1">
                <Download className="w-4 h-4" />
            </button>
            <button className="rounded-full hover:bg-background/50 text-white transition p-1">
                <Star className="w-4 h-4" />
            </button>
            <button className="rounded-full hover:bg-background/50 text-white transition p-1">
                <Pen className="w-4 h-4" />
            </button>
            <button className="rounded-full hover:bg-background/50 text-white transition p-1">
                <UserPlus className="w-4 h-4" />
            </button>
        </div>
    );
}
