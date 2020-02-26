import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import StarWarsCharacters from './StarWarsCharacters';
import { getData as mockGetData } from '../api';



jest.mock('../api');


test('renders the characters component with forward and backward working button to display data when we click on these', async () => {

    //Testing our async function with the result it produces with mock function 
    mockGetData.mockResolvedValueOnce({
       
        results: [
            {
                name: "Luke Skywalker", 
                url: 'https://swapi.co/api/people/1/'
            
            }
        ]
    });

    const { getByText } = render(<StarWarsCharacters />);
    const previousButton = getByText(/previous/i);
    const forwardButton = getByText(/next/i);

    fireEvent.click(previousButton);
    fireEvent.click(forwardButton);


    const data = 'https://swapi.co/api/people';

    expect(mockGetData).toHaveBeenCalledTimes(1);
    expect(mockGetData).toHaveBeenCalledWith(data)


wait(() => expect(getByText(forwardButton)))
wait(() => expect(getByText(previousButton)))


});

