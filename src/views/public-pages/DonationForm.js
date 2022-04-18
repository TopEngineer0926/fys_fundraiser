import './public-pages.scss'
import '@styles/react/libs/input-number/input-number.scss'

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

import Footer from './Footer'
import NavBar from './NavBar'

const DonationForm = () => {
  const payment_methods = [
    {type: "paypal", text: "Credit Card", checked: true},
    {type: "applepay", text: "Apple Pay", checked: false},
    {type: "googlepay", text: "Google Pay", checked: false}
  ]

  const PaymentMethod = ({ type, text, checked, idx }) => {
    return (
      <div className='col-md-4 paymentMethod' style={{padding: "0rem 2rem"}}>
        <div className='row' style={{background: "rgb(240, 240, 240)", padding: "1rem 0.5rem 1rem 0.5rem", borderRadius: "8px", height: "100%"}}>
          <div className='form-check myFlex'>
            <Label className='form-check-label myLeft' for={`paymentMethodRadio${idx}`} style={{height: "100%"}}>
              <div className='row' style={{height: "100%"}}>
                <div className='col-md-4 myFlex' htmlFor='paymentMethodRadio'>
                  <img src={require(`@src/assets/images/public_pages/${type}.png`).default} className='myCenter'></img>
                </div>
                <div className='col-md-8 myFlex' htmlFor='paymentMethodRadio'>
                  <h3 className='myLeft' style={{fontWeight: "bold", color: "black"}}>{text}</h3>
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
        <div className='myComponent' style={{background: "#f0f0f0"}}>
          <Container fluid="md" className='container'>
            <div className='row'>
              <div className='col-md-3 myFlex'>
                <img src={require('@src/assets/images/public_pages/avatar_big.png').default} className='myCenter'></img>
              </div>
              <div className='col-md-9 myFlex'>
                <div className='myLeft' style={{marginLeft: "2rem"}}>
                  <div className='myFlex' style={{paddingBottom: "2rem"}}>
                    <p className="myLeft" style={{fontSize:"2.5rem", fontWeight: "bold", color: "black"}}>Brooklyn Simmons</p>
                  </div>
                  <div className='myFlex' style={{paddingBottom: "2.5rem"}}>
                    <h5 className="myLeft" style={{fontWeight: "bold", color: "black"}}>Athletic Club</h5>
                  </div>
                  <div className='myFlex' style={{paddingBottom: "0rem"}}>
                    <h5 className="myLeft" style={{fontWeight: "bold", color: "black", lineHeight: "1.5rem"}}>Thank you for supporting my team and I. Please follow the steps below to complete your donation. You will be emailed a copy of your donation receipt.</h5>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div className='myComponent' style={{background: "white"}}>
          <Container fluid="md" className='container'>
            <div className="myFlex" style={{paddingBottom: "3rem"}}>
              <h1 className='myCenter' style={{color: "black", fontWeight: "bold"}}>Choose Your Donation Amount</h1>
            </div>
            <div className='row' style={{paddingBottom: "4rem"}}>
              <div className='col-md-1'></div>
              <div className='col-md-4' style={{padding: "1rem"}}>
                <Input type='text' id='readonlyInput' readOnly value="$20" style={{textAlign: "center", marginBottom: "2rem", height: "4rem", fontSize: "1.5rem"}}/>
                <div className='form-check form-check-primary'>
                  <Input type='checkbox' id='checkbox' defaultChecked />
                  <Label className='form-check-label label' for='checkbox'>
                    I like to cover all transaction fees
                  </Label>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='row'>
                  <div className="col-md-4 myFlex" style={{padding: "1rem"}}>
                    <Button.Ripple color='primary' className="myCenter donation_btn">$10</Button.Ripple>
                  </div>
                  <div className="col-md-4 myFlex" style={{padding: "1rem"}}>
                    <Button.Ripple color='primary' className="myCenter donation_btn">$20</Button.Ripple>
                  </div>
                  <div className="col-md-4 myFlex" style={{padding: "1rem"}}>
                    <Button.Ripple color='primary' className="myCenter donation_btn">$50</Button.Ripple>
                  </div>
                </div>
                <div className='row'>
                  <div className="col-md-4 myFlex" style={{padding: "1rem"}}>
                    <Button.Ripple color='primary' className="myCenter donation_btn">$75</Button.Ripple>
                  </div>
                  <div className="col-md-4 myFlex" style={{padding: "1rem"}}>
                    <Button.Ripple color='primary' className="myCenter donation_btn">$100</Button.Ripple>
                  </div>
                  <div className="col-md-4 myFlex" style={{padding: "1rem"}}>
                    <Button.Ripple color='primary' className="myCenter donation_btn">CUSTOM</Button.Ripple>
                  </div>
                </div>
              </div>
              <div className='col-md-1'></div>
            </div>
            <div style={{borderBottom: "solid 1px rgb(200, 200, 200)", marginBottom: "4rem"}}></div>
            <div className="myFlex" style={{paddingBottom: "2rem"}}>
              <h1 className='myCenter' style={{color: "black", fontWeight: "bold"}}>Donor Information</h1>
            </div>
            <div className='row' style={{paddingBottom: "2rem"}}>
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
            <div className='row' style={{paddingBottom: "2rem"}}>
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
            <div className='row' style={{paddingBottom: "2rem"}}>
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
            
            <div className='row' style={{paddingBottom: "2rem"}}>
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
            
            <div style={{borderBottom: "solid 1px rgb(200, 200, 200)", marginBottom: "4rem"}}></div>
            <div className="myFlex" style={{paddingBottom: "3rem"}}>
              <h1 className='myCenter' style={{color: "black", fontWeight: "bold"}}>Payments Method</h1>
            </div>
            <div className='row' style={{paddingBottom: "3rem"}}>
              {payment_methods.map((obj, idx) => {
                return <PaymentMethod key={idx} type={obj.type} text={obj.text} checked={obj.checked} idx={idx}></PaymentMethod>
              })}
            </div>
            <div className='row' style={{paddingBottom: "2rem"}}>
              <div className='col-md-8'>
                <Label className='form-label label' for='card_number'>
                  Card Number
                </Label>
                <InputGroup className='input-group-merge mb-2'>
                  <Input type='text' name='text' id='card_number' placeholder='' />
                  <InputGroupText style={{}}>
                    <User size={14} />
                  </InputGroupText>
                </InputGroup>
              </div>
            </div>
            <div className='row' style={{paddingBottom: "2rem"}}>
              <div className='col-md-4'>
                <Label className='form-label label' for='name_on_card'>
                  Card Number
                </Label>
                <Input type='text' name='text' id='name_on_card' placeholder='John Doe' />
              </div>
              <div className='col-md-2'>
                <Label className='form-label label' for='exp_date'>
                  Exp.Date
                </Label>
                {/* <Flatpickr className='form-control' id='exp_date'  placeholder='MM/YY' /> */}
                <Input type='text' name='text' id='exp_date' placeholder='MM/YY' />
              </div>
              <div className='col-md-2'>
                <Label className='form-label label' for='cvv'>
                  CVV
                </Label>
                <Input type='text' name='text' id='cvv' placeholder='654' />
              </div>
            </div>
            <div className='row' style={{paddingBottom: "2rem"}}>
              <div className='col-md-12'>
                <div className='form-check form-check-primary'>
                  <Input type='checkbox' id='checkbox2' defaultChecked />
                  <Label className='form-check-label label' for='checkbox2'>
                    Use this card for future donations
                  </Label>
                </div>
              </div>
            </div>
            <div className='row' style={{paddingBottom: "0rem"}}>
              <div className='col-md-2 myFlex'>
                <a className="myLeft donate_btn" href="thankyou">Donate Now</a>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default DonationForm