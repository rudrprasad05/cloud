'use client';

import { DeleteMedia } from '@/actions/Media';
import { GetShare, UpdateShare } from '@/actions/Share';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Folder, Media, Share, User } from '@/types';
import {
    Check,
    Globe2,
    Group,
    Info,
    Link2,
    Lock,
    StopCircle,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { FRONTEND } from '@/constants';
import { useSession } from '@/context/useSession';
import { ComboboxDemo } from '../share/AddNewPeopleSearchCombo';
import { GetSharedBySharedId } from '@/actions/SharedUsers';

const ShareValues = [
    { name: 'Global' },
    { name: 'Restricted' },
    { name: 'Private' },
];

export default function ShareModal({
    children,
    media,
    className,
}: {
    children: ReactNode;
    media: Partial<Media> | Partial<Folder> | undefined;
    className?: string;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const router = useRouter();
    const { user } = useSession();
    const [share, setShare] = useState<Share | undefined>(undefined);
    const [presharedUsers, setPresharedUsers] = useState<User[] | undefined>(
        undefined
    );

    const [tooltipVal, setTooltipVal] = useState<string>('loading');

    if (!media) return <StopCircle />;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(
                `${FRONTEND}/shared/${share?.id}`
            );
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleShareChange = async (value: string): Promise<void> => {
        setIsLoading(true);
        try {
            await UpdateShare(share?.id as string, value);
            toast.success('Share Upated');
            router.refresh();
        } catch (error) {
            toast.error('Failed creation');
        }
        setIsLoading(false);
        await get();
    };

    const get = async () => {
        const res = await GetShare(media.id as string);
        const preSharedUsersGet = await GetSharedBySharedId(res.id as string);
        console.log(preSharedUsersGet);
        setShare(res);
        setPresharedUsers(preSharedUsersGet);
    };

    useEffect(() => {
        get();
    }, [open]);

    const handleShareValue = (type: number) => {
        switch (type) {
            case 0:
                return 'Global';
            case 1:
                return 'Restricted';
            case 2:
                return 'Private';
            default:
                return 'Private';
        }
    };

    const DisplayCorrectShare = ({
        type,
        children,
    }: {
        type: number;
        children: React.ReactNode;
    }) => {
        switch (type) {
            case 0:
                setTooltipVal('Anyone with link can view this');
                return (
                    <div className="gap-2 flex flex-row items-center">
                        <Globe2 />
                        <div className="text-sm flex items-center gap-2 grow">
                            {children}
                        </div>
                    </div>
                );
            case 1:
                setTooltipVal('Anyone youve added can view it');
                return (
                    <div className="gap-2 flex flex-row items-center">
                        <Group />
                        <div className="text-sm flex items-center gap-2 grow">
                            {children}
                        </div>
                    </div>
                );
            case 2:
                setTooltipVal('Only you can view this');
                return (
                    <div className="gap-2 flex flex-row items-center">
                        <Lock />
                        <div className="text-sm flex items-center gap-2 grow">
                            {children}
                        </div>
                    </div>
                );
            default:
                return 'Private';
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className={className}>{children}</DialogTrigger>
            <DialogContent className="" aria-description="content">
                <DialogHeader className="">
                    <DialogTitle className="flex items-center text-lg gap-4">
                        Share Media
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    {(share?.type as number) == 1 && (
                        <div>
                            <ComboboxDemo share={share} />
                            <h1>People with Access</h1>

                            <div
                                key={user?.email}
                                className="flex items-center gap-4 w-full my-2"
                            >
                                <Avatar>
                                    <AvatarImage src="" />
                                    <AvatarFallback>
                                        {user?.username?.slice(0, 2) || 'AZ'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <h1 className="">{user?.username}</h1>
                                    <p className="text-sm text-muted-foreground/70">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>
                            {presharedUsers?.map((u) => (
                                <div
                                    key={u?.email}
                                    className="flex items-center gap-4 w-full my-2"
                                >
                                    <Avatar>
                                        <AvatarImage src="" />
                                        <AvatarFallback>
                                            {u?.username?.slice(0, 2) || 'AZ'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <h1 className="">{u?.username}</h1>
                                        <p className="text-sm text-muted-foreground/70">
                                            {u?.email}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <h1>General Access</h1>
                    <DisplayCorrectShare type={share?.type as number}>
                        <Select
                            disabled={isLoading}
                            onValueChange={(value) => handleShareChange(value)}
                            defaultValue={handleShareValue(
                                share?.type as number
                            )}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a tag" />
                            </SelectTrigger>

                            <SelectContent>
                                {ShareValues?.map((i) => (
                                    <SelectItem
                                        key={i.name}
                                        value={i?.name as string}
                                    >
                                        {i.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="w-4 h-4" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{tooltipVal}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </DisplayCorrectShare>
                </div>
                <DialogFooter>
                    {share?.type === 0 && (
                        <Button
                            onClick={copyToClipboard}
                            disabled={isLoading}
                            variant={'outline'}
                        >
                            {!copied && (
                                <>
                                    <Link2 /> <span>Copy link</span>
                                </>
                            )}
                            {copied && (
                                <>
                                    <Check /> <span>Copied</span>
                                </>
                            )}
                        </Button>
                    )}

                    <Button
                        disabled={isLoading}
                        onClick={() => setIsOpen(false)}
                    >
                        Done
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
