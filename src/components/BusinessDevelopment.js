import React from "react";
import ProfilePic from "./reusables/ProfilePic";
// import { VectorMap } from "react-jvectormap";
import ClosedBusiness from "./charts/ClosedBusiness";
import trophy from "../images/icons/trophy.png";
import { separator, remainingDays } from "../functions/helpers";

const BusinessDevelopment = ({
  salesMembers,
  targetTotal,
  targetAchieved,
  paidBusiness,
  monthValues,
  topPerson,
}) => {
  const getMonthName = () => {
    const date = new Date();
    const month = date.toLocaleString("default", { month: "long" });

    return month;
  };

  const getYear = () => {
    const year = new Date().getFullYear();

    return year;
  };

  const getPreviousMonth = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const previousMonth = date.toLocaleString("default", { month: "long" });

    return previousMonth;
  };

  return (
    <div className="swiper-slide">
      <div className="row px-2">
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-12">
              <h2>
                <u>Closed Business</u>
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <ClosedBusiness monthValues={monthValues} />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-12">
              <h2>
                <u>
                  Top Sales Member for {getPreviousMonth()}&nbsp;{getYear()}
                </u>
              </h2>
            </div>
          </div>
          <div className="row achvd-paid">
            <div className="col-md-12">
              <div className="the-winner">
                <div className="person">
                  <ProfilePic picture={topPerson.empID} />
                  <div className="star">
                    <img src={trophy} alt="" />
                  </div>
                </div>
                <div className="person-data">
                  <h2>
                    <b>{topPerson.name}</b>
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h2>
                <u>
                  Broker/Direct Overall Set Target for {getMonthName()}&nbsp;
                  {getYear()}
                </u>
              </h2>
              <h1 className="successed">$&nbsp;{separator(targetTotal)}</h1>
            </div>
          </div>
          <div className="row achvd-paid">
            <div className="col-md-6">
              <h2>
                <u>Booked business</u>
              </h2>
              <h1 className="successed">$&nbsp;{separator(targetAchieved)}</h1>
            </div>
            <div className="col-md-6">
              <h2>
                <u>Paid business</u>
              </h2>
              <h1
                className={`${
                  targetTotal - targetAchieved > 1 ? "unsuccesful" : "successed"
                }`}
              >
                $&nbsp;{separator(paidBusiness)}
              </h1>
            </div>
          </div>
          <div className="row achvd-paid">
            <div className="col-md-12">
              <h2>
                <u>Pending</u>
              </h2>
              <h1 className="unsuccesful">
                $&nbsp;{separator(targetTotal - targetAchieved)}
              </h1>
            </div>
          </div>
          <div className="row achvd-paid">
            <div className="col-md-6">
              <h2>
                <u>Days to Target Expiry</u>
              </h2>
              {remainingDays() > 1 && (
                <h1 className="successed">
                  {remainingDays()}&nbsp;Day{remainingDays() > 1 && "s"}
                </h1>
              )}

              {remainingDays() < 1 && <h1 className="unsuccesful">Last day</h1>}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-12">
              <h2>
                <u>
                  Business Development Individual Target for {getMonthName()}
                  &nbsp;{getYear()}
                </u>
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <table className="table individual-table">
                <thead>
                  <tr>
                    <th colSpan="2"></th>
                    <th>Booked</th>
                    <th>Paid</th>
                  </tr>
                </thead>
                <tbody>
                  {salesMembers
                    .sort((a, b) => b.amount - a.amount)
                    .sort((a, b) => b.paid - a.paid)
                    .sort((a, b) => a.name - b.name)
                    .map((s, i) => (
                      <tr key={i}>
                        <td width={"35px"}>
                          <ProfilePic picture={s.empID} />
                        </td>
                        <td
                          style={{ paddingTop: "20px", fontWeight: "bold" }}
                          width={"1300px"}
                        >
                          {s.name}
                          {/* {s.salesPerson} */}
                        </td>
                        <td
                          style={{ paddingTop: "20px" }}
                          width={"110px"}
                          className={s.amount < 1 ? `unsuccesful` : `successed`}
                        >
                          <b>$&nbsp;{separator(s.amount)}</b>
                        </td>
                        <td
                          style={{ paddingTop: "20px" }}
                          width={"110px"}
                          className={s.paid < 1 ? `unsuccesful` : `successed`}
                        >
                          <b>$&nbsp;{separator(s.paid)}</b>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDevelopment;
