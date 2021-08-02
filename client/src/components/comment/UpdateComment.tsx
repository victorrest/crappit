import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import useUpdateComment from "../../hooks/comment-query/useUpdateComment";
import { Comment } from "src/types/entities/comment";
import { Button } from '../../ui';
import RichTextEditor from "src/ui/RichTextEditor";

const schema = yup.object({
	content: yup.string().required(""),
});

type Props = {
	comment: Comment,
	openEdit: boolean,
	setOpenEdit: (arg: boolean) => void;
};

interface FormValues {
	content: string;
};

const UpdateComment = ({ comment, openEdit, setOpenEdit }: Props) => {
	const { isLoading, mutate } = useUpdateComment(setOpenEdit, comment);

	const handleSubmit = ({ content }: FormValues) => {
		const newComment = {
			content,
		};
		mutate({
			commentId: comment.id,
			newComment,
		});
	};

	if (!openEdit) return null;

	return (
		<Formik
			initialValues={{ content: comment.content }}
			onSubmit={handleSubmit}
			validationSchema={schema}
		>
			{({ values, setFieldValue, isSubmitting }) => (
				<Form>
					<RichTextEditor
						value={values.content}
						placeholder="What are your thoughts?"
						name="content"
						setFieldValue={setFieldValue}
						isSubmitting={isSubmitting}
					/>
					<div className="flex justify-end gap-2">
						<Button className="w-24" onClick={() => setOpenEdit(false)}>
							Cancel
						</Button>
						<Button
							type="submit"
							loading={isLoading}
							disabled={!!!values.content}
							variant="filled"
							className="w-24"
						>
							Update
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default UpdateComment;
