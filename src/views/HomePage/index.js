import React from "react";
import Header from "components/Header/Header.js";
import ListMenu from "views/Design/ListMenu";
import Carausel from "views/Design/MyCarousel";
import ServiceCard from "views/Design/ServiceCard";
import image1 from "assets/img/service/ProductionMonitoringSystemIcon.jpg";
import image2 from "assets/img/service/ProductionQualityIcon.jpg";
import Footer from "views/Design/Footer";

function Home(props) {
  const { ...rest } = props;
  return (
    <div>
      <Header
        absolute
        color="primary"
        brand="Production Monitoring System"
        rightLinks={<ListMenu />}
        {...rest}
      />
      <Carausel />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <ServiceCard
          title="Production Achievement"
          description="contains data regarding the achievement of daily production which can be seen in realtime every hour"
          link="/production-report"
          urlImage={image1}
        />
        <ServiceCard
          title="Quality Achievement"
          description="contains data about the results of product quality during the production process"
          link="/quality-report"
          urlImage={image2}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
