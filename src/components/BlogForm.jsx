import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')

	const handleAuthorChange = (event) => {
		setNewAuthor(event.target.value)
	}

	const handleTitleChange = (event) => {
		setNewTitle(event.target.value)
	}

	const handleUrlChange = (event) => {
		setNewUrl(event.target.value)
	}

	const addBlog = (event) => {
		event.preventDefault()
		createBlog({
			title: newTitle,
			author: newAuthor,
			url: newUrl
		})

		setNewTitle('')
		setNewAuthor('')
		setNewUrl('')

	}

	return(
		<form onSubmit={addBlog}>
			<div>
				Title:
				<input
					data-testid='title'
					value={newTitle}
					onChange={handleTitleChange}
					id='blog-title'
				/>
			</div>
			<div>
				Author:
				<input
					data-testid='author'
					value={newAuthor}
					onChange={handleAuthorChange}
					id='blog-author'
				/>
			</div>
			<div>
				Url:
				<input
					data-testid='url'
					value={newUrl}
					onChange={handleUrlChange}
					id='blog-url'
				/>
			</div>
			<button type="submit">Save</button>
		</form>
	)
}

export default BlogForm