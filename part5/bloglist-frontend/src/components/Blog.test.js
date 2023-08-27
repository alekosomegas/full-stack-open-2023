import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'me'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText(/Component testing is done with react-testing-library/)
  expect(element).toBeDefined()
})

test('renders blog\'s title and author only', () => {
    const blog = {
        title: 'Only title',
        author: 'Only author',
        url: 'not displayed',
      }

    const container = render(<Blog blog={blog} />).container

    const title = screen.getByText('Only title', {exact: false})
    const author = screen.getByText('Only author', {exact: false})
    const urlContainer = container.querySelector('#extraInfo')
    expect(urlContainer).toHaveStyle('display: none')
})
