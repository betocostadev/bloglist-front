import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('submit is called with the right fields', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    component.debug()

    const inputTitle = component.container.querySelector('input[name="title"]')
    const inputAuthor = component.container.querySelector('input[name="author"]')
    const inputUrl = component.container.querySelector('input[name="url"]')
    const form = component.container.querySelector('.blog-form')

    fireEvent.change(inputTitle, {
      target: { value: 'testing of forms could be easier' }
    })
    fireEvent.change(inputAuthor, {
      target: { value: 'Matti Luukkainen' }
    })
    fireEvent.change(inputUrl, {
      target: { value: 'https://fullstackopen.com/en/part5/testing_react_apps#testing-the-forms' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    // console.log(createBlog.mock.calls)
    expect(createBlog.mock.calls[0][0].author).toBe('Matti Luukkainen')
  })
})
