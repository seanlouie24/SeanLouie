import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';  // Adjust the import path if necessary
import '@testing-library/jest-dom';  // Provides jest matchers like toBeInTheDocument

// Mock the Calendar component to avoid full calendar testing complexity
jest.mock('./calendar', () => () => <div>Mocked Calendar</div>);

// Test rendering of the Home component
describe('Home Component', () => {
  
  test('renders hero section with correct content', () => {
    render(<Home />);
    
    // Check if the hero title and text are present
    const heroTitle = screen.getByText('SFU HUB');
    const heroText = screen.getByText('Your central hub for all things SFU');
    
    expect(heroTitle).toBeInTheDocument();
    expect(heroText).toBeInTheDocument();
  });

  test('renders image grid with correct items', () => {
    render(<Home />);
    
    // Check if all four grid items are rendered (Dining, Resources, Transportation, Blogs)
    const diningLink = screen.getByText('DINING');
    const resourcesLink = screen.getByText('RESOURCES');
    const transportationLink = screen.getByText('TRANSPORTATION');
    const blogsLink = screen.getByText('BLOGS');
    
    expect(diningLink).toBeInTheDocument();
    expect(resourcesLink).toBeInTheDocument();
    expect(transportationLink).toBeInTheDocument();
    expect(blogsLink).toBeInTheDocument();
  });

  test('renders the calendar section', () => {
    render(<Home />);
    
    // Check if the Calendar component is rendered
    const calendar = screen.getByText('Mocked Calendar');
    
    expect(calendar).toBeInTheDocument();
  });
});
