import React from 'react';
import UpArrow from '../../Images/small_long_up.svg';
import RightArrow from '../../Images/small_long_right.svg';
import DownArrow from '../../Images/small_long_down.svg';

const MonthStats = (props) => {
  const { monthData } = props;

  const candidatePer = (
    ((monthData?.createdCandidates?.currentMonth -
      monthData?.createdCandidates?.previousMonth) /
      monthData?.createdCandidates?.previousMonth) *
    100
  ).toFixed(2);

  const candidateCount = monthData?.createdCandidates?.currentMonth;

  const jobsPer = (
    ((monthData?.createdJobs?.currentMonth -
      monthData?.createdJobs?.previousMonth) /
      monthData?.createdJobs?.previousMonth) *
    100
  ).toFixed(2);

  const jobsCount = monthData?.createdJobs?.currentMonth;

  const placementPer = (
    ((monthData?.placedJobs?.currentMonth -
      monthData?.placedJobs?.previousMonth) /
      monthData?.placedJobs?.previousMonth) *
    100
  ).toFixed(2);

  const placementCount = monthData?.placedJobs?.currentMonth;

  const Data = [
    {
      name: 'Candidates',
      count: candidateCount,
      percentage: candidatePer !== 'NaN' ? candidatePer : 0,
      label:
        monthData?.createdCandidates?.currentMonth >
        monthData?.createdCandidates?.previousMonth
          ? `More candidates this month`
          : `Less candidates this month`,
      icon:
        monthData?.createdCandidates?.currentMonth >
        monthData?.createdCandidates?.previousMonth
          ? UpArrow
          : DownArrow
    },
    {
      name: 'New jobs',
      count: jobsCount,
      percentage: jobsPer !== 'NaN' ? jobsPer : 0,
      label:
        monthData?.createdJobs?.currentMonth >
        monthData?.createdJobs?.previousMonth
          ? `More jobs this month`
          : `Less jobs this month`,
      icon:
        monthData?.createdJobs?.currentMonth >
        monthData?.createdJobs?.previousMonth
          ? UpArrow
          : DownArrow
    },
    {
      name: 'Placements',
      count: placementCount,
      percentage: placementPer !== 'NaN' ? placementPer : 0,
      label:
        monthData?.placedJobs?.currentMonth >
        monthData?.placedJobs?.previousMonth
          ? `More placement this month`
          : `Less placement this month`,
      icon:
        monthData?.placedJobs?.currentMonth >
        monthData?.placedJobs?.previousMonth
          ? UpArrow
          : DownArrow
    }
  ];

  return (
    <div>
      <div className="px-5 py-4">
        <div className="row">
          {Data?.length > 0 &&
            Data.map((e, index) => {
              return (
                <div key={index} className="col-12 col-lg-4 main-stats">
                  <div style={{ width: 'max-content' }}>
                    <div className="single-data">
                      <div>
                        <img src={e.icon} style={{ verticalAlign: 'unset' }} />
                      </div>
                      <div>
                        <p className="candidate-state">
                          {e.name}{' '}
                          <span className="candidate-state-num">{e.count}</span>
                        </p>
                        <p className="candi-state-sub">
                          <span className="state-rating">
                            {e.percentage}
                            <span className="pers">%</span>{' '}
                          </span>{' '}
                          {e.label}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          {/* <div className="col-12 col-lg-4 main-stats">
            <div style={{ width: 'max-content' }}>
              <div className="single-data">
                <div>
                  <img
                    src={RightArrow}
                    style={{
                      verticalAlign: 'unset',
                      transform: 'rotate(40deg)'
                    }}
                  />
                </div>
                <div>
                  <p className="candidate-state text-white">
                    New Jobs <span className="candidate-state-num">103</span>
                  </p>
                  <p className="candi-state-sub">
                    <span className="state-rating">
                      + 0.1 <span className="pers">%</span>{' '}
                    </span>{' '}
                    increase in new jobs.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 main-stats">
            <div style={{ width: 'max-content' }}>
              <div className="single-data">
                <div>
                  <img
                    src={DownArrow}
                    style={{
                      verticalAlign: 'unset',
                      transform: 'rotate(130deg)'
                    }}
                  />
                </div>
                <div>
                  <p className="candidate-state text-white">
                    Placements <span className="candidate-state-num">12</span>
                  </p>
                  <p className="candi-state-sub">
                    <span className="state-rating">
                      - 0.4 <span className="pers">%</span>{' '}
                    </span>{' '}
                    Less on placements this month
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MonthStats;
