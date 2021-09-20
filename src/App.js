import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Swiper from "swiper";
// import Birthdays from "./components/Birthdays";
// import Brokers from "./components/Brokers";
import BusinessDevelopment from "./components/BusinessDevelopment";
// import PreviousMonthBD from "./components/PreviousMonthBD";

const App = () => {
  const [loading, setloading] = useState(false);

  const [salesMembers, setsalesMembers] = useState([]);

  const [targetTotal, settargetTotal] = useState(0);

  const [targetAchieved, settargetAchieved] = useState(0);

  const [paidBusiness, setpaidBusiness] = useState(0);

  const [monthValues, setmonthValues] = useState([]);

  const [topPerson, settopPerson] = useState({});

  const fetchBarChartData = () => {
    !loading && setloading(true);

    fetch("https://portal.micglobalrisks.com:8082/leaderboard/api/sales")
      .then((response) => response.json())
      .then((data) => {
        const amounts = data.map((item) => Math.round(item.amount));
        setmonthValues(amounts);
        setloading(false);
      });
  };

  const fetchIndividualTargets = () => {
    !loading && setloading(true);

    fetch(
      "https://portal.micglobalrisks.com:8082/leaderboard/api/individual-targets"
      // "https://portal.micglobalrisks.com:8082/leaderboard/api/prev-month-individual-targets"
    )
      .then((response) => response.json())
      .then((data) => {
        setsalesMembers(data);

        setloading(false);
      });
  };

  const getBestPersonLastMonth = () => {
    !loading && setloading(true);

    fetch(
      "https://portal.micglobalrisks.com:8082/leaderboard/api/prev-month-individual-targets"
    )
      .then((response) => response.json())
      .then((data) => {
        let top = data.sort((a, b) => b.paid - a.paid);

        top = top[0];

        settopPerson(top);

        setloading(false);
      });
  };

  const fetchTargets = () => {
    fetch(
      "https://portal.micglobalrisks.com:8082/leaderboard/api/targets"
      // "https://portal.micglobalrisks.com:8082/leaderboard/api/prev-month-targets"
    )
      .then((response) => response.json())
      .then((data) => {
        settargetTotal(data.targetAmount);
        settargetAchieved(data.amountAchied);
        setpaidBusiness(data.amountPaid);
      });
  };

  const slideOneData = () => {
    setloading(true);

    fetchIndividualTargets();
    fetchTargets();
    fetchBarChartData();
    getBestPersonLastMonth();
  };

  useEffect(() => {
    slideOneData();
    // const timerInterval = setInterval(slideOneData(), 100);

    const timerInterval = setInterval(() => slideOneData(), 18000000);

    new Swiper(".swiper-div", {
      direction: "horizontal",
      speed: 1,
      spaceBetween: 0,
      autoplay: {
        delay: 5000000,
      },
      fadeEffect: { crossFade: true },
      slidesPerView: 1,
      on: {
        slideChange: function () {
          // slideOneData();
        },
      },
      onSlideChangeEnd: function (s) {
        console.log(s.slides.length);
        if (s.slides.length === s.activeIndex + 1) s.swipeTo(0);
      },
      effect: "fade",
      loop: true,
    });

    return () => {
      clearInterval(timerInterval);
      // console.log("leaving after launching swiper");
    };

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="the-screens">
        <div className="container-fluid">
          <div className="swiper-container swiper-div">
            <div className="swiper-wrapper">
              <BusinessDevelopment
                salesMembers={salesMembers}
                targetTotal={targetTotal}
                targetAchieved={targetAchieved}
                paidBusiness={paidBusiness}
                monthValues={monthValues}
                topPerson={topPerson}
                loading={loading}
              />
              {/* <PreviousMonthBD
                salesMembers={salesMembers}
                targetTotal={targetTotal}
                targetAchieved={targetAchieved}
                paidBusiness={paidBusiness}
                monthValues={monthValues}
                topPerson={topPerson}
              /> */}
              {/* <Brokers /> */}
              {/* <div className="swiper-slide">
                <Birthdays />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(App);
