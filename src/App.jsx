import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [messageType, setMessageType] = useState('success')
	const [message, setMessage] = useState(null)
	const [user, setUser] = useState(null)

	const blogFormRef = useRef()

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const notificate = (message, messageType) => {
		setMessageType(messageType)
		setMessage(message)
		setTimeout(() => {
			setMessage(null)
		}, 5000)
	}

	const addBlog = (blogObject) => {
		blogFormRef.current.toggleVisibility()
		blogService
			.create(blogObject)
			.then(returnedBlog => {
				setBlogs(blogs.concat(returnedBlog))
				notificate('A new Blog was created!', 'success')
			})
	}


	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password,
			})
			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
			await blogService.getAll().then(blogs => setBlogs(blogs))
		} catch (exception) {
			notificate('Wrong credentials', 'error')
		}
	}

	const handleLogOut = (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
		blogService.setToken(null)
	}

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<h2>Log in to application</h2>
			<div>
				Username
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				Password
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	)

	return (
		<div>
			<h1>Blogs</h1>
			<Notification message={message} messageType={messageType}/>

			{user === null ?
				loginForm() :
				<div>
					<p>{user.name} logged-in</p>
					<button type="submit" onClick={handleLogOut}>Log Out</button>
					<Togglable buttonLabel='New Blog' ref={blogFormRef}>
						<BlogForm
							createBlog={addBlog}
						/>
					</Togglable>
					{blogs.map(blog =>
						<Blog key={blog.id} blog={blog} />
					)}
				</div>
			}
		</div>
	)

}

export default App