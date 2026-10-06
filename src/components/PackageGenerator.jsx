import { useState } from 'react';
import { canGeneratePackage, getBlockingIssues } from '../utils/validation.js';
import { generatePDFPackage, downloadPDF } from '../utils/pdfGenerator.js';

function PackageGenerator({
  tender,
  requirements,
  matches,
  expiryDates,
  uploadedFiles,
  language,
  t,
}) {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [pdfBytes, setPdfBytes] = useState(null);
  const [error, setError] = useState(null);
  
  const canGenerate = canGeneratePackage(requirements, matches, expiryDates, tender.submission_deadline);
  const blockingIssues = getBlockingIssues(requirements, matches, expiryDates, tender.submission_deadline);
  
  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);
    setGenerated(false);
    
    try {
      const bytes = await generatePDFPackage(tender, requirements, matches, uploadedFiles, language);
      setPdfBytes(bytes);
      setGenerated(true);
    } catch (err) {
      setError(t('errorGeneratingPDF'));
      console.error('Error generating package:', err);
    } finally {
      setGenerating(false);
    }
  };
  
  const handleDownload = () => {
    if (pdfBytes) {
      const fileName = `${tender.tender_id}_Package.pdf`;
      downloadPDF(pdfBytes, fileName);
    }
  };
  
  return (
    <div className="package-generator">
      {!canGenerate && (
        <div className="blocking-issues">
          <h3>{t('blockingIssues')}</h3>
          <ul>
            {blockingIssues.missing.length > 0 && (
              <li>
                <strong>{t('missingDocs')}:</strong>
                <ul>
                  {blockingIssues.missing.map(req => (
                    <li key={req.id}>
                      {language === 'bn' ? (req.title_bn || req.title_en) : req.title_en}
                    </li>
                  ))}
                </ul>
              </li>
            )}
            {blockingIssues.expired.length > 0 && (
              <li>
                <strong>{t('expiredDocs')}:</strong>
                <ul>
                  {blockingIssues.expired.map(req => (
                    <li key={req.id}>
                      {language === 'bn' ? (req.title_bn || req.title_en) : req.title_en}
                    </li>
                  ))}
                </ul>
              </li>
            )}
            {blockingIssues.expiryNeeded.length > 0 && (
              <li>
                <strong>{t('expiryNeeded')}:</strong>
                <ul>
                  {blockingIssues.expiryNeeded.map(req => (
                    <li key={req.id}>
                      {language === 'bn' ? (req.title_bn || req.title_en) : req.title_en}
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </div>
      )}
      
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}
      
      {generated && (
        <div className="success-message" role="status">
          {t('packageGenerated')}
        </div>
      )}
      
      <div className="generator-actions">
        <button
          className="btn btn-primary btn-large"
          onClick={handleGenerate}
          disabled={!canGenerate || generating}
        >
          {generating ? t('generating') : t('generatePackage')}
        </button>
        
        {generated && pdfBytes && (
          <button
            className="btn btn-success btn-large"
            onClick={handleDownload}
          >
            {t('downloadPackage')}
          </button>
        )}
      </div>
    </div>
  );
}

export default PackageGenerator;
