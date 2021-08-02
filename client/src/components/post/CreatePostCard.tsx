import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Card, Avatar, Button } from 'src/ui';
import { useUser } from 'src/context/UserState';
import { LinkIcon, PhotographIcon } from '@heroicons/react/outline';

type Props = {
    url?: string;
};

const CreatePost = ({ url = '' }: Props) => {
    const { user } = useUser();

    return (
        <Card className="flex p-2 gap-2 items-center">
            <Link passHref href={user ? `/user/${user.id}` : "/login"}>
                <a className='h-10 w-10 flex-none'>
                    {!user || !user.avatar_image_name ? <Avatar /> : <Image alt="user avatar" src={user.avatar_image_name} width={40} height={40} className="rounded-full" />}
                </a>
            </Link>
            <Link passHref href={`${url}/submit`}>
                <a className="w-full">
                    <input placeholder="Create post" className="w-full py-2 px-4 bg-gray-100 hover:bg-white hover:border-blue-500 dark:bg-gray-800 border dark:border-gray-700 dark:hover:border-white dark:hover:bg-gray-900 rounded" />
                </a>
            </Link>
            <Link passHref href={`${url}/submit?type=photo`}>
                <Button as="a" variant="ghost" border="rounded">
                    <PhotographIcon className="h-6 w-6" />
                </Button>
            </Link>
            <Link passHref href={`${url}/submit?type=link`}>
                <Button as="a" variant="ghost" border="rounded">
                    <LinkIcon className="h-6 w-6" />
                </Button>
            </Link>
        </Card>
    );
};

export default CreatePost;