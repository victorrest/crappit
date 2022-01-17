import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Topic } from 'src/types/entities/topic';
import { Card } from 'src/ui/Card';
import axios from '../../axiosConfig';
import { Avatar } from 'src/ui/Avatar';
import { Button } from 'src/ui/Button';

const ExploreTopicCard = () => {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                setLoading(true);
                const res = await axios.get("/api/topics/top");
                setLoading(false);
                setTopics(res.data.top_topics);
            } catch (err) {
                console.log(err);
            }
        };
        fetchTopics();
    }, []);

    return !loading && topics.length !== 0 ? (
        <Card>
            {topics[0].image_url ?
                <div className='relative h-20'>
                    <Image
                        alt="Topic banner"
                        src={topics[0].image_name}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                    />
                    <div className='h-full w-full absolute bg-gradient-to-t from-white dark:from-gray-850'></div>
                    <h6 className='absolute bottom-2 left-4 font-medium text-base'>Top Communities</h6>
                </div> :
                <div className="h-20 bg-blue-400 relative">
                    <div className='h-full w-full absolute bg-gradient-to-t from-white dark:from-gray-850'></div>
                    <h6 className='absolute bottom-2 left-4 font-medium text-base'>Top Communities</h6>
                </div>}
            <ol>
                {topics.map((topic, ind) =>
                    <li key={ind} className='border-b border-gray-300 dark:border-gray-700'>
                        <Link href={`/t/${topic.title}`} passHref>
                            <a className='flex items-center h-12 px-3 justify-between'>
                                <div className='flex items-center'>
                                    <span className='font-medium w-5 text-right'>{ind + 1}</span>
                                    <div className="h-8 w-8 flex rounded-full mx-2">
                                        {!topic.icon_image_name ? <Avatar /> : <Image alt="topic icon" src={topic.icon_image_name} width={32} height={32} className="rounded-full" />}
                                    </div>
                                    <span className=''>
                                        <span className='font-medium text-sm'>
                                            t/{topic.title}
                                        </span>
                                    </span>
                                </div>
                            </a>
                        </Link>
                    </li>)}
            </ol>
            <Link href="/t" passHref>
                <Button
                    className='m-3'
                    variant='filled'
                    as="a"
                >
                    View All
                </Button>
            </Link>
        </Card>
    ) : (
        <Card>
            <div className="animate-pulse flex flex-col">
                <div className="h-20 bg-gray-200 dark:bg-gray-700" />
                <div className='flex gap-2 m-2'>
                    <div className="h-8 w-8 flex-none rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div className="h-8 w-full rounded bg-gray-200 dark:bg-gray-700" />
                </div>
                <div className='flex gap-2 m-2'>
                    <div className="h-8 w-8 flex-none rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div className="h-8 w-full rounded bg-gray-200 dark:bg-gray-700" />
                </div>
                <div className='flex gap-2 m-2'>
                    <div className="h-8 w-8 flex-none rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div className="h-8 w-full rounded bg-gray-200 dark:bg-gray-700" />
                </div>
                <div className='flex gap-2 m-2'>
                    <div className="h-8 w-8 flex-none rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div className="h-8 w-full rounded bg-gray-200 dark:bg-gray-700" />
                </div>
                <div className='flex gap-2 m-2'>
                    <div className="h-8 w-8 flex-none rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div className="h-8 w-full rounded bg-gray-200 dark:bg-gray-700" />
                </div>
            </div>
        </Card>
    );
};

export default ExploreTopicCard;