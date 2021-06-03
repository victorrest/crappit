import { useMutation } from "react-query";
import { createStandaloneToast } from "@chakra-ui/toast";
import axios from "../../axiosConfig";

async function commentVoting({ commentId, vote }) {
	try {
		const res = await axios.put(
			`/api/comment/${commentId}/changevote?vote=${vote}`
		);
		return res.data;
	} catch (err) {
		throw err.response.data;
	}
}

export default function useCommentVoting(comment) {
	return useMutation(commentVoting, {
		onSuccess: (res) => {
			comment.vote = res.vote;
			comment.user_vote = res.user_vote;
		},
		onError: (err) => {
			const toast = createStandaloneToast();
			toast({
				description: err.status.text,
				status: err.status.severity,
			});
		},
	});
}
