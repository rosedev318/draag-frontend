import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper';
import PlaceChart from '../../Images/Charts/placedChart.png';
import TempChart from '../../Images/Charts/tempChart.png';
import LiveInChart from '../../Images/Charts/liveinChart.png';
import LiveOutChart from '../../Images/Charts/liveoutChart.png';
import AvgChart from '../../Images/Charts/average time.png';
import Clock from '../../Images/clock.svg';
import AlarmClock from '../../Images/alarm.svg';
import moment from 'moment';

const JobCard = (props) => {
  const { jobsData } = props;

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
      spaceBetween: 10
    },
    1440: {
      slidesPerView: 3.5,
      spaceBetween: 10
    }
  };

  const jobCards = [
    {
      label: 'Placed Jobs',
      count: jobsData?.total,
      image: PlaceChart
    },
    {
      label: 'Temp Jobs',
      count: jobsData?.subStats?.live_out_temporary,
      image: TempChart
    },
    {
      label: 'Live in',
      count: jobsData?.subStats?.live_in,
      image: LiveInChart
    },
    {
      label: 'Live out',
      count: jobsData?.subStats?.live_out,
      image: LiveOutChart
    },
    {
      label: 'Avg. Time to place',
      count:
        moment.unix(jobsData?.subStats?.avg_time_to_complete).format('M') +
        ' ' +
        'm',
      image: AvgChart,
      icon: AlarmClock
    }
  ];

  return (
    <div>
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
      >
        {jobCards?.length > 0 &&
          jobCards?.map((data, index) => {
            return (
              <SwiperSlide
                key={index}
                style={{
                  width: 'auto',
                  padding: '3px 3px 2px 1px',
                  marginRight: '15px'
                }}
              >
                <div
                  className="jobs-card-main position-relative"
                  style={{ width: '200px' }}
                >
                  <div className="jobs-card d-flex flex-column">
                    <span className="job-card-title">{data?.label}</span>
                    <div className="d-flex justify-content-between">
                      <span className="job-card-count fs-2">{data?.count}</span>
                      <img src={data.icon} className="px-2" />
                    </div>
                  </div>
                  <img
                    src={data?.image}
                    width="100%"
                    style={{ position: 'absolute', bottom: 0 }}
                    className="px-2"
                  />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default JobCard;
