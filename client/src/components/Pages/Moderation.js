import React, { useContext } from "react";
import { Container, Divider, Heading, Image, Text } from "@chakra-ui/react";
import useTopic from "../../hooks/topic-query/useTopic";
import { UserContext } from "../../context/UserState";
import Card from "../Utils/Card";
import UpdateTopic from "../Topic/UpdateTopic";
import AlertStatus from "../Utils/AlertStatus";
import SkeletonCard from "../Utils/SkeletonCard";
import AddModerator from "../Topic/AddModerator";

const Moderation = ({ match }) => {
	const { user } = useContext(UserContext);
	const {
		isLoading: topicLoading,
		isError: topicIsError,
		data: topicData,
		error: topicError,
	} = useTopic(match.params.topic);

	if (topicLoading) return <SkeletonCard />;
	if (topicIsError) return <AlertStatus status={topicError} />;

	return (
		<Container mt="3" maxW="container.md">
			{topicData.topic.user_moderator_id === user.id ? (
				<Card>
					<Heading>Topic Settings</Heading>
					<Divider my="3" />
					<Heading size="md">Current Banner</Heading>
					{topicData.topic.image_url ? (
						<Image
							alt={topicData.topic.image_name}
							src={topicData.topic.image_url}
							maxHeight="200px"
						/>
					) : (
						<div>Image is not set...</div>
					)}
					<Heading size="md">Current Description</Heading>
					<Text>{topicData.topic.description}</Text>
					<Heading size="md">Current Headline</Heading>
					<Text>{topicData.topic.headline}</Text>
					<Divider my="3" />
					<Heading size="md">Description and Banner</Heading>
					<UpdateTopic topic={topicData.topic} />
					<Divider my="3" />
					<Heading size="md">Moderators</Heading>
					<AddModerator topic={topicData.topic} />
				</Card>
			) : (
				<div>You are not a moderator of this topic</div>
			)}
		</Container>
	);
};

export default Moderation;
