import { calculateStatus, STATUS } from '../utils/validation.js';

function RequirementsList({
  requirements,
  matches,
  expiryDates,
  uploadedFiles,
  submissionDeadline,
  language,
  t,
}) {
  const getStatusBadge = (status) => {
    const statusMap = {
      [STATUS.MISSING]: { text: t('statusMissing'), className: 'status-error' },
      [STATUS.EXPIRY_NEEDED]: { text: t('statusExpiryNeeded'), className: 'status-error' },
      [STATUS.EXPIRED]: { text: t('statusExpired'), className: 'status-error' },
      [STATUS.NOT_PROVIDED]: { text: t('statusNotProvided'), className: 'status-warning' },
      [STATUS.OK]: { text: t('statusOk'), className: 'status-success' },
    };
    
    const info = statusMap[status] || { text: status, className: '' };
    return <span className={`status-badge ${info.className}`}>{info.text}</span>;
  };
  
  return (
    <div className="requirements-list">
      <h2>{t('requirements')}</h2>
      <table className="requirements-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{t('document')}</th>
            <th>{t('type')}</th>
            <th>{t('matchedFile')}</th>
            <th>{t('expiryDate')}</th>
            <th>{t('status')}</th>
          </tr>
        </thead>
        <tbody>
          {requirements.map((req) => {
            const matchedFileId = matches[req.id];
            const matchedFile = matchedFileId ? uploadedFiles.find(f => f.id === matchedFileId) : null;
            const expiryDate = expiryDates[req.id];
            const status = calculateStatus(req, matchedFileId, expiryDate, submissionDeadline);
            
            return (
              <tr key={req.id}>
                <td>{req.order}</td>
                <td>
                  {language === 'bn' ? (req.title_bn || req.title_en) : req.title_en}
                </td>
                <td>
                  <span className={`badge ${req.mandatory ? 'badge-mandatory' : 'badge-optional'}`}>
                    {req.mandatory ? t('mandatory') : t('optional')}
                  </span>
                </td>
                <td>
                  {matchedFile ? (
                    <span className="file-info">
                      {matchedFile.name}
                      <span className="file-pages">({matchedFile.pageCount} {t('pages')})</span>
                    </span>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                <td>
                  {expiryDate || <span className="text-muted">—</span>}
                </td>
                <td>
                  {getStatusBadge(status)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RequirementsList;
