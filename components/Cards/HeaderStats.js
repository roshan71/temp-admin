import React from "react";

import CardStats from "./CardStats.js";

export default function HeaderStats(props) {

  return (
    <>
      {/* Header */}
      <div className="relative bg-gray-700 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="BOOKINGS"
                  statTitle={props.booking}
                 
                  statIconName="far fa-chart-bar"
                  statIconColor="[#e73d2f]"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="USERS"
                  statTitle={props.user}
                  

                  statIconName="fas fa-users"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="ROOMS"
                  statTitle={props.room}
                  
                  statDescripiron="Since yesterday"
                  statIconName="fa-solid fa-hotel"
                  statIconColor="bg-pink-500"
                />
              </div>
           
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
