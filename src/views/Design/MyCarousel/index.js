import React from "react";
import Carousel from "react-slick";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
import image1 from "assets/img/productionImg/image1.PNG";
import image2 from "assets/img/productionImg/image2.jpg";
import image3 from "assets/img/productionImg/image3.jpg";

function MyCarousel(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };
  return (
    <div>
      <div style={{ position: "relative", top: -60 }}>
        <GridContainer>
          <GridItem xs={12} sm={12}>
            <div>
              <Card carousel>
                <Carousel {...settings}>
                  <div>
                    <img
                      src={image1}
                      alt="First slide"
                      className="slick-image"
                      style={{ height: 500, width: "100%" }}
                    />
                    <div className="slick-caption">
                      <h4>
                        <LocationOn className="slick-icons" />
                        Denso Safety and Qualty First
                      </h4>
                    </div>
                  </div>
                  <div>
                    <img
                      src={image2}
                      alt="Second slide"
                      className="slick-image"
                      style={{ height: 500, width: "100%" }}
                    />
                    <div className="slick-caption">
                      <h4 style={{ color: "black" }}>
                        <LocationOn className="slick-icons" />
                        Always Giving the Best Product
                      </h4>
                    </div>
                  </div>
                  <div>
                    <img
                      src={image3}
                      alt="Third slide"
                      className="slick-image"
                      style={{ height: 500, width: "100%" }}
                    />
                    <div className="slick-caption">
                      <h4 style={{ color: "black" }}>
                        <LocationOn className="slick-icons" />
                        Solution for All Your Vehicle Problem
                      </h4>
                    </div>
                  </div>
                </Carousel>
              </Card>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

export default MyCarousel;
