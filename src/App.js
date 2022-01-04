import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import BusinessDevelopment from "./components/BusinessDevelopment";
// import Brokers from "./components/Brokers";
// import Birthdays from "./components/Birthdays";
// import PreviousMonthBD from "./components/PreviousMonthBD";
import Slider from "react-slick";
import LoadScreen from "./components/reusables/LoadScreen";

const App = () => {
  const [loading, setloading] = useState(true);

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

        console.log(data);
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

        setloading(false);
      });
  };

  const slideOneData = async () => {
    setloading(true);

    fetchIndividualTargets();
    fetchTargets();
    getBestPersonLastMonth();
    fetchBarChartData();
  };

  useEffect(() => {
    slideOneData();

    // setInterval(() => {
    //   slideOneData();
    // }, 360000);

    return () => {
      // console.log("leaving after launching swiper");
    };

    // eslint-disable-next-line
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 10000,
  };

  return (
    <>
      <div className="screens">
        {loading ? (
          <LoadScreen />
        ) : (
          <Slider {...settings}>
            <div className="slide-screen">
              <BusinessDevelopment
                salesMembers={salesMembers}
                targetTotal={targetTotal}
                targetAchieved={targetAchieved}
                paidBusiness={paidBusiness}
                monthValues={monthValues}
                topPerson={topPerson}
                loading={loading}
              />
            </div>
            {/* <div className="slide-screen">
              <Brokers />
            </div> */}
          </Slider>
        )}
      </div>
    </>
  );
};

export default withRouter(App);
