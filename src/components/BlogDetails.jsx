const BlogDetails = ({ blog, setDetails, user, putBlog, deleteBlog }) => {

	const handleHideClick = () => {
		setDetails(false)
	}

	const handleLike = () => {
		putBlog({
			title: blog.title,
			author: blog.author,
			likes: blog.likes + 1,
			url: blog.url,
			user: blog.user.id
		}, blog.id)
	}

	const handleDelete = () => {
		deleteBlog(blog.id)
	}

	return (
		<>
			<p>{blog.title} <button type='button' onClick={handleHideClick}>Hide</button></p>
			<p>{blog.url}</p>
			<p>Likes: {blog.likes} <button type='button' onClick={handleLike}>Like</button></p>
			<p>{blog.author}</p>
			{blog.user.id === user.id ? <button type='button' onClick={handleDelete}>Delete</button> : <></>}
		</>
	)
}

export default BlogDetails