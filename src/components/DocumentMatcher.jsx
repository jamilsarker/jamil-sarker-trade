import { calculateStatus } from '../utils/validation.js';

function DocumentMatcher({
  requirements,
  uploadedFiles,
  matches,
  expiryDates,
  duplicates,
  submissionDeadline,
  language,
  onMatchFile,
  onSetExpiryDate,
  t,
}) {
  // Get reverse map: fileId -> requirementId
  const fileToReq = {};
  for (const [reqId, fileId] of Object.entries(matches)) {
    if (fileId) {
      fileToReq[fileId] = reqId;
    }
  }
  
  // Get available files for a requirement (exclude files matched to other reqs and duplicates)
  const getAvailableFiles = (currentReqId) => {
    return uploadedFiles.filter(fileObj => {
      // If already matched to this requirement, include it
      if (matches[currentReqId] === fileObj.id) {
        return true;
      }
      
      // If matched to another requirement, exclude it
      if (fileToReq[fileObj.id] && fileToReq[fileObj.id] !== currentReqId) {
        return false;
      }
      
      // If this file is a duplicate and any of its duplicates are matched to another req, exclude it
      if (fileObj.hash && duplicates.has(fileObj.hash)) {
        const duplicateGroup = duplicates.get(fileObj.hash);
        for (const dupFile of duplicateGroup) {
          const matchedReq = fileToReq[dupFile.id];
          if (matchedReq && matchedReq !== currentReqId) {
            return false;
          }
        }
      }
      
      return true;
    });
  };
  
  return (
    <div className="document-matcher">
      <table className="matcher-table">
        <thead>
          <tr>
            <th>{t('document')}</th>
            <th>{t('type')}</th>
            <th>{t('matchedFile')}</th>
            <th>{t('expiryDate')}</th>
          </tr>
        </thead>
        <tbody>
          {requirements.map((req) => {
            const availableFiles = getAvailableFiles(req.id);
            const matchedFileId = matches[req.id];
            const expiryDate = expiryDates[req.id];
            const status = calculateStatus(req, matchedFileId, expiryDate, submissionDeadline);
            
            const showExpiryInput = req.has_expiry && matchedFileId;
            
            return (
              <tr key={req.id}>
                <td>
                  {language === 'bn' ? (req.title_bn || req.title_en) : req.title_en}
                </td>
                <td>
                  <span className={`badge ${req.mandatory ? 'badge-mandatory' : 'badge-optional'}`}>
                    {req.mandatory ? t('mandatory') : t('optional')}
                  </span>
                </td>
                <td>
                  <select
                    className="file-select"
                    value={matchedFileId || ''}
                    onChange={(e) => onMatchFile(req.id, e.target.value || null)}
                  >
                    <option value="">{t('selectFile')}</option>
                    {availableFiles.map((fileObj) => (
                      <option key={fileObj.id} value={fileObj.id}>
                        {fileObj.name} ({fileObj.pageCount} {t('pages')})
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  {showExpiryInput ? (
                    <input
                      type="date"
                      className="expiry-input"
                      value={expiryDate || ''}
                      onChange={(e) => onSetExpiryDate(req.id, e.target.value)}
                      placeholder={t('enterExpiryDate')}
                    />
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DocumentMatcher;
