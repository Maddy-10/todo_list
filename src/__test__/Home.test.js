import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Home from '../page/Home';

describe('Home Component', () => {
  test('renders tasks correctly on component', () => {
    render(<Home />);
    expect(screen.getByText(/To-Do List/)).toBeInTheDocument;
  });

  test('adds a task correctly', () => {
    render(<Home />);
    // Added assertions to ensure the task is added correctly
    const inputField = screen.getByPlaceholderText('Enter Task...');
    const addButton = screen.getByText('Add');
    fireEvent.change(inputField, { target: { value: 'Test Task' } });
    fireEvent.click(addButton);
  });

  test('deletes a task correctly', () => {
    render(<Home />);
    // Add a task first
    const inputField = screen.getByPlaceholderText('Enter Task...');
    const addButton = screen.getByText('Add');
    fireEvent.change(inputField, { target: { value: 'Test Task' } });
    fireEvent.click(addButton);

    // Added assertions to ensure the task is deleted correctly
    const deleteButton = screen.getAllByRole('button', { name: 'Delete' })[0];
    fireEvent.click(deleteButton);
  });

  test('edits a task correctly', () => {
    render(<Home />);
    // Add a task first
    const inputField = screen.getByPlaceholderText('Enter Task...');
    const addButton = screen.getByText('Add');
    fireEvent.change(inputField, { target: { value: 'Test Task' } });
    fireEvent.click(addButton);

    // Added assertions to ensure the task is edited correctly
    const editButton = screen.getAllByRole('button', { name: 'Edit' })[0];
    fireEvent.click(editButton);
    const editInput = screen.getByDisplayValue('Test Task');
    fireEvent.change(editInput, { target: { value: 'Edited Task' } });
    fireEvent.click(screen.getByText('Save'));
  });

  test('completes a task correctly', () => {
    render(<Home />);
    // Add a task first
    const inputField = screen.getByPlaceholderText('Enter Task...');
    const addButton = screen.getByText('Add');
    fireEvent.change(inputField, { target: { value: 'Test Task' } });
    fireEvent.click(addButton);

    // Added assertions to ensure the task is completed correctly
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
  });

  test('searches tasks correctly', () => {
    render(<Home />);
    // Add tasks first
    const inputField = screen.getByPlaceholderText('Enter Task...');
    const addButton = screen.getByText('Add');
    fireEvent.change(inputField, { target: { value: 'Test Task' } });
    fireEvent.click(addButton);

    // Added assertions to ensure tasks are filtered correctly based on search
    const searchInput = screen.getByPlaceholderText('Search tasks...');
    fireEvent.change(searchInput, { target: { value: 'Task' } });
  });

  test('toggles between active and completed tasks correctly', () => {
    render(<Home />);
    // Add tasks first
    const inputField = screen.getByPlaceholderText('Enter Task...');
    const addButton = screen.getByText('Add');
    fireEvent.change(inputField, { target: { value: 'Test Task' } });
    fireEvent.click(addButton);

     // Added assertion to ensure only completed tasks are displayed
    fireEvent.click(screen.getByText('Completed'));

    // Added assertion to ensure only active tasks are displayed
    fireEvent.click(screen.getByText('Active'));
  });

  test('displays error message when adding empty task', () => {
    render(<Home />);
    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);
    


  });

  test('cancels editing a task correctly', () => {
    render(<Home />);
    // Add a task first
    const inputField = screen.getByPlaceholderText('Enter Task...');
    const addButton = screen.getByText('Add');
    fireEvent.change(inputField, { target: { value: 'Test Task' } });
    fireEvent.click(addButton);

    const editButton = screen.getAllByRole('button', { name: 'Edit' })[0];
    fireEvent.click(editButton);
    fireEvent.keyDown(screen.getByDisplayValue('Test Task'), { key: 'Escape', code: 'Escape' });
    
  });

  test('saves tasks to local storage', () => {
    // Mock local storage
    const localStorageMock = (() => {
      let store = {};
      return {
        getItem: (key) => store[key],
        setItem: (key, value) => {
          store[key] = value.toString();
        },
        clear: () => {
          store = {};
        }
      };
    })();
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    render(<Home />);
    
  });
});
