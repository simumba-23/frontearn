// SearchBar.js
import React,{useState} from 'react';

import { Form, FormControl, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <Form inline onSubmit={handleSearch} className="mb-3">
            <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit" variant="outline-success">Search</Button>
        </Form>
    );
};

export default SearchBar;
