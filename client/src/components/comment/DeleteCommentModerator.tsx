import React, { useState, useRef } from "react";
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Button,
} from "@chakra-ui/react";
import useDeleteCommentModerator from "../../hooks/comment-query/useDeleteCommentModerator";
import { Comment } from "src/types/entities/comment";

type Props = {
	comment: Comment;
};

const DeleteCommentModerator = ({ comment }: Props) => {
	const [open, setOpen] = useState(false);
	const { isLoading, mutate } = useDeleteCommentModerator(comment, setOpen);
	const cancelRef = useRef(null);

	return (
		<>
			<Button size="xs" onClick={() => setOpen(true)} variant="ghost">
				Delete as Moderator
			</Button>
			<AlertDialog
				isOpen={open}
				onClose={() => setOpen(false)}
				isCentered
				leastDestructiveRef={cancelRef}
			>
				<AlertDialogOverlay />
				<AlertDialogContent>
					<AlertDialogHeader id="form-dialog-title">
						Delete comment?
					</AlertDialogHeader>
					<AlertDialogBody>
						Are you sure you want to delete this post? You can't undo this.
					</AlertDialogBody>
					<AlertDialogFooter>
						<Button onClick={() => setOpen(false)} mr="2" ref={cancelRef}>
							Cancel
						</Button>
						<Button
							onClick={() => {
								mutate({
									commentId: comment.id,
								});
							}}
							isLoading={isLoading}
							colorScheme="red"
						>
							Delete
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default DeleteCommentModerator;