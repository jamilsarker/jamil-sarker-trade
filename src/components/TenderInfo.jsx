function TenderInfo({ tender, t }) {
  return (
    <section className="section tender-info">
      <h2>{t('tenderInfo')}</h2>
      <div className="info-grid">
        <div className="info-item">
          <span className="info-label">{t('tenderId')}:</span>
          <span className="info-value">{tender.tender_id}</span>
        </div>
        <div className="info-item">
          <span className="info-label">{t('title')}:</span>
          <span className="info-value">{tender.title}</span>
        </div>
        <div className="info-item">
          <span className="info-label">{t('procuringEntity')}:</span>
          <span className="info-value">{tender.procuring_entity}</span>
        </div>
        <div className="info-item">
          <span className="info-label">{t('bidder')}:</span>
          <span className="info-value">{tender.bidder}</span>
        </div>
        <div className="info-item">
          <span className="info-label">{t('submissionDeadline')}:</span>
          <span className="info-value">{tender.submission_deadline}</span>
        </div>
      </div>
    </section>
  );
}

export default TenderInfo;
