import React, { useState } from "react";

export default function LabelsPrinter() {
  const [jobData, setJobData] = useState({
    jobNumber: "",
    jobName: "",
    notes: "",
    quantity: "",
    quantityType: "PCS",
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
    const originalTitle = document.title;
    document.title = `${jobData.jobNumber}-label_Qty0`;
    window.print();
    document.title = originalTitle;
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
              onChange={(e) =>
                setJobData({ ...jobData, jobNumber: e.target.value })
              }
              placeholder="Enter job number max 40 characters"
              maxlength="40"
            />
          </div>

          <div className="input-group">
            <label className="input-label">
              Job Name
              <span style={{ color: "#7f8c8d", fontSize: "0.7em" }}>
                {" "}
                (in Arabic)
              </span>
            </label>
            <input
              className="input-field"
              type="text"
              value={jobData.jobName}
              onChange={(e) =>
                setJobData({ ...jobData, jobName: e.target.value })
              }
              placeholder="Enter job name"
              // maxlength="40"
            />
          </div>
        </div>

        <div className="input-grid-4">
          <div className="input-group">
            <label className="input-label">Notes</label>
            <input
              className="input-field"
              type="text"
              value={jobData.notes}
              onChange={(e) =>
                setJobData({ ...jobData, notes: e.target.value })
              }
              placeholder="Enter notes"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Qty/carton</label>
            <input
              className="input-field"
              type="text"
              value={jobData.quantity}
              onChange={(e) =>
                setJobData({ ...jobData, quantity: e.target.value })
              }
              placeholder="Enter quantity"
              maxlength="4"
            />
          </div>

          <div className="input-group">
            <label className="input-label">PCS | PKT</label>
            <select
              className="input-field"
              value={jobData.quantityType}
              onChange={(e) =>
                setJobData({ ...jobData, quantityType: e.target.value })
              }
            >
              <option value="PCS">PCS</option>
              <option value="PKT">PKT</option>
            </select>
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
          <strong>Current label data:</strong>
          <br />
          <span className="data-label">Job Number:</span>{" "}
          {jobData.jobNumber || "---"} |
          <span className="data-label"> Job Name:</span>{" "}
          {jobData.jobName || "---"} |
          <span className="data-label"> Notes:</span> {jobData.notes || "---"} |
          <span className="data-label"> Quantity:</span>{" "}
          {jobData.quantity || "---"} |
          <span className="data-label"> Quantity Type:</span>{" "}
          {jobData.quantityType || "---"}
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
                {jobData.jobNumber || "No-JOB"}
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
                  <div className="label-name">
                    {jobData.jobName || "------"}
                  </div>

                  <div className={jobData.notes ? "note-box" : "hidden"}>
                    {jobData.notes}
                  </div>

                  <div className="label-footer">
                    <span className="quantity-label">Qty:</span>
                    <span className="quantity-box">
                      {jobData.quantity || ""}
                    </span>
                    <span className="quantity-unit">
                      {jobData.quantityType}
                    </span>
                  </div>
                </div>
              </div>
              <span className="version">v26.2</span>
            </div>
          ))}
        </div>
      </div>
      <div className="control-panel no-print">
        <p className="copy-right">by Ahmed Atef - OCP-129535</p>
      </div>
    </div>
  );
}
