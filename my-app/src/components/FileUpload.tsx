'use client';

import React from 'react';

const FileUpload = () => {
  return (
    <div>
      <label htmlFor="file">
        Upload File
        <input
          type="file"
          id="file"
          data-testid="file-input"
          aria-label="File upload"
        />
      </label>
      <button data-testid="upload-button">
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
