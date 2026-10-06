import { useState, useEffect } from 'react';
import './App.css';
import { getTranslation } from './i18n/translations.js';
import { validateRequirementsJSON } from './utils/validation.js';
import { calculateFileHash, isPDF, getPDFPageCount, getTotalFileSize, validatePDFFile } from './utils/fileUtils.js';
import { detectDuplicates } from './utils/duplicateDetector.js';
import Header from './components/Header.jsx';
import TenderInfo from './components/TenderInfo.jsx';
import RequirementsList from './components/RequirementsList.jsx';
import FileUpload from './components/FileUpload.jsx';
import DocumentMatcher from './components/DocumentMatcher.jsx';
import PackageGenerator from './components/PackageGenerator.jsx';

const MAX_FILES = 30;
const MAX_TOTAL_SIZE = 50 * 1024 * 1024; // 50 MB

function App() {
  // Language
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });
  
  // Data
  const [tender, setTender] = useState(null);
  const [requirements, setRequirements] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [matches, setMatches] = useState({}); // requirementId -> fileId
  const [expiryDates, setExpiryDates] = useState({}); // requirementId -> date
  const [duplicates, setDuplicates] = useState(new Map());
  
  // UI state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Translation helper
  const t = (key) => getTranslation(language, key);
  
  // Save language preference
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  
  // Detect duplicates when files change
  useEffect(() => {
    if (uploadedFiles.length > 0) {
      detectDuplicates(uploadedFiles).then(setDuplicates);
    } else {
      setDuplicates(new Map());
    }
  }, [uploadedFiles]);
  
  // Load requirements.json
  const handleLoadRequirements = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      const validation = validateRequirementsJSON(data);
      if (!validation.valid) {
        throw new Error(validation.error);
      }
      
      setTender(data.tender);
      setRequirements(data.requirements.sort((a, b) => a.order - b.order));
      setMatches({});
      setExpiryDates({});
      setUploadedFiles([]);
    } catch (err) {
      setError(t('errorInvalidJSON'));
      console.error('Error loading requirements:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Upload PDF files
  const handleUploadFiles = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Validate count
      if (uploadedFiles.length + files.length > MAX_FILES) {
        throw new Error(t('errorTooManyFiles'));
      }
      
      // Validate types
      const newFiles = [];
      for (const file of files) {
        if (!isPDF(file)) {
          throw new Error(`${t('errorNotPDF')}: ${file.name}`);
        }
        
        // Validate PDF structure
        const isValid = await validatePDFFile(file);
        if (!isValid) {
          throw new Error(`${t('errorLoadingFile')}: ${file.name}`);
        }
        
        newFiles.push(file);
      }
      
      // Validate total size
      const totalSize = getTotalFileSize([...uploadedFiles.map(f => f.file), ...newFiles]);
      if (totalSize > MAX_TOTAL_SIZE) {
        throw new Error(t('errorFileTooBig'));
      }
      
      // Process files
      const processedFiles = await Promise.all(
        newFiles.map(async (file) => {
          const hash = await calculateFileHash(file);
          const pageCount = await getPDFPageCount(file);
          
          return {
            id: `file_${Date.now()}_${Math.random()}`,
            file,
            name: file.name,
            size: file.size,
            pageCount,
            hash,
          };
        })
      );
      
      setUploadedFiles([...uploadedFiles, ...processedFiles]);
    } catch (err) {
      setError(err.message);
      console.error('Error uploading files:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Remove file
  const handleRemoveFile = (fileId) => {
    setUploadedFiles(uploadedFiles.filter(f => f.id !== fileId));
    
    // Remove matches for this file
    const newMatches = { ...matches };
    for (const reqId in newMatches) {
      if (newMatches[reqId] === fileId) {
        delete newMatches[reqId];
      }
    }
    setMatches(newMatches);
  };
  
  // Match file to requirement
  const handleMatchFile = (requirementId, fileId) => {
    // Check if file is a duplicate already matched to another requirement
    if (fileId) {
      const fileObj = uploadedFiles.find(f => f.id === fileId);
      if (fileObj && fileObj.hash) {
        // Check if any other requirement is matched to a duplicate of this file
        for (const [reqId, matchedFileId] of Object.entries(matches)) {
          if (reqId !== requirementId && matchedFileId) {
            const matchedFile = uploadedFiles.find(f => f.id === matchedFileId);
            if (matchedFile && matchedFile.hash === fileObj.hash) {
              setError(t('errorDuplicateFile'));
              return;
            }
          }
        }
      }
    }
    
    setMatches({ ...matches, [requirementId]: fileId || null });
    setError(null);
  };
  
  // Set expiry date
  const handleSetExpiryDate = (requirementId, date) => {
    if (date) {
      setExpiryDates({ ...expiryDates, [requirementId]: date });
    } else {
      const newDates = { ...expiryDates };
      delete newDates[requirementId];
      setExpiryDates(newDates);
    }
  };
  
  return (
    <div className="app">
      <Header language={language} setLanguage={setLanguage} t={t} />
      
      <main className="main-content">
        {error && (
          <div className="error-banner" role="alert">
            {error}
          </div>
        )}
        
        {loading && (
          <div className="loading-banner">
            {t('loading')}
          </div>
        )}
        
        {!tender ? (
          <div className="no-data">
            <h2>{t('step1')}</h2>
            <p>{t('noData')}</p>
            <label className="btn btn-primary">
              {t('loadJSON')}
              <input
                type="file"
                accept=".json"
                onChange={handleLoadRequirements}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        ) : (
          <>
            <TenderInfo tender={tender} t={t} />
            
            <section className="section">
              <h2>{t('step2')}</h2>
              <FileUpload
                uploadedFiles={uploadedFiles}
                duplicates={duplicates}
                onUploadFiles={handleUploadFiles}
                onRemoveFile={handleRemoveFile}
                t={t}
              />
            </section>
            
            <section className="section">
              <h2>{t('step3')}</h2>
              <DocumentMatcher
                requirements={requirements}
                uploadedFiles={uploadedFiles}
                matches={matches}
                expiryDates={expiryDates}
                duplicates={duplicates}
                submissionDeadline={tender.submission_deadline}
                language={language}
                onMatchFile={handleMatchFile}
                onSetExpiryDate={handleSetExpiryDate}
                t={t}
              />
            </section>
            
            <section className="section">
              <h2>{t('step5')}</h2>
              <PackageGenerator
                tender={tender}
                requirements={requirements}
                matches={matches}
                expiryDates={expiryDates}
                uploadedFiles={uploadedFiles}
                language={language}
                t={t}
              />
            </section>
            
            <div className="section">
              <RequirementsList
                requirements={requirements}
                matches={matches}
                expiryDates={expiryDates}
                uploadedFiles={uploadedFiles}
                submissionDeadline={tender.submission_deadline}
                language={language}
                t={t}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
