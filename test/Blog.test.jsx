import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'
import BlogForm from '../src/components/BlogForm'

test('renders content', () => {
	const blog = {
		title: 'A title',
		author: 'An author',
		likes: 2,
		url: 'An URL',
	}

	const { container } = render(<Blog blog={blog} />)

	const div = container.querySelector('.blog')  
	expect(div).toHaveTextContent(    
		'A title'  
	)
	expect(div).not.toHaveTextContent(
		'An author'
	)
})

test('renders author and likes when clicked', async () => {
	const putBlog = vi.fn()
	const deleteBlog = vi.fn()
	
	const userMock = {
		id: '1'
	}

	const blog = {
		title: 'A title',
		author: 'An author',
		likes: 2,
		url: 'An URL',
		user: {
			id: '1'
		}
	}

	const { container } = render(<Blog blog={blog} putBlog={putBlog} deleteBlog={deleteBlog} user={userMock}/>)

	const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

	const div = container.querySelector('.blog')  
	expect(div).toHaveTextContent(    
		'A title'  
	)
	expect(div).toHaveTextContent(
		'An author'
	)
	const likes = screen.getByText('Likes: 2')
	expect(likes).toBeDefined()
})

test('double call to method if double clicked', async () => {
	const putBlog = vi.fn()
	const deleteBlog = vi.fn()
	
	const userMock = {
		id: '1'
	}

	const blog = {
		title: 'A title',
		author: 'An author',
		likes: 2,
		url: 'An URL',
		user: {
			id: '1'
		}
	}

	const { container } = render(<Blog blog={blog} putBlog={putBlog} deleteBlog={deleteBlog} user={userMock}/>)

	const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)
	const likeButton = screen.getByText('Like')
	await user.click(likeButton)
	await user.click(likeButton)

	expect(putBlog.mock.calls).toHaveLength(2)
})

test('form submit sends proper data', async () => {
	const createBlog = vi.fn()
	const user = userEvent.setup()
	
	const { container } = render(<BlogForm createBlog={createBlog} />)

	const title = container.querySelector('#blog-title')
	const author = container.querySelector('#blog-author')
	const url = container.querySelector('#blog-url')
	const sendButton = screen.getByText('Save')

	await user.type(title, 'A really good title')
	await user.type(author, 'A really good author')
	await user.type(url, 'A really good url')
	await user.click(sendButton)

	expect(createBlog.mock.calls).toHaveLength(1)
	expect(createBlog.mock.calls[0][0].title).toBe('A really good title')
	expect(createBlog.mock.calls[0][0].author).toBe('A really good author')
	expect(createBlog.mock.calls[0][0].url).toBe('A really good url')
})