import { formatFileSize } from '../utils/fileUtils.js';
import { isDuplicate } from '../utils/duplicateDetector.js';

function FileUpload({ uploadedFiles, duplicates, onUploadFiles, onRemoveFile, t }) {
  return (
    <div className="file-upload">
      <label className="upload-area">
        {t('dragDrop')}
        <input
          type="file"
          accept=".pdf,application/pdf"
          multiple
          onChange={onUploadFiles}
          style={{ display: 'none' }}
        />
      </label>
      
      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <h3>{t('uploadedFiles')} ({uploadedFiles.length})</h3>
          <table className="files-table">
            <thead>
              <tr>
                <th>{t('fileName')}</th>
                <th>{t('pages')}</th>
                <th>{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {uploadedFiles.map((fileObj) => (
                <tr key={fileObj.id} className={isDuplicate(fileObj, duplicates) ? 'duplicate-row' : ''}>
                  <td>
                    {fileObj.name}
                    {isDuplicate(fileObj, duplicates) && (
                      <span className="duplicate-badge" title={t('duplicateWarning')}>
                        {t('duplicate')}
                      </span>
                    )}
                    <div className="file-size">{formatFileSize(fileObj.size)}</div>
                  </td>
                  <td>{fileObj.pageCount}</td>
                  <td>
                    <button
                      className="btn btn-small btn-danger"
                      onClick={() => onRemoveFile(fileObj.id)}
                    >
                      {t('remove')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
