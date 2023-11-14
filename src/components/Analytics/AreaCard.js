import React, { useEffect, useState } from 'react';
import NoData from '../Charts/NoData';

const AreaCard = (props) => {
  const [clientMaxCount, setClientMaxCount] = useState(0);
  const [clientSubAreaCount, setClientSubAreaCount] = useState(0);
  const [clientProfessionCount, setClientProfessionCount] = useState(0);
  const [candidateMaxCount, setCandidateMaxCount] = useState(0);
  const [candidateSubAreaCount, setCandidateSubAreaCount] = useState(0);

  const {
    area,
    category,
    AreaCandidate,
    topSubArea,
    categoryClient,
    topSubAreaClient,
    topProfession,
    AreaClient,
    handleCategory,
    handleCategoryClient
  } = props;

  useEffect(() => {
    const candidateCount =
      AreaCandidate?.length > 0 &&
      AreaCandidate.map((e) => {
        return e?.count;
      });
    const candidateSubAreaCount =
      topSubArea?.length > 0 &&
      topSubArea.map((e) => {
        return e?.count;
      });
    const clientCount =
      AreaClient?.length > 0 &&
      AreaClient.map((e) => {
        return e.count;
      });

    const clientSubAreaCount =
      topSubAreaClient?.length > 0 &&
      topSubAreaClient.map((e) => {
        return e.count;
      });

    const clientProfessionCount =
      topProfession?.length > 0 &&
      topProfession.map((e) => {
        return e.count;
      });

    if (candidateCount) {
      const max = Math.max(...candidateCount);
      setCandidateMaxCount(max);
    }
    if (candidateSubAreaCount) {
      const max = Math.max(...candidateSubAreaCount);
      setCandidateSubAreaCount(max);
    }
    if (clientCount) {
      const max = Math.max(...clientCount);
      setClientMaxCount(max);
    }
    if (clientSubAreaCount) {
      const max = Math.max(...clientSubAreaCount);
      setClientSubAreaCount(max);
    }
    if (clientProfessionCount) {
      const max = Math.max(...clientProfessionCount);
      setClientProfessionCount(max);
    }
  }, [AreaCandidate, AreaClient, topSubAreaClient, topProfession, topSubArea]);

  return (
    <div>
      {area == 'candidate' && (
        <>
          <div className="progress-card position-relative">
            <div className="progress-card-head">
              Where are your candidates from?
            </div>
            <div className="area-container container mt-5 ">
              {category == 'Area' && (
                <>
                  {AreaCandidate?.length < 1 || AreaCandidate === undefined ? (
                    <NoData />
                  ) : (
                    <>
                      {AreaCandidate?.length > 0 &&
                        AreaCandidate.map((e, index) => {
                          const width =
                            Number(e.count / candidateMaxCount) * 100 + '%';
                          return (
                            <div
                              key={index}
                              className="main-progress d-flex justify-content-start w-100 align-items-center mt-2"
                              style={{ gap: '15px' }}
                            >
                              <div className="progress-city">{e.area}</div>
                              <div className="progress bar">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: width }}
                                  aria-valuenow="25"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                              <div className="progress-num">{e.count}</div>
                            </div>
                          );
                        })}
                    </>
                  )}
                </>
              )}
              {category == 'Sub-area' && (
                <>
                  {topSubArea?.length > 0 ? (
                    <NoData />
                  ) : (
                    <>
                      {topSubArea?.length > 0 &&
                        topSubArea.map((e, index) => {
                          const width =
                            Number(e.count / candidateSubAreaCount) * 100 + '%';
                          return (
                            <div
                              key={index}
                              className="main-progress d-flex justify-content-start w-100 align-items-center mt-2"
                              style={{ gap: '15px' }}
                            >
                              <div className="progress-city">{e.area}</div>
                              <div className="progress bar">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: width }}
                                  aria-valuenow="25"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                              <div className="progress-num">{e.count}</div>
                            </div>
                          );
                        })}
                    </>
                  )}
                </>
              )}
              {category == 'Profession' && (
                <>
                  <NoData />
                </>
              )}
              {category == 'Placements' && (
                <>
                  <NoData />
                </>
              )}
            </div>
            <div className="mx-5">
              <div className="d-flex justify-content-end pt-1 pb-5">
                <div style={{ width: 'max-content' }}>
                  <div className="d-flex justify-content-end gap-3 card-category">
                    <div
                      className="category-head"
                      onClick={() => handleCategory('Area')}
                    >
                      Area
                    </div>
                    <div style={{ borderRight: '2px solid #ECEEF0' }}></div>
                    <div
                      className="category-head "
                      onClick={() => handleCategory('Sub-area')}
                    >
                      Sub-area
                    </div>
                    <div style={{ borderRight: '2px solid #ECEEF0' }}></div>
                    <div
                      className="category-head "
                      onClick={() => handleCategory('Profession')}
                    >
                      Profession
                    </div>
                    <div style={{ borderRight: '2px solid #ECEEF0' }}></div>
                    <div
                      style={{ borderRight: 'none' }}
                      className="category-head "
                      onClick={() => handleCategory('Placements')}
                    >
                      Placements
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {area == 'client' && (
        <>
          <div className="progress-card position-relative">
            <div className="progress-card-head">
              Where are your clients from?
            </div>

            <div className="area-container container mt-5">
              {categoryClient == 'Area' && (
                <>
                  {AreaClient?.length < 1 ? (
                    <>
                      <NoData />
                    </>
                  ) : (
                    <>
                      {AreaClient.length > 0 &&
                        AreaClient.map((e, index) => {
                          const width =
                            Number(e.count / clientMaxCount) * 100 + '%';
                          return (
                            <div
                              key={index}
                              className="main-progress d-flex justify-content-start w-100 align-items-center mt-2"
                              style={{ gap: '15px' }}
                            >
                              <div className="progress-city">{e.area}</div>
                              <div className="progress bar">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: width }}
                                  aria-valuenow="25"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                              <div className="progress-num">{e.count}</div>
                            </div>
                          );
                        })}
                    </>
                  )}
                </>
              )}
              {categoryClient == 'Sub-area' && (
                <>
                  {topSubAreaClient?.length < 1 ? (
                    <>
                      <NoData />
                    </>
                  ) : (
                    <>
                      {topSubAreaClient.length > 0 &&
                        topSubAreaClient.map((e, index) => {
                          const width =
                            Number(e.count / clientSubAreaCount) * 100 + '%';
                          return (
                            <div
                              key={index}
                              className="main-progress d-flex justify-content-start w-100 align-items-center mt-2"
                              style={{ gap: '15px' }}
                            >
                              <div className="progress-city">{e.area}</div>
                              <div className="progress bar">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: width }}
                                  aria-valuenow="25"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                              <div className="progress-num">{e.count}</div>
                            </div>
                          );
                        })}
                    </>
                  )}
                </>
              )}
              {categoryClient == 'Profession' && (
                <>
                  {topProfession?.length < 1 ? (
                    <>
                      <NoData />
                    </>
                  ) : (
                    <>
                      {topProfession.length > 0 &&
                        topProfession.map((e, index) => {
                          const width =
                            Number(e.count / clientProfessionCount) * 100 + '%';
                          return (
                            <div
                              key={index}
                              className="main-progress d-flex justify-content-start w-100 align-items-center mt-2"
                              style={{ gap: '15px' }}
                            >
                              <div className="progress-city">{e.name}</div>
                              <div className="progress bar">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: width }}
                                  aria-valuenow="25"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                              <div className="progress-num">{e.count}</div>
                            </div>
                          );
                        })}
                    </>
                  )}
                </>
              )}
              {categoryClient == 'Placements' && (
                <>
                  <NoData />
                </>
              )}
            </div>
            <div className="mx-5">
              <div className="d-flex justify-content-end pt-1 pb-5">
                <div className="" style={{ width: 'max-content' }}>
                  <div className="d-flex justify-content-end gap-3 card-category">
                    <div
                      className="category-head"
                      onClick={() => handleCategoryClient('Area')}
                    >
                      Area
                    </div>
                    <div style={{ borderRight: '2px solid #ECEEF0' }}></div>
                    <div
                      className="category-head"
                      onClick={() => handleCategoryClient('Sub-area')}
                    >
                      Sub-area
                    </div>
                    <div style={{ borderRight: '2px solid #ECEEF0' }}></div>
                    <div
                      className="category-head"
                      onClick={() => handleCategoryClient('Profession')}
                    >
                      Profession
                    </div>
                    <div style={{ borderRight: '2px solid #ECEEF0' }}></div>
                    <div
                      style={{ borderRight: 'none' }}
                      className="category-head"
                      onClick={() => handleCategoryClient('Placements')}
                    >
                      Placements
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AreaCard;
