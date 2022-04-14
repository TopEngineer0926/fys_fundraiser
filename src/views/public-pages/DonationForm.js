import './public-pages.scss'
import './DonationInfoComponent.scss'

import React, { useState } from 'react'

import {
  Button,
  Col,
  Input,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from 'reactstrap'

import Footer from './Footer'
import NavBar from './NavBar'

const PaymentCheckBox = ({ img, idx }) => {
  return (
    <div className="paymentCheckBox">
      <div className="form-check">
        <label className="form-check-label p-3 position-relative is-radius-8" htmlFor={`payment${idx}`}>
          <input className="form-check-input d-none" type="radio" name="payment" id={`payment${idx}`} />
          
          <span className="show position-absolute d-none">
            <img src={require('@src/assets/images/public_pages/checked.svg').default} alt="" />
          </span><span className="hide position-absolute">
            <img src={require('@src/assets/images/public_pages/unchecked.svg').default} alt="" />
          </span><div className="d-flex align-items-center gap-2">
            <img src={img} alt="" />
            <h5 className="mb-0 text-clr-black fs-20 fw-bold">Credit Card</h5>
          </div>
        </label>
          {/* <Input type='radio' name='paymentmethod'/> */}
      </div>
    </div>
  )
}
const DonationForm = () => {
    const donationRange = [10, 20, 50, 75, 125]

  const [active, setActive] = useState(0)

  const toggleDonationRange = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }
    return (
        <div>
            <NavBar></NavBar>
            <div id="donationform">
            <div className='section-padding banner'>
        <div className="container">
          <Row>
            <Col lg='3' className='mb-4 mb-lg-0'>
              <img src={require('@src/assets/images/public_pages/avatar_big.png').default} />
            </Col>
            <Col lg='9'>
              <h4 className="fs-48 fw-bold text-clr-black">Brooklyn Simmons</h4>
              <p className="fs-5 text-clr-black fw-bold">Athletic Club</p>
            </Col>
          </Row>
        </div>
      </div>

      <div className='bg-white section-padding'>
        <div className='container'>
          <div className='pb-5 donation-border'>
            <h2 className="fs-36 fw-bold text-clr-black pb-4">Donation Amount</h2>

            <div className='mt-4 tabWrapper'>
              <React.Fragment>
                <Nav tabs>
                  {donationRange.map((obj, idx) => {
                    return <NavItem key={idx}>
                      <NavLink
                        active={active === idx}
                        onClick={() => {
                          toggleDonationRange(idx)
                        }}
                      >
                        ${`${obj}`}
                      </NavLink>
                    </NavItem>
                  })}
                </Nav>
                <TabContent className='py-50' activeTab={active}>
                  {donationRange.map((obj, idx) => {
                    return <TabPane tabId={idx} key={idx}>
                      <Row className="inputForm">
                        <Col lg="4">
                          <form action="">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="Amount2">Amount</label>
                              <Input placeholder="Enter email" type="text" id="Amount2" className="form-control" value={`${obj}`} readOnly />
                            </div>
                          </form>
                        </Col>
                        <Col lg="4">
                          <form action="">
                            <div className="mb-3">
                              <label className="form-label">How often</label>
                              <select className="form-select">
                                <option>One Time</option>
                                <option>Two Times</option>
                                <option>Three Times</option>
                                <option>Four Times</option>
                              </select>
                            </div>
                          </form>
                        </Col>
                      </Row>
                    </TabPane>
                  })}
                </TabContent>
              </React.Fragment>
            </div>

            <div className="checkItem">
              <form className="">
                <div className="mb-3">
                  <div className="form-check">
                    <input type="checkbox" id="default-checkbox" className="form-check-input" />
                    <label title="" htmlFor="default-checkbox" className="form-check-label">I like to cover all transaction fees</label>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Donation border */}
          <div className="donatorPersonInfo mt-5 pb-5 donation-border">
            <h2 className="fs-36 fw-bold text-clr-black pb-4">Who is Donar?</h2>
            <Row className="inputFormInfo">
              <Col lg='4' className="mb-3">
                <form action="">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="FirstName">First name</label>
                    <input placeholder="First name" type="text" id="FirstName" className="form-control" />
                  </div>
                </form>
              </Col>
              <Col lg='4' className="mb-3">
                <form action="">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="LastName">Last name</label>
                    <input placeholder="Last name" type="text" id="LastName" className="form-control" />
                  </div>
                </form>
              </Col>
              <Col lg='8'>
                <form action="">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="formBasicEmail">Email</label>
                    <input placeholder="Enter your email" type="email" id="formBasicEmail" className="form-control" />
                  </div>
                </form>
              </Col>
            </Row>
          </div>

          {/* Payment Methods */}
          <div className="paymentInfo mt-5 pb-5">
            <h2 className="fs-36 fw-bold text-clr-black pb-4">Payments Methods</h2>
            <form action="thankyou" method="get">
              <Row>
                <Col lg='4' className="mb-4">
                  <PaymentCheckBox img={require('@src/assets/images/public_pages/paypal.png').default} idx='1' />
                </Col>
                <Col lg='4' className="mb-4">
                  <PaymentCheckBox img={require('@src/assets/images/public_pages/applepay.png').default} idx='2' />
                </Col>
              </Row>
              <Row>
                <Col lg='4' className="mb-4">
                  <PaymentCheckBox img={require('@src/assets/images/public_pages/googlepay.png').default} idx='3' />
                </Col>
              </Row>

              <Button color='relief-primary'>Donate Now</Button>
            </form>
          </div>
          {/* End - Payment Methods */}
        </div>
      </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default DonationForm