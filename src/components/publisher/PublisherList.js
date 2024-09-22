import React, { useState, useEffect } from 'react';
import publisherService from '../service/publisherService'; 
import PublisherForm from './PublisherForm';

const PublisherList = () => {
  const [publishers, setPublishers] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadPublishers();
  }, []);

  const loadPublishers = async () => {
    try {
      const response = await publisherService.getPublishers();
      setPublishers(response.data);
    } catch (error) {
      console.error('Error fetching publishers:', error);
    }
  };

  const handleAddPublisher = () => {
    setSelectedPublisher(null);
    setShowForm(true);
  };

  const handleEditPublisher = (publisher) => {
    setSelectedPublisher(publisher);
    setShowForm(true);
  };

  const handleDeletePublisher = async (publisherId) => {
    try {
      await publisherService.deletePublisher(publisherId);
      loadPublishers();
    } catch (error) {
      console.error('Error deleting publisher:', error);
    }
  };

  const handleSave = () => {
    loadPublishers();
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Publisher List</h1>
      <button className="btn btn-primary mb-3" onClick={handleAddPublisher}>
        Add Publisher
      </button>

      {showForm && (
        <PublisherForm
          selectedPublisher={selectedPublisher}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      <table className="table table-bordered table-striped">
        <thead className="table">
          <tr>
            <th>Publisher Name</th>
            <th>Country</th>
            <th>Information</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {publishers.map((publisher) => (
            <tr key={publisher.publisherId}>
              <td>{publisher.publisherName}</td>
              <td>{publisher.country}</td>
              <td>{publisher.publisherInformation}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-success me-2"
                  onClick={() => handleEditPublisher(publisher)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeletePublisher(publisher.publisherId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PublisherList;
