import './public-pages.scss'
import '@styles/react/libs/input-number/input-number.scss'

import React, {
  useEffect,
  useState
} from 'react'

import axios from 'axios'
import {
  Mail,
  User
} from 'react-feather'
import {
  Button,
  Container,
  Input,
  InputGroup,
  InputGroupText,
  Label
} from 'reactstrap'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import CheckoutForm from './CheckoutForm'
import Footer from './Footer'
import NavBar from './NavBar'
import { useParams } from 'react-router-dom'

const stripePromise = loadStripe("pk_test_51KnwltAfcKEcHq5CQqmctsPDYdYzaU3NviORmdsys9vxPDfyxisuE6BWkecwmSu3cjLeNVVwRPFLEbHZuX8f6FGk003H6nGaZr")

const DonationForm = () => {
  const [isContinue, setIsContinue] = useState(false)
  const [donationAmount] = useState(10)


  const { campaign_slug } = useParams()
  const [campaign, setCampaign] = useState()

  async function getCampaign() {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/campaign/donate?url_slug=${campaign_slug}&ip_address=127.0.0.1`)
    setCampaign(res.data.data[0])
  }
  useEffect(() => {
    getCampaign()
  }, [campaign_slug])
  // const payment_methods = [
  //   { type: "paypal", text: "Credit Card", checked: true },
  //   { type: "applepay", text: "Apple Pay", checked: false },
  //   { type: "googlepay", text: "Google Pay", checked: false }
  // ]
  const [clientSecret, setClientSecret] = useState("")
  
  function createStripeIntent() {
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/stripe/pi`, {
      cardAmount: donationAmount * 100,
      transferGroup: "transfer11123456",
      items: "asdf"
    })
      .then((data) => {
        setClientSecret(data.data.data.client_secret)
      })
  }

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    createStripeIntent()
  }, [])
  const appearance = {
    theme: 'stripe'
  }
  const setActiveTab = (e) => {
    e.preventDefault()
    setIsContinue(!isContinue)
}
  const options = {
    clientSecret,
    appearance
  }
  const PaymentMethod = ({ type, text, checked, idx }) => {
    return (
      <div className='col-md-4 paymentMethod' style={{ padding: "0rem 2rem" }}>
        <div className='row' style={{ background: "rgb(240, 240, 240)", padding: "1rem 0.5rem 1rem 0.5rem", borderRadius: "8px", height: "100%" }}>
          <div className='form-check myFlex'>
            <Label className='form-check-label myLeft' for={`paymentMethodRadio${idx}`} style={{ height: "100%" }}>
              <div className='row' style={{ height: "100%" }}>
                <div className='col-md-4 myFlex' htmlFor='paymentMethodRadio'>
                  <img src={require(`@src/assets/images/public_pages/${type}.png`).default} className='myCenter'></img>
                </div>
                <div className='col-md-8 myFlex' htmlFor='paymentMethodRadio'>
                  <h3 className='myLeft' style={{ fontWeight: "bold", color: "black" }}>{text}</h3>
                </div>
              </div>
            </Label>
            <Input type='radio' name='paymentMethodRadio' id={`paymentMethodRadio${idx}`} className="myRight" defaultChecked={checked} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <NavBar></NavBar>
      <div id='donationform'>
        <div className='myComponent' style={{ background: "#f0f0f0" }}>
          <Container fluid="md" className='container'>
            <div className='row'>
              <div className='col-md-3 myFlex'>
                <img src={campaign?.logoImage} className='myCenter'></img>
              </div>
              <div className='col-md-9 myFlex'>
                <div className='myLeft' style={{ marginLeft: "2rem" }}>
                  <div className='myFlex' style={{ paddingBottom: "2rem" }}>
                    <p className="myLeft" style={{ fontSize: "2.5rem", fontWeight: "bold", color: "black" }}>

                      {campaign?.title}
                    </p>
                  </div>
                  <div className='myFlex' style={{ paddingBottom: "2.5rem" }}>
                    <h5 className="myLeft" style={{ fontWeight: "bold", color: "black" }}>
                      {campaign?.organization?.name}</h5>
                  </div>
                  <div className='myFlex' style={{ paddingBottom: "0rem" }}>
                    <h5 className="myLeft" style={{ fontWeight: "bold", color: "black", lineHeight: "1.5rem" }}>
                      {campaign?.shortDescription}</h5>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div className='myComponent' style={{ background: "white" }}>
          
          {!isContinue && (<Container fluid="md" className='container'>
            <div className="myFlex" style={{ paddingBottom: "3rem" }}>
              <h1 className='myCenter' style={{ color: "black", fontWeight: "bold" }}>Choose Your Donation Amount</h1>
            </div>
            <div className='row' style={{ paddingBottom: "4rem" }}>
              <div className='col-md-1'></div>
              <div className='col-md-4' style={{ padding: "1rem" }}>
                <Input type='text' id='readonlyInput' readOnly value={`$${donationAmount}` } style={{ textAlign: "center", marginBottom: "2rem", height: "4rem", fontSize: "1.5rem" }} />
                <div className='form-check form-check-primary'>
                  <Input type='checkbox' id='checkbox' defaultChecked />
                  <Label className='form-check-label label' for='checkbox'>
                    I like to cover all transaction fees
                  </Label>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='row'>
                  <div className="col-md-4 myFlex" style={{ padding: "1rem" }}>
                    <Button.Ripple  color='primary' className="myCenter donation_btn ">$10</Button.Ripple>
                  </div>
                  <div className="col-md-4 myFlex" style={{ padding: "1rem" }}>
                    <Button.Ripple color='primary'  className="myCenter donation_btn">$20</Button.Ripple>
                  </div>
                  <div className="col-md-4 myFlex" style={{ padding: "1rem" }}>
                    <Button.Ripple color='primary' className="myCenter donation_btn">$50</Button.Ripple>
                  </div>
                </div>
                <div className='row'>
                  <div className="col-md-4 myFlex" style={{ padding: "1rem" }}>
                    <Button.Ripple color='primary' className="myCenter donation_btn">$75</Button.Ripple>
                  </div>
                  <div className="col-md-4 myFlex" style={{ padding: "1rem" }}>
                    <Button.Ripple color='primary' className="myCenter donation_btn">$100</Button.Ripple>
                  </div>
                  <div className="col-md-4 myFlex" style={{ padding: "1rem" }}>
                    <Button.Ripple color='primary' className="myCenter donation_btn">CUSTOM</Button.Ripple>
                  </div>
                </div>
              </div>
              <div className='col-md-1'></div>
            </div>
            <div style={{ borderBottom: "solid 1px rgb(200, 200, 200)", marginBottom: "4rem" }}></div>
            <div className="myFlex" style={{ paddingBottom: "2rem" }}>
              <h1 className='myCenter' style={{ color: "black", fontWeight: "bold" }}>Donor Information</h1>
            </div>
            <div className='row' style={{ paddingBottom: "2rem" }}>
              <div className='col-md-2'></div>
              <div className='col-md-4'>
                <Label className='form-label label' for='firstname'>
                  First name
                </Label>
                <InputGroup className='input-group-merge mb-2'>
                  <InputGroupText>
                    <User size={14} />
                  </InputGroupText>
                  <Input type='text' id='firstname' placeholder='First name' />
                </InputGroup>
              </div>
              <div className='col-md-4'>
                <Label className='form-label label' for='lastname'>
                  Last name
                </Label>
                <InputGroup className='input-group-merge mb-2'>
                  <InputGroupText>
                    <User size={14} />
                  </InputGroupText>
                  <Input type='text' id='lastname' placeholder='Last name' />
                </InputGroup>
              </div>
              <div className='col-md-2'></div>
            </div>
            <div className='row' style={{ paddingBottom: "2rem" }}>
              <div className='col-md-2'></div>
              <div className='col-md-8'>
                <Label className='form-label label' for='email'>
                  Email
                </Label>
                <InputGroup className='input-group-merge mb-2'>
                  <InputGroupText>
                    <Mail size={14} />
                  </InputGroupText>
                  <Input type='email' id='email' placeholder='Enter your email' />
                </InputGroup>
              </div>
              <div className='col-md-2'></div>
            </div>
            <div className='row' style={{ paddingBottom: "2rem" }}>
              <div className='col-md-2'></div>
              <div className='col-md-8'>
                <Label className='form-label label' for='message'>
                  Enter a private message to {'{{fundraiser_name}}'}
                </Label>
                <InputGroup className='input-group-merge mb-2'>
                  <InputGroupText style={{}}>
                    <Mail size={14} />
                  </InputGroupText>
                  <Input type='textarea' name='text' id='message' rows='3' placeholder='Enter your message' />
                </InputGroup>
              </div>
              <div className='col-md-2'></div>
            </div>

            <div className='row' style={{ paddingBottom: "2rem" }}>
              <div className='col-md-2'></div>
              <div className='col-md-8'>
                <div className='form-check form-check-primary'>
                  <Input type='checkbox' id='checkbox1' defaultChecked />
                  <Label className='form-check-label label' for='checkbox1'>
                    Make this an anonymous donation
                  </Label>
                </div>
              </div>
              <div className='col-md-2'></div>
            </div>
            <div className='row' style={{ paddingBottom: "1rem" }}>
              <div className='col-md-2 myFlex'>
                <a onClick={setActiveTab} className="myRight donate_btn" href="thankyou">Continue</a>
              </div>
            </div>


          </Container>)}
          {isContinue && (<Container fluid="md" className='container'>
            <div className="myFlex" style={{ paddingBottom: "3rem" }}>
              <h1 className='myCenter' style={{ color: "black", fontWeight: "bold" }}>Payments Method</h1>
            </div>
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            )}
            <div className='row' style={{ paddingBottom: "0rem" }}>
              <div className='col-md-2 myFlex'>
                {/* <a className="myLeft donate_btn" href="thankyou">Donate Now</a> */}
              </div>
            </div>
          </Container>)}
          
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default DonationForm