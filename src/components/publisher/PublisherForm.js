import React, { useState, useEffect } from 'react';
import publisherService from '../service/publisherService';

const PublisherForm = ({ selectedPublisher, onSave, onCancel }) => {
  const [publisher, setPublisher] = useState({
    publisherName: '',
    address: '',
    contactNumber:'',
    country: '',
    publisherInformation: '',
    createdBy: 0,
    isActive: true,
  });

  useEffect(() => {
    if (selectedPublisher) {
      setPublisher(selectedPublisher);
    }
  }, [selectedPublisher]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPublisher((prevPublisher) => ({ ...prevPublisher, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (publisher.publisherId) {
        await publisherService.updatePublisher(publisher.publisherId, publisher);
      } else {
        await publisherService.addPublisher(publisher);
      }
      onSave();
    } catch (error) {
      console.error('Error saving publisher:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-6">
        <label htmlFor="publisherName" className="form-label">Publisher Name:</label>
        <input
          type="text"
          className="form-control"
          id="publisherName"
          name="publisherName"
          value={publisher.publisherName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="country" className="form-label">Country:</label>
        <input
          type="text"
          className="form-control"
          id="country"
          name="country"
          value={publisher.country}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="address" className="form-label">address:</label>
        <input
          type="text"
          className="form-control"
          id="address"
          name="address"
          value={publisher.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="contactNumber" className="form-label">contactNumber:</label>
        <input
          type="text"
          className="form-control"
          id="contactNumber"
          name="contactNumber"
          value={publisher.contactNumber}
          onChange={handleChange}
          required
        />
      </div>

      

      <div className="col-12">
        <label htmlFor="publisherInformation" className="form-label">Publisher Information:</label>
        <textarea
          className="form-control"
          id="publisherInformation"
          name="publisherInformation"
          value={publisher.publisherInformation}
          onChange={handleChange}
          rows="4"
        />
      </div>
      <div className="col-12">
        {/* <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isActive"
            name="isActive"
            checked={publisher.isActive}
            onChange={(e) => setPublisher({ ...publisher, isActive: e.target.checked })}
          />
          <label className="form-check-label" htmlFor="isActive">Is Active</label>
        </div> */}
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary me-2">Save Publisher</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PublisherForm;
