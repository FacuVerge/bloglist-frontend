import { useState } from 'react'
import BlogDetails from './BlogDetails'

const Blog = ({ blog, user, putBlog, deleteBlog }) => {

	const [details, setDetails] = useState(false)

	const handleViewClick = () => {
		setDetails(true)
	}

	return (
		<>
			{details ?
				<BlogDetails blog={blog} setDetails={setDetails} user={user} putBlog={putBlog} deleteBlog={deleteBlog}/> :
				<div>
					{blog.title}
					<button type='button' onClick={handleViewClick}>View</button>
				</div>
			}
		</>
	)

}

export default Blog