import React from 'react';
import { Pagination, Nav } from 'react-bootstrap';

const RevenueFooter = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="footer">
            <Pagination>
                <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(totalPages).keys()].map(page => (
                    <Pagination.Item key={page} active={page + 1 === currentPage} onClick={() => onPageChange(page + 1)}>
                        {page + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            </Pagination>
            <Nav className="mt-2">
                <Nav.Link href="/user-management">User Management</Nav.Link>
                <Nav.Link href="/task-management">Task Management</Nav.Link>
                <Nav.Link href="/analytics">Analytics</Nav.Link>
            </Nav>
        </div>
    );
};

export default RevenueFooter;
