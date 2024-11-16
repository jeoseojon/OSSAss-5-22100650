import React, { useState, useEffect } from 'react';
import AddModal from '../Modal/AddModal';
import EditModal from '../Modal/EditModal';
import ViewModal from '../Modal/ViewModal';

const ShowList = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    const fetchStudents = async () => {
        try {
            const response = await fetch('https://672eddeb229a881691f128ae.mockapi.io/netlify');
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this student?')) {
            return;
        }

        try {
            const response = await fetch(`https://672eddeb229a881691f128ae.mockapi.io/netlify/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Student deleted successfully.');
                fetchStudents();
            }
        } catch (error) {
            alert('Failed to delete student.');
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="container">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h2>Students List</h2>
                        </div>
                        <div className="col-sm-6">
                            <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
                                <i className="material-icons">&#xE147;</i>
                                <span>Add New</span>
                            </button>
                        </div>
                    </div>
                </div>

                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Student Number</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>{student.studentNumber}</td>
                                <td>{student.address}</td>
                                <td>{student.email}</td>
                                <td>
                                    <a href="#!" onClick={() => {
                                        setSelectedStudent(student);
                                        setShowViewModal(true);
                                    }}>
                                        <i className="material-icons">&#xE417;</i>
                                    </a>
                                    <a href="#!" onClick={() => {
                                        setSelectedStudent(student);
                                        setShowEditModal(true);
                                    }}>
                                        <i className="material-icons">&#xE254;</i>
                                    </a>
                                    <a href="#!" onClick={() => handleDelete(student.id)}>
                                        <div style={{ color: 'red' }}>
                                            <i className="material-icons">&#xE872;</i>
                                        </div>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <AddModal
                    show={showAddModal}
                    onHide={() => setShowAddModal(false)}
                    onSuccess={fetchStudents}
                />

                <EditModal
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    student={selectedStudent}
                    onSuccess={fetchStudents}
                />

                <ViewModal
                    show={showViewModal}
                    onHide={() => setShowViewModal(false)}
                    student={selectedStudent}
                />
            </div>
        </div>
    );
};

export default ShowList; 