import React from 'react';
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../pages/Analytics.css';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Mousewheel } from 'swiper';

const Card = (props) => {
  const { metricsData, datamonth } = props;

  // Candidate Count
  const tcandidateMore = Number(
    (metricsData.candidatesCreated - datamonth.candidatesCreated * 100) /
      datamonth.candidatesCreated
  ).toFixed(2);

  const tcandidateLess = Number(
    (metricsData.candidatesCreated * 100) / datamonth.candidatesCreated
  ).toFixed(2);

  // Candidate Asssign
  const candidateAssignMore = Number(
    (metricsData.candidatesAssignment - datamonth.candidatesAssignment * 100) /
      datamonth.candidatesAssignment
  ).toFixed(2);

  const candidateAssignLess = Number(
    (metricsData.candidatesAssignment * 100) / datamonth.candidatesAssignment
  ).toFixed(2);

  // Jobs Created
  const jobsCreatedMore = Number(
    (metricsData.jobsCreated - datamonth.jobsCreated * 100) /
      datamonth.jobsCreated
  ).toFixed(2);

  const jobsCreatedLess = Number(
    (metricsData.jobsCreated * 100) / datamonth.jobsCreated
  ).toFixed(2);

  // Jobs trial
  const jobsTrialMore = Number(
    (metricsData.jobsTrial - datamonth.jobsTrial * 100) / datamonth.jobsTrial
  ).toFixed(2);

  const jobsTrialLess = Number(
    (metricsData.jobsTrial * 100) / datamonth.jobsTrial
  ).toFixed(2);

  // Jobs Live
  const jobsLiveMore = Number(
    (metricsData.jobsLive - datamonth.jobsLive * 100) / datamonth.jobsLive
  ).toFixed(2);

  const jobsLiveLess = Number(
    (metricsData.jobsLive * 100) / datamonth.jobsLive
  ).toFixed(2);

  // Jobs Placed
  const jobsPlacedMore = Number(
    (metricsData.jobsPlaced - datamonth.jobsPlaced * 100) / datamonth.jobsPlaced
  ).toFixed(2);

  const jobsPlacedLess = Number(
    (metricsData.jobsPlaced * 100) / datamonth.jobsPlaced
  ).toFixed(2);

  // Jobs Lost
  const jobsLostMore = Number(
    (metricsData.jobsLost - datamonth.jobsLost * 100) / datamonth.jobsLost
  ).toFixed(2);

  const jobsLostLess = Number(
    (metricsData.jobsLost * 100) / datamonth.jobsLost
  ).toFixed(2);

  const cards = [
    {
      name: 'Total candidates',
      metrics: metricsData?.candidatesCreated,
      icon: (
        <span>
          {datamonth?.candidatesCreated > metricsData?.candidatesCreated ? (
            <BiDownArrowAlt style={{ color: '#F51412' }} />
          ) : (
            <BiUpArrowAlt style={{ color: '#38FCBD' }} />
          )}
        </span>
      ),
      percentage:
        tcandidateMore && tcandidateLess !== 'NaN'
          ? metricsData?.candidatesCreated > datamonth.candidatesCreated
            ? tcandidateMore
            : tcandidateLess
          : 0,
      label: 'Compared to previous month'
    },
    {
      name: 'Candidates assigned',
      metrics: metricsData?.candidatesAssignment,
      icon: (
        <span>
          {datamonth?.candidatesAssignment >
          metricsData?.candidatesAssignment ? (
            <BiDownArrowAlt style={{ color: '#F51412' }} />
          ) : (
            <BiUpArrowAlt style={{ color: '#38FCBD' }} />
          )}
        </span>
      ),
      percentage:
        candidateAssignMore && candidateAssignLess !== 'NaN'
          ? metricsData?.candidatesAssignment > datamonth?.candidatesAssignment
            ? candidateAssignMore
            : candidateAssignLess
          : 0
    },
    {
      name: 'Jobs created',
      metrics: metricsData?.jobsCreated,
      icon: (
        <span>
          {datamonth?.jobsCreated > metricsData?.jobsCreated ? (
            <BiDownArrowAlt style={{ color: '#F51412' }} />
          ) : (
            <BiUpArrowAlt style={{ color: '#38FCBD' }} />
          )}
        </span>
      ),
      percentage:
        jobsCreatedMore && jobsCreatedLess !== 'NaN'
          ? metricsData?.jobsCreated > datamonth?.jobsCreated
            ? jobsCreatedMore
            : jobsCreatedLess
          : 0
    },
    {
      name: 'Jobs Trial',
      metrics: metricsData?.jobsTrial,
      icon: (
        <span>
          {datamonth?.jobsTrial > metricsData?.jobsTrial ? (
            <BiDownArrowAlt style={{ color: '#F51412' }} />
          ) : (
            <BiUpArrowAlt style={{ color: '#38FCBD' }} />
          )}
        </span>
      ),
      percentage:
        jobsTrialMore && jobsTrialLess !== 'NaN'
          ? metricsData?.jobsTrial > datamonth?.jobsTrial
            ? jobsTrialMore
            : jobsTrialLess
          : 0
    },
    {
      name: 'Jobs Live',
      metrics: metricsData?.jobsLive,
      icon: (
        <span>
          {datamonth?.jobsLive > metricsData?.jobsLive ? (
            <BiDownArrowAlt style={{ color: '#F51412' }} />
          ) : (
            <BiUpArrowAlt style={{ color: '#38FCBD' }} />
          )}
        </span>
      ),
      percentage:
        jobsLiveMore && jobsLiveLess !== 'NaN'
          ? metricsData?.jobsLive > datamonth?.jobsLive
            ? jobsLiveMore
            : jobsLiveLess
          : 0
    },
    {
      name: 'Jobs Placed',
      metrics: metricsData?.jobsPlaced,
      icon: (
        <span>
          {datamonth?.jobsPlaced > metricsData?.jobsPlaced ? (
            <BiDownArrowAlt style={{ color: '#F51412' }} />
          ) : (
            <BiUpArrowAlt style={{ color: '#38FCBD' }} />
          )}
        </span>
      ),
      percentage:
        jobsPlacedMore && jobsPlacedLess !== 'NaN'
          ? metricsData?.jobsPlaced > datamonth?.jobsPlaced
            ? jobsPlacedMore
            : jobsPlacedLess
          : 0
    },
    {
      name: 'Jobs Lost',
      metrics: metricsData?.jobsLost,
      icon: (
        <span>
          {datamonth?.jobsLost > metricsData?.jobsLost ? (
            <BiDownArrowAlt style={{ color: '#F51412' }} />
          ) : (
            <BiUpArrowAlt style={{ color: '#38FCBD' }} />
          )}
        </span>
      ),
      percentage:
        jobsLostMore && jobsLostLess !== 'NaN'
          ? metricsData?.jobsLost > datamonth?.jobsLost
            ? jobsLostMore
            : jobsLostLess
          : 0
    }
  ];

  const breakpoints = {
    320: {
      slidesPerView: 1
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    1240: {
      slidesPerView: 3.5,
      spaceBetween: 20
    },
    1440: {
      slidesPerView: 3.5,
      spaceBetween: 20
    }
  };

  return (
    <>
      <Swiper
        breakpoints={breakpoints}
        freeMode={true}
        freemodesticky="true"
        loop={false}
        direction="horizontal"
        mousewheel={{
          forcetoaxis: true,
          sensitivity: 1,
          releaseOnEdges: true
        }}
        followFinger={true}
        initialSlide={0}
        // forceToAxis={true}
        keyboard={true}
        navigation={true}
        modules={[FreeMode, Mousewheel]}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        <div>
          {cards?.length > 0 &&
            cards.map((e, index) => {
              return (
                <SwiperSlide
                  key={index}
                  // className="p-3"
                  style={{ width: 'auto', padding: '3px 3px 3px 0px' }}
                >
                  <div
                    className={
                      e.name == 'Total candidates'
                        ? 'analytic-card'
                        : 'analytic-card-white'
                    }
                  >
                    <div>{e.name}</div>
                    <div className="d-flex mx-1 justify-content-between align-items-center">
                      <div className="fs-2 ">
                        {e?.metrics > 0 ? e.metrics : 0}
                      </div>
                      <div className="per-card">
                        {e.icon}
                        {e.percentage ? e.percentage : 0}%
                      </div>
                    </div>
                    <h6 className="text-end" style={{ lineHeight: 0 }}>
                      {e.label}
                    </h6>
                  </div>
                </SwiperSlide>
              );
            })}
        </div>
      </Swiper>
    </>
  );
};

export default Card;
