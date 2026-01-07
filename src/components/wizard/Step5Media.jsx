import React, { useState } from 'react';
import { useWizard } from '../../contexts/WizardContext';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowLeft, ArrowRight, Upload, X, FileImage, AlertCircle } from 'lucide-react';

export default function Step5Media() {
  const { campaignData, updateCampaignData, nextStep, prevStep } = useWizard();
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  // Media State: { screenId: { file: FileObject, name: string, status: 'uploaded' } }
  // Since we can't really upload, we mock the object
  const [mediaMap, setMediaMap] = useState(campaignData.mediaFiles || {});

  const selectedScreens = campaignData.selectedScreens || [];
  const currentScreen = selectedScreens[currentScreenIndex];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const currentFiles = mediaMap[currentScreen.id] || [];
      const newFileObjects = files.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        type: file.type
      }));

      const newMedia = {
        ...mediaMap,
        [currentScreen.id]: [...currentFiles, ...newFileObjects]
      };
      setMediaMap(newMedia);
      updateCampaignData({ mediaFiles: newMedia });
    }
  };

  const removeFile = (screenId, fileId) => {
    const newFiles = mediaMap[screenId].filter(f => f.id !== fileId);
    const newMedia = { ...mediaMap };
    if (newFiles.length === 0) {
      delete newMedia[screenId];
    } else {
      newMedia[screenId] = newFiles;
    }
    setMediaMap(newMedia);
    updateCampaignData({ mediaFiles: newMedia });
  };

  const handleNext = () => {
    nextStep();
  };

  if (selectedScreens.length === 0) return null;

  const currentFiles = mediaMap[currentScreen.id] || [];

  return (
    <div className="media-container animate-fade-in">
      <div className="step-header">
        <h2>Media Upload</h2>
        <p>Upload creative assets for each screen. You can add multiple assets per location.</p>
      </div>

      <div className="media-layout">
        <ul className="screen-tabs glass-panel">
          {selectedScreens.map((screen, idx) => (
            <li
              key={screen.id}
              className={`tab-item ${idx === currentScreenIndex ? 'active' : ''}`}
              onClick={() => setCurrentScreenIndex(idx)}
            >
              <span className="tab-name">{screen.name}</span>
              {mediaMap[screen.id] && mediaMap[screen.id].length > 0 && (
                <span className="file-count-badge">{mediaMap[screen.id].length}</span>
              )}
            </li>
          ))}
        </ul>

        <div className="upload-area glass-panel">
          <div className="area-header">
            <h3>{currentScreen.name}</h3>
            <div className="specs-tag">
              Required: {currentScreen.resolution} • {currentScreen.size}
            </div>
          </div>

          <div className="dropzone-compact">
            <input
              type="file"
              id={`file-${currentScreen.id}`}
              className="file-input"
              accept="image/*,video/*"
              multiple
              onChange={handleFileChange}
            />
            <label htmlFor={`file-${currentScreen.id}`} className="dropzone-label-compact">
              <Upload size={20} />
              <span>Click or drag to add media files</span>
            </label>
          </div>

          <div className="uploaded-list">
            {currentFiles.map((file) => (
              <div key={file.id} className="file-item">
                <div className="file-info">
                  <div className="file-thumbnail">
                    <div className="blank-thumbnail">PREVIEW</div>
                  </div>
                  <div className="file-meta">
                    <p className="filename">{file.name}</p>
                    <p className="filesize">{file.size}</p>
                  </div>
                </div>
                <button className="btn-remove" onClick={() => removeFile(currentScreen.id, file.id)}>
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="warning-box">
            <AlertCircle size={16} />
            <span>Content must comply with local advertising regulations.</span>
          </div>
        </div>
      </div>

      <div className="wizard-footer">
        <button className="btn btn-secondary" onClick={prevStep}>
          <ArrowLeft size={16} /> Back
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          Review Campaign <ArrowRight size={16} />
        </button>
      </div>

      <style>{`
        .media-layout {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 2rem;
          min-height: 400px;
        }

        .screen-tabs {
          list-style: none;
          padding: 1rem 0;
        }

        .tab-item {
          padding: 0.75rem 1.25rem;
          cursor: pointer;
          color: hsl(var(--text-muted));
          transition: var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-left: 2px solid transparent;
        }

        .tab-item:hover {
          background: rgba(255,255,255,0.05);
          color: hsl(var(--text-main));
        }

        .tab-item.active {
          background: rgba(255,255,255,0.08); /* slightly lighter than hover */
          color: hsl(var(--text-main));
          border-left-color: hsl(var(--color-primary));
        }

        .tab-name {
          font-size: 0.9rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .file-count-badge {
            background: hsl(var(--color-primary));
            color: white;
            font-size: 0.7rem;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
        }

        .upload-area {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .area-header {
          margin-bottom: 0.5rem;
        }
        
        .dropzone-compact {
            border: 2px dashed var(--glass-border);
            border-radius: var(--radius-sm);
            padding: 1.5rem;
            position: relative;
            transition: var(--transition-fast);
            background: rgba(255,255,255,0.02);
        }

        .dropzone-compact:hover {
            border-color: hsl(var(--color-primary));
            background: rgba(var(--color-primary), 0.05);
        }

        .dropzone-label-compact {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            color: hsl(var(--text-muted));
            font-weight: 500;
        }

        .uploaded-list {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            max-height: 400px;
            overflow-y: auto;
            padding-right: 0.5rem;
        }

        .file-item {
          background: hsl(var(--bg-dark));
          border: 1px solid var(--glass-border);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .file-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .file-thumbnail {
            width: 44px;
            height: 44px;
            border-radius: 4px;
            background: #000;
            overflow: hidden;
            border: 1px solid var(--glass-border);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .blank-thumbnail {
            font-size: 0.5rem;
            color: #444;
            font-weight: 800;
            letter-spacing: 0.05em;
        }

        .file-meta { display: flex; flex-direction: column; }

        .filename {
          font-weight: 500;
          font-size: 0.9rem;
          max-width: 250px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .filesize {
          font-size: 0.75rem;
          color: hsl(var(--text-muted));
        }

        .btn-remove {
          background: transparent;
          border: none;
          color: hsl(var(--text-muted));
          padding: 0.4rem;
          border-radius: 50%;
          transition: var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-remove:hover {
          background: rgba(var(--status-error), 0.1);
          color: hsl(var(--status-error));
        }
        
        .warning-box {
            margin-top: auto;
            display: flex;
            gap: 0.75rem;
            padding: 1rem;
            background: rgba(var(--status-warning), 0.1);
            color: hsl(var(--status-warning));
            border-radius: var(--radius-sm);
            font-size: 0.85rem;
            align-items: center;
        }

      `}</style>
    </div>
  );
}
