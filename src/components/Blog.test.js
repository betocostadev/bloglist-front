import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {

  test('renders content', () => {
    const blog = {
      title: 'Testing is not fun',
      author: 'Beto Costa',
      likes: 450000,
      url: 'https://fullstackopen.com/en/part5/testing_react_apps#testing-the-forms'
    }

    const component = render(
      <Blog blog={blog} />
    )

    const blogContainer = component.container.querySelector('.blog')
    const firstPar = component.container.querySelector('.blog-item')

    console.log(prettyDOM(blogContainer))
    console.log(prettyDOM(firstPar))

    // component.debug()

    expect(component.container).toHaveTextContent('Testing is not fun')
  })

  test('not to have more than title and author when fields are hidden', () => {
    const blog = {
      title: 'Testing is not fun',
      author: 'Beto Costa',
      likes: 450000,
      url: 'https://fullstackopen.com/en/part5/testing_react_apps#testing-the-forms'
    }

    const component = render(
      <Blog blog={blog} />
    )

    const blogContainer = component.container.querySelector('.blog')
    expect(blogContainer.childElementCount).toBe(1)
  })

  test('url and number of likes are shown when the button controlling the shown details has been clicked', () => {
    const blog = {
      title: 'Testing is not fun',
      author: 'Beto Costa',
      likes: 450000,
      url: 'https://fullstackopen.com/en/part5/testing_react_apps#testing-the-forms',
      user: { name: 'Beto', username: 'bob' }
    }

    const user = {
      username: 'bob',
      name: 'Beto'
    }

    const component = render(
      <Blog blog={blog} user={user} />
    )

    const blogContainer = component.container.querySelector('.blog')

    const button = component.getByText('Show')
    fireEvent.click(button)
    expect(blogContainer.childElementCount).toBe(5)

    const likesP = component.container.querySelector('#likes')
    expect(likesP).toHaveTextContent('450000')

    const urlP = component.container.querySelector('#url')
    expect(urlP).toHaveTextContent('https://fullstackopen.com/en/part5/testing_react_apps#testing-the-forms')

  })

  test('like button is clicked twice', () => {
    const blog = {
      title: 'Testing is not fun',
      author: 'Beto Costa',
      likes: 450000,
      url: 'https://fullstackopen.com/en/part5/testing_react_apps#testing-the-forms',
      user: { name: 'Beto', username: 'bob' }
    }

    const user = {
      username: 'bob',
      name: 'Beto'
    }

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} user={user} addLike={mockHandler} />
    )

    const blogContainer = component.container.querySelector('.blog')

    const button = component.getByText('Show')
    fireEvent.click(button)
    expect(blogContainer.childElementCount).toBe(5)

    const likeBtn = component.getByText('like')

    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
