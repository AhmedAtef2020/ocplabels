import React, { useState } from 'react';

export default function LabelsPrinter() {
  const [jobData, setJobData] = useState({
    jobNumber: '',
    jobName: '',
    notes: '',
    quantity: ''
  });

  const [imageSrc, setImageSrc] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="app-container">
      <div className="control-panel no-print">
        <h2 className="control-title">Carton Label Creator</h2>

        <div className="input-grid">
          <div className="input-group">
            <label className="input-label">Job Number</label>
            <input
              className="input-field"
              type="text"
              value={jobData.jobNumber}
              onChange={(e) => setJobData({ ...jobData, jobNumber: e.target.value })}
              placeholder="Enter job number"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Job Name</label>
            <input
              className="input-field"
              type="text"
              value={jobData.jobName}
              onChange={(e) => setJobData({ ...jobData, jobName: e.target.value })}
              placeholder="Enter job name"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Notes</label>
            <input
              className="input-field"
              type="text"
              value={jobData.notes}
              onChange={(e) => setJobData({ ...jobData, notes: e.target.value })}
              placeholder="Enter notes"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Quantity per carton</label>
            <input
              className="input-field"
              type="text"
              value={jobData.quantity}
              onChange={(e) => setJobData({ ...jobData, quantity: e.target.value })}
              placeholder="Enter quantity"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Job Image</label>
            <input
              className="input-field input-file"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="data-summary">
          <strong>Current data:</strong>
          <br />
          <span className="data-label">Job Number:</span> {jobData.jobNumber || '---'} |
          <span className="data-label"> Job Name:</span> {jobData.jobName || '---'} |
          <span className="data-label"> Notes:</span> {jobData.notes || '---'} |
          <span className="data-label"> Quantity:</span> {jobData.quantity || '---'}
        </div>

        <button className="print-button" onClick={handlePrint}>
          Print Sheet 45x32 cm
        </button>
      </div>

      <div className="print-sheet">
        <div className="label-grid">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="label-card">
              <div className="label-number">
                {jobData.jobNumber || 'JOB0000'}
              </div>

              <div className="label-main">
                <div className="label-left">
                  {imageSrc ? (
                    <img className="label-image" src={imageSrc} alt="Job" />
                  ) : (
                    <span className="image-placeholder">[Job Image]</span>
                  )}
                </div>

                <div className="label-right">
                  <div className="label-name">{jobData.jobName || 'Job Name'}</div>

                  <div className="note-box">
                    {jobData.notes || 'Notes'}
                  </div>

                  <div className="label-footer">
                    <span className="quantity-label">Qty per carton:</span>
                    <span className="quantity-box">
                      {jobData.quantity || '0'} <span className="quantity-unit">PCS</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
